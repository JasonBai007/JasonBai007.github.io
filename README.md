# Blog
A personal blog created by VuePress 1.x.

<img src="./qr.png" width="200">

## How to USE
```
yarn dev
yarn build
yarn deploy
```

## Features
- 支持热更新 
- 支持自动打开浏览器
- 支持返回顶部
- 支持外链资源
- 支持一键部署
- 支持图片放映
- 支持自定义样式
- 支持自定义主题色
- 支持自定义组件
- 支持代码一键复制
- 支持留言板

## Directory Structure
```
├── docs (打包后目录)
├── src  (博客文档源文件)
│   ├── .vuepress 
│   │   ├── components
│   │   ├── theme
│   │   │   └── Layout.vue
│   │   ├── public (图片资源)
│   │   ├── styles
│   │   │   ├── index.styl  (自定义样式)
│   │   │   └── palette.styl  (全局主题样式变量)
│   │   └── config.js  (路由导航)
│   │ 
│   ├── README.md
│   ├── guide
│       └── README.md
│ 
└── package.json
```
## Notes
1. VuePress默认docs作为基准目录，但是为了使用GitHub的Pages服务，改为src了
2. 打包后的目录从dist改为了docs
3. .temp是临时文件夹，无需提交到远程
4. .vuepress文件夹是项目的配置文件夹
5. 由于Gitee审查不透明，经常无法部署，所以只能选择GitHub的Pages服务
6. 由于国内封锁,GitHub只能偶尔push代码成功，需要反复多次尝试
7. Github提交代码后，等待一两分钟，刷新页面，博客会更新
8. Gitee提交代码后，需要手动更新Pages
9. 可以使用草料二维码生成自己的博客地址二维码。

## 看板娘本地化
1. 看板娘插件默认使用的是黑猫
2. 加载线上的资源太慢，所以做了本地化
3. node_modules\@vuepress-reco\vuepress-plugin-kan-ban-niang\bin\KanBanNiang.vue
4. 改成：blackCat:'/blog/mode/hijiki.model.json'
5. 看板娘需要加载的资源放在了：src\.vuepress\public\mode
