export const productSchema = {
  validate: (body) => {
    if (!body.name) {
      return { error: { details: [{ message: "Product name is required." }] } };
    }
    if (!body.price || parseFloat(body.price) <= 0) {
      return { error: { details: [{ message: "Price must be a positive number." }] } };
    }
    return { error: null };
  },
};
