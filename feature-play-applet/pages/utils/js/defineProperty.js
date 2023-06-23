function _defineProperty(e, r, n) {
    return r in e ? Object.defineProperty(e, r, {
        value: n,
        enumerable: true,
        configurable: true,
        writable: true
    }) : e[r] = n, e;
}

module.exports = _defineProperty;