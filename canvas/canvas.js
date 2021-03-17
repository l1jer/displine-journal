window.onload = function () {
  var canvas = document.getElementById("canvas");

  canvas.width = 800;
  canvas.height = 800;

  var context = canvas.getContext("2d");

  // 将画笔移动至
  context.moveTo(100, 100);

  // 画直线到指定位置
  context.lineTo(200, 200);

  // 线条宽度
  context.lineWidth = 10;

  // 设置线条颜色
  context.strokeStyle = "black"; //设置颜色
  context.stroke(); //使用颜色

  // 开始绘制/重新, 清空画笔坐标点
  context.beginPath();

  // 结合beginPath, 封闭图形, 否则出现衔接处泄露
  context.closePath();
  // closePath可以自动完成最后一笔封闭图形

  // 填充, 和stroke先后顺序会改变填充和边框覆盖问题
  context.fillStyle = "white";
  context.fill();

  context.rect(x, y, width, height);
  context.fillRect(x, y, width, height);
  context.strokeRect(x, y, width, height);

  // 调用函数绘制长方形
  drawRect(context, 100, 100, 400, 400, 10, "#000", "FFF");
  //填充矩形
  ctx.fillRect(25, 25, 100, 100);
  // 矩形边框
  ctx.clearRect(45, 45, 60, 60);
  // 清除指定矩形区域, 使其完全透明
  ctx.strokeRect(50, 50, 50, 50);

  // 调用函数绘制五角星
  drawStar(context, 400, 400, 300, 150, 20);
  for (var i = 0; i < 200; i++) {
    var r = Math.random() * 10 + 10;
    var x = Math.random() * canvas.width; //距离宽度的随机值
    var y = Math.random() * canvas.height; //距离高度的随机值
    var a = Math.random() * 360; // 偏移角度
    drawStar(context, x, y, r, r / 2.0, a);
  }

  // 线条相接处形状
  context.lineJoin = "miter";
  /*
  miter (default) 尖角
  bevel 斜切
  round 圆角
  */
  context.miterLimit = 10;

  // 图形变换
  // 位移 translate(x,y)
  // 旋转 rotate(deg)
  // 缩放 scale(sx,sy)

  context.save(); //保存当前绘制状态也
  context.restore(); //恢复已保存绘制状态
};

// 利用函数来撰写绘制长方形
function drawRect(cxt, x, y, w, h, borderW, borderColor, fillColor) {
  cxt.lineWidth = borderW;
  cxt.fillStyle = fillColor;
  cxt.strokeStyle = borderColor;

  cxt.fillRect(x, y, w, h);
  cxt.strokeRect(x, y, w, h);
}

// --- 线条的属性 ---
/*
lineCap: 线条两端的形状, 不能用在线条连接处
  butt (default)
  round 和 square: 会在始末超出线条路径始末
*/

function drawStar(cxt, r, R, x, y) {
  cxt.beginPath();
  for (var i = 0; i < 5; i++) {
    cxt.lineTo(
      Math.cos(((18 + i * 72) / 180) * Math.PI) * R + x,
      -Math.sin(((18 + i * 72) / 180) * Math.PI) * R + y
    );
    cxt.lineTo(
      Math.cos(((54 + i * 72) / 180) * Math.PI) * r + x,
      -Math.sin(((54 + i * 72) / 180) * Math.PI) * r + y
    );
    cxt.closePath();
    cxt.stroke();
  }
}

// 实现函数调用绘制可复用结构

function drawStart(cxt, x, y, R, rot) {
  starPath(cxt);
}
function starPath(cxt) {
  cxt.beginPath();
  for (var i = 0; i < 5; i++) {
    cxt.lineTo(
      Math.cos(((18 + i * 72) / 180) * Math.PI) * R + x,
      -Math.sin(((18 + i * 72) / 180) * Math.PI) * R + y
    );
    cxt.lineTo(
      Math.cos(((54 + i * 72) / 180) * Math.PI) * r + x,
      -Math.sin(((54 + i * 72) / 180) * Math.PI) * r + y
    );
    cxt.closePath();
    cxt.stroke();
  }
}
