import Result from '../../helpers/Result';
import ShoppingCart from './shoppingcart.model';


export async function create(req,res) {
  var result = new Result();

  try{

    if (req.body.UserId === null || req.body.CreatedBy === null) {
      result.model = req.body;
      result.message = 'User Id is required';
      result.successful = false;

      return res.status(400).json(result);
    }
    var dateNow = new Date();

    var expirationDate = dateNow.setDate(dateNow.getDate() + 1);

    req.body.ExpirationDate = expirationDate;
    req.body.Status = "New";

    var cartRes = await ShoppingCart.create(req.body);

    result.model = cartRes;
    result.message = 'Successfully Created Shopping Cart';
    result.successful = false;

    return res.status(200).json(result);
  }
  catch (e) {
    result.model = req.body;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}

export async function getByUserId(req,res) {
  var result = new Result();

  try {
    if (req.params.UserId === 0 || req.params.UserId === null) {
      result.model = null;
      result.message = 'User Id is required';
      result.successful = false;

      return res.status(400).json(result);
    }

    var shoppingCartRes = await ShoppingCart.findOne({UserId:req.params.UserId,Status:"New"});

    if (shoppingCartRes === null){
      result.model = null;
      result.message = 'No data retrieve';
      result.successful = false;

      return res.status(400).json(result);
    }
    result.model = shoppingCartRes;
    result.message = 'Successfully retrieve shopping cart';
    result.successful = true;

    return res.status(200).json(result);
  }
  catch (e){
    result.model = null;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}

export async function update(req,res) {
  var result = new Result();

  try{
    if (req.body.UserId === null || req.body.CreatedBy === null) {
      result.model = req.body;
      result.message = 'User Id is required';
      result.successful = false;

      return res.status(400).json(result);
    }

    var shoppingCartRes = await ShoppingCart.findOneAndUpdate({_id:req.body._id},req.body,{upsert: true, strict: false});

    result.model = shoppingCartRes;
    result.message = 'Successfully updated shopping cart';
    result.successful = true;

    return res.status(200).json(result);
  }catch (e) {
    result.model = req.body;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}
