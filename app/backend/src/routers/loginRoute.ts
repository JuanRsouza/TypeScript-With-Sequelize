import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateFieldsLogin from '../middlewares/validateFieldsLogin';
import validateEmailLogin from '../middlewares/validateEmailLogin';
import validateToken from '../middlewares/verifyToken';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter
  .post(
    '/',
    validateFieldsLogin,
    validateEmailLogin,
    (req, res) => loginController.login(req, res),
  );

loginRouter.get('/role', validateToken, (req, res) => loginController.getRole(req, res));

export default loginRouter;
