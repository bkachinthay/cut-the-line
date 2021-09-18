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
              v.owner
       FROM orders o
       INNER JOIN vendors v
       ON o.vendor_id = v.id
       WHERE o.status='STATUS_COMPLETE'
       AND   v.owner=?
       ORDER BY o.creation_time DESC`,
      [username]
    )

    const orderWithItems = await getOrderItems(db, orders);
    await db.close();

    return res.json(orderWithItems);
  } catch(error) {
    next(error);
  }
})

module.exports = router;
