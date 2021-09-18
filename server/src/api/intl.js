const { Router } = require('express');
const { connect } = require('../db');

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const { id: vendorId } = req.params;

    const db = await connect();
    const intlData = await db.all(
      `SELECT key, english, hindi
       FROM intl
       WHERE vendor_id=?`,
      [vendorId]
    );

    await db.close();

    return res.json(intlData);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
