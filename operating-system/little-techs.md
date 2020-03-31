## Windows/MacOS/Linus 的 Tips 集锦

### MacOS

#### 设置 Dock 隐藏恢复速度

  `defaults write com.apple.Dock autohide-delay -float 0 && killall Dock`
#### 恢复 Dock 默认隐藏恢复速度

  `defaults delete com.apple.Dock autohide-delay && killall Dock`

----

### 实现 Home/End 键的快捷键

#### 跳至：

```css
fn + 右箭头 = 文章尾部
option + 左箭头 = 当前单词的头
option + 左箭头 = 当前单词的尾

command + 左箭头 = 当前行的头
command + 左箭头 = 当前行的尾
```

#### 选取:

```css
fn + 左箭头 + shift = 选中当前鼠标位置到文章头部所有内容
fn + 左箭头 + shift = 选中当前鼠标位置到文章尾部所有内容

option + 左箭头 + shift = 选中当前鼠标位置到当前单词的头
option + 左箭头 + shift = 选中当前鼠标位置到当前单词的尾

command + 左箭头 + shift = 选中当前鼠标位置到当前行的头
command + 左箭头 + shift = 选中当前鼠标位置到当前行的尾
```



---

### Windows