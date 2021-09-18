const { Router } = require('express');
const { connect, getOrderItems } = require('../db');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const db = await connect();
    const { username, role } = req.decoded || {}; // eslint-disable-line

    const orders = await db.all(
      `SELECT o.id,
              o.order_by,
              o.vendor_id,
              o.token_no,
              o.status,
              o.creation_time,
              v.name as vendor_name,
              v.owner as vendor_user_name
       FROM orders o
       INNER JOIN vendors v
       ON o.vendor_id=v.id
       WHERE o.order_by=?
       AND   o.status != 'STATUS_COMPLETE'
       ORDER BY o.creation_time DESC`,
      [username]
    );

    const orderWithItems = await getOrderItems(db, orders);
    await db.close();

    return res.json({ orders: orderWithItems, username });
  } catch(error) {
    next(error);
  }
})

module.exports = router;
