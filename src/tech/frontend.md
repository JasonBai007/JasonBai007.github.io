# 前端技术

::: tip 前言
工欲善其事，必先利其器
:::

## 深拷贝的另一种选择

简单易用的深拷贝方法：

```js
const clone = JSON.parse(JSON.stringify(obj));
```

另外一种原生方法：

```js
const clone = structuredClone(obj);
```

## 省市区数据

已汇总到我的 Gitee 代码仓库 [area](https://gitee.com/lubanseven/area)中的 dist 文件夹

- 原始数据来自 [Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China)

- 港澳台数据来自 [ChinaProvinceCityJsonData](https://github.com/wu-jianyong/ChinaProvinceCityJsonData)

- 移动端级联选择器 [vue-pickers](https://www.npmjs.com/package/vue-pickers)

## replace 高级用法

```js
let str = "aaabbbcccddd";

// match是当前匹配的子串，
// $1是指第1个括号匹配的字符串，
// 以此类推，参数还有$2,$3...，如果正则表达式里有多个小括号
let newStr = str.replace(/(\w{3})/g, (match, $1) => {
  return $1 + "-";
});

console.log(newStr);
```

## 前端下载文件流

```js
this.$axios.get("downloadUrl").then((res) => {
  // 在内存中创建一个下载链接
  let url = window.URL.createObjectURL(new Blob([res]));
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", "文件名.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
});
```

## 自己关闭自己

```js
// 这个方法只能关闭由 JavaScript 打开的窗口。
// 如果当前页面是由用户手动打开的或者是浏览器的默认首页，那么这个方法将无效。
window.close();

// 以下方法不好使！不用再试了！
// window.open("about:blank", "_self").close();
```

## 自己删除自己

```js
let element = document.getElementById("myElement");
// 方法一：通过父节点删除自身
element.parentNode.removeChild(element);
// 方式二：直接删除
element.remove();
```

## 前端 base64 转换

base64 的转化是`双向的`，md5 是`单向的`

```js
let base64Str = window.btoa("good luck"); // Z29vZCBsdWNr
let originStr = window.atob("Z29vZCBsdWNr"); // good luck

// 兼容中文的base64转换
let base64Str = window.btoa(unescape(encodeURIComponent("你好")));
let originStr = decodeURIComponent(escape(window.atob("5L2g5aW9")));
```

## 复制内容的两种方法

::: warning
clipboard 仅能在 https 协议或 localhost 下使用！
:::

```js
// 推荐方式
navigator.clipboard.writeText("Hello, Friday").then(() => alert("复制成功"));

// 传统方式
function copyText(text) {
  const el = document.createElement("input");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("复制成功");
}
```

## 将文件变成内存地址，实现本地预览

> - createObjectURL 返回一段带 hash 的 url，并且一直存储在内存中，直到 document 触发了 unload 事件（例如：document close）或者执行 revokeObjectURL 来释放。
> - FileReader.readAsDataURL 则返回包含很多字符的 base64，并会比 blob url 消耗更多内存，但是在不用的时候会自动从内存中清除（通过垃圾回收机制）
> - 使用 createObjectURL 可以节省性能并更快速，只不过需要在不使用的情况下手动释放内存
> - 如果不太在意设备性能问题，并想获取图片的 base64，则推荐使用 FileReader.readAsDataURL

```js
// 首先通过饿了么upload组件，取消自动上传，上传文件，change方法里拿到file对象

// 通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL，并且是同步的
let _url = URL.createObjectURL(file.raw);
image.url = _url;
```

## object 标签的父子窗口通信

借助`postMessage()`方法，我们可以实现 object 或 iframe 与父级窗口之间的通信。

```html
<!-- 父级窗口中使用<object>标签引入子级窗口 -->
<body>
  <!-- 子级窗口 -->
  <object
    data="http://127.0.0.1:5501/index.html"
    width="100%"
    height="100%"
    id="childWin"
  ></object>
  <script>
    // 监听子窗口传递过来的数据
    window.addEventListener("message", (e) => {
      console.log("I am from Children: ", e.data);
    });
    // 向子窗口发送数据
    setInterval(() => {
      // 获取到子窗口的window对象
      document
        .querySelector("#childWin")
        .contentWindow.postMessage("Hello from Father", "*");
    }, 3000);
  </script>
</body>
```

::: warning 注意
window.parent 获取上一级的窗口  
window.top 获取最顶级的窗口
:::

```html
<!-- 子级窗口 -->
<body>
  <div>child page</div>
  <script>
    // 在子窗口中监听从父级中传过来的数据
    window.addEventListener("message", (e) => {
      console.log(e.data);
    });
    // 向父级窗口中发送数据
    setInterval(() => {
      // 通过window.parent获得父级窗口的window对象
      window.parent.postMessage("Hi from Children", "*");
    }, 3000);
  </script>
</body>
```

## 遥控隔壁标签页刷新

在页面 A 中，打开页面 B，借助`postMessage()`控制页面 B 刷新

```js
// 页面A
let opener = window.open(pageBUrl);
opener.postMessage("refreshPage", "*");

// 页面B，在打开的瞬间监听message事件
window.addEventListener("message", (e) => {
  if (e.data === "refreshPage") {
    location.reload();
  }
});
```

## 正则匹配 script 标签

- `.`匹配除换行符以外的字符
- `(.|\n)*`表示匹配任意数量的任意字符
- 量词\*后面的`?`，表示非贪婪匹配
- `[^>]`表示除>意外的任意字符

```js
`<div id="myPage">
  {{ message }}
</div>

<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.0/vue.js"></script>
<script>
  var app = new Vue({
    el: '#myPage',
    data: {
      message: 'Hello Free Page!'
    }
  })
</script>`.match(/<script[^>]*>(.|\n)*?<\/script>/g);
```

## 数组随机排序

```js
const randomArr = (arr) => arr.sort(() => Math.random() - 0.5);
```

## 生成随机颜色

```js
const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
```

## 滚动到顶部/底部

```js
// 整个页面滚动到顶部
document.body.scrollIntoView({ behavior: "smooth", block: "start" });
// 整个页面滚动到底部
document.body.scrollIntoView({ behavior: "smooth", block: "end" });
```

## 获取 url 中的参数

```js
// 在地址栏里拿到 '?someKey=someValue'
let queryStr = new URL(location.href).search;
let params = new URLSearchParams(queryStr);
// 获取其中一个参数
params.get("someKey");
// 显示键/值对
for (var pair of params.entries()) {
  console.log(pair[0] + ", " + pair[1]);
}
```

## 使用原生 fetch 请求数据

借助`fetch`，我们可以摆脱对`axios`的依赖

```js
fetch("http://example.com/movies.json")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

一个更全面的示例：

```js
// fetch(url,options) 返回promise对象
fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then((response) => response.json());
}
```

## DOM 节点转数组

```js {4}
// 获取节点集合
let domCollection = document.getElementByTagName("script");
// 将集合转为数组
let domArr = Array.from(domCollection);
// 这样就可以遍历这些节点了
domArr.forEach((node) => console.log(node.src));
```

## 前端换肤的方案探索

关于前端换肤，有两种需求场景：

1. 只可以切换**固定几套**主题色
2. 用户可以**随便选择色值**，更改主题色

可以参考掘金上的这篇文章：[前端主题切换方案](https://juejin.cn/post/7134594122391748615)

针对**第二种场景**，自由换肤，可以参考我的个人开源项目：[theme-starter](https://github.com/JasonBai007/theme-starter) 的 README

## JS 拦截 Ctrl+S 事件

```js
//js监听键盘ctrl+s快捷键保存
document.addEventListener("keydown", (e) => {
  // 判断：S键被按下，并且之前也按下了Ctrl键
  if (
    e.keyCode == 83 &&
    (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
  ) {
    e.preventDefault();
    alert("saved");
  }
});
```

## 循环中调用异步函数

1. 需要使用朴实无华的 for 循环和 async 新秀

```js
function func(i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(i);
      resolve(i);
    }, 2000);
  });
}

// for循环放到async函数内
async function circle() {
  for (let index = 0; index < 3; index++) {
    await func(index);
  }
}

circle();
```

## sleep 函数的两种实现方式

1. 页面可以正常操作，渲染，不会卡死！

```js
// 异步版，返回一个promise，在指定时间后resolve
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 使用示例：需要在async函数中使用
async function myFunc() {
  console.log(11);
  await sleep(4000);
  console.log(22);
}
myFunc();
```

2. 注意：页面直接卡死！！！

```js
// 同步版，借助while循环实现线程阻塞
const sleep = (time) => {
  let start = new Date();
  while (new Date() - start < time) {
    continue;
  }
};
// 使用示例：
function testSleep() {
  console.log(11);
  sleep(4000);
  console.log(22);
}

testSleep();
```

## 生成随机字符串

```javascript
Date.now().toString(36);
```

## 获取数组最后一个值

```javascript
// IE浏览器和安卓的Opera不支持！但是Edge浏览器支持
array.at(-1);

// 传统方法
array.slice(-1)[0];
```

## reduce 方法使用示例

```javascript
// array.reduce(累加函数，初始值)
[1, 2, 3].reduce((pre, cur) => pre + cur, 0); // 6

// 1个元素
[1].reduce((pre, cur) => pre + cur, 0); // 1

// 0个元素时，必须传入初始值
[].reduce((pre, cur) => pre + cur, 0); // 0

// 复杂示例：pre不加.val，cur加
[
  { name: "a", val: 3 },
  { name: "b", val: 4 },
].reduce((pre, cur) => pre + cur.val, 0); // 7
```

## 控制台获取上次执行结果

```javascript
1 + 1;
// 2

$_ * 10;
// 20
```

## 移动端调试

1. 手机与电脑连接同一个 wifi，表示在同一局域网下
2. 通过 ipconfig 查看电脑本机 ipv4 地址 （xxx.xxx.xx.xxx）
3. 设置开发环境的 host 为 4 个 0，表示访问你电脑上的任何一个 Ip，都能访问的到你的前端服务
4. 在手机上访问 xxx.xxx.xx.xxx:port，直接访问正在开发的页面

```javascript
devServer: {
  host: "0.0.0.0"; // 表示前端服务在所有本机IP上监听
}
```

## 让你的网页飘花瓣

```html
<!-- 直接引入 -->
<script src="https://cdn.jsdelivr.net/gh/yremp/yremp-js@1.5/sakura.js"></script>

<!-- 动态引入 -->
<script>
  let _js = document.createElement("script");
  _js.src = "https://cdn.jsdelivr.net/gh/yremp/yremp-js@1.5/sakura.js";
  document.head.appendChild(_js);
</script>
```

## Npm 不常用操作

### 批量升级项目依赖包

```sh
# 首先，全局安装 npm-check-updates
npm install -g npm-check-updates

# 检查所有依赖的版本
ncu

# 一键更新所有依赖
ncu -u

# 单独升级vue
ncu
```

### 清空 npm 缓存

```sh
npm cache clean -f
```

### 更改 npm 镜像源

```bash
# 安装依赖时，临时使用淘宝镜像源【非常有用】
npm install --registry https://registry.npm.taobao.org
# 改成淘宝镜像源
npm config set registry https://registry.npm.taobao.org
# 改回官方镜像源
npm config set registry https://registry.npmjs.org
```

### 查看模块版本列表

```bash
# 查看版本列表
npm view vue versions
# 查看某个模块的信息
npm view vue
```

### 安装 node-sass 模块

```bash
# 因为 node-sass 模块被墙掉了
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
# 再安装别的依赖
npm i
```

### 设置 electron 镜像源

```bash
# npm
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
# yarn
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/
```

## Git 不常用操作

### 临时缓存本地修改的文件

本地文件修改了一半儿，要切到别的分支修改代码。这时候可以：

```bash
# 缓存开发了一半儿的本地文件，-u是指包括新建的文件
git stash -u
# 分支切换回来后，再弹出缓存的文件到工作区
git stash pop
```

### 撤销（反做）以前的某次提交记录

```bash
# 撤销以前的某次提交<HashA>，反做某次提交<HashA>
git revert <HashA>
# 提交
git push
```

### 版本回退到某次提交记录

```bash
# 版本回退到某次提交<HashA>
git reset --hard <HashA>
# 强制提交，远程仓库的<HashA>之后的几次提交记录就消失了
git push -f
```

### 挑选别的分支中的某次提交到当前分支

```bash
# 首先，切换到master分支
git checkout master

# 挑选dev分支上的<HashA>，到master分支上
git cherry-pick <HashA>

# 挑选多个提交到master
git cherry-pick <HashA> <HashB>

# 如果要摘取的提交是个合并节点，需要添加m参数，值设为1
# 通常1号父分支是接受变动的分支，2号父分支是作为变动来源的分支
git cherry-pick -m 1 <HashA>

# 在提交信息的末尾追加一行(cherry picked from commit ...)，方便以后查到这个提交是如何产生的。
git cherry-pick -x <HashA>

# 撤销最近一次cherry-pick操作
git cherry-pick --abort
```

### 提交日志筛选

```bash
# 筛选出作者是Jason，3月1日之后的提交记录
git log --oneline --author="Jason" --since=2023-03-01

# 筛选出3月1日之后的提交记录，过滤掉merge记录，并设置格式为：hash值;提交title;作者;绝对时间
# 例如：92c64cc7d;fix: 解决/和查询字符串的各种场景;Jason Bai;Wed Apr 26 11:51:03 2023 +0800
git log --oneline --no-merges --since=2023-03-01 --pretty=format:"%h;%s;%an;%ad"
```
