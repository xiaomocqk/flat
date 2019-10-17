import flat from '../index';

let state = {
  count: 1,
};

let view = ({state, mutate}) => (
  <div>
    <h1>{state.count}</h1>
    <input value={state.count} oninput={e => mutate({count: +e.target.value})} />
    <br />
    <button onclick={() => mutate({count: state.count + 1})}>Increase</button>
    <br />
    <button onclick={() => mutate({count: state.count - 1})}>Decrease</button>
  </div>
);

let container = document.getElementById('app');

flat(state, view, container);