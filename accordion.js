var Accordion = function(host) {
	var STYLE = 
    '* {'+
      'font-size:13px;'+
      'font-family:\'Trebuchet MS\',Tahoma,Verdana;'+
    '}'+
    'h3 {'+
      'border-radius:4px;'+
      'border:solid 1px #CCC;'+
      'padding:.5em .5em .5em 2.2em;'+
      'line-height:17px;'+
      'cursor:pointer;'+
      'background:-webkit-linear-gradient(top, #fafafa 0%, #fafafa 49%, #f5f5f5 50%, #f5f5f5 100%);'+
      'color:#1C94C4;'+
      'text-decoration:none;'+
      'font-size:13px;'+
      'margin:1px 0 0 0;'+
    '}'+
    'h3:before {'+
      'position: absolute;'+
      'content: url(images/close_arrow.png);'+
      'left: 15px;'+
    '}'+
    'h3:nth-of-type(##n##) {'+
      'border-radius:0;'+
      'border-top-left-radius:4px;'+
      'border-top-right-radius:4px;'+
      'border-top:1px solid #FBD850;'+
      'border-right:1px solid #FBD850;'+
      'border-left:1px solid #FBD850;'+
      'border-bottom:0px;'+
      'line-height:1.3;'+
      'background:none;'+
      'color:#EB8F00;'+
    '}'+
    'h3:nth-of-type(##n##):before {'+
      'content: url(images/open_arrow.png);'+
    '}'+
    'h3:hover:not(.active) {'+
      'background: -webkit-linear-gradient(top, #FCF8DB 0%, #FCF8DB 49%, #FDF5CE 50%, #FDF5CE 100%);'+
    '}'+
    '#accordion div{'+
      'font-size:12px;'+
      'padding:0em 2.2em;'+
      'background:-webkit-linear-gradient(top, #f8f8f8 0%, #f8f8f8 30%, #f0f0f0 40%, #f0f0f0 100%);'+
      'border-bottom-left-radius:4px;'+
      'border-bottom-right-radius:4px;'+
      'border:0px;'+
      'height:0px;'+
      'overflow:hidden;'+
      '-webkit-transition:height 0.3s ease-out;'+
    '}'+
    '#accordion div:nth-of-type(##n##) {'+
      'padding:1em 2.2em;'+
      'height:111px;'+
      'border-bottom:solid 1px #ddd;'+
      'border-right:solid 1px #ddd;'+
      'border-left:solid 1px #ddd;'+
    '}';
	var TEMPLATE =
    '<style>##style##</style>'+
    '<content select="h3:nth-of-type(-n+##n##)" class="title pre"></content>'+
    '<content select="h3:nth-of-type(##n##)" class="title current"></content>'+
    '<content select="div:nth-of-type(##n##)" class="content current"></content>'+
    '<content select="h3:nth-of-type(n+##n##)" class="title post"></content>';
  this.root = new WebKitShadowRoot(host);
  this.index = 1;

  var html = TEMPLATE.replace(/##style##/, STYLE).replace(/##n##/g, this.index);
  this.root.innerHTML = html;
  var that = this;
  [].forEach.call(this.root.host.querySelectorAll('h3'), function(h3) {
    h3.addEventListener('click', that.onSelect.bind(that));
  });
  this.styleRules = [].slice.call(this.root.querySelector('style').sheet.rules);
};
Accordion.prototype = {
  indexOf: function(elem) {
    return [].slice.call(this.root.host.querySelectorAll(elem.nodeName)).indexOf(elem)+1;
  },
  updateStyle: function() {
    var that = this;
    this.styleRules.forEach(function(rule) {
      if (rule.selectorText.indexOf('nth-of-type') > 0) {
        rule.selectorText = rule.selectorText.replace(/nth-of-type\((.*?)\)/, 'nth-of-type('+that.index+')');
      }
    });
  },
  updateContent: function() {
    this.root.querySelector('content.title.pre').select = 'h3:nth-of-type(-n+'+this.index+')';
    this.root.querySelector('content.title.current').select = 'h3:nth-of-type('+this.index+')';
    this.root.querySelector('content.title.current').select = 'div:nth-of-type('+this.index+')';
    this.root.querySelector('content.title.post').select = 'h3:nth-of-type(n+'+this.index+')';
  },
  onSelect: function(e) {
    this.index = this.indexOf(e.target);
    this.updateStyle();
    this.updateContent();
  }
};

window.addEventListener('DOMContentLoaded', function() {
  new Accordion(document.querySelector('#accordion'));
});