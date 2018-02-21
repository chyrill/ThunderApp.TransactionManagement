import { Router } from 'express';
import * as PaymentController from './payment.controller';

const routes = new Router();

routes.post('', PaymentController.create);
routes.put('', PaymentController.update);
routes.delete('/:id', PaymentController.remove);
routes.get('', PaymentController.search);
routes.get('/:id', PaymentController.getById);
routes.get('/searchAll', PaymentController.searchAll);
routes.post('/verify/:id', PaymentController.verifyPayment);

export default routes;