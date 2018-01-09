import { Router } from 'express';
import * as QuotationController from './quotation.controller';


const routes = new Router();

routes.post('', QuotationController.create);
routes.get('/new', QuotationController.searchNew);
routes.get('/:id', QuotationController.getById);

export default routes;