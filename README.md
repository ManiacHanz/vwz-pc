# 天上西藏微网站后台

使用vue配置的一个后台配置页面的项目。

项目一期为配置手机微网站的项目。可以实现在PC端完成一个手机页面的配置，然后在移动端通过微信扫描二维码进行查看。

##技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + fetch + less + flex

##项目运行

####请确保系统中带有6.0以上node环境
```
npm install

npm run dev 
# serve with hot reload at localhost:4321 开发
npm run build

```

##效果演示

[查看demo请戳这里](http://vwz.ctibet.cn:8080/micportal/login/page/login.html)


##项目布局

```bash
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   │   ├── Header.vue                   	// 头部组件
│   │   │   ├── LeftMenu.vue                    // 左侧菜单栏组件
│   │   │   ├── modal.vue                       // 模态框组件
│   │   │   ├── Pagination.vue                  // 翻页组件
│   │   │   └── rightContent.vue                // 右部内容公共组件
│   │   ├── editor
│   │   │   └── VueUEditor.vue                  // 百度富文本编辑器组件
│   │   ├── guider
│   │   │   └── guider.vue                      // 引导页组件
│   │   ├── list                                // 列表组件
│   │   │   ├── materialTable.vue               // 文章列表组件
│   │   │   ├── typeA.vue                       // 手机列表面板内cell组件
│   │   │   └── typeB.vue                       // 手机列表面板内cell组件
│   │   ├── loading
│   │   │   └── loading.vue                     // 读取过程组件
│   │   ├── menuSet                             // 菜单配置的子组件
│   │   │   ├── sub                             // 子组件
│   │   │   │    ├── homePanel.vue              // 首页面板组件
│   │   │   │    ├── listPanel.vue              // 列表面板组件
│   │   │   │    └── userPanel.vue              // 用户面板组件
│   │   │   ├── mobilePanel.vue                 // 手机面板组件
│   │   │   └── setUpForm.vue                   // 右侧表单配置组件
│   │   ├── notification                        // 通知组件
│   │   │   └── successNotify.vue               // 发布成功组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 基础路径配置
│   │   ├── fetch.js                            // 封装fetch方法
│   │   └── mUtils.js                           // 常用的js方法
│   ├── page					
│   │   ├── Edit
│   │   │   └── ArticleEdit.vue                 // 文章编辑页
│   │   ├── MicroHome
│   │   │   ├── index.vue                       // 微网站页
│   │   │   └── subpage							
│   │   │       ├── MaterManage.vue             // 素材管理页
│   │   │       ├── MenuSet.vue                 // 菜单配置页
│   │   │       └── subIndex.vue                // 公用子页面
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   └── index.js                            // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── sendData.js                         // 用于上传图片、发送数据的统一接口管理文件
│   ├── store                                   // vuex的状态管理
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   ├── style
│   │   ├── common.less                         // 公共样式文件
│   │   └── variety.less                        // 常用变量
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

```


###插件列表

1、富文本编辑器 [百度UEditor](http://ueditor.baidu.com)

2、图片压缩插件 localResizeIMG (https://github.com/think2011/localResizeIMG)

3、剪贴板复制插件 vue-clipboard2 (https://github.com/Inndy/vue-clipboard2)