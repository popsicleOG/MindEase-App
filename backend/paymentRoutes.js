const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();
const { User } = require("./models");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token required" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

router.post("/create-checkout-session", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    let customer;
    if (user.stripeCustomerId) {
      customer = await stripe.customers.retrieve(user.stripeCustomerId);
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: userId },
      });
      user.stripeCustomerId = customer.id;
      await user.save();
    }
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url:
        "https://mindease.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://mindease.com/cancel",
      metadata: { userId: userId },
    });
    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: "Server error while creating checkout session" });
  }
});

router.post("/cancel-subscription", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user || !user.stripeSubscriptionId) {
      return res.status(404).json({ error: "No active subscription found" });
    }
    const subscription = await stripe.subscriptions.cancel(
      user.stripeSubscriptionId,
    );
    user.subscriptionStatus = "free";
    user.stripeSubscriptionId = null;
    await user.save();
    res
      .status(200)
      .json({ message: "Subscription cancelled successfully", subscription });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    res
      .status(500)
      .json({ error: "Server error while cancelling subscription" });
  }
});

router.post("/create-portal-session", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user || !user.stripeCustomerId) {
      return res.status(404).json({ error: "No customer found" });
    }
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: "https://mindease.com/profile",
    });
    res.status(200).json({ url: portalSession.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    res
      .status(500)
      .json({ error: "Server error while creating portal session" });
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return res.status(400).json({ error: "Webhook error" });
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerId = session.customer;
      const subscriptionId = session.subscription;
      const userId = session.metadata.userId;
      const user = await User.findById(userId);
      if (user) {
        user.subscriptionStatus = "premium";
        user.stripeSubscriptionId = subscriptionId;
        await user.save();
        console.log(`User ${userId} upgraded to premium`);
      }
    }
    res.status(200).json({ received: true });
  },
);

module.exports = router;
