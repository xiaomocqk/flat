# flat

#### 介绍
flat.js是一个小巧的mvvm库, 基于virtual-DOM/diff, 只有200行代码, 压缩后仅2kb
* rollop的版本应不低于1.12.0

#### 使用说明

#####1. 启动

(1) 方式一(推荐)
```
npm run dev
```

以`example/index.js`为例:
```
import { flat, setState, h } from '../src/index';

// state必须是一个对象
let state = {
  value: 1
};

let actions = {
  setValue(state){
    setState({
      value: state.value + 1
    })
  }
};

let view = (state, actions) => (
  <main>
    <h1>{state.value}</h1>
    <button onclick={() => actions.setValue(state)}>+1</button>
  </main>
);

let container = document.getElementById('app');

flat({
  state,
  actions,
  view,
  container
})
```

#####(2)启动方式二(浏览器环境)
查看 `example/browser.html`, 并直接在浏览器打开. 值得注意的是 `setState` 方法应该是 `flat` 函数的运行返回值, 因为`flat` 函数执行后, 内部状态应是一个独立的作用域, `setState` 将可以直接访问其内部状态.
```
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <script src="../dist/flat.min.js"></script>
  <script type="text/babel">
    //@jsx flat.h

    var setState = flat({
      state: {
        value: 1
      },
      actions: {
        change(state){
          setState({value: state.value + 1})
        }
      },
      view: (state, actions) => (
        <main>
          <h1>{state.value}</h1>
          <input value={state.value} oninput={(e) => setState({value: +e.target.value})} />
          <br/>
          <button onclick={() => actions.change(state)}>+1</button>
        </main>
      ),
      container: document.getElementById('app')
    })
  </script>
</body>
```
2. 编译打包
```
npm run build
```
