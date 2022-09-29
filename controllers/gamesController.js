import { connection } from "../database/db.js";

const gamesGetter = async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      const games = await connection.query(
        "SELECT * FROM games WHERE name LIKE $1;",
        ["%" + name + "%"]
      );
      return res.send(games.rows);
    }
    const games = await connection.query("SELECT * FROM games;");
    res.send(games.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { gamesGetter };
