# Windows/MacOS/Linus 的 Tips 集锦

## MacOS

  ### 设置 Dock 隐藏恢复速度
  `defaults write com.apple.Dock autohide-delay -float 0 && killall Dock`
  ### 恢复 Dock 默认隐藏恢复速度
  `defaults delete com.apple.Dock autohide-delay && killall Dock`