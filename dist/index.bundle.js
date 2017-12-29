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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(4);

var _middlewares = __webpack_require__(5);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(10);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(1);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(6);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(7);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(8);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(9);

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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shoppingcart = __webpack_require__(11);

var _shoppingcart2 = _interopRequireDefault(_shoppingcart);

var _quotation = __webpack_require__(16);

var _quotation2 = _interopRequireDefault(_quotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/api/v1/shoppingcart', _shoppingcart2.default);
  app.use('/api/v1/quotation', _quotation2.default);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _shoppingcart = __webpack_require__(12);

var shoppingCartController = _interopRequireWildcard(_shoppingcart);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const routes = new _express.Router();

routes.post('', shoppingCartController.create);
routes.get('/:UserId', shoppingCartController.getByUserId);
routes.put('', shoppingCartController.update);

exports.default = routes;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getByUserId = getByUserId;
exports.update = update;

var _Result = __webpack_require__(13);

var _Result2 = _interopRequireDefault(_Result);

var _shoppingcart = __webpack_require__(14);

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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(15);

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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("validator");

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

exports.default = routes;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;

var _quotation = __webpack_require__(18);

var _quotation2 = _interopRequireDefault(_quotation);

var _Result = __webpack_require__(13);

var _Result2 = _interopRequireDefault(_Result);

var _SearchResult = __webpack_require__(19);

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _Authorization = __webpack_require__(20);

var _shoppingcart = __webpack_require__(14);

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
        }

        var shoppingCartRes = await _shoppingcart2.default.findOne({ _id: req.body.ShoppingCartId, Context: req.body.Context });

        if (shoppingCartRes === null) {
            result.message = 'Shopping cart not found';
            result.model = req.model;
            result.successful = false;

            return res.status(400).json(result);
        }

        req.body.Items = shoppingCartRes.Items;
        req.body.Status = "New";

        var createRes = await _quotation2.default.create(req.body);

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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(15);

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
  TotalQoute: {
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

var _Result = __webpack_require__(13);

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function Authorization(bearer) {
  var data = {};
  try {
    var authCode = bearer.split(" ")[1];
    await _axios2.default.post('http://localhost:3000/api/v1/userLogin/authorize', { Authorization: authCode }).then(response => {
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