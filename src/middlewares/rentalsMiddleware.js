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

const deleteValidator = async (req, res, next) => {
  const { id } = req.params;

  const rental = (
    await connection.query("SELECT * FROM rentals WHERE id = $1;", [id])
  ).rows;

  const returnDate = rental[0]?.returnDate;
  const isValidRental = rental.find((value) => value.id == id);

  if (!isValidRental) return res.sendStatus(404);
  if (returnDate === null) return res.sendStatus(400);

  next();
};

const rentalReturnValidator = async (req, res, next) => {
  const { id } = req.params;
  const rental = (
    await connection.query("SELECT * FROM rentals WHERE id = $1;", [id])
  ).rows;

  const isValidRental = rental.find((value) => value.id == id);
  const isRentalFinished = rental.find((value) => value.returnDate !== null);

  if (!isValidRental) return res.sendStatus(404);
  if (isRentalFinished) return res.sendStatus(400);

  res.locals.rental = isValidRental;
  next();
};

export { rentalsValidator, deleteValidator, rentalReturnValidator };
