const sqlite3 = require('sqlite3');
const { open } =require('sqlite');
const Promise = require('bluebird');

sqlite3.verbose();

const DATABASE_PATH = process.env.DATABASE_PATH || 'db/ctl.sqlite3';

const connect = async () => {
  const db = await open({
    filename: DATABASE_PATH,
    driver: sqlite3.Database
  })
  return db;
}

const getOrderItems = (db, orders) => 
  Promise.all(orders.map(({
    id,
    ...rest
  }) => db.all(
    `SELECT oi.item_id,
              oi.count,
              i.name,
              i.price,
              i.is_veg
       FROM Order_items oi
       INNER JOIN items i
       ON oi.item_id=i.id
       WHERE oi.order_id=?`,
    [id]
  ).then((items) => ({
    id,
    items,
    ...rest
  }))));

module.exports = {
  connect,
  getOrderItems

};

