# PersistGate

**实现 Redux 数据持久化**

在 Redex 的管理中, 每一次进入程序主页面的时候, 自动加载出上次的数据, 而 redux-persist 即是一个统一的方式来进行操作.

```jsx
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store/configureStore";

const onBeforeLift = () => {
  // 在PersistGate被lift之前, 执行的操作
};

const config = { key: "root", storage };

function configureStore() {
  let reducer = persistCombineReducers(config, reducers);
  let store = createStore(reducer, applyMiddleWare(thunk));
  let persistor = persistStore(store);
  return { persistor, store };
}
const { persistor, store } = configureStore();

ReactDOM.render(
  <Provider
    store={store}
    style={{
      overflow: "hidden",
      height: "100vh",
    }}
  >
    <PersistGate
      loading={null}
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path={"/login"} component={LoginPage} />
          <Route path="/" component={App} /> <Route component={RouteFallback} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
```

Redux 有个调试神器 `remote-redux-devtools`

```js
let store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    devToolsEnhancer({ realtime: true, port: 8000 })
  )
);
```

调试页面中可以查看 PERSIST 和 REHYDRATE 会把上一次的 redux 中的 states 注入到当前组件中, 即完成持久化.

Provider -> ???
