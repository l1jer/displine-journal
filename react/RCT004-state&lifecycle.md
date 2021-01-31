# State & Lifecycle

- [State & Lifecycle](#state--lifecycle)
    - [Step 1 - Function to class](#step-1---function-to-class)
    - [Step 2 - Add state to class](#step-2---add-state-to-class)
    - [Step 3 - Add lifecycle into class](#step-3---add-lifecycle-into-class)
    - [正确使用State - `setState()`](#正确使用state---setstate)
  - [React 组件的生命周期分三个状态](#react-组件的生命周期分三个状态)
  - [P.S. contructor(props)&super(props)](#ps-contructorpropssuperprops)
    - [constructor(props)](#constructorprops)
    - [super(props)](#superprops)

```js
function Clock(props){
  return(
      <div>
          <h5>现在的时间是 {props.date.toLocaleTimeString()}</h5>
      </div>
  );
}

function ticks(){
  ReactDOM.render(
      <Clock date={new Date()} />, document.getElementById('clock')
  )
}
setInterval(ticks, 1000);
```


* `state` 和 `props` 类似, 但是'state` 是私有的并完全受控于当前组件
* 在 `clock` 组件中添加 `state` 来实现理想的编写一次便让 `clock` 组件自我更新.


### Step 1 - Function to class
1. 创建同名 `ES6 class` ,并继承于 `React.Component`;
2. 将函数移至 `render()` 方法中
3. 替换 `props` 为 `this.props`


```js
class Clock extends React.Component{
    render(){
    return(
        <div>
            <h5>现在的时间是 {this.props.date.toLocaleTimeString()}</h5>
        </div>
    );
  }
}
  
  function ticks(){
    ReactDOM.render(
        <Clock date={new Date()} />, document.getElementById('clock')
    )
  }
  setInterval(ticks, 1000);
```


### Step 2 - Add state to class
1. 替换 `this.props.date` 为 `this.state.date`;
2. 添加一个 `class构造函数`, 在其内为 `this.state` 赋初始值;
3. 传递 `props` 到父类构造函数中 (`class` 始终使用 `props` 调用父类构造函数)
4. 移除 <Clock />中的 `date` 属性

```js
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    render(){
        return(
            <div>
                <h5>现在的时间是 {this.state.date.toLocaleTimeString()}</h5>
        </div>
        );
    }
}

ReactDOM.render(
    <Clock />, document.getElementById(`clock`)
)
```


### Step 3 - Add lifecycle into class
1. 组件第一次渲染时需设置一个定时器 - `挂载(mount)`;
2. 组件被删除时需清除定时器 - `卸载(unmount)`;
3. 为组件添加执行方法 - `生命周期方法`: <br>最好在`componentDidMount()`处设置计时器, 因为组件被渲染到DOM中后运行;<br>`componentWillUnmount()` 中设置清除计时器
4. 在挂载时把计时器ID保存在 `this(this.timerID)` 之中;
5. tick()中设定 `this.setState()` 来时刻更新组件state.

**`Demo: clock.js`**

### 正确使用State - `setState()`

1. 不能直接修改 State


```js
this.state.comment = "123"; //wrong
this.setState({comment:"123"}); //correct
//构造函数时唯一可以给 `this.state` 赋值的地方
```

2. State更新可能是异步更新<br>出于性能考虑, 多个 `setState` 调用可能会被React合并成一个调用, 因为 `this.props` 和 `this.state` 可能会异步更新, 不能够依赖其值来更新下一个状态;

```js
this.setState({ 
    counter: this.state.counter + this props.increment,
     });
     //此方法可能会无法更新计数器

this.setState((state, props) =>({
    counter: state.counter + props.increment
}));
    //此方法使用箭头函数解决上述问题, 让 `setState()` 接收一个函数而不是一个对象, 用上一个state作为第一参数, 将此次更新被应用时的props作为第二参数.

    //上述方法换成普通函数, 如下方代码:
this.setState((state, props){
    return{
        counter: state.counter + props.increment
    };
});
```

3. State 的更新会被(浅)合并
调用 `setState()` 的时候, React会把提供对象浅合并, 所以 `this.setState({comments})` 完整保留了 `this.state.posts`, 但是完全替换 `this.state.comments`.

```js
constructor(props){
  super(props);
  this.state={
    posts:[],
    comments:[]
  };
}
```

可以分别调用 `setState()` 来单独地更新它们:


```js
componentDidMount(){
  fetchPosts().then(response =>{
    this.setState({
      posts: response.posts
    });
  });

    fetchComments().then(response =>{
    this.setState({
      comments: response.comments
    });
  });

}
```


4. State 是向下流动的(封装的)
无论是父组件/子组件都无法知道某个组件有无状态, 除了拥有并设置其组件, 其他组件都无法访问.


```js
<h2>Current time is {this.state.date.toLocaleTimeString()}.</h2>

/*  同适用于: */
<FormattedDate date={this.stste.date} />

/*  其中 `FormattedDate` 的 `props` 会接受参数 `date`, 但是其本身并无法知道此值来自于 `Clock` 的 `state` 或 `props` 亦或是手动输入的:  */
function FormattedDate(props){
  reuturn <h2>Current time is {props.date.toLocaleTimeString()}.</h2>
}
```


**组件是 有/无状态组件 属于组件实现的细节, 可能会随着时间的推移而改变, 有状态的组件中也可以适用无状态组件, vice versa.**

---

## React 组件的生命周期分三个状态 


`Mounting` / `Updating`/ `Unmonting` 即字面意思 

已插入真实DOM / 正在被重新渲染 / 已移出真实DOM

其中生命周期方法有:

> 组件加载时触发, 其中包括 `constructor` 和 `render`:

* componentWillMount<br>渲染前调用, 客户端/服务端均调用;

* componentDidMount<br>首次渲染后调用, 客户端 only;<br>组件已生成对应DOM结构, 可通过 `this.getDOMNode()` 来进行访问

* componentWillReceiveProps<br>当组件接收一个新的 props 时被调用, 也可理解为 `当在父组件改变 props 传值时` <br>在初始化 `render()`时**不会**被调用

> 组件更新时触发 其中包括 `render`

* shouldComponentUpdate** 返回boolean;<br>当组件接收一个新的props/state时被调用,<br>在初始化`render()` 时或者使用 `forceUpdate` 时**不被**调;<br>可在确认**不需要**更新组件时使用

* componentWillUpdate<br>当组件接收一个新的 `props`/`state`时, 但还没有 `render` 时被调用,<br> 在初始化时**不会**被调用.

* componentDidUpdate<br>组件完成更新后立即调用, <br>初始化时**不会**被调用.

* componentWillUnmount<br>组件从DOM中移除之前立刻被调用, 或者理解为`组件销毁时触发`.

## P.S. contructor(props)&super(props)

### constructor(props)
一个构造方法, 用来接收参数, 是类中必须有的, 子类如果没有 constructor方法, 无论定义与否, 都会有它.


### super(props)

`super()` will calls the `constructor` of its `parent` class. 当使用父类变量时声明.

`super(props)` 可以使 `props` 在组件中的 `this.props` 变成可用的 (available).

**其中ES6里面class constructors MUST call super() if they are subclasses**
总之, 用到this就得call super(props), 否则报错

```js
// without super()
class A {
  constructor(){
    this.a = 'hello'
  }
}

class B extends A{
  constructor(){
    console.log(this.a) // ref error
  }
}
console.log(new B());

// with super()
class A {
  constructor(props){
    this.props = props
  }
}

class B entends A{
  constructor(props){
    super(props)
    console.log(this.props)
  }
}
console.log(new B({title:'hello world'}))

```

**而实际上ES7中则不再需要这两项了.**

**`Demo: Button.js`**

