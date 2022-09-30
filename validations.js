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

const customerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).max(11).required(),
  cpf: Joi.string().length(11).required(),
  birthday: Joi.date().required(),
});

const rentalsSchema = Joi.object({
  customerId: Joi.number().required(),
  gameId: Joi.number().required(),
  daysRented: Joi.number().min(1).required(),
});

const validateCategories = validator(categoriesSchema);
const validateGames = validator(gamesSchema);
const validateCustomer = validator(customerSchema);
const validateRentals = validator(rentalsSchema);

export { validateCategories, validateGames, validateCustomer, validateRentals };
