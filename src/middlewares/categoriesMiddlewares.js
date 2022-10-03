import { validateCategories } from "../validations.js";
import { connection } from "../database/db.js";

const categoriesValidator = async (req, res, next) => {
  const { error } = validateCategories(req.body);
  const { name } = req.body;
  if (error) return res.sendStatus(400);

  const categories = await connection.query(
    "SELECT * FROM categories WHERE name = $1",
    [name]
  );

  if (categories.rows.length > 0) return res.sendStatus(409);

  next();
};
export { categoriesValidator };
