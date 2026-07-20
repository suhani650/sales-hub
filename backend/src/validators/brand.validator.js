export const brandSchema = {
  validate: (body) => {
    if (!body.name) {
      return { error: { details: [{ message: "Brand name is required." }] } };
    }
    return { error: null };
  },
};

export const brandUpdateSchema = {
  validate: (body) => {
    return { error: null };
  },
};
