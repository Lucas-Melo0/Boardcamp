import { connection } from "../database/db.js";
import { validateRentals } from "../validations.js";

const rentalsValidator = async (req, res, next) => {
  const { error } = validateRentals(req.body);
  const { customerId, gameId } = req.body;
  if (error) return res.sendStatus(400);

  const customer = (
    await connection.query("SELECT * FROM customers WHERE id = $1", [
      customerId,
    ])
  ).rows;

  const games = (await connection.query("SELECT * FROM games;")).rows;
  const rentals = (await connection.query("SELECT * FROM rentals;")).rows;

  const isValidClient = customer.find((value) => value.id === customerId);
  const isValidGame = games.find((value) => value.id === gameId);
  const isRentalAvailable = games.length >= rentals.length;

  if (!isValidClient || !isValidGame || !isRentalAvailable) {
    return res.sendStatus(400);
  }

  res.locals.game = isValidGame;

  next();
};

export { rentalsValidator };
