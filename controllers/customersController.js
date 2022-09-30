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

const customerAdder = async (req, res) => {
  try {
    const { name, phone, cpf, birthday } = req.body;
    const customer = await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const customerUpdater = async (req, res) => {
  try {
    const { name, phone, cpf, birthday } = req.body;
    const customer = await connection.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE cpf = $5;",
      [name, phone, cpf, birthday, cpf]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { customersGetter, customerGetterById, customerAdder, customerUpdater };
