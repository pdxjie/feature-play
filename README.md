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
<h3>小程序截图：</h3>
