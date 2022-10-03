import express, { Router, Request, Response } from 'express';
import * as validator from '../validators';
import * as schema from './users.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './users.model';

const router: Router = express.Router();

router.post(
  '/signup',
  validator.validateBody(schema.signup),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        status: false,
        data: 'User already exists with the given email'
      });
    }

    // create a new user with a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res
      .status(200)
      .json({ status: true, data: { id: newUser._id, email: newUser.email } });
  }
);

router.post(
  '/login',
  validator.validateBody(schema.login),
  async (req: Request, res: Response) => {
    // check if user exists
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ status: false, message: 'Invalid Email!' });

    // compare passwords
    const match = bcrypt.compareSync(password, user.password as string);

    if (match)
      res.json({
        status: true,
        data: jwt.sign(
          { id: user._id, email: user.email },
          process.env.SECRET as string
        )
      });
    else res.status(400).json({ status: false, message: 'Incorrect password' });
  }
);

export default router;
