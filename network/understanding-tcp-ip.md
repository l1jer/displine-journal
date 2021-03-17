#### 分类

**TCP/IP**（4层）：<u>网络接口层</u>、 网络层、`运输层`、 应用层。

**五层协议** （5层）：<u>物理层、数据链路层</u>、网络层、`运输层`、 应用层。

**OSI** （7层）：物理层、数据链路层、网络层、``传输层、会话层、表示层`、应用层。



#### 协议

网络接口层:

* 物理层：RJ45、CLOCK、IEEE802.3 （中继器，集线器）

* 数据链路：PPP、FR、HDLC、VLAN、MAC （网桥，交换机）

网络层：IP、ICMP、ARP、RARP、OSPF、IPX、RIP、IGRP、 （路由器）

运输层:

* 传输层：TCP、UDP、SPX
* 会话层：NFS、SQL、NETBIOS、RPC
* 表示层：JPEG、MPEG、ASII

应用层：FTP、DNS、Telnet、SMTP、HTTP、WWW、NFS



#### 作用

物理层 Physical Layer：通过媒介传输比特,确定机械及电气规范（比特Bit）

数据链路层 Datalink：将比特组装成帧和点到点的传递（帧Frame）

网络层 Network Layer：负责数据包从源到宿的传递和网际互连（包Packet）

传输层：提供端到端的可靠报文传递和错误恢复（段Segment）

会话层 ：建立、管理和终止会话（会话协议数据单元SPDU）

表示层 Presentation Layer：对数据进行翻译、加密和压缩（表示协议数据单元PPDU）

应用层 Application Layer：允许访问OSI环境的手段（应用协议数据单元APDU）

