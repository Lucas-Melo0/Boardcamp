import Joi from "joi";

const validator = (schema) => (payload) => schema.validate(payload);

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

const gamesSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  stockTotal: Joi.number().min(1).required(),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.number().min(1).required(),
});

const validateCategories = validator(categoriesSchema);
const validateGames = validator(gamesSchema);

export { validateCategories, validateGames };
