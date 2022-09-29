import { connection } from "../database/db.js";

const categoriesGetter = async (req, res) => {
  try {
    const categories = await connection.query("SELECT * FROM categories;");
    res.status(200).send(categories.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export { categoriesGetter };
