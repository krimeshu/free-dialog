# Free Dialog 组件说明文档


## I. 简介篇

一款主要用于移动端浏览器的简单弹窗插件，使用原生JavaScript实现。默认提供气泡、提示框、询问框三种常用对话框，还可以自己实例化新的弹窗对象，并轻松自定义新的皮肤样式。

## II. 基础篇

### 1. `FreeDialog.tipsDialog`的使用

```js
/**
 * FreeDialog.tips(content, [time]);
 * 弹出一个没有标题栏也没有底部按键的气泡对话框，一段时间后自动消失
 * @param content 气泡内的文本内容、DOM或二者的数组
 * @param time 自动消失的时间（毫秒，缺省时为2000毫秒）
 */

// 例1：弹出一个气泡，两秒后自动关闭，点击周围也可关闭
FreeDialog.tips('两秒后我会自动关闭');

// 例2：弹出一个两行文本的气泡，三秒后自动关闭
FreeDialog.tips(['三秒后我会自动关闭', '这是第二行内容'], 3000);
```

### 2. `FreeDialog.alertDialog`的使用

```js
/**
 * FreeDialog.alert(content, [title, closeCallback]);
 * 弹出一个带有确定键的提示对话框，点击确定后提示框关闭
 * @param content 对话框内的文本内容、DOM或二者的数组
 * @param title 对话框的标题（可缺省）
 * @param closeCallbak 关闭对话框时的回调函数（可缺省，只在当次调用时有效）
 */
 
// 例3：弹出一个提示框，点击确定或右上角X键可关闭
FreeDialog.alert('点击确定可以关闭');

// 例4：弹出一个提示框，关闭后刷新页面
FreeDialog.alert('关闭对话框后将刷新页面', '提示', function () {
    window.location.reload();
});

// 例5：弹出一个自定义标题的提示框，内容中第一行为文本，第二行为页面上某个元素
var dom = document.getElementById('something');
FreeDialog.alert(['你好啊！', dom], '自定义的标题');
```

### 3. `FreeDialog.askDialog`的使用

```js
/**
 * FreeDialog.ask(content, yesCallback, noCallback);
 * 弹出一个带有确定和取消键的询问对话框，点击确定或取消后执行对应回调函数
 * @param content 对话框内的文本内容、DOM或二者的数组
 * @param yesCallback 点击确定时的回调函数
 * @param noCallback 点击取消时的回调函数
 */

// 例6：弹出一个询问框，点取消时阻止关闭，点确定时才可关闭
FreeDialog.ask('你确定要关闭这个对话框吗？', 
    function(){         // 点击确定键的回调函数
        FreeDialog.tips('关闭了。');
    }, 
    function(){         // 点击取消键的回调函数
        FreeDialog.tips('关闭被阻止。');
        return false;   // 返回false可阻止默认关闭行为
    }
);
```

# III. 扩展篇

### 1. 实例化新的自定义对话框

`FreeDialog`内置的三个对话框都是`FreeDailog`类的对象，通过实例化新的`FreeDialog`对象，配置不同的属性即可增加新的自定义对话框了。

构造函数接受一个初始化参数`options`，参数字段说明如下：

```js
var options = {
	title: '提示',                          // 对话框标题（可缺省，缺省时默认不显示标题栏）
	content: '对话框内容',                  // 对话框内的文本内容、DOM或两者的数组
	footBtns: {                             // 底部按键对象或数组（可缺省，缺省时不显示底部按键栏）
		name: '确定',                   // 按键文本内容
		extraClass: null,               // 按键额外的CSS Class（可缺省）
		click: function (e) {}          // 按键点击时的回调函数（函数内this指向当前FreeDialog对象）
	},
	lock: true,                             // 对话框出现时是否显示底部黑色遮罩，并阻止拖动屏幕操作（可缺省，默认为true）
	withCloseBtn: true,                     // 右上角是否显示关闭键（可缺省，默认为true）
	clickAroundClose: true,                 // 点击对话框四周是否关闭对话框（可缺省，默认为false）
	skin: 'skin-orange'                     // 默认皮肤的className（可缺省）
};
var dialog = new FreeDialog(options);           // 实例化对话框对象
```

### 2. 修改对话框对象的属性

通过上面实例化得到的对话框对象`dialog`，我们可以做一些操作来修改已有的属性，常用操作如下：

```js
// 关闭按键相关
dialog.hideCloseBtn();                          // 隐藏对话框关闭按键
dialog.showCloseBtn();                          // 显示对话框关闭按键
```

```js
// 背景遮罩相关
dialog.lock();                                  // 锁定对话框背景遮罩
dialog.unblock();                               // 解除对话框背景遮罩
```

```js
// 标题相关
dialog.setTitle('新的标题');                    // 修改对话框标题文本内容
dialog.hideTitle();                             // 隐藏对话框标题栏
dialog.showTitle();                             // 显示对话框标题栏
```

```js
// 内容相关
dialog.setContent('新的内容');                  // 修改对话框内容，与初始化时一样，可为需要设置的文本内容、DOM或两者的数组
```

```js
// 底部按键栏相关
var newBtns = [
	{
		name: '按键1',
		click: function(e) {}
	},
	{
		name: '按键2',
		click: function(e) {}
	}
];

dialog.setFootBtns(newBtns);                    // 修改对话框底部按键
dialog.hideFooter();                            // 隐藏对话框底栏和内部按键
dialog.showFooter();                            // 显示对话框底栏和内部按键
```

```js
// 皮肤相关
dialog.setSkin('skin-orange');
dialog.setSkin();                               // 设置对话框皮肤（为空时撤销现有皮肤）
```

```js
// 呼出显示、收起关闭相关
dialog.show();                                  // 呼出显示对话框
window.setTimeout(function(){
	dialog.close();                         // 收起关闭对话框
}, 3000);
```

内置的三个种对话框对象`FreeDialog.tipsDialog`, `FreeDialog.alertDialog`, `FreeDialog.askDialog`也可以通过上述方法进行操作。

### 3. 为对话框对象增加事件监听器

目前`FreeDialog`提供四种类型事件的监听，分别为`beforeclose`、`close`、`beforeopen`和`open`，通过调用对象的`on`方法，传入事件类型和对应回调函数即可绑定。

```js
// 示例代码：
dialog.on('beforeclose', function(e) {
	// To do something.
});
```

`beforeclose`事件在对话框即将关闭时被触发，回调函数返回`false`可以阻止事件传给后续的`beforeclose`回调函数，并阻止对话框的关闭。

`close`事件在对话框关闭后被触发，回调函数返回`false`可以阻止事件传给后续的`close`回调函数。

`beforeopen`事件在对话框即将呼出时被触发，回调函数返回`false`可以阻止事件传给后续的`beforeopen`回调函数，并阻止对话框的呼出。

`open`事件在对话框关闭后被触发，回调函数返回`false`可以阻止事件传给后续的`open`回调函数。

### 4. 添加新的对话框皮肤

`FreeDialog`的`CSS`样式是使用`SASS`编写的，可以通过修改源码中的`SCSS`重新编译，或直接修改需要的`CSS`文件来添加新的对话框皮肤样式。

如增加一个名为`skin-gray`的皮肤样式，可以通过添加`.dialog-wrapper.skin-gray`及其下子节点（主要是`.dialog-container`、`.dialog-header`、`.dialog-body`、`.dialog-footer`和`dialog-btn`）的新样式来进行皮肤定制。

# IV. 参考篇：

### 1. 内置对话框的实现

```js
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
```

### 2. 内置皮肤的实现

```scss
/* SCSS 代码 */
.dialog-wrapper {
    &.skin-bubble {
        .dialog-container {
            border: 1px solid #EDECEC;
            @include prefixer(box-shadow, 0 2px 5px #999999, webkit spec);
        }
    }

    &.skin-orange {
        .dialog-btn {
            &[closeBtn] {
                background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1QjEzMDEzOTA2RjVFMzExQTA4NERCRDIxMDNGQUE4QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QzkyQzEzMUY2MjYxMUU0OTQxNDlFNjE2MUNGRDIxMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QzkyQzEzMEY2MjYxMUU0OTQxNDlFNjE2MUNGRDIxMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQxMUI1MTdEN0VGNUU0MTFBRjgyRkYwQkI0OTUyNjVBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVCMTMwMTM5MDZGNUUzMTFBMDg0REJEMjEwM0ZBQThCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+JcN5CQAAANNJREFUeNqsk00KwjAQhSfFtXcRPIhHEQ+giHtLde+VPIvuJb5BFyHk5yWTgdfQNP0+Cn3Oe78TkQ1yknHjkCuynnDZIkdkHghfkD3yFnyBQ2b/G13FEGXd/ixdXfjQKlH4PYTrfnyoV5KEpwQ9kiw8J2iRFOElASOpwmuCkoSCM4KUhIazglhCw1sEoYSGa6aG+q+C+w/iqTc7/vOmnvSWiJZYSkRJxFIiRmKBUxIrvCoZAS9KRsGzkpHwpCTcGAGPJRcFPlDoF3Kg68/NGXl+BRgAthr/1T40nrQAAAAASUVORK5CYII=) no-repeat scroll center center;
                background-size: 12px 12px;
                &:active, &.active {
                    background-color: rgba(black, 0.1);
                }
            }
        }

        .dialog-header {
            height: 46px;
            line-height: 46px;
            padding: 0;
            background-color: #EF713D;
            font-size: 15px;
            text-align: center;
            color: white;
        }
        .dialog-body {
            padding: 28px 32px;
        }

        .dialog-footer {
            .dialog-btn {
                color: #EB662D;
                &.nagtive {
                    color: #999999;
                }
                &:active, &.active {
                    background-color: #F6F6F6;
                }
            }
        }
    }
}
```

```css
/* CSS代码 */
.dialog-wrapper.skin-bubble .dialog-container {
    border: 1px solid #EDECEC;
    -webkit-box-shadow: 0 2px 5px #999999;
    box-shadow: 0 2px 5px #999999;
}
.dialog-wrapper.skin-orange .dialog-btn[closeBtn] {
    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1QjEzMDEzOTA2RjVFMzExQTA4NERCRDIxMDNGQUE4QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QzkyQzEzMUY2MjYxMUU0OTQxNDlFNjE2MUNGRDIxMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QzkyQzEzMEY2MjYxMUU0OTQxNDlFNjE2MUNGRDIxMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQxMUI1MTdEN0VGNUU0MTFBRjgyRkYwQkI0OTUyNjVBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVCMTMwMTM5MDZGNUUzMTFBMDg0REJEMjEwM0ZBQThCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+JcN5CQAAANNJREFUeNqsk00KwjAQhSfFtXcRPIhHEQ+giHtLde+VPIvuJb5BFyHk5yWTgdfQNP0+Cn3Oe78TkQ1yknHjkCuynnDZIkdkHghfkD3yFnyBQ2b/G13FEGXd/ixdXfjQKlH4PYTrfnyoV5KEpwQ9kiw8J2iRFOElASOpwmuCkoSCM4KUhIazglhCw1sEoYSGa6aG+q+C+w/iqTc7/vOmnvSWiJZYSkRJxFIiRmKBUxIrvCoZAS9KRsGzkpHwpCTcGAGPJRcFPlDoF3Kg68/NGXl+BRgAthr/1T40nrQAAAAASUVORK5CYII=) no-repeat scroll center center;
    background-size: 12px 12px;
}
.dialog-wrapper.skin-orange .dialog-btn[closeBtn]:active, .dialog-wrapper.skin-orange .dialog-btn[closeBtn].active {
    background-color: rgba(0, 0, 0, 0.1);
}
.dialog-wrapper.skin-orange .dialog-header {
    height: 46px;
    line-height: 46px;
    padding: 0;
    background-color: #EF713D;
    font-size: 15px;
    text-align: center;
    color: white;
}
.dialog-wrapper.skin-orange .dialog-body {
    padding: 28px 32px;
}
.dialog-wrapper.skin-orange .dialog-footer .dialog-btn {
    color: #EB662D;
}
.dialog-wrapper.skin-orange .dialog-footer .dialog-btn.nagtive {
    color: #999999;
}
.dialog-wrapper.skin-orange .dialog-footer .dialog-btn:active, .dialog-wrapper.skin-orange .dialog-footer .dialog-btn.active {
    background-color: #F6F6F6;
}
```

> Edit at: 2015/05/20
> 
> Version: 1.34
