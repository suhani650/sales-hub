export const validate = (schema) => {
  return (req, res, next) => {
    if (schema && typeof schema.validate === "function") {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
    }
    next();
  };
};
