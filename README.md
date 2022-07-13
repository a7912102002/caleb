## 專案啟動步驟

直接點開以下連結即可。
[測驗連結](https://a7912102002.github.io/caleb "測驗連結")

自首尚未完成部分  
5. 使用 Pug 模板語法。  
6. 使用 Tailwind Css 。  



## 快速排版方式
利用.row、.col、.col-auto 排版

![情境圖](https://a7912102002.github.io/caleb/readme_img/row1.jpg "情境圖")

```html
<div class="row">
  <div class="col-auto"></div>
  <div class="col"></div>
  <div class="col-auto"></div>
</div>
```

利用.row、.col 等分排版

![情境圖](https://a7912102002.github.io/caleb/readme_img/row2.jpg "情境圖")

```html
<div class="row">
  <div class="col"></div>
  <div class="col"></div>
  <div class="col"></div>
</div>
```

## 快速微調的 class

flex 垂直排版

```css
.align-items-start { /*垂直置頂*/
  -webkit-box-align: start !important;
  -ms-flex-align: start !important;
  align-items: flex-start !important;
}
.align-self-center { /*垂直置中*/
  -ms-flex-item-align: center !important;
  align-self: center !important;
}
.align-self-bottom { /*垂直置底*/
  -ms-flex-item-align: flex-end !important;
  align-self: flex-end !important;
}
```

flex 順序調換

```css
.order-first {
  -webkit-box-ordinal-group: 0;
  -ms-flex-order: -1;
  order: -1;
}
.order-last {
  -webkit-box-ordinal-group: 14;
  -ms-flex-order: 13;
  order: 13;
}
.order-0 {
  -webkit-box-ordinal-group: 1;
  -ms-flex-order: 0;
  order: 0;
}
.order-1 {
  -webkit-box-ordinal-group: 2;
  -ms-flex-order: 1;
  order: 1;
}
/*最多至 13*/
```

padding 微調

```css
  .p-0 {
    padding: 0 !important;
  }
  .pt-0{
    padding-top: 0 !important;
  }
  .pr-0{
    padding-right: 0 !important;
  }
  .pb-0{
    padding-bottom: 0 !important;
  }
  .pl-0{
    padding-left: 0 !important;
  }
  /*目前有 0、3、5、10、15、20、25、30、50*/
```
margin 微調

```css
.m-0{
  margin: 0 !important;
}
.mt-0{
  margin-top: 0 !important;
}
.mr-0{
  margin-right: 0 !important;
}
.mb-0{
  margin-bottom: 0 !important;
}
.ml-0{
  margin-left: 0 !important;
}
/*目前有 auto、-15、0、5、10、15、20、25、30、40、80、100*/
```

陸續更新中 ...
