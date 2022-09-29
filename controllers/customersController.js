import { connection } from "../database/db.js";

const customersGetter = async (req, res) => {
  try {
    const { cpf } = req.query;
    if (cpf) {
      const customers = await connection.query(
        "SELECT * FROM customers WHERE cpf LIKE $1;",
        ["%" + cpf + "%"]
      );
      return res.send(customers.rows);
    }
    const customers = await connection.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const customerGetterById = async (req, res) => {
  try {
    const { costumer } = res.locals;
    res.send(costumer);
  } catch (error) {
    console.log(error);
    console.log(error);
    res.sendStatus(500);
  }
};

export { customersGetter, customerGetterById };
