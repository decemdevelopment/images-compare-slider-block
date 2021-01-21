(function () {
    "use strict";var defaultOptions={container:null,filters:null,hideTexts:null,textPosition:"top",linesOrientation:"horizontal",rotate:0,arrayBackgroundColorText:null,arrayColorText:null,linesColor:null},Dics=function(t){this.options=utils.extend({},[defaultOptions,t],{clearEmpty:!0}),this.container=this.options.container,null==this.container?console.error("Container element not found!"):(this._setOrientation(this.options.linesOrientation,this.container),this.images=this._getImages(),this.sliders=[],this._activeSlider=null,this._load(this.images[0]))};Dics.prototype._load=function(t){var i=this,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1e5;t.naturalWidth?this._buidAfterFirstImageLoad(t):0<e?(e--,setTimeout(function(){i._load(t,e)},100)):console.error("error loading images")},Dics.prototype._buidAfterFirstImageLoad=function(t){this._setContainerWidth(t),this._build(),this._setEvents()},Dics.prototype._setContainerWidth=function(t){this.options.container.style.height="".concat(this._calcContainerHeight(t),"px")},Dics.prototype._setOpacityContainerForLoading=function(t){this.options.container.style.opacity=t},Dics.prototype._build=function(){var t=this;t._applyGlobalClass(t.options);for(var i=t.images.length,e=t.container.getBoundingClientRect()[t.config.sizeField]/i,o=0;o<i;o++){var n=t.images[o],s=t._createElement("div","b-dics__section"),c=t._createElement("div","b-dics__image-container"),r=t._createSlider(o,e);t._createAltText(n,o,c),t._applyFilter(n,o,t.options.filters),t._rotate(n,c),s.setAttribute("data-function","b-dics__section"),s.style.flex="0 0 ".concat(e,"px"),n.classList.add("b-dics__image"),s.appendChild(c),c.appendChild(n),o<i-1&&s.appendChild(r),t.container.appendChild(s),n.style[this.config.positionField]="".concat(o*-e,"px")}this.sections=this._getSections(),this._setOpacityContainerForLoading(1)},Dics.prototype._getImages=function(){return this.container.querySelectorAll("img")},Dics.prototype._getSections=function(){return this.container.querySelectorAll('[data-function="b-dics__section"]')},Dics.prototype._createElement=function(t,i){var e=document.createElement(t);return e.classList.add(i),e},Dics.prototype._setEvents=function(){var c=this;c._disableImageDrag(),c._isGoingRight=null;var n=0,r=function(t){var i=t.pageX?t.pageX:t.touches[0].pageX;i<n?c._isGoingRight=!1:n<i&&(c._isGoingRight=!0),n=i;var e=c._calcPosition(t),o=e-c._beforeSectionsWidth(c.sections,c.images,c._activeSlider);c.sliders[c._activeSlider].style[c.config.positionField]="".concat(e,"px"),c._pushSections(o,e)};c.container.addEventListener("click",r);for(var t=function(i){var e=c.sliders[i];utils.setMultiEvents(e,["mousedown","touchstart"],function(t){c._activeSlider=i,c._clickPosition=c._calcPosition(t),e.classList.add("b-dics__slider--active"),utils.setMultiEvents(c.container,["mousemove","touchmove"],r)})},i=0;i<c.sliders.length;i++)t(i);utils.setMultiEvents(document.body,["mouseup","touchend"],function(){var t=c.container.querySelectorAll(".b-dics__slider--active"),i=!0,e=!1,o=void 0;try{for(var n,s=t[Symbol.iterator]();!(i=(n=s.next()).done);i=!0)n.value.classList.remove("b-dics__slider--active"),utils.removeMultiEvents(c.container,["mousemove","touchmove"],r)}catch(t){e=!0,o=t}finally{try{i||null==s.return||s.return()}finally{if(e)throw o}}})},Dics.prototype._beforeSectionsWidth=function(t,i,e){for(var o=0,n=0;n<t.length;n++){var s=t[n];if(n===e)return o;o+=s.getBoundingClientRect()[this.config.sizeField]}},Dics.prototype._calcContainerHeight=function(t){var i=t.naturalHeight,e=t.naturalWidth;return this.options.container.getBoundingClientRect().width/e*i},Dics.prototype._setLeftToImages=function(t,i){for(var e=0,o=0;o<i.length;o++){i[o].style[this.config.positionField]="-".concat(e,"px"),e+=t[o].getBoundingClientRect()[this.config.sizeField],this.sliders[o].style[this.config.positionField]="".concat(e,"px")}},Dics.prototype._disableImageDrag=function(){for(var t=0;t<this.images.length;t++)this.sliders[t].addEventListener("dragstart",function(t){t.preventDefault()}),this.images[t].addEventListener("dragstart",function(t){t.preventDefault()})},Dics.prototype._applyFilter=function(t,i,e){e&&(t.style.filter=e[i])},Dics.prototype._applyGlobalClass=function(t){var i=t.container;t.hideTexts&&i.classList.add("b-dics--hide-texts"),"vertical"===t.linesOrientation&&i.classList.add("b-dics--vertical"),"center"===t.textPosition?i.classList.add("b-dics--tp-center"):"bottom"===t.textPosition?i.classList.add("b-dics--tp-bottom"):"left"===t.textPosition?i.classList.add("b-dics--tp-left"):"right"===t.textPosition&&i.classList.add("b-dics--tp-right")},Dics.prototype._createSlider=function(t,i){var e=this._createElement("div","b-dics__slider");return this.options.linesColor&&(e.style.color=this.options.linesColor),e.style[this.config.positionField]="".concat(i*(t+1),"px"),this.sliders.push(e),e},Dics.prototype._createAltText=function(t,i,e){var o=t.getAttribute("alt");if(o){var n=this._createElement("p","b-dics__text");this.options.arrayBackgroundColorText&&(n.style.backgroundColor=this.options.arrayBackgroundColorText[i]),this.options.arrayColorText&&(n.style.color=this.options.arrayColorText[i]),n.appendChild(document.createTextNode(o)),e.appendChild(n)}},Dics.prototype._rotate=function(t,i){t.style.rotate="-".concat(this.options.rotate),i.style.rotate=this.options.rotate},Dics.prototype._removeActiveElements=function(){var t=Dics.container.querySelectorAll(".b-dics__slider--active"),i=!0,e=!1,o=void 0;try{for(var n,s=t[Symbol.iterator]();!(i=(n=s.next()).done);i=!0){n.value.classList.remove("b-dics__slider--active"),utils.removeMultiEvents(Dics.container,["mousemove","touchmove"],Dics.prototype._removeActiveElements)}}catch(t){e=!0,o=t}finally{try{i||null==s.return||s.return()}finally{if(e)throw o}}},Dics.prototype._setOrientation=function(t){this.config={},this.config.pageField="vertical"===t?(this.config.offsetSizeField="offsetHeight",this.config.offsetPositionField="offsetTop",this.config.sizeField="height",this.config.positionField="top",this.config.clientField="clientY","pageY"):(this.config.offsetSizeField="offsetWidth",this.config.offsetPositionField="offsetLeft",this.config.sizeField="width",this.config.positionField="left",this.config.clientField="clientX","pageX")},Dics.prototype._calcPosition=function(t){var i=this.container.getBoundingClientRect(),e=isNaN(t[this.config.clientField])?t.touches[0][this.config.clientField]:t[this.config.clientField];return i[this.config.positionField]<e?e-i[this.config.positionField]:0},Dics.prototype._pushSections=function(t,i){this._setFlex(i,this._isGoingRight);var e=this.sections[this._activeSlider],o=this.sections[this._activeSlider+1],n=o.getBoundingClientRect()[this.config.sizeField]-(t-this.sections[this._activeSlider].getBoundingClientRect()[this.config.sizeField]);e.style.flex=!0===this._isGoingRight?"2 0 ".concat(t,"px"):"1 1 ".concat(t,"px"),o.style.flex=!0===this._isGoingRight?" ".concat(n,"px"):"2 0 ".concat(n,"px"),this._setLeftToImages(this.sections,this.images)},Dics.prototype._setFlex=function(t,i){for(var e=0,o=0;o<this.sections.length;o++){var n=this.sections[o],s=n.getBoundingClientRect()[this.config.sizeField];e+=s,i&&e-s<t&&o>this._activeSlider||!i&&t<e&&o<this._activeSlider?n.style.flex="1 100 ".concat(s,"px"):n.style.flex="0 0 ".concat(s,"px")}};var utils={extend:function(t,i,n){for(var e in i)i.hasOwnProperty(e)&&s(t,i[e]);function s(t,i){for(var e in i)if(i.hasOwnProperty(e)){var o=i[e];if("Object"===utils.getConstructor(o))t[e]||(t[e]={}),s(t[e],o);else{if(n.clearEmpty&&null==o)continue;t[e]=o}}}return t},setMultiEvents:function(t,i,e){for(var o=0;o<i.length;o++)t.addEventListener(i[o],e)},removeMultiEvents:function(t,i,e){for(var o=0;o<i.length;o++)t.removeEventListener(i[o],e,!1)},getConstructor:function(t){return Object.prototype.toString.call(t).slice(8,-1)}};

    new Dics({
        container: document.querySelector('.b-dics'),
        hideTexts: true
    });
})()


// documentation: https://github.com/abelcabezaroman/definitive-image-comparison-slider