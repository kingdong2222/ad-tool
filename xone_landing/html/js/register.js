const uploadCV = document.getElementById('uploadCV')

uploadCV.onchange = value => {
  let name = uploadCV.files[0].name
  let temp =  document.createElement('p')
  let form = document.getElementsByClassName('upload-form')[0]
  let sub = form.getElementsByClassName('sub')[0]
  sub.style.display = 'none'
  temp.classList.add('file-name')
  temp.innerText = name
  let target = document.querySelector('#uploadCV');
  target.parentNode.insertBefore(temp, target);
}

const uploadTestVoice = document.getElementById('uploadTestVoice')

uploadTestVoice.onchange = value => {
  let name = uploadTestVoice.files[0].name
  let temp =  document.createElement('p')
  let form = document.getElementsByClassName('upload-form')[1]
  let sub = form.getElementsByClassName('sub')[0]
  sub.style.display = 'none'
  temp.classList.add('file-name')
  temp.innerText = name
  let target = document.querySelector('#uploadTestVoice');
  target.parentNode.insertBefore(temp, target);
}

window.onscroll = function () {
  if (screen.width >= 1024) {
    if ($(window).scrollTop() >= 10) {
      $("header").addClass("fixed-header");
    } else {
      $("header").removeClass("fixed-header");
    }
  }
}

// Util 4.1.3
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e(require("jquery")))
      : "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : (t.Util = e(t.jQuery));
  })(this, function (t) {
    "use strict";
    return (function (r) {
      var e = "transitionend";
      function t(t) {
        var e = this,
          n = !1;
        return (
          r(this).one(s.TRANSITION_END, function () {
            n = !0;
          }),
          setTimeout(function () {
            n || s.triggerTransitionEnd(e);
          }, t),
          this
        );
      }
      var s = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
          for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
          return t;
        },
        getSelectorFromElement: function (t) {
          var e = t.getAttribute("data-target");
          (e && "#" !== e) || (e = t.getAttribute("href") || "");
          try {
            return document.querySelector(e) ? e : null;
          } catch (t) {
            return null;
          }
        },
        getTransitionDurationFromElement: function (t) {
          if (!t) return 0;
          var e = r(t).css("transition-duration");
          return parseFloat(e) ? ((e = e.split(",")[0]), 1e3 * parseFloat(e)) : 0;
        },
        reflow: function (t) {
          return t.offsetHeight;
        },
        triggerTransitionEnd: function (t) {
          r(t).trigger(e);
        },
        supportsTransitionEnd: function () {
          return Boolean(e);
        },
        isElement: function (t) {
          return (t[0] || t).nodeType;
        },
        typeCheckConfig: function (t, e, n) {
          for (var r in n)
            if (Object.prototype.hasOwnProperty.call(n, r)) {
              var i = n[r],
                o = e[r],
                u =
                  o && s.isElement(o)
                    ? "element"
                    : ((a = o),
                      {}.toString
                        .call(a)
                        .match(/\s([a-z]+)/i)[1]
                        .toLowerCase());
              if (!new RegExp(i).test(u))
                throw new Error(
                  t.toUpperCase() +
                    ': Option "' +
                    r +
                    '" provided type "' +
                    u +
                    '" but expected type "' +
                    i +
                    '".'
                );
            }
          var a;
        },
      };
      return (
        (r.fn.emulateTransitionEnd = t),
        (r.event.special[s.TRANSITION_END] = {
          bindType: e,
          delegateType: e,
          handle: function (t) {
            if (r(t.target).is(this))
              return t.handleObj.handler.apply(this, arguments);
          },
        }),
        s
      );
    })((t = t && t.hasOwnProperty("default") ? t.default : t));
  });

  // Modal 4.1.3
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t(require("jquery"), require("./util.js")))
      : "function" == typeof define && define.amd
      ? define(["jquery", "./util.js"], t)
      : (e.Modal = t(e.jQuery, e.Util));
  })(this, function (e, r) {
    "use strict";
    function s(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    function a(o) {
      for (var e = 1; e < arguments.length; e++) {
        var s = null != arguments[e] ? arguments[e] : {},
          t = Object.keys(s);
        "function" == typeof Object.getOwnPropertySymbols &&
          (t = t.concat(
            Object.getOwnPropertySymbols(s).filter(function (e) {
              return Object.getOwnPropertyDescriptor(s, e).enumerable;
            })
          )),
          t.forEach(function (e) {
            var t, i, n;
            (t = o),
              (n = s[(i = e)]),
              i in t
                ? Object.defineProperty(t, i, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[i] = n);
          });
      }
      return o;
    }
    var l, d, h, c, t, u, _, f, m, g, p, S, b, v, i, y, w, E, I;
    return (
      (e = e && e.hasOwnProperty("default") ? e.default : e),
      (r = r && r.hasOwnProperty("default") ? r.default : r),
      (d = "modal"),
      (c = "." + (h = "bs.modal")),
      (t = (l = e).fn[d]),
      (u = { backdrop: !0, keyboard: !0, focus: !0, show: !0 }),
      (_ = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean",
      }),
      (f = {
        HIDE: "hide" + c,
        HIDDEN: "hidden" + c,
        SHOW: "show" + c,
        SHOWN: "shown" + c,
        FOCUSIN: "focusin" + c,
        RESIZE: "resize" + c,
        CLICK_DISMISS: "click.dismiss" + c,
        KEYDOWN_DISMISS: "keydown.dismiss" + c,
        MOUSEUP_DISMISS: "mouseup.dismiss" + c,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + c,
        CLICK_DATA_API: "click" + c + ".data-api",
      }),
      (m = "modal-scrollbar-measure"),
      (g = "modal-backdrop"),
      (p = "modal-open"),
      (S = "fade"),
      (b = "show"),
      (v = ".modal-dialog"),
      (i = '[data-toggle="modal"]'),
      (y = '[data-dismiss="modal"]'),
      (w = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"),
      (E = ".sticky-top"),
      (I = (function () {
        function o(e, t) {
          (this._config = this._getConfig(t)),
            (this._element = e),
            (this._dialog = e.querySelector(v)),
            (this._backdrop = null),
            (this._isShown = !1),
            (this._isBodyOverflowing = !1),
            (this._ignoreBackdropClick = !1),
            (this._scrollbarWidth = 0);
        }
        var e,
          t,
          i,
          n = o.prototype;
        return (
          (n.toggle = function (e) {
            return this._isShown ? this.hide() : this.show(e);
          }),
          (n.show = function (e) {
            var t = this;
            if (!this._isTransitioning && !this._isShown) {
              l(this._element).hasClass(S) && (this._isTransitioning = !0);
              var i = l.Event(f.SHOW, { relatedTarget: e });
              l(this._element).trigger(i),
                this._isShown ||
                  i.isDefaultPrevented() ||
                  ((this._isShown = !0),
                  this._checkScrollbar(),
                  this._setScrollbar(),
                  this._adjustDialog(),
                  l(document.body).addClass(p),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  l(this._element).on(f.CLICK_DISMISS, y, function (e) {
                    return t.hide(e);
                  }),
                  l(this._dialog).on(f.MOUSEDOWN_DISMISS, function () {
                    l(t._element).one(f.MOUSEUP_DISMISS, function (e) {
                      l(e.target).is(t._element) && (t._ignoreBackdropClick = !0);
                    });
                  }),
                  this._showBackdrop(function () {
                    return t._showElement(e);
                  }));
            }
          }),
          (n.hide = function (e) {
            var t = this;
            if (
              (e && e.preventDefault(), !this._isTransitioning && this._isShown)
            ) {
              var i = l.Event(f.HIDE);
              if (
                (l(this._element).trigger(i),
                this._isShown && !i.isDefaultPrevented())
              ) {
                this._isShown = !1;
                var n = l(this._element).hasClass(S);
                if (
                  (n && (this._isTransitioning = !0),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  l(document).off(f.FOCUSIN),
                  l(this._element).removeClass(b),
                  l(this._element).off(f.CLICK_DISMISS),
                  l(this._dialog).off(f.MOUSEDOWN_DISMISS),
                  n)
                ) {
                  var o = r.getTransitionDurationFromElement(this._element);
                  l(this._element)
                    .one(r.TRANSITION_END, function (e) {
                      return t._hideModal(e);
                    })
                    .emulateTransitionEnd(o);
                } else this._hideModal();
              }
            }
          }),
          (n.dispose = function () {
            l.removeData(this._element, h),
              l(window, document, this._element, this._backdrop).off(c),
              (this._config = null),
              (this._element = null),
              (this._dialog = null),
              (this._backdrop = null),
              (this._isShown = null),
              (this._isBodyOverflowing = null),
              (this._ignoreBackdropClick = null),
              (this._scrollbarWidth = null);
          }),
          (n.handleUpdate = function () {
            this._adjustDialog();
          }),
          (n._getConfig = function (e) {
            return (e = a({}, u, e)), r.typeCheckConfig(d, e, _), e;
          }),
          (n._showElement = function (e) {
            var t = this,
              i = l(this._element).hasClass(S);
            (this._element.parentNode &&
              this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
              document.body.appendChild(this._element),
              (this._element.style.display = "block"),
              this._element.removeAttribute("aria-hidden"),
              (this._element.scrollTop = 0),
              i && r.reflow(this._element),
              l(this._element).addClass(b),
              this._config.focus && this._enforceFocus();
            var n = l.Event(f.SHOWN, { relatedTarget: e }),
              o = function () {
                t._config.focus && t._element.focus(),
                  (t._isTransitioning = !1),
                  l(t._element).trigger(n);
              };
            if (i) {
              var s = r.getTransitionDurationFromElement(this._element);
              l(this._dialog).one(r.TRANSITION_END, o).emulateTransitionEnd(s);
            } else o();
          }),
          (n._enforceFocus = function () {
            var t = this;
            l(document)
              .off(f.FOCUSIN)
              .on(f.FOCUSIN, function (e) {
                document !== e.target &&
                  t._element !== e.target &&
                  0 === l(t._element).has(e.target).length &&
                  t._element.focus();
              });
          }),
          (n._setEscapeEvent = function () {
            var t = this;
            this._isShown && this._config.keyboard
              ? l(this._element).on(f.KEYDOWN_DISMISS, function (e) {
                  27 === e.which && (e.preventDefault(), t.hide());
                })
              : this._isShown || l(this._element).off(f.KEYDOWN_DISMISS);
          }),
          (n._setResizeEvent = function () {
            var t = this;
            this._isShown
              ? l(window).on(f.RESIZE, function (e) {
                  return t.handleUpdate(e);
                })
              : l(window).off(f.RESIZE);
          }),
          (n._hideModal = function () {
            var e = this;
            (this._element.style.display = "none"),
              this._element.setAttribute("aria-hidden", !0),
              (this._isTransitioning = !1),
              this._showBackdrop(function () {
                l(document.body).removeClass(p),
                  e._resetAdjustments(),
                  e._resetScrollbar(),
                  l(e._element).trigger(f.HIDDEN);
              });
          }),
          (n._removeBackdrop = function () {
            this._backdrop &&
              (l(this._backdrop).remove(), (this._backdrop = null));
          }),
          (n._showBackdrop = function (e) {
            var t = this,
              i = l(this._element).hasClass(S) ? S : "";
            if (this._isShown && this._config.backdrop) {
              if (
                ((this._backdrop = document.createElement("div")),
                (this._backdrop.className = g),
                i && this._backdrop.classList.add(i),
                l(this._backdrop).appendTo(document.body),
                l(this._element).on(f.CLICK_DISMISS, function (e) {
                  t._ignoreBackdropClick
                    ? (t._ignoreBackdropClick = !1)
                    : e.target === e.currentTarget &&
                      ("static" === t._config.backdrop
                        ? t._element.focus()
                        : t.hide());
                }),
                i && r.reflow(this._backdrop),
                l(this._backdrop).addClass(b),
                !e)
              )
                return;
              if (!i) return void e();
              var n = r.getTransitionDurationFromElement(this._backdrop);
              l(this._backdrop).one(r.TRANSITION_END, e).emulateTransitionEnd(n);
            } else if (!this._isShown && this._backdrop) {
              l(this._backdrop).removeClass(b);
              var o = function () {
                t._removeBackdrop(), e && e();
              };
              if (l(this._element).hasClass(S)) {
                var s = r.getTransitionDurationFromElement(this._backdrop);
                l(this._backdrop)
                  .one(r.TRANSITION_END, o)
                  .emulateTransitionEnd(s);
              } else o();
            } else e && e();
          }),
          (n._adjustDialog = function () {
            var e =
              this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing &&
              e &&
              (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
              this._isBodyOverflowing &&
                !e &&
                (this._element.style.paddingRight = this._scrollbarWidth + "px");
          }),
          (n._resetAdjustments = function () {
            (this._element.style.paddingLeft = ""),
              (this._element.style.paddingRight = "");
          }),
          (n._checkScrollbar = function () {
            var e = document.body.getBoundingClientRect();
            (this._isBodyOverflowing = e.left + e.right < window.innerWidth),
              (this._scrollbarWidth = this._getScrollbarWidth());
          }),
          (n._setScrollbar = function () {
            var o = this;
            if (this._isBodyOverflowing) {
              var e = [].slice.call(document.querySelectorAll(w)),
                t = [].slice.call(document.querySelectorAll(E));
              l(e).each(function (e, t) {
                var i = t.style.paddingRight,
                  n = l(t).css("padding-right");
                l(t)
                  .data("padding-right", i)
                  .css("padding-right", parseFloat(n) + o._scrollbarWidth + "px");
              }),
                l(t).each(function (e, t) {
                  var i = t.style.marginRight,
                    n = l(t).css("margin-right");
                  l(t)
                    .data("margin-right", i)
                    .css(
                      "margin-right",
                      parseFloat(n) - o._scrollbarWidth + "px"
                    );
                });
              var i = document.body.style.paddingRight,
                n = l(document.body).css("padding-right");
              l(document.body)
                .data("padding-right", i)
                .css(
                  "padding-right",
                  parseFloat(n) + this._scrollbarWidth + "px"
                );
            }
          }),
          (n._resetScrollbar = function () {
            var e = [].slice.call(document.querySelectorAll(w));
            l(e).each(function (e, t) {
              var i = l(t).data("padding-right");
              l(t).removeData("padding-right"), (t.style.paddingRight = i || "");
            });
            var t = [].slice.call(document.querySelectorAll("" + E));
            l(t).each(function (e, t) {
              var i = l(t).data("margin-right");
              void 0 !== i &&
                l(t).css("margin-right", i).removeData("margin-right");
            });
            var i = l(document.body).data("padding-right");
            l(document.body).removeData("padding-right"),
              (document.body.style.paddingRight = i || "");
          }),
          (n._getScrollbarWidth = function () {
            var e = document.createElement("div");
            (e.className = m), document.body.appendChild(e);
            var t = e.getBoundingClientRect().width - e.clientWidth;
            return document.body.removeChild(e), t;
          }),
          (o._jQueryInterface = function (i, n) {
            return this.each(function () {
              var e = l(this).data(h),
                t = a({}, u, l(this).data(), "object" == typeof i && i ? i : {});
              if (
                (e || ((e = new o(this, t)), l(this).data(h, e)),
                "string" == typeof i)
              ) {
                if (void 0 === e[i])
                  throw new TypeError('No method named "' + i + '"');
                e[i](n);
              } else t.show && e.show(n);
            });
          }),
          (e = o),
          (i = [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
            {
              key: "Default",
              get: function () {
                return u;
              },
            },
          ]),
          (t = null) && s(e.prototype, t),
          i && s(e, i),
          o
        );
      })()),
      l(document).on(f.CLICK_DATA_API, i, function (e) {
        var t,
          i = this,
          n = r.getSelectorFromElement(this);
        n && (t = document.querySelector(n));
        var o = l(t).data(h) ? "toggle" : a({}, l(t).data(), l(this).data());
        ("A" !== this.tagName && "AREA" !== this.tagName) || e.preventDefault();
        var s = l(t).one(f.SHOW, function (e) {
          e.isDefaultPrevented() ||
            s.one(f.HIDDEN, function () {
              l(i).is(":visible") && i.focus();
            });
        });
        I._jQueryInterface.call(l(t), o, this);
      }),
      (l.fn[d] = I._jQueryInterface),
      (l.fn[d].Constructor = I),
      (l.fn[d].noConflict = function () {
        return (l.fn[d] = t), I._jQueryInterface;
      }),
      I
    );
  });
  
  // Modal Center
  !(function (i) {
    "use strict";
    function o() {
      i(this).css("display", "block");
      var o = i(this).find(".modal-dialog"),
        s = (i(window).height() - o.height()) / 2,
        n = parseInt(o.css("marginBottom"), 10);
      s < n && (s = n), o.css("margin-top", s);
    }
    i(document).on("show.bs.modal", ".modal", o),
      i(window).on("resize", function () {
        i(".modal:visible").each(o);
      });
  })(jQuery);
  
  // Menu
  $(function ($) {
    // browser window scroll (in pixels) after which the "menu" link is shown
    var offset = 300;
    var navigationContainer = $("#cd-nav"),
      mainNavigation = navigationContainer.find("#cd-main-nav ul");
  
    //hide or show the "menu" link
    checkMenu();
    $(window).scroll(function () {
      checkMenu();
    });
  
    //open or close the menu clicking on the bottom "menu" link
    $(".cd-nav-trigger").on("click", function () {
      $(this).toggleClass("menu-is-open");
      //we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
      mainNavigation
        .off(
          "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
        )
        .toggleClass("is-visible");
    });
  
    function checkMenu() {
      if (
        $(window).scrollTop() > offset &&
        !navigationContainer.hasClass("is-fixed")
      ) {
        navigationContainer
          .addClass("is-fixed")
          .find(".cd-nav-trigger")
          .one(
            "webkitAnimationEnd oanimationend msAnimationEnd animationend",
            function () {
              mainNavigation.addClass("has-transitions");
            }
          );
      } else if ($(window).scrollTop() <= offset) {
        //check if the menu is open when scrolling up
        if (
          mainNavigation.hasClass("is-visible") &&
          !$("html").hasClass("no-csstransitions")
        ) {
          //close the menu with animation
          mainNavigation
            .addClass("is-hidden")
            .one(
              "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function () {
                //wait for the menu to be closed and do the rest
                mainNavigation.removeClass(
                  "is-visible is-hidden has-transitions"
                );
                navigationContainer.removeClass("is-fixed");
                $(".cd-nav-trigger").removeClass("menu-is-open");
              }
            );
          //check if the menu is open when scrolling up - fallback if transitions are not supported
        } else if (
          mainNavigation.hasClass("is-visible") &&
          $("html").hasClass("no-csstransitions")
        ) {
          mainNavigation.removeClass("is-visible has-transitions");
          navigationContainer.removeClass("is-fixed");
          $(".cd-nav-trigger").removeClass("menu-is-open");
          //scrolling up with menu closed
        } else {
          navigationContainer.removeClass("is-fixed");
          mainNavigation.removeClass("has-transitions");
        }
      }
    }
  });

// Popover
/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */ (function (
    e,
    t
  ) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : (e.Popper = t());
  })(this, function () {
    "use strict";
    function e(e) {
      return e && "[object Function]" === {}.toString.call(e);
    }
    function t(e, t) {
      if (1 !== e.nodeType) return [];
      var o = getComputedStyle(e, null);
      return t ? o[t] : o;
    }
    function o(e) {
      return "HTML" === e.nodeName ? e : e.parentNode || e.host;
    }
    function n(e) {
      if (!e) return document.body;
      switch (e.nodeName) {
        case "HTML":
        case "BODY":
          return e.ownerDocument.body;
        case "#document":
          return e.body;
      }
      var i = t(e),
        r = i.overflow,
        p = i.overflowX,
        s = i.overflowY;
      return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
    }
    function r(e) {
      var o = e && e.offsetParent,
        i = o && o.nodeName;
      return i && "BODY" !== i && "HTML" !== i
        ? -1 !== ["TD", "TABLE"].indexOf(o.nodeName) &&
          "static" === t(o, "position")
          ? r(o)
          : o
        : e
        ? e.ownerDocument.documentElement
        : document.documentElement;
    }
    function p(e) {
      var t = e.nodeName;
      return "BODY" !== t && ("HTML" === t || r(e.firstElementChild) === e);
    }
    function s(e) {
      return null === e.parentNode ? e : s(e.parentNode);
    }
    function d(e, t) {
      if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
      var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = o ? e : t,
        n = o ? t : e,
        a = document.createRange();
      a.setStart(i, 0), a.setEnd(n, 0);
      var l = a.commonAncestorContainer;
      if ((e !== l && t !== l) || i.contains(n)) return p(l) ? l : r(l);
      var f = s(e);
      return f.host ? d(f.host, t) : d(e, s(t).host);
    }
    function a(e) {
      var t =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
        o = "top" === t ? "scrollTop" : "scrollLeft",
        i = e.nodeName;
      if ("BODY" === i || "HTML" === i) {
        var n = e.ownerDocument.documentElement,
          r = e.ownerDocument.scrollingElement || n;
        return r[o];
      }
      return e[o];
    }
    function l(e, t) {
      var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        i = a(t, "top"),
        n = a(t, "left"),
        r = o ? -1 : 1;
      return (
        (e.top += i * r),
        (e.bottom += i * r),
        (e.left += n * r),
        (e.right += n * r),
        e
      );
    }
    function f(e, t) {
      var o = "x" === t ? "Left" : "Top",
        i = "Left" == o ? "Right" : "Bottom";
      return (
        parseFloat(e["border" + o + "Width"], 10) +
        parseFloat(e["border" + i + "Width"], 10)
      );
    }
    function m(e, t, o, i) {
      return J(
        t["offset" + e],
        t["scroll" + e],
        o["client" + e],
        o["offset" + e],
        o["scroll" + e],
        ie()
          ? o["offset" + e] +
              i["margin" + ("Height" === e ? "Top" : "Left")] +
              i["margin" + ("Height" === e ? "Bottom" : "Right")]
          : 0
      );
    }
    function h() {
      var e = document.body,
        t = document.documentElement,
        o = ie() && getComputedStyle(t);
      return { height: m("Height", e, t, o), width: m("Width", e, t, o) };
    }
    function c(e) {
      return se({}, e, { right: e.left + e.width, bottom: e.top + e.height });
    }
    function g(e) {
      var o = {};
      if (ie())
        try {
          o = e.getBoundingClientRect();
          var i = a(e, "top"),
            n = a(e, "left");
          (o.top += i), (o.left += n), (o.bottom += i), (o.right += n);
        } catch (e) {}
      else o = e.getBoundingClientRect();
      var r = {
          left: o.left,
          top: o.top,
          width: o.right - o.left,
          height: o.bottom - o.top,
        },
        p = "HTML" === e.nodeName ? h() : {},
        s = p.width || e.clientWidth || r.right - r.left,
        d = p.height || e.clientHeight || r.bottom - r.top,
        l = e.offsetWidth - s,
        m = e.offsetHeight - d;
      if (l || m) {
        var g = t(e);
        (l -= f(g, "x")), (m -= f(g, "y")), (r.width -= l), (r.height -= m);
      }
      return c(r);
    }
    function u(e, o) {
      var i = ie(),
        r = "HTML" === o.nodeName,
        p = g(e),
        s = g(o),
        d = n(e),
        a = t(o),
        f = parseFloat(a.borderTopWidth, 10),
        m = parseFloat(a.borderLeftWidth, 10),
        h = c({
          top: p.top - s.top - f,
          left: p.left - s.left - m,
          width: p.width,
          height: p.height,
        });
      if (((h.marginTop = 0), (h.marginLeft = 0), !i && r)) {
        var u = parseFloat(a.marginTop, 10),
          b = parseFloat(a.marginLeft, 10);
        (h.top -= f - u),
          (h.bottom -= f - u),
          (h.left -= m - b),
          (h.right -= m - b),
          (h.marginTop = u),
          (h.marginLeft = b);
      }
      return (
        (i ? o.contains(d) : o === d && "BODY" !== d.nodeName) && (h = l(h, o)), h
      );
    }
    function b(e) {
      var t = e.ownerDocument.documentElement,
        o = u(e, t),
        i = J(t.clientWidth, window.innerWidth || 0),
        n = J(t.clientHeight, window.innerHeight || 0),
        r = a(t),
        p = a(t, "left"),
        s = {
          top: r - o.top + o.marginTop,
          left: p - o.left + o.marginLeft,
          width: i,
          height: n,
        };
      return c(s);
    }
    function w(e) {
      var i = e.nodeName;
      return "BODY" === i || "HTML" === i
        ? !1
        : "fixed" === t(e, "position") || w(o(e));
    }
    function y(e, t, i, r) {
      var p = { top: 0, left: 0 },
        s = d(e, t);
      if ("viewport" === r) p = b(s);
      else {
        var a;
        "scrollParent" === r
          ? ((a = n(o(t))),
            "BODY" === a.nodeName && (a = e.ownerDocument.documentElement))
          : "window" === r
          ? (a = e.ownerDocument.documentElement)
          : (a = r);
        var l = u(a, s);
        if ("HTML" === a.nodeName && !w(s)) {
          var f = h(),
            m = f.height,
            c = f.width;
          (p.top += l.top - l.marginTop),
            (p.bottom = m + l.top),
            (p.left += l.left - l.marginLeft),
            (p.right = c + l.left);
        } else p = l;
      }
      return (p.left += i), (p.top += i), (p.right -= i), (p.bottom -= i), p;
    }
    function E(e) {
      var t = e.width,
        o = e.height;
      return t * o;
    }
    function v(e, t, o, i, n) {
      var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
      if (-1 === e.indexOf("auto")) return e;
      var p = y(o, i, r, n),
        s = {
          top: { width: p.width, height: t.top - p.top },
          right: { width: p.right - t.right, height: p.height },
          bottom: { width: p.width, height: p.bottom - t.bottom },
          left: { width: t.left - p.left, height: p.height },
        },
        d = Object.keys(s)
          .map(function (e) {
            return se({ key: e }, s[e], { area: E(s[e]) });
          })
          .sort(function (e, t) {
            return t.area - e.area;
          }),
        a = d.filter(function (e) {
          var t = e.width,
            i = e.height;
          return t >= o.clientWidth && i >= o.clientHeight;
        }),
        l = 0 < a.length ? a[0].key : d[0].key,
        f = e.split("-")[1];
      return l + (f ? "-" + f : "");
    }
    function O(e, t, o) {
      var i = d(t, o);
      return u(o, i);
    }
    function L(e) {
      var t = getComputedStyle(e),
        o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
        i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
        n = { width: e.offsetWidth + i, height: e.offsetHeight + o };
      return n;
    }
    function x(e) {
      var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
      return e.replace(/left|right|bottom|top/g, function (e) {
        return t[e];
      });
    }
    function S(e, t, o) {
      o = o.split("-")[0];
      var i = L(e),
        n = { width: i.width, height: i.height },
        r = -1 !== ["right", "left"].indexOf(o),
        p = r ? "top" : "left",
        s = r ? "left" : "top",
        d = r ? "height" : "width",
        a = r ? "width" : "height";
      return (
        (n[p] = t[p] + t[d] / 2 - i[d] / 2),
        (n[s] = o === s ? t[s] - i[a] : t[x(s)]),
        n
      );
    }
    function T(e, t) {
      return Array.prototype.find ? e.find(t) : e.filter(t)[0];
    }
    function D(e, t, o) {
      if (Array.prototype.findIndex)
        return e.findIndex(function (e) {
          return e[t] === o;
        });
      var i = T(e, function (e) {
        return e[t] === o;
      });
      return e.indexOf(i);
    }
    function C(t, o, i) {
      var n = void 0 === i ? t : t.slice(0, D(t, "name", i));
      return (
        n.forEach(function (t) {
          t["function"] &&
            console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
          var i = t["function"] || t.fn;
          t.enabled &&
            e(i) &&
            ((o.offsets.popper = c(o.offsets.popper)),
            (o.offsets.reference = c(o.offsets.reference)),
            (o = i(o, t)));
        }),
        o
      );
    }
    function N() {
      if (!this.state.isDestroyed) {
        var e = {
          instance: this,
          styles: {},
          arrowStyles: {},
          attributes: {},
          flipped: !1,
          offsets: {},
        };
        (e.offsets.reference = O(this.state, this.popper, this.reference)),
          (e.placement = v(
            this.options.placement,
            e.offsets.reference,
            this.popper,
            this.reference,
            this.options.modifiers.flip.boundariesElement,
            this.options.modifiers.flip.padding
          )),
          (e.originalPlacement = e.placement),
          (e.offsets.popper = S(this.popper, e.offsets.reference, e.placement)),
          (e.offsets.popper.position = "absolute"),
          (e = C(this.modifiers, e)),
          this.state.isCreated
            ? this.options.onUpdate(e)
            : ((this.state.isCreated = !0), this.options.onCreate(e));
      }
    }
    function k(e, t) {
      return e.some(function (e) {
        var o = e.name,
          i = e.enabled;
        return i && o === t;
      });
    }
    function W(e) {
      for (
        var t = [!1, "ms", "Webkit", "Moz", "O"],
          o = e.charAt(0).toUpperCase() + e.slice(1),
          n = 0;
        n < t.length - 1;
        n++
      ) {
        var i = t[n],
          r = i ? "" + i + o : e;
        if ("undefined" != typeof document.body.style[r]) return r;
      }
      return null;
    }
    function P() {
      return (
        (this.state.isDestroyed = !0),
        k(this.modifiers, "applyStyle") &&
          (this.popper.removeAttribute("x-placement"),
          (this.popper.style.left = ""),
          (this.popper.style.position = ""),
          (this.popper.style.top = ""),
          (this.popper.style[W("transform")] = "")),
        this.disableEventListeners(),
        this.options.removeOnDestroy &&
          this.popper.parentNode.removeChild(this.popper),
        this
      );
    }
    function B(e) {
      var t = e.ownerDocument;
      return t ? t.defaultView : window;
    }
    function H(e, t, o, i) {
      var r = "BODY" === e.nodeName,
        p = r ? e.ownerDocument.defaultView : e;
      p.addEventListener(t, o, { passive: !0 }),
        r || H(n(p.parentNode), t, o, i),
        i.push(p);
    }
    function A(e, t, o, i) {
      (o.updateBound = i),
        B(e).addEventListener("resize", o.updateBound, { passive: !0 });
      var r = n(e);
      return (
        H(r, "scroll", o.updateBound, o.scrollParents),
        (o.scrollElement = r),
        (o.eventsEnabled = !0),
        o
      );
    }
    function I() {
      this.state.eventsEnabled ||
        (this.state = A(
          this.reference,
          this.options,
          this.state,
          this.scheduleUpdate
        ));
    }
    function M(e, t) {
      return (
        B(e).removeEventListener("resize", t.updateBound),
        t.scrollParents.forEach(function (e) {
          e.removeEventListener("scroll", t.updateBound);
        }),
        (t.updateBound = null),
        (t.scrollParents = []),
        (t.scrollElement = null),
        (t.eventsEnabled = !1),
        t
      );
    }
    function R() {
      this.state.eventsEnabled &&
        (cancelAnimationFrame(this.scheduleUpdate),
        (this.state = M(this.reference, this.state)));
    }
    function U(e) {
      return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
    }
    function Y(e, t) {
      Object.keys(t).forEach(function (o) {
        var i = "";
        -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(o) &&
          U(t[o]) &&
          (i = "px"),
          (e.style[o] = t[o] + i);
      });
    }
    function j(e, t) {
      Object.keys(t).forEach(function (o) {
        var i = t[o];
        !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
      });
    }
    function F(e, t, o) {
      var i = T(e, function (e) {
          var o = e.name;
          return o === t;
        }),
        n =
          !!i &&
          e.some(function (e) {
            return e.name === o && e.enabled && e.order < i.order;
          });
      if (!n) {
        var r = "`" + t + "`";
        console.warn(
          "`" +
            o +
            "`" +
            " modifier is required by " +
            r +
            " modifier in order to work, be sure to include it before " +
            r +
            "!"
        );
      }
      return n;
    }
    function K(e) {
      return "end" === e ? "start" : "start" === e ? "end" : e;
    }
    function q(e) {
      var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        o = ae.indexOf(e),
        i = ae.slice(o + 1).concat(ae.slice(0, o));
      return t ? i.reverse() : i;
    }
    function V(e, t, o, i) {
      var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
        r = +n[1],
        p = n[2];
      if (!r) return e;
      if (0 === p.indexOf("%")) {
        var s;
        switch (p) {
          case "%p":
            s = o;
            break;
          case "%":
          case "%r":
          default:
            s = i;
        }
        var d = c(s);
        return (d[t] / 100) * r;
      }
      if ("vh" === p || "vw" === p) {
        var a;
        return (
          (a =
            "vh" === p
              ? J(document.documentElement.clientHeight, window.innerHeight || 0)
              : J(document.documentElement.clientWidth, window.innerWidth || 0)),
          (a / 100) * r
        );
      }
      return r;
    }
    function z(e, t, o, i) {
      var n = [0, 0],
        r = -1 !== ["right", "left"].indexOf(i),
        p = e.split(/(\+|\-)/).map(function (e) {
          return e.trim();
        }),
        s = p.indexOf(
          T(p, function (e) {
            return -1 !== e.search(/,|\s/);
          })
        );
      p[s] &&
        -1 === p[s].indexOf(",") &&
        console.warn(
          "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
        );
      var d = /\s*,\s*|\s+/,
        a =
          -1 === s
            ? [p]
            : [
                p.slice(0, s).concat([p[s].split(d)[0]]),
                [p[s].split(d)[1]].concat(p.slice(s + 1)),
              ];
      return (
        (a = a.map(function (e, i) {
          var n = (1 === i ? !r : r) ? "height" : "width",
            p = !1;
          return e
            .reduce(function (e, t) {
              return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
                ? ((e[e.length - 1] = t), (p = !0), e)
                : p
                ? ((e[e.length - 1] += t), (p = !1), e)
                : e.concat(t);
            }, [])
            .map(function (e) {
              return V(e, n, t, o);
            });
        })),
        a.forEach(function (e, t) {
          e.forEach(function (o, i) {
            U(o) && (n[t] += o * ("-" === e[i - 1] ? -1 : 1));
          });
        }),
        n
      );
    }
    function G(e, t) {
      var o,
        i = t.offset,
        n = e.placement,
        r = e.offsets,
        p = r.popper,
        s = r.reference,
        d = n.split("-")[0];
      return (
        (o = U(+i) ? [+i, 0] : z(i, p, s, d)),
        "left" === d
          ? ((p.top += o[0]), (p.left -= o[1]))
          : "right" === d
          ? ((p.top += o[0]), (p.left += o[1]))
          : "top" === d
          ? ((p.left += o[0]), (p.top -= o[1]))
          : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
        (e.popper = p),
        e
      );
    }
    for (
      var _ = Math.min,
        X = Math.floor,
        J = Math.max,
        Q = "undefined" != typeof window && "undefined" != typeof document,
        Z = ["Edge", "Trident", "Firefox"],
        $ = 0,
        ee = 0;
      ee < Z.length;
      ee += 1
    )
      if (Q && 0 <= navigator.userAgent.indexOf(Z[ee])) {
        $ = 1;
        break;
      }
    var i,
      te = Q && window.Promise,
      oe = te
        ? function (e) {
            var t = !1;
            return function () {
              t ||
                ((t = !0),
                window.Promise.resolve().then(function () {
                  (t = !1), e();
                }));
            };
          }
        : function (e) {
            var t = !1;
            return function () {
              t ||
                ((t = !0),
                setTimeout(function () {
                  (t = !1), e();
                }, $));
            };
          },
      ie = function () {
        return (
          void 0 == i && (i = -1 !== navigator.appVersion.indexOf("MSIE 10")), i
        );
      },
      ne = function (e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      },
      re = (function () {
        function e(e, t) {
          for (var o, n = 0; n < t.length; n++)
            (o = t[n]),
              (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
        }
        return function (t, o, i) {
          return o && e(t.prototype, o), i && e(t, i), t;
        };
      })(),
      pe = function (e, t, o) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = o),
          e
        );
      },
      se =
        Object.assign ||
        function (e) {
          for (var t, o = 1; o < arguments.length; o++)
            for (var i in ((t = arguments[o]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        },
      de = [
        "auto-start",
        "auto",
        "auto-end",
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-end",
        "bottom",
        "bottom-start",
        "left-end",
        "left",
        "left-start",
      ],
      ae = de.slice(3),
      le = {
        FLIP: "flip",
        CLOCKWISE: "clockwise",
        COUNTERCLOCKWISE: "counterclockwise",
      },
      fe = (function () {
        function t(o, i) {
          var n = this,
            r =
              2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
          ne(this, t),
            (this.scheduleUpdate = function () {
              return requestAnimationFrame(n.update);
            }),
            (this.update = oe(this.update.bind(this))),
            (this.options = se({}, t.Defaults, r)),
            (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
            (this.reference = o && o.jquery ? o[0] : o),
            (this.popper = i && i.jquery ? i[0] : i),
            (this.options.modifiers = {}),
            Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(
              function (e) {
                n.options.modifiers[e] = se(
                  {},
                  t.Defaults.modifiers[e] || {},
                  r.modifiers ? r.modifiers[e] : {}
                );
              }
            ),
            (this.modifiers = Object.keys(this.options.modifiers)
              .map(function (e) {
                return se({ name: e }, n.options.modifiers[e]);
              })
              .sort(function (e, t) {
                return e.order - t.order;
              })),
            this.modifiers.forEach(function (t) {
              t.enabled &&
                e(t.onLoad) &&
                t.onLoad(n.reference, n.popper, n.options, t, n.state);
            }),
            this.update();
          var p = this.options.eventsEnabled;
          p && this.enableEventListeners(), (this.state.eventsEnabled = p);
        }
        return (
          re(t, [
            {
              key: "update",
              value: function () {
                return N.call(this);
              },
            },
            {
              key: "destroy",
              value: function () {
                return P.call(this);
              },
            },
            {
              key: "enableEventListeners",
              value: function () {
                return I.call(this);
              },
            },
            {
              key: "disableEventListeners",
              value: function () {
                return R.call(this);
              },
            },
          ]),
          t
        );
      })();
    return (
      (fe.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
      (fe.placements = de),
      (fe.Defaults = {
        placement: "bottom",
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: {
          shift: {
            order: 100,
            enabled: !0,
            fn: function (e) {
              var t = e.placement,
                o = t.split("-")[0],
                i = t.split("-")[1];
              if (i) {
                var n = e.offsets,
                  r = n.reference,
                  p = n.popper,
                  s = -1 !== ["bottom", "top"].indexOf(o),
                  d = s ? "left" : "top",
                  a = s ? "width" : "height",
                  l = {
                    start: pe({}, d, r[d]),
                    end: pe({}, d, r[d] + r[a] - p[a]),
                  };
                e.offsets.popper = se({}, p, l[i]);
              }
              return e;
            },
          },
          offset: { order: 200, enabled: !0, fn: G, offset: 0 },
          preventOverflow: {
            order: 300,
            enabled: !0,
            fn: function (e, t) {
              var o = t.boundariesElement || r(e.instance.popper);
              e.instance.reference === o && (o = r(o));
              var i = y(e.instance.popper, e.instance.reference, t.padding, o);
              t.boundaries = i;
              var n = t.priority,
                p = e.offsets.popper,
                s = {
                  primary: function (e) {
                    var o = p[e];
                    return (
                      p[e] < i[e] &&
                        !t.escapeWithReference &&
                        (o = J(p[e], i[e])),
                      pe({}, e, o)
                    );
                  },
                  secondary: function (e) {
                    var o = "right" === e ? "left" : "top",
                      n = p[o];
                    return (
                      p[e] > i[e] &&
                        !t.escapeWithReference &&
                        (n = _(
                          p[o],
                          i[e] - ("right" === e ? p.width : p.height)
                        )),
                      pe({}, o, n)
                    );
                  },
                };
              return (
                n.forEach(function (e) {
                  var t =
                    -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                  p = se({}, p, s[t](e));
                }),
                (e.offsets.popper = p),
                e
              );
            },
            priority: ["left", "right", "top", "bottom"],
            padding: 5,
            boundariesElement: "scrollParent",
          },
          keepTogether: {
            order: 400,
            enabled: !0,
            fn: function (e) {
              var t = e.offsets,
                o = t.popper,
                i = t.reference,
                n = e.placement.split("-")[0],
                r = X,
                p = -1 !== ["top", "bottom"].indexOf(n),
                s = p ? "right" : "bottom",
                d = p ? "left" : "top",
                a = p ? "width" : "height";
              return (
                o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]),
                o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])),
                e
              );
            },
          },
          arrow: {
            order: 500,
            enabled: !0,
            fn: function (e, o) {
              var i;
              if (!F(e.instance.modifiers, "arrow", "keepTogether")) return e;
              var n = o.element;
              if ("string" == typeof n) {
                if (((n = e.instance.popper.querySelector(n)), !n)) return e;
              } else if (!e.instance.popper.contains(n))
                return (
                  console.warn(
                    "WARNING: `arrow.element` must be child of its popper element!"
                  ),
                  e
                );
              var r = e.placement.split("-")[0],
                p = e.offsets,
                s = p.popper,
                d = p.reference,
                a = -1 !== ["left", "right"].indexOf(r),
                l = a ? "height" : "width",
                f = a ? "Top" : "Left",
                m = f.toLowerCase(),
                h = a ? "left" : "top",
                g = a ? "bottom" : "right",
                u = L(n)[l];
              d[g] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[g] - u)),
                d[m] + u > s[g] && (e.offsets.popper[m] += d[m] + u - s[g]),
                (e.offsets.popper = c(e.offsets.popper));
              var b = d[m] + d[l] / 2 - u / 2,
                w = t(e.instance.popper),
                y = parseFloat(w["margin" + f], 10),
                E = parseFloat(w["border" + f + "Width"], 10),
                v = b - e.offsets.popper[m] - y - E;
              return (
                (v = J(_(s[l] - u, v), 0)),
                (e.arrowElement = n),
                (e.offsets.arrow =
                  ((i = {}), pe(i, m, Math.round(v)), pe(i, h, ""), i)),
                e
              );
            },
            element: "[x-arrow]",
          },
          flip: {
            order: 600,
            enabled: !0,
            fn: function (e, t) {
              if (k(e.instance.modifiers, "inner")) return e;
              if (e.flipped && e.placement === e.originalPlacement) return e;
              var o = y(
                  e.instance.popper,
                  e.instance.reference,
                  t.padding,
                  t.boundariesElement
                ),
                i = e.placement.split("-")[0],
                n = x(i),
                r = e.placement.split("-")[1] || "",
                p = [];
              switch (t.behavior) {
                case le.FLIP:
                  p = [i, n];
                  break;
                case le.CLOCKWISE:
                  p = q(i);
                  break;
                case le.COUNTERCLOCKWISE:
                  p = q(i, !0);
                  break;
                default:
                  p = t.behavior;
              }
              return (
                p.forEach(function (s, d) {
                  if (i !== s || p.length === d + 1) return e;
                  (i = e.placement.split("-")[0]), (n = x(i));
                  var a = e.offsets.popper,
                    l = e.offsets.reference,
                    f = X,
                    m =
                      ("left" === i && f(a.right) > f(l.left)) ||
                      ("right" === i && f(a.left) < f(l.right)) ||
                      ("top" === i && f(a.bottom) > f(l.top)) ||
                      ("bottom" === i && f(a.top) < f(l.bottom)),
                    h = f(a.left) < f(o.left),
                    c = f(a.right) > f(o.right),
                    g = f(a.top) < f(o.top),
                    u = f(a.bottom) > f(o.bottom),
                    b =
                      ("left" === i && h) ||
                      ("right" === i && c) ||
                      ("top" === i && g) ||
                      ("bottom" === i && u),
                    w = -1 !== ["top", "bottom"].indexOf(i),
                    y =
                      !!t.flipVariations &&
                      ((w && "start" === r && h) ||
                        (w && "end" === r && c) ||
                        (!w && "start" === r && g) ||
                        (!w && "end" === r && u));
                  (m || b || y) &&
                    ((e.flipped = !0),
                    (m || b) && (i = p[d + 1]),
                    y && (r = K(r)),
                    (e.placement = i + (r ? "-" + r : "")),
                    (e.offsets.popper = se(
                      {},
                      e.offsets.popper,
                      S(e.instance.popper, e.offsets.reference, e.placement)
                    )),
                    (e = C(e.instance.modifiers, e, "flip")));
                }),
                e
              );
            },
            behavior: "flip",
            padding: 5,
            boundariesElement: "viewport",
          },
          inner: {
            order: 700,
            enabled: !1,
            fn: function (e) {
              var t = e.placement,
                o = t.split("-")[0],
                i = e.offsets,
                n = i.popper,
                r = i.reference,
                p = -1 !== ["left", "right"].indexOf(o),
                s = -1 === ["top", "left"].indexOf(o);
              return (
                (n[p ? "left" : "top"] =
                  r[o] - (s ? n[p ? "width" : "height"] : 0)),
                (e.placement = x(t)),
                (e.offsets.popper = c(n)),
                e
              );
            },
          },
          hide: {
            order: 800,
            enabled: !0,
            fn: function (e) {
              if (!F(e.instance.modifiers, "hide", "preventOverflow")) return e;
              var t = e.offsets.reference,
                o = T(e.instance.modifiers, function (e) {
                  return "preventOverflow" === e.name;
                }).boundaries;
              if (
                t.bottom < o.top ||
                t.left > o.right ||
                t.top > o.bottom ||
                t.right < o.left
              ) {
                if (!0 === e.hide) return e;
                (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
              } else {
                if (!1 === e.hide) return e;
                (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
              }
              return e;
            },
          },
          computeStyle: {
            order: 850,
            enabled: !0,
            fn: function (e, t) {
              var o = t.x,
                i = t.y,
                n = e.offsets.popper,
                p = T(e.instance.modifiers, function (e) {
                  return "applyStyle" === e.name;
                }).gpuAcceleration;
              void 0 !== p &&
                console.warn(
                  "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                );
              var s,
                d,
                a = void 0 === p ? t.gpuAcceleration : p,
                l = r(e.instance.popper),
                f = g(l),
                m = { position: n.position },
                h = {
                  left: X(n.left),
                  top: X(n.top),
                  bottom: X(n.bottom),
                  right: X(n.right),
                },
                c = "bottom" === o ? "top" : "bottom",
                u = "right" === i ? "left" : "right",
                b = W("transform");
              if (
                ((d = "bottom" == c ? -f.height + h.bottom : h.top),
                (s = "right" == u ? -f.width + h.right : h.left),
                a && b)
              )
                (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                  (m[c] = 0),
                  (m[u] = 0),
                  (m.willChange = "transform");
              else {
                var w = "bottom" == c ? -1 : 1,
                  y = "right" == u ? -1 : 1;
                (m[c] = d * w), (m[u] = s * y), (m.willChange = c + ", " + u);
              }
              var E = { "x-placement": e.placement };
              return (
                (e.attributes = se({}, E, e.attributes)),
                (e.styles = se({}, m, e.styles)),
                (e.arrowStyles = se({}, e.offsets.arrow, e.arrowStyles)),
                e
              );
            },
            gpuAcceleration: !0,
            x: "bottom",
            y: "right",
          },
          applyStyle: {
            order: 900,
            enabled: !0,
            fn: function (e) {
              return (
                Y(e.instance.popper, e.styles),
                j(e.instance.popper, e.attributes),
                e.arrowElement &&
                  Object.keys(e.arrowStyles).length &&
                  Y(e.arrowElement, e.arrowStyles),
                e
              );
            },
            onLoad: function (e, t, o, i, n) {
              var r = O(n, t, e),
                p = v(
                  o.placement,
                  r,
                  t,
                  e,
                  o.modifiers.flip.boundariesElement,
                  o.modifiers.flip.padding
                );
              return (
                t.setAttribute("x-placement", p),
                Y(t, { position: "absolute" }),
                o
              );
            },
            gpuAcceleration: void 0,
          },
        },
      }),
      fe
    );
  });

// Dropdown 4.1.3
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t(
          require("jquery"),
          require("popper.js"),
          require("./util.js")
        ))
      : "function" == typeof define && define.amd
      ? define(["jquery", "popper.js", "./util.js"], t)
      : (e.Dropdown = t(e.jQuery, e.Popper, e.Util));
  })(this, function (e, i, s) {
    "use strict";
    function o(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function a(o) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {},
          t = Object.keys(i);
        "function" == typeof Object.getOwnPropertySymbols &&
          (t = t.concat(
            Object.getOwnPropertySymbols(i).filter(function (e) {
              return Object.getOwnPropertyDescriptor(i, e).enumerable;
            })
          )),
          t.forEach(function (e) {
            var t, n, r;
            (t = o),
              (r = i[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = r);
          });
      }
      return o;
    }
    var f,
      l,
      c,
      h,
      t,
      n,
      p,
      d,
      g,
      _,
      m,
      y,
      v,
      w,
      b,
      P,
      r,
      C,
      A,
      E,
      D,
      I,
      j,
      O,
      N,
      k,
      T,
      K,
      u;
    return (
      (e = e && e.hasOwnProperty("default") ? e.default : e),
      (i = i && i.hasOwnProperty("default") ? i.default : i),
      (s = s && s.hasOwnProperty("default") ? s.default : s),
      (l = "dropdown"),
      (h = "." + (c = "bs.dropdown")),
      (t = ".data-api"),
      (n = (f = e).fn[l]),
      (p = new RegExp("38|40|27")),
      (d = {
        HIDE: "hide" + h,
        HIDDEN: "hidden" + h,
        SHOW: "show" + h,
        SHOWN: "shown" + h,
        CLICK: "click" + h,
        CLICK_DATA_API: "click" + h + t,
        KEYDOWN_DATA_API: "keydown" + h + t,
        KEYUP_DATA_API: "keyup" + h + t,
      }),
      (g = "disabled"),
      (_ = "is-show"),
      (m = "dropup"),
      (y = "dropright"),
      (v = "dropleft"),
      (w = "dropdown-menu-right"),
      (b = "position-static"),
      (P = '[data-toggle="dropdown"]'),
      (r = ".dropdown form"),
      (C = ".dropdown-menu"),
      (A = ".navbar-nav"),
      (E = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"),
      (D = "top-start"),
      (I = "top-end"),
      (j = "bottom-start"),
      (O = "bottom-end"),
      (N = "right-start"),
      (k = "left-start"),
      (T = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
      }),
      (K = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
      }),
      (u = (function () {
        function u(e, t) {
          (this._element = e),
            (this._popper = null),
            (this._config = this._getConfig(t)),
            (this._menu = this._getMenuElement()),
            (this._inNavbar = this._detectNavbar()),
            this._addEventListeners();
        }
        var e,
          t,
          n,
          r = u.prototype;
        return (
          (r.toggle = function () {
            if (!this._element.disabled && !f(this._element).hasClass(g)) {
              var e = u._getParentFromElement(this._element),
                t = f(this._menu).hasClass(_);
              if ((u._clearMenus(), !t)) {
                var n = { relatedTarget: this._element },
                  r = f.Event(d.SHOW, n);
                if ((f(e).trigger(r), !r.isDefaultPrevented())) {
                  if (!this._inNavbar) {
                    if (void 0 === i)
                      throw new TypeError(
                        "Bootstrap dropdown require Popper.js (https://popper.js.org)"
                      );
                    var o = this._element;
                    "parent" === this._config.reference
                      ? (o = e)
                      : s.isElement(this._config.reference) &&
                        ((o = this._config.reference),
                        void 0 !== this._config.reference.jquery &&
                          (o = this._config.reference[0])),
                      "scrollParent" !== this._config.boundary &&
                        f(e).addClass(b),
                      (this._popper = new i(
                        o,
                        this._menu,
                        this._getPopperConfig()
                      ));
                  }
                  "ontouchstart" in document.documentElement &&
                    0 === f(e).closest(A).length &&
                    f(document.body).children().on("mouseover", null, f.noop),
                    this._element.focus(),
                    this._element.setAttribute("aria-expanded", !0),
                    f(this._menu).toggleClass(_),
                    f(e).toggleClass(_).trigger(f.Event(d.SHOWN, n));
                }
              }
            }
          }),
          (r.dispose = function () {
            f.removeData(this._element, c),
              f(this._element).off(h),
              (this._element = null),
              (this._menu = null) !== this._popper &&
                (this._popper.destroy(), (this._popper = null));
          }),
          (r.update = function () {
            (this._inNavbar = this._detectNavbar()),
              null !== this._popper && this._popper.scheduleUpdate();
          }),
          (r._addEventListeners = function () {
            var t = this;
            f(this._element).on(d.CLICK, function (e) {
              e.preventDefault(), e.stopPropagation(), t.toggle();
            });
          }),
          (r._getConfig = function (e) {
            return (
              (e = a({}, this.constructor.Default, f(this._element).data(), e)),
              s.typeCheckConfig(l, e, this.constructor.DefaultType),
              e
            );
          }),
          (r._getMenuElement = function () {
            if (!this._menu) {
              var e = u._getParentFromElement(this._element);
              e && (this._menu = e.querySelector(C));
            }
            return this._menu;
          }),
          (r._getPlacement = function () {
            var e = f(this._element.parentNode),
              t = j;
            return (
              e.hasClass(m)
                ? ((t = D), f(this._menu).hasClass(w) && (t = I))
                : e.hasClass(y)
                ? (t = N)
                : e.hasClass(v)
                ? (t = k)
                : f(this._menu).hasClass(w) && (t = O),
              t
            );
          }),
          (r._detectNavbar = function () {
            return 0 < f(this._element).closest(".navbar").length;
          }),
          (r._getPopperConfig = function () {
            var t = this,
              e = {};
            "function" == typeof this._config.offset
              ? (e.fn = function (e) {
                  return (
                    (e.offsets = a(
                      {},
                      e.offsets,
                      t._config.offset(e.offsets) || {}
                    )),
                    e
                  );
                })
              : (e.offset = this._config.offset);
            var n = {
              placement: this._getPlacement(),
              modifiers: {
                offset: e,
                flip: { enabled: this._config.flip },
                preventOverflow: { boundariesElement: this._config.boundary },
              },
            };
            return (
              "static" === this._config.display &&
                (n.modifiers.applyStyle = { enabled: !1 }),
              n
            );
          }),
          (u._jQueryInterface = function (t) {
            return this.each(function () {
              var e = f(this).data(c);
              if (
                (e ||
                  ((e = new u(this, "object" == typeof t ? t : null)),
                  f(this).data(c, e)),
                "string" == typeof t)
              ) {
                if (void 0 === e[t])
                  throw new TypeError('No method named "' + t + '"');
                e[t]();
              }
            });
          }),
          (u._clearMenus = function (e) {
            if (!e || (3 !== e.which && ("keyup" !== e.type || 9 === e.which)))
              for (
                var t = [].slice.call(document.querySelectorAll(P)),
                  n = 0,
                  r = t.length;
                n < r;
                n++
              ) {
                var o = u._getParentFromElement(t[n]),
                  i = f(t[n]).data(c),
                  s = { relatedTarget: t[n] };
                if ((e && "click" === e.type && (s.clickEvent = e), i)) {
                  var a = i._menu;
                  if (
                    f(o).hasClass(_) &&
                    !(
                      e &&
                      (("click" === e.type &&
                        /input|textarea/i.test(e.target.tagName)) ||
                        ("keyup" === e.type && 9 === e.which)) &&
                      f.contains(o, e.target)
                    )
                  ) {
                    var l = f.Event(d.HIDE, s);
                    f(o).trigger(l),
                      l.isDefaultPrevented() ||
                        ("ontouchstart" in document.documentElement &&
                          f(document.body)
                            .children()
                            .off("mouseover", null, f.noop),
                        t[n].setAttribute("aria-expanded", "false"),
                        f(a).removeClass(_),
                        f(o).removeClass(_).trigger(f.Event(d.HIDDEN, s)));
                  }
                }
              }
          }),
          (u._getParentFromElement = function (e) {
            var t,
              n = s.getSelectorFromElement(e);
            return n && (t = document.querySelector(n)), t || e.parentNode;
          }),
          (u._dataApiKeydownHandler = function (e) {
            if (
              (/input|textarea/i.test(e.target.tagName)
                ? !(
                    32 === e.which ||
                    (27 !== e.which &&
                      ((40 !== e.which && 38 !== e.which) ||
                        f(e.target).closest(C).length))
                  )
                : p.test(e.which)) &&
              (e.preventDefault(),
              e.stopPropagation(),
              !this.disabled && !f(this).hasClass(g))
            ) {
              var t = u._getParentFromElement(this),
                n = f(t).hasClass(_);
              if (
                (n || (27 === e.which && 32 === e.which)) &&
                (!n || (27 !== e.which && 32 !== e.which))
              ) {
                var r = [].slice.call(t.querySelectorAll(E));
                if (0 !== r.length) {
                  var o = r.indexOf(e.target);
                  38 === e.which && 0 < o && o--,
                    40 === e.which && o < r.length - 1 && o++,
                    o < 0 && (o = 0),
                    r[o].focus();
                }
              } else {
                if (27 === e.which) {
                  var i = t.querySelector(P);
                  f(i).trigger("focus");
                }
                f(this).trigger("click");
              }
            }
          }),
          (e = u),
          (n = [
            {
              key: "VERSION",
              get: function () {
                return "4.1.3";
              },
            },
            {
              key: "Default",
              get: function () {
                return T;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return K;
              },
            },
          ]),
          (t = null) && o(e.prototype, t),
          n && o(e, n),
          u
        );
      })()),
      f(document)
        .on(d.KEYDOWN_DATA_API, P, u._dataApiKeydownHandler)
        .on(d.KEYDOWN_DATA_API, C, u._dataApiKeydownHandler)
        .on(d.CLICK_DATA_API + " " + d.KEYUP_DATA_API, u._clearMenus)
        .on(d.CLICK_DATA_API, P, function (e) {
          e.preventDefault(),
            e.stopPropagation(),
            u._jQueryInterface.call(f(this), "toggle");
        })
        .on(d.CLICK_DATA_API, r, function (e) {
          e.stopPropagation();
        }),
      (f.fn[l] = u._jQueryInterface),
      (f.fn[l].Constructor = u),
      (f.fn[l].noConflict = function () {
        return (f.fn[l] = n), u._jQueryInterface;
      }),
      u
    );
  });
  
  // Disabled click inside dropdown
  $(document).on("click", ".dropdown-touch", function (e) {
    e.stopPropagation();
  });

  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("uniSearch");
    filter = input.value.toUpperCase();
    div = document.getElementById("university-menu");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  function MobilefilterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("mobileSearch");
    filter = input.value.toUpperCase();
    div = document.getElementById("mobile-menu");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }