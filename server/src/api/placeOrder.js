const { Router } = require('express');
const { connect } = require('../db');

const router = Router();

// TODO: use commit rollback to revert changes if later inserts fail.
router.post('/', async (req, res, next) => {
  try {
    const { vendorId, items } = req.body;

    if (!vendorId) {
      return res.status(400).json({
        message: "Vendor id expected."
      })
    }

    if (!items || !items.length) {
      return res.status(400).json({
        message: "Items expected."
      })
    }

    const { username, role } = req.decoded || {}; // eslint-disable-line
    const db = await connect();

    const { token_no = 0 } = await db.get(
      `SELECT token_no
       FROM vendors
       WHERE id=?`,
      [vendorId]
    );

    const newTokenNo = token_no >= 100 ? 1 : (token_no + 1);

    await db.run(
      `INSERT INTO orders (
        order_by,
        vendor_id,
        token_no,
        status
      ) VALUES (
        ?,
        ?,
        ?,
        'STATUS_WAITING'
      )`, [username, vendorId, newTokenNo]);

    // const { orderId } = await db.get(
    //   `SELECT last_insert_rowid() as orderId`
    // );
    const {
      orderId,
      status,
      creation_time,
      vendor_name,
      vendor_user_name
    } = await db.get(
      `SELECT o.id as orderId,
              o.creation_time,
              o.status,
              v.name as vendor_name,
              v.owner as vendor_user_name
       FROM orders o
       INNER JOIN vendors v
       ON o.vendor_id=v.id
       WHERE  o.id=last_insert_rowid()`
    );

    if (!orderId) {
      await db.close();
      return res.status(500).json({
        message: "Failed to create order."
      });
    }

    for (const { id: itemId, count } of items) {
      await db.run(
        `INSERT INTO order_items (
        item_id,
        count,
        order_id
      ) VALUES (
        ?,
        ?,
        ?)`, [itemId, count, orderId]);
    }

    await db.run(
      `UPDATE vendors SET token_no = ?
       where id = ?`,
      [newTokenNo, vendorId]
    )

    const creationTime = await db.get(`SELECT creation_time FROM orders WHERE id=?`, )

    await db.close();

    return res.json({
      success: true,
      orderId,
      tokenNo: newTokenNo,
      creation_time,
      status,
      vendor_name,
      vendor_user_name,
      username
    });
  } catch(error) {
    next(error);
  }
})

module.exports = router;
