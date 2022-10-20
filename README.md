# vue2-app-practice

## Project setup

```
yarn/npm install
```

### project remark

```
基于ant-design-vue vue2.x typescript pc端应用框架
```

### Compiles and hot-reloads for development

```
yarn/npm run serve-dev
```

### Compiles and minifies for production

```
yarn/npm run build-prod
```

### Lints and fixes files

```
yarn/npm run lint
```

### 安装步骤

```
1.安装nodejs，最新版就好，默认自带npm，通过npm安装yarn
2.安装vscode，最新版就好
3.安装vscode插件，安装教程请看：https://www.tapd.cn/39689518/documents/show/1139689518001000959?file_type=word
4.插件安装清单请看：https://www.tapd.cn/39689518/documents/show/1139689518001001284
5.在vscode中选择文件->打开文件夹
6.在终端命令中执行 yarn/npm install
7.执行命令yarn run serve-dev启动项目，会自动打开浏览器，目前用户名和密码是admin admin
```

### 插件安装清单

| 插件名                       | 功能说明                                  |
| :--------------------------- | :---------------------------------------- |
| Chinese Language Pack        | vscode 汉化插件                           |
| Git Blame                    | git 曾强                                  |
| Window Explorer Context Menu | 右键菜单插件                              |
| Auto Close Tag               | 标签自动闭合                              |
| Auto Rename Tag              | 标签同步修改                              |
| Bracket Pair Colorizer 2     | 代码块着色                                |
| EditorConfig for VS Code     | 项目目录代码格式化                        |
| ESLint                       | 代码检查，错误标识                        |
| Path Intellisense            | 路劲补全                                  |
| Prettier-Code formatter      | 配合格式化插件使用                        |
| stylelint                    | 配合格式化插件，美化 css 代码             |
| Vue Peek                     | 文件跳转                                  |
| Vetur                        | 语法高亮，片段补全，Emmet，格式化         |
| Vue 2 Snippets               | vue 语法补全，与 Vetur 配合达到更好的效果 |

### npm 操作手册

```
第一步：本地必要环境
1.通过win+R打开cmd命令行工具（非管理员方式都可以）执行命令nrm -V（大写）来查看本地是否全局安装nrm(npm源管理器)，如果没有，先安装，执行npm install-g nrm，再执行nrm -V来查看是否安装成功，若成功，提示nrm工具的版本号，除此不成功
2.添加公司npm源，执行规则nrm add<registry><url>列：nrm add cohonpm http://192.168.1.181:4873
3.查看是否成功添加源，执行nrm ls会展示所有源列表，并且源信息前面会显示安装的源的名称cohonpm
4.将公司源设置为默认源，执行nrm use cohonpm，查看是否设置成功，执行nrm ls展示的源列表中，选中的源前面会带有*号，表示设置成功
图片描述
5.详细的nrm命令请查看nrm--help，可自我学习

第二步：终端命令登录账号
1.如果没有账号请联系npm服务器管理员，由管理员统一分配
2.执行npm login，输入用户名，密码，邮箱
3.cd进入发布包的根目录，如果发布包里面有pachage.json文件信息不用执行npm init，否则需要执行npm init，此操作为了生成描述组件或插件信息，并动态生成package.json文件
4.在根目录下增加README.md文件用以说明组件信息，比如支持的浏览器版本，使用方式，初始化方式，组件回调数据，组件参数列表等等任意信息，以及依赖的插件列表等
5.执行npmpublish命令上传到私有服务器上，可在http://192.168.1.181:4873 查看
6.如何私有包需要其他的依赖包，请在主包里面将package.json文件中将"dependencies":{"<pkg>":"^<version>"}添加进去，不然别人下载你的包，无法下载你的包所需要支持的依赖
7.执行npm install <模块名> --save-dev即可以开发模式下载到项目中使用

第三步：删除服务器的包
1.删除服务器指定版本的包npm unpublish <pkg>[@<version>]
2.删除服务器指定包的所有版本npm unpublish <pkg>[@<version>] --force

第四步：更新服务器的包
1.首先先进入包的根目录
2.按照修改的级别不同，执行不同的命令，以下命令只是修改了本地的版本，最后还需要更新到服务器
	2.1.npm version patch打补丁的版本
	2.2.npm version minor这个是轻微优化
	2.3.npm version major这个是项目大改
3.最后执行npmpublish更新服务器版本
4.执行npmview<pkg>versions可展示服务器端包的版本列表

第五步：下载或更新服务器包文件
1.下载包npm install <pkg> --save-dev
2.下载指定版本的包npm install <pkg>[@<version>] --save-dev
3.更新服务器的包npm update <pkg>

```

### nginx 部署步骤

```
1.删除文件夹：rm -rf /root/vue-app
2.上传发布包
3.停止容器 docker stop ContainerId
4.删除容器 docker rm ContainerId
5.生成镜像 cd /root/lebron/pc docker build . -t vue-pc-gsnx-image，注意：生成镜像的时候，要提供docker和nginx配置文件，一起生成镜像，即这两个文件要与发布包的dist文件夹同级
6.运行镜像 docker run --name vue-pc-gsnx -d -p 7890:80 vue-pc-gsnx-image
```

### nginx proxy config

```
1.docker build . -t nginx-server-proxy 生成代理镜像
2.docker run --name vue-pc-gsnx-proxy -d -p 80:80 nginx-server-proxy 部署代理服务器
```

### centos 相关命令

```
1.开放指定端口 firewall-cmd --zone=public --add-port=7890/tcp --permanent
2.重启防火墙 firewall-cmd --reload
3.开启防火墙 systemctl start firewalld
4.查看防火墙状态 firewall-cmd --state
5.查看已开放的端口 firewall-cmd --list-ports
6.进入docker容器 docker exec -it ContainerId /bin/bash or /bin/sh or bash or sh
7.docker 中搜索文件 find / -name [fileName]
8.docker 中编辑文件 保存退出 先按esc键，再输入 :wq
9.docker cp [ContainerName]:path path(宿主机) 从docker容器中复制文件到宿主机中，注：在docker 容器外执行此cmd
10.docker cp path [ContainerName]:path(docker 容器路径) 复制宿主文件到docker容器中
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
