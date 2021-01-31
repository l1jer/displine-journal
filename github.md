# Github issues

## DNS Record

Github Page 帮助手册里面, 可能是自己阅读有误, 一开始设置没有跟随 Apex Domain 而是跟随了 Subscribe Domain 操作, 没能成功设置绑定, 联系了客服, 客服帮忙设置了 Github 的 DNS records

类型为 CNAME:

> www rsbb0818.github.io
> dumplingsocial.com.au 185.199.108.153
> dumplingsocial.com.au 185.199.109.153
> dumplingsocial.com.au 185.199.110.153
> dumplingsocial.com.au 185.199.111.153

而其中如果是 username.github.io 可以用 CNAME, 而使用 repo 的话(username.github.io/repo-name)则需要换成类型 A, 而不是 CNAME, 需要查看是否有已存在的 DNS records 被设置了, 完全清除后, 重新存入 A 类型的以上内容即可.
