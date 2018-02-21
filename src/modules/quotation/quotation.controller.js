import Quotation from './quotation.model';
import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { Authorization } from '../../helpers/Authorization';
import ShoppingCart from '../shoppingcart/shoppingcart.model';
import { QueryFilters } from '../../helpers/QueryFilters'

export async function create(req, res) {
    var result = new Result();

    try {

        var authRes = await Authorization(req.headers.authorization);

        if (authRes.successful != true) {
            result.model = req.body;
            result.message = authRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authRes.model.Context;
            req.body.CreatedBy = authRes.model.Name;
            req.body.DateCreated = new Date();
        }

        var shoppingCartRes = await ShoppingCart.findOne({ _id: req.body.ShoppingCartId });
        if (shoppingCartRes === null) {
            result.message = 'Shopping cart not found';
            result.model = req.model;
            result.successful = false;

            return res.status(400).json(result);
        }
        shoppingCartRes.Status = "For Qoute";

        var updateShoppingCart = await ShoppingCart.findOneAndUpdate({ _id: shoppingCartRes._id }, shoppingCartRes, { upsert: true, strict: false });
        req.body.TotalQuote = 0;
        req.body.UserId = shoppingCartRes.UserId;
        req.body.Items = shoppingCartRes.Items;
        req.body.Status = "New";


        var createRes = await Quotation.create(req.body);

        result.model = createRes;
        result.message = 'Succesfully created quotation';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {

        result.model = null;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

export async function searchNew(req, res) {
    var result = new SearchResult();

    var authRes = await Authorization(req.headers.authorization);

    if (authRes.successful != true) {
        result.model = req.body;
        result.message = authRes.message;
        result.successful = false;
        return res.status(401).json(result);
    } else {
        req.body.Context = authRes.model.Context;
        req.body.CreatedBy = authRes.model.Name;
    }
    req.body.TotalQuote = 0;
    var items = await Quotation.find({ Context: req.body.Context, Status: 'New' })

    if (items.length < 0) {
        result.items = null;
        result.message = 'No records found';
        result.totalcount = 0;
        result.pages = 0;
        result.successful = false
        return res.status(400).json(result)
    }

    result.items = items;
    result.message = 'Succesfully retrieve records';
    result.totalcount = items.length;
    result.successful = true;
    return res.status(200).json(result);
}

export async function getById(req, res) {
    var result = new Result();

    try {
        var authRes = await Authorization(req.headers.authorization);

        if (authRes.successful != true) {
            result.model = req.body;
            result.message = authRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authRes.model.Context;
            req.body.CreatedBy = authRes.model.Name;
        }

        var item = await Quotation.findOne({ _id: req.params.id, Context: req.body.Context });

        result.model = item;
        result.successful = true;
        result.message = 'Succesfully retrieve data';

        return res.status(200).json(result);
    } catch (e) {
        result.model = null;
        result.successful = false;
        result.message = e.errmsg;
        return res.status(500).json(result)
    }
}

export async function updateQuotation(req, res) {
    var result = new Result();

    try {
        var authRes = await Authorization(req.headers.authorization);

        if (authRes.successful != true) {
            result.model = req.body;
            result.message = authRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authRes.model.Context;
            req.body.UpdatedBy = authRes.model.Name;
            req.body.DateUpdated = new Date();
        }

        req.body.Status = "Quoted";

        if (req.body.ExpirationDate === null || req.body.ExpirationDate === undefined) {
            var expireDate = new Date();
            expireDate = expireDate.setDate(expireDate.getDate() + 45);
            req.body['ExpirationDate'] = expireDate;
        }

        var item = await Quotation.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, Strict: false });

        result.model = item;
        result.successful = true;
        result.message = 'Succesfully updated record';
        return res.status(200).json(result);
    } catch (e) {
        result.model = null;
        result.successful = false;
        result.message = e.errmsg;
        return res.status(500).json(result);
    }
}

export async function getQuotationsById(req, res) {
    var result = new SearchResult()
    try {

        var dataList = req.params.id.split('.')

        var searchRes = await Quotation.find({ UserId: dataList[1], _id: dataList[0], Status: "Quoted" });
        result.items = searchRes;
        result.totalcount = searchRes.length;
        result.message = 'Succesfully retreive data';
        result.successful = true;
        result.pages = 1;
        return res.status(200).json(result);
    } catch (e) {
        result.items = null;
        result.totalcount = 0;
        result.message = e.errmsg;
        result.successful = false;
        result.pages = 0;
        return res.status(500).json(result);
    }
}

export async function search(req, res) {
    var result = new SearchResult();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        if (req.query.limit === null || req.query.limit === undefined) {
            req.query.limit = 20;
        }
        var filters = {}
        if (req.query.Filters != null) {
            filters = QueryFilters(req.query.Filters, req.body.Context);
        } else {
            filters["Context"] = req.body.Context;
        }

        var quotationsRes = await Quotation.find(filters);

        var totalcount = quotationsRes.length;
        var pages = Math.ceil(quotationsRes.length / req.query.limit);

        var finalItems = await Quotation.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);

        result.items = finalItems;
        result.totalcount = totalcount;
        result.pages = pages;
        result.message = 'Successfully retrieve records';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 1;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

export async function update(req, res) {
    var result = new Result();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.model = req.body;
            result.message = authenticationRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.DateUpdated = new Date();
        }

        var updateRes = await Quotation.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, strict: false });

        result.message = 'Succesfully updated record';
        result.successful = true;
        result.model = updateRes;

        return res.status(200).json(result);
    } catch (e) {
        result.message = e.errmsg;
        result.successful = false;
        result.model = req.body;

        return res.status(500).json(result);
    }
}