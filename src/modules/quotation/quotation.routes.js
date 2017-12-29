import {Router} from 'express';
import * as QuotationController from './quotation.controller';


const routes = new Router();

routes.post('',QuotationController.create);


export default routes;
