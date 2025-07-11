const Joi = require("joi");

// Validation schemas
const schemas = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  moodEntry: Joi.object({
    mood: Joi.number().min(1).max(10).required(),
    notes: Joi.string().max(500).optional(),
  }),

  goal: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
    targetDate: Joi.date().iso().optional(),
  }),
};

// Validation middleware
const validate = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return res.status(500).json({ error: "Invalid schema name" });
    }

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((detail) => detail.message),
      });
    }

    // Replace req.body with validated data
    req.body = value;
    next();
  };
};

module.exports = { validate, schemas };
