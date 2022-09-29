import Joi from "joi";

const validator = (schema) => (payload) => schema.validate(payload);

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

const validateCategories = validator(categoriesSchema);

export { validateCategories };
