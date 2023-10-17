# Vue 技巧

::: tip 前言
工欲善其事，必先利其器
:::

## 一款插件实现 office 文件在线预览

[vue-office](https://501351981.github.io/vue-office/examples/docs/)支持 **word(.docx)、excel(.xlsx)、pdf** 等各类型 office 文件预览的 vue 组件集合，提供一站式 office 文件预览方案，**支持 vue2 和 3，也支持 React 等非 Vue 框架。**

## 实现只加载一次 JS 文件

- 不能单纯的判断是否已经插入了 script 标签，因为对应的 js 文件还没下载完。
- 所以还需要一个全局的变量 `isFileLoaded`，在最外层判断是否下载完。
- 同时还需要一个执行队列 `exeStack`，用来盛放待执行的函数。
- js 文件一旦下载完，就一次性执行队列里面的函数

```js
mounted() {
    // 只初始化一次执行队列
    if (!window.exeStack) window.exeStack = []
    this.insertScript()
},
methods: {
    insertScript() {
        // 如果js文件没有加载
        if (!window.isFileLoaded) {

            // 这时候需要把初始化函数推到一个队列里
            window.exeStack.push(this.init)

            // 开头肯定没有这个script标签，下面的逻辑只执行一次
            // 执行完后，就有这个script标签了，所以，不可能执行第二次
            if (!document.querySelector('.myScript')) {
                let scriptDom = document.createElement('script')
                scriptDom.src = "/path/yourJsFile.js"
                scriptDom.classList.add('myScript')
                // 这时候html里就有这个script标签了
                document.head.appendChild(scriptDom)

                // 第一次执行的时候，绑定onload事件，因为外层只执行一次，所以onload事件也只执行一次
                scriptDom.onload = () => {
                    // 一旦脚本下载下来，标记全局变量，这样最外层的if判断就只执行else分支了
                    window.isFileLoaded = true
                    // 一次性执行下方的执行队列
                    window.exeStack.forEach(func => func())
                }
            }
        } else {
            // 如果已经加载了，就直接初始化实例
            this.init()
        }
    },
    // 依赖已经加载的js文件，初始化实例
    init() {}
}
```

## 自定义 vue 代码片段

**VS Code** 左下角`齿轮` > `User Snippets` > `vue.json`，替换成以下内容：

```json
{
  "Print to console": {
    "prefix": "vue2",
    "body": [
      "<template>",
      "  <div class='myComponent-wrap'></div>",
      "</template>",
      "",
      "<script>",
      "export default {",
      "  name: 'myComponent',",
      "  components: {},",
      "  props: {},",
      "  data() {",
      "    return {};",
      "  },",
      "  computed: {},",
      "  mounted() {},",
      "  methods: {},",
      "  watch: {},",
      "};",
      "</script>",
      "",
      "<style scoped lang='scss'>",
      ".myComponent-wrap {",
      "}",
      "</style>"
    ],
    "description": "vue2快速新建模板"
  }
}
```

## 手动双向绑定

1. 使用默认变量实现双向绑定

```html
<template>
  <div>
    <span>{{ value }}</span>
    <button @click="decrease">-</button>
    <button @click="increase">+</button>
  </div>
</template>

<script>
  // 使用示例：
  // <count v-model="num"></count>
  export default {
    name: "count",
    props: ["value"], // 默认是value，需要在props中声明
    data() {
      return {};
    },
    methods: {
      increase() {
        // 需要构建新值
        let v = this.value + 1;
        // 使用默认input事件，把新值传给父级组件
        // vue3中的事件名变成：update:modelValue
        this.$emit("input", v);
      },
      decrease() {
        let v = this.value - 1;
        // vue3中的事件名变成：update:modelValue
        this.$emit("input", v);
      },
    },
  };
</script>
```

2. 自定义变量实现双向绑定

```html
<template>
  <div>
    <span>{{ val }}</span>
    <button @click="decrease">-</button>
    <button @click="increase">+</button>
  </div>
</template>

<script>
  // 使用示例：
  // <count v-model="num"></count>
  export default {
    name: "count",
    model: {
      prop: "val", // 自定义变量名
      event: "changeVal", // 自定义事件名
    },
    props: ["val"], // 需要在props中声明
    data() {
      return {};
    },
    methods: {
      increase() {
        // 需要构建新值
        let v = this.val + 1;
        // 使用changeVal事件，把新值传给父级组件
        this.$emit("changeVal", v);
      },
      decrease() {
        let v = this.val - 1;
        this.$emit("changeVal", v);
      },
    },
  };
</script>
```

## 事件传参

如果需要拿到事件对象

```html
<!-- 第一个参数是事件对象，第二个参数是自定义数据 -->
<button @click="handleClick($event, item)"></button>
```

```js
// 第一个参数是事件对象，第二个参数是自定义数据
handleClick(e,item) {
  e.preventDefault()
}
```

## 批量注册全局组件

新增一个文件：`/components/register.js`

```js
import Vue from "vue";
// require.context返回一个函数，可以加载文件模块
const requireComponent = require.context("./", false, /\.vue$/);

requireComponent.keys().forEach((fileName) => {
  // 加载某个组件，获取组件配置
  const componentConfig = requireComponent(fileName);
  // 提取文件名，原始的fileName是这种格式：./ErrorPage.vue
  const componentName = fileName
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");
  // 全局注册组件
  Vue.component(componentName, componentConfig.default || componentConfig);
});
```

在`main.js`中引入，即可批量全局注册组件

```js
import "@/components/register";
```

## Vue 动态插槽技术

```html
<!-- 在自己封装的子组件中 -->
<template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
  <slot :name="name" v-bind="data"></slot>
</template>
```

说明：

- `$scopedSlots` 是 Vue.js 中一个特殊的属性，它是一个对象，包含了父组件传递下来的作用域插槽的信息。
- 这个模板允许动态创建插槽，当父组件需要提供不同名称和数据的可变数量的插槽时，非常有用。

## 组合式加载自定义组件

核心思想是：

1. **一个组件加载器**：通过 v-for 循环渲染的 `<component>` 组件
2. **一个组件注册器**：自动注册某个文件夹下的所有自定义组件
3. **一堆自定义组件**：可自由组合使用

```html
<!-- 组件加载器: index.uve -->
<template>
  <div class="dynamic-wrap">
    <!-- 动态匹配加载组件，并且将每一个组件对象传入到子组件 -->
    <component
      :is="c.name"
      v-for="(c, i) in listData"
      :key="i"
      :childData="c"
    ></component>
  </div>
</template>

<script>
  // 引入隔壁加载的组件列表
  import list from "./list";
  export default {
    name: "dynamic",
    props: {
      listData: {
        type: Array,
        default: function () {
          return [
            {
              name: "", // 子组件名称
              key: "", // 自定义的字段
              models: {}, // 数据层，子组件绑定的数据对象里面的每一个key
              requiredData: [], // 子组件依赖的初始数据
            },
          ];
        },
      },
    },
    components: list, //注册隔壁加载的组件列表
    data() {
      return {};
    },
  };
</script>
```

```js
// 组件注册器：list.js
// 动态加载当前文件夹下的所有非index的vue后缀的组件
const files = require.context(".", false, /[^index]\.vue$/);
const components = {};
files.keys().forEach((key) => {
  // 匹配以 ./ 开头、以 .vue 结尾的字符串，并将中间部分的字符序列保存到分组中。
  // 然后，在 replace 方法中，将匹配到的字符串替换为 $1，即分组中保存的字符序
  const name = key.replace(/^.\/(.*)\.vue/, "$1");
  components[name] = files(key).default;
});
export default components;
```

## 自动批量加载文件

通过`webpack`打包的项目可以通过下面的方法批量加载文件

```js
// 自动加载modules文件夹下的所有js文件
const context = require.context("./modules", true, /\.js$/);
// 通过遍历数组加载模块
context.keys().forEach((filename) => {
  // 加载文件
  context(filename);
});
```

## ElementUI 表格自定义列抖动问题

```js
// 每次新增或删除列，需要重新绘制表格，否则表格会抖动
this.$nextTick(() => {
  this.$refs.multiTable.doLayout();
});
```

## computed 传参

```javascript
computed: {
  genUrl() {
    return function (str) {
      return `https://${str}:8090/${this.path}`
    }
  }
}
```

## 在 vue 中使用防抖技术

```javascript
// 方式一：
// <el-button @click="handleClick">防抖</el-button>
// 直接引入工具函数对象
import utils from "@/utils/index.js";
export default {
  methods: {
    handleClick: utils.debounce(() => {
      console.log("防抖");
    }, 2000),
  },
};
```

```javascript
// 方式二：
// <el-button @click="handleClick">防抖</el-button>
created() {
  // 使用全局的工具函数对象
  this.handleClick = this.$utils.debounce(() => {
    console.log("防抖");
  }, 2000);
}
```

## Vue 中父子组件生命周期顺序

1. 父 beforeCreate -> 父 created -> 父 beforeMount ->
2. 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted ->
3. 父 mounted

4. 父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

5. 父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed
