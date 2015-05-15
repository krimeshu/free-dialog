/**
 * Created by Grayson Rex on 2015/5/13.
 * Version: 1.33
 */

/* 简单弹窗类 ST */
(function (window) {

    var document = window.document;

    /**
     * FreeDialog类
     * @param options 构造参数，包括title、content、cootBtns等字段
     * @constructor
     */
    var FreeDialog = function (options) {
        var title = options.title || '';
        var content = options.content || null;
        var footBtns = options.footBtns || null;
        var lock = options.lock === undefined ? true : options.lock;
        var withCloseBtn = options.withCloseBtn === undefined ? true : options.withCloseBtn;
        var clickAroundClose = options.clickAroundClose;
        var skin = options.skin || '';

        var _this = this;

        this.DOM = {};

        var wrapper = this.DOM.wrapper = document.createElement('div');
        var cover = this.DOM.cover = document.createElement('div');
        var container = this.DOM.container = document.createElement('div');
        var btnClose = this.DOM.btnClose = document.createElement('a');
        var header = this.DOM.header = document.createElement('p');
        var body = this.DOM.body = document.createElement('div');
        var footer = this.DOM.footer = document.createElement('div');

        wrapper.className = 'dialog-wrapper closed';
        cover.className = 'dialog-cover';
        container.className = 'dialog-container';
        btnClose.className = 'dialog-btn';
        btnClose.setAttribute('closeBtn', '');
        header.className = 'dialog-header';
        body.className = 'dialog-body';
        footer.className = 'dialog-footer';

        wrapper.appendChild(cover);
        wrapper.appendChild(container);
        container.appendChild(btnClose);
        container.appendChild(header);
        container.appendChild(body);
        container.appendChild(footer);
        document.body.appendChild(wrapper);

        this.setTitle(title);
        this.setContent(content);
        this.setFootBtns(footBtns);

        if (withCloseBtn) {
            this.showCloseBtn();
        } else {
            this.hideCloseBtn();
        }
        if (title) {
            this.showTitle();
        } else {
            this.hideTitle();
        }
        if (footBtns) {
            this.showFooter();
        } else {
            this.hideFooter();
        }
        if (lock) {
            this.lock();
        } else {
            this.unlock();
        }
        this.clickAroundClose = clickAroundClose;
        wrapper.addEventListener('click', function (e) {
            if (e.target == _this.DOM.wrapper || e.target == _this.DOM.cover) {
                if (_this.clickAroundClose) {
                    _this.close();
                }
            }
        });
        this.setSkin(skin);

        btnClose.addEventListener('click', function (e) {
            _this.close(e);
        });

        this.callbacks = {};

        var zIndex = parseInt(getComputedStyle(wrapper)['z-index'], 10);
        if (!FreeDialog._topZIndex || FreeDialog._topZIndex < zIndex) {
            FreeDialog._topZIndex = zIndex;
        }
    };
    /**
     * 判断obj是否为数组对象
     * @param obj 待判断对象
     * @private
     */
    FreeDialog._isArray = function (obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    };
    /**
     * 判断obj是否为HTML元素
     * @param obj 待判断对象
     * @returns {boolean} 是否为HTML元素
     * @private
     */
    FreeDialog._isHTMLElement = function (obj) {
        var str = Object.prototype.toString.call(obj);
        return str.indexOf('[object HTML') == 0 && str.indexOf('Element]') == str.length - 'Element]'.length;
    };
    /**
     * 显示右上角的关闭按钮
     */
    FreeDialog.prototype.showCloseBtn = function () {
        var _this = this;
        _this.DOM.btnClose.style.display = 'block';
        _this.withCloseBtn = true;
    };
    /**
     * 隐藏右上角的关闭按钮
     */
    FreeDialog.prototype.hideCloseBtn = function () {
        var _this = this;
        _this.DOM.btnClose.style.display = 'none';
        _this.withCloseBtn = false;
    };
    /**
     * 锁定对话框背景（显示遮罩层）
     */
    FreeDialog.prototype.lock = function () {
        var _this = this;
        _this.DOM.cover.classList.remove('hide');
        _this.locked = true;
    };
    /**
     * 解锁对话框背景（隐藏遮罩层）
     */
    FreeDialog.prototype.unlock = function () {
        var _this = this;
        _this.DOM.cover.classList.add('hide');
        _this.locked = false;
    };
    /**
     * 清空对话框标题栏
     */
    FreeDialog.prototype.clearTitle = function () {
        var _this = this;
        _this.DOM.header.innerHTML = '';
        _this.title = '';
    };
    /**
     * 设置对话框标题栏
     * @param title 标题文本
     */
    FreeDialog.prototype.setTitle = function (title) {
        var _this = this;
        _this.clearTitle();
        if (FreeDialog._isHTMLElement(title)) {
            _this.DOM.header.appendChild(title);
        } else {
            _this.DOM.header.innerHTML = title;
        }
        _this.title = title;
    };
    /**
     * 隐藏对话框标题栏
     */
    FreeDialog.prototype.hideTitle = function () {
        var _this = this;
        _this.DOM.header.style.display = 'none';
    };
    /**
     * 显示对话框标题栏
     */
    FreeDialog.prototype.showTitle = function () {
        var _this = this;
        _this.DOM.header.style.display = 'block';
    };
    /**
     * 清空对话框内容
     */
    FreeDialog.prototype.clearContent = function () {
        var _this = this;
        _this.DOM.body.innerHTML = '';
    };
    /**
     * 设置对话框内容
     * @param content 内容文本/文本数组
     */
    FreeDialog.prototype.setContent = function (content) {
        var _this = this;
        _this.clearContent();
        if (content) {
            if (!FreeDialog._isArray(content)) {
                content = [content];
            }
            for (var i = 0, r; r = content[i]; i++) {
                var para = document.createElement('p');
                if (FreeDialog._isHTMLElement(r)) {
                    para.appendChild(r);
                } else {
                    para.innerHTML = r;
                }
                _this.DOM.body.appendChild(para);
            }
        }
        _this.content = content;
    };
    /**
     * 清空对话框底部按键
     */
    FreeDialog.prototype.clearFootBtns = function () {
        var _this = this;
        _this.DOM.footer.innerHTML = '';
    };
    /**
     * 设置对话框底部按键
     * @param footBtns 底部按键/按键数组
     */
    FreeDialog.prototype.setFootBtns = function (footBtns) {
        var _this = this;
        _this.clearFootBtns();
        if (footBtns) {
            if (!FreeDialog._isArray(footBtns)) {
                footBtns = [footBtns];
            }
            for (var i = 0, b; b = footBtns[i]; i++) {
                var btn = document.createElement('a');
                btn.className = b.extraClass ? 'dialog-btn ' + b.extraClass : 'dialog-btn';
                btn.innerHTML = b.name;
                (function (b) {
                    btn.addEventListener('click', function (e) {
                        b.click.apply(_this, [e]);
                    });
                })(b);
                _this.DOM.footer.appendChild(btn);
            }
        }
        _this.footBtns = footBtns;
    };
    /**
     * 隐藏对话框底栏
     */
    FreeDialog.prototype.hideFooter = function () {
        var _this = this;
        _this.DOM.footer.classList.add('hide');
    };
    /**
     * 显示对话框底栏
     */
    FreeDialog.prototype.showFooter = function () {
        var _this = this;
        _this.DOM.footer.classList.remove('hide');
    };
    /**
     * 设置对话框皮肤
     * @param skin 皮肤class名
     */
    FreeDialog.prototype.setSkin = function (skin) {
        var _this = this;
        if (_this.skin) {
            _this.DOM.wrapper.classList.remove(_this.skin);
        }
        if (skin) {
            _this.DOM.wrapper.classList.add(skin);
        }
        _this.skin = skin;
    };
    /**
     * 显示对话框
     * @param options 显示参数，可选字段 closeAfter:多少毫秒后自动关闭
     */
    FreeDialog.prototype.show = function () {
        var _this = this;
        if (_this.closing) {
            return;
        }
        var res = _this.trigger('beforeopen', [], true, false);
        if (res === false) {
            return;
        }

        var zIndex = (FreeDialog._topZIndex += 10);
        _this.DOM.wrapper.style.zIndex = zIndex;
        _this.DOM.cover.style.zIndex = zIndex + 1;
        _this.DOM.container.style.zIndex = zIndex + 2;

        _this.DOM.wrapper.classList.add('preToShow');
        _this.DOM.wrapper.classList.remove('closed');

        _this.DOM.wrapper.offsetWidth = _this.DOM.wrapper.offsetWidth;

        _this.DOM.wrapper.classList.remove('preToShow');
        _this.DOM.wrapper.classList.add('showed');

        _this.trigger('open', [], true, false);
    };
    /**
     * 关闭对话框
     */
    FreeDialog.prototype.close = function (e) {
        var _this = this;
        var res = _this.trigger('beforeclose', [e], true, false);
        if (res === false) {
            return;
        }

        _this.DOM.wrapper.classList.remove('showed');
        _this.DOM.wrapper.classList.add('closing');
        _this.closing = true;
        window.setTimeout(function () {
            _this.DOM.wrapper.classList.remove('closing');
            _this.DOM.wrapper.classList.add('closed');
            _this.closing = false;

            _this.trigger('close', [e], true, false)
        }, 200);
    };
    /**
     * 绑定回调函数
     * @param type 事件类型（beforeopen, open, beforeclose, close）
     * @param callback 回调函数
     */
    FreeDialog.prototype.on = function (type, callback) {
        var callbacks = this.callbacks[type];
        if (Object.prototype.toString.call(callbacks) != '[object Array]') {
            this.callbacks[type] = callbacks = [];
        }
        callbacks.push(callback);
    };
    /**
     * 触发回调函数
     * @param type 事件类型
     * @param params 事件参数（数组）
     * @param getFalseRet 回调函数返回值===false时阻止事件继续执行（可选）
     * @param getTrueRet 回调函数返回值===true时阻止事件继续执行（可选）
     */
    FreeDialog.prototype.trigger = function (type, params, getFalseRet, getTrueRet) {
        var typeCallbacks = this.callbacks[type] || [];
        for (var i = 0, callback; callback = typeCallbacks[i]; i++) {
            var res = callback.apply(this, params);
            if (res === false && getFalseRet) {
                return res;
            }
            if (res === true && getTrueRet) {
                return true;
            }
        }
    };


    window['FreeDialog'] = FreeDialog;

    // DOM尚未创建时延时处理
    FreeDialog.tips = function (content, time) {
        window.setTimeout(function () {
            FreeDialog.tips(content, time);
        }, 100);
    }
    FreeDialog.alert = function (content, title) {
        window.setTimeout(function () {
            FreeDialog.alert(content, title);
        }, 100);
    };
    FreeDialog.ask = function (content, title, yesCallback, noCallback) {
        window.setTimeout(function () {
            FreeDialog.tips(content, title, yesCallback, noCallback);
        }, 100);
    };

    // 创建内置的常用对话框
    function creatBuiltInDialogs() {
        /**
         * 气泡对话框的创建
         * @type {FreeDialog}
         */
        FreeDialog.tipsDialog = new FreeDialog({
            content: '气泡',
            withCloseBtn: false,
            clickAroundClose: true
        });
        /**
         * 弹出一个没有标题栏也没有底部按键的气泡框，一段时间后自动消失
         * @param content 气泡内的文本内容、DOM或二者的数组
         * @param time 自动消失的时间（毫秒，缺省时为2000毫秒）
         */
        FreeDialog.tips = function (content, time) {
            var _this = FreeDialog.tipsDialog;

            time = time === undefined ? 2000 : time;
            _this.setContent(content);
            _this.show(time);
            if (typeof(time) == 'number' && time > 0) {
                if (_this._closeTimeout) {
                    window.clearTimeout(_this._closeTimeout);
                }
                _this._closeTimeout = window.setTimeout(function () {
                    _this._closeTimeout = null;
                    _this.close();
                }, time);
            }
        };
        FreeDialog.tipsDialog.on('beforeclose', function () {
            // 手动关闭对话框时清除已有定时器
            if (this._closeTimeout) {
                window.clearTimeout(this._closeTimeout);
                this._closeTimeout = null;
            }
        });

        /**
         * 提示对话框的创建
         * @type {FreeDialog}
         */
        FreeDialog.alertDialog = new FreeDialog({
            title: '提示',
            footBtns: [
                {
                    name: '确定',
                    click: function () {
                        this.close();
                    }
                }
            ],
            lock: true
        });
        FreeDialog.alertDialog.on('beforeclose', function (e) {
            if (typeof(this.closeCallbak) == 'function') {
                return this.closeCallbak.apply(this, [e]);
            }
        });
        /**
         * 弹出一个带有确定键的对话框，点击确定后对话框关闭
         * @param content 对话框内的文本内容、DOM或二者的数组
         * @param title 对话框的标题（可缺省）
         * @param closeCallbak 关闭对话框时的回调函数（可缺省，只在当次调用时有效）
         */
        FreeDialog.alert = function (content, title, closeCallback) {
            var _this = FreeDialog.alertDialog;

            _this.setContent(content);
            _this.setTitle(title || '提示');
            _this.closeCallbak = closeCallback;
            _this.show(null);
        };

        /**
         * 询问对话框的创建
         * @type {FreeDialog}
         */
        FreeDialog.askDialog = new FreeDialog({
            title: '提示',
            footBtns: [
                {
                    name: '取消',
                    extraClass: 'nagtive',
                    click: function (e) {
                        if (typeof(this.noCallback) == 'function') {
                            if (this.noCallback.apply(this, [e]) === false) {
                                return;
                            }
                        }
                        this.close();
                    }
                },
                {
                    name: '确定',
                    extraClass: 'positive',
                    click: function (e) {
                        if (typeof(this.yesCallback) == 'function') {
                            if (this.yesCallback.apply(this, [e]) === false) {
                                return;
                            }
                        }
                        this.close();
                    }
                }
            ],
            lock: true
        });
        FreeDialog.askDialog.on('beforeclose', function (e) {
            // 关闭对话框前检查回调函数是否阻止关闭
            if (e && e.target && e.target.hasAttribute('closeBtn') &&
                typeof(this.noCallback) == 'function') {
                return this.noCallback.apply(this, [e]);
            }
        });
        /**
         * 弹出一个带有确定键的对话框，点击确定或取消后执行对应回调函数
         * @param content 对话框内的文本内容、DOM或二者的数组
         * @param title 对话框的标题（可缺省）
         * @param yesCallback 点击确定时的回调函数
         * @param noCallback 点击取消时的回调函数
         */
        FreeDialog.ask = function (content, title, yesCallback, noCallback) {
            var _this = FreeDialog.askDialog;
            if (arguments.length == 3) {
                yesCallback = arguments[1];
                noCallback = arguments[2];
                title = null;
            }

            _this.setTitle(title || '提示');
            _this.setContent(content);
            _this.yesCallback = yesCallback;
            _this.noCallback = noCallback;
            _this.show(null);
        };
    }

    // 从当前元素到祖先节点中找到第一个包含className的元素
    function refluxToFind(obj, className) {
        if (obj.classList && obj.classList.contains(className)) {
            return obj;
        } else if (obj.className && new RegExp('(^| )' + className + '( |$)').test(obj.className)) {
            return obj;
        } else if (obj.parentNode && obj.parentNode != document.body) {
            return refluxToFind(obj.parentNode, className);
        } else {
            return null;
        }
    }

    // 为包含className类的按键元素解决UC浏览器:active伪类不生效的问题
    function fixActiveForUC(className) {
        if (window.navigator.userAgent.indexOf('UCBrowser') >= 0) {
            document.body.addEventListener('touchstart', function (e) {
                var dialogBtn = refluxToFind(e.target, className);
                if (dialogBtn) {
                    dialogBtn.classList.add('active')
                }
            });
            document.body.addEventListener('touchend', function () {
                var activeBtns = document.querySelectorAll('.' + className + '.active');
                for (var i = 0, btn; btn = activeBtns[i]; i++) {
                    btn.classList.remove('active');
                }
            });
        }
    }

    // 屏幕大小变化时，修改wrapper的尺寸
    function modWrapperSize(width, height) {
        var wrappers = document.getElementsByClassName('dialog-wrapper');
        for (var i = 0, wrapper; wrapper = wrappers[i]; i++) {
            wrapper.style.width = width + 'px';
            wrapper.style.height = height + 'px';
        }
    }

    // 初始化弹窗相关
    function initDialog() {
        document.addEventListener('touchstart', function () {
        });
        document.addEventListener('touchmove', function (e) {
            if (refluxToFind(e.target, 'dialog-wrapper')) {
                e.preventDefault();
            }
        });
        window.addEventListener('resize', function () {
            modWrapperSize(window.innerWidth, window.innerHeight);
        });
        var testScreenHeight = function () {
            // 某些安卓浏览器中，地址栏收起、屏幕旋转等情况导致屏幕大小变化时不触发resize，只能自己定时检测
            if (!testScreenHeight.oldHeight || testScreenHeight.oldHeight != window.innerHeight) {
                testScreenHeight.oldHeight = window.innerHeight;
                modWrapperSize(window.innerWidth, window.innerHeight);
            }
        };
        window.setInterval(testScreenHeight, 1000);
        fixActiveForUC('dialog-btn');
        creatBuiltInDialogs();
    }

    window.addEventListener('load', initDialog);

})(window);
/* 简单弹窗类 ED */