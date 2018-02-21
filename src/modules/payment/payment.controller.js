import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { Authorization } from '../../helpers/Authorization';
import { QueryFilters } from '../../helpers/QueryFilters';
import Payment from './payment.model';


export async function create(req, res) {
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
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        if (req.body.PaymentType !== 'Cash') {
            req.body['Verified'] = false;
        }

        var paymentId = new Date().getYear() + '-' + new Date().getMonth() + '-' + new Date().getDate();

        req.body['PaymentNo'] = paymentId;

        var createRes = await Payment.create(req.body);

        result.message = 'successfully created record';
        result.successful = true;
        result.model = createRes;

        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        result.message = e.errmsg;
        result.successful = false;
        result.model = req.body;

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
            req.body.UpdatedBy = authenticationRes.model.Name;
            req.body.DateUpdated = new Date();
        }

        await Payment.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, strict: false });

        result.message = 'Successfully updated record';
        result.successful = true;
        result.model = req.body;

        return res.status(200).json(result);
    } catch (e) {
        result.message = e.errmsg;
        result.successful = false;
        result.model = req.body;

        return res.status(500).json(result);
    }
}

export async function getById(req, res) {
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
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null || id === undefined) {
            result.message = 'Id is required';
            result.successful = false;
            result.model = null;

            return res.status(400).json(result);
        }

        var searchItem = await Payment.findOne({ _id: id, Context: req.body.Context });

        result.message = 'Successfully retrieve record';
        result.successful = true;
        result.model = searchItem;

        return res.status(200).json(result);
    } catch (e) {
        result.message = e.errmsg;
        result.successful = false;
        result.model = null;

        return res.status(500).json(result);
    }
}

export async function remove(req, res) {
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
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null || id === undefined) {
            result.message = 'Id is required';
            result.successful = false;
            result.model = null;

            return res.status(400).json(result);
        }

        await Payment.findOneAndRemove({ _id: id, Context: req.body.Context });

        result.message = 'Successfully deleted record';
        result.successful = true;
        result.model = null;

        return res.status(200).json(result);

    } catch (e) {
        result.message = e.errmsg;
        result.successful = false;
        result.model = null;

        return res.status(500).json(result);
    }
}

export async function search(req, res) {
    var result = new SearchResult();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.model = req.body;
            result.message = authenticationRes.message;
            result.successful = false;
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

        var searchItemRes = await Payment.find(filters);

        var totalcount = searchItemRes.length;
        var pages = Math.ceil(searchItemRes.length / req.query.limit);

        var finalItemRes = await Payment.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);

        result.items = finalItemRes;
        result.totalcount = totalcount;
        result.pages = pages;
        result.message = 'Successfully retrieve record';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

export async function searchAll(req, res) {
    var result = new SearchResult();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.model = req.body;
            result.message = authenticationRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var searchItemRes = await Payment.find({ Context: req.body.Context });

        result.items = searchItemRes;
        result.totalcount = searchItemRes.length;
        result.pages = 1;
        result.message = 'Successfully retreive records';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

export async function verifyPayment(req, res) {
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
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var searchPayment = await Payment.findOne({ _id: req.params.id, Context: req.body.Context })

        searchPayment.Verified = !searchPayment.Verified;

        await Payment.findOneAndUpdate({ _id: req.params.id }, searchPayment, { Upsert: true, strict: false });

        result.message = 'Successfully verified Payment';
        result.successful = true;
        result.model = searchPayment;

        return res.status(200).json(result);

    } catch (e) {
        console.log(e)
        result.message = e.errmsg;
        result.successful = false;
        result.model = null;

        return res.status(500).json(result);
    }
}