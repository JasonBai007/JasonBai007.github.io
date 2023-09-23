# 样式技巧

::: tip 前言
人靠衣装，美靠 CSS
:::

## 项目代码格式化风格统一

1. 在项目根目录新建配置文件：`.prettierrc.json`
2. 配置 VSCode 的默认格式化插件：`Prettier`
3. 这样项目组的所有开发者格式化代码的时候，都可以按照一套标准格式化

```json
{
  "printWidth": 200,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "bracketSameLine": true,
  "arrowParens": "always",
  "htmlWhitespaceSensitivity": "ignore"
}
```

## 全屏的简单实现

```js
// 以下代码只兼容谷歌浏览器
let dom = document.querySelector("#yourDomNode");
// 判断当前是否是全屏模式
if (document.fullscreen) {
  // 网页退出全屏
  document.exitFullscreen();
} else {
  // DOM展开为全屏
  dom.requestFullscreen();
}
```

## 子元素撑开父元素

```css
/* 方式一：设置父元素inline-block属性，借助inline特性，根据子元素内容撑开自己 */
.father {
  display: inline-block;
}

/* 方式二：设置爷爷元素flex，这样，父元素的宽度也会根据子元素撑开 */
.grandpa {
  display: flex;
}
```

## 文字渐变效果

```css
h1 {
  background: linear-gradient(to right, #color1, #color2);
  /* 指定背景的绘制区域 */
  -webkit-background-clip: text;
  /* 指定文字的填充颜色，透明，漏出渐变底色 */
  -webkit-text-fill-color: transparent;
}
```

## 前端实现打印分页功能

```css
/* js打印使用window.print()即可 */
/* 针对打印的样式，以下两种方法，任选一种就可以分页 */
@media print {
  /* 在最后一行分页 */
  .last-row {
    page-break-after: always;
  }
  /* 在此另起一页 */
  .begin {
    page-break-before: always;
  }
}
```

## 你可能并不需要颜色选择器组件

浏览器就自带颜色选择器：<input type="color" value="#000000" />

```html
<input type="color" value="#000000" />
```

## 监听鼠标滚轮实现横向滚动

```js
mounted() {
  this.bindEvent();
},
methods: {
  bindEvent() {
    let gallery = document.querySelector(".gallery");
    gallery.addEventListener("wheel", (e) => {
      // 阻止默认滚动
      e.preventDefault();
      gallery.scrollLeft += e.deltaY;
    });
  },
}
```

## Scroll Snap 滚动优化

```css
/* scroll-snap-type: none | [ x | y | block | inline | both ] [ mandatory | proximity ] */
/* 设置容器属性，在横轴方向上，强制让内部元素滚动后对齐某个边界 */
.container {
  scroll-snap-type: x mandatory;
}
/* 内部滚动的元素，设置对齐哪个边界：start | center | end */
.item {
  scroll-snap-align: start;
}
```

## 一行 CSS 实现实现返回顶部

```css
html,
body {
  scroll-behavior: smooth;
}
```

## 一行代码让网站变灰

<button onClick="document.documentElement.style.filter = 'grayscale(100%)'">变灰</button>
<button onClick="document.documentElement.style.filter = 'unset'">彩色</button>

```css
html {
  filter: grayscale(100%);
}
```

```javascript
document.documentElement.style.filter = "grayscale(100%)";
```

## 自动播放背景音乐

<audio src="/windyhill.mp3" controls autoplay></audio>

由于浏览器的安全限制，我们在打开页面时几乎无法实现自动播放音乐，除非播放器静音，但也就没有了意义。直到发现好友轻松实现了这种效果。
仔细测试发现，只有这种情况下可以：

1. 封皮页面 A，超链接到页面 B
2. 页面 B 设置了自动播放音乐
3. 页面 A 和页面 B **必须同域**

## 点击选中所有文字

<p style="user-select: all">点我一下，选中所有，因为我使用了 user-select: all</p>

## CSS 动画保留最后一帧

CSS3 的动画效果，默认是只是执行动画的时候赋予动画样式，动画开始前和结束后，动画样式都会清除。如果想保留动画的最后一帧样式，也就是保留动画结束时的状态，我们可以对元素设置如下样式：

```css
/* 把物体动画地从一个地方移动到另一个地方，并让它停留在那里 */
animation-fill-mode: forwards;
```

## 仅用 CSS 实现科技边框效果

<p class="du corner">独行月球</p>

<style>
  .du {
    padding:20px;
    text-align:center;
    font-weight: bold;
  }
  .corner {
    --corner-color: #29e2fc;
    --corner-width: 0.25rem;
    --corner-size: 1rem;
    --corner-radius: 0;
    --corner-bg: rgba(0, 0, 0, 0.1);
    background: linear-gradient(to left, var(--corner-color), var(--corner-color)) left top no-repeat, 
      linear-gradient(to bottom, var(--corner-color), var(--corner-color)) left top no-repeat,
      linear-gradient(to left, var(--corner-color), var(--corner-color)) right top no-repeat, 
      linear-gradient(to bottom, var(--corner-color), var(--corner-color)) right top no-repeat,
      linear-gradient(to left, var(--corner-color), var(--corner-color)) left bottom no-repeat, 
      linear-gradient(to bottom, var(--corner-color), var(--corner-color)) left bottom no-repeat,
      linear-gradient(to left, var(--corner-color), var(--corner-color)) right bottom no-repeat, 
      linear-gradient(to left, var(--corner-color), var(--corner-color)) right bottom no-repeat;
    background-size: var(--corner-width) var(--corner-size), var(--corner-size) var(--corner-width), var(--corner-width) var(--corner-size), var(--corner-size) var(--corner-width);
    background-color: var(--corner-bg);
    border-radius: var(--corner-radius);
  }
</style>

```css
/* 仅需要调整变量值，就可以设置不同的边框 */
.corner {
  --corner-color: #29e2fc;
  --corner-width: 0.25rem;
  --corner-size: 1rem;
  --corner-radius: 0;
  --corner-bg: rgba(13, 11, 26, 0.1);
  background: linear-gradient(to left, var(--corner-color), var(--corner-color))
      left top no-repeat, linear-gradient(
        to bottom,
        var(--corner-color),
        var(--corner-color)
      ) left top no-repeat,
    linear-gradient(to left, var(--corner-color), var(--corner-color)) right top
      no-repeat, linear-gradient(
        to bottom,
        var(--corner-color),
        var(--corner-color)
      ) right top no-repeat,
    linear-gradient(to left, var(--corner-color), var(--corner-color)) left bottom
      no-repeat, linear-gradient(
        to bottom,
        var(--corner-color),
        var(--corner-color)
      ) left bottom no-repeat,
    linear-gradient(to left, var(--corner-color), var(--corner-color)) right bottom
      no-repeat, linear-gradient(
        to left,
        var(--corner-color),
        var(--corner-color)
      ) right bottom no-repeat;
  background-size: var(--corner-width) var(--corner-size), var(--corner-size) var(
        --corner-width
      ), var(--corner-width) var(--corner-size), var(--corner-size) var(
        --corner-width
      );
  background-color: var(--corner-bg);
  border-radius: var(--corner-radius);
}
```

## 毛玻璃效果

火狐（PC 和 Mobile）、IE 不支持

```css
div {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(3px); /* 重点样式 */
}
```

## CSS 实现打字效果

<p class="typing-effect">让我们一起玩技术！</p>

<style>
  .typing-effect {
    width: 19ch;
    height: 22px;
    line-height: 22px;
    border-right: 2px solid;
    animation: typing 3s steps(9) infinite, shine .5s step-end infinite alternate;
    overflow: hidden;
  }
  @keyframes typing {
    from {
      width: 0;
    }
  }
  @keyframes shine {
    50% {
      border-color: transparent;
    }
  }
</style>

```css
/**
  <p class="typing-effect">让我们一起玩技术！</p > 
*/
.typing-effect {
  width: 19ch; /* 1ch = 0的宽度 = 半个汉字的宽度 */
  height: 22px;
  line-height: 22px;
  white-space: nowrap;
  border-right: 2px solid;
  animation: typing 3s steps(9) infinite, shine 0.5s step-end infinite alternate;
  overflow: hidden;
}
@keyframes typing {
  from {
    width: 0;
  }
}
@keyframes shine {
  50% {
    border-color: transparent;
  }
}
```

## 使用 attr()从 DOM 中取值

```css
/* <p data-length="9" class="txt">some text</p> */

.txt::after {
  content: attr(data-length); /* 从DOM中取值 */
}
```

## 单行省略号

<p style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;" title="Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。">Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。</p>

```css
p {
  overflow: hidden;
  white-space: nowrap; /*禁止换行*/
  text-overflow: ellipsis; /*省略号*/
}
```

## 多行省略号 <Badge text="只适用于webkit浏览器或者移动端" type="warning"/>

<p style="overflow:hidden; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; text-overflow:ellipsis;" title="Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。">Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。</p>

```css
p {
  overflow: hidden;
  display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示*/
  -webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/
  -webkit-line-clamp: 2; /*限制在一个块元素显示的文本的行数*/
  text-overflow: ellipsis;
}
```

## 文本块两端对齐并居中

<p style="text-align: justify;text-align-last: center;">Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。</p>

```css
p {
  text-align: justify; /*两端对齐*/
  text-align-last: center; /*最后一行居中对齐*/
}
```

## 渐进式 JPEG

JPEG 文件格式有两种保存方式：`Baseline JPEG` 和 `Progressive JPEG`

- 第一种格式在页面上显示的时候是从上到下显示。
- 第二种格式则是从模糊到清晰的显示出来。 <Badge text="推荐" type="tip" vertical="middle"/><br>

使用 Photoshop 存储为 web 所用格式的时候，勾选【**连续**】，即可保存为渐进式的图片
