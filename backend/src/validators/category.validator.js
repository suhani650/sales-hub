export const categorySchema = {
  validate: (body) => {
    if (!body.name) {
      return { error: { details: [{ message: "Category name is required." }] } };
    }
    return { error: null };
  },
};

export const categoryUpdateSchema = {
  validate: (body) => {
    return { error: null };
  },
};
