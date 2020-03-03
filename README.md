# 介绍
sapper的webpack模板，在官方基础上集成了saas的编译，引入了一个第三方css框架bulma，加了一个简单的事件总线。

因为我使用时官方还未支持代理，webpack的代理配置也不能正常起作用，所以借助服务端添加了一个开发时的代理用来解决前端跨域。

### 初始化项目

```
# for Rollup
npx degit "KeiferJu/sapper-template-saas#rollup" my-app
# for webpack
npx degit "KeiferJu/sapper-template-saas#webpack" my-app
cd my-app

npm install
npm run dev & open http://localhost:3000
```

### 使用saas：
```
<style src="./style.scss"></style>

<!-- Or -->

<style lang="scss">
  $color: red;

  .test{
    color: $color;
  }
</style>

<!-- Or -->

<style lang="scss">
 @import "./style.scss";
</style>
```

### 使用事件总线
还在里面加入了一个简单的事件总线。
```
/**
 * 事件总线
 *
 * 使用方法:
 *  1. 引入组件类
 *         import EventBus from '../service/EventBus'
 *  2. 事件输出与订阅
 *         输出：EventBus.emit('ww.myevent','nihao1')
 *
 *         订阅：EventBus.addEventListener('ww.myevent', (data) => {
 *              name = data;
 *	       })
 *
 */
 ```

 ### 代理使用
proxy.config.js文件

- path: 匹配路径，支持多个,例如[1,2,3]
- target: 代理路径
 ```
    const proxyArray = [
    {
        path: ['/test'],
        target: 'http://localhost:3000'
    },
    ...
]
 ```