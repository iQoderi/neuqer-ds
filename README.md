# 快站前后端通用网络请求库 kz-ds
## Overview

kz-ds 是基于是基于fetch api 的一套前后端通用请求库,支持 `get, post, delete, put` 四种请求方式,默认请求头 `Content-type` 为 `application/x-www-form-urlencoded`

### Advantages

- 异步流程基于promise,解决了传统callback嵌套过深问题
- 支持 url queryString 数组特殊处理
- 支持 get 请求并发处理,实现前端 http 请求节流
- ...

## Installation

### Npm

```sh
npm install kz-ds --save
```

### Bower

```
bower install kz-ds --save
```

## Usage

```js
import ds from 'kz-ds';
//or
const ds = require('kz-ds');
```

### GET

```js
//register
ds.register('user.info', {
    type: 'get',
    url: '/user/info',
    headers:{}
});

//resolve
ds.resolve('user.info', {
     headers:{
       'Accept':'application/json'
     },
     qs:{
      id:1
     }
}).then(function(result) {
     console.log(result);
});

//or
ds.resolve('user.info', {
    id:1
}).then(function(result) {
     console.log(result);
});

```

* 说明: ds.resolve(name,options),其中options兼容直接参数,如果是get || delete 方法，options里面的参数会最先替换掉registry里面的
path 参数,如 `user/:id`,则会先去查找options里面的 id 去替换 url 里面的 id,剩余参数默认带到url queryString里面去,如果是post || update 方法,
首先也会替换url 里面的 path 参数,但是剩余参数会默认带到请求 body 里面;

### POST
```js
//register
ds.register('user.login', {
    type: 'post',
    url: '/user/login',
    headers:{
        'Content-type': 'application/json'
    }
});

//resolve
ds.resolve('user.login', {
     headers:{
       'Accept':'application/json'
     },
     body:{
      name:'kuaizhan',
      password:'123456'
     }
}).then(function(result) {
     console.log(result);
});

//or
ds.resolve('user.login', {
    name:'kuaizhan',
    password:'123456'
}).then(function(result) {
     console.log(result);
});
```

## Other

kz-ds 内部重载了 Error 对象重载，可以通过捕获错误的错误码处理相应的错误

- code:异常错误码 default :3
- message:异常对应信息

### 错误码对应错误信息
| code   | message            |
| -------|:------------------:| 
| 0      | 网络请求发生错误      | 
| 1      | 参数不正确           |
| 2      | 请求方式不允许        |
| 3      | 服务端返回数据格式不正确|
| 4      | 未知错误             |  
| 5      | 需要发布获取网络请求配置 |
