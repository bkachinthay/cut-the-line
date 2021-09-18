const { Router } = require('express');
const { connect } = require('../db');

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const { id: vendorId } = req.params;

    const db = await connect();
    const vendor = await db.get(
      `SELECT id, name, description, owner
       FROM vendors WHERE id=?`,
      [vendorId]
    );

    if (!vendor) {
      await db.close();
      return res.json({});
    }

    const items = await db.all(
      `SELECT id, name, price, is_veg
       FROM items WHERE vendor_id=?`,
      [vendorId]
    );
    await db.close();

    return res.json(Object.assign({}, vendor, { items: items || [] }));
  } catch(error) {
    next(error);
  }
})

module.exports = router;
