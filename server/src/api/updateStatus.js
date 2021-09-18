const { Router } = require('express');
const { connect } = require('../db');

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId) {
      return res.status(400).json({
        message: "Order id expected."
      })
    }

    if (!status) {
      return res.status(400).json({
        message: "status expected."
      })
    }

    const { username, role } = req.decoded || {}; // eslint-disable-line
    const db = await connect();

    const { id: vendorId } = await db.get(
      `SELECT id FROM vendors WHERE owner=?`,
      [username]
    )

    if (!vendorId) {
      await db.close();
      return res.status(400).json({
        message: "Only vendor can update order status."
      })
    }

    await db.run(
      `UPDATE orders SET status = ?, token_no = 0
       where id = ?
       AND vendor_id = ?`
      ,
      [status, orderId, vendorId]
    );

    const { updatedRowCnt } = await db.get(`SELECT changes() as updatedRowCnt`);
    await db.close();

    if (!updatedRowCnt) {
      return res.status(500).json({
        message: "Failed to update order status."
      });
    }

    return res.json({ success: true, orderId, status });
  } catch(error) {
    next(error);
  }
})

module.exports = router;
