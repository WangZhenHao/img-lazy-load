# 图片懒加载

### 页面多块区域垂直水平滚动后的图片懒加载

![calendar](https://github.com/WangZhenHao/plugin-collect/blob/master/example/1.png)

[git地址](https://github.com/WangZhenHao/img-lazy-load)

[案例预览地址](https://wangzhenhao.github.io/img-lazy-load/example/demo.html)

### 1: npm引入
```
npm i -S i-lazy-load
```
### 2：获取dist目录下面文件


### 使用说明：
```
 给父容器设置滚动overflow:auto, 图片容器添加data-src或者data-background-src即可


 <div class="right-wrap">
  <img index="1"
    data-src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3193768446,2243374232&fm=26&gp=0.jpg"
    alt="">
  <img class="data-bg" index="2"
    data-background-src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=247517070,1591581274&fm=26&gp=0.jpg"
    alt=""></img>
</div>

```
```
注意: 使用插件之前需要用css把页面的布局好，图片容器一定需要设置宽度和高度


var windowImgLoad = new ImgLazyLoad({
  target: window,
  el: '.right-wrap',
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
