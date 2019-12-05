# 图片懒加载

### 页面多块区域垂直水平滚动后的图片懒加载


[预览地址](https://wangzhenhao.github.io/img-lazy-load/example/demo.html)

### 1: npm引入
```
npm i -D i-lazy-load
```
### 2：获取dist目录下面文件

```
注意: 使用插件之前需要用css把页面的布局好，图片容器一定需要设置宽度和高度


var windowImgLoad = new ImgLazyLoad({
  target: window,
  el: '.body-wrap',
  distance: 50,
  interval: 250,
  beforeLoad: function(el) {
    console.log(el)
  },
  finishLoad: function(el) {
    console.log(el)
  },
  errorLoad: function(el, event) {
    console.log(el, event)
  }
})

参数说明：
target      null|window      如果是整个页面滚动需要这是target为window
el          string           需要滚动的区域元素
distance    number           距离可视区多远的距离开始加载图片
interval    number           滚动条停止多少毫秒后执行懒加载
beforeLoad  function         图片开始加载执行函数
finishLoad  function         图片加载成功执行函数
errorLoad   function         图片加载错误执行函数
```

```
外部调用方法：
windowImgLoad.refresh();
windowImgLoad.distroryed();

refresh()      重新初始化加载图片（用于无限滚动或者分页)
distroryed()   销毁滚动事件
```

### QQ交流群：475870039
