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
    let delayFee = 0;
    if (delay > oneDay * rental.daysRented) {
      delayFee = daysDelayed * rental.originalPrice;
    }

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

const rentalGetter = async (req, res) => {
  const { customerId, gameId, status, startDate } = req.query;
  try {
    const rentals = (
      await connection.query(
        `SELECT rentals.*,json_build_object('id', customers.id, 'name', customers.name) AS customer,
          json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals
          JOIN customers ON customers.id = rentals."customerId"
          JOIN games ON games.id = rentals."gameId"
          JOIN categories ON categories.id = games."categoryId" 
           ${customerId ? `WHERE customers.id= ${customerId}` : ""}
           ${gameId ? `WHERE games.id= ${gameId}` : ""}
           ${status === "open" ? `WHERE rentals."returnDate" IS NULL` : ""}
           ${
             status === "closed" ? `WHERE rentals."returnDate" IS NOT NULL` : ""
           }
           ${startDate ? `WHERE rentals."rentDate" >= '${startDate}'` : ""};`
      )
    ).rows;

    rentals.forEach(
      (rental) =>
        (rental.rentDate = rental.rentDate.toLocaleDateString("pt-BR"))
    );

    return res.send(rentals);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const rentalMetrics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const metrics = (
      await connection.query(
        `SELECT SUM (("daysRented" * "originalPrice") + "delayFee")
         AS revenue, COUNT(id) AS rentals FROM rentals 
         ${
           startDate && endDate
             ? `WHERE rentals."rentDate" >= '${startDate}' AND rentals."rentDate" <= '${endDate}'`
             : startDate
             ? `WHERE rentals."rentDate" >= '${startDate}'`
             : endDate
             ? `WHERE rentals."rentDate" <= '${endDate}'`
             : ""
         }    
      ;`
      )
    ).rows;

    const formattedMetrics = {
      ...metrics[0],
      revenue: Number(metrics[0].revenue),
      rentals: Number(metrics[0].rentals),
      average: Number((metrics[0].revenue / metrics[0].rentals).toFixed(2)),
    };

    res.send(formattedMetrics);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { rentalsAdd, rentalsDelete, rentalReturn, rentalGetter, rentalMetrics };
