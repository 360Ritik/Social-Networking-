const { body, validationResult } = require('express-validator');


// Middleware function for input validation
const validateInput = [
    body('username')
      .notEmpty().withMessage('Username should not be empty')
      .isString().withMessage('Username should be a string')
      .isLength({ min: 3, max: 20 }).withMessage('Username should be between 3 and 20 characters'),
    body('password')
      .notEmpty().withMessage('Password should not be empty')
      .isString().withMessage('Password should be a string')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('Password should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character'),
    // Add more validation rules as needed
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  module.exports = validateInput;