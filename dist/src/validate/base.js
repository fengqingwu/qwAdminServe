"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var valiate = exports.valiate = function valiate(param, rulesObj) {
    for (var key in rulesObj) {
        console.log("key==>", key);
        var rules = rulesObj[key];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var rule = _step.value;

                if ('function' == typeof rule.validator) {
                    console.log("validatordone==");
                    var result = rule.validator(rule, param[key]);
                    if (!result.result) {
                        return result;
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return { result: true };
};