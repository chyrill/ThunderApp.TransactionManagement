module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class Result {
    constructor(model, message, successful) {
        this.model = model;
        this.message = message;
        this.successful = successful;
    }
}

exports.default = Result;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const devConfig = {
    MONGO_URL: 'mongodb://localhost/TransactionManagement-dev'
};

const testConfig = {
    MONGO_URL: 'mongodb://localhost/TransactionManagement-test'
};

const prodConfig = {
    MONGO_URL: 'mongodb://localhost/TransactionManagement'
};

const defaultConfig = {
    PORT: process.env.PORT || 3002
};

function envConfig(env) {
    switch (env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        default:
            return prodConfig;
    }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(5);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ShoppingCartSchema = new _mongoose.Schema({
    UserId: {
        type: String,
        required: [true, 'User Id is required']
    },
    Items: {
        type: []
    },
    Status: {
        type: String
    },
    DateCreated: {
        type: Date
    },
    CreatedBy: {
        type: String
    },
    ExpirationDate: {
        type: Date
    },
    TotalAmount: {
        type: Object
    }
});

exports.default = _mongoose2.default.model('ShoppingCart', ShoppingCartSchema);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(7);

var _middlewares = __webpack_require__(8);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(13);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

(0, _middlewares2.default)(app);
(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
    if (err) {
        throw err;
    } else {
        console.log(`
      Server running on PORT: ${_constants2.default.PORT}
      ==================================
      Running on ${process.env.NODE_ENV}
      ==================================
      `);
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

try {
    _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
    _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB running')).on('error', e => {
    throw e;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _morgan = __webpack_require__(9);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(10);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(11);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(12);

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
    if (isProd) {
        app.use((0, _compression2.default)());
        app.use(helmet());
    }
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));

    if (isDev) {
        app.use((0, _morgan2.default)('dev'));
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _shoppingcart = __webpack_require__(14);

var _shoppingcart2 = _interopRequireDefault(_shoppingcart);

var _quotation = __webpack_require__(16);

var _quotation2 = _interopRequireDefault(_quotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "*");
        next();
    });
    app.use('/api/v1/shoppingcart', _shoppingcart2.default);
    app.use('/api/v1/quotation', _quotation2.default);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _shoppingcart = __webpack_require__(15);

var shoppingCartController = _interopRequireWildcard(_shoppingcart);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('', shoppingCartController.create);
routes.get('/:UserId', shoppingCartController.getByUserId);
routes.put('', shoppingCartController.update);

exports.default = routes;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
exports.getByUserId = getByUserId;
exports.update = update;

var _Result = __webpack_require__(2);

var _Result2 = _interopRequireDefault(_Result);

var _shoppingcart = __webpack_require__(4);

var _shoppingcart2 = _interopRequireDefault(_shoppingcart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create(req, res) {
    var result = new _Result2.default();

    try {

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

        var cartRes = await _shoppingcart2.default.create(req.body);

        result.model = cartRes;
        result.message = 'Successfully Created Shopping Cart';
        result.successful = false;

        return res.status(200).json(result);
    } catch (e) {
        result.model = req.body;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

async function getByUserId(req, res) {
    var result = new _Result2.default();

    try {
        if (req.params.UserId === 0 || req.params.UserId === null) {
            result.model = null;
            result.message = 'User Id is required';
            result.successful = false;

            return res.status(400).json(result);
        }

        var shoppingCartRes = await _shoppingcart2.default.findOne({ UserId: req.params.UserId, Status: "New" });

        if (shoppingCartRes === null) {
            result.model = null;
            result.message = 'No data retrieve';
            result.successful = false;

            return res.status(400).json(result);
        }
        result.model = shoppingCartRes;
        result.message = 'Successfully retrieve shopping cart';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.model = null;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

async function update(req, res) {
    var result = new _Result2.default();

    try {
        if (req.body.UserId === null || req.body.CreatedBy === null) {
            result.model = req.body;
            result.message = 'User Id is required';
            result.successful = false;

            return res.status(400).json(result);
        }

        var shoppingCartRes = await _shoppingcart2.default.findOneAndUpdate({ _id: req.body._id }, req.body, { upsert: true, strict: false });

        result.model = shoppingCartRes;
        result.message = 'Successfully updated shopping cart';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.model = req.body;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _quotation = __webpack_require__(17);

var QuotationController = _interopRequireWildcard(_quotation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('', QuotationController.create);
routes.get('/new', QuotationController.searchNew);
routes.get('/:id', QuotationController.getById);
routes.put('/quote', QuotationController.updateQuotation);
routes.get('/quote/:id', QuotationController.getQuotationsById);

exports.default = routes;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;
exports.searchNew = searchNew;
exports.getById = getById;
exports.updateQuotation = updateQuotation;
exports.getQuotationsById = getQuotationsById;

var _quotation = __webpack_require__(18);

var _quotation2 = _interopRequireDefault(_quotation);

var _Result = __webpack_require__(2);

var _Result2 = _interopRequireDefault(_Result);

var _SearchResult = __webpack_require__(19);

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _Authorization = __webpack_require__(20);

var _shoppingcart = __webpack_require__(4);

var _shoppingcart2 = _interopRequireDefault(_shoppingcart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create(req, res) {
    var result = new _Result2.default();

    try {

        var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

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

        var shoppingCartRes = await _shoppingcart2.default.findOne({ _id: req.body.ShoppingCartId });
        if (shoppingCartRes === null) {
            result.message = 'Shopping cart not found';
            result.model = req.model;
            result.successful = false;

            return res.status(400).json(result);
        }
        shoppingCartRes.Status = "For Qoute";

        var updateShoppingCart = await _shoppingcart2.default.findOneAndUpdate({ _id: shoppingCartRes._id }, shoppingCartRes, { upsert: true, strict: false });
        req.body.TotalQuote = 0;
        req.body.UserId = shoppingCartRes.UserId;
        req.body.Items = shoppingCartRes.Items;
        req.body.Status = "New";
        console.log(req.body);
        var createRes = await _quotation2.default.create(req.body);

        result.model = createRes;
        result.message = 'Succesfully created quotation';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        result.model = null;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

async function searchNew(req, res) {
    var result = new _SearchResult2.default();

    var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

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
    var items = await _quotation2.default.find({ Context: req.body.Context, Status: 'New' });

    if (items.length < 0) {
        result.items = null;
        result.message = 'No records found';
        result.totalcount = 0;
        result.pages = 0;
        result.successful = false;
        return res.status(400).json(result);
    }

    result.items = items;
    result.message = 'Succesfully retrieve records';
    result.totalcount = items.length;
    result.successful = true;
    return res.status(200).json(result);
}

async function getById(req, res) {
    var result = new _Result2.default();

    try {
        var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authRes.successful != true) {
            result.model = req.body;
            result.message = authRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authRes.model.Context;
            req.body.CreatedBy = authRes.model.Name;
        }

        var item = await _quotation2.default.findOne({ _id: req.params.id, Context: req.body.Context });

        result.model = item;
        result.successful = true;
        result.message = 'Succesfully retrieve data';

        return res.status(200).json(result);
    } catch (e) {
        result.model = null;
        result.successful = false;
        result.message = e.errmsg;
        return res.status(500).json(result);
    }
}

async function updateQuotation(req, res) {
    var result = new _Result2.default();

    try {
        var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

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

        var item = await _quotation2.default.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, Strict: false });

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

async function getQuotationsById(req, res) {
    var result = new _SearchResult2.default();
    try {
        var authRes = await (0, _Authorization.Authorization)(req.headers.authorization);

        if (authRes.successful != true) {
            result.model = req.body;
            result.message = authRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authRes.model.Context;
        }

        var searchRes = await _quotation2.default.find({ UserId: req.params.id, Status: "Quoted" });
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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(5);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const QuotationSchema = new _mongoose.Schema({
    ShoppingCartId: {
        type: String,
        required: [true, 'Shopping Cart Id is required']
    },
    Items: {
        type: []
    },
    TotalQuote: {
        type: Object
    },
    Status: {
        type: String
    },
    Customer: {
        type: Object
    },
    DateCreated: {
        type: Date
    },
    CreatedBy: {
        type: String
    },
    DateUpdated: {
        type: Date
    },
    UpdatedBy: {
        type: String
    },
    Context: {
        type: String
    },
    UserId: {
        type: String
    }
});

exports.default = _mongoose2.default.model('Quotation', QuotationSchema);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class SearchResult {
    constructor(items, totalcount, pages, message, successful) {
        this.items = items;
        this.totalcount = totalcount;
        this.pages = pages;
        this.message = message;
        this.successful = successful;
    }
}

exports.default = SearchResult;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Authorization = Authorization;

var _axios = __webpack_require__(21);

var _axios2 = _interopRequireDefault(_axios);

var _Result = __webpack_require__(2);

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function Authorization(bearer) {
    var data = {};
    try {
        var authCode = bearer.split(" ")[1];
        await _axios2.default.post('http://5aa2c5bc.ngrok.io/api/v1/userLogin/authorize', { Authorization: authCode }).then(response => {
            console.log(response.data);
            data = response.data;
        }).catch(err => {

            data = err.response.data;
        });
        return data;
    } catch (e) {
        console.log(e);
        result.message = e;
        result.successful = false;
        return result;
    }
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })
/******/ ]);