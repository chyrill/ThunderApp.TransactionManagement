import shoppingCartRoutes from './shoppingcart/shoppingcart.routes';
import quotationRoutes from './quotation/quotation.routes';

export default app => {
  app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/api/v1/shoppingcart',shoppingCartRoutes);
  app.use('/api/v1/quotation',quotationRoutes);
};
