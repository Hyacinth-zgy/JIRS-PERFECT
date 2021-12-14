【扩展学习】Mock 方案对比
简要说明
在接下来章节的实战代码中大家将会使用 window.fetch 请求后端接口。

但是在真实工作环境中，由于后端与前端并行开发，所以在前期是没有后端接口可以使用的。

所以学会最适合自己的 Mock 数据的方法就非常重要。

这一节会给大家对比业界常见的 Mock 方案，选择并配置其中最合适的方案。

常见 MOCK 方案
1. 代码侵入 (直接在代码中写死 Mock 数据，或者请求本地的 JSON 文件)
优点：无

缺点：

和其他方案比 Mock 效果不好。
与真实 Server 环境的切换非常麻烦，一切需要侵入代码切换环境的行为都是不好的。
2. 请求拦截
代表：Mock.js

示例：

Mock.mock(/\\/api\\/visitor\\/list/, 'get', {
  code: 2000,
  msg: 'ok',
  'data|10': [
    {
      'id|+1': 6,
      'name': '@csentence(5)',
      'tag': '@integer(6, 9)-@integer(10, 14)岁 @cword("零有", 1)基础',
      'lesson_image': "<https://images.pexels.com/3737094/pexels-photo-3737094.jpeg>",
      'lesson_package': 'L1基础指令课',
      'done': '@integer(10000, 99999)',
    }
  ]
})

优点：

与前端代码分离
可生成随机数据
缺点：

数据都是动态生成的假数据，无法真实模拟增删改查的情况。
只支持 ajax，不支持 fetch。
(想要了解 ajax 和 fetch 区别的同学来点我)

3. 接口管理工具
代表：rap, swagger,moco, yapi

优点：

配置功能强大，接口管理与 Mock 一体，后端修改接口 Mock 也跟着更改，可靠。
缺点：

配置复杂，依赖后端，可能会出现后端不愿意出手，或者等配置完了，接口也开发出来了的情况。
一般会作为大团队的基础建设而存在， 没有这个条件的话慎重考虑。
4. 本地 node 服务器
代表：json-server

优点：

配置简单，json-server 甚至可以 0 代码 30 秒启动一个 REST API Server。
自定义程度高，一切尽在掌控中。
增删改查真实模拟。
缺点：

与接口管理工具相比，无法随着后端 API 的修改而自动修改。
本课程 Mock 计划
从本章开始，使用 json-server Mock 2 章，

在这 2 章里让大家尽可能多的接触到不同的（GET, POST, DELETE, PATCH）Mock 场景，

剩下的章节里使用真实的接口。

REST API
一句话总结：URI 代表 资源 / 对象，METHOD 代表行为：

GET /tickets // 列表
GET /tickets/12 // 详情
POST /tickets  // 增加
PUT /tickets/12 // 替换
PATCH /tickets/12 // 修改
DELETE /tickets/12 // 删除




为什么列表要加 key 属性，以及为什么用 index 是不好的
遍历对象的每一个属性深度对比是非常浪费性能的。

React 使用列表的 key 来进行对比，如果不指定，就默认为 index 下标。

那么，为什么 不指定 key / 用 index 下标 是不好的呢？

假设现在有这样一段代码：

const users = [{ username: "bob" }, { username: "sue" }];

users.map((u, i) => <div key={i}>{u.username}</div>);

它会渲染出这个 DOM 树：

<div key="1">bob</div>
<div key="2">sue</div>

然后用户做了某个操作，users 被 unshift 另一个对象，变成：

const users = [
  { username: "new-guy" },
  { username: "bob" },
  { username: "sue" },
];

DOM 树就会变成这样，注意 key 的变化：

<div key="1">new-guy</div>
<div key="2">bob</div>
<div key="3">sue</div>

DOM 树的前后对比是这样的：

<div key="1">bob</div>   |  <div key="1">new-guy</div>
<div key="2">sue</div>   |  <div key="2">bob</div>
                         |  <div key="3">sue</div>

我们人类看得出来前后的变化只是在开头加了一个 new-guy 而已。

但是由于 React 使用 key 值来识别变化，所以 React 认为的变化是：

bob -> new-guy
sue -> bob
添加 sue
非常消耗性能 ?

但是如果我们一开始就给它指定一个合适的 key，比如用 name：

users.map((u, i) => <div key={u.username}>{u.username}</div>);

React 认为的变化就变成：

                         |  <div key="1">new-guy</div>
<div key="1">bob</div>   |  <div key="2">bob</div>
<div key="2">sue</div>   |  <div key="3">sue</div>



# ReactRedux 和 Redux扮演的数据角色
Redux扮演的的是公共数据仓库
ReactRedux 扮演的是将数据仓库中的数据转换为react状态，驱动视图更新，reactRedux扮演一个链接层
