import { Router } from 'express';
import * as shoppingCartController from './shoppingcart.controller';

const routes = new Router();

routes.post('', shoppingCartController.create);
routes.get('/:UserId', shoppingCartController.getByUserId);
routes.put('', shoppingCartController.update);

export default routes;