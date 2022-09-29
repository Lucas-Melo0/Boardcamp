import { connection } from "../database/db.js";

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

export { existingCustomerValidation };
