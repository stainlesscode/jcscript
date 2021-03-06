/* JCFluxStore.js
 * Represents a basic flux store modeled by a JCObject
 * Dependencies: extend, flux, es6-mixin modules, JCObject, FluxStore classes
 * Author: Joshua Carter
 * Created: November 6, 2016
 */
"use strict";
//include modules

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JCFluxStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//include classes


var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _flux = require('flux');

var _flux2 = _interopRequireDefault(_flux);

var _es6Mixins = require('es6-mixins');

var _es6Mixins2 = _interopRequireDefault(_es6Mixins);

var _JCObject = require('./JCObject.js');

var _FluxStore2 = require('./FluxStore.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//create our actions class
var JCActionsService = function () {
    function JCActionsService(Dispatcher, ACTIONS) {
        _classCallCheck(this, JCActionsService);

        //create shortcut for our constants
        this._ACTIONS = ACTIONS;
        this._Dispatcher = Dispatcher;
    }

    // updates object with new data
    // - id (int) The id of the object to update
    // - data (obj, string) A collection of properties and new values to update OR the name of a single property to update
    // - val (string -- optional) If data is string (single prop), the value to update it to


    _createClass(JCActionsService, [{
        key: 'update',
        value: function update(id, data, val) {
            this._Dispatcher.dispatch({
                type: this._ACTIONS.UPDATE,
                id: id,
                params: [data, val]
            });
        }
    }]);

    return JCActionsService;
}(),

//create set of constants
ACTIONS = {
    UPDATE: "JCSTORE1"
},

//create new dispatcher
JCDispatch = new _flux2.default.Dispatcher(),

//create new actions service
JCActions = new JCActionsService(JCDispatch, ACTIONS);
//inherit from both JCObject and FluxStore
(0, _es6Mixins2.default)(_JCObject.JCObject, _FluxStore2.FluxStore.prototype, { warn: false, mergeDuplicates: false });
//create JCFluxStore class from FluxStore

var JCFluxStore = function (_FluxStore) {
    _inherits(JCFluxStore, _FluxStore);

    function JCFluxStore(data, defaults, Dispatch, Actions, AC) {
        _classCallCheck(this, JCFluxStore);

        //if we weren't given defaults, use data
        var defaults = defaults || data,

        //if we weren't given a Dipsatch, use JCDispatch
        Dispatcher = Dispatch || JCDispatch;
        //pass data to FluxStore

        //call JCObject constructor
        var _this = _possibleConstructorReturn(this, (JCFluxStore.__proto__ || Object.getPrototypeOf(JCFluxStore)).call(this, Dispatcher));

        (0, _extend2.default)(_this, new _JCObject.JCObject(defaults), _this);

        //store services
        _this._Actions = Actions || JCActions;
        //store contants
        _this._AC = AC || ACTIONS;
        //create flux actions
        _this.fluxActions[_this._AC.UPDATE] = "update";

        //update our store with the given data
        _this._updateData(data);
        return _this;
    }

    //GETTERS
    //gets actions service


    _createClass(JCFluxStore, [{
        key: 'Actions',
        value: function Actions() {
            return this._Actions;
        }

        //SETTERS
        // accessor for JCObject.update(), triggers change on store

    }, {
        key: 'update',
        value: function update(data, val) {
            //update this
            this._updateData(data, val);
            //our store has likely changed
            this.emitChange();
        }
    }]);

    return JCFluxStore;
}(_FluxStore2.FluxStore);
//child will have method the same name as the parent


JCFluxStore.prototype._updateData = _JCObject.JCObject.prototype.update;
//export
exports.JCFluxStore = JCFluxStore;