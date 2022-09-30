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
    const deletedRentals = await connection.query(
      "DELETE FROM rentals WHERE id = $1;",
      [id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { rentalsAdd, rentalsDelete };
