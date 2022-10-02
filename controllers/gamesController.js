import { connection } from "../database/db.js";

const gamesGetter = async (req, res) => {
  try {
    const { name, order, desc } = req.query;

    if (name) {
      const games = (
        await connection.query("SELECT * FROM games WHERE name ILIKE $1;", [
          "%" + name + "%",
        ])
      ).rows;
      return res.send(games);
    }
    const games = (
      await connection.query(
        `SELECT * FROM games ORDER BY "${order ?? "id"}" ${
          desc ? "DESC" : ""
        } ;`
      )
    ).rows;
    res.send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const gamesSender = async (req, res) => {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5);',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { gamesGetter, gamesSender };
