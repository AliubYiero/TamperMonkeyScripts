function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"DialogTemplate.pug":"doctype html\r\nhtml(lang=\"zh\")\r\n\thead\r\n\t\tmeta(charset=\"UTF-8\")\r\n\t\tmeta(name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\")\r\n\t\ttitle DialogTemplate\r\n\t\tlink(rel=\"stylesheet\", href=\".\u002Fcss\u002Fstyle.min.css\")\r\n\tbody\r\n\t\tdiv.dialog-container\r\n\t\t\taside.configs-choose-list\r\n\r\n\t\t\tmain.config-detail\r\n\t\t\t\tspan.close-icon\r\n\t\t\t\th1.config-title='直播间ID'\r\n\t\t\t\tsection.input-area\r\n\t\t\t\t\tinput.config-input(\r\n\t\t\t\t\t\tplaceholder='请输入直播间ID (直播间地址最后的数字码)'\r\n\t\t\t\t\t)\u002F\r\n\t\t\t\t\tbutton.submit-config 确认\r\n\t\t\t\thr\u002F\r\n\r\n\t\tscript(src=\".\u002Fjs\u002Findex.js\")\r\n"};
;pug_debug_line = 1;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Chtml lang=\"zh\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 4;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Cmeta charset=\"UTF-8\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Ctitle\u003E";
;pug_debug_line = 6;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "DialogTemplate\u003C\u002Ftitle\u003E";
;pug_debug_line = 7;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" href=\".\u002Fcss\u002Fstyle.min.css\"\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 8;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 9;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"dialog-container\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Caside class=\"configs-choose-list\"\u003E\u003C\u002Faside\u003E";
;pug_debug_line = 12;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Cmain class=\"config-detail\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Cspan class=\"close-icon\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 14;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Ch1 class=\"config-title\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = '直播间ID') ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 15;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Csection class=\"input-area\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Cinput class=\"config-input\" placeholder=\"请输入直播间ID (直播间地址最后的数字码)\"\u002F\u003E";
;pug_debug_line = 19;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"submit-config\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "确认\u003C\u002Fbutton\u003E\u003C\u002Fsection\u003E";
;pug_debug_line = 20;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E\u003C\u002Fmain\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "DialogTemplate.pug";
pug_html = pug_html + "\u003Cscript src=\".\u002Fjs\u002Findex.js\"\u003E\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}