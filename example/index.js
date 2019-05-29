import { h, app, setState } from '../src';
let lines = [];

let state = {
  name: 'flat',
  show: true,
  count: 0,
  border: false,
  text: 4455,
  arr: [0,1,2,3,4,5,6,7,8,9],
  lines: lines
};

let actions = {
  calc(value) {
    setState({count: state.count + value});
  },
  onInput(value) {
    setState({name: value});
  },
  delete(){
    setState({show: !state.show});
  },
  border(){
    setState({border: true});
  },
  changeText(value){
    setState({text: value});
  },
  pushData(){
    setState({ arr: Math.random() > .5 ? [11, 22, 33, 44, 55, 66, 77, 88, 99, '00', 11, 22, 33, 44, 55, 66] : ['A','B'] })
  },
  addLine(){
    return function (){
      state.lines.push(1);
      setState({
        lines: state.lines
      });
    };
  },
  deleteLine(i){
    state.lines.splice(i, 1, null);
    setState({
      lines: state.lines
    });
  }
};

let view = (state, actions) => (
  <div style={state.border ? 'border: 1px solid #333' : ''}>
    {
      state.show ? <span>这是一段待删除的段落。</span> : null
    }
    <button onclick={() => actions.delete()}>{state.show ? '删除段落' : '恢复段落'}</button>
    <h1 class="yellow" style={{color: 'pink'}}>
      {state.name}
    </h1>
    <input
      type="text"
      placeholder="请输入名称"
      value={state.name}
      oninput={(e) => actions.onInput(e.target.value)}
    />
    <br/>
    { state.text }
    <button onclick={() => actions.changeText('嘿嘿嘿')}>改变文字</button>
    <button
      style="display:block;margin: 10px 0;"
      onclick={() => actions.border()}
    >添加border</button>
    <div>
      <button onclick={() => actions.calc(-1)}>-</button>
      <span style="font-size:40px;padding: 0 10px;color: lightblue">{state.count}</span>
      <button onclick={() => actions.calc(+1)}>+</button>
    </div>
    <div>
      <button onclick={()=> actions.pushData()}>替换片段 小片段->大片段</button>
      <br />
      <button onclick={actions.addLine()}>新增行</button>
    </div>
    {
      state.arr.map(item => <div>{item}</div>)
    }
    {
      state.lines.map((line, i) => line == null ? '' : <p onclick={e=> actions.deleteLine(i)} style="cursor: pointer">这是添加的第{i+1}行, 点击可删除</p>)
    }
    <img src="https://estatic.seeyouyima.com/tools-node.seeyouyima.com/movement-icon-50e67e123b808a6a6189f0cef8df59a5.png" />
  </div>
);

const container = document.getElementById('app');

app({
  state,
  view,
  actions,
  container,
});