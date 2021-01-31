# HTML5 DnD API

## Usage

```jsx
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function MyReactApp(){
   return (
      <DndProvider backend={HTML5Backend}>
         /* DnD App */
         <DndProvider>
   )
}
```

当你在一个显示器中调用 `getItem()`, HTML5 backend 则会取决于拖拽类型(the drop type)来暴露事件中不同的数据:

-   NativeTypes.FILE:
    -   getItem().files -> 一串文件
    -   getItem().items 并跟随 event.dataTransfer.items -> 每当拖拽一个目录可以用来罗列文件清单
-   NativeTypes:URL:
    -   getItem().urls -> 一串可拖拽的 URLs(the dropped URLs)
-   NativeTypes.TEXT:
    -   getItem().text -> 一份可拖拽的文本
