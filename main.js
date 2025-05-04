// ../../../../.cache/deno/deno_esbuild/registry.npmjs.org/preact@10.26.4/node_modules/preact/dist/preact.module.js
var n;
var l;
var t;
var u;
var i;
var r;
var o;
var e;
var f;
var c;
var s;
var a;
var h;
var p = {};
var v = [];
var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var d = Array.isArray;
function w(n2, l3) {
  for (var t3 in l3) n2[t3] = l3[t3];
  return n2;
}
function g(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function _(l3, t3, u4) {
  var i4, r3, o3, e3 = {};
  for (o3 in t3) "key" == o3 ? i4 = t3[o3] : "ref" == o3 ? r3 = t3[o3] : e3[o3] = t3[o3];
  if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : u4), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
  return m(l3, e3, i4, r3, null);
}
function m(n2, u4, i4, r3, o3) {
  var e3 = { type: n2, props: u4, key: i4, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++t : o3, __i: -1, __u: 0 };
  return null == o3 && null != l.vnode && l.vnode(e3), e3;
}
function k(n2) {
  return n2.children;
}
function x(n2, l3) {
  this.props = n2, this.context = l3;
}
function S(n2, l3) {
  if (null == l3) return n2.__ ? S(n2.__, n2.__i + 1) : null;
  for (var t3; l3 < n2.__k.length; l3++) if (null != (t3 = n2.__k[l3]) && null != t3.__e) return t3.__e;
  return "function" == typeof n2.type ? S(n2) : null;
}
function C(n2) {
  var l3, t3;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (t3 = n2.__k[l3]) && null != t3.__e) {
      n2.__e = n2.__c.base = t3.__e;
      break;
    }
    return C(n2);
  }
}
function M(n2) {
  (!n2.__d && (n2.__d = true) && i.push(n2) && !$.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)($);
}
function $() {
  for (var n2, t3, u4, r3, o3, f4, c3, s3 = 1; i.length; ) i.length > s3 && i.sort(e), n2 = i.shift(), s3 = i.length, n2.__d && (u4 = void 0, o3 = (r3 = (t3 = n2).__v).__e, f4 = [], c3 = [], t3.__P && ((u4 = w({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(u4), O(t3.__P, u4, r3, t3.__n, t3.__P.namespaceURI, 32 & r3.__u ? [o3] : null, f4, null == o3 ? S(r3) : o3, !!(32 & r3.__u), c3), u4.__v = r3.__v, u4.__.__k[u4.__i] = u4, z(f4, u4, c3), u4.__e != o3 && C(u4)));
  $.__r = 0;
}
function I(n2, l3, t3, u4, i4, r3, o3, e3, f4, c3, s3) {
  var a3, h3, y2, d3, w3, g2, _2 = u4 && u4.__k || v, m3 = l3.length;
  for (f4 = P(t3, l3, _2, f4, m3), a3 = 0; a3 < m3; a3++) null != (y2 = t3.__k[a3]) && (h3 = -1 === y2.__i ? p : _2[y2.__i] || p, y2.__i = a3, g2 = O(n2, y2, h3, i4, r3, o3, e3, f4, c3, s3), d3 = y2.__e, y2.ref && h3.ref != y2.ref && (h3.ref && q(h3.ref, null, y2), s3.push(y2.ref, y2.__c || d3, y2)), null == w3 && null != d3 && (w3 = d3), 4 & y2.__u || h3.__k === y2.__k ? f4 = A(y2, f4, n2) : "function" == typeof y2.type && void 0 !== g2 ? f4 = g2 : d3 && (f4 = d3.nextSibling), y2.__u &= -7);
  return t3.__e = w3, f4;
}
function P(n2, l3, t3, u4, i4) {
  var r3, o3, e3, f4, c3, s3 = t3.length, a3 = s3, h3 = 0;
  for (n2.__k = new Array(i4), r3 = 0; r3 < i4; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? (f4 = r3 + h3, (o3 = n2.__k[r3] = "string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? m(null, o3, null, null, null) : d(o3) ? m(k, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? m(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : o3).__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 !== (c3 = o3.__i = L(o3, t3, f4, a3)) && (a3--, (e3 = t3[c3]) && (e3.__u |= 2)), null == e3 || null === e3.__v ? (-1 == c3 && (i4 > s3 ? h3-- : i4 < s3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
  if (a3) for (r3 = 0; r3 < s3; r3++) null != (e3 = t3[r3]) && 0 == (2 & e3.__u) && (e3.__e == u4 && (u4 = S(e3)), B(e3, e3));
  return u4;
}
function A(n2, l3, t3) {
  var u4, i4;
  if ("function" == typeof n2.type) {
    for (u4 = n2.__k, i4 = 0; u4 && i4 < u4.length; i4++) u4[i4] && (u4[i4].__ = n2, l3 = A(u4[i4], l3, t3));
    return l3;
  }
  n2.__e != l3 && (l3 && n2.type && !t3.contains(l3) && (l3 = S(n2)), t3.insertBefore(n2.__e, l3 || null), l3 = n2.__e);
  do {
    l3 = l3 && l3.nextSibling;
  } while (null != l3 && 8 == l3.nodeType);
  return l3;
}
function L(n2, l3, t3, u4) {
  var i4, r3, o3 = n2.key, e3 = n2.type, f4 = l3[t3];
  if (null === f4 && null == n2.key || f4 && o3 == f4.key && e3 === f4.type && 0 == (2 & f4.__u)) return t3;
  if (u4 > (null != f4 && 0 == (2 & f4.__u) ? 1 : 0)) for (i4 = t3 - 1, r3 = t3 + 1; i4 >= 0 || r3 < l3.length; ) {
    if (i4 >= 0) {
      if ((f4 = l3[i4]) && 0 == (2 & f4.__u) && o3 == f4.key && e3 === f4.type) return i4;
      i4--;
    }
    if (r3 < l3.length) {
      if ((f4 = l3[r3]) && 0 == (2 & f4.__u) && o3 == f4.key && e3 === f4.type) return r3;
      r3++;
    }
  }
  return -1;
}
function T(n2, l3, t3) {
  "-" == l3[0] ? n2.setProperty(l3, null == t3 ? "" : t3) : n2[l3] = null == t3 ? "" : "number" != typeof t3 || y.test(l3) ? t3 : t3 + "px";
}
function j(n2, l3, t3, u4, i4) {
  var r3;
  n: if ("style" == l3) if ("string" == typeof t3) n2.style.cssText = t3;
  else {
    if ("string" == typeof u4 && (n2.style.cssText = u4 = ""), u4) for (l3 in u4) t3 && l3 in t3 || T(n2.style, l3, "");
    if (t3) for (l3 in t3) u4 && t3[l3] === u4[l3] || T(n2.style, l3, t3[l3]);
  }
  else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(f, "$1")), l3 = l3.toLowerCase() in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = t3, t3 ? u4 ? t3.t = u4.t : (t3.t = c, n2.addEventListener(l3, r3 ? a : s, r3)) : n2.removeEventListener(l3, r3 ? a : s, r3);
  else {
    if ("http://www.w3.org/2000/svg" == i4) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
      n2[l3] = null == t3 ? "" : t3;
      break n;
    } catch (n3) {
    }
    "function" == typeof t3 || (null == t3 || false === t3 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == t3 ? "" : t3));
  }
}
function F(n2) {
  return function(t3) {
    if (this.l) {
      var u4 = this.l[t3.type + n2];
      if (null == t3.u) t3.u = c++;
      else if (t3.u < u4.t) return;
      return u4(l.event ? l.event(t3) : t3);
    }
  };
}
function O(n2, t3, u4, i4, r3, o3, e3, f4, c3, s3) {
  var a3, h3, p3, v3, y2, _2, m3, b, S2, C3, M2, $2, P2, A3, H, L2, T3, j3 = t3.type;
  if (void 0 !== t3.constructor) return null;
  128 & u4.__u && (c3 = !!(32 & u4.__u), o3 = [f4 = t3.__e = u4.__e]), (a3 = l.__b) && a3(t3);
  n: if ("function" == typeof j3) try {
    if (b = t3.props, S2 = "prototype" in j3 && j3.prototype.render, C3 = (a3 = j3.contextType) && i4[a3.__c], M2 = a3 ? C3 ? C3.props.value : a3.__ : i4, u4.__c ? m3 = (h3 = t3.__c = u4.__c).__ = h3.__E : (S2 ? t3.__c = h3 = new j3(b, M2) : (t3.__c = h3 = new x(b, M2), h3.constructor = j3, h3.render = D), C3 && C3.sub(h3), h3.props = b, h3.state || (h3.state = {}), h3.context = M2, h3.__n = i4, p3 = h3.__d = true, h3.__h = [], h3._sb = []), S2 && null == h3.__s && (h3.__s = h3.state), S2 && null != j3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = w({}, h3.__s)), w(h3.__s, j3.getDerivedStateFromProps(b, h3.__s))), v3 = h3.props, y2 = h3.state, h3.__v = t3, p3) S2 && null == j3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), S2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
    else {
      if (S2 && null == j3.getDerivedStateFromProps && b !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(b, M2), !h3.__e && (null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(b, h3.__s, M2) || t3.__v == u4.__v)) {
        for (t3.__v != u4.__v && (h3.props = b, h3.state = h3.__s, h3.__d = false), t3.__e = u4.__e, t3.__k = u4.__k, t3.__k.some(function(n3) {
          n3 && (n3.__ = t3);
        }), $2 = 0; $2 < h3._sb.length; $2++) h3.__h.push(h3._sb[$2]);
        h3._sb = [], h3.__h.length && e3.push(h3);
        break n;
      }
      null != h3.componentWillUpdate && h3.componentWillUpdate(b, h3.__s, M2), S2 && null != h3.componentDidUpdate && h3.__h.push(function() {
        h3.componentDidUpdate(v3, y2, _2);
      });
    }
    if (h3.context = M2, h3.props = b, h3.__P = n2, h3.__e = false, P2 = l.__r, A3 = 0, S2) {
      for (h3.state = h3.__s, h3.__d = false, P2 && P2(t3), a3 = h3.render(h3.props, h3.state, h3.context), H = 0; H < h3._sb.length; H++) h3.__h.push(h3._sb[H]);
      h3._sb = [];
    } else do {
      h3.__d = false, P2 && P2(t3), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
    } while (h3.__d && ++A3 < 25);
    h3.state = h3.__s, null != h3.getChildContext && (i4 = w(w({}, i4), h3.getChildContext())), S2 && !p3 && null != h3.getSnapshotBeforeUpdate && (_2 = h3.getSnapshotBeforeUpdate(v3, y2)), L2 = a3, null != a3 && a3.type === k && null == a3.key && (L2 = N(a3.props.children)), f4 = I(n2, d(L2) ? L2 : [L2], t3, u4, i4, r3, o3, e3, f4, c3, s3), h3.base = t3.__e, t3.__u &= -161, h3.__h.length && e3.push(h3), m3 && (h3.__E = h3.__ = null);
  } catch (n3) {
    if (t3.__v = null, c3 || null != o3) if (n3.then) {
      for (t3.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
      o3[o3.indexOf(f4)] = null, t3.__e = f4;
    } else for (T3 = o3.length; T3--; ) g(o3[T3]);
    else t3.__e = u4.__e, t3.__k = u4.__k;
    l.__e(n3, t3, u4);
  }
  else null == o3 && t3.__v == u4.__v ? (t3.__k = u4.__k, t3.__e = u4.__e) : f4 = t3.__e = V(u4.__e, t3, u4, i4, r3, o3, e3, c3, s3);
  return (a3 = l.diffed) && a3(t3), 128 & t3.__u ? void 0 : f4;
}
function z(n2, t3, u4) {
  for (var i4 = 0; i4 < u4.length; i4++) q(u4[i4], u4[++i4], u4[++i4]);
  l.__c && l.__c(t3, n2), n2.some(function(t4) {
    try {
      n2 = t4.__h, t4.__h = [], n2.some(function(n3) {
        n3.call(t4);
      });
    } catch (n3) {
      l.__e(n3, t4.__v);
    }
  });
}
function N(n2) {
  return "object" != typeof n2 || null == n2 ? n2 : d(n2) ? n2.map(N) : w({}, n2);
}
function V(t3, u4, i4, r3, o3, e3, f4, c3, s3) {
  var a3, h3, v3, y2, w3, _2, m3, b = i4.props, k3 = u4.props, x2 = u4.type;
  if ("svg" == x2 ? o3 = "http://www.w3.org/2000/svg" : "math" == x2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
    for (a3 = 0; a3 < e3.length; a3++) if ((w3 = e3[a3]) && "setAttribute" in w3 == !!x2 && (x2 ? w3.localName == x2 : 3 == w3.nodeType)) {
      t3 = w3, e3[a3] = null;
      break;
    }
  }
  if (null == t3) {
    if (null == x2) return document.createTextNode(k3);
    t3 = document.createElementNS(o3, x2, k3.is && k3), c3 && (l.__m && l.__m(u4, e3), c3 = false), e3 = null;
  }
  if (null === x2) b === k3 || c3 && t3.data === k3 || (t3.data = k3);
  else {
    if (e3 = e3 && n.call(t3.childNodes), b = i4.props || p, !c3 && null != e3) for (b = {}, a3 = 0; a3 < t3.attributes.length; a3++) b[(w3 = t3.attributes[a3]).name] = w3.value;
    for (a3 in b) if (w3 = b[a3], "children" == a3) ;
    else if ("dangerouslySetInnerHTML" == a3) v3 = w3;
    else if (!(a3 in k3)) {
      if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
      j(t3, a3, null, w3, o3);
    }
    for (a3 in k3) w3 = k3[a3], "children" == a3 ? y2 = w3 : "dangerouslySetInnerHTML" == a3 ? h3 = w3 : "value" == a3 ? _2 = w3 : "checked" == a3 ? m3 = w3 : c3 && "function" != typeof w3 || b[a3] === w3 || j(t3, a3, w3, b[a3], o3);
    if (h3) c3 || v3 && (h3.__html === v3.__html || h3.__html === t3.innerHTML) || (t3.innerHTML = h3.__html), u4.__k = [];
    else if (v3 && (t3.innerHTML = ""), I("template" === u4.type ? t3.content : t3, d(y2) ? y2 : [y2], u4, i4, r3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o3, e3, f4, e3 ? e3[0] : i4.__k && S(i4, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) g(e3[a3]);
    c3 || (a3 = "value", "progress" == x2 && null == _2 ? t3.removeAttribute("value") : void 0 !== _2 && (_2 !== t3[a3] || "progress" == x2 && !_2 || "option" == x2 && _2 !== b[a3]) && j(t3, a3, _2, b[a3], o3), a3 = "checked", void 0 !== m3 && m3 !== t3[a3] && j(t3, a3, m3, b[a3], o3));
  }
  return t3;
}
function q(n2, t3, u4) {
  try {
    if ("function" == typeof n2) {
      var i4 = "function" == typeof n2.__u;
      i4 && n2.__u(), i4 && null == t3 || (n2.__u = n2(t3));
    } else n2.current = t3;
  } catch (n3) {
    l.__e(n3, u4);
  }
}
function B(n2, t3, u4) {
  var i4, r3;
  if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current !== n2.__e || q(i4, null, t3)), null != (i4 = n2.__c)) {
    if (i4.componentWillUnmount) try {
      i4.componentWillUnmount();
    } catch (n3) {
      l.__e(n3, t3);
    }
    i4.base = i4.__P = null;
  }
  if (i4 = n2.__k) for (r3 = 0; r3 < i4.length; r3++) i4[r3] && B(i4[r3], t3, u4 || "function" != typeof n2.type);
  u4 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function D(n2, l3, t3) {
  return this.constructor(n2, t3);
}
function E(t3, u4, i4) {
  var r3, o3, e3, f4;
  u4 == document && (u4 = document.documentElement), l.__ && l.__(t3, u4), o3 = (r3 = "function" == typeof i4) ? null : i4 && i4.__k || u4.__k, e3 = [], f4 = [], O(u4, t3 = (!r3 && i4 || u4).__k = _(k, null, [t3]), o3 || p, p, u4.namespaceURI, !r3 && i4 ? [i4] : o3 ? null : u4.firstChild ? n.call(u4.childNodes) : null, e3, !r3 && i4 ? i4 : o3 ? o3.__e : u4.firstChild, r3, f4), z(e3, t3, f4);
}
n = v.slice, l = { __e: function(n2, l3, t3, u4) {
  for (var i4, r3, o3; l3 = l3.__; ) if ((i4 = l3.__c) && !i4.__) try {
    if ((r3 = i4.constructor) && null != r3.getDerivedStateFromError && (i4.setState(r3.getDerivedStateFromError(n2)), o3 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, u4 || {}), o3 = i4.__d), o3) return i4.__E = i4;
  } catch (l4) {
    n2 = l4;
  }
  throw n2;
} }, t = 0, u = function(n2) {
  return null != n2 && null == n2.constructor;
}, x.prototype.setState = function(n2, l3) {
  var t3;
  t3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, t3), this.props)), n2 && w(t3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
}, x.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
}, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
  return n2.__v.__b - l3.__v.__b;
}, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

// ../../../../.cache/deno/deno_esbuild/registry.npmjs.org/preact@10.26.4/node_modules/preact/hooks/dist/hooks.module.js
var t2;
var r2;
var u2;
var i2;
var o2 = 0;
var f2 = [];
var c2 = l;
var e2 = c2.__b;
var a2 = c2.__r;
var v2 = c2.diffed;
var l2 = c2.__c;
var m2 = c2.unmount;
var s2 = c2.__;
function p2(n2, t3) {
  c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
  var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
}
function d2(n2) {
  return o2 = 1, h2(D2, n2);
}
function h2(n2, u4, i4) {
  var o3 = p2(t2++, 2);
  if (o3.t = n2, !o3.__c && (o3.__ = [i4 ? i4(u4) : D2(void 0, u4), function(n3) {
    var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
    t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
  }], o3.__c = r2, !r2.__f)) {
    var f4 = function(n3, t3, r3) {
      if (!o3.__c.__H) return true;
      var u5 = o3.__c.__H.__.filter(function(n4) {
        return !!n4.__c;
      });
      if (u5.every(function(n4) {
        return !n4.__N;
      })) return !c3 || c3.call(this, n3, t3, r3);
      var i5 = o3.__c.props !== n3;
      return u5.forEach(function(n4) {
        if (n4.__N) {
          var t4 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i5 = true);
        }
      }), c3 && c3.call(this, n3, t3, r3) || i5;
    };
    r2.__f = true;
    var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
    r2.componentWillUpdate = function(n3, t3, r3) {
      if (this.__e) {
        var u5 = c3;
        c3 = void 0, f4(n3, t3, r3), c3 = u5;
      }
      e3 && e3.call(this, n3, t3, r3);
    }, r2.shouldComponentUpdate = f4;
  }
  return o3.__N || o3.__;
}
function A2(n2) {
  return o2 = 5, T2(function() {
    return { current: n2 };
  }, []);
}
function T2(n2, r3) {
  var u4 = p2(t2++, 7);
  return C2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3, u4.__h = n2), u4.__;
}
function j2() {
  for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
    n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
  } catch (t3) {
    n2.__H.__h = [], c2.__e(t3, n2.__v);
  }
}
c2.__b = function(n2) {
  r2 = null, e2 && e2(n2);
}, c2.__ = function(n2, t3) {
  n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
}, c2.__r = function(n2) {
  a2 && a2(n2), t2 = 0;
  var i4 = (r2 = n2.__c).__H;
  i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t2 = 0)), u2 = r2;
}, c2.diffed = function(n2) {
  v2 && v2(n2);
  var t3 = n2.__c;
  t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
    n3.u && (n3.__H = n3.u), n3.u = void 0;
  })), u2 = r2 = null;
}, c2.__c = function(n2, t3) {
  t3.some(function(n3) {
    try {
      n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B2(n4);
      });
    } catch (r3) {
      t3.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t3 = [], c2.__e(r3, n3.__v);
    }
  }), l2 && l2(n2, t3);
}, c2.unmount = function(n2) {
  m2 && m2(n2);
  var t3, r3 = n2.__c;
  r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
    try {
      z2(n3);
    } catch (n4) {
      t3 = n4;
    }
  }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
};
var k2 = "function" == typeof requestAnimationFrame;
function w2(n2) {
  var t3, r3 = function() {
    clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
  }, u4 = setTimeout(r3, 100);
  k2 && (t3 = requestAnimationFrame(r3));
}
function z2(n2) {
  var t3 = r2, u4 = n2.__c;
  "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
}
function B2(n2) {
  var t3 = r2;
  n2.__c = n2.__(), r2 = t3;
}
function C2(n2, t3) {
  return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
    return t4 !== n2[r3];
  });
}
function D2(n2, t3) {
  return "function" == typeof t3 ? t3(n2) : t3;
}

// https://jsr.io/@nobody/styled-components-deno/0.10.2/domElements.ts
var elements = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "track",
  "u",
  "ul",
  "use",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var domElements = new Set(elements);

// https://jsr.io/@nobody/styled-components-deno/0.10.2/styled.ts
function toSnakeCase(obj) {
  const newObj = {};
  for (const key in obj) {
    const snakeKey = key.replace(
      /[A-Z]/g,
      (letter) => `-${letter.toLowerCase()}`
    );
    newObj[snakeKey] = obj[key];
  }
  return newObj;
}
var UniqueUid = class {
  uid = 0;
  constructor(uid) {
    if (uid) {
      this.uid = uid;
    }
  }
  next() {
    return ++this.uid;
  }
};
var ID = new UniqueUid();
function generateClassName() {
  return `styled-component-${ID.next()}`;
}
function queryClassName(className) {
  const styles = document.styleSheets;
  for (const style of styles) {
    for (const rule of style.cssRules) {
      if (rule.cssText.includes(`.${className} `)) {
        return true;
      }
    }
  }
  return false;
}
function injectStyles(className, styles) {
  if (!queryClassName(className)) {
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `.${className} { ${styles} }`;
    document.head.appendChild(styleSheet);
  }
}
function injectStylesObject(className, styles) {
  if (!queryClassName(className)) {
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `.${className} ${styles}`;
    document.head.appendChild(styleSheet);
  }
}
function createElementObject(tag, defaultStyleObject) {
  let defaultStyle = JSON.stringify(toSnakeCase(defaultStyleObject), null, 2);
  defaultStyle = defaultStyle.replaceAll(",", ";");
  defaultStyle = defaultStyle.replaceAll('"', "");
  const className = generateClassName();
  const Element = Object.assign((props) => {
    const { children, ...restProps } = props;
    const newstyle = defaultStyle;
    injectStylesObject(className, newstyle);
    const newProp = {
      className: props.className || className,
      ...restProps
    };
    Element.className = className;
    return _(tag, newProp, children);
  }, { className: void 0 });
  return Element;
}
function createElement(tag, ostyle, ...args) {
  const className = generateClassName();
  const Element = Object.assign((props) => {
    const { children, ...restProps } = props;
    let defaultStyle = "";
    const arglen = args.length;
    ostyle.forEach((stylestr, i4) => {
      if (i4 < arglen) {
        defaultStyle += stylestr + args[i4];
      } else {
        defaultStyle += stylestr;
      }
    });
    const newstyle = defaultStyle;
    injectStyles(className, newstyle);
    const newProp = {
      className: props.className || className,
      ...restProps
    };
    Element.className = className;
    return _(tag, newProp, children);
  }, { className: void 0 });
  return Element;
}
function isSupportElementArray(arr) {
  if (arr.length == 0) {
    return true;
  }
  return typeof arr[0] !== "function";
}
function createElementWithProps(tag, ostyle, ...args) {
  if (isSupportElementArray(args)) {
    return createElement(tag, ostyle, ...args);
  }
  const ElementTmp = Object.assign((props) => {
    let defaultStyle = "";
    const arglen = args.length;
    ostyle.forEach((stylestr, i4) => {
      if (i4 < arglen) {
        defaultStyle += stylestr + args[i4](props);
      } else {
        defaultStyle += stylestr;
      }
    });
    const { children, ...restProps } = props;
    let className = ElementTmp.mappedId.get(props);
    if (!className) {
      className = generateClassName();
      injectStyles(className, defaultStyle);
      ElementTmp.mappedId.set(props, className);
    }
    const newProp = {
      className: props.className || className,
      ...restProps
    };
    return _(tag, newProp, children);
  }, { mappedId: /* @__PURE__ */ new Map() });
  return ElementTmp;
}
function recreateElement(component) {
  return (style, ...args) => {
    let defaultStyle = "";
    const arglen = args.length;
    style.forEach((stylestr, i4) => {
      if (i4 < arglen) {
        defaultStyle += stylestr + args[i4];
      } else {
        defaultStyle += stylestr;
      }
    });
    const Element = Object.assign((props) => {
      const { children, ...restProps } = props;
      let newclassName = generateClassName();
      console.log("aaa");
      injectStyles(newclassName, defaultStyle);
      if (component.className) {
        newclassName = `${component.className} ${newclassName}`;
      }
      const className = props.className || newclassName;
      Element.className = className;
      const newProps = {
        className,
        ...restProps
      };
      return _(component, newProps, children);
    }, { className: void 0 });
    return Element;
  };
}
var styledTmp = recreateElement;
domElements.forEach((domElement) => {
  styledTmp[domElement] = function(style, ...args) {
    if (Array.isArray(style) && "raw" in style) {
      return createElementWithProps(
        domElement,
        style,
        ...args
      );
    }
    return createElementObject(domElement, style);
  };
});
var styled = styledTmp;
var AttributeGroup = class {
  keys;
  _groupName;
  _baseCSS = "";
  maps = /* @__PURE__ */ new Map();
  constructor(keys) {
    this.keys = keys;
    for (const key in keys) {
      this.maps.set(key, "");
    }
    this._groupName = generateClassName();
  }
  initBaseCSS(baseCSS) {
    const base = baseCSS.join(" ");
    this._baseCSS = base;
  }
  init(initfn) {
    for (const key in this.keys) {
      const css2 = initfn(key);
      this.maps.set(key, css2);
    }
  }
  setCSS(key) {
    return (ostyle, ...args) => {
      let targetCSS = "";
      const arglen = args.length;
      ostyle.forEach((stylestr, i4) => {
        if (i4 < arglen) {
          targetCSS += stylestr + args[i4];
        } else {
          targetCSS += stylestr;
        }
      });
      this.maps.set(key, targetCSS);
    };
  }
  get groupName() {
    return this._groupName;
  }
  // Final need to run generate to insert the styles
  generate() {
    let innerHTML = `.${this._groupName} { ${this._baseCSS} }
`;
    this.keys.forEach((key, _2) => {
      const injectName = `.${this._groupName}[${key}]`;
      innerHTML += `${injectName} { ${this.maps.get(key)} }
`;
    });
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = innerHTML;
    document.head.appendChild(styleSheet);
  }
};
var StyleGroup = class {
  keys;
  _mainKey;
  maps = /* @__PURE__ */ new Map();
  constructor(keys, mainKey) {
    this.keys = keys;
    this._mainKey = mainKey;
    for (const key in keys) {
      this.maps.set(key, "");
    }
  }
  init(initfn) {
    for (const key in this.keys) {
      const css2 = initfn(key);
      this.maps.set(key, css2);
    }
  }
  setCSS(key) {
    return (ostyle, ...args) => {
      let targetCSS = "";
      const arglen = args.length;
      ostyle.forEach((stylestr, i4) => {
        if (i4 < arglen) {
          targetCSS += stylestr + args[i4];
        } else {
          targetCSS += stylestr;
        }
      });
      this.maps.set(key, targetCSS);
    };
  }
  get mainKey() {
    return this._mainKey;
  }
  generate() {
    const result = {};
    let innerHTML = "";
    this.keys.forEach((key, _2) => {
      result[key] = key;
      let injectName = `.${result[key]}`;
      if (key != this.mainKey) {
        injectName = `.${this.mainKey}.${key}`;
      }
      innerHTML += `${injectName} { ${this.maps.get(key)} }
`;
    });
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = innerHTML;
    document.head.appendChild(styleSheet);
    return result;
  }
};

// https://jsr.io/@nobody/styled-components-deno/0.10.2/mod.ts
var mod_default = styled;

// ../config.ts
var Convolutes = {
  "right": [
    0,
    -1,
    0,
    -1,
    2,
    2,
    0,
    -1,
    0
  ],
  "left": [
    0,
    -1,
    0,
    3,
    2,
    -2,
    0,
    -1,
    0
  ],
  "sauna": [
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9
  ],
  "relief": [
    1,
    1,
    1,
    1,
    1,
    -1,
    -1,
    -1,
    -1
  ]
};
function fontStringLists(config) {
  const outputs = [];
  for (const font of config.fonts) {
    let fixedFont = font;
    if (font.includes(" ")) {
      fixedFont = `"${font}"`;
    }
    outputs.push(fixedFont);
  }
  return outputs.join(",");
}

// ../mod.ts
var clamp = (x2) => x2 >= 0 ? x2 <= 255 ? x2 : 255 : 0;
var clampuv = (x2) => x2 >= -128 ? x2 <= 127 ? x2 : 127 : -128;
var rgb2yuv = (r3, g2, b) => {
  const y2 = Math.floor(r3 * 0.299 + g2 * 0.587 + b * 0.114);
  const u4 = Math.floor(r3 * -0.168736 + g2 * -0.331264 + b * 0.5 + 128);
  const v3 = Math.floor(r3 * 0.5 + g2 * -0.418688 + b * -0.081312 + 128);
  return [y2, u4, v3];
};
var yuv2rgb = (y2, u4, v3) => {
  let r3, g2, b;
  r3 = y2 + 1.4075 * (v3 - 128);
  g2 = y2 - 0.3455 * (u4 - 128) - 0.7169 * (v3 - 128);
  b = y2 + 1.779 * (u4 - 128);
  r3 = Math.floor(r3);
  g2 = Math.floor(g2);
  b = Math.floor(b);
  r3 = r3 < 0 ? 0 : r3;
  r3 = r3 > 255 ? 255 : r3;
  g2 = g2 < 0 ? 0 : g2;
  g2 = g2 > 255 ? 255 : g2;
  b = b < 0 ? 0 : b;
  b = b > 255 ? 255 : b;
  return [r3, g2, b];
};
var convolute = (pixels, weights) => {
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);
  const src = pixels.data;
  const sw = pixels.width;
  const sh = pixels.height;
  const output = new ImageData(sw, sh);
  const dst = output.data;
  for (let y2 = 0; y2 < sh; y2++) {
    for (let x2 = 0; x2 < sw; x2++) {
      let r3 = 0, g2 = 0, b = 0;
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = Math.min(sh - 1, Math.max(0, y2 + cy - halfSide));
          const scx = Math.min(sw - 1, Math.max(0, x2 + cx - halfSide));
          const srcOff = (scy * sw + scx) * 4;
          const wt = weights[cy * side + cx];
          r3 += src[srcOff] * wt;
          g2 += src[srcOff + 1] * wt;
          b += src[srcOff + 2] * wt;
        }
      }
      const dstOff = (y2 * sw + x2) * 4;
      dst[dstOff] = r3;
      dst[dstOff + 1] = g2;
      dst[dstOff + 2] = b;
      dst[dstOff + 3] = 255;
    }
  }
  return output;
};
function roundTime(config) {
  if (config.usePop) {
    return Math.pow(config.popDim, 2);
  }
  return config.greenTimes;
}
var randRangeGlobal = (a3, b) => Math.round(Math.random() * (b - a3) + a3);
function deepinCopy(o3) {
  return JSON.parse(JSON.stringify(o3));
}
var PantaData = class {
  img;
  imgOutput;
  imgOutputPop;
  running = false;
  canvas;
  ctx;
  popCanvas;
  popCtx;
  config;
  _previewWidth;
  currentTime = 0;
  randRange = (a3, b) => Math.round(Math.random() * (b - a3) + a3);
  randName = (userNames) => {
    const k3 = `-_+~!^&\u3001.\u3002\u201D\u201C"'|`[this.randRange(0, 14)];
    return userNames[this.randRange(0, userNames.length - 1)].replace(
      /\d\d\d\d/,
      () => this.randRange(0, 9999).toString()
    ).replace(/_/g, () => k3);
  };
  constructor(config, img) {
    this.config = config || defaultConfig;
    this.img = img || new Image();
    this.imgOutput = new Image();
    this.imgOutputPop = new Image();
    this.canvas = document.createElement("canvas");
    this.popCanvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.popCtx = this.popCanvas.getContext("2d");
    this._previewWidth = this.config.previewWidth;
  }
  /**
   * This can return the status of if the program is running
   */
  get isRunning() {
    return this.running;
  }
  /**
   * Get the previewWidth
   */
  get previewWidth() {
    return this._previewWidth || this.srcWidth;
  }
  /**
   * Get if it is using pop
   */
  get isPop() {
    return this.getConfigKey("usePop");
  }
  /**
   * Get if it is using watermark
   */
  get useWaterMark() {
    return this.getConfigKey("watermark");
  }
  /**
   * Get if it is green mode
   */
  get isGreen() {
    return this.getConfigKey("isGreen");
  }
  /**
   * Get the dimensions of pop image
   */
  get popDim() {
    return this.getConfigKey("popDim");
  }
  /**
   * Get the quality of image
   */
  get quality() {
    return this.getConfigKey("quality");
  }
  /**
   * Get the greenTimes
   */
  get greenTimes() {
    return this.getConfigKey("greenTimes");
  }
  get greenStep() {
    return this.getConfigKey("greenStep");
  }
  /**
   * Get current being used userNames
   */
  get userNames() {
    return this.getConfigKey("userNames");
  }
  /**
   * Get if rand is eanbled
   */
  get randEnabled() {
    return this.getConfigKey("rand");
  }
  /**
   * Set to use rand watermark
   */
  async setIsRand(rand) {
    await this.setConfigKey("rand", rand);
  }
  /**
   * Set the used userNames in watermark
   */
  async setUserNames(names) {
    await this.setConfigKey("userNames", names);
  }
  async setGreenTimes(greenDeepth) {
    await this.setConfigKey("greenTimes", greenDeepth);
  }
  async setGreenStep(step) {
    await this.setConfigKey("greenStep", step);
  }
  async setPopDim(dim) {
    await this.setConfigKey("popDim", dim);
  }
  /**
   * Set the image quality
   */
  async setQualty(quality) {
    await this.setConfigKey("quality", quality);
  }
  /**
   * Set to use pop mode
   */
  async setIsPop(usePop) {
    await this.setConfigKey("usePop", usePop);
  }
  /**
   * set to use green mode
   */
  async setIsGreen(isGreen) {
    await this.setConfigKey("isGreen", isGreen);
  }
  /**
   * set the water mark
   */
  async setUseWaterMark(useWaterMark) {
    await this.setConfigKey("watermark", useWaterMark);
  }
  /**
   * set the config value by key
   */
  async setConfigKey(key, value) {
    const newConfig = deepinCopy(this.config);
    newConfig[key] = value;
    await this.setConfig(newConfig);
  }
  /**
   * Get the config value by key
   */
  getConfigKey(key) {
    return this.config[key];
  }
  /**
   * set config until running process is done
   */
  setConfig(config) {
    return new Promise((resolve, _2) => {
      if (JSON.stringify(config) === JSON.stringify(this.config)) {
        resolve();
        return;
      }
      const trySetConfig = () => {
        if (this.running) {
          return false;
        }
        this.config = config;
        resolve();
        return true;
      };
      if (!trySetConfig()) {
        setTimeout(trySetConfig, 100);
      }
    });
  }
  /**
   * Get the output Image
   */
  get outputImg() {
    return this.imgOutput;
  }
  /**
   * Get the outputUrl
   */
  get outputUrl() {
    if (this.config.usePop) {
      return this.imgOutputPop.src;
    } else {
      return this.imgOutput.src;
    }
  }
  /**
   * Get the source image url
   */
  get srcUrl() {
    return this.srcImg.src;
  }
  /**
   * Get the source image srcWidth
   * it will return the simallar one between the maxWidth in config and the naturalWidth of image
   */
  get srcWidth() {
    return Math.min(this.config.maxWidth, this.srcImg.naturalWidth);
  }
  /**
   * Get the source image
   */
  get srcImg() {
    return this.img;
  }
  /**
   * Set the source image
   */
  set srcImg(img) {
    this.img = img;
  }
  /**
   * Set the resource of the source image
   */
  setImageSrc(src) {
    this.img.src = src;
  }
  drawMix(canvasSize, naturalSize) {
    const mix = this.config.mix;
    const { width, height } = canvasSize;
    const { width: naturalWidth, height: naturalHeight } = naturalSize;
    if (mix === 1) {
      this.ctx.drawImage(
        this.img,
        0,
        0,
        naturalWidth,
        naturalHeight,
        0,
        0,
        width,
        height
      );
    } else {
      const mixedWidth = width / mix;
      const mixedHeight = height / mix;
      this.ctx.drawImage(
        this.img,
        0,
        0,
        naturalWidth,
        naturalHeight,
        (width - mixedWidth) / 2,
        (height - mixedHeight) / 2,
        mixedWidth,
        mixedHeight
      );
      this.ctx.drawImage(
        this.canvas,
        (width - mixedWidth) / 2,
        (height - mixedHeight) / 2,
        mixedWidth,
        mixedHeight,
        0,
        0,
        width,
        height
      );
    }
  }
  drawGreenBase({ width, height }) {
    const imageData = this.ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let p3 = 0; p3 < data.length / 4; ++p3) {
      const r3 = data[p3 * 4];
      const g2 = data[p3 * 4 + 1];
      const b = data[p3 * 4 + 2];
      const y2 = clamp(77 * r3 + 150 * g2 + 29 * b >> 8);
      const u4 = clampuv((-43 * r3 - 85 * g2 + 128 * b >> 8) - 1);
      const v3 = clampuv((128 * r3 - 107 * g2 - 21 * b >> 8) - 1);
      data[p3 * 4] = clamp(65536 * y2 + 91881 * v3 >> 16);
      data[p3 * 4 + 1] = clamp(65536 * y2 - 22553 * u4 - 46802 * v3 >> 16);
      data[p3 * 4 + 2] = clamp(65536 * y2 + 116130 * u4 >> 16);
    }
    this.ctx.putImageData(imageData, 0, 0);
  }
  drawOthers({ width, height }) {
    const config = this.config;
    let pixel = this.ctx.getImageData(0, 0, width, height);
    let pixelData = pixel.data;
    for (let i4 = 0; i4 < pixelData.length; i4 += 4) {
      const yuv = rgb2yuv(
        pixelData[i4],
        pixelData[i4 + 1],
        pixelData[i4 + 2]
      );
      pixelData[i4] = yuv[0];
      pixelData[i4 + 1] = yuv[1];
      pixelData[i4 + 2] = yuv[2];
    }
    if (config.lightNoise) {
      const halt = config.lightNoise / 2;
      for (let i4 = 0; i4 < pixelData.length; i4 += 4) {
        pixelData[i4] = pixelData[i4] + (this.randRange(0, config.lightNoise) - halt);
      }
    }
    if (config.darkNoise) {
      const halt = config.darkNoise / 2;
      for (let i4 = 0; i4 < pixelData.length; i4 += 4) {
        pixelData[i4] = pixelData[i4] + (this.randRange(0, config.darkNoise) - halt) * (255 - pixelData[i4]) / 255;
      }
    }
    if (config.contrast && config.contrast != 1) {
      for (let i4 = 0; i4 < pixelData.length; i4 += 4) {
        pixelData[i4] = (pixelData[i4] - 128) * config.contrast + 128;
      }
    }
    if (config.light && config.light != 0) {
      for (let i4 = 0; i4 < pixelData.length; i4 += 4) {
        pixelData[i4] = pixelData[i4] + config.light * 128;
      }
    }
    if (config.convoluteName) {
      pixel = convolute(
        pixel,
        Convolutes[config.convoluteName]
      );
      pixelData = pixel.data;
    }
    for (let i4 = 0; i4 < pixelData.length; i4 += 4) {
      if (config.isGreen) {
        const gAdd = config.greenStep * 4;
        pixelData[i4] -= gAdd * config.gy;
        pixelData[i4 + 1] -= gAdd;
        pixelData[i4 + 2] -= gAdd;
      }
      const rgb = yuv2rgb(
        pixelData[i4],
        pixelData[i4 + 1],
        pixelData[i4 + 2]
      );
      pixelData[i4] = rgb[0];
      pixelData[i4 + 1] = rgb[1];
      pixelData[i4 + 2] = rgb[2];
    }
    this.ctx.putImageData(pixel, 0, 0);
  }
  getWatermarkPlan({ width, height }, shift, i4 = randRangeGlobal(0, 2)) {
    const newI = i4 % 3;
    switch (newI) {
      case 0:
        return {
          align: "right",
          left: width - shift * 1.2 + this.randRange(-5, 5),
          top: height - shift + this.randRange(-5, 5)
        };
      case 1:
        return {
          align: "center",
          left: width / 2 + this.randRange(-10, 10),
          top: height - shift * 1.2 + this.randRange(-5, 5)
        };
      case 2:
        return {
          align: "left",
          left: width / 2 + this.randRange(-10, 10),
          top: height / 2 + shift + this.randRange(-10, 10)
        };
    }
    return {
      align: "center",
      left: width / 2 + this.randRange(-10, 10),
      top: height / 2 + shift + this.randRange(-10, 10)
    };
  }
  drawWaterMark({ width, height }) {
    const config = this.config;
    const randSize = this.randRange(0, 7);
    let fontSize = 22 + randSize;
    fontSize = width / fontSize * config.watermarkSize;
    this.ctx.shadowColor = `rgba(0, 0, 0, ${config.watermarkShadowAlpha})`;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 1;
    this.ctx.shadowBlur = 4;
    const fontString = fontStringLists(this.config);
    this.ctx.font = `${fontSize}px/400 ${fontString}`;
    this.ctx.fillStyle = "#fff";
    const shift = fontSize / 2;
    const watermarkPlan = this.getWatermarkPlan(
      { width, height },
      shift,
      randRangeGlobal(0, this.config.watermarkPlan)
    );
    this.ctx.textAlign = watermarkPlan.align;
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText(
      "@" + this.randName(config.userNames),
      watermarkPlan.left,
      watermarkPlan.top
    );
  }
  /**
   * This is an async program to paint the image.
   * If return is boolean
   * @param callback The callback function. It will be invoked very time a loop is finished
   * @returns boolean, true means successfully done, false means maybe the process is already being called, so you cannot invoke it this time
   */
  patina(callback) {
    const theRoundTime = roundTime(this.config);
    return new Promise((resolve, _2) => {
      const patinaInside = () => {
        const config = this.config;
        const imageEl = this.img;
        if (this.running) {
          resolve(false);
          return;
        }
        this.running = true;
        const naturalWidth = imageEl.naturalWidth;
        const naturalHeight = imageEl.naturalHeight;
        let width = naturalWidth;
        let height = naturalHeight;
        if (config.rand) {
          this.randRange = (a3, b) => Math.round(Math.random() * (b - a3) + a3);
        } else {
          this.randRange = () => 0;
        }
        const scale = naturalWidth / naturalHeight;
        if (config.preview) {
          if (scale > 1) {
            if (naturalWidth > config.maxWidth) {
              width = config.maxWidth;
              height = config.maxWidth / scale;
            }
          } else {
            if (naturalHeight > config.maxWidth) {
              width = config.maxWidth * scale;
              height = config.maxWidth;
            }
          }
        }
        width = Math.floor(width / 100 * config.zoom);
        height = Math.floor(height / 100 * config.zoom);
        this.canvas.width = width;
        this.canvas.height = height;
        requestAnimationFrame((_3) => {
          this.ctx.rect(0, 0, width, height);
          this.ctx.fillStyle = "#FFF";
          this.ctx.fill();
          this.drawMix({ width, height }, {
            width: naturalWidth,
            height: naturalHeight
          });
          if (config.lightNoise || config.darkNoise || config.contrast !== 1 || config.light !== 0 || config.greenStep !== 0 || config.convoluteName) {
            this.drawOthers({ width, height });
          }
          const isPop = this.config.usePop;
          let popWidth = width * this.config.popDim;
          let popHeight = height * this.config.popDim;
          if (isPop) {
            if (this.config.popDim && width < this.config.maxWidth) {
              const maxPopWidth2 = this.config.maxWidth * 2;
              if (popWidth > maxPopWidth2) {
                popWidth = maxPopWidth2;
                popHeight = maxPopWidth2 * height / width;
              }
            }
            const maxPopWidth = 4e3;
            if (popWidth > maxPopWidth) {
              popWidth = maxPopWidth;
              popHeight = maxPopWidth * height / width;
            }
            this.popCanvas.width = popWidth;
            this.popCanvas.height = popHeight;
          }
          const requestOnce = () => {
            this.currentTime++;
            if (config.watermark) {
              this.drawWaterMark({ width, height });
            }
            if (config.isGreen) {
              this.drawGreenBase({ width, height });
            }
            const popSrc = this.popCanvas.toDataURL(
              "image/jpeg",
              config.quality / 100 + Math.random() * 0.05
            );
            const src = this.canvas.toDataURL(
              "image/jpeg",
              config.quality / 100 + Math.random() * 0.1
            );
            this.imgOutput.onload = (_4) => {
              const randi = 2;
              const randPix = this.randRange(-randi, randi);
              const randPiy = this.randRange(-randi, randi);
              this.ctx.rect(0, 0, width, height);
              this.ctx.fillStyle = "#FFF";
              this.ctx.fill();
              this.ctx.drawImage(
                this.imgOutput,
                0,
                0,
                width,
                height,
                0 - randPix / 2,
                0 - randPiy / 2,
                width + randPix,
                height + randPiy
              );
              if (isPop) {
                this.popCtx.drawImage(
                  this.imgOutput,
                  (this.currentTime - 1) % this.config.popDim * popWidth / this.config.popDim,
                  Math.floor((this.currentTime - 1) / this.config.popDim) * popHeight / this.config.popDim,
                  popWidth / this.config.popDim,
                  popHeight / this.config.popDim
                );
              }
              callback && callback(this);
              if (this.currentTime <= theRoundTime) {
                requestOnce();
              } else {
                this.running = false;
                this.currentTime = 0;
                callback && callback(this);
                resolve(true);
              }
            };
            this.imgOutput.src = src;
            this.imgOutputPop.src = popSrc;
          };
          requestOnce();
        });
      };
      patinaInside();
    });
  }
};
var defaultConfig = {
  rand: true,
  preview: true,
  previewWidth: 400,
  maxWidth: 500,
  zoom: 100,
  mix: 1,
  watermark: true,
  watermarkSize: 2,
  watermarkShadowAlpha: 0.5,
  watermarkPlan: 2,
  userNames: ["JohnDoe", "JaneDoe"],
  lightNoise: 5,
  darkNoise: 5,
  contrast: 0.5,
  light: 0.5,
  isGreen: true,
  greenStep: 0.5,
  gy: 0.5,
  convoluteName: "sauna",
  greenTimes: 10,
  usePop: true,
  popDim: 4,
  quality: 80,
  fonts: ["PingFang SC", "Microsoft YaHei", "sans-serif"]
};

// ../../../../.cache/deno/deno_esbuild/registry.npmjs.org/preact@10.26.4/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var f3 = 0;
var i3 = Array.isArray;
function u3(e3, t3, n2, o3, i4, u4) {
  t3 || (t3 = {});
  var a3, c3, p3 = t3;
  if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
  var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i4, __self: u4 };
  if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
  return l.vnode && l.vnode(l3), l3;
}

// components/ControlBox.tsx
var CtrlBoxName = ["ctrl-box"];
var CtrlBoxGroup = new StyleGroup(CtrlBoxName, "ctrl-box");
CtrlBoxGroup.setCSS("ctrl-box")`
  padding: 10px 15px
`;
var ctrlBox = CtrlBoxGroup.generate();
function CtrlBox({ children }) {
  return /* @__PURE__ */ u3("div", { className: ctrlBox["ctrl-box"], children });
}

// components/App.tsx
var appKeys = [`data-running="true"`];
var appStyle = new AttributeGroup(appKeys);
appStyle.setCSS('data-running="true"')`
  cursor: wait;
  ${ctrlBox["ctrl-box"]} {
    pointer-events: none
  }
`;
appStyle.generate();
var appCSS = appStyle.groupName;
function App({ children, dataRunning }) {
  return /* @__PURE__ */ u3("div", { className: appCSS, "data-running": dataRunning, children });
}

// function/webcookie.ts
function getCookie() {
  try {
    return JSON.parse(document.cookie);
  } catch (_2) {
    console.log("error?");
    return {};
  }
}
function getInitConfig(initConfig2 = {}) {
  const config = defaultConfig;
  const cookieConfig = initConfig2 || getCookie();
  if (cookieConfig.green != void 0) {
    config.isGreen = cookieConfig.green;
  }
  if (cookieConfig.greenStep != void 0) {
    config.greenStep = cookieConfig.greenStep / 2;
  }
  if (cookieConfig.yearsAgo != void 0) {
    config.greenTimes = cookieConfig.yearsAgo;
  }
  if (cookieConfig.waterMark != void 0) {
    config.watermark = cookieConfig.waterMark;
  }
  if (cookieConfig.usePop != void 0) {
    config.usePop = cookieConfig.usePop;
  }
  if (cookieConfig.useRand != void 0) {
    config.rand = cookieConfig.useRand;
  }
  if (cookieConfig.popDim != void 0) {
    config.popDim = cookieConfig.popDim;
  }
  if (cookieConfig.quality != void 0) {
    config.quality = cookieConfig.quality;
  }
  if (cookieConfig.userNames != void 0) {
    config.userNames = cookieConfig.userNames;
  }
  return config;
}
function updateCookie(config) {
  document.cookie = JSON.stringify(config);
}

// src/main.tsx
var OutputBox = mod_default.div`
  overflow: hidden;
  img {
    display: block;
    object-fit: contain;
  }
  @media (min-width: 820px) {
    img {
      float: left;
      width: 50%;
      max-width: 500px;
      max-height: 500px;
    }
  }
  @media (max-width: 820px) {
    img {
      margin: 0 auto;
    }
    .source-image {
      display: none;
    }
  }
`;
var InputBox = mod_default.div`
  padding: 4px 0px;
`;
var appKeys2 = [`data-running="true"`];
var appStyle2 = new AttributeGroup(appKeys2);
appStyle2.setCSS('data-running="true"')`
  cursor: wait;
  ${ctrlBox["ctrl-box"]} {
    pointer-events: none
  }
`;
appStyle2.generate();
var mount = document.getElementById("mount");
var isImageRegex = /^image\/(.+)$/;
var readFileToURl = (file, onOver) => {
  const reader = new FileReader();
  reader.onload = () => {
    const src = reader.result;
    if (typeof src == "string") {
      onOver(src);
    }
  };
  reader.readAsDataURL(file);
};
var initConfig = getCookie();
var paintaData = new PantaData(getInitConfig(initConfig));
paintaData.setImageSrc("./static/images/totoro-avatar.jpg");
var form = document.createElement("form");
var input = document.createElement("input");
input.type = "file";
input.accept = "image/*";
form.appendChild(input);
function generateDownloadName() {
  return `[lab.magiconch.com][\u7535\u5B50\u5305\u6D46]-${+Date.now()}.jpg`;
}
function ImagePreview() {
  const imgRef = A2(paintaData.srcImg);
  const [srcUrl, setSrcUrl] = d2(paintaData.srcUrl);
  const [downloadName, setDownloadName] = d2(generateDownloadName());
  const [running, setRunning] = d2(paintaData.isRunning);
  const [outputUrl, setOutputUrl] = d2(paintaData.outputUrl);
  const [previewWidth, setPreviewWidth] = d2(paintaData.srcWidth);
  const [isGreen, setGreen] = d2(paintaData.isGreen);
  const [greenStep, setGreenStep] = d2(paintaData.greenStep * 2);
  const [isPop, setPop] = d2(paintaData.isPop);
  const [useWaterMark, setUseWaterMark] = d2(paintaData.useWaterMark);
  const [yearsAgo, setYearsAgo] = d2(paintaData.greenTimes);
  const [popDim, setPopDim] = d2(paintaData.popDim);
  const [quality, setQualty] = d2(paintaData.quality);
  const [userNames, setUserNames] = d2(paintaData.userNames.join("\n"));
  const [isRand, setIsRand] = d2(paintaData.randEnabled);
  const reload = async () => {
    await paintaData.patina((data) => {
      setPreviewWidth(paintaData.previewWidth);
      setOutputUrl(data.outputUrl);
      setRunning(data.isRunning);
    });
  };
  const readImage = (file) => {
    readFileToURl(file, (src) => {
      paintaData.setImageSrc(src);
      setSrcUrl(paintaData.srcImg.src);
      setPreviewWidth(paintaData.previewWidth);
      setOutputUrl(paintaData.outputUrl);
    });
  };
  document.addEventListener("paste", (e3) => {
    const clipboardData = e3.clipboardData;
    if (clipboardData?.items[0]) {
      const file = clipboardData.items[0].getAsFile();
      if (file && isImageRegex.test(file.type)) {
        readImage(file);
      }
    }
  });
  document.addEventListener("dragover", (e3) => {
    e3.preventDefault();
  });
  document.addEventListener("drop", (e3) => {
    e3.preventDefault();
    const clipboardData = e3.dataTransfer;
    if (clipboardData?.items[0]) {
      const file = clipboardData.items[0].getAsFile();
      if (file && isImageRegex.test(file.type)) {
        readImage(file);
      }
    }
  });
  const submitCallBack = (_2) => {
    form.reset();
    input.onchange = () => {
      if (!input.files || !input.files[0]) {
        return;
      }
      readImage(input.files[0]);
    };
    input.click();
  };
  const onGreenChanged = async (e3) => {
    if (paintaData.isRunning) {
      return;
    }
    const isGreen2 = e3.currentTarget.checked;
    paintaData.setIsGreen(isGreen2);
    setGreen(isGreen2);
    initConfig.green = isGreen2;
    updateCookie(initConfig);
    await reload();
  };
  const onWaterMarkChanged = async (e3) => {
    const isWaterMark = e3.currentTarget.checked;
    paintaData.setUseWaterMark(isWaterMark);
    initConfig.waterMark = isWaterMark;
    updateCookie(initConfig);
    setUseWaterMark(isWaterMark);
    await reload();
  };
  const onYearsChanged = async (e3) => {
    if (paintaData.isRunning) {
      return;
    }
    const step = parseInt(e3.currentTarget.value);
    paintaData.setGreenTimes(step);
    initConfig.yearsAgo = step;
    updateCookie(initConfig);
    setYearsAgo(step);
    await reload();
  };
  const onPopDimChanged = async (e3) => {
    if (paintaData.isRunning) {
      return;
    }
    const step = parseInt(e3.currentTarget.value);
    paintaData.setPopDim(step);
    initConfig.popDim = step;
    updateCookie(initConfig);
    setPopDim(step);
    await reload();
  };
  const onGreenStepChanged = async (e3) => {
    if (paintaData.isRunning) {
      return;
    }
    const step = parseInt(e3.currentTarget.value);
    paintaData.setGreenStep(step / 2);
    initConfig.greenStep = step;
    updateCookie(initConfig);
    setGreenStep(step);
    await reload();
  };
  const onQualityChanged = async (e3) => {
    if (paintaData.isRunning) {
      return;
    }
    const step = parseInt(e3.currentTarget.value);
    paintaData.setQualty(step);
    initConfig.quality = step;
    updateCookie(initConfig);
    setQualty(step);
    await reload();
  };
  const onPopChanged = async (e3) => {
    if (paintaData.isRunning) {
      return;
    }
    const isPop2 = e3.currentTarget.checked;
    paintaData.setIsPop(isPop2);
    setPop(isPop2);
    initConfig.usePop = isPop2;
    updateCookie(initConfig);
    await reload();
  };
  const onRandChanged = async (e3) => {
    if (paintaData.isRunning) {
      return;
    }
    const isRand2 = e3.currentTarget.checked;
    paintaData.setIsRand(isRand2);
    setIsRand(isRand2);
    initConfig.usePop = isRand2;
    updateCookie(initConfig);
    await reload();
  };
  const onUserNamesChanged = (e3) => {
    const originNames = e3.currentTarget.value;
    const names = originNames.split("\n");
    paintaData.setUserNames(names);
    setUserNames(originNames);
    initConfig.userNames = names;
    updateCookie(initConfig);
  };
  const resetDownloadName = () => {
    setDownloadName(generateDownloadName());
  };
  return /* @__PURE__ */ u3(App, { dataRunning: running, children: [
    /* @__PURE__ */ u3("header", { children: [
      /* @__PURE__ */ u3("h1", { children: "Patina, Pictures from ancient time" }),
      /* @__PURE__ */ u3("p", { children: "Make the emoticons have a vintage look" })
    ] }),
    /* @__PURE__ */ u3(OutputBox, { children: [
      /* @__PURE__ */ u3(
        "img",
        {
          className: "source-image",
          src: srcUrl,
          ref: imgRef,
          width: previewWidth,
          onLoad: reload
        }
      ),
      /* @__PURE__ */ u3("img", { src: outputUrl, width: previewWidth })
    ] }),
    /* @__PURE__ */ u3(CtrlBox, { children: [
      /* @__PURE__ */ u3(InputBox, { children: [
        /* @__PURE__ */ u3("button", { type: "submit", onClick: submitCallBack, children: "Choose or paste picture here" }),
        /* @__PURE__ */ u3(
          "a",
          {
            className: "btn",
            href: outputUrl,
            download: downloadName,
            onClick: resetDownloadName,
            children: "Download"
          }
        )
      ] }),
      /* @__PURE__ */ u3(InputBox, { children: [
        /* @__PURE__ */ u3("label", { children: [
          /* @__PURE__ */ u3(
            "input",
            {
              type: "checkbox",
              checked: isGreen,
              onChange: onGreenChanged
            }
          ),
          "Green"
        ] }),
        /* @__PURE__ */ u3("label", { children: [
          /* @__PURE__ */ u3(
            "input",
            {
              type: "checkbox",
              checked: useWaterMark,
              onChange: onWaterMarkChanged
            }
          ),
          "WaterMark"
        ] }),
        /* @__PURE__ */ u3("label", { children: [
          /* @__PURE__ */ u3(
            "input",
            {
              type: "checkbox",
              checked: isPop,
              onChange: onPopChanged
            }
          ),
          "Pop"
        ] }),
        useWaterMark && /* @__PURE__ */ u3(k, { children: /* @__PURE__ */ u3("label", { children: [
          /* @__PURE__ */ u3(
            "input",
            {
              type: "checkbox",
              checked: isRand,
              onChange: onRandChanged
            }
          ),
          "Rand"
        ] }) })
      ] }),
      /* @__PURE__ */ u3(InputBox, { children: [
        !isPop && isGreen && /* @__PURE__ */ u3(k, { children: [
          /* @__PURE__ */ u3("h4", { children: "YearsAgo" }),
          /* @__PURE__ */ u3(
            "input",
            {
              type: "range",
              min: 1,
              max: 100,
              step: 1,
              value: yearsAgo,
              onChange: onYearsChanged
            }
          ),
          yearsAgo
        ] }),
        isPop && /* @__PURE__ */ u3(k, { children: [
          /* @__PURE__ */ u3("h4", { children: "PopDIm" }),
          /* @__PURE__ */ u3(
            "input",
            {
              type: "range",
              min: 1,
              max: 10,
              step: 1,
              value: popDim,
              onChange: onPopDimChanged
            }
          ),
          popDim
        ] }),
        isGreen && /* @__PURE__ */ u3(k, { children: [
          /* @__PURE__ */ u3("h4", { children: "Green Step" }),
          /* @__PURE__ */ u3(
            "input",
            {
              type: "range",
              min: 0,
              max: 50,
              step: 1,
              value: greenStep,
              onChange: onGreenStepChanged
            }
          ),
          greenStep / 2
        ] }),
        /* @__PURE__ */ u3("h4", { children: "Quality" }),
        /* @__PURE__ */ u3(
          "input",
          {
            type: "range",
            min: 1,
            max: 100,
            step: 1,
            value: quality,
            onChange: onQualityChanged
          }
        ),
        quality,
        useWaterMark && /* @__PURE__ */ u3(k, { children: [
          /* @__PURE__ */ u3("h4", { children: "WaterMarks" }),
          /* @__PURE__ */ u3(
            "textarea",
            {
              value: userNames,
              cols: 30,
              rows: 10,
              onChange: onUserNamesChanged
            }
          ),
          /* @__PURE__ */ u3("button", { type: "button", onClick: reload, children: "Reload" })
        ] })
      ] })
    ] })
  ] });
}
function Patina() {
  return /* @__PURE__ */ u3(ImagePreview, {});
}
if (mount) {
  E(/* @__PURE__ */ u3(Patina, {}), mount);
}
/*!
 * Patina.ts
 * @itorr <https://lab.magiconch.com/>
 * 2022-03-31
 */
