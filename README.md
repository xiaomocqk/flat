# flat

#### 介绍
flat是一个小巧的function-api库, 基于virtual-DOM/diff, 只有200行代码, 压缩后仅2kb.

推荐使用jsx语法, flat使用h函数生成虚拟DOM

另外推荐一个优秀的开源项目[hyperapp](https://github.com/jorgebucaran/hyperapp), flat很多地方是借鉴于它
>* rollop的版本应不低于1.12.0

### 使用说明

#### 1. 安装
```
npm install git+https://github.com/xiaomocqk/flat.git
```

#### 2. 启动
```
npm run dev
```

以`example/index.js`为例:
```
import flat from 'flat';

let state = { count: 1 };

let view = ({state, mutate}) => (
  <div>
    <h1>{state.count}</h1>
    <input value={state.count} oninput={e => mutate({count: +e.target.value})} />
    <br />
    <button onclick={() => mutate({count: state.count - 1})}>Increase</button>
    <br />
    <button onclick={() => mutate({count: state.count + 1})}>Decrease</button>
  </div>
);

let container = document.getElementById('app');

flat(state, view, container);

```
#### 3. 编译打包
```
npm run build
```

注: 如需直接在浏览器端引用, 可参考example/browser.html
