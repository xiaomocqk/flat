
/* eslint-disable no-empty */
let merge = function (a, b) {
  let out = {};
  for(let key in a) out[key] = a[key];
  for(let key in b) out[key] = b[key];

  return out;
};
let isArray = Array.isArray;

export let setState;

export function h(nodeName, attributes, ...children){
  let rest = [];

  attributes = attributes || {};

  for (let i = 0; i < children.length; i++) {
    let item = children[i];

    if (isArray(item)) {
      for (let j = 0; j < item.length; j++) {
        rest.push(item[j]);
      }
    } else {
      rest.push(item);
    }
  }

  return {
    nodeName,
    attributes,
    children: rest,
    /* 目前未用到 key */
    // key: attributes.key
  };
}

export function app({state, view, actions, container}) {
  let oldNode;

  container.appendChild(
    createElement(oldNode = resolveNode(view))
  );

  setState = function(obj) {
    for (let key in obj) {
      state[key] = obj[key];
    }
    console.log('oldNode === ', oldNode);
    oldNode = patch(container, container.children[0], oldNode, resolveNode(view));
    console.log('newNode === ', oldNode);
    return state;
  };

  function resolveNode(node) {
    return typeof node === 'function'
      ? node(state, actions)
      : node == null
        ? ''
        : node;
  }

  function createElement(node) {
    let element;
  
    if (typeof node === 'string' || typeof node === 'number') {
      element = document.createTextNode(node);
    }
    else if(node == null){
      element = document.createTextNode('');
    }
    else {
      element =
        node.nodeName === 'svg'
          ? document.createElementNS(
            "http://www.w3.org/2000/svg",
            node.nodeName
          )
          : document.createElement(node.nodeName);
  
      let attributes = node.attributes;
  
      if (attributes) {
        for (let name in attributes) {
          if (attributes.hasOwnProperty(name)) {
            updateAttribute(element, name, attributes[name], null);
          }
        }
      }
  
      for (let i = 0; i < node.children.length; i++) {
        element.appendChild(
          createElement(node.children[i])
        );
      }
    }
  
    return element;
  }

  // function listener(params) {
    
  // }
  
  function updateAttribute(element, name, value, oldValue) {

    if (name === 'key') {
    }
    else if (name === 'style') {
      if (typeof value === 'string') {
        element.style.cssText = value;
        console.log('STYLE: ', name, ' === ', value);
      } else {
        for (let name in value) {
          if (oldValue == null || value[name] !== oldValue[name]) {
            console.log('STYLE: ', name, ' === ', value);
            element.style[name] = value[name];
          }
        }
      }
    }
    else if (name.match(/^on(\w+)/)) {
      let event = RegExp.$1;
  
      element.events = element.events || {};
      if (!(event in element.events)) {
        console.log('EVENTS: ', element, name);
        element.events[event] = value;
  
        element.addEventListener(event, value);

        // 事件委托
        // const listener = event => (event.target === element) && value();
        // container.addEventListener(event, listener);
      }
    }
    else {
      console.log('ATTRIBUTE: ', name, ' === ', value);
      element.setAttribute(name, value);
    }
  }
  
  function removeElement(parent, element, oldNode, node) {
    if (element) {
      let events = element.events;
      
      if (node != null) {
        parent.insertBefore(createElement(node), element);
      }
    
      if (events) {
        for (let name in events) {
          element.removeEventListener(name, events[name]);
        }
      }
    
      parent.removeChild(element);
      element = null;
    }
  }
  
  function updateElement(element, oldAttributes, attributes) {
    for (let key in merge(oldAttributes, attributes)) {
      if (oldAttributes[key] !== attributes[key]) {
        updateAttribute(element, key, attributes[key], oldAttributes[key]);
      }
    }
  }

  function patch(parent, element, oldNode, node) {
    oldNode = resolveNode(oldNode);
    node = resolveNode(node);

    if (node === oldNode) {
      // string | number
    }
    else if (oldNode.nodeName !== node.nodeName) {
      if (element === undefined) {
        parent.appendChild(createElement(resolveNode(node)));
      } else {
        // object
        removeElement(parent, element, oldNode, node);
      }
    } 
    else if (node.nodeName == null) {
      // string | number
      console.log('TEXTCONTENT: ', node);
      element.nodeValue = node;
    } else {
      // object 拥有相同的标签名
      let _node = node.children.length > oldNode.children.length ? node : oldNode;

      updateElement(element, oldNode.attributes, node.attributes);
      
      for (let i = 0; i < _node.children.length; i++) {
        patch(element, element.childNodes[i], oldNode.children[i], node.children[i]);
      }
    }

    return node;
  }
}