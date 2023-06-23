var r = require("./arrayWithHoles"), e = require("./iterableToArrayLimit"), t = require("./nonIterableRest");

module.exports = function(i, u) {
    return r(i) || e(i, u) || t();
};