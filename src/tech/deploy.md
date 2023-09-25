# 网站部署

## Nginx 开启 https

### 购买免费证书

> **DV 证书** ：域名验证型证书，证书审核方式为通过验证域名所有权即可签发证书。此类型证书适合个人和小微企业申请，价格较低，申请快捷，但是证书中无法显示企业信息。

阿里云上可以免费领取 **20 个免费 DV 证书**，每个证书**有效期 1 年**，领取地址：[https://www.aliyun.com/product/cas](https://www.aliyun.com/product/cas)，
领取完，申请绑定域名即可。

### 下载证书

下载 nginx 使用的证书，包括：**xxx.key**（私钥） 和 **xxx.pem** （证书）

### 上传证书

```sh
# 提前登录服务器，新建cert文件夹
# 然后在本地执行上传命令
scp xxx.key xxx.pem root@xx.xx.xx.xx:/etc/nginx/cert
```

### 配置 nginx

1. 首先编辑：`/etc/nginx/sites-available/default` 配置文件，设置 http 请求重定向到 https：

```sh
server {
    listen 80;
    # 填写绑定证书的域名
    server_name xxxxxx.com;
    #强制将http的URL重写成https
    rewrite ^(.*) https://$server_name$1 permanent;
}
```

2. 添加监听 443 端口的配置文件: luban

```sh
# 在/etc/nginx/sites-available/路径下新建luban文件
server {
  # SSL configuration
	listen 443 ssl default_server;
	listen [::]:443 ssl default_server;

	server_name xxx.com;

	ssl_certificate  /etc/nginx/cert/xxx.pem;
	ssl_certificate_key /etc/nginx/cert/xxx.key;

	root /home/xxx;

	index index.html index.htm index.nginx-debian.html;

	location / {
		try_files $uri $uri/ =404;
	}
}
```

3. 建立软连接并重启服务

```sh
ln -s /etc/nginx/sites-available/luban /etc/nginx/sites-enabled/luban
nginx -s reload
```

## chatGPT 的注册与使用

### 1. 注册 OpenAI 并获取 Key

1.  确保可以顺畅访问 [google.com](google.com)
2.  在 [sms-activate](https://sms-activate.org/) 上注册并登录
3.  在 sms-activate 上通过支付宝 1 美元
4.  在 sms-activate 页面左侧搜索 OpenAI，选择一个国家点击右侧购物车，花几十卢布购买一个虚拟手机号接收验证码。
5.  在新窗口打开 [openai](https://platform.openai.com/) 注册入口页面
6.  选择使用谷歌账号登录
7.  输入谷歌账号密码
8.  提示输入国外手机号接收验证码：选择你购买的手机号的国家，填入完整号码
9.  在 sms-activate 上接收验证码
10. 输入收到的验证码，就登录成功了
11. 点击头像：选择 View API Keys，创建一个 Key，并记在小本本上
12. 每个账号赠送$18 的额度，大概可以请求 3000 次

### 2. 使用 fetch 与 chatGPT 交互

::: warning
ChatGPT 的 API 接口在国内已被墙！只能通过国外的服务器转发请求。
:::

```js
// 与text-davinci-003模型互动的请求示例：
fetch("https://api.openai.com/v1/completions", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer sk-xxxxxxxxxx", // 格式：`Bearer ${your key string}`
  },
  body: JSON.stringify({
    model: "text-davinci-003", // 模型
    temperature: 0, // 0表示生成明确的答案，1会更有创造力
    max_tokens: 2048, // 返回的最大字符数
    prompt: "Hello, how do you do ?", // 输入的文本
  }),
})
  .then((res) => res.json())
  .then((res) => console.log(res));
```

```js
// 与gpt-3.5-turbo模型互动的请求示例：
fetch("https://api.openai.com/v1/chat/completions", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer sk-xxxxxxxxxx", // 格式：`Bearer ${your key string}`
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo", // 最新模型
    temperature: 0, // 0表示生成明确的答案，1会更有创造力
    max_tokens: 2048, // 返回的最大字符数
    messages: [
      {
        role: "user",
        content: "Hello, how do you do ?",
      },
    ], // 输入的文本，以user普通用户的形式与AI助手对话
  }),
})
  .then((res) => res.json())
  .then((res) => console.log(res));
```

## 搭建免费网站的三种途径

### 1. **Github Pages** <Badge text="不推荐" type="error"/>

将网站代码托管到 Github 上的仓库里，开启 Pages 服务，即可实现免费的 https 网站。但由于**国内的封锁**。这条路基本上被堵死了。

### 2. **Gitee Pages** <Badge text="推荐" type="tip"/>

使用 Gitee 的 Pages 服务，也可以实现免费搭建个人网站。但**只能搭建非常简单的页面**。同时有以下限制：

- 开通 Pages 服务的仓库**必须开源**
- 页面内容不能有违禁词汇，并且**不知道具体哪里违禁**

### 3. **亚马逊云服务器 AWS** <Badge text="可选" type="tip"/>

::: warning 扣费提醒
开通完实例，部署完网站后，一定要在控制台关闭 22 端口，否则每天都会产生美元费用
:::

精通前后端的同学可以申请亚马逊云服务器，将个人网站放到上面。注册需要：

- 一张信用卡
- 一个手机号
- 一个邮箱

注册成功后，**可以开启一个免费的云服务器，免费使用 12 个月。**

- 30G 的空间
- 每个月 750h 的服务器运行时间（创建 2 个实例就会超时扣费）
- 如果使用超过 12 个月，会被扣美元，一定提前手动关闭实例
- 创建完实例后，把博客部署上去后，一定要在实例**管理页面>安全>入站规则**，**关闭 22 端口**，否则实例自己和别的区域通信会产生美元费用。
- 部署网站前，先开启 22 端口。部署完再关闭 22 端口

[申请教程](https://opssh.cn/fenxiang/255.html)、[申请入口](https://aws.amazon.com/cn/ec2/?hp=tile&so-exp=below&ct=fs)

## 本地预览打包后的应用

1. 安装 VSCode 插件：`Live Server`
2. 修改根目录下的 vue.config.js 文件

```js {4}
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/dist/", // 这里改成dist
  devServer: {
    host: "localhost",
  },
});
```

3. 确保应用的路由模式是 `hash` 模式
4. 执行打包命令：`yarn build`
5. VSCode 左侧文件树中，在 dist/index.html 上右击鼠标选择：`Open with Live Server`
6. 在浏览器里输入：`http://localhost:5500/dist/index.html` 即可

## 使用 shell 脚本部署网站

我们可以在本地通过 shell 脚本进行项目打包、代码提交、部署到服务器等操作。

1. 在项目根目录新建一个`deploy.sh`文件
2. 在 package.json 中添加 npm scripts

```javascript {3}
{
  "scripts": {
    "deploy": "sh deploy.sh"
  }
}
```

3. 编辑 deploy.sh，添加部署脚本

```shell
#!/bin/bash

# 确保脚本抛出遇到的错误，遇到错误退出
set -e

echo "Deploying website on xxx.xxx.xx.xxx ..."

# 生成静态文件
npm run build

# 将打包后的文件上传至目标服务器对应路径下
scp -r ./dist/* root@xxx.xxx.xx.xxx:/home/project
```

4. 部署网站

```shell
npm run deploy
# or
yarn deploy
```

## 在 Gitee 上部署自己的网站

::: warning 警告
由于**Gitee 网站**审核力度非常变态，普通的博客也很有可能无法正常部署，提示有违禁内容
:::

1. 打开 [gitee.com](https://gitee.com) 并注册一个账号，登录绑定自己的邮箱和手机号
2. 在 gitee 上**新建一个代码仓库**，仓库名称根据个人喜好来定，比如 myRepo
3. 复制代码仓库地址
   ![图片](/tech/t1.png)

4. 下载并安装代码版本管理工具 [Git](https://git-scm.com/downloads)
5. 在本地打开一个文件夹，要在这个文件夹下面放置刚才新建的代码仓库
6. 在打开的文件夹空白处，右击鼠标，选择 **Git Bash Here**，打开 Git 命令行窗口
7. 拉取代码仓库：在 git bash 窗口里输入

```bash
# 你的代码仓库地址(https开头的，步骤3)
git clone https://gitee.com/lubanseven/myRepo.git
```

8. 上一步好像需要输入 Gitee 的用户名和密码
9. 进入到你的代码仓库

```bash
cd myRepo
```

10. 将包含了 index.html 的相关文件复制进来
    ::: tip
    根目录下需要有 index.html 文件<br>
    文件中不能有二维码图片
    :::
11. 提交代码到远程仓库

```bash
# 添加到暂存区
git add .

# 提交到本地仓库
git commit -m '备注信息'

# 推送到Gitee上面的仓库
git push
```

12. 返回 Gitee 上的代码仓库页面，选择 **服务 > Pages**
    ![图片](/tech/t2.png)
13. 首次开启 Pages 服务，需要先实名认证（1 个工作日）
14. 认证通过后，就可以开启服务了（点击：更新 按钮），开启后会自动生成**网站地址**
    ![图片](/tech/t3.png)
15. 后续更改文件后，执行步**骤 11** 和**步骤 14** 即可

## 在 GitHub 上部署自己的网站

::: warning 警告
由于众所周知的原因，GitHub 在国内似墙非墙，打开或者提交代码需要尝试多次，看运气
:::

1. 打开 [github.com](https://github.com)，注册一个账号并登录
2. 在 github 上**新建一个代码仓库**，仓库名称根据个人喜好来定，比如 myRepo
3. 复制代码仓库地址
4. 下载并安装代码版本管理工具 [Git](https://git-scm.com/downloads)
5. 在本地打开一个文件夹，要在这个文件夹下面放置刚才新建的代码仓库
6. 在打开的文件夹空白处，右击鼠标，选择 **Git Bash Here**，打开 Git 命令行窗口
7. 拉取代码仓库：在 git bash 窗口里输入

```bash
# 你的代码仓库地址(https开头的，步骤3)
git clone https://github.com/JasonBai007/myRepo.git
```

8. 上一步好像需要输入 github 的用户名和密码
9. 进入到你的代码仓库

```bash
cd myRepo
```

10. 将包含了 index.html 的相关文件复制进去
11. 提交代码到远程仓库

```bash
# 添加到暂存区
git add .

# 提交到本地仓库
git commit -m '备注信息'

# 推送到Github上面的仓库
git push
```

12. 返回代码仓库页面，选择 **Settings > Pages > Save**，即可开启 Pages 服务
    ![图片](/tech/t4.png)
13. 后续每次更新文件后，执行**步骤 11**，过几分钟刷新页面，网站就自己更新了
