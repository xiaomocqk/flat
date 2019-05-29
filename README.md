# flat

#### 介绍
flat.js是一个小巧的mvvm库, 只有200行代码, 压缩后只有2kb
* rollop的版本应不低于1.12.0

#### 使用说明

1. 启动方式一(推荐)
```
npm run dev
```
2. 启动方式二(浏览器环境)
```
<script src="../dist/flat.min.js"></script>
<script>
  var h = flat.h,
      app = flat.app;

  app({
    container: document.getElementById('app'),
    state: {
      value: 0
    },
    actions: {
      change(state){
        flat.setState({value: state.value + 1})
      }
    },
    view: (state, actions) => h('div', {}, [
      h('input', {placeholder:'placeholder', value: state.value}),
      h('button', {onclick: () => actions.change(state)}, ['+1'])
    ]),
  })
</script>
```
3. 编译打包
```
npm run build
```