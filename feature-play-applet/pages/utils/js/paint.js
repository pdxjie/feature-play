var t, e = require("./typeof.js");
t = function() {
    function t(t) {
        this.mode = r.MODE_8BIT_BYTE, this.data = t;
    }
    function e(t, e) {
        this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, 
        this.dataCache = null, this.dataList = new Array();
    }
    t.prototype = {
        getLength: function(t) {
            return this.data.length;
        },
        write: function(t) {
            for (var e = 0; e < this.data.length; e++) t.put(this.data.charCodeAt(e), 8);
        }
    }, e.prototype = {
        addData: function(e) {
            var r = new t(e);
            this.dataList.push(r), this.dataCache = null;
        },
        isDark: function(t, e) {
            if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + "," + e);
            return this.modules[t][e];
        },
        getModuleCount: function() {
            return this.moduleCount;
        },
        make: function() {
            if (this.typeNumber < 1) {
                var t = 1;
                for (t = 1; t < 40; t++) {
                    for (var e = B.getRSBlocks(t, this.errorCorrectLevel), r = new L(), n = 0, o = 0; o < e.length; o++) n += e[o].dataCount;
                    for (o = 0; o < this.dataList.length; o++) {
                        var i = this.dataList[o];
                        r.put(i.mode, 4), r.put(i.getLength(), m.getLengthInBits(i.mode, t)), i.write(r);
                    }
                    if (r.getLengthInBits() <= 8 * n) break;
                }
                this.typeNumber = t;
            }
            this.makeImpl(false, this.getBestMaskPattern());
        },
        makeImpl: function(t, r) {
            this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
            for (var n = 0; n < this.moduleCount; n++) {
                this.modules[n] = new Array(this.moduleCount);
                for (var o = 0; o < this.moduleCount; o++) this.modules[n][o] = null;
            }
            this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), 
            this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), 
            this.setupTimingPattern(), this.setupTypeInfo(t, r), this.typeNumber >= 7 && this.setupTypeNumber(t), 
            null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), 
            this.mapData(this.dataCache, r);
        },
        setupPositionProbePattern: function(t, e) {
            for (var r = -1; r <= 7; r++) if (!(t + r <= -1 || this.moduleCount <= t + r)) for (var n = -1; n <= 7; n++) e + n <= -1 || this.moduleCount <= e + n || (this.modules[t + r][e + n] = 0 <= r && r <= 6 && (0 == n || 6 == n) || 0 <= n && n <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= n && n <= 4);
        },
        getBestMaskPattern: function() {
            for (var t = 0, e = 0, r = 0; r < 8; r++) {
                this.makeImpl(true, r);
                var n = m.getLostPoint(this);
                (0 == r || t > n) && (t = n, e = r);
            }
            return e;
        },
        createMovieClip: function(t, e, r) {
            var n = t.createEmptyMovieClip(e, r);
            this.make();
            for (var o = 0; o < this.modules.length; o++) for (var i = 1 * o, a = 0; a < this.modules[o].length; a++) {
                var s = 1 * a;
                this.modules[o][a] && (n.beginFill(0, 100), n.moveTo(s, i), n.lineTo(s + 1, i), 
                n.lineTo(s + 1, i + 1), n.lineTo(s, i + 1), n.endFill());
            }
            return n;
        },
        setupTimingPattern: function() {
            for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
            for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
        },
        setupPositionAdjustPattern: function() {
            for (var t = m.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var r = 0; r < t.length; r++) {
                var n = t[e], o = t[r];
                if (null == this.modules[n][o]) for (var i = -2; i <= 2; i++) for (var a = -2; a <= 2; a++) this.modules[n + i][o + a] = -2 == i || 2 == i || -2 == a || 2 == a || 0 == i && 0 == a;
            }
        },
        setupTypeNumber: function(t) {
            for (var e = m.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
                var n = !t && 1 == (e >> r & 1);
                this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = n;
            }
            for (r = 0; r < 18; r++) n = !t && 1 == (e >> r & 1), this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = n;
        },
        setupTypeInfo: function(t, e) {
            for (var r = this.errorCorrectLevel << 3 | e, n = m.getBCHTypeInfo(r), o = 0; o < 15; o++) {
                var i = !t && 1 == (n >> o & 1);
                o < 6 ? this.modules[o][8] = i : o < 8 ? this.modules[o + 1][8] = i : this.modules[this.moduleCount - 15 + o][8] = i;
            }
            for (o = 0; o < 15; o++) i = !t && 1 == (n >> o & 1), o < 8 ? this.modules[8][this.moduleCount - o - 1] = i : o < 9 ? this.modules[8][15 - o - 1 + 1] = i : this.modules[8][15 - o - 1] = i;
            this.modules[this.moduleCount - 8][8] = !t;
        },
        mapData: function(t, e) {
            for (var r = -1, n = this.moduleCount - 1, o = 7, i = 0, a = this.moduleCount - 1; a > 0; a -= 2) for (6 == a && a--; ;) {
                for (var s = 0; s < 2; s++) if (null == this.modules[n][a - s]) {
                    var u = false;
                    i < t.length && (u = 1 == (t[i] >>> o & 1)), m.getMask(e, n, a - s) && (u = !u), 
                    this.modules[n][a - s] = u, -1 == --o && (i++, o = 7);
                }
                if ((n += r) < 0 || this.moduleCount <= n) {
                    n -= r, r = -r;
                    break;
                }
            }
        }
    }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(t, r, n) {
        for (var o = B.getRSBlocks(t, r), i = new L(), a = 0; a < n.length; a++) {
            var s = n[a];
            i.put(s.mode, 4), i.put(s.getLength(), m.getLengthInBits(s.mode, t)), s.write(i);
        }
        var u = 0;
        for (a = 0; a < o.length; a++) u += o[a].dataCount;
        if (i.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + i.getLengthInBits() + ">" + 8 * u + ")");
        for (i.getLengthInBits() + 4 <= 8 * u && i.put(0, 4); i.getLengthInBits() % 8 != 0; ) i.putBit(false);
        for (;!(i.getLengthInBits() >= 8 * u || (i.put(e.PAD0, 8), i.getLengthInBits() >= 8 * u)); ) i.put(e.PAD1, 8);
        return e.createBytes(i, o);
    }, e.createBytes = function(t, e) {
        for (var r = 0, n = 0, o = 0, i = new Array(e.length), a = new Array(e.length), s = 0; s < e.length; s++) {
            var u = e[s].dataCount, h = e[s].totalCount - u;
            n = Math.max(n, u), o = Math.max(o, h), i[s] = new Array(u);
            for (var l = 0; l < i[s].length; l++) i[s][l] = 255 & t.buffer[l + r];
            r += u;
            var f = m.getErrorCorrectPolynomial(h), g = new p(i[s], f.getLength() - 1).mod(f);
            for (a[s] = new Array(f.getLength() - 1), l = 0; l < a[s].length; l++) {
                var d = l + g.getLength() - a[s].length;
                a[s][l] = d >= 0 ? g.get(d) : 0;
            }
        }
        var c = 0;
        for (l = 0; l < e.length; l++) c += e[l].totalCount;
        var v = new Array(c), C = 0;
        for (l = 0; l < n; l++) for (s = 0; s < e.length; s++) l < i[s].length && (v[C++] = i[s][l]);
        for (l = 0; l < o; l++) for (s = 0; s < e.length; s++) l < a[s].length && (v[C++] = a[s][l]);
        return v;
    };
    for (var r = {
        MODE_NUMBER: 1,
        MODE_ALPHA_NUM: 2,
        MODE_8BIT_BYTE: 4,
        MODE_KANJI: 8
    }, n = 1, o = 0, i = 3, a = 2, s = 0, u = 1, h = 2, l = 3, f = 4, g = 5, d = 6, c = 7, m = {
        PATTERN_POSITION_TABLE: [ [], [ 6, 18 ], [ 6, 22 ], [ 6, 26 ], [ 6, 30 ], [ 6, 34 ], [ 6, 22, 38 ], [ 6, 24, 42 ], [ 6, 26, 46 ], [ 6, 28, 50 ], [ 6, 30, 54 ], [ 6, 32, 58 ], [ 6, 34, 62 ], [ 6, 26, 46, 66 ], [ 6, 26, 48, 70 ], [ 6, 26, 50, 74 ], [ 6, 30, 54, 78 ], [ 6, 30, 56, 82 ], [ 6, 30, 58, 86 ], [ 6, 34, 62, 90 ], [ 6, 28, 50, 72, 94 ], [ 6, 26, 50, 74, 98 ], [ 6, 30, 54, 78, 102 ], [ 6, 28, 54, 80, 106 ], [ 6, 32, 58, 84, 110 ], [ 6, 30, 58, 86, 114 ], [ 6, 34, 62, 90, 118 ], [ 6, 26, 50, 74, 98, 122 ], [ 6, 30, 54, 78, 102, 126 ], [ 6, 26, 52, 78, 104, 130 ], [ 6, 30, 56, 82, 108, 134 ], [ 6, 34, 60, 86, 112, 138 ], [ 6, 30, 58, 86, 114, 142 ], [ 6, 34, 62, 90, 118, 146 ], [ 6, 30, 54, 78, 102, 126, 150 ], [ 6, 24, 50, 76, 102, 128, 154 ], [ 6, 28, 54, 80, 106, 132, 158 ], [ 6, 32, 58, 84, 110, 136, 162 ], [ 6, 26, 54, 82, 110, 138, 166 ], [ 6, 30, 58, 86, 114, 142, 170 ] ],
        G15: 1335,
        G18: 7973,
        G15_MASK: 21522,
        getBCHTypeInfo: function(t) {
            for (var e = t << 10; m.getBCHDigit(e) - m.getBCHDigit(m.G15) >= 0; ) e ^= m.G15 << m.getBCHDigit(e) - m.getBCHDigit(m.G15);
            return (t << 10 | e) ^ m.G15_MASK;
        },
        getBCHTypeNumber: function(t) {
            for (var e = t << 12; m.getBCHDigit(e) - m.getBCHDigit(m.G18) >= 0; ) e ^= m.G18 << m.getBCHDigit(e) - m.getBCHDigit(m.G18);
            return t << 12 | e;
        },
        getBCHDigit: function(t) {
            for (var e = 0; 0 != t; ) e++, t >>>= 1;
            return e;
        },
        getPatternPosition: function(t) {
            return m.PATTERN_POSITION_TABLE[t - 1];
        },
        getMask: function(t, e, r) {
            switch (t) {
              case s:
                return (e + r) % 2 == 0;

              case u:
                return e % 2 == 0;

              case h:
                return r % 3 == 0;

              case l:
                return (e + r) % 3 == 0;

              case f:
                return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;

              case g:
                return e * r % 2 + e * r % 3 == 0;

              case d:
                return (e * r % 2 + e * r % 3) % 2 == 0;

              case c:
                return (e * r % 3 + (e + r) % 2) % 2 == 0;

              default:
                throw new Error("bad maskPattern:" + t);
            }
        },
        getErrorCorrectPolynomial: function(t) {
            for (var e = new p([ 1 ], 0), r = 0; r < t; r++) e = e.multiply(new p([ 1, v.gexp(r) ], 0));
            return e;
        },
        getLengthInBits: function(t, e) {
            if (1 <= e && e < 10) switch (t) {
              case r.MODE_NUMBER:
                return 10;

              case r.MODE_ALPHA_NUM:
                return 9;

              case r.MODE_8BIT_BYTE:
              case r.MODE_KANJI:
                return 8;

              default:
                throw new Error("mode:" + t);
            } else if (e < 27) switch (t) {
              case r.MODE_NUMBER:
                return 12;

              case r.MODE_ALPHA_NUM:
                return 11;

              case r.MODE_8BIT_BYTE:
                return 16;

              case r.MODE_KANJI:
                return 10;

              default:
                throw new Error("mode:" + t);
            } else {
                if (!(e < 41)) throw new Error("type:" + e);
                switch (t) {
                  case r.MODE_NUMBER:
                    return 14;

                  case r.MODE_ALPHA_NUM:
                    return 13;

                  case r.MODE_8BIT_BYTE:
                    return 16;

                  case r.MODE_KANJI:
                    return 12;

                  default:
                    throw new Error("mode:" + t);
                }
            }
        },
        getLostPoint: function(t) {
            for (var e = t.getModuleCount(), r = 0, n = 0; n < e; n++) for (var o = 0; o < e; o++) {
                for (var i = 0, a = t.isDark(n, o), s = -1; s <= 1; s++) if (!(n + s < 0 || e <= n + s)) for (var u = -1; u <= 1; u++) o + u < 0 || e <= o + u || 0 == s && 0 == u || a == t.isDark(n + s, o + u) && i++;
                i > 5 && (r += 3 + i - 5);
            }
            for (n = 0; n < e - 1; n++) for (o = 0; o < e - 1; o++) {
                var h = 0;
                t.isDark(n, o) && h++, t.isDark(n + 1, o) && h++, t.isDark(n, o + 1) && h++, t.isDark(n + 1, o + 1) && h++, 
                0 != h && 4 != h || (r += 3);
            }
            for (n = 0; n < e; n++) for (o = 0; o < e - 6; o++) t.isDark(n, o) && !t.isDark(n, o + 1) && t.isDark(n, o + 2) && t.isDark(n, o + 3) && t.isDark(n, o + 4) && !t.isDark(n, o + 5) && t.isDark(n, o + 6) && (r += 40);
            for (o = 0; o < e; o++) for (n = 0; n < e - 6; n++) t.isDark(n, o) && !t.isDark(n + 1, o) && t.isDark(n + 2, o) && t.isDark(n + 3, o) && t.isDark(n + 4, o) && !t.isDark(n + 5, o) && t.isDark(n + 6, o) && (r += 40);
            var l = 0;
            for (o = 0; o < e; o++) for (n = 0; n < e; n++) t.isDark(n, o) && l++;
            return r += Math.abs(100 * l / e / e - 50) / 5 * 10;
        }
    }, v = {
        glog: function(t) {
            if (t < 1) throw new Error("glog(" + t + ")");
            return v.LOG_TABLE[t];
        },
        gexp: function(t) {
            for (;t < 0; ) t += 255;
            for (;t >= 256; ) t -= 255;
            return v.EXP_TABLE[t];
        },
        EXP_TABLE: new Array(256),
        LOG_TABLE: new Array(256)
    }, C = 0; C < 8; C++) v.EXP_TABLE[C] = 1 << C;
    for (C = 8; C < 256; C++) v.EXP_TABLE[C] = v.EXP_TABLE[C - 4] ^ v.EXP_TABLE[C - 5] ^ v.EXP_TABLE[C - 6] ^ v.EXP_TABLE[C - 8];
    for (C = 0; C < 255; C++) v.LOG_TABLE[v.EXP_TABLE[C]] = C;
    function p(t, e) {
        if (null == t.length) throw new Error(t.length + "/" + e);
        for (var r = 0; r < t.length && 0 == t[r]; ) r++;
        this.num = new Array(t.length - r + e);
        for (var n = 0; n < t.length - r; n++) this.num[n] = t[n + r];
    }
    function B(t, e) {
        this.totalCount = t, this.dataCount = e;
    }
    function L() {
        this.buffer = new Array(), this.length = 0;
    }
    return p.prototype = {
        get: function(t) {
            return this.num[t];
        },
        getLength: function() {
            return this.num.length;
        },
        multiply: function(t) {
            for (var e = new Array(this.getLength() + t.getLength() - 1), r = 0; r < this.getLength(); r++) for (var n = 0; n < t.getLength(); n++) e[r + n] ^= v.gexp(v.glog(this.get(r)) + v.glog(t.get(n)));
            return new p(e, 0);
        },
        mod: function(t) {
            if (this.getLength() - t.getLength() < 0) return this;
            for (var e = v.glog(this.get(0)) - v.glog(t.get(0)), r = new Array(this.getLength()), n = 0; n < this.getLength(); n++) r[n] = this.get(n);
            for (n = 0; n < t.getLength(); n++) r[n] ^= v.gexp(v.glog(t.get(n)) + e);
            return new p(r, 0).mod(t);
        }
    }, B.RS_BLOCK_TABLE = [ [ 1, 26, 19 ], [ 1, 26, 16 ], [ 1, 26, 13 ], [ 1, 26, 9 ], [ 1, 44, 34 ], [ 1, 44, 28 ], [ 1, 44, 22 ], [ 1, 44, 16 ], [ 1, 70, 55 ], [ 1, 70, 44 ], [ 2, 35, 17 ], [ 2, 35, 13 ], [ 1, 100, 80 ], [ 2, 50, 32 ], [ 2, 50, 24 ], [ 4, 25, 9 ], [ 1, 134, 108 ], [ 2, 67, 43 ], [ 2, 33, 15, 2, 34, 16 ], [ 2, 33, 11, 2, 34, 12 ], [ 2, 86, 68 ], [ 4, 43, 27 ], [ 4, 43, 19 ], [ 4, 43, 15 ], [ 2, 98, 78 ], [ 4, 49, 31 ], [ 2, 32, 14, 4, 33, 15 ], [ 4, 39, 13, 1, 40, 14 ], [ 2, 121, 97 ], [ 2, 60, 38, 2, 61, 39 ], [ 4, 40, 18, 2, 41, 19 ], [ 4, 40, 14, 2, 41, 15 ], [ 2, 146, 116 ], [ 3, 58, 36, 2, 59, 37 ], [ 4, 36, 16, 4, 37, 17 ], [ 4, 36, 12, 4, 37, 13 ], [ 2, 86, 68, 2, 87, 69 ], [ 4, 69, 43, 1, 70, 44 ], [ 6, 43, 19, 2, 44, 20 ], [ 6, 43, 15, 2, 44, 16 ], [ 4, 101, 81 ], [ 1, 80, 50, 4, 81, 51 ], [ 4, 50, 22, 4, 51, 23 ], [ 3, 36, 12, 8, 37, 13 ], [ 2, 116, 92, 2, 117, 93 ], [ 6, 58, 36, 2, 59, 37 ], [ 4, 46, 20, 6, 47, 21 ], [ 7, 42, 14, 4, 43, 15 ], [ 4, 133, 107 ], [ 8, 59, 37, 1, 60, 38 ], [ 8, 44, 20, 4, 45, 21 ], [ 12, 33, 11, 4, 34, 12 ], [ 3, 145, 115, 1, 146, 116 ], [ 4, 64, 40, 5, 65, 41 ], [ 11, 36, 16, 5, 37, 17 ], [ 11, 36, 12, 5, 37, 13 ], [ 5, 109, 87, 1, 110, 88 ], [ 5, 65, 41, 5, 66, 42 ], [ 5, 54, 24, 7, 55, 25 ], [ 11, 36, 12 ], [ 5, 122, 98, 1, 123, 99 ], [ 7, 73, 45, 3, 74, 46 ], [ 15, 43, 19, 2, 44, 20 ], [ 3, 45, 15, 13, 46, 16 ], [ 1, 135, 107, 5, 136, 108 ], [ 10, 74, 46, 1, 75, 47 ], [ 1, 50, 22, 15, 51, 23 ], [ 2, 42, 14, 17, 43, 15 ], [ 5, 150, 120, 1, 151, 121 ], [ 9, 69, 43, 4, 70, 44 ], [ 17, 50, 22, 1, 51, 23 ], [ 2, 42, 14, 19, 43, 15 ], [ 3, 141, 113, 4, 142, 114 ], [ 3, 70, 44, 11, 71, 45 ], [ 17, 47, 21, 4, 48, 22 ], [ 9, 39, 13, 16, 40, 14 ], [ 3, 135, 107, 5, 136, 108 ], [ 3, 67, 41, 13, 68, 42 ], [ 15, 54, 24, 5, 55, 25 ], [ 15, 43, 15, 10, 44, 16 ], [ 4, 144, 116, 4, 145, 117 ], [ 17, 68, 42 ], [ 17, 50, 22, 6, 51, 23 ], [ 19, 46, 16, 6, 47, 17 ], [ 2, 139, 111, 7, 140, 112 ], [ 17, 74, 46 ], [ 7, 54, 24, 16, 55, 25 ], [ 34, 37, 13 ], [ 4, 151, 121, 5, 152, 122 ], [ 4, 75, 47, 14, 76, 48 ], [ 11, 54, 24, 14, 55, 25 ], [ 16, 45, 15, 14, 46, 16 ], [ 6, 147, 117, 4, 148, 118 ], [ 6, 73, 45, 14, 74, 46 ], [ 11, 54, 24, 16, 55, 25 ], [ 30, 46, 16, 2, 47, 17 ], [ 8, 132, 106, 4, 133, 107 ], [ 8, 75, 47, 13, 76, 48 ], [ 7, 54, 24, 22, 55, 25 ], [ 22, 45, 15, 13, 46, 16 ], [ 10, 142, 114, 2, 143, 115 ], [ 19, 74, 46, 4, 75, 47 ], [ 28, 50, 22, 6, 51, 23 ], [ 33, 46, 16, 4, 47, 17 ], [ 8, 152, 122, 4, 153, 123 ], [ 22, 73, 45, 3, 74, 46 ], [ 8, 53, 23, 26, 54, 24 ], [ 12, 45, 15, 28, 46, 16 ], [ 3, 147, 117, 10, 148, 118 ], [ 3, 73, 45, 23, 74, 46 ], [ 4, 54, 24, 31, 55, 25 ], [ 11, 45, 15, 31, 46, 16 ], [ 7, 146, 116, 7, 147, 117 ], [ 21, 73, 45, 7, 74, 46 ], [ 1, 53, 23, 37, 54, 24 ], [ 19, 45, 15, 26, 46, 16 ], [ 5, 145, 115, 10, 146, 116 ], [ 19, 75, 47, 10, 76, 48 ], [ 15, 54, 24, 25, 55, 25 ], [ 23, 45, 15, 25, 46, 16 ], [ 13, 145, 115, 3, 146, 116 ], [ 2, 74, 46, 29, 75, 47 ], [ 42, 54, 24, 1, 55, 25 ], [ 23, 45, 15, 28, 46, 16 ], [ 17, 145, 115 ], [ 10, 74, 46, 23, 75, 47 ], [ 10, 54, 24, 35, 55, 25 ], [ 19, 45, 15, 35, 46, 16 ], [ 17, 145, 115, 1, 146, 116 ], [ 14, 74, 46, 21, 75, 47 ], [ 29, 54, 24, 19, 55, 25 ], [ 11, 45, 15, 46, 46, 16 ], [ 13, 145, 115, 6, 146, 116 ], [ 14, 74, 46, 23, 75, 47 ], [ 44, 54, 24, 7, 55, 25 ], [ 59, 46, 16, 1, 47, 17 ], [ 12, 151, 121, 7, 152, 122 ], [ 12, 75, 47, 26, 76, 48 ], [ 39, 54, 24, 14, 55, 25 ], [ 22, 45, 15, 41, 46, 16 ], [ 6, 151, 121, 14, 152, 122 ], [ 6, 75, 47, 34, 76, 48 ], [ 46, 54, 24, 10, 55, 25 ], [ 2, 45, 15, 64, 46, 16 ], [ 17, 152, 122, 4, 153, 123 ], [ 29, 74, 46, 14, 75, 47 ], [ 49, 54, 24, 10, 55, 25 ], [ 24, 45, 15, 46, 46, 16 ], [ 4, 152, 122, 18, 153, 123 ], [ 13, 74, 46, 32, 75, 47 ], [ 48, 54, 24, 14, 55, 25 ], [ 42, 45, 15, 32, 46, 16 ], [ 20, 147, 117, 4, 148, 118 ], [ 40, 75, 47, 7, 76, 48 ], [ 43, 54, 24, 22, 55, 25 ], [ 10, 45, 15, 67, 46, 16 ], [ 19, 148, 118, 6, 149, 119 ], [ 18, 75, 47, 31, 76, 48 ], [ 34, 54, 24, 34, 55, 25 ], [ 20, 45, 15, 61, 46, 16 ] ], 
    B.getRSBlocks = function(t, e) {
        var r = B.getRsBlockTable(t, e);
        if (null == r) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
        for (var n = r.length / 3, o = new Array(), i = 0; i < n; i++) for (var a = r[3 * i + 0], s = r[3 * i + 1], u = r[3 * i + 2], h = 0; h < a; h++) o.push(new B(s, u));
        return o;
    }, B.getRsBlockTable = function(t, e) {
        switch (e) {
          case n:
            return B.RS_BLOCK_TABLE[4 * (t - 1) + 0];

          case o:
            return B.RS_BLOCK_TABLE[4 * (t - 1) + 1];

          case i:
            return B.RS_BLOCK_TABLE[4 * (t - 1) + 2];

          case a:
            return B.RS_BLOCK_TABLE[4 * (t - 1) + 3];

          default:
            return;
        }
    }, L.prototype = {
        get: function(t) {
            var e = Math.floor(t / 8);
            return 1 == (this.buffer[e] >>> 7 - t % 8 & 1);
        },
        put: function(t, e) {
            for (var r = 0; r < e; r++) this.putBit(1 == (t >>> e - r - 1 & 1));
        },
        getLengthInBits: function() {
            return this.length;
        },
        putBit: function(t) {
            var e = Math.floor(this.length / 8);
            this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), 
            this.length++;
        }
    }, function(t) {
        t = t || {}, (t = Object.assign({
            width: 256,
            height: 256,
            typeNumber: -1,
            correctLevel: a,
            background: "#ffffff",
            foreground: "#000000"
        }, t)).canvasId ? function() {
            var r = new e(t.typeNumber, t.correctLevel);
            r.addData(function(t) {
                var e, r, n, o;
                for (e = "", n = t.length, r = 0; r < n; r++) (o = t.charCodeAt(r)) >= 1 && o <= 127 ? e += t.charAt(r) : o > 2047 ? (e += String.fromCharCode(224 | o >> 12 & 15), 
                e += String.fromCharCode(128 | o >> 6 & 63), e += String.fromCharCode(128 | o >> 0 & 63)) : (e += String.fromCharCode(192 | o >> 6 & 31), 
                e += String.fromCharCode(128 | o >> 0 & 63));
                return e;
            }(t.text)), r.make();
            for (var n = t._this ? wx.createCanvasContext && wx.createCanvasContext(t.canvasId, t._this) : wx.createCanvasContext && wx.createCanvasContext(t.canvasId), o = t.width / r.getModuleCount(), i = t.height / r.getModuleCount(), a = 0; a < r.getModuleCount(); a++) for (var s = 0; s < r.getModuleCount(); s++) {
                var u = r.isDark(a, s) ? t.foreground : t.background;
                n.setFillStyle(u);
                var h = Math.ceil((s + 1) * o) - Math.floor(s * o), l = Math.ceil((a + 1) * o) - Math.floor(a * o);
                n.fillRect(Math.round(s * o), Math.round(a * i), h, l);
            }
            n.draw(false, function(e) {
                t.callback && t.callback(e);
            });
        }() : console.warn("please you set canvasId!");
    };
}, "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (void 0).drawQrcode = t();