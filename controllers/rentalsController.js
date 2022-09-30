import { connection } from "../database/db.js";

const rentalsAdd = async (req, res) => {
  const { pricePerDay } = res.locals.game;
  const { daysRented, customerId, gameId } = req.body;

  const rentDate = new Date().toLocaleDateString("pt-BR");
  const originalPrice = daysRented * pricePerDay;
  const returnDate = null;
  const delayFee = null;

  try {
    const InsertRental = await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7);',
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const rentalsDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRental = await connection.query(
      "DELETE FROM rentals WHERE id = $1;",
      [id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const rentalReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const { rental } = res.locals;
    const returnDate = new Date().toLocaleDateString("pt-BR");
    const oneDay = 1000 * 60 * 60 * 24;
    const delay = new Date() - rental.rentDate;
    const daysDelayed = Math.ceil(delay / oneDay);
    let delayFee = null;
    if (delay > oneDay * rental.daysRented) {
      delayFee = daysDelayed * rental.pricePerDay;
    }

    const newRental = { ...rental, returnDate, delayFee };
    const rentalReturnal = await connection.query(
      'UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;',
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { rentalsAdd, rentalsDelete, rentalReturn };
