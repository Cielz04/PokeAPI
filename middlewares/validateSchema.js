const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

function validateSchema(schema) {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (!valid) {
      return next({
        status: 400,
        message: 'Invalid data',
        errors: validate.errors.map(err => ({
          field: err.instancePath || err.params.missingProperty,
          message: err.message
        }))
      });
    }

    next();
  };
}

module.exports = validateSchema;
