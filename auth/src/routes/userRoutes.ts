import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const route = express.Router();

route.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 & 20 characters'),
  ],
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error('Invalid email or password');
    }

    res.send('hello from signup');
  }
);

route.post('/signin', (req, res) => {
  res.send('hello from signin');
});

route.post('/signout', (req, res) => {
  res.send('hello from signout');
});

route.get('/currentuser', (req, res) => {
  res.send('hello from current user');
});

export default route;
