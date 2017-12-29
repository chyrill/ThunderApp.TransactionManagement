import Quotation from './quotation.model';
import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import {Authorization} from '../../helpers/Authorization';
import ShoppingCart from '../shoppingcart/shoppingcart.model';

export async function create(req,res) {
  var result = new Result();

  try{

    var authRes =await Authorization(req.headers.authorization);

    if (authRes.successful!=true){
      result.model = req.body;
      result.message = authRes.message;
      result.successful = false;
      return res.status(401).json(result);
    }
    else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    var shoppingCartRes = await ShoppingCart.findOne({_id:req.body.ShoppingCartId,Context:req.body.Context});

    if (shoppingCartRes=== null) {
      result.message = 'Shopping cart not found' ;
      result.model = req.model;
      result.successful = false;

      return res.status(400).json(result);
    }

    req.body.Items = shoppingCartRes.Items;
    req.body.Status = "New";

    var createRes = await Quotation.create(req.body);

    result.model = createRes;
    result.message = 'Succesfully created quotation';
    result.successful = true;

    return res.status(200).json(result);
  }
  catch (e) {
    result.model = null;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}
