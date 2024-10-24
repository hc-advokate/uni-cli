!(function (t, e) {
	if ("object" == typeof exports && "object" == typeof module) module.exports = e();
	else if ("function" == typeof define && define.amd) define([], e);
	else {
		var n = e();
		for (var r in n) ("object" == typeof exports ? exports : t)[r] = n[r];
	}
})(window, function () {
	return (function (t) {
		var e = {};
		function n(r) {
			if (e[r]) return e[r].exports;
			var o = (e[r] = { i: r, l: !1, exports: {} });
			return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
		}
		return (
			(n.m = t),
			(n.c = e),
			(n.d = function (t, e, r) {
				n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
			}),
			(n.r = function (t) {
				"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
			}),
			(n.t = function (t, e) {
				if ((1 & e && (t = n(t)), 8 & e)) return t;
				if (4 & e && "object" == typeof t && t && t.__esModule) return t;
				var r = Object.create(null);
				if ((n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
					for (var o in t)
						n.d(
							r,
							o,
							function (e) {
								return t[e];
							}.bind(null, o),
						);
				return r;
			}),
			(n.n = function (t) {
				var e =
					t && t.__esModule
						? function () {
								return t.default;
							}
						: function () {
								return t;
							};
				return n.d(e, "a", e), e;
			}),
			(n.o = function (t, e) {
				return Object.prototype.hasOwnProperty.call(t, e);
			}),
			(n.p = ""),
			n((n.s = 19))
		);
	})([
		function (t, e) {
			t.exports = function () {
				return function () {};
			};
		},
		function (t, e, n) {
			const r = n(26),
				o = n(27),
				s = String.fromCharCode(30);
			t.exports = {
				protocol: 4,
				encodePacket: r,
				encodePayload: (t, e) => {
					const n = t.length,
						o = new Array(n);
					let i = 0;
					t.forEach((t, a) => {
						r(t, !1, (t) => {
							(o[a] = t), ++i === n && e(o.join(s));
						});
					});
				},
				decodePacket: o,
				decodePayload: (t, e) => {
					const n = t.split(s),
						r = [];
					for (let t = 0; t < n.length; t++) {
						const s = o(n[t], e);
						if ((r.push(s), "error" === s.type)) break;
					}
					return r;
				},
			};
		},
		function (t, e, n) {
			function r(t) {
				if (t)
					return (function (t) {
						for (var e in r.prototype) t[e] = r.prototype[e];
						return t;
					})(t);
			}
			(t.exports = r),
				(r.prototype.on = r.prototype.addEventListener =
					function (t, e) {
						return (this._callbacks = this._callbacks || {}), (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
					}),
				(r.prototype.once = function (t, e) {
					function n() {
						this.off(t, n), e.apply(this, arguments);
					}
					return (n.fn = e), this.on(t, n), this;
				}),
				(r.prototype.off =
					r.prototype.removeListener =
					r.prototype.removeAllListeners =
					r.prototype.removeEventListener =
						function (t, e) {
							if (((this._callbacks = this._callbacks || {}), 0 == arguments.length)) return (this._callbacks = {}), this;
							var n,
								r = this._callbacks["$" + t];
							if (!r) return this;
							if (1 == arguments.length) return delete this._callbacks["$" + t], this;
							for (var o = 0; o < r.length; o++)
								if ((n = r[o]) === e || n.fn === e) {
									r.splice(o, 1);
									break;
								}
							return 0 === r.length && delete this._callbacks["$" + t], this;
						}),
				(r.prototype.emit = function (t) {
					this._callbacks = this._callbacks || {};
					for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
					if (n) {
						r = 0;
						for (var o = (n = n.slice(0)).length; r < o; ++r) n[r].apply(this, e);
					}
					return this;
				}),
				(r.prototype.listeners = function (t) {
					return (this._callbacks = this._callbacks || {}), this._callbacks["$" + t] || [];
				}),
				(r.prototype.hasListeners = function (t) {
					return !!this.listeners(t).length;
				});
		},
		function (t, e) {
			t.exports = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")();
		},
		function (t, e, n) {
			const r = n(1),
				o = n(2),
				s = n(0)("engine.io-client:transport");
			t.exports = class extends o {
				constructor(t) {
					super(), (this.opts = t), (this.query = t.query), (this.readyState = ""), (this.socket = t.socket);
				}
				onError(t, e) {
					const n = new Error(t);
					return (n.type = "TransportError"), (n.description = e), this.emit("error", n), this;
				}
				open() {
					return ("closed" !== this.readyState && "" !== this.readyState) || ((this.readyState = "opening"), this.doOpen()), this;
				}
				close() {
					return ("opening" !== this.readyState && "open" !== this.readyState) || (this.doClose(), this.onClose()), this;
				}
				send(t) {
					"open" === this.readyState ? this.write(t) : s("transport is not open, discarding packets");
				}
				onOpen() {
					(this.readyState = "open"), (this.writable = !0), this.emit("open");
				}
				onData(t) {
					const e = r.decodePacket(t, this.socket.binaryType);
					this.onPacket(e);
				}
				onPacket(t) {
					this.emit("packet", t);
				}
				onClose() {
					(this.readyState = "closed"), this.emit("close");
				}
			};
		},
		function (t, e) {
			(e.encode = function (t) {
				var e = "";
				for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), (e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n])));
				return e;
			}),
				(e.decode = function (t) {
					for (var e = {}, n = t.split("&"), r = 0, o = n.length; r < o; r++) {
						var s = n[r].split("=");
						e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);
					}
					return e;
				});
		},
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 }), (e.Decoder = e.Encoder = e.PacketType = e.protocol = void 0);
			const r = n(2),
				o = n(39),
				s = n(16),
				i = n(0)("socket.io-parser");
			var a;
			(e.protocol = 5),
				(function (t) {
					(t[(t.CONNECT = 0)] = "CONNECT"), (t[(t.DISCONNECT = 1)] = "DISCONNECT"), (t[(t.EVENT = 2)] = "EVENT"), (t[(t.ACK = 3)] = "ACK"), (t[(t.CONNECT_ERROR = 4)] = "CONNECT_ERROR"), (t[(t.BINARY_EVENT = 5)] = "BINARY_EVENT"), (t[(t.BINARY_ACK = 6)] = "BINARY_ACK");
				})((a = e.PacketType || (e.PacketType = {})));
			e.Encoder = class {
				encode(t) {
					return i("encoding packet %j", t), (t.type !== a.EVENT && t.type !== a.ACK) || !s.hasBinary(t) ? [this.encodeAsString(t)] : ((t.type = t.type === a.EVENT ? a.BINARY_EVENT : a.BINARY_ACK), this.encodeAsBinary(t));
				}
				encodeAsString(t) {
					let e = "" + t.type;
					return (t.type !== a.BINARY_EVENT && t.type !== a.BINARY_ACK) || (e += t.attachments + "-"), t.nsp && "/" !== t.nsp && (e += t.nsp + ","), null != t.id && (e += t.id), null != t.data && (e += JSON.stringify(t.data)), i("encoded %j as %s", t, e), e;
				}
				encodeAsBinary(t) {
					const e = o.deconstructPacket(t),
						n = this.encodeAsString(e.packet),
						r = e.buffers;
					return r.unshift(n), r;
				}
			};
			class c extends r {
				constructor() {
					super();
				}
				add(t) {
					let e;
					if ("string" == typeof t) (e = this.decodeString(t)), e.type === a.BINARY_EVENT || e.type === a.BINARY_ACK ? ((this.reconstructor = new h(e)), 0 === e.attachments && super.emit("decoded", e)) : super.emit("decoded", e);
					else {
						if (!s.isBinary(t) && !t.base64) throw new Error("Unknown type: " + t);
						if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
						(e = this.reconstructor.takeBinaryData(t)), e && ((this.reconstructor = null), super.emit("decoded", e));
					}
				}
				decodeString(t) {
					let e = 0;
					const n = { type: Number(t.charAt(0)) };
					if (void 0 === a[n.type]) throw new Error("unknown packet type " + n.type);
					if (n.type === a.BINARY_EVENT || n.type === a.BINARY_ACK) {
						const r = e + 1;
						for (; "-" !== t.charAt(++e) && e != t.length; );
						const o = t.substring(r, e);
						if (o != Number(o) || "-" !== t.charAt(e)) throw new Error("Illegal attachments");
						n.attachments = Number(o);
					}
					if ("/" === t.charAt(e + 1)) {
						const r = e + 1;
						for (; ++e; ) {
							if ("," === t.charAt(e)) break;
							if (e === t.length) break;
						}
						n.nsp = t.substring(r, e);
					} else n.nsp = "/";
					const r = t.charAt(e + 1);
					if ("" !== r && Number(r) == r) {
						const r = e + 1;
						for (; ++e; ) {
							const n = t.charAt(e);
							if (null == n || Number(n) != n) {
								--e;
								break;
							}
							if (e === t.length) break;
						}
						n.id = Number(t.substring(r, e + 1));
					}
					if (t.charAt(++e)) {
						const r = (function (t) {
							try {
								return JSON.parse(t);
							} catch (t) {
								return !1;
							}
						})(t.substr(e));
						if (!c.isPayloadValid(n.type, r)) throw new Error("invalid payload");
						n.data = r;
					}
					return i("decoded %s as %j", t, n), n;
				}
				static isPayloadValid(t, e) {
					switch (t) {
						case a.CONNECT:
							return "object" == typeof e;
						case a.DISCONNECT:
							return void 0 === e;
						case a.CONNECT_ERROR:
							return "string" == typeof e || "object" == typeof e;
						case a.EVENT:
						case a.BINARY_EVENT:
							return Array.isArray(e) && e.length > 0;
						case a.ACK:
						case a.BINARY_ACK:
							return Array.isArray(e);
					}
				}
				destroy() {
					this.reconstructor && this.reconstructor.finishedReconstruction();
				}
			}
			e.Decoder = c;
			class h {
				constructor(t) {
					(this.packet = t), (this.buffers = []), (this.reconPack = t);
				}
				takeBinaryData(t) {
					if ((this.buffers.push(t), this.buffers.length === this.reconPack.attachments)) {
						const t = o.reconstructPacket(this.reconPack, this.buffers);
						return this.finishedReconstruction(), t;
					}
					return null;
				}
				finishedReconstruction() {
					(this.reconPack = null), (this.buffers = []);
				}
			}
		},
		function (t, e) {
			var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
				r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
			t.exports = function (t) {
				var e = t,
					o = t.indexOf("["),
					s = t.indexOf("]");
				-1 != o && -1 != s && (t = t.substring(0, o) + t.substring(o, s).replace(/:/g, ";") + t.substring(s, t.length));
				for (var i, a, c = n.exec(t || ""), h = {}, u = 14; u--; ) h[r[u]] = c[u] || "";
				return (
					-1 != o && -1 != s && ((h.source = e), (h.host = h.host.substring(1, h.host.length - 1).replace(/;/g, ":")), (h.authority = h.authority.replace("[", "").replace("]", "").replace(/;/g, ":")), (h.ipv6uri = !0)),
					(h.pathNames = (function (t, e) {
						var n = e.replace(/\/{2,9}/g, "/").split("/");
						("/" != e.substr(0, 1) && 0 !== e.length) || n.splice(0, 1);
						"/" == e.substr(e.length - 1, 1) && n.splice(n.length - 1, 1);
						return n;
					})(0, h.path)),
					(h.queryKey =
						((i = h.query),
						(a = {}),
						i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, n) {
							e && (a[e] = n);
						}),
						a)),
					h
				);
			};
		},
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 }), (e.Manager = void 0);
			const r = n(22),
				o = n(15),
				s = n(6),
				i = n(17),
				a = n(40),
				c = n(18),
				h = n(0)("socket.io-client:manager");
			class u extends c.StrictEventEmitter {
				constructor(t, e) {
					super(),
						(this.nsps = {}),
						(this.subs = []),
						t && "object" == typeof t && ((e = t), (t = void 0)),
						((e = e || {}).path = e.path || "/socket.io"),
						(this.opts = e),
						this.reconnection(!1 !== e.reconnection),
						this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
						this.reconnectionDelay(e.reconnectionDelay || 1e3),
						this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
						this.randomizationFactor(e.randomizationFactor || 0.5),
						(this.backoff = new a({ min: this.reconnectionDelay(), max: this.reconnectionDelayMax(), jitter: this.randomizationFactor() })),
						this.timeout(null == e.timeout ? 2e4 : e.timeout),
						(this._readyState = "closed"),
						(this.uri = t);
					const n = e.parser || s;
					(this.encoder = new n.Encoder()), (this.decoder = new n.Decoder()), (this._autoConnect = !1 !== e.autoConnect), this._autoConnect && this.open();
				}
				reconnection(t) {
					return arguments.length ? ((this._reconnection = !!t), this) : this._reconnection;
				}
				reconnectionAttempts(t) {
					return void 0 === t ? this._reconnectionAttempts : ((this._reconnectionAttempts = t), this);
				}
				reconnectionDelay(t) {
					var e;
					return void 0 === t ? this._reconnectionDelay : ((this._reconnectionDelay = t), null === (e = this.backoff) || void 0 === e || e.setMin(t), this);
				}
				randomizationFactor(t) {
					var e;
					return void 0 === t ? this._randomizationFactor : ((this._randomizationFactor = t), null === (e = this.backoff) || void 0 === e || e.setJitter(t), this);
				}
				reconnectionDelayMax(t) {
					var e;
					return void 0 === t ? this._reconnectionDelayMax : ((this._reconnectionDelayMax = t), null === (e = this.backoff) || void 0 === e || e.setMax(t), this);
				}
				timeout(t) {
					return arguments.length ? ((this._timeout = t), this) : this._timeout;
				}
				maybeReconnectOnOpen() {
					!this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
				}
				open(t) {
					if ((h("readyState %s", this._readyState), ~this._readyState.indexOf("open"))) return this;
					h("opening %s", this.uri), (this.engine = r(this.uri, this.opts));
					const e = this.engine,
						n = this;
					(this._readyState = "opening"), (this.skipReconnect = !1);
					const o = i.on(e, "open", function () {
							n.onopen(), t && t();
						}),
						s = i.on(e, "error", (e) => {
							h("error"), n.cleanup(), (n._readyState = "closed"), this.emitReserved("error", e), t ? t(e) : n.maybeReconnectOnOpen();
						});
					if (!1 !== this._timeout) {
						const t = this._timeout;
						h("connect attempt will timeout after %d", t), 0 === t && o();
						const n = setTimeout(() => {
							h("connect attempt timed out after %d", t), o(), e.close(), e.emit("error", new Error("timeout"));
						}, t);
						this.opts.autoUnref && n.unref(),
							this.subs.push(function () {
								clearTimeout(n);
							});
					}
					return this.subs.push(o), this.subs.push(s), this;
				}
				connect(t) {
					return this.open(t);
				}
				onopen() {
					h("open"), this.cleanup(), (this._readyState = "open"), this.emitReserved("open");
					const t = this.engine;
					this.subs.push(i.on(t, "ping", this.onping.bind(this)), i.on(t, "data", this.ondata.bind(this)), i.on(t, "error", this.onerror.bind(this)), i.on(t, "close", this.onclose.bind(this)), i.on(this.decoder, "decoded", this.ondecoded.bind(this)));
				}
				onping() {
					this.emitReserved("ping");
				}
				ondata(t) {
					this.decoder.add(t);
				}
				ondecoded(t) {
					this.emitReserved("packet", t);
				}
				onerror(t) {
					h("error", t), this.emitReserved("error", t);
				}
				socket(t, e) {
					let n = this.nsps[t];
					return n || ((n = new o.Socket(this, t, e)), (this.nsps[t] = n)), n;
				}
				_destroy(t) {
					const e = Object.keys(this.nsps);
					for (const t of e) {
						if (this.nsps[t].active) return void h("socket %s is still active, skipping close", t);
					}
					this._close();
				}
				_packet(t) {
					h("writing packet %j", t);
					const e = this.encoder.encode(t);
					for (let n = 0; n < e.length; n++) this.engine.write(e[n], t.options);
				}
				cleanup() {
					h("cleanup"), this.subs.forEach((t) => t()), (this.subs.length = 0), this.decoder.destroy();
				}
				_close() {
					h("disconnect"), (this.skipReconnect = !0), (this._reconnecting = !1), "opening" === this._readyState && this.cleanup(), this.backoff.reset(), (this._readyState = "closed"), this.engine && this.engine.close();
				}
				disconnect() {
					return this._close();
				}
				onclose(t) {
					h("onclose"), this.cleanup(), this.backoff.reset(), (this._readyState = "closed"), this.emitReserved("close", t), this._reconnection && !this.skipReconnect && this.reconnect();
				}
				reconnect() {
					if (this._reconnecting || this.skipReconnect) return this;
					const t = this;
					if (this.backoff.attempts >= this._reconnectionAttempts) h("reconnect failed"), this.backoff.reset(), this.emitReserved("reconnect_failed"), (this._reconnecting = !1);
					else {
						const e = this.backoff.duration();
						h("will wait %dms before reconnect attempt", e), (this._reconnecting = !0);
						const n = setTimeout(() => {
							t.skipReconnect ||
								(h("attempting reconnect"),
								this.emitReserved("reconnect_attempt", t.backoff.attempts),
								t.skipReconnect ||
									t.open((e) => {
										e ? (h("reconnect attempt error"), (t._reconnecting = !1), t.reconnect(), this.emitReserved("reconnect_error", e)) : (h("reconnect success"), t.onreconnect());
									}));
						}, e);
						this.opts.autoUnref && n.unref(),
							this.subs.push(function () {
								clearTimeout(n);
							});
					}
				}
				onreconnect() {
					const t = this.backoff.attempts;
					(this._reconnecting = !1), this.backoff.reset(), this.emitReserved("reconnect", t);
				}
			}
			e.Manager = u;
		},
		function (t, e, n) {
			const r = n(10),
				o = n(25),
				s = n(29),
				i = n(30);
			(e.polling = function (t) {
				let e,
					n = !1,
					i = !1;
				const a = !1 !== t.jsonp;
				if ("undefined" != typeof location) {
					const e = "https:" === location.protocol;
					let r = location.port;
					r || (r = e ? 443 : 80), (n = t.hostname !== location.hostname || r !== t.port), (i = t.secure !== e);
				}
				if (((t.xdomain = n), (t.xscheme = i), (e = new r(t)), "open" in e && !t.forceJSONP)) return new o(t);
				if (!a) throw new Error("JSONP disabled");
				return new s(t);
			}),
				(e.websocket = i);
		},
		function (t, e, n) {
			const r = n(24),
				o = n(3);
			t.exports = function (t) {
				const e = t.xdomain,
					n = t.xscheme,
					s = t.enablesXDR;
				try {
					if ("undefined" != typeof XMLHttpRequest && (!e || r)) return new XMLHttpRequest();
				} catch (t) {}
				try {
					if ("undefined" != typeof XDomainRequest && !n && s) return new XDomainRequest();
				} catch (t) {}
				if (!e)
					try {
						return new o[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
					} catch (t) {}
			};
		},
		function (t, e, n) {
			const r = n(4),
				o = n(5),
				s = n(1),
				i = n(13),
				a = n(0)("engine.io-client:polling");
			t.exports = class extends r {
				get name() {
					return "polling";
				}
				doOpen() {
					this.poll();
				}
				pause(t) {
					const e = this;
					function n() {
						a("paused"), (e.readyState = "paused"), t();
					}
					if (((this.readyState = "pausing"), this.polling || !this.writable)) {
						let t = 0;
						this.polling &&
							(a("we are currently polling - waiting to pause"),
							t++,
							this.once("pollComplete", function () {
								a("pre-pause polling complete"), --t || n();
							})),
							this.writable ||
								(a("we are currently writing - waiting to pause"),
								t++,
								this.once("drain", function () {
									a("pre-pause writing complete"), --t || n();
								}));
					} else n();
				}
				poll() {
					a("polling"), (this.polling = !0), this.doPoll(), this.emit("poll");
				}
				onData(t) {
					const e = this;
					a("polling got data %s", t);
					s.decodePayload(t, this.socket.binaryType).forEach(function (t, n, r) {
						if (("opening" === e.readyState && "open" === t.type && e.onOpen(), "close" === t.type)) return e.onClose(), !1;
						e.onPacket(t);
					}),
						"closed" !== this.readyState && ((this.polling = !1), this.emit("pollComplete"), "open" === this.readyState ? this.poll() : a('ignoring poll - transport state "%s"', this.readyState));
				}
				doClose() {
					const t = this;
					function e() {
						a("writing close packet"), t.write([{ type: "close" }]);
					}
					"open" === this.readyState ? (a("transport open - closing"), e()) : (a("transport not open - deferring close"), this.once("open", e));
				}
				write(t) {
					(this.writable = !1),
						s.encodePayload(t, (t) => {
							this.doWrite(t, () => {
								(this.writable = !0), this.emit("drain");
							});
						});
				}
				uri() {
					let t = this.query || {};
					const e = this.opts.secure ? "https" : "http";
					let n = "";
					!1 !== this.opts.timestampRequests && (t[this.opts.timestampParam] = i()), this.supportsBinary || t.sid || (t.b64 = 1), (t = o.encode(t)), this.opts.port && (("https" === e && 443 !== Number(this.opts.port)) || ("http" === e && 80 !== Number(this.opts.port))) && (n = ":" + this.opts.port), t.length && (t = "?" + t);
					return e + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + t;
				}
			};
		},
		function (t, e) {
			const n = Object.create(null);
			(n.open = "0"), (n.close = "1"), (n.ping = "2"), (n.pong = "3"), (n.message = "4"), (n.upgrade = "5"), (n.noop = "6");
			const r = Object.create(null);
			Object.keys(n).forEach((t) => {
				r[n[t]] = t;
			});
			t.exports = { PACKET_TYPES: n, PACKET_TYPES_REVERSE: r, ERROR_PACKET: { type: "error", data: "parser error" } };
		},
		function (t, e, n) {
			"use strict";
			var r,
				o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
				s = {},
				i = 0,
				a = 0;
			function c(t) {
				var e = "";
				do {
					(e = o[t % 64] + e), (t = Math.floor(t / 64));
				} while (t > 0);
				return e;
			}
			function h() {
				var t = c(+new Date());
				return t !== r ? ((i = 0), (r = t)) : t + "." + c(i++);
			}
			for (; a < 64; a++) s[o[a]] = a;
			(h.encode = c),
				(h.decode = function (t) {
					var e = 0;
					for (a = 0; a < t.length; a++) e = 64 * e + s[t.charAt(a)];
					return e;
				}),
				(t.exports = h);
		},
		function (t, e) {
			t.exports.pick = (t, ...e) => e.reduce((e, n) => (t.hasOwnProperty(n) && (e[n] = t[n]), e), {});
		},
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 }), (e.Socket = void 0);
			const r = n(6),
				o = n(17),
				s = n(18),
				i = n(0)("socket.io-client:socket"),
				a = Object.freeze({ connect: 1, connect_error: 1, disconnect: 1, disconnecting: 1, newListener: 1, removeListener: 1 });
			class c extends s.StrictEventEmitter {
				constructor(t, e, n) {
					super(), (this.receiveBuffer = []), (this.sendBuffer = []), (this.ids = 0), (this.acks = {}), (this.flags = {}), (this.io = t), (this.nsp = e), (this.ids = 0), (this.acks = {}), (this.receiveBuffer = []), (this.sendBuffer = []), (this.connected = !1), (this.disconnected = !0), (this.flags = {}), n && n.auth && (this.auth = n.auth), this.io._autoConnect && this.open();
				}
				subEvents() {
					if (this.subs) return;
					const t = this.io;
					this.subs = [o.on(t, "open", this.onopen.bind(this)), o.on(t, "packet", this.onpacket.bind(this)), o.on(t, "error", this.onerror.bind(this)), o.on(t, "close", this.onclose.bind(this))];
				}
				get active() {
					return !!this.subs;
				}
				connect() {
					return this.connected || (this.subEvents(), this.io._reconnecting || this.io.open(), "open" === this.io._readyState && this.onopen()), this;
				}
				open() {
					return this.connect();
				}
				send(...t) {
					return t.unshift("message"), this.emit.apply(this, t), this;
				}
				emit(t, ...e) {
					if (a.hasOwnProperty(t)) throw new Error('"' + t + '" is a reserved event name');
					e.unshift(t);
					const n = { type: r.PacketType.EVENT, data: e, options: {} };
					(n.options.compress = !1 !== this.flags.compress), "function" == typeof e[e.length - 1] && (i("emitting packet with ack id %d", this.ids), (this.acks[this.ids] = e.pop()), (n.id = this.ids++));
					const o = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
					return this.flags.volatile && (!o || !this.connected) ? i("discard packet as the transport is not currently writable") : this.connected ? this.packet(n) : this.sendBuffer.push(n), (this.flags = {}), this;
				}
				packet(t) {
					(t.nsp = this.nsp), this.io._packet(t);
				}
				onopen() {
					i("transport is open - connecting"),
						"function" == typeof this.auth
							? this.auth((t) => {
									this.packet({ type: r.PacketType.CONNECT, data: t });
								})
							: this.packet({ type: r.PacketType.CONNECT, data: this.auth });
				}
				onerror(t) {
					this.connected || this.emitReserved("connect_error", t);
				}
				onclose(t) {
					i("close (%s)", t), (this.connected = !1), (this.disconnected = !0), delete this.id, this.emitReserved("disconnect", t);
				}
				onpacket(t) {
					if (t.nsp === this.nsp)
						switch (t.type) {
							case r.PacketType.CONNECT:
								if (t.data && t.data.sid) {
									const e = t.data.sid;
									this.onconnect(e);
								} else this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
								break;
							case r.PacketType.EVENT:
							case r.PacketType.BINARY_EVENT:
								this.onevent(t);
								break;
							case r.PacketType.ACK:
							case r.PacketType.BINARY_ACK:
								this.onack(t);
								break;
							case r.PacketType.DISCONNECT:
								this.ondisconnect();
								break;
							case r.PacketType.CONNECT_ERROR:
								const e = new Error(t.data.message);
								(e.data = t.data.data), this.emitReserved("connect_error", e);
						}
				}
				onevent(t) {
					const e = t.data || [];
					i("emitting event %j", e), null != t.id && (i("attaching ack callback to event"), e.push(this.ack(t.id))), this.connected ? this.emitEvent(e) : this.receiveBuffer.push(Object.freeze(e));
				}
				emitEvent(t) {
					if (this._anyListeners && this._anyListeners.length) {
						const e = this._anyListeners.slice();
						for (const n of e) n.apply(this, t);
					}
					super.emit.apply(this, t);
				}
				ack(t) {
					const e = this;
					let n = !1;
					return function (...o) {
						n || ((n = !0), i("sending ack %j", o), e.packet({ type: r.PacketType.ACK, id: t, data: o }));
					};
				}
				onack(t) {
					const e = this.acks[t.id];
					"function" == typeof e ? (i("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), delete this.acks[t.id]) : i("bad ack %s", t.id);
				}
				onconnect(t) {
					i("socket connected with id %s", t), (this.id = t), (this.connected = !0), (this.disconnected = !1), this.emitReserved("connect"), this.emitBuffered();
				}
				emitBuffered() {
					this.receiveBuffer.forEach((t) => this.emitEvent(t)), (this.receiveBuffer = []), this.sendBuffer.forEach((t) => this.packet(t)), (this.sendBuffer = []);
				}
				ondisconnect() {
					i("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");
				}
				destroy() {
					this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)), this.io._destroy(this);
				}
				disconnect() {
					return this.connected && (i("performing disconnect (%s)", this.nsp), this.packet({ type: r.PacketType.DISCONNECT })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
				}
				close() {
					return this.disconnect();
				}
				compress(t) {
					return (this.flags.compress = t), this;
				}
				get volatile() {
					return (this.flags.volatile = !0), this;
				}
				onAny(t) {
					return (this._anyListeners = this._anyListeners || []), this._anyListeners.push(t), this;
				}
				prependAny(t) {
					return (this._anyListeners = this._anyListeners || []), this._anyListeners.unshift(t), this;
				}
				offAny(t) {
					if (!this._anyListeners) return this;
					if (t) {
						const e = this._anyListeners;
						for (let n = 0; n < e.length; n++) if (t === e[n]) return e.splice(n, 1), this;
					} else this._anyListeners = [];
					return this;
				}
				listenersAny() {
					return this._anyListeners || [];
				}
			}
			e.Socket = c;
		},
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 }), (e.hasBinary = e.isBinary = void 0);
			const r = "function" == typeof ArrayBuffer,
				o = Object.prototype.toString,
				s = "function" == typeof Blob || ("undefined" != typeof Blob && "[object BlobConstructor]" === o.call(Blob)),
				i = "function" == typeof File || ("undefined" != typeof File && "[object FileConstructor]" === o.call(File));
			function a(t) {
				return (r && (t instanceof ArrayBuffer || ((t) => ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer))(t))) || (s && t instanceof Blob) || (i && t instanceof File);
			}
			(e.isBinary = a),
				(e.hasBinary = function t(e, n) {
					if (!e || "object" != typeof e) return !1;
					if (Array.isArray(e)) {
						for (let n = 0, r = e.length; n < r; n++) if (t(e[n])) return !0;
						return !1;
					}
					if (a(e)) return !0;
					if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return t(e.toJSON(), !0);
					for (const n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return !0;
					return !1;
				});
		},
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 }),
				(e.on = void 0),
				(e.on = function (t, e, n) {
					return (
						t.on(e, n),
						function () {
							t.off(e, n);
						}
					);
				});
		},
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 }), (e.StrictEventEmitter = void 0);
			const r = n(2);
			e.StrictEventEmitter = class extends r {
				on(t, e) {
					return super.on(t, e), this;
				}
				once(t, e) {
					return super.once(t, e), this;
				}
				emit(t, ...e) {
					return super.emit(t, ...e), this;
				}
				emitReserved(t, ...e) {
					return super.emit(t, ...e), this;
				}
				listeners(t) {
					return super.listeners(t);
				}
			};
		},
		function (t, e, n) {
			t.exports = n(20);
		},
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 }), (e.Socket = e.io = e.Manager = e.protocol = void 0);
			const r = n(21),
				o = n(8),
				s = n(15);
			Object.defineProperty(e, "Socket", {
				enumerable: !0,
				get: function () {
					return s.Socket;
				},
			});
			const i = n(0)("socket.io-client");
			t.exports = e = c;
			const a = (e.managers = {});
			function c(t, e) {
				"object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
				const n = r.url(t, e.path),
					s = n.source,
					c = n.id,
					h = n.path,
					u = a[c] && h in a[c].nsps;
				let f;
				return e.forceNew || e["force new connection"] || !1 === e.multiplex || u ? (i("ignoring socket cache for %s", s), (f = new o.Manager(s, e))) : (a[c] || (i("new io instance for %s", s), (a[c] = new o.Manager(s, e))), (f = a[c])), n.query && !e.query && (e.query = n.queryKey), f.socket(n.path, e);
			}
			e.io = c;
			var h = n(6);
			Object.defineProperty(e, "protocol", {
				enumerable: !0,
				get: function () {
					return h.protocol;
				},
			}),
				(e.connect = c);
			var u = n(8);
			Object.defineProperty(e, "Manager", {
				enumerable: !0,
				get: function () {
					return u.Manager;
				},
			}),
				(e.default = c);
		},
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 }), (e.url = void 0);
			const r = n(7),
				o = n(0)("socket.io-client:url");
			e.url = function (t, e = "", n) {
				let s = t;
				(n = n || ("undefined" != typeof location && location)),
					null == t && (t = n.protocol + "//" + n.host),
					"string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? n.protocol + t : n.host + t), /^(https?|wss?):\/\//.test(t) || (o("protocol-less url %s", t), (t = void 0 !== n ? n.protocol + "//" + t : "https://" + t)), o("parse %s", t), (s = r(t))),
					s.port || (/^(http|ws)$/.test(s.protocol) ? (s.port = "80") : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")),
					(s.path = s.path || "/");
				const i = -1 !== s.host.indexOf(":") ? "[" + s.host + "]" : s.host;
				return (s.id = s.protocol + "://" + i + ":" + s.port + e), (s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port)), s;
			};
		},
		function (t, e, n) {
			const r = n(23);
			(t.exports = (t, e) => new r(t, e)), (t.exports.Socket = r), (t.exports.protocol = r.protocol), (t.exports.Transport = n(4)), (t.exports.transports = n(9)), (t.exports.parser = n(1));
		},
		function (t, e, n) {
			const r = n(9),
				o = n(2),
				s = n(0)("engine.io-client:socket"),
				i = n(1),
				a = n(7),
				c = n(5);
			class h extends o {
				constructor(t, e = {}) {
					super(),
						t && "object" == typeof t && ((e = t), (t = null)),
						t ? ((t = a(t)), (e.hostname = t.host), (e.secure = "https" === t.protocol || "wss" === t.protocol), (e.port = t.port), t.query && (e.query = t.query)) : e.host && (e.hostname = a(e.host).host),
						(this.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol),
						e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
						(this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost")),
						(this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80)),
						(this.transports = e.transports || ["polling", "websocket"]),
						(this.readyState = ""),
						(this.writeBuffer = []),
						(this.prevBufferLen = 0),
						(this.opts = Object.assign({ path: "/engine.io", agent: !1, withCredentials: !1, upgrade: !0, jsonp: !0, timestampParam: "t", rememberUpgrade: !1, rejectUnauthorized: !0, perMessageDeflate: { threshold: 1024 }, transportOptions: {} }, e)),
						(this.opts.path = this.opts.path.replace(/\/$/, "") + "/"),
						"string" == typeof this.opts.query && (this.opts.query = c.decode(this.opts.query)),
						(this.id = null),
						(this.upgrades = null),
						(this.pingInterval = null),
						(this.pingTimeout = null),
						(this.pingTimeoutTimer = null),
						"function" == typeof addEventListener &&
							(addEventListener(
								"beforeunload",
								() => {
									this.transport && (this.transport.removeAllListeners(), this.transport.close());
								},
								!1,
							),
							"localhost" !== this.hostname &&
								((this.offlineEventListener = () => {
									this.onClose("transport close");
								}),
								addEventListener("offline", this.offlineEventListener, !1))),
						this.open();
				}
				createTransport(t) {
					s('creating transport "%s"', t);
					const e = (function (t) {
						const e = {};
						for (let n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
						return e;
					})(this.opts.query);
					(e.EIO = i.protocol), (e.transport = t), this.id && (e.sid = this.id);
					const n = Object.assign({}, this.opts.transportOptions[t], this.opts, { query: e, socket: this, hostname: this.hostname, secure: this.secure, port: this.port });
					return s("options: %j", n), new r[t](n);
				}
				open() {
					let t;
					if (this.opts.rememberUpgrade && h.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket";
					else {
						if (0 === this.transports.length) {
							const t = this;
							return void setTimeout(function () {
								t.emit("error", "No transports available");
							}, 0);
						}
						t = this.transports[0];
					}
					this.readyState = "opening";
					try {
						t = this.createTransport(t);
					} catch (t) {
						return s("error while creating transport: %s", t), this.transports.shift(), void this.open();
					}
					t.open(), this.setTransport(t);
				}
				setTransport(t) {
					s("setting transport %s", t.name);
					const e = this;
					this.transport && (s("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()),
						(this.transport = t),
						t
							.on("drain", function () {
								e.onDrain();
							})
							.on("packet", function (t) {
								e.onPacket(t);
							})
							.on("error", function (t) {
								e.onError(t);
							})
							.on("close", function () {
								e.onClose("transport close");
							});
				}
				probe(t) {
					s('probing transport "%s"', t);
					let e = this.createTransport(t, { probe: 1 }),
						n = !1;
					const r = this;
					function o() {
						if (r.onlyBinaryUpgrades) {
							const t = !this.supportsBinary && r.transport.supportsBinary;
							n = n || t;
						}
						n ||
							(s('probe transport "%s" opened', t),
							e.send([{ type: "ping", data: "probe" }]),
							e.once("packet", function (o) {
								if (!n)
									if ("pong" === o.type && "probe" === o.data) {
										if ((s('probe transport "%s" pong', t), (r.upgrading = !0), r.emit("upgrading", e), !e)) return;
										(h.priorWebsocketSuccess = "websocket" === e.name),
											s('pausing current transport "%s"', r.transport.name),
											r.transport.pause(function () {
												n || ("closed" !== r.readyState && (s("changing transport and sending upgrade packet"), p(), r.setTransport(e), e.send([{ type: "upgrade" }]), r.emit("upgrade", e), (e = null), (r.upgrading = !1), r.flush()));
											});
									} else {
										s('probe transport "%s" failed', t);
										const n = new Error("probe error");
										(n.transport = e.name), r.emit("upgradeError", n);
									}
							}));
					}
					function i() {
						n || ((n = !0), p(), e.close(), (e = null));
					}
					function a(n) {
						const o = new Error("probe error: " + n);
						(o.transport = e.name), i(), s('probe transport "%s" failed because of error: %s', t, n), r.emit("upgradeError", o);
					}
					function c() {
						a("transport closed");
					}
					function u() {
						a("socket closed");
					}
					function f(t) {
						e && t.name !== e.name && (s('"%s" works - aborting "%s"', t.name, e.name), i());
					}
					function p() {
						e.removeListener("open", o), e.removeListener("error", a), e.removeListener("close", c), r.removeListener("close", u), r.removeListener("upgrading", f);
					}
					(h.priorWebsocketSuccess = !1), e.once("open", o), e.once("error", a), e.once("close", c), this.once("close", u), this.once("upgrading", f), e.open();
				}
				onOpen() {
					if ((s("socket open"), (this.readyState = "open"), (h.priorWebsocketSuccess = "websocket" === this.transport.name), this.emit("open"), this.flush(), "open" === this.readyState && this.opts.upgrade && this.transport.pause)) {
						s("starting upgrade probes");
						let t = 0;
						const e = this.upgrades.length;
						for (; t < e; t++) this.probe(this.upgrades[t]);
					}
				}
				onPacket(t) {
					if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
						switch ((s('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type)) {
							case "open":
								this.onHandshake(JSON.parse(t.data));
								break;
							case "ping":
								this.resetPingTimeout(), this.sendPacket("pong"), this.emit("pong");
								break;
							case "error":
								const e = new Error("server error");
								(e.code = t.data), this.onError(e);
								break;
							case "message":
								this.emit("data", t.data), this.emit("message", t.data);
						}
					else s('packet received with socket readyState "%s"', this.readyState);
				}
				onHandshake(t) {
					this.emit("handshake", t), (this.id = t.sid), (this.transport.query.sid = t.sid), (this.upgrades = this.filterUpgrades(t.upgrades)), (this.pingInterval = t.pingInterval), (this.pingTimeout = t.pingTimeout), this.onOpen(), "closed" !== this.readyState && this.resetPingTimeout();
				}
				resetPingTimeout() {
					clearTimeout(this.pingTimeoutTimer),
						(this.pingTimeoutTimer = setTimeout(() => {
							this.onClose("ping timeout");
						}, this.pingInterval + this.pingTimeout)),
						this.opts.autoUnref && this.pingTimeoutTimer.unref();
				}
				onDrain() {
					this.writeBuffer.splice(0, this.prevBufferLen), (this.prevBufferLen = 0), 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
				}
				flush() {
					"closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (s("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), (this.prevBufferLen = this.writeBuffer.length), this.emit("flush"));
				}
				write(t, e, n) {
					return this.sendPacket("message", t, e, n), this;
				}
				send(t, e, n) {
					return this.sendPacket("message", t, e, n), this;
				}
				sendPacket(t, e, n, r) {
					if (("function" == typeof e && ((r = e), (e = void 0)), "function" == typeof n && ((r = n), (n = null)), "closing" === this.readyState || "closed" === this.readyState)) return;
					(n = n || {}).compress = !1 !== n.compress;
					const o = { type: t, data: e, options: n };
					this.emit("packetCreate", o), this.writeBuffer.push(o), r && this.once("flush", r), this.flush();
				}
				close() {
					const t = this;
					function e() {
						t.onClose("forced close"), s("socket closing - telling transport to close"), t.transport.close();
					}
					function n() {
						t.removeListener("upgrade", n), t.removeListener("upgradeError", n), e();
					}
					function r() {
						t.once("upgrade", n), t.once("upgradeError", n);
					}
					return (
						("opening" !== this.readyState && "open" !== this.readyState) ||
							((this.readyState = "closing"),
							this.writeBuffer.length
								? this.once("drain", function () {
										this.upgrading ? r() : e();
									})
								: this.upgrading
									? r()
									: e()),
						this
					);
				}
				onError(t) {
					s("socket error %j", t), (h.priorWebsocketSuccess = !1), this.emit("error", t), this.onClose("transport error", t);
				}
				onClose(t, e) {
					if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
						s('socket close with reason: "%s"', t);
						const n = this;
						clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), "function" == typeof removeEventListener && removeEventListener("offline", this.offlineEventListener, !1), (this.readyState = "closed"), (this.id = null), this.emit("close", t, e), (n.writeBuffer = []), (n.prevBufferLen = 0);
					}
				}
				filterUpgrades(t) {
					const e = [];
					let n = 0;
					const r = t.length;
					for (; n < r; n++) ~this.transports.indexOf(t[n]) && e.push(t[n]);
					return e;
				}
			}
			(h.priorWebsocketSuccess = !1), (h.protocol = i.protocol), (t.exports = h);
		},
		function (t, e) {
			try {
				t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest();
			} catch (e) {
				t.exports = !1;
			}
		},
		function (t, e, n) {
			const r = n(10),
				o = n(11),
				s = n(2),
				{ pick: i } = n(14),
				a = n(3),
				c = n(0)("engine.io-client:polling-xhr");
			function h() {}
			const u = null != new r({ xdomain: !1 }).responseType;
			class f extends s {
				constructor(t, e) {
					super(), (this.opts = e), (this.method = e.method || "GET"), (this.uri = t), (this.async = !1 !== e.async), (this.data = void 0 !== e.data ? e.data : null), this.create();
				}
				create() {
					const t = i(this.opts, "agent", "enablesXDR", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
					(t.xdomain = !!this.opts.xd), (t.xscheme = !!this.opts.xs);
					const e = (this.xhr = new r(t)),
						n = this;
					try {
						c("xhr open %s: %s", this.method, this.uri), e.open(this.method, this.uri, this.async);
						try {
							if (this.opts.extraHeaders) {
								e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0);
								for (let t in this.opts.extraHeaders) this.opts.extraHeaders.hasOwnProperty(t) && e.setRequestHeader(t, this.opts.extraHeaders[t]);
							}
						} catch (t) {}
						if ("POST" === this.method)
							try {
								e.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
							} catch (t) {}
						try {
							e.setRequestHeader("Accept", "*/*");
						} catch (t) {}
						"withCredentials" in e && (e.withCredentials = this.opts.withCredentials),
							this.opts.requestTimeout && (e.timeout = this.opts.requestTimeout),
							this.hasXDR()
								? ((e.onload = function () {
										n.onLoad();
									}),
									(e.onerror = function () {
										n.onError(e.responseText);
									}))
								: (e.onreadystatechange = function () {
										4 === e.readyState &&
											(200 === e.status || 1223 === e.status
												? n.onLoad()
												: setTimeout(function () {
														n.onError("number" == typeof e.status ? e.status : 0);
													}, 0));
									}),
							c("xhr data %s", this.data),
							e.send(this.data);
					} catch (t) {
						return void setTimeout(function () {
							n.onError(t);
						}, 0);
					}
					"undefined" != typeof document && ((this.index = f.requestsCount++), (f.requests[this.index] = this));
				}
				onSuccess() {
					this.emit("success"), this.cleanup();
				}
				onData(t) {
					this.emit("data", t), this.onSuccess();
				}
				onError(t) {
					this.emit("error", t), this.cleanup(!0);
				}
				cleanup(t) {
					if (void 0 !== this.xhr && null !== this.xhr) {
						if ((this.hasXDR() ? (this.xhr.onload = this.xhr.onerror = h) : (this.xhr.onreadystatechange = h), t))
							try {
								this.xhr.abort();
							} catch (t) {}
						"undefined" != typeof document && delete f.requests[this.index], (this.xhr = null);
					}
				}
				onLoad() {
					const t = this.xhr.responseText;
					null !== t && this.onData(t);
				}
				hasXDR() {
					return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR;
				}
				abort() {
					this.cleanup();
				}
			}
			if (((f.requestsCount = 0), (f.requests = {}), "undefined" != typeof document))
				if ("function" == typeof attachEvent) attachEvent("onunload", p);
				else if ("function" == typeof addEventListener) {
					addEventListener("onpagehide" in a ? "pagehide" : "unload", p, !1);
				}
			function p() {
				for (let t in f.requests) f.requests.hasOwnProperty(t) && f.requests[t].abort();
			}
			(t.exports = class extends o {
				constructor(t) {
					if ((super(t), "undefined" != typeof location)) {
						const e = "https:" === location.protocol;
						let n = location.port;
						n || (n = e ? 443 : 80), (this.xd = ("undefined" != typeof location && t.hostname !== location.hostname) || n !== t.port), (this.xs = t.secure !== e);
					}
					const e = t && t.forceBase64;
					this.supportsBinary = u && !e;
				}
				request(t = {}) {
					return Object.assign(t, { xd: this.xd, xs: this.xs }, this.opts), new f(this.uri(), t);
				}
				doWrite(t, e) {
					const n = this.request({ method: "POST", data: t }),
						r = this;
					n.on("success", e),
						n.on("error", function (t) {
							r.onError("xhr post error", t);
						});
				}
				doPoll() {
					c("xhr poll");
					const t = this.request(),
						e = this;
					t.on("data", function (t) {
						e.onData(t);
					}),
						t.on("error", function (t) {
							e.onError("xhr poll error", t);
						}),
						(this.pollXhr = t);
				}
			}),
				(t.exports.Request = f);
		},
		function (t, e, n) {
			const { PACKET_TYPES: r } = n(12),
				o = "function" == typeof Blob || ("undefined" != typeof Blob && "[object BlobConstructor]" === Object.prototype.toString.call(Blob)),
				s = "function" == typeof ArrayBuffer,
				i = (t, e) => {
					const n = new FileReader();
					return (
						(n.onload = function () {
							const t = n.result.split(",")[1];
							e("b" + t);
						}),
						n.readAsDataURL(t)
					);
				};
			t.exports = ({ type: t, data: e }, n, a) => {
				return o && e instanceof Blob ? (n ? a(e) : i(e, a)) : s && (e instanceof ArrayBuffer || ((c = e), "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(c) : c && c.buffer instanceof ArrayBuffer)) ? (n ? a(e instanceof ArrayBuffer ? e : e.buffer) : i(new Blob([e]), a)) : a(r[t] + (e || ""));
				var c;
			};
		},
		function (t, e, n) {
			const { PACKET_TYPES_REVERSE: r, ERROR_PACKET: o } = n(12);
			let s;
			"function" == typeof ArrayBuffer && (s = n(28));
			const i = (t, e) => {
					if (s) {
						const n = s.decode(t);
						return a(n, e);
					}
					return { base64: !0, data: t };
				},
				a = (t, e) => {
					switch (e) {
						case "blob":
							return t instanceof ArrayBuffer ? new Blob([t]) : t;
						case "arraybuffer":
						default:
							return t;
					}
				};
			t.exports = (t, e) => {
				if ("string" != typeof t) return { type: "message", data: a(t, e) };
				const n = t.charAt(0);
				if ("b" === n) return { type: "message", data: i(t.substring(1), e) };
				return r[n] ? (t.length > 1 ? { type: r[n], data: t.substring(1) } : { type: r[n] }) : o;
			};
		},
		function (t, e) {
			!(function (t) {
				"use strict";
				(e.encode = function (e) {
					var n,
						r = new Uint8Array(e),
						o = r.length,
						s = "";
					for (n = 0; n < o; n += 3) (s += t[r[n] >> 2]), (s += t[((3 & r[n]) << 4) | (r[n + 1] >> 4)]), (s += t[((15 & r[n + 1]) << 2) | (r[n + 2] >> 6)]), (s += t[63 & r[n + 2]]);
					return o % 3 == 2 ? (s = s.substring(0, s.length - 1) + "=") : o % 3 == 1 && (s = s.substring(0, s.length - 2) + "=="), s;
				}),
					(e.decode = function (e) {
						var n,
							r,
							o,
							s,
							i,
							a = 0.75 * e.length,
							c = e.length,
							h = 0;
						"=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
						var u = new ArrayBuffer(a),
							f = new Uint8Array(u);
						for (n = 0; n < c; n += 4) (r = t.indexOf(e[n])), (o = t.indexOf(e[n + 1])), (s = t.indexOf(e[n + 2])), (i = t.indexOf(e[n + 3])), (f[h++] = (r << 2) | (o >> 4)), (f[h++] = ((15 & o) << 4) | (s >> 2)), (f[h++] = ((3 & s) << 6) | (63 & i));
						return u;
					});
			})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
		},
		function (t, e, n) {
			const r = n(11),
				o = n(3),
				s = /\n/g,
				i = /\\n/g;
			let a;
			t.exports = class extends r {
				constructor(t) {
					super(t), (this.query = this.query || {}), a || (a = o.___eio = o.___eio || []), (this.index = a.length);
					const e = this;
					a.push(function (t) {
						e.onData(t);
					}),
						(this.query.j = this.index);
				}
				get supportsBinary() {
					return !1;
				}
				doClose() {
					this.script && ((this.script.onerror = () => {}), this.script.parentNode.removeChild(this.script), (this.script = null)), this.form && (this.form.parentNode.removeChild(this.form), (this.form = null), (this.iframe = null)), super.doClose();
				}
				doPoll() {
					const t = this,
						e = document.createElement("script");
					this.script && (this.script.parentNode.removeChild(this.script), (this.script = null)),
						(e.async = !0),
						(e.src = this.uri()),
						(e.onerror = function (e) {
							t.onError("jsonp poll error", e);
						});
					const n = document.getElementsByTagName("script")[0];
					n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e), (this.script = e);
					"undefined" != typeof navigator &&
						/gecko/i.test(navigator.userAgent) &&
						setTimeout(function () {
							const t = document.createElement("iframe");
							document.body.appendChild(t), document.body.removeChild(t);
						}, 100);
				}
				doWrite(t, e) {
					const n = this;
					let r;
					if (!this.form) {
						const t = document.createElement("form"),
							e = document.createElement("textarea"),
							n = (this.iframeId = "eio_iframe_" + this.index);
						(t.className = "socketio"), (t.style.position = "absolute"), (t.style.top = "-1000px"), (t.style.left = "-1000px"), (t.target = n), (t.method = "POST"), t.setAttribute("accept-charset", "utf-8"), (e.name = "d"), t.appendChild(e), document.body.appendChild(t), (this.form = t), (this.area = e);
					}
					function o() {
						a(), e();
					}
					function a() {
						if (n.iframe)
							try {
								n.form.removeChild(n.iframe);
							} catch (t) {
								n.onError("jsonp polling iframe removal error", t);
							}
						try {
							const t = '<iframe src="javascript:0" name="' + n.iframeId + '">';
							r = document.createElement(t);
						} catch (t) {
							(r = document.createElement("iframe")), (r.name = n.iframeId), (r.src = "javascript:0");
						}
						(r.id = n.iframeId), n.form.appendChild(r), (n.iframe = r);
					}
					(this.form.action = this.uri()), a(), (t = t.replace(i, "\\\n")), (this.area.value = t.replace(s, "\\n"));
					try {
						this.form.submit();
					} catch (t) {}
					this.iframe.attachEvent
						? (this.iframe.onreadystatechange = function () {
								"complete" === n.iframe.readyState && o();
							})
						: (this.iframe.onload = o);
				}
			};
		},
		function (t, e, n) {
			(function (e) {
				const r = n(1),
					o = n(5),
					s = n(13),
					i = n(4),
					{ pick: a } = n(14),
					c = n(3),
					h = n(0)("engine.io-client:websocket");
				let u = c.WebSocket || c.MozWebSocket,
					f = !0,
					p = "arraybuffer";
				"undefined" == typeof window && ((u = n(36)), (f = !1), (p = "nodebuffer"));
				const l = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase();
				class d extends i {
					constructor(t) {
						super(t), (this.supportsBinary = !t.forceBase64);
					}
					get name() {
						return "websocket";
					}
					doOpen() {
						if (!this.check()) return;
						const t = this.uri(),
							e = this.opts.protocols,
							n = l ? {} : a(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
						this.opts.extraHeaders && (n.headers = this.opts.extraHeaders);
						try {
							this.ws = f && !l ? (e ? new u(t, e) : new u(t)) : new u(t, e, n);
						} catch (t) {
							return console.log("error", t), this.emit("error", t);
						}
						(this.ws.binaryType = this.socket.binaryType || p), this.addEventListeners();
					}
					addEventListeners() {
						(this.ws.onopen = () => {
							this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
						}),
							(this.ws.onclose = this.onClose.bind(this)),
							(this.ws.onmessage = (t) => this.onData(t.data)),
							(this.ws.onerror = (t) => this.onError("websocket error", t));
					}
					write(t) {
						const n = this;
						this.writable = !1;
						let o = t.length,
							s = 0;
						const i = o;
						for (; s < i; s++)
							!(function (t) {
								r.encodePacket(t, n.supportsBinary, function (r) {
									const s = {};
									if (!f && (t.options && (s.compress = t.options.compress), n.opts.perMessageDeflate)) {
										("string" == typeof r ? e.byteLength(r) : r.length) < n.opts.perMessageDeflate.threshold && (s.compress = !1);
									}
									try {
										f ? n.ws.send(r) : n.ws.send(r, s);
									} catch (t) {
										h("websocket closed before onclose event");
									}
									--o || a();
								});
							})(t[s]);
						function a() {
							n.emit("flush"),
								setTimeout(function () {
									(n.writable = !0), n.emit("drain");
								}, 0);
						}
					}
					onClose() {
						i.prototype.onClose.call(this);
					}
					doClose() {
						void 0 !== this.ws && (this.ws.close(), (this.ws = null));
					}
					uri() {
						let t = this.query || {};
						const e = this.opts.secure ? "wss" : "ws";
						let n = "";
						this.opts.port && (("wss" === e && 443 !== Number(this.opts.port)) || ("ws" === e && 80 !== Number(this.opts.port))) && (n = ":" + this.opts.port), this.opts.timestampRequests && (t[this.opts.timestampParam] = s()), this.supportsBinary || (t.b64 = 1), (t = o.encode(t)), t.length && (t = "?" + t);
						return e + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + t;
					}
					check() {
						return !(!u || ("__initialize" in u && this.name === d.prototype.name));
					}
				}
				t.exports = d;
			}).call(this, n(31).Buffer);
		},
		function (t, e, n) {
			"use strict";
			(function (t) {
				/*!
				 * The buffer module from node.js, for the browser.
				 *
				 * @author   Feross Aboukhadijeh <http://feross.org>
				 * @license  MIT
				 */
				var r = n(33),
					o = n(34),
					s = n(35);
				function i() {
					return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
				}
				function a(t, e) {
					if (i() < e) throw new RangeError("Invalid typed array length");
					return c.TYPED_ARRAY_SUPPORT ? ((t = new Uint8Array(e)).__proto__ = c.prototype) : (null === t && (t = new c(e)), (t.length = e)), t;
				}
				function c(t, e, n) {
					if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, n);
					if ("number" == typeof t) {
						if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
						return f(this, t);
					}
					return h(this, t, e, n);
				}
				function h(t, e, n, r) {
					if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
					return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
						? (function (t, e, n, r) {
								if ((e.byteLength, n < 0 || e.byteLength < n)) throw new RangeError("'offset' is out of bounds");
								if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
								e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
								c.TYPED_ARRAY_SUPPORT ? ((t = e).__proto__ = c.prototype) : (t = p(t, e));
								return t;
							})(t, e, n, r)
						: "string" == typeof e
							? (function (t, e, n) {
									("string" == typeof n && "" !== n) || (n = "utf8");
									if (!c.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
									var r = 0 | d(e, n),
										o = (t = a(t, r)).write(e, n);
									o !== r && (t = t.slice(0, o));
									return t;
								})(t, e, n)
							: (function (t, e) {
									if (c.isBuffer(e)) {
										var n = 0 | l(e.length);
										return 0 === (t = a(t, n)).length || e.copy(t, 0, 0, n), t;
									}
									if (e) {
										if (("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer) || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? a(t, 0) : p(t, e);
										if ("Buffer" === e.type && s(e.data)) return p(t, e.data);
									}
									var r;
									throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
								})(t, e);
				}
				function u(t) {
					if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
					if (t < 0) throw new RangeError('"size" argument must not be negative');
				}
				function f(t, e) {
					if ((u(e), (t = a(t, e < 0 ? 0 : 0 | l(e))), !c.TYPED_ARRAY_SUPPORT)) for (var n = 0; n < e; ++n) t[n] = 0;
					return t;
				}
				function p(t, e) {
					var n = e.length < 0 ? 0 : 0 | l(e.length);
					t = a(t, n);
					for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
					return t;
				}
				function l(t) {
					if (t >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
					return 0 | t;
				}
				function d(t, e) {
					if (c.isBuffer(t)) return t.length;
					if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
					"string" != typeof t && (t = "" + t);
					var n = t.length;
					if (0 === n) return 0;
					for (var r = !1; ; )
						switch (e) {
							case "ascii":
							case "latin1":
							case "binary":
								return n;
							case "utf8":
							case "utf-8":
							case void 0:
								return Y(t).length;
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return 2 * n;
							case "hex":
								return n >>> 1;
							case "base64":
								return q(t).length;
							default:
								if (r) return Y(t).length;
								(e = ("" + e).toLowerCase()), (r = !0);
						}
				}
				function y(t, e, n) {
					var r = !1;
					if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
					if (((void 0 === n || n > this.length) && (n = this.length), n <= 0)) return "";
					if ((n >>>= 0) <= (e >>>= 0)) return "";
					for (t || (t = "utf8"); ; )
						switch (t) {
							case "hex":
								return P(this, e, n);
							case "utf8":
							case "utf-8":
								return R(this, e, n);
							case "ascii":
								return S(this, e, n);
							case "latin1":
							case "binary":
								return x(this, e, n);
							case "base64":
								return T(this, e, n);
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return C(this, e, n);
							default:
								if (r) throw new TypeError("Unknown encoding: " + t);
								(t = (t + "").toLowerCase()), (r = !0);
						}
				}
				function g(t, e, n) {
					var r = t[e];
					(t[e] = t[n]), (t[n] = r);
				}
				function m(t, e, n, r, o) {
					if (0 === t.length) return -1;
					if (("string" == typeof n ? ((r = n), (n = 0)) : n > 2147483647 ? (n = 2147483647) : n < -2147483648 && (n = -2147483648), (n = +n), isNaN(n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length)) {
						if (o) return -1;
						n = t.length - 1;
					} else if (n < 0) {
						if (!o) return -1;
						n = 0;
					}
					if (("string" == typeof e && (e = c.from(e, r)), c.isBuffer(e))) return 0 === e.length ? -1 : v(t, e, n, r, o);
					if ("number" == typeof e) return (e &= 255), c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? (o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n)) : v(t, [e], n, r, o);
					throw new TypeError("val must be string, number or Buffer");
				}
				function v(t, e, n, r, o) {
					var s,
						i = 1,
						a = t.length,
						c = e.length;
					if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
						if (t.length < 2 || e.length < 2) return -1;
						(i = 2), (a /= 2), (c /= 2), (n /= 2);
					}
					function h(t, e) {
						return 1 === i ? t[e] : t.readUInt16BE(e * i);
					}
					if (o) {
						var u = -1;
						for (s = n; s < a; s++)
							if (h(t, s) === h(e, -1 === u ? 0 : s - u)) {
								if ((-1 === u && (u = s), s - u + 1 === c)) return u * i;
							} else -1 !== u && (s -= s - u), (u = -1);
					} else
						for (n + c > a && (n = a - c), s = n; s >= 0; s--) {
							for (var f = !0, p = 0; p < c; p++)
								if (h(t, s + p) !== h(e, p)) {
									f = !1;
									break;
								}
							if (f) return s;
						}
					return -1;
				}
				function b(t, e, n, r) {
					n = Number(n) || 0;
					var o = t.length - n;
					r ? (r = Number(r)) > o && (r = o) : (r = o);
					var s = e.length;
					if (s % 2 != 0) throw new TypeError("Invalid hex string");
					r > s / 2 && (r = s / 2);
					for (var i = 0; i < r; ++i) {
						var a = parseInt(e.substr(2 * i, 2), 16);
						if (isNaN(a)) return i;
						t[n + i] = a;
					}
					return i;
				}
				function w(t, e, n, r) {
					return F(Y(e, t.length - n), t, n, r);
				}
				function _(t, e, n, r) {
					return F(
						(function (t) {
							for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
							return e;
						})(e),
						t,
						n,
						r,
					);
				}
				function E(t, e, n, r) {
					return _(t, e, n, r);
				}
				function k(t, e, n, r) {
					return F(q(e), t, n, r);
				}
				function A(t, e, n, r) {
					return F(
						(function (t, e) {
							for (var n, r, o, s = [], i = 0; i < t.length && !((e -= 2) < 0); ++i) (n = t.charCodeAt(i)), (r = n >> 8), (o = n % 256), s.push(o), s.push(r);
							return s;
						})(e, t.length - n),
						t,
						n,
						r,
					);
				}
				function T(t, e, n) {
					return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n));
				}
				function R(t, e, n) {
					n = Math.min(t.length, n);
					for (var r = [], o = e; o < n; ) {
						var s,
							i,
							a,
							c,
							h = t[o],
							u = null,
							f = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
						if (o + f <= n)
							switch (f) {
								case 1:
									h < 128 && (u = h);
									break;
								case 2:
									128 == (192 & (s = t[o + 1])) && (c = ((31 & h) << 6) | (63 & s)) > 127 && (u = c);
									break;
								case 3:
									(s = t[o + 1]), (i = t[o + 2]), 128 == (192 & s) && 128 == (192 & i) && (c = ((15 & h) << 12) | ((63 & s) << 6) | (63 & i)) > 2047 && (c < 55296 || c > 57343) && (u = c);
									break;
								case 4:
									(s = t[o + 1]), (i = t[o + 2]), (a = t[o + 3]), 128 == (192 & s) && 128 == (192 & i) && 128 == (192 & a) && (c = ((15 & h) << 18) | ((63 & s) << 12) | ((63 & i) << 6) | (63 & a)) > 65535 && c < 1114112 && (u = c);
							}
						null === u ? ((u = 65533), (f = 1)) : u > 65535 && ((u -= 65536), r.push(((u >>> 10) & 1023) | 55296), (u = 56320 | (1023 & u))), r.push(u), (o += f);
					}
					return (function (t) {
						var e = t.length;
						if (e <= 4096) return String.fromCharCode.apply(String, t);
						var n = "",
							r = 0;
						for (; r < e; ) n += String.fromCharCode.apply(String, t.slice(r, (r += 4096)));
						return n;
					})(r);
				}
				(e.Buffer = c),
					(e.SlowBuffer = function (t) {
						+t != t && (t = 0);
						return c.alloc(+t);
					}),
					(e.INSPECT_MAX_BYTES = 50),
					(c.TYPED_ARRAY_SUPPORT =
						void 0 !== t.TYPED_ARRAY_SUPPORT
							? t.TYPED_ARRAY_SUPPORT
							: (function () {
									try {
										var t = new Uint8Array(1);
										return (
											(t.__proto__ = {
												__proto__: Uint8Array.prototype,
												foo: function () {
													return 42;
												},
											}),
											42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
										);
									} catch (t) {
										return !1;
									}
								})()),
					(e.kMaxLength = i()),
					(c.poolSize = 8192),
					(c._augment = function (t) {
						return (t.__proto__ = c.prototype), t;
					}),
					(c.from = function (t, e, n) {
						return h(null, t, e, n);
					}),
					c.TYPED_ARRAY_SUPPORT && ((c.prototype.__proto__ = Uint8Array.prototype), (c.__proto__ = Uint8Array), "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, { value: null, configurable: !0 })),
					(c.alloc = function (t, e, n) {
						return (function (t, e, n, r) {
							return u(e), e <= 0 ? a(t, e) : void 0 !== n ? ("string" == typeof r ? a(t, e).fill(n, r) : a(t, e).fill(n)) : a(t, e);
						})(null, t, e, n);
					}),
					(c.allocUnsafe = function (t) {
						return f(null, t);
					}),
					(c.allocUnsafeSlow = function (t) {
						return f(null, t);
					}),
					(c.isBuffer = function (t) {
						return !(null == t || !t._isBuffer);
					}),
					(c.compare = function (t, e) {
						if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
						if (t === e) return 0;
						for (var n = t.length, r = e.length, o = 0, s = Math.min(n, r); o < s; ++o)
							if (t[o] !== e[o]) {
								(n = t[o]), (r = e[o]);
								break;
							}
						return n < r ? -1 : r < n ? 1 : 0;
					}),
					(c.isEncoding = function (t) {
						switch (String(t).toLowerCase()) {
							case "hex":
							case "utf8":
							case "utf-8":
							case "ascii":
							case "latin1":
							case "binary":
							case "base64":
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return !0;
							default:
								return !1;
						}
					}),
					(c.concat = function (t, e) {
						if (!s(t)) throw new TypeError('"list" argument must be an Array of Buffers');
						if (0 === t.length) return c.alloc(0);
						var n;
						if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
						var r = c.allocUnsafe(e),
							o = 0;
						for (n = 0; n < t.length; ++n) {
							var i = t[n];
							if (!c.isBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
							i.copy(r, o), (o += i.length);
						}
						return r;
					}),
					(c.byteLength = d),
					(c.prototype._isBuffer = !0),
					(c.prototype.swap16 = function () {
						var t = this.length;
						if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
						for (var e = 0; e < t; e += 2) g(this, e, e + 1);
						return this;
					}),
					(c.prototype.swap32 = function () {
						var t = this.length;
						if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
						for (var e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
						return this;
					}),
					(c.prototype.swap64 = function () {
						var t = this.length;
						if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
						for (var e = 0; e < t; e += 8) g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
						return this;
					}),
					(c.prototype.toString = function () {
						var t = 0 | this.length;
						return 0 === t ? "" : 0 === arguments.length ? R(this, 0, t) : y.apply(this, arguments);
					}),
					(c.prototype.equals = function (t) {
						if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
						return this === t || 0 === c.compare(this, t);
					}),
					(c.prototype.inspect = function () {
						var t = "",
							n = e.INSPECT_MAX_BYTES;
						return this.length > 0 && ((t = this.toString("hex", 0, n).match(/.{2}/g).join(" ")), this.length > n && (t += " ... ")), "<Buffer " + t + ">";
					}),
					(c.prototype.compare = function (t, e, n, r, o) {
						if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
						if ((void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length)) throw new RangeError("out of range index");
						if (r >= o && e >= n) return 0;
						if (r >= o) return -1;
						if (e >= n) return 1;
						if (this === t) return 0;
						for (var s = (o >>>= 0) - (r >>>= 0), i = (n >>>= 0) - (e >>>= 0), a = Math.min(s, i), h = this.slice(r, o), u = t.slice(e, n), f = 0; f < a; ++f)
							if (h[f] !== u[f]) {
								(s = h[f]), (i = u[f]);
								break;
							}
						return s < i ? -1 : i < s ? 1 : 0;
					}),
					(c.prototype.includes = function (t, e, n) {
						return -1 !== this.indexOf(t, e, n);
					}),
					(c.prototype.indexOf = function (t, e, n) {
						return m(this, t, e, n, !0);
					}),
					(c.prototype.lastIndexOf = function (t, e, n) {
						return m(this, t, e, n, !1);
					}),
					(c.prototype.write = function (t, e, n, r) {
						if (void 0 === e) (r = "utf8"), (n = this.length), (e = 0);
						else if (void 0 === n && "string" == typeof e) (r = e), (n = this.length), (e = 0);
						else {
							if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
							(e |= 0), isFinite(n) ? ((n |= 0), void 0 === r && (r = "utf8")) : ((r = n), (n = void 0));
						}
						var o = this.length - e;
						if (((void 0 === n || n > o) && (n = o), (t.length > 0 && (n < 0 || e < 0)) || e > this.length)) throw new RangeError("Attempt to write outside buffer bounds");
						r || (r = "utf8");
						for (var s = !1; ; )
							switch (r) {
								case "hex":
									return b(this, t, e, n);
								case "utf8":
								case "utf-8":
									return w(this, t, e, n);
								case "ascii":
									return _(this, t, e, n);
								case "latin1":
								case "binary":
									return E(this, t, e, n);
								case "base64":
									return k(this, t, e, n);
								case "ucs2":
								case "ucs-2":
								case "utf16le":
								case "utf-16le":
									return A(this, t, e, n);
								default:
									if (s) throw new TypeError("Unknown encoding: " + r);
									(r = ("" + r).toLowerCase()), (s = !0);
							}
					}),
					(c.prototype.toJSON = function () {
						return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
					});
				function S(t, e, n) {
					var r = "";
					n = Math.min(t.length, n);
					for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
					return r;
				}
				function x(t, e, n) {
					var r = "";
					n = Math.min(t.length, n);
					for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
					return r;
				}
				function P(t, e, n) {
					var r = t.length;
					(!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
					for (var o = "", s = e; s < n; ++s) o += D(t[s]);
					return o;
				}
				function C(t, e, n) {
					for (var r = t.slice(e, n), o = "", s = 0; s < r.length; s += 2) o += String.fromCharCode(r[s] + 256 * r[s + 1]);
					return o;
				}
				function O(t, e, n) {
					if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
					if (t + e > n) throw new RangeError("Trying to access beyond buffer length");
				}
				function B(t, e, n, r, o, s) {
					if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
					if (e > o || e < s) throw new RangeError('"value" argument is out of bounds');
					if (n + r > t.length) throw new RangeError("Index out of range");
				}
				function L(t, e, n, r) {
					e < 0 && (e = 65535 + e + 1);
					for (var o = 0, s = Math.min(t.length - n, 2); o < s; ++o) t[n + o] = (e & (255 << (8 * (r ? o : 1 - o)))) >>> (8 * (r ? o : 1 - o));
				}
				function N(t, e, n, r) {
					e < 0 && (e = 4294967295 + e + 1);
					for (var o = 0, s = Math.min(t.length - n, 4); o < s; ++o) t[n + o] = (e >>> (8 * (r ? o : 3 - o))) & 255;
				}
				function j(t, e, n, r, o, s) {
					if (n + r > t.length) throw new RangeError("Index out of range");
					if (n < 0) throw new RangeError("Index out of range");
				}
				function I(t, e, n, r, s) {
					return s || j(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4;
				}
				function M(t, e, n, r, s) {
					return s || j(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8;
				}
				(c.prototype.slice = function (t, e) {
					var n,
						r = this.length;
					if (((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), c.TYPED_ARRAY_SUPPORT)) (n = this.subarray(t, e)).__proto__ = c.prototype;
					else {
						var o = e - t;
						n = new c(o, void 0);
						for (var s = 0; s < o; ++s) n[s] = this[s + t];
					}
					return n;
				}),
					(c.prototype.readUIntLE = function (t, e, n) {
						(t |= 0), (e |= 0), n || O(t, e, this.length);
						for (var r = this[t], o = 1, s = 0; ++s < e && (o *= 256); ) r += this[t + s] * o;
						return r;
					}),
					(c.prototype.readUIntBE = function (t, e, n) {
						(t |= 0), (e |= 0), n || O(t, e, this.length);
						for (var r = this[t + --e], o = 1; e > 0 && (o *= 256); ) r += this[t + --e] * o;
						return r;
					}),
					(c.prototype.readUInt8 = function (t, e) {
						return e || O(t, 1, this.length), this[t];
					}),
					(c.prototype.readUInt16LE = function (t, e) {
						return e || O(t, 2, this.length), this[t] | (this[t + 1] << 8);
					}),
					(c.prototype.readUInt16BE = function (t, e) {
						return e || O(t, 2, this.length), (this[t] << 8) | this[t + 1];
					}),
					(c.prototype.readUInt32LE = function (t, e) {
						return e || O(t, 4, this.length), (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3];
					}),
					(c.prototype.readUInt32BE = function (t, e) {
						return e || O(t, 4, this.length), 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]);
					}),
					(c.prototype.readIntLE = function (t, e, n) {
						(t |= 0), (e |= 0), n || O(t, e, this.length);
						for (var r = this[t], o = 1, s = 0; ++s < e && (o *= 256); ) r += this[t + s] * o;
						return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r;
					}),
					(c.prototype.readIntBE = function (t, e, n) {
						(t |= 0), (e |= 0), n || O(t, e, this.length);
						for (var r = e, o = 1, s = this[t + --r]; r > 0 && (o *= 256); ) s += this[t + --r] * o;
						return s >= (o *= 128) && (s -= Math.pow(2, 8 * e)), s;
					}),
					(c.prototype.readInt8 = function (t, e) {
						return e || O(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
					}),
					(c.prototype.readInt16LE = function (t, e) {
						e || O(t, 2, this.length);
						var n = this[t] | (this[t + 1] << 8);
						return 32768 & n ? 4294901760 | n : n;
					}),
					(c.prototype.readInt16BE = function (t, e) {
						e || O(t, 2, this.length);
						var n = this[t + 1] | (this[t] << 8);
						return 32768 & n ? 4294901760 | n : n;
					}),
					(c.prototype.readInt32LE = function (t, e) {
						return e || O(t, 4, this.length), this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24);
					}),
					(c.prototype.readInt32BE = function (t, e) {
						return e || O(t, 4, this.length), (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3];
					}),
					(c.prototype.readFloatLE = function (t, e) {
						return e || O(t, 4, this.length), o.read(this, t, !0, 23, 4);
					}),
					(c.prototype.readFloatBE = function (t, e) {
						return e || O(t, 4, this.length), o.read(this, t, !1, 23, 4);
					}),
					(c.prototype.readDoubleLE = function (t, e) {
						return e || O(t, 8, this.length), o.read(this, t, !0, 52, 8);
					}),
					(c.prototype.readDoubleBE = function (t, e) {
						return e || O(t, 8, this.length), o.read(this, t, !1, 52, 8);
					}),
					(c.prototype.writeUIntLE = function (t, e, n, r) {
						((t = +t), (e |= 0), (n |= 0), r) || B(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
						var o = 1,
							s = 0;
						for (this[e] = 255 & t; ++s < n && (o *= 256); ) this[e + s] = (t / o) & 255;
						return e + n;
					}),
					(c.prototype.writeUIntBE = function (t, e, n, r) {
						((t = +t), (e |= 0), (n |= 0), r) || B(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
						var o = n - 1,
							s = 1;
						for (this[e + o] = 255 & t; --o >= 0 && (s *= 256); ) this[e + o] = (t / s) & 255;
						return e + n;
					}),
					(c.prototype.writeUInt8 = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), (this[e] = 255 & t), e + 1;
					}),
					(c.prototype.writeUInt16LE = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : L(this, t, e, !0), e + 2;
					}),
					(c.prototype.writeUInt16BE = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : L(this, t, e, !1), e + 2;
					}),
					(c.prototype.writeUInt32LE = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? ((this[e + 3] = t >>> 24), (this[e + 2] = t >>> 16), (this[e + 1] = t >>> 8), (this[e] = 255 & t)) : N(this, t, e, !0), e + 4;
					}),
					(c.prototype.writeUInt32BE = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t)) : N(this, t, e, !1), e + 4;
					}),
					(c.prototype.writeIntLE = function (t, e, n, r) {
						if (((t = +t), (e |= 0), !r)) {
							var o = Math.pow(2, 8 * n - 1);
							B(this, t, e, n, o - 1, -o);
						}
						var s = 0,
							i = 1,
							a = 0;
						for (this[e] = 255 & t; ++s < n && (i *= 256); ) t < 0 && 0 === a && 0 !== this[e + s - 1] && (a = 1), (this[e + s] = (((t / i) >> 0) - a) & 255);
						return e + n;
					}),
					(c.prototype.writeIntBE = function (t, e, n, r) {
						if (((t = +t), (e |= 0), !r)) {
							var o = Math.pow(2, 8 * n - 1);
							B(this, t, e, n, o - 1, -o);
						}
						var s = n - 1,
							i = 1,
							a = 0;
						for (this[e + s] = 255 & t; --s >= 0 && (i *= 256); ) t < 0 && 0 === a && 0 !== this[e + s + 1] && (a = 1), (this[e + s] = (((t / i) >> 0) - a) & 255);
						return e + n;
					}),
					(c.prototype.writeInt8 = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), (this[e] = 255 & t), e + 1;
					}),
					(c.prototype.writeInt16LE = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : L(this, t, e, !0), e + 2;
					}),
					(c.prototype.writeInt16BE = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : L(this, t, e, !1), e + 2;
					}),
					(c.prototype.writeInt32LE = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8), (this[e + 2] = t >>> 16), (this[e + 3] = t >>> 24)) : N(this, t, e, !0), e + 4;
					}),
					(c.prototype.writeInt32BE = function (t, e, n) {
						return (t = +t), (e |= 0), n || B(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t)) : N(this, t, e, !1), e + 4;
					}),
					(c.prototype.writeFloatLE = function (t, e, n) {
						return I(this, t, e, !0, n);
					}),
					(c.prototype.writeFloatBE = function (t, e, n) {
						return I(this, t, e, !1, n);
					}),
					(c.prototype.writeDoubleLE = function (t, e, n) {
						return M(this, t, e, !0, n);
					}),
					(c.prototype.writeDoubleBE = function (t, e, n) {
						return M(this, t, e, !1, n);
					}),
					(c.prototype.copy = function (t, e, n, r) {
						if ((n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n)) return 0;
						if (0 === t.length || 0 === this.length) return 0;
						if (e < 0) throw new RangeError("targetStart out of bounds");
						if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
						if (r < 0) throw new RangeError("sourceEnd out of bounds");
						r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
						var o,
							s = r - n;
						if (this === t && n < e && e < r) for (o = s - 1; o >= 0; --o) t[o + e] = this[o + n];
						else if (s < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (o = 0; o < s; ++o) t[o + e] = this[o + n];
						else Uint8Array.prototype.set.call(t, this.subarray(n, n + s), e);
						return s;
					}),
					(c.prototype.fill = function (t, e, n, r) {
						if ("string" == typeof t) {
							if (("string" == typeof e ? ((r = e), (e = 0), (n = this.length)) : "string" == typeof n && ((r = n), (n = this.length)), 1 === t.length)) {
								var o = t.charCodeAt(0);
								o < 256 && (t = o);
							}
							if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
							if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
						} else "number" == typeof t && (t &= 255);
						if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
						if (n <= e) return this;
						var s;
						if (((e >>>= 0), (n = void 0 === n ? this.length : n >>> 0), t || (t = 0), "number" == typeof t)) for (s = e; s < n; ++s) this[s] = t;
						else {
							var i = c.isBuffer(t) ? t : Y(new c(t, r).toString()),
								a = i.length;
							for (s = 0; s < n - e; ++s) this[s + e] = i[s % a];
						}
						return this;
					});
				var U = /[^+\/0-9A-Za-z-_]/g;
				function D(t) {
					return t < 16 ? "0" + t.toString(16) : t.toString(16);
				}
				function Y(t, e) {
					var n;
					e = e || 1 / 0;
					for (var r = t.length, o = null, s = [], i = 0; i < r; ++i) {
						if ((n = t.charCodeAt(i)) > 55295 && n < 57344) {
							if (!o) {
								if (n > 56319) {
									(e -= 3) > -1 && s.push(239, 191, 189);
									continue;
								}
								if (i + 1 === r) {
									(e -= 3) > -1 && s.push(239, 191, 189);
									continue;
								}
								o = n;
								continue;
							}
							if (n < 56320) {
								(e -= 3) > -1 && s.push(239, 191, 189), (o = n);
								continue;
							}
							n = 65536 + (((o - 55296) << 10) | (n - 56320));
						} else o && (e -= 3) > -1 && s.push(239, 191, 189);
						if (((o = null), n < 128)) {
							if ((e -= 1) < 0) break;
							s.push(n);
						} else if (n < 2048) {
							if ((e -= 2) < 0) break;
							s.push((n >> 6) | 192, (63 & n) | 128);
						} else if (n < 65536) {
							if ((e -= 3) < 0) break;
							s.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
						} else {
							if (!(n < 1114112)) throw new Error("Invalid code point");
							if ((e -= 4) < 0) break;
							s.push((n >> 18) | 240, ((n >> 12) & 63) | 128, ((n >> 6) & 63) | 128, (63 & n) | 128);
						}
					}
					return s;
				}
				function q(t) {
					return r.toByteArray(
						(function (t) {
							if (
								(t = (function (t) {
									return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
								})(t).replace(U, "")).length < 2
							)
								return "";
							for (; t.length % 4 != 0; ) t += "=";
							return t;
						})(t),
					);
				}
				function F(t, e, n, r) {
					for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o];
					return o;
				}
			}).call(this, n(32));
		},
		function (t, e) {
			var n;
			n = (function () {
				return this;
			})();
			try {
				n = n || new Function("return this")();
			} catch (t) {
				"object" == typeof window && (n = window);
			}
			t.exports = n;
		},
		function (t, e, n) {
			"use strict";
			(e.byteLength = function (t) {
				var e = h(t),
					n = e[0],
					r = e[1];
				return (3 * (n + r)) / 4 - r;
			}),
				(e.toByteArray = function (t) {
					var e,
						n,
						r = h(t),
						i = r[0],
						a = r[1],
						c = new s(
							(function (t, e, n) {
								return (3 * (e + n)) / 4 - n;
							})(0, i, a),
						),
						u = 0,
						f = a > 0 ? i - 4 : i;
					for (n = 0; n < f; n += 4) (e = (o[t.charCodeAt(n)] << 18) | (o[t.charCodeAt(n + 1)] << 12) | (o[t.charCodeAt(n + 2)] << 6) | o[t.charCodeAt(n + 3)]), (c[u++] = (e >> 16) & 255), (c[u++] = (e >> 8) & 255), (c[u++] = 255 & e);
					2 === a && ((e = (o[t.charCodeAt(n)] << 2) | (o[t.charCodeAt(n + 1)] >> 4)), (c[u++] = 255 & e));
					1 === a && ((e = (o[t.charCodeAt(n)] << 10) | (o[t.charCodeAt(n + 1)] << 4) | (o[t.charCodeAt(n + 2)] >> 2)), (c[u++] = (e >> 8) & 255), (c[u++] = 255 & e));
					return c;
				}),
				(e.fromByteArray = function (t) {
					for (var e, n = t.length, o = n % 3, s = [], i = 0, a = n - o; i < a; i += 16383) s.push(u(t, i, i + 16383 > a ? a : i + 16383));
					1 === o ? ((e = t[n - 1]), s.push(r[e >> 2] + r[(e << 4) & 63] + "==")) : 2 === o && ((e = (t[n - 2] << 8) + t[n - 1]), s.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + "="));
					return s.join("");
				});
			for (var r = [], o = [], s = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, c = i.length; a < c; ++a) (r[a] = i[a]), (o[i.charCodeAt(a)] = a);
			function h(t) {
				var e = t.length;
				if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
				var n = t.indexOf("=");
				return -1 === n && (n = e), [n, n === e ? 0 : 4 - (n % 4)];
			}
			function u(t, e, n) {
				for (var o, s, i = [], a = e; a < n; a += 3) (o = ((t[a] << 16) & 16711680) + ((t[a + 1] << 8) & 65280) + (255 & t[a + 2])), i.push(r[((s = o) >> 18) & 63] + r[(s >> 12) & 63] + r[(s >> 6) & 63] + r[63 & s]);
				return i.join("");
			}
			(o["-".charCodeAt(0)] = 62), (o["_".charCodeAt(0)] = 63);
		},
		function (t, e) {
			/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
			(e.read = function (t, e, n, r, o) {
				var s,
					i,
					a = 8 * o - r - 1,
					c = (1 << a) - 1,
					h = c >> 1,
					u = -7,
					f = n ? o - 1 : 0,
					p = n ? -1 : 1,
					l = t[e + f];
				for (f += p, s = l & ((1 << -u) - 1), l >>= -u, u += a; u > 0; s = 256 * s + t[e + f], f += p, u -= 8);
				for (i = s & ((1 << -u) - 1), s >>= -u, u += r; u > 0; i = 256 * i + t[e + f], f += p, u -= 8);
				if (0 === s) s = 1 - h;
				else {
					if (s === c) return i ? NaN : (1 / 0) * (l ? -1 : 1);
					(i += Math.pow(2, r)), (s -= h);
				}
				return (l ? -1 : 1) * i * Math.pow(2, s - r);
			}),
				(e.write = function (t, e, n, r, o, s) {
					var i,
						a,
						c,
						h = 8 * s - o - 1,
						u = (1 << h) - 1,
						f = u >> 1,
						p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
						l = r ? 0 : s - 1,
						d = r ? 1 : -1,
						y = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
					for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? ((a = isNaN(e) ? 1 : 0), (i = u)) : ((i = Math.floor(Math.log(e) / Math.LN2)), e * (c = Math.pow(2, -i)) < 1 && (i--, (c *= 2)), (e += i + f >= 1 ? p / c : p * Math.pow(2, 1 - f)) * c >= 2 && (i++, (c /= 2)), i + f >= u ? ((a = 0), (i = u)) : i + f >= 1 ? ((a = (e * c - 1) * Math.pow(2, o)), (i += f)) : ((a = e * Math.pow(2, f - 1) * Math.pow(2, o)), (i = 0))); o >= 8; t[n + l] = 255 & a, l += d, a /= 256, o -= 8);
					for (i = (i << o) | a, h += o; h > 0; t[n + l] = 255 & i, l += d, i /= 256, h -= 8);
					t[n + l - d] |= 128 * y;
				});
		},
		function (t, e) {
			var n = {}.toString;
			t.exports =
				Array.isArray ||
				function (t) {
					return "[object Array]" == n.call(t);
				};
		},
		function (t, e, n) {
			const r = n(37),
				o = n(38),
				s = n(0)("@hyoga/uni-socket"),
				i = uni || wx;
			class a extends r {
				constructor(t, e, n) {
					super(), (this._readyState = a.CONNECTING), (this._socket = null), null !== t && (Array.isArray(e) ? (e = e.join(", ")) : "object" == typeof e && null !== e && ((n = e), (e = void 0)), this.initAsClient(t, e, n));
				}
				initAsClient(t, e, n) {
					Object.assign(n, { url: t, header: { "content-type": "application/json" }, protocols: e, timeout: 25e3 }), (this._socket = this.createConnection(n)), this.addSocketEventListeners();
				}
				createConnection(t) {
					return i.connectSocket({ complete: () => {}, ...t });
				}
				addSocketEventListeners() {
					this._socket.onOpen(() => {
						(this._readyState = a.OPEN), this.onopen();
					}),
						this._socket.onClose((t) => {
							s("onclose: ", t), (this._readyState = a.CLOSED), this.onclose(t.code, t.reason);
						}),
						this._socket.onError((t) => {
							s("onerror: ", t), this.onerror(t);
						}),
						this._socket.onMessage((t) => {
							this.onmessage(t);
						});
				}
				send(t) {
					if ((s("send data: ", t, this._readyState), this._readyState === a.CONNECTING)) throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
					"number" == typeof t && (t = t.toString()), this._readyState === a.OPEN && this._socket.send({ data: t });
				}
				close(t, e) {
					s("close socket: ", t, e), (this._readyState = a.CLOSING), this._socket.close({ code: t, reason: e });
				}
			}
			["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach((t, e) => {
				a[t] = e;
			});
			["open", "error", "close", "message"].forEach((t) => {
				Object.defineProperty(a.prototype, "on" + t, {
					get() {
						const e = this.listeners(t);
						for (var n = 0; n < e.length; n++) if (e[n]._listener) return e[n]._listener;
					},
					set(e) {
						const n = this.listeners(t);
						for (var r = 0; r < n.length; r++) n[r]._listener && this.removeListener(t, n[r]);
						this.addEventListener(t, e);
					},
				});
			}),
				(a.prototype.addEventListener = o.addEventListener),
				(a.prototype.removeEventListener = o.removeEventListener),
				(t.exports = a);
		},
		function (t, e, n) {
			"use strict";
			var r,
				o = "object" == typeof Reflect ? Reflect : null,
				s =
					o && "function" == typeof o.apply
						? o.apply
						: function (t, e, n) {
								return Function.prototype.apply.call(t, e, n);
							};
			r =
				o && "function" == typeof o.ownKeys
					? o.ownKeys
					: Object.getOwnPropertySymbols
						? function (t) {
								return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
							}
						: function (t) {
								return Object.getOwnPropertyNames(t);
							};
			var i =
				Number.isNaN ||
				function (t) {
					return t != t;
				};
			function a() {
				a.init.call(this);
			}
			(t.exports = a),
				(t.exports.once = function (t, e) {
					return new Promise(function (n, r) {
						function o() {
							void 0 !== s && t.removeListener("error", s), n([].slice.call(arguments));
						}
						var s;
						"error" !== e &&
							((s = function (n) {
								t.removeListener(e, o), r(n);
							}),
							t.once("error", s)),
							t.once(e, o);
					});
				}),
				(a.EventEmitter = a),
				(a.prototype._events = void 0),
				(a.prototype._eventsCount = 0),
				(a.prototype._maxListeners = void 0);
			var c = 10;
			function h(t) {
				if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
			}
			function u(t) {
				return void 0 === t._maxListeners ? a.defaultMaxListeners : t._maxListeners;
			}
			function f(t, e, n, r) {
				var o, s, i, a;
				if ((h(n), void 0 === (s = t._events) ? ((s = t._events = Object.create(null)), (t._eventsCount = 0)) : (void 0 !== s.newListener && (t.emit("newListener", e, n.listener ? n.listener : n), (s = t._events)), (i = s[e])), void 0 === i)) (i = s[e] = n), ++t._eventsCount;
				else if (("function" == typeof i ? (i = s[e] = r ? [n, i] : [i, n]) : r ? i.unshift(n) : i.push(n), (o = u(t)) > 0 && i.length > o && !i.warned)) {
					i.warned = !0;
					var c = new Error("Possible EventEmitter memory leak detected. " + i.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
					(c.name = "MaxListenersExceededWarning"), (c.emitter = t), (c.type = e), (c.count = i.length), (a = c), console && console.warn && console.warn(a);
				}
				return t;
			}
			function p() {
				if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), (this.fired = !0), 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
			}
			function l(t, e, n) {
				var r = { fired: !1, wrapFn: void 0, target: t, type: e, listener: n },
					o = p.bind(r);
				return (o.listener = n), (r.wrapFn = o), o;
			}
			function d(t, e, n) {
				var r = t._events;
				if (void 0 === r) return [];
				var o = r[e];
				return void 0 === o
					? []
					: "function" == typeof o
						? n
							? [o.listener || o]
							: [o]
						: n
							? (function (t) {
									for (var e = new Array(t.length), n = 0; n < e.length; ++n) e[n] = t[n].listener || t[n];
									return e;
								})(o)
							: g(o, o.length);
			}
			function y(t) {
				var e = this._events;
				if (void 0 !== e) {
					var n = e[t];
					if ("function" == typeof n) return 1;
					if (void 0 !== n) return n.length;
				}
				return 0;
			}
			function g(t, e) {
				for (var n = new Array(e), r = 0; r < e; ++r) n[r] = t[r];
				return n;
			}
			Object.defineProperty(a, "defaultMaxListeners", {
				enumerable: !0,
				get: function () {
					return c;
				},
				set: function (t) {
					if ("number" != typeof t || t < 0 || i(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
					c = t;
				},
			}),
				(a.init = function () {
					(void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) || ((this._events = Object.create(null)), (this._eventsCount = 0)), (this._maxListeners = this._maxListeners || void 0);
				}),
				(a.prototype.setMaxListeners = function (t) {
					if ("number" != typeof t || t < 0 || i(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
					return (this._maxListeners = t), this;
				}),
				(a.prototype.getMaxListeners = function () {
					return u(this);
				}),
				(a.prototype.emit = function (t) {
					for (var e = [], n = 1; n < arguments.length; n++) e.push(arguments[n]);
					var r = "error" === t,
						o = this._events;
					if (void 0 !== o) r = r && void 0 === o.error;
					else if (!r) return !1;
					if (r) {
						var i;
						if ((e.length > 0 && (i = e[0]), i instanceof Error)) throw i;
						var a = new Error("Unhandled error." + (i ? " (" + i.message + ")" : ""));
						throw ((a.context = i), a);
					}
					var c = o[t];
					if (void 0 === c) return !1;
					if ("function" == typeof c) s(c, this, e);
					else {
						var h = c.length,
							u = g(c, h);
						for (n = 0; n < h; ++n) s(u[n], this, e);
					}
					return !0;
				}),
				(a.prototype.addListener = function (t, e) {
					return f(this, t, e, !1);
				}),
				(a.prototype.on = a.prototype.addListener),
				(a.prototype.prependListener = function (t, e) {
					return f(this, t, e, !0);
				}),
				(a.prototype.once = function (t, e) {
					return h(e), this.on(t, l(this, t, e)), this;
				}),
				(a.prototype.prependOnceListener = function (t, e) {
					return h(e), this.prependListener(t, l(this, t, e)), this;
				}),
				(a.prototype.removeListener = function (t, e) {
					var n, r, o, s, i;
					if ((h(e), void 0 === (r = this._events))) return this;
					if (void 0 === (n = r[t])) return this;
					if (n === e || n.listener === e) 0 == --this._eventsCount ? (this._events = Object.create(null)) : (delete r[t], r.removeListener && this.emit("removeListener", t, n.listener || e));
					else if ("function" != typeof n) {
						for (o = -1, s = n.length - 1; s >= 0; s--)
							if (n[s] === e || n[s].listener === e) {
								(i = n[s].listener), (o = s);
								break;
							}
						if (o < 0) return this;
						0 === o
							? n.shift()
							: (function (t, e) {
									for (; e + 1 < t.length; e++) t[e] = t[e + 1];
									t.pop();
								})(n, o),
							1 === n.length && (r[t] = n[0]),
							void 0 !== r.removeListener && this.emit("removeListener", t, i || e);
					}
					return this;
				}),
				(a.prototype.off = a.prototype.removeListener),
				(a.prototype.removeAllListeners = function (t) {
					var e, n, r;
					if (void 0 === (n = this._events)) return this;
					if (void 0 === n.removeListener) return 0 === arguments.length ? ((this._events = Object.create(null)), (this._eventsCount = 0)) : void 0 !== n[t] && (0 == --this._eventsCount ? (this._events = Object.create(null)) : delete n[t]), this;
					if (0 === arguments.length) {
						var o,
							s = Object.keys(n);
						for (r = 0; r < s.length; ++r) "removeListener" !== (o = s[r]) && this.removeAllListeners(o);
						return this.removeAllListeners("removeListener"), (this._events = Object.create(null)), (this._eventsCount = 0), this;
					}
					if ("function" == typeof (e = n[t])) this.removeListener(t, e);
					else if (void 0 !== e) for (r = e.length - 1; r >= 0; r--) this.removeListener(t, e[r]);
					return this;
				}),
				(a.prototype.listeners = function (t) {
					return d(this, t, !0);
				}),
				(a.prototype.rawListeners = function (t) {
					return d(this, t, !1);
				}),
				(a.listenerCount = function (t, e) {
					return "function" == typeof t.listenerCount ? t.listenerCount(e) : y.call(t, e);
				}),
				(a.prototype.listenerCount = y),
				(a.prototype.eventNames = function () {
					return this._eventsCount > 0 ? r(this._events) : [];
				});
		},
		function (t, e, n) {
			"use strict";
			class r {
				constructor(t, e) {
					(this.target = e), (this.type = t);
				}
			}
			class o extends r {
				constructor(t, e) {
					super("message", e), (this.data = t);
				}
			}
			class s extends r {
				constructor(t, e, n) {
					super("close", n), (this.wasClean = n._closeFrameReceived && n._closeFrameSent), (this.reason = e), (this.code = t);
				}
			}
			class i extends r {
				constructor(t) {
					super("open", t);
				}
			}
			class a extends r {
				constructor(t, e) {
					super("error", e), (this.message = t.message), (this.error = t);
				}
			}
			const c = {
				addEventListener(t, e) {
					function n(t) {
						e.call(this, new o(t, this));
					}
					function r(t, n) {
						e.call(this, new s(t, n, this));
					}
					function c(t) {
						e.call(this, new a(t, this));
					}
					function h() {
						e.call(this, new i(this));
					}
					"function" == typeof e && ("message" === t ? ((n._listener = e), this.on(t, n)) : "close" === t ? ((r._listener = e), this.on(t, r)) : "error" === t ? ((c._listener = e), this.on(t, c)) : "open" === t ? ((h._listener = e), this.on(t, h)) : this.on(t, e));
				},
				removeEventListener(t, e) {
					const n = this.listeners(t);
					for (var r = 0; r < n.length; r++) (n[r] !== e && n[r]._listener !== e) || this.removeListener(t, n[r]);
				},
			};
			t.exports = c;
		},
		function (t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", { value: !0 }), (e.reconstructPacket = e.deconstructPacket = void 0);
			const r = n(16);
			(e.deconstructPacket = function (t) {
				const e = [],
					n = t.data,
					o = t;
				return (
					(o.data = (function t(e, n) {
						if (!e) return e;
						if (r.isBinary(e)) {
							const t = { _placeholder: !0, num: n.length };
							return n.push(e), t;
						}
						if (Array.isArray(e)) {
							const r = new Array(e.length);
							for (let o = 0; o < e.length; o++) r[o] = t(e[o], n);
							return r;
						}
						if ("object" == typeof e && !(e instanceof Date)) {
							const r = {};
							for (const o in e) e.hasOwnProperty(o) && (r[o] = t(e[o], n));
							return r;
						}
						return e;
					})(n, e)),
					(o.attachments = e.length),
					{ packet: o, buffers: e }
				);
			}),
				(e.reconstructPacket = function (t, e) {
					return (
						(t.data = (function t(e, n) {
							if (!e) return e;
							if (e && e._placeholder) return n[e.num];
							if (Array.isArray(e)) for (let r = 0; r < e.length; r++) e[r] = t(e[r], n);
							else if ("object" == typeof e) for (const r in e) e.hasOwnProperty(r) && (e[r] = t(e[r], n));
							return e;
						})(t.data, e)),
						(t.attachments = void 0),
						t
					);
				});
		},
		function (t, e) {
			function n(t) {
				(t = t || {}), (this.ms = t.min || 100), (this.max = t.max || 1e4), (this.factor = t.factor || 2), (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0), (this.attempts = 0);
			}
			(t.exports = n),
				(n.prototype.duration = function () {
					var t = this.ms * Math.pow(this.factor, this.attempts++);
					if (this.jitter) {
						var e = Math.random(),
							n = Math.floor(e * this.jitter * t);
						t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
					}
					return 0 | Math.min(t, this.max);
				}),
				(n.prototype.reset = function () {
					this.attempts = 0;
				}),
				(n.prototype.setMin = function (t) {
					this.ms = t;
				}),
				(n.prototype.setMax = function (t) {
					this.max = t;
				}),
				(n.prototype.setJitter = function (t) {
					this.jitter = t;
				});
		},
	]);
});
