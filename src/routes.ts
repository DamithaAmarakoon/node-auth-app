import express, { Router } from 'express';
import userRouter from './users/users.router';

const router: Router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// set user routes
router.use('/users', userRouter);

export default router;
