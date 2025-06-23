# Stripe Setup Guide

## Step 1: Create Stripe Account

1. Go to: https://stripe.com/
2. Click "Start now" or "Sign up"
3. Fill in your business details:
   - Business name: "MindEase Mental Health"
   - Business type: "Individual" or "Company"
   - Industry: "Healthcare" or "Technology"
4. Complete account verification

## Step 2: Get API Keys

1. **Go to Stripe Dashboard** → **Developers** → **API Keys**
2. **Copy your keys**:
   - **Publishable key**: `pk_test_...` (for frontend)
   - **Secret key**: `sk_test_...` (for backend)
3. **Update `backend/config.env`**:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   ```

## Step 3: Create Premium Subscription Product

1. **Go to Dashboard** → **Products**
2. **Click "Add product"**
3. **Product details**:
   - Name: "MindEase Premium"
   - Description: "Access to premium mental health features, guided meditations, and professional support"
   - Images: Upload your app logo
4. **Pricing**:
   - Price: $10.00 USD
   - Billing: Monthly
   - Click "Save product"
5. **Copy the Price ID**: `price_xxxxxxxxxxxxxxxxxxxxxxxx`
6. **Update `backend/config.env`**:
   ```
   STRIPE_PRICE_ID=price_your_price_id_here
   ```

## Step 4: Configure Webhooks

1. **Go to Dashboard** → **Developers** → **Webhooks**
2. **Click "Add endpoint"**
3. **Endpoint URL**: `https://your-api.com/payment/webhook`
   - For development: `http://localhost:5000/payment/webhook`
4. **Events to send**:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. **Click "Add endpoint"**
6. **Copy the signing secret**: `whsec_xxxxxxxxxxxxxxxxxxxxxxxx`
7. **Update `backend/config.env`**:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

## Step 5: Configure Customer Portal

1. **Go to Dashboard** → **Settings** → **Billing** → **Customer Portal**
2. **Enable features**:
   - ✅ Subscription cancellation
   - ✅ Plan changes
   - ✅ Payment method updates
   - ✅ Invoice history
   - ✅ Download invoices
3. **Branding**:
   - Logo: Upload your app logo
   - Primary color: `#1A3C6E` (dark blue)
   - Secondary color: `#E6F0FA` (light blue)
   - Business name: "MindEase"
4. **Save configuration**

## Step 6: Test Configuration

### Test API Keys:
```powershell
cd backend
node test-stripe.js
```

### Test Webhook (using Stripe CLI):
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:5000/payment/webhook`

## Environment Variables Summary

Update `backend/config.env`:
```
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_PRICE_ID=price_your_price_id_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Next Steps
After Stripe is configured:
1. Test the API keys and webhooks
2. Proceed to Step 5: Backend API Development
3. Implement payment endpoints in your Express server 