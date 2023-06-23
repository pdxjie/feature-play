module.exports = function(r) {
    if (Array.isArray(r)) {
        for (var e = 0, t = new Array(r.length); e < r.length; e++) t[e] = r[e];
        return t;
    }
};