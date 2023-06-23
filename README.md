<div align="center">
  <img src="https://rawcdn.githack.com/pdxjie/feature-play/34d9a7b9ea85ddca546fc35cf403feae1bfcbf8f/feature-play-applet/static/pi.png" style="width:100px;height:100px;">
</div>
<div>
<p align="center">
<h2 align="center">派多宝</h2>
 <p align="center">一款基于SpringBoot+微信小程序的前后端分离娱乐小程序开源项目</p>

> 小程序所需数据是使用Jsonp通过Java爬虫获取
</p>
</div>
<h3>目录结构：</h3>

|  子项目   | 描述  | 目录地址 | 
|  ----  | ----  | ---- |
| <a href="https://github.com/pdxjie/feature-play/tree/master/feature-play-applet">🛸派多宝小程序前端</a>  | 微信小程序页面结构 | <a href="https://github.com/pdxjie/feature-play/tree/master/feature-play-applet">feature-play-applet</a>
| <a href="https://github.com/pdxjie/feature-play/tree/master/feature-play-server">🛰️派多宝后端服务</a>  | Jsonp爬虫业务逻辑 | <a href="https://github.com/pdxjie/feature-play/tree/master/feature-play-server">feature-play-server</a>

<h3>小程序截图：</h3>
<div>
<img src="https://rawcdn.githack.com/pdxjie/feature-play/b9112f1fa0b246567cd6949f433da294f956d8a2/asset/index.png" style="width:250px;height:500px;">
<img src="https://rawcdn.githack.com/pdxjie/feature-play/b9112f1fa0b246567cd6949f433da294f956d8a2/asset/home.png" style="width:250px;height:500px;">
<img src="https://rawcdn.githack.com/pdxjie/feature-play/b9112f1fa0b246567cd6949f433da294f956d8a2/asset/menu.png" style="width:250px;height:500px;">
<img src="https://rawcdn.githack.com/pdxjie/feature-play/b9112f1fa0b246567cd6949f433da294f956d8a2/asset/menu-item.png" style="width:250px;height:500px;">
<img src="https://rawcdn.githack.com/pdxjie/feature-play/b9112f1fa0b246567cd6949f433da294f956d8a2/asset/sick.png" style="width:250px;height:500px;">
<img src="https://rawcdn.githack.com/pdxjie/feature-play/b9112f1fa0b246567cd6949f433da294f956d8a2/asset/sick-item.png" style="width:250px;height:500px;">
<img src="https://rawcdn.githack.com/pdxjie/feature-play/b9112f1fa0b246567cd6949f433da294f956d8a2/asset/draw.png" style="width:250px;height:500px;">
<img src="https://rawcdn.githack.com/pdxjie/feature-play/b9112f1fa0b246567cd6949f433da294f956d8a2/asset/me.png" style="width:250px;height:500px;">
</div>
<h3>小程序预览：</h3>
<img src="https://rawcdn.githack.com/pdxjie/feature-play/b9112f1fa0b246567cd6949f433da294f956d8a2/asset/code.jpg" />

<h3>项目分析：</h3>
<h4>前端目录结构：</h4>

```aidl
feature-play-applet

|-- colorui                             Css样式库
|-- component                           自定义组件库
|-- components                          自定义组件库
|-- images                              图片资源
|-- pages                               主包
|-- pagesA                              分包A
|-- pagesB                              分包B
|-- static                              静态资源
|-- utils                               工具类
```

<h4>后端目录结构：</h4>

```aidl
feature-play-server

|-- config                              Configuration配置类
|-- controller                          前端控制层
|-- dto                                 响应类DTO
|-- service                             业务层
|-- toBean                              请求类层
|-- utils                               工具类
```
<h4>项目技术分析：</h4>

1. <a href="https://github.com/pdxjie/feature-play/tree/master/feature-play-applet" style="font-weight: 600">派多宝小程序前端🎈</a>

- 微信小程序
- VantUI
- ColorUI
- Node版本 > 10 ⚠️
- 微信web开发者工具 v0.9

2. <a href="https://github.com/pdxjie/feature-play/tree/master/feature-play-server">派多宝后端服务🧸</a>

- JDK1.8
- SpringBoot2.x
- Jsonp
- Redis
