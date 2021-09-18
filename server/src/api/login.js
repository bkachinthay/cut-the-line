const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { connect } = require('../db');

const router = Router();

const SECRET = process.env.APP_SECRET;

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(404).json({
      auth: false,
      token: null,
      message: "Expect both username and password"
    })

    const db = await connect();
    const user = await db.get(
      `SELECT username, role, password
       FROM users WHERE username=?`,
      [username]
    )
    await db.close();

    const passwordIsValid = bcrypt.compareSync(
      password,
      (user || {}).password
    );

    if (!passwordIsValid) return res.status(401).json({
      auth: false,
      token: null,
      message: "Invalid username or password"
    })

    const token = jwt.sign({
      username: user.username,
      role: user.role
    },
    SECRET,
    { expiresIn: 86400 } // expires in 24 hours
    )

    return res.json({
      auth: true,
      token,
    });
  } catch (error) {
    next(error);
  }
})

module.exports = router;
