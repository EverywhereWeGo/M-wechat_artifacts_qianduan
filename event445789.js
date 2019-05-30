define("biz_wap/utils/ajax_wx.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
console.log(e),/^(http:\/\/|https:\/\/|\/\/)/.test(e.url)?/^\/\//.test(e.url)&&(e.url="https:"+e.url):e.url="https://mp.weixin.qq.com/"+e.url.replace(/^\//,""),
e.url+=-1==e.url.indexOf("?")?"?fasttmplajax=1":"&fasttmplajax=1","html"==e.f||-1!=e.url.indexOf("?f=json")&&-1!=e.url.indexOf("&f=json")||(e.url+="&f=json");
var t=null;
if("object"==typeof e.data){
var o=e.data;
t=[];
for(var a in o)o.hasOwnProperty(a)&&t.push(a+"="+encodeURIComponent(o[a]));
t=t.join("&");
}else t="string"==typeof e.data?e.data:null;
console.log("before request");
var n=1,i=function(e,t){
return r.invoke("request",{
url:e.url,
method:e.type,
data:t,
header:{
Cookie:document.cookie
}
},function(o){
if(console.log("jsapiRequest",o.err_msg),o.err_msg.indexOf(":ok")>-1){
var a={};
if(o.data){
console.log(e.dataType),console.log(e);
try{
a="json"==e.dataType?JSON.parse(o.data):o.data;
}catch(l){
return console.error(l),void(e.error&&e.error({}));
}
}
var c={};
try{
c=JSON.parse(o.data);
}catch(l){}
c.base_resp&&"-3"==c.base_resp.ret&&n>0?(n--,r.invoke("updatePageAuth",{},function(r){
console.log("updatePageAuth",r),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_3_1",
r&&r.err_msg&&r.err_msg.indexOf(":ok")>-1?(window.top.pass_ticket=encodeURIComponent(s.getQuery("pass_ticket",r.fullUrl).html(!1).replace(/\s/g,"+")),
e.pass_ticket&&(e.pass_ticket=window.top.pass_ticket),i(e,t),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_4_1"):e.success&&e.success(a);
})):e.success&&e.success(a);
}else o.err_msg.indexOf("no permission")>-1?Ajax(e):e.error&&e.error({});
e.complete&&e.complete();
});
};
return i(e,t);
}
e("biz_common/utils/string/html.js");
var s=e("biz_common/utils/url/parse.js"),r=e("biz_wap/jsapi/core.js");
return t;
});define("biz_common/utils/respTypes.js",[],function(require,exports,module,alert){
"use strict";
var logList=[],log=function(r){
logList.push(r);
},printLog=function(){
for(var r=0,e=logList.length;e>r;++r)console.log("[RespType]"+logList[r]);
},isArray=function(r){
return"[object Array]"==Object.prototype.toString.call(r);
},getValueType=function(r){
return isArray(r)?"array":typeof r;
},parseRtDesc=function(r,e){
var t="mix",o=!1,c=e;
if(e){
var n="_R",s=e.indexOf(n),i=e.length-n.length;
o=-1!=s&&s==i,c=o?e.substring(0,i):e;
}
return"string"==typeof r?t=r:isArray(r)?t="array":"object"==typeof r&&(t="object"),
{
key:c,
type:t,
isRequired:o
};
},checkForArrayRtDesc=function(r,e){
if(!isArray(r))return!1;
for(var t=0,o=r.length;o>t;++t){
for(var c,n=r[t],s=0,i=0===e.length;c=e[s++];)if(checkForRtDesc(n,c)){
i=!0;
break;
}
if(!i)return!1;
}
return!0;
},checkForStringRtDesc=function(r,e){
var t=getValueType(r),o=parseRtDesc(e),c=o.type==t;
return c||log("miss match type : "+t+" !== "+o.type),c;
},checkForObjectRtDesc=function(r,e){
if("object"!=typeof r||isArray(r))return log("must be object"),!1;
var t=r,o=r;
for(var c in e)if(e.hasOwnProperty(c)){
var n=e[c],s=parseRtDesc(n,c),i=s.key;
o=t[i];
var u=getValueType(o);
if(s.isRequired&&void 0===o)return log("is required @key="+i),!1;
if(void 0!==o){
if(u!=s.type&&"mix"!=s.type)return log("miss match type : "+u+" !== "+s.type+" @key="+i),
!1;
if(("array"==u||"object"==u)&&"mix"!=s.type&&!checkForRtDesc(o,n))return!1;
}
}
return!0;
},checkForRtDesc=function(r,e){
return isArray(e)?checkForArrayRtDesc(r,e):"object"==typeof e?checkForObjectRtDesc(r,e):"string"==typeof e?checkForStringRtDesc(r,e):!1;
},check=function(json,rtDescs){
if("string"==typeof json)try{
json=eval("("+json+")");
}catch(e){
return log("parse json error"),!1;
}
if("object"!=typeof json)return log("must be object"),!1;
isArray(rtDesc)||(rtDescs=[rtDescs]);
for(var rtDesc,i=0;rtDesc=rtDescs[i++];)if(checkForRtDesc(json,rtDesc))return!0;
return!1;
};
return{
check:function(r,e){
logList=[];
try{
var t=check(r,e);
return t||printLog(),t;
}catch(o){
return logList.push("[rtException]"+o.toString()),printLog(),!1;
}
},
getMsg:function(){
return logList.join(";");
}
};
});define("biz_common/template-2.0.1-cmd.js",[],function(){
"use strict";
var e=function(n,t){
return e["object"==typeof t?"render":"compile"].apply(e,arguments);
};
return window.template=e,function(e,n){
e.version="2.0.1",e.openTag="<#",e.closeTag="#>",e.isEscape=!0,e.isCompress=!1,e.parser=null,
e.render=function(e,n){
var t=r(e);
return void 0===t?o({
id:e,
name:"Render Error",
message:"No Template"
}):t(n);
},e.compile=function(n,r){
function a(t){
try{
return new l(t)+"";
}catch(i){
return u?(i.id=n||r,i.name="Render Error",i.source=r,o(i)):e.compile(n,r,!0)(t);
}
}
var c=arguments,u=c[2],s="anonymous";
"string"!=typeof r&&(u=c[1],r=c[0],n=s);
try{
var l=i(r,u);
}catch(p){
return p.id=n||r,p.name="Syntax Error",o(p);
}
return a.prototype=l.prototype,a.toString=function(){
return l.toString();
},n!==s&&(t[n]=a),a;
},e.helper=function(n,t){
e.prototype[n]=t;
},e.onerror=function(e){
var t="[template]:\n"+e.id+"\n\n[name]:\n"+e.name;
e.message&&(t+="\n\n[message]:\n"+e.message),e.line&&(t+="\n\n[line]:\n"+e.line,
t+="\n\n[source]:\n"+e.source.split(/\n/)[e.line-1].replace(/^[\s\t]+/,"")),e.temp&&(t+="\n\n[temp]:\n"+e.temp),
n.console&&console.error(t);
};
var t={},r=function(r){
var o=t[r];
if(void 0===o&&"document"in n){
var i=document.getElementById(r);
if(i){
var a=i.value||i.innerHTML;
return e.compile(r,a.replace(/^\s*|\s*$/g,""));
}
}else if(t.hasOwnProperty(r))return o;
},o=function(n){
function t(){
return t+"";
}
return e.onerror(n),t.toString=function(){
return"{Template Error}";
},t;
},i=function(){
e.prototype={
$render:e.render,
$escape:function(e){
return"string"==typeof e?e.replace(/&(?![\w#]+;)|[<>"']/g,function(e){
return{
"<":"&#60;",
">":"&#62;",
'"':"&#34;",
"'":"&#39;",
"&":"&#38;"
}[e];
}):e;
},
$string:function(e){
return"string"==typeof e||"number"==typeof e?e:"function"==typeof e?e():"";
}
};
var n=Array.prototype.forEach||function(e,n){
for(var t=this.length>>>0,r=0;t>r;r++)r in this&&e.call(n,this[r],r,this);
},t=function(e,t){
n.call(e,t);
},r="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",o=/\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,i=/[^\w$]+/g,a=new RegExp(["\\b"+r.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),c=/\b\d[^,]*/g,u=/^,+|,+$/g,s=function(e){
return e=e.replace(o,"").replace(i,",").replace(a,"").replace(c,"").replace(u,""),
e=e?e.split(/,+/):[];
};
return function(n,r){
function o(n){
return g+=n.split(/\n/).length-1,e.isCompress&&(n=n.replace(/[\n\r\t\s]+/g," ")),
n=n.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n"),n=w[1]+"'"+n+"'"+w[2],
n+"\n";
}
function i(n){
var t=g;
if(p?n=p(n):r&&(n=n.replace(/\n/g,function(){
return g++,"$line="+g+";";
})),0===n.indexOf("=")){
var o=0!==n.indexOf("==");
if(n=n.replace(/^=*|[\s;]*$/g,""),o&&e.isEscape){
var i=n.replace(/\s*\([^\)]+\)/,"");
$.hasOwnProperty(i)||/^(include|print)$/.test(i)||(n="$escape($string("+n+"))");
}else n="$string("+n+")";
n=w[1]+n+w[2];
}
return r&&(n="$line="+t+";"+n),a(n),n+"\n";
}
function a(e){
e=s(e),t(e,function(e){
h.hasOwnProperty(e)||(c(e),h[e]=!0);
});
}
function c(e){
var n;
"print"===e?n=O:"include"===e?(y.$render=$.$render,n=j):(n="$data."+e,$.hasOwnProperty(e)&&(y[e]=$[e],
n=0===e.indexOf("$")?"$helpers."+e:n+"===undefined?$helpers."+e+":"+n)),m+=e+"="+n+",";
}
var u=e.openTag,l=e.closeTag,p=e.parser,f=n,d="",g=1,h={
$data:!0,
$helpers:!0,
$out:!0,
$line:!0
},$=e.prototype,y={},m="var $helpers=this,"+(r?"$line=0,":""),v="".trim,w=v?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],b=v?"if(content!==undefined){$out+=content;return content}":"$out.push(content);",O="function(content){"+b+"}",j="function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);"+b+"}";
t(f.split(u),function(e){
e=e.split(l);
var n=e[0],t=e[1];
1===e.length?d+=o(n):(d+=i(n),t&&(d+=o(t)));
}),f=d,r&&(f="try{"+f+"}catch(e){e.line=$line;throw e}"),f="'use strict';"+m+w[0]+f+"return new String("+w[3]+")";
try{
var E=new Function("$data",f);
return E.prototype=y,E;
}catch(T){
throw T.temp="function anonymous($data) {"+f+"}",T;
}
};
}();
e.openTag="{",e.closeTag="}",e.parser=function(n){
n=n.replace(/^\s/,"");
var t=n.split(" "),r=t.shift(),o=e.keywords,i=o[r];
return i&&o.hasOwnProperty(r)?(t=t.join(" "),n=i.call(n,t)):e.prototype.hasOwnProperty(r)?(t=t.join(","),
n="=="+r+"("+t+");"):(n=n.replace(/[\s;]*$/,""),n="="+n),n;
},e.keywords={
"if":function(e){
return"if("+e+"){";
},
"else":function(e){
return e=e.split(" "),e="if"===e.shift()?" if("+e.join(" ")+")":"","}else"+e+"{";
},
"/if":function(){
return"}";
},
each:function(e){
e=e.split(" ");
var n=e[0]||"$data",t=e[1]||"as",r=e[2]||"$value",o=e[3]||"$index",i=r+","+o;
return"as"!==t&&(n="[]"),"$each("+n+",function("+i+"){";
},
"/each":function(){
return"});";
},
echo:function(e){
return"print("+e+");";
},
include:function(e){
e=e.split(" ");
var n=e[0],t=e[1],r=n+(t?","+t:"");
return"include("+r+");";
}
},e.helper("$each",function(e,n){
var t=Array.isArray||function(e){
return"[object Array]"===Object.prototype.toString.call(e);
};
if(t(e))for(var r=0,o=e.length;o>r;r++)n.call(e,e[r],r,e);else for(r in e)n.call(e,e[r],r);
});
}(e,window),e;
});define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var e=r.length,n=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?e:t,n=-1==n?t:n;
var a=r.substr(0,n),i=r.substr(n+1,t-n-1),s=r.substr(t+1);
return{
host:a,
query_str:i,
hash:s
};
}
function e(e,n,t){
var a=r(e),i=a.query_str,s=[];
for(var o in n)n.hasOwnProperty(o)&&s.push(o+"="+(t?n[o]:encodeURIComponent(n[o])));
return s.length>0&&(i+=(""!=i?"&":"")+s.join("&")),a.host+(""!=i?"?"+i:"")+(""!=a.hash?"#"+a.hash:"");
}
function n(r,e,n,t){
r=r||location.href;
var a=r.indexOf("&"),i=r.length,s=r.replace(/^[\w\d]+:[\/\\]+/g,"").split("").reverse();
Array.prototype.indexOf||(Array.prototype.indexOf=function(r,e){
var n;
if(null==this)throw new TypeError('"this" is null or not defined');
var t=Object(this),a=t.length>>>0;
if(0===a)return-1;
var i=+e||0;
if(1/0===Math.abs(i)&&(i=0),i>=a)return-1;
for(n=Math.max(i>=0?i:a-Math.abs(i),0);a>n;){
if(n in t&&t[n]===r)return n;
n++;
}
return-1;
});
var o=i-1-s.indexOf("/");
-1!=a&&-1==r.indexOf("?")&&a>o&&(r=r.replace("&","?"));
var u=new RegExp("([\\?&]"+e+"=)[^&#]*");
if(!r.match(u)){
var h=r.indexOf("?");
return-1==h?r+"?"+e+"="+n:h==r.length-1?r+e+"="+n:r+"&"+e+"="+n;
}
return t===!0?r.replace(u,"$1"+n):r;
}
function t(r){
var e=arguments[1]||window.location.search,n=new RegExp("(^|&)"+r+"=([^&]*)(&|$)"),t=e.substr(e.indexOf("?")+1).match(n);
return null!=t?t[2]:"";
}
return{
parseUrl:r,
join:e,
addParam:n,
getQuery:t
};
});define("biz_wap/jsapi/core.js",["biz_wap/utils/mmversion.js"],function(i,e,t,o){
"use strict";
function n(i,e){
var t="__wap__";
e=t+" "+e+" location:["+location.href+"]",top.window.WeixinJSBridge.invoke("writeLog",{
level:i,
msg:e
}),r.isWechat&&r.isMac||top.window.WeixinJSBridge.invoke("log",{
level:i,
msg:e
});
}
var r=i("biz_wap/utils/mmversion.js"),a=window.__moon_report||function(){},c=8,d={},w=!1;
try{
d=top.window.document;
}catch(f){
w=!0;
}
var g={
ready:function(i){
var e=function(){
try{
i&&(window.onBridgeReadyTime=window.onBridgeReadyTime||+new Date,i());
}catch(e){
throw a([{
offset:c,
log:"ready",
e:e
}]),e;
}
};
w||"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?e():d.addEventListener?d.addEventListener("WeixinJSBridgeReady",e,!1):d.attachEvent&&(d.attachEvent("WeixinJSBridgeReady",e),
d.attachEvent("onWeixinJSBridgeReady",e));
},
invoke:function(i,e,t){
this.ready(function(){
if(w)return!1;
if("object"!=typeof top.window.WeixinJSBridge)return o("请在微信中打开此链接！"),!1;
try{
if("writeLog"!=i&&"log"!=i){
var r="JSAPI:"+i+" invoke;params:",d=Object.prototype.toString.call(e);
r+="[object String]"===d?e:"[object Object]"===d?JSON.stringify(e):"no params",n("info",r+";");
}
}catch(f){}
top.window.WeixinJSBridge.invoke(i,e,function(e){
try{
if("writeLog"!=i&&"log"!=i){
var o="JSAPI:"+i+" callback;ret:",r=Object.prototype.toString.call(e);
o+="[object String]"===r?e:"[object Object]"===r?JSON.stringify(e):"no ret",n("info",o+";");
}
if(t){
t.apply(window,arguments);
var d=e&&e.err_msg?", err_msg-> "+e.err_msg:"";
console.info("[jsapi] invoke->"+i+d);
}
}catch(w){
throw a([{
offset:c,
log:"invoke;methodName:"+i,
e:w
}]),w;
}
});
});
},
call:function(i){
this.ready(function(){
if(w)return!1;
if("object"!=typeof top.window.WeixinJSBridge)return!1;
try{
top.window.WeixinJSBridge.call(i);
}catch(e){
throw a([{
offset:c,
log:"call;methodName:"+i,
e:e
}]),e;
}
});
},
on:function(i,e){
this.ready(function(){
return w?!1:"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(i,function(){
try{
if(e)return e.apply(window,arguments);
}catch(t){
throw a([{
offset:c,
log:"on;eventName:"+i,
e:t
}]),t;
}
}):!1;
});
}
};
return g;
});define("biz_wap/utils/mmversion.js",[],function(){
"use strict";
function n(){
var n=/MicroMessenger\/([\d\.]+)/i,i=o.match(n);
return i&&i[1]?i[1]:!1;
}
function i(i,t,r){
var e=n();
if(e){
e=e.split("."),i=i.split("."),/\d+/g.test(e[e.length-1])||e.pop();
for(var s,o,u=m["cp"+t],a=0,c=Math.max(e.length,i.length);c>a;++a){
s=e[a]||0,o=i[a]||0,s=parseInt(s)||0,o=parseInt(o)||0;
var d=m.cp0(s,o);
if(!d)return u(s,o);
}
return r||0==t?!0:!1;
}
}
function t(n){
return i(n,0);
}
function r(n,t){
return i(n,1,t);
}
function e(n,t){
return i(n,-1,t);
}
function s(){
return u?"ios":c?"android":p?"mac_os":f?"windows":"unknown";
}
var o=navigator.userAgent,u=/(iPhone|iPad|iPod|iOS)/i.test(o),a=/Windows\sPhone/i.test(o),c=/(Android)/i.test(o),d=/MicroMessenger\/([\d\.]+)/i.test(o),p=/mac\sos/i.test(o),f=/windows\snt/i.test(o)&&!a,g=c&&/miniprogram/.test(o.toLowerCase())||"miniprogram"==window.__wxjs_environment,m={
"cp-1":function(n,i){
return i>n;
},
cp0:function(n,i){
return n==i;
},
cp1:function(n,i){
return n>i;
}
};
return{
get:n,
cpVersion:i,
eqVersion:t,
gtVersion:r,
ltVersion:e,
getPlatform:s,
isWp:a,
isIOS:u,
isAndroid:c,
isInMiniProgram:g,
isWechat:d,
isMac:p,
isWindows:f
};
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});define("biz_common/utils/string/emoji.js",[],function(){
"use strict";
function t(t){
var e,r,i={
url:"http://res.mail.qq.com/zh_CN/images/mo/DEFAULT2/",
urlhttps:"https://res.mail.qq.com/zh_CN/images/mo/DEFAULT2/",
data:{
0:"微笑",
1:"撇嘴",
2:"色",
3:"发呆",
4:"得意",
5:"流泪",
6:"害羞",
7:"闭嘴",
8:"睡",
9:"大哭",
10:"尴尬",
11:"发怒",
12:"调皮",
13:"呲牙",
14:"惊讶",
15:"难过",
16:"酷",
17:"冷汗",
18:"抓狂",
19:"吐",
20:"偷笑",
21:"可爱",
22:"白眼",
23:"傲慢",
24:"饥饿",
25:"困",
26:"惊恐",
27:"流汗",
28:"憨笑",
29:"大兵",
30:"奋斗",
31:"咒骂",
32:"疑问",
33:"嘘",
34:"晕",
35:"折磨",
36:"衰",
37:"骷髅",
38:"敲打",
39:"再见",
40:"擦汗",
41:"抠鼻",
42:"鼓掌",
43:"糗大了",
44:"坏笑",
45:"左哼哼",
46:"右哼哼",
47:"哈欠",
48:"鄙视",
49:"委屈",
50:"快哭了",
51:"阴险",
52:"亲亲",
53:"吓",
54:"可怜",
55:"菜刀",
56:"西瓜",
57:"啤酒",
58:"篮球",
59:"乒乓",
60:"咖啡",
61:"饭",
62:"猪头",
63:"玫瑰",
64:"凋谢",
65:"示爱",
66:"爱心",
67:"心碎",
68:"蛋糕",
69:"闪电",
70:"炸弹",
71:"刀",
72:"足球",
73:"瓢虫",
74:"便便",
75:"月亮",
76:"太阳",
77:"礼物",
78:"拥抱",
79:"强",
80:"弱",
81:"握手",
82:"胜利",
83:"抱拳",
84:"勾引",
85:"拳头",
86:"差劲",
87:"爱你",
88:"NO",
89:"OK",
90:"爱情",
91:"飞吻",
92:"跳跳",
93:"发抖",
94:"怄火",
95:"转圈",
96:"磕头",
97:"回头",
98:"跳绳",
99:"挥手",
100:"激动",
101:"街舞",
102:"献吻",
103:"左太极",
104:"右太极"
},
ext:".gif"
},o=i.url,m=i.ext,s=i.data;
"https:"==location.protocol&&(o=i.urlhttps);
for(e in s)r=new RegExp("/"+s[e],"g"),t=t.replace(r,'<img src="'+o+e+m+'" alt="mo-'+s[e]+'"/>');
return t;
}
return{
replaceEmoji:t
};
});define("biz_wap/utils/ajax.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_common/utils/respTypes.js","biz_wap/utils/ajax_wx.js"],function(require,exports,module,alert){
"use strict";
function logClientLog(e){
try{
var t;
/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?t="writeLog":/(Android)/i.test(navigator.userAgent)&&(t="log"),
t&&doLog(t,e);
}catch(o){
throw console.error(o),o;
}
}
function doLog(e,t){
var o,r,n={};
o=top!=window?top.window:window;
try{
r=o.WeixinJSBridge,n=o.document;
}catch(a){}
e&&r&&r.invoke?r.invoke(e,{
level:"info",
msg:"[WechatFe][ajax]"+t
}):setTimeout(function(){
n.addEventListener?n.addEventListener("WeixinJSBridgeReady",function(){
doLog(e,t);
},!1):n.attachEvent&&(n.attachEvent("WeixinJSBridgeReady",function(){
doLog(e,t);
}),n.attachEvent("onWeixinJSBridgeReady",function(){
doLog(e,t);
}));
},0);
}
function joinUrl(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=isx5?"1":"0",t.f="json",Url.join(e,t);
}
function reportRt(e,t,o){
var r="";
if(o&&o.length){
var n=1e3,a=o.length,i=Math.ceil(a/n);
r=["&lc="+i];
for(var s=0;i>s;++s)r.push("&log"+s+"=[rtCheckError]["+s+"]"+encodeURIComponent(o.substr(s*n,n)));
r=r.join("");
}
var c,d="idkey="+e+"_"+t+"_1"+r+"&r="+Math.random();
if(window.ActiveXObject)try{
c=new ActiveXObject("Msxml2.XMLHTTP");
}catch(p){
try{
c=new ActiveXObject("Microsoft.XMLHTTP");
}catch(u){
c=!1;
}
}else window.XMLHttpRequest&&(c=new XMLHttpRequest);
c&&(c.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),c.setRequestHeader("cache-control","no-cache"),
c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.send(d));
}
function reportAjaxLength(e,t,o){
var r="";
if(o&&o.length){
var n=1e3,a=o.length,i=Math.ceil(a/n);
r=["&lc="+i];
for(var s=0;i>s;++s)r.push("&log"+s+"=[Ajax Length Limit]["+s+"]"+encodeURIComponent(o.substr(s*n,n)));
r=r.join("");
}
var c,d="idkey="+e+"_"+t+"_1"+r+"&r="+Math.random();
if(window.ActiveXObject)try{
c=new ActiveXObject("Msxml2.XMLHTTP");
}catch(p){
try{
c=new ActiveXObject("Microsoft.XMLHTTP");
}catch(u){
c=!1;
}
}else window.XMLHttpRequest&&(c=new XMLHttpRequest);
c&&(c.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),c.setRequestHeader("cache-control","no-cache"),
c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.send(d),(new Image).src="/mp/jsmonitor?idkey="+e+"_"+t+"_1"+r+"&r="+Math.random());
}
function Ajax(obj){
var type=(obj.type||"GET").toUpperCase(),url;
url=obj.notJoinUrl?obj.url:joinUrl(obj.url),"html"==obj.f&&(url=url.replace("&f=json",""));
var mayAbort=!!obj.mayAbort,async="undefined"==typeof obj.async?!0:obj.async,xhr=new XMLHttpRequest,timer=null,data=null;
if("object"==typeof obj.data){
var d=obj.data;
data=[];
for(var k in d)d.hasOwnProperty(k)&&data.push(k+"="+encodeURIComponent(d[k]));
data=data.join("&");
}else data="string"==typeof obj.data?obj.data:null;
xhr.open(type,url,async);
var _onreadystatechange=xhr.onreadystatechange;
try{
url&&url.length>LENGTH_LIMIT&&reportAjaxLength(27613,17,"ajax get limit[length: "+url.length+"]"+url.substring(0,1024));
}catch(e){}
xhr.onreadystatechange=function(){
if("function"==typeof _onreadystatechange&&_onreadystatechange.apply(xhr),3==xhr.readyState&&obj.received&&obj.received(xhr),
4==xhr.readyState){
xhr.onreadystatechange=null;
var status=xhr.status;
if(status>=200&&400>status)try{
var responseText=xhr.responseText,resp=responseText;
if("json"==obj.dataType)try{
resp=eval("("+resp+")");
var rtId=obj.rtId,rtKey=obj.rtKey||0,rtDesc=obj.rtDesc,checkRet=!0;
rtId&&rtDesc&&RespTypes&&!RespTypes.check(resp,rtDesc)&&reportRt(rtId,rtKey,RespTypes.getMsg()+"[detail]"+responseText+";"+obj.url);
}catch(e){
return void(obj.error&&obj.error(xhr));
}
obj.success&&obj.success(resp);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_SUCCESS_OFFSET,
e:e
}),e;
}else{
try{
obj.error&&obj.error(xhr);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_ERROR_OFFSET,
e:e
}),e;
}
if(status||!mayAbort){
var __ajaxtest=window.__ajaxtest||"0";
__moon_report({
offset:MOON_AJAX_NETWORK_OFFSET,
log:"ajax_network_error["+status+"]["+__ajaxtest+"]: "+url+";host:"+location.host,
e:""
});
}
}
clearTimeout(timer);
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null;
}
},"POST"==type&&xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
obj.noXRequestedWidthHeader||xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),
"undefined"!=typeof obj.timeout&&(timer=setTimeout(function(){
xhr.abort("timeout");
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null,__moon_report({
offset:MOON_AJAX_TIMEOUT_OFFSET,
log:"ajax_timeout_error: "+url,
e:""
});
},obj.timeout));
try{
xhr.send(data);
try{
data&&data.length>LENGTH_LIMIT&&reportAjaxLength(27613,18,"ajax post limit[length: "+data.length+"]"+data.substring(0,1024));
}catch(e){}
}catch(e){
obj.error&&obj.error(xhr);
}
return xhr;
}
require("biz_common/utils/string/html.js");
var Url=require("biz_common/utils/url/parse.js"),RespTypes=require("biz_common/utils/respTypes.js"),Ajax_wx=require("biz_wap/utils/ajax_wx.js"),isx5=-1!=navigator.userAgent.indexOf("TBS/"),__moon_report=window.__moon_report||function(){},MOON_AJAX_SUCCESS_OFFSET=3,MOON_AJAX_NETWORK_OFFSET=4,MOON_AJAX_ERROR_OFFSET=5,MOON_AJAX_TIMEOUT_OFFSET=6,MOON_AJAX_COMPLETE_OFFSET=7,MOON_AJAX_GET_LIMIT_4K=17,MOON_AJAX_POST_LIMIT_4K=18,LENGTH_LIMIT=4096,doc={},isAcrossOrigin=!1;
try{
doc=top.window.document;
}catch(e){
isAcrossOrigin=!0;
}
return window.__second_open__||!isAcrossOrigin&&top.window.__second_open__?Ajax_wx:Ajax;
});define("history/profile_history.html.js",[],function(){
return'{{each list as value keys}}\n    {{ if value && value.comm_msg_info && (!value.app_msg_ext_info || (value.app_msg_ext_info && value.app_msg_ext_info.del_flag != 4 && value.app_msg_ext_info.del_flag != 3 && value.app_msg_ext_info.del_flag != 2)) }}\n        {{if value.comm_msg_info.type==1}}    \n        <div class="weui_msg_card">\n            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>\n            <div class="weui_msg_card_bd">\n                <div class="weui_media_box text" msgid="{{value.comm_msg_info.id}}" data-flag="false">\n                    <div class="weui_media_bd">\n                        {{=value.comm_msg_info.content}}\n                    </div>\n                    <div class="weui_media_ft">\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        {{else if value.comm_msg_info.type==3}}    \n        <div class="weui_msg_card">\n            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>\n            <div class="weui_msg_card_bd">\n                <div id="WXIMG{{value.comm_msg_info.id}}" class="weui_media_box img" msgid="{{value.comm_msg_info.id}}">\n                    <div class="weui_media_bd">\n                        {{if value.image_msg_ext_info.cdn_url}}\n                        <img src="{{value.image_msg_ext_info.cdn_url}}" data-msgid="{{value.comm_msg_info.id}}" data-s="640" data-t="{{value.comm_msg_info.datetime*1000}}">\n                        {{else}}\n                        <img src="https://mp.weixin.qq.com/mp/getmediadata?__biz={{biz}}&type=img&mode=normal&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}" alt="" data-msgid="{{value.comm_msg_info.id}}" data-s="640" data-t="{{value.comm_msg_info.datetime*1000}}">\n                        {{/if}}\n                    </div>\n                    <div class="weui_media_ft">\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        {{else if value.comm_msg_info.type==34}}    \n        <div class="weui_msg_card">\n            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>\n            <div class="weui_msg_card_bd">\n                <div id="WXVOICE{{value.comm_msg_info.id}}" class="weui_media_box audio" msgid="{{value.comm_msg_info.id}}">\n                    <div class="weui_media_bd">\n                        <div class="weui_audio" length="{{value.voice_msg_ext_info.play_length}}" data-flag="false">\n                            <span class="audio_switch">\n                                <i class="icon_audio_default"></i>\n                                <i class="icon_audio_playing"></i>\n                            </span>\n                            <div class="audio_content">\n                                <strong class="audio_title">语音</strong>\n                                <p class="audio_desc"></p>\n                                <audio fileid="{{value.voice_msg_ext_info.fileid}}" preload type="audio/mpeg" src="/mp/getmediadata?__biz={{biz}}&type=voice&msgid={{value.comm_msg_info.id}}&uin={{uin}}&key={{key}}&openkey={{openkey}}"  alt="">not support</audio>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="weui_media_ft">\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        {{else if value.comm_msg_info.type==49}}\n        <div class="weui_msg_card">\n            <div class="weui_msg_card_hd">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</div>\n            <div class="weui_msg_card_bd">\n                {{if value.app_msg_ext_info.subtype == 9}} \n                <div id="WXAPPMSG{{value.comm_msg_info.id}}" class="weui_media_box appmsg" msgid="{{value.comm_msg_info.id}}">\n                    {{if value.app_msg_ext_info.cover}}\n                    <span class="weui_media_hd" style="background-image:url({{value.app_msg_ext_info.cover}})" data-s="640" data-t="{{value.comm_msg_info.datetime*1000}}" hrefs="{{value.app_msg_ext_info.content_url}}"></span>\n                    {{/if}}\n                    <div class="weui_media_bd">\n                        <h4 class="weui_media_title" hrefs="{{value.app_msg_ext_info.content_url}}">\n                        {{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}\n                        {{value.app_msg_ext_info.title}}\n                        </h4>\n                        <p class="weui_media_desc">{{=value.app_msg_ext_info.digest}}</p>\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if value.app_msg_ext_info.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>\n                    </div>\n                </div>\n                {{else if value.app_msg_ext_info.subtype == 16}} \n                <div id="WXVIDEO{{value.comm_msg_info.id}}" class="weui_media_box video" msgid="{{value.comm_msg_info.id}}" hrefs="{{value.app_msg_ext_info.content_url}}">\n                    <div class="weui_media_hd">\n                        <span class="video_cover" style="background-image:url({{value.app_msg_ext_info.cover}});height:{{height}}px;"></span>\n                        <div class="video_switch">\n                            {{if value.app_msg_ext_info.duration}}\n                            <span class="video_time_info">{{handleVideoTime value.app_msg_ext_info.duration}}</span>\n                            {{/if}}\n                        </div>\n                    </div>\n                    <div class="weui_media_bd js_video">\n                        <p class="weui_media_title js_video">{{value.app_msg_ext_info.title}}</p>\n                    </div>\n                    <div class="weui_media_ft">\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}</p>\n                    </div>\n                </div>\n                {{/if}}\n\n                {{each value.app_msg_ext_info.multi_app_msg_item_list as subvalue subkey}}\n                <div class="weui_media_box appmsg" msgid="{{value.comm_msg_info.id}}">\n                    {{if subvalue.cover}}\n                    <span class="weui_media_hd" style="background-image:url({{subvalue.cover}})" data-s="300" data-t="{{value.comm_msg_info.datetime*1000}}"></span>\n                    {{/if}}\n                    <div class="weui_media_bd">\n                        <h4 class="weui_media_title" hrefs="{{subvalue.content_url}}">\n                        {{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>\n                        {{/if}}\n                        {{subvalue.title}}\n                        </h4>\n                        <p class="weui_media_desc">{{subvalue.digest}}</p>\n                        <p class="weui_media_extra_info">{{dateFormat value.comm_msg_info.datetime*1000 \'yyyy年M月d日\'}}{{if subvalue.copyright_stat==11}}<span id="copyright_logo" class="icon_original_tag">原创</span>{{/if}}</p>\n                    </div>\n                </div>\n                {{/each}}\n            </div>\n        </div>\n        {{/if}}\n    {{/if}}\n{{/each}}\n';
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e,n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],r=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"];
e=t?r:n;
for(var o=0,i=this;o<e.length;o+=2)i=i.replace(new RegExp(e[o],"g"),e[o+1]);
return i;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},String.prototype.htmlLite=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&gt;",">","&lt;","<","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncodeLite=function(){
return this.htmlLite(!0);
},String.prototype.htmlDecodeLite=function(){
return this.htmlLite(!1);
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
},
htmlEncodeLite:function(t){
return t.htmlEncodeLite();
},
htmlDecodeLite:function(t){
return t.htmlDecodeLite();
}
};
});define("history/template_helper.js",["biz_common/template-2.0.1-cmd.js"],function(e){
"use strict";
var t=e("biz_common/template-2.0.1-cmd.js");
return"undefined"!=typeof t&&(t.openTag="{{",t.closeTag="}}",t.helper("dateFormat",function(e,t){
e=new Date(e);
var n={
M:e.getMonth()+1,
d:e.getDate(),
h:e.getHours(),
m:e.getMinutes(),
s:e.getSeconds(),
q:Math.floor((e.getMonth()+3)/3),
S:e.getMilliseconds()
};
return t=t.replace(/([yMdhmsqSa])+/g,function(t,o){
var r=n[o];
return void 0!==r?(t.length>1&&(r="0"+r,r=r.substr(r.length-2)),r):"y"===o?(e.getFullYear()+"").substr(4-t.length):t;
});
})),t;
});define("common/utils.js",["biz_common/utils/url/parse.js"],function(e){
"use strict";
var n=e("biz_common/utils/url/parse.js"),t={
isNativePage:function(){
return"1"===n.getQuery("isNativePage");
},
insertAfter:function(e,n){
var t=n.parentNode;
t.lastChild===n?t.appendChild(e):t.insertBefore(e,n.nextSibling);
},
getInnerHeight:function(){
return window.innerHeight||document.documentElement.clientHeight;
}
};
return t;
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
function t(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=gif")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_gif\//)&&-1==t.indexOf("/s640");
}
function i(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=png")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_png\//);
}
function n(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=jpg")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_jpg\//);
}
function r(t){
return t.indexOf("tp=webp")>-1;
}
function e(t){
return t.indexOf("tp=wxpic")>-1;
}
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qpic.cn/");
},String.prototype.https2http=function(){
var t=this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
return t=t.replace(/https:\/\/mmbiz\.qpic\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/")||0==this.indexOf("http://res.wx.qq.com/")||0==this.indexOf("https://res.wx.qq.com/");
},String.prototype.nogif=function(){
var i=this.toString();
return t(i)?i.replace(/\/\d+\?/g,"/s640?").replace(/\/\d+\//g,"/s640/").replace(/\/\d+\./g,"/s640.").replace("wx_fmt=gif",""):i;
},String.prototype.isGif=function(){
var i=this.toString();
return t(i);
},String.prototype.isWxpic=function(){
var t=this.toString();
return e(t);
},String.prototype.isWebp=function(){
var t=this.toString();
return r(t);
},String.prototype.canHevc=function(){
var r=this.toString();
return n(r)||i(r)||t(r);
},String.prototype.getImgType=function(){
var p=this.toString();
return t(p)?"gif":r(p)?"webp":e(p)?"wxpic":i(p)?"png":n(p)?"jpg":"unknow";
},String.prototype.getOriginImgType=function(){
var r=this.toString();
return t(r)?"gif":i(r)?"png":n(r)?"jpg":"unknow";
},String.prototype.imgChange640=function(){
var t=this.toString();
t=t.replace(/(\?tp=webp)|(\?tp=wxpic)|(&tp=webp)|(&tp=wxpic)/g,"");
var i=new Date;
return i.setFullYear(2014,9,1),t.isCDN()&&1e3*ct>=i.getTime()&&!t.isGif()&&(t=t.replace(/\/0$/,"/640"),
t=t.replace(/\/0\?/,"/640?"),t=t.replace(/\/0\./,"/640.")),t;
};
});define("biz_common/dom/event.js",[],function(){
"use strict";
function t(){
return v&&(new Date).getTime()-v<200?!0:!1;
}
function e(){
return h.isPc||h.isWp?!1:!0;
}
function n(n,i,a,o){
e()?(i.tap_handler=function(e){
if(-1==h.tsTime||+new Date-h.tsTime>200||t())return h.tsTime=-1,!1;
var n=e.changedTouches[0];
return Math.abs(h.y-n.clientY)<=5&&Math.abs(h.x-n.clientX)<=5?i.call(this,e):void 0;
},r(n,"touchend",o,i.tap_handler,a)):r(n,"click",o,i,a);
}
function i(t,e,n,i){
var a=this,o=0;
if(h.isPc||h.isWp){
var c,u,d,l=!1;
r(t,"mousedown",i,function(t){
d=!1,l=!0,c=t.clientX,u=t.clientY,o=setTimeout(function(){
d=!0,o=0,e.call(a,t);
},500),t.preventDefault();
}),r(t,"mousemove",i,function(t){
l&&(Math.abs(u-t.clientY)>5||Math.abs(c-t.clientX)>5)&&(clearTimeout(o),o=0);
}),r(t,"mouseup",i,function(){
l=!1,clearTimeout(o);
}),r(t,"click",i,function(){
return d?!1:void 0;
});
}else r(t,"touchstart",i,function(t){
o=setTimeout(function(){
o=0,e.call(a,t);
},500),t.preventDefault();
}),r(t,"touchmove",i,function(t){
var e=t.changedTouches[0];
(Math.abs(h.y-e.clientY)>5||Math.abs(h.x-e.clientX)>5)&&(clearTimeout(o),o=0);
}),r(t,"touchend",i,function(){
clearTimeout(o);
});
}
function a(t,e){
if(!t||!e||t.nodeType!=t.ELEMENT_NODE)return!1;
var n=t.webkitMatchesSelector||t.msMatchesSelector||t.matchesSelector;
return n?n.call(t,e):(e=e.substr(1),t.className.indexOf(e)>-1);
}
function o(t,e,n){
for(;t&&!a(t,e);)t=t!==n&&t.nodeType!==t.DOCUMENT_NODE&&t.parentNode;
return t;
}
function r(t,e,a,r,c){
var u,d,l;
return"input"==e&&h.isPc,t?("function"==typeof a&&(c=r,r=a,a=""),"string"!=typeof a&&(a=""),
t==window&&"load"==e&&/complete|loaded/.test(document.readyState)?r({
type:"load"
}):"tap"==e?n(t,r,c,a):"longtap"===e?i(t,r,c,a):("unload"==e&&"onpagehide"in window&&(e="pagehide"),
u=function(t){
var e=r(t);
return e===!1&&(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault()),
e;
},a&&"."==a.charAt(0)&&(l=function(e){
var n=e.target||e.srcElement,i=o(n,a,t);
return i?(e.delegatedTarget=i,u(e)):void 0;
}),d=l||u,r[e+"_handler"]=d,t.addEventListener?void t.addEventListener(e,d,!!c):t.attachEvent?void t.attachEvent("on"+e,d,!!c):void 0)):void 0;
}
function c(t,n,i,a){
if(t){
var o,r=n;
return"tap"==r&&(e()?(r="touchend",o=i.tap_handler&&i.tap_handler.touchend_handler?i.tap_handler.touchend_handler:i):r="click"),
o=i[r+"_handler"]||i,t.removeEventListener?void t.removeEventListener(r,o,!!a):t.detachEvent?void t.detachEvent("on"+r,o,!!a):void("tap"==r&&e()?(i.tap_handler&&(i.tap_handler.touchend_handler=null),
i.tap_handler=null):i[r+"_handler"]=null);
}
}
function u(){
if("hidden"in document)return"hidden";
for(var t=0;t<f.length;t++)if(f[t]+"Hidden"in document)return f[t]+"Hidden";
return null;
}
function d(){
if("visibilityState"in document)return"visibilityState";
for(var t=0;t<f.length;t++)if(f[t]+"VisibilityState"in document)return f[t]+"VisibilityState";
return null;
}
function l(t){
var e=u();
if(e){
var n=e.replace(/[H|h]idden/,"")+"visibilitychange";
document.addEventListener(n,function(){
var e="hidden"!==document[d()];
"function"==typeof t&&t(e);
},!1);
}
}
var s=navigator.userAgent,h={
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
isWp:/Windows\sPhone/i.test(s),
tsTime:-1
},f=["webkit","moz","ms","o"];
e()&&r(document,"touchstart",function(t){
var e=t.changedTouches[0];
h.x=e.clientX,h.y=e.clientY,h.tsTime=+new Date;
});
var v;
return window.addEventListener("scroll",function(){
v=(new Date).getTime();
},!0),{
on:r,
off:c,
tap:n,
longtap:i,
bindVisibilityChangeEvt:l
};
});