import { connection } from "../database/db.js";

const categoriesGetter = async (req, res) => {
  try {
    const { order, desc } = req.query;

    const categories = (
      await connection.query(
        `SELECT * FROM categories ORDER BY ${order ?? "id"} ${
          desc ? "DESC" : ""
        } ;`
      )
    ).rows;

    return res.send(categories);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const categoriesSender = async (req, res) => {
  try {
    const { name } = req.body;
    connection.query("INSERT INTO categories (name) VALUES ($1);", [name]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { categoriesGetter, categoriesSender };
