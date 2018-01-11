import { Router } from 'express';
import * as QuotationController from './quotation.controller';


const routes = new Router();

routes.post('', QuotationController.create);
routes.get('/new', QuotationController.searchNew);
routes.get('/:id', QuotationController.getById);
routes.put('/quote',QuotationController.updateQuotation);
routes.get('/quote/:id',QuotationController.getQuotationsById);

export default routes;
