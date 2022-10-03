import { connection } from "../database/db.js";
import { validateCustomer } from "../validations.js";

const existingCustomerValidation = async (req, res, next) => {
  const { id } = req.params;
  const customer = await connection.query(
    "SELECT * FROM customers WHERE id = $1;",
    [id]
  );

  const isValidId = customer.rows.find((value) => value.id == id);
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

  const isNameDuplicate = customers.find((value) => value.name === name);
  if (isNameDuplicate) return res.sendStatus(409);

  next();
};
const customerUpdateValidation = async (req, res, next) => {
  const { id } = req.params;
  const { error } = validateCustomer(req.body);
  if (error) return res.sendStatus(400);

  const { cpf } = req.body;
  const customers = (
    await connection.query("SELECT * FROM customers WHERE id = $1;", [id])
  ).rows;

  const customerCpf = (
    await connection.query("SELECT * FROM customers WHERE cpf = $1;", [cpf])
  ).rows;

  const isCpfDuplicate = customerCpf.find((customer) => {
    return customer.cpf === cpf && customer.id !== Number(id);
  });

  if (isCpfDuplicate) return res.sendStatus(409);
  next();
};

export {
  existingCustomerValidation,
  customerValidation,
  customerUpdateValidation,
};
