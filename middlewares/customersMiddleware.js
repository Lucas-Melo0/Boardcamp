import { connection } from "../database/db.js";
import { validateCustomer } from "../validations.js";

const existingCustomerValidation = async (req, res, next) => {
  const { id } = req.params;
  const customer = await connection.query(
    "SELECT * FROM customers WHERE id = $1;",
    [id]
  );

  const isValidId = customer.rows.find((value) => value.id === id);
  if (!isValidId) {
    return res.sendStatus(404);
  }
  res.locals.id = id;
  res.locals.costumer = isValidId;
  next();
};

const customerValidation = async (req, res, next) => {
  const { error } = validateCustomer(req.body);
  const { name } = req.body;
  if (error) return res.sendStatus(400);

  const customers = (
    await connection.query("SELECT * FROM customers WHERE name = $1;", [name])
  ).rows;

  const isDuplicate = customers.find((value) => value.name === name);
  if (isDuplicate) return res.sendStatus(409);

  next();
};

export { existingCustomerValidation, customerValidation };
