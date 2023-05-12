import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateFieldsLogin from '../middlewares/validateFieldsLogin';
import validateEmailLogin from '../middlewares/validateEmailLogin';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter
  .post(
    '/',
    validateFieldsLogin,
    validateEmailLogin,
    (req, res) => loginController.login(req, res),
  );

export default loginRouter;
