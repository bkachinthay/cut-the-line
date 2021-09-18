const { Router } = require('express');
const { connect } = require('../db');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const db = await connect();
    const vendors = await db.all(
      'SELECT id, name, description FROM vendors'
    );
    await db.close();

    return res.json(vendors);
  } catch(error) {
    next(error);
  }
})

module.exports = router;
