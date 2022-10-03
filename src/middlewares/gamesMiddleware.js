import { connection } from "../database/db.js";
import { validateGames } from "../validations.js";

const gamesValidator = async (req, res, next) => {
  const { error } = validateGames(req.body);
  const { categoryId, name } = req.body;
  const category = await connection.query(
    "SELECT * FROM categories WHERE id = $1;",
    [categoryId]
  );

  const id = category.rows;
  if (error || id.length === 0) {
    console.log(error);
    return res.sendStatus(400);
  }
  const games = await connection.query("SELECT * FROM games WHERE name = $1;", [
    name,
  ]);
  const isDuplicate = games.rows.find((game) => game.name === name);
  if (isDuplicate) return res.sendStatus(409);
  next();
};

export { gamesValidator };
