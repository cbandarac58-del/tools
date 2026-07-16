/* ============================================
   SmartToolzAI — Main JavaScript
   Navigation, Animations, Search, Recently Used
   ============================================ */

// ==========================================
// YANDEX METRIKA COUNTER (Analytics)
// ==========================================
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110425579', 'ym');

ym(110425579, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});

// Append Yandex noscript fallback
const yandexNoscript = document.createElement('noscript');
yandexNoscript.innerHTML = '<div><img src="https://mc.yandex.ru/watch/110425579" style="position:absolute; left:-9999px;" alt="" /></div>';
document.body.appendChild(yandexNoscript);

// ==========================================
// EXOCLICK / AD NETWORK INTEGRATION (Ads)
// ==========================================
// 1. Popunder Ad (Zone 5979148)
(function() {
    function randStr(e,t){for(var n="",r=t||"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",o=0;o<e;o++)n+=r.charAt(Math.floor(Math.random()*r.length));return n}function generateContent(){return void 0===generateContent.val&&(generateContent.val="document.dispatchEvent("+randStr(4*Math.random()+3)+");"),generateContent.val}try{Object.defineProperty(document.currentScript,"innerHTML",{get:generateContent}),Object.defineProperty(document.currentScript,"textContent",{get:generateContent})}catch(e){};
    var adConfig = {
    "ads_host": "a.pemsrv.com",
    "syndication_host": "s.pemsrv.com",
    "idzone": 5979148,
    "popup_fallback": false,
    "popup_force": false,
    "chrome_enabled": true,
    "new_tab": false,
    "frequency_period": 720,
    "frequency_count": 1,
    "trigger_method": 3,
    "trigger_class": "",
    "trigger_delay": 0,
    "capping_enabled": true,
    "tcf_enabled": true,
    "agego_cross_site_enabled": false,
    "only_inline": false
};
window.document.querySelectorAll||(document.querySelectorAll=document.body.querySelectorAll=Object.querySelectorAll=function(e,o,t,i,n){var r=document,a=r.createStyleSheet();for(n=r.all,o=[],t=(e=e.replace(/\[for\b/gi,"[htmlFor").split(",")).length;t--;){for(a.addRule(e[t],"k:v"),i=n.length;i--;)n[i].currentStyle.k&&o.push(n[i]);a.removeRule(0)}return o});var popMagic={version:10,cookie_name:"",url:"",config:{},open_count:0,top:null,browser:null,venor_loaded:!1,venor:!1,tcfData:null,remoteLicensedDomains:["exdynsrv.com","exosrv.com","exoclick.com","opoxv.com","exacdn.com","pemsrv.com"],configTpl:{ads_host:"",syndication_host:"",idzone:"",frequency_period:720,frequency_count:1,trigger_method:1,trigger_class:"",popup_force:!1,popup_fallback:!1,chrome_enabled:!0,new_tab:!1,cat:"",tags:"",el:"",sub:"",sub2:"",sub3:"",block_ad_types:"",only_inline:!1,trigger_delay:0,capping_enabled:!0,tcf_enabled:!1,agego_cross_site_enabled:!0,cookieconsent:!0,should_fire:function(){return!0},on_redirect:null},isAdsDomainLicensed:function(){for(var e=this.config.ads_host,o=this.remoteLicensedDomains.concat([".local","localhost","127.0.0.1"]),t=0;t<o.length;t++){var i=o[t];if("string"==typeof i)if("."===i.charAt(0)){var n=i,r=i.substring(1);if(e.slice(-n.length)===n||e===r)return!0}else{var a=e===i,c="."+i,p=e.slice(-c.length)===c;if(a||p)return!0}}return!1},init:function(e){if(void 0!==e.idzone&&e.idzone){void 0===e.customTargeting&&(e.customTargeting=[]),window.customTargeting=e.customTargeting||null;var o=Object.keys(e.customTargeting).filter(function(e){return e.search("ex_")>=0});for(var t in o.length&&o.forEach(function(e){return this.configTpl[e]=null}.bind(this)),this.configTpl)Object.prototype.hasOwnProperty.call(this.configTpl,t)&&(void 0!==e[t]?this.config[t]=e[t]:this.config[t]=this.configTpl[t]);if(void 0!==this.config.idzone&&""!==this.config.idzone){!0!==this.config.only_inline&&this.isAdsDomainLicensed()&&this.loadHosted();var i=this;this.checkTCFConsent(function(){"complete"===document.readyState?i.preparePopWait():i.addEventToElement(window,"load",i.preparePop)})}}},getCountFromCookie:function(){if(!this.config.cookieconsent)return!1;var e=popMagic.getCookie(popMagic.cookie_name),o=void 0===e?0:parseInt(e);return isNaN(o)&&(o=0),o},getLastOpenedTimeFromCookie:function(){var e=popMagic.getCookie(popMagic.cookie_name),o=null;if(e){var t=parseInt(e.split(";")[1]);o=t>0?t:0}return isNaN(o)&&(o=null),o},shouldShow:function(e){if(e=e||!1,!popMagic.config.capping_enabled){var o=!0,t=popMagic.config.should_fire;try{e||"function"!=typeof t||(o=Boolean(t()))}catch(e){console.error("Error executing should fire callback function:",e)}return o&&0===popMagic.open_count}if(popMagic.open_count>=popMagic.config.frequency_count)return!1;var i=popMagic.getCountFromCookie(),n=popMagic.getLastOpenedTimeFromCookie(),r=Math.floor(Date.now()/1e3),a=n+popMagic.config.trigger_delay;return!(n&&a>r)&&(popMagic.open_count=i,!(i>=popMagic.config.frequency_count))},venorShouldShow:function(){return popMagic.venor_loaded&&"0"===popMagic.venor},setAsOpened:function(e){var o=e?e.target||e.srcElement:null,t={id:"",tagName:"",classes:"",text:"",href:"",elm:""};void 0!==o&&null!=o&&(t={id:void 0!==o.id&&null!=o.id?o.id:"",tagName:void 0!==o.tagName&&null!=o.tagName?o.tagName:"",classes:void 0!==o.classList&&null!=o.classList?o.classList:"",text:void 0!==o.outerText&&null!=o.outerText?o.outerText:"",href:void 0!==o.href&&null!=o.href?o.href:"",elm:o});var i=new CustomEvent("creativeDisplayed-"+popMagic.config.idzone,{detail:t});if(document.dispatchEvent(i),popMagic.config.capping_enabled){var n=1;n=0!==popMagic.open_count?popMagic.open_count+1:popMagic.getCountFromCookie()+1;var r=Math.floor(Date.now()/1e3);popMagic.config.cookieconsent&&popMagic.setCookie(popMagic.cookie_name,n+";"+r,popMagic.config.frequency_period)}else++popMagic.open_count},loadHosted:function(){var e=document.createElement("script");for(var o in e.type="application/javascript",e.async=!0,e.src="//"+this.config.ads_host+"/popunder1000.js",e.id="popmagicldr",this.config)Object.prototype.hasOwnProperty.call(this.config,o)&&"ads_host"!==o&&"syndication_host"!==o&&e.setAttribute("data-exo-"+o,this.config[o]);var t=document.getElementsByTagName("body").item(0);t.firstChild?t.insertBefore(e,t.firstChild):t.appendChild(e)},preparePopWait:function(){setTimeout(popMagic.preparePop,400)},preparePop:function(){if("object"!=typeof exoJsPop101||!Object.prototype.hasOwnProperty.call(exoJsPop101,"add")){if(popMagic.top=self,popMagic.top!==self)try{top.document.location.toString()&&(popMagic.top=top)}catch(e){}if(popMagic.cookie_name="zone-cap-"+popMagic.config.idzone,popMagic.config.capping_enabled||(document.cookie=popMagic.cookie_name+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"),popMagic.shouldShow(!0)){var e=new XMLHttpRequest;e.onreadystatechange=function(){e.readyState==XMLHttpRequest.DONE&&(popMagic.venor_loaded=!0,200==e.status?popMagic.venor=e.responseText:popMagic.venor="0")};var o="https:"!==document.location.protocol&&"http:"!==document.location.protocol?"https:":document.location.protocol;e.open("GET",o+"//"+popMagic.config.syndication_host+"/venor.php",!0);try{e.send()}catch(e){popMagic.venor_loaded=!0}}if(popMagic.buildUrl(),popMagic.browser=popMagic.browserDetector.getBrowserInfo(),popMagic.config.chrome_enabled||!popMagic.browser.isChrome){var t=popMagic.getPopMethod(popMagic.browser);popMagic.addEvent("click",t),popMagic.prefetchAgToken()}}},getPopMethod:function(e){return popMagic.config.popup_force||popMagic.config.popup_fallback&&e.isChrome&&e.version>=68&&!e.isMobile?popMagic.methods.popup:e.isMobile?popMagic.methods.default:e.isChrome?popMagic.methods.chromeTab:popMagic.methods.default},checkTCFConsent:function(e){if(this.config.tcf_enabled&&"function"==typeof window.__tcfapi){var o=this;window.__tcfapi("addEventListener",2,function(t,i){i&&(o.tcfData=t,"tcloaded"!==t.eventStatus&&"useractioncomplete"!==t.eventStatus||(window.__tcfapi("removeEventListener",2,function(){},t.listenerId),e()))})}else e()},buildUrl:function(){var e,o="https:"!==document.location.protocol&&"http:"!==document.location.protocol?"https:":document.location.protocol,t=top===self?document.URL:document.referrer,i={type:"inline",name:"popMagic",ver:this.version},n="";customTargeting&&Object.keys(customTargeting).length&&("object"==typeof customTargeting?Object.keys(customTargeting):customTargeting).forEach(function(o){"object"==typeof customTargeting?e=customTargeting[o]:Array.isArray(customTargeting)&&(e=scriptEl.getAttribute(o));var t=o.replace("data-exo-","");n+="&"+t+"="+e});var r=this.tcfData&&this.tcfData.gdprApplies&&!0===this.tcfData.gdprApplies?1:0;this.url=o+"//"+this.config.syndication_host+"/v1/link.php?cat="+this.config.cat+"&idzone="+this.config.idzone+"&type=8&p="+encodeURIComponent(t)+"&sub="+this.config.sub+(""!==this.config.sub2?"&sub2="+this.config.sub2:"")+(""!==this.config.sub3?"&sub3="+this.config.sub3:"")+"&block=1&el="+this.config.el+"&tags="+this.config.tags+(""!==this.config.block_ad_types?"&block_ad_types="+this.config.block_ad_types:"")+"&scr_info="+function(e){var o=e.type+"|"+e.name+"|"+e.ver;return encodeURIComponent(btoa(o))}(i)+n+"&gdpr="+r+"&cb="+Math.floor(1e9*Math.random()),this.tcfData&&this.tcfData.tcString?this.url+="&gdpr_consent="+encodeURIComponent(this.tcfData.tcString):this.url+="&cookieconsent="+this.config.cookieconsent},addSuvtValueToUrl:function(e){var o=popMagic.getCookie("__suvt");if(o){var t=-1!==e.indexOf("?")?"&":"?";return e+t+"suvt="+o}return e},isAgegoEnabled:function(){return"undefined"!=typeof Promise&&void 0!==window.AGEGO&&!0===this.config.agego_cross_site_enabled},prefetchAgToken:function(){if(popMagic.isAgegoEnabled())try{window.AGEGO("prefetchToken")}catch(e){}},addAgeGoToken:function(e){if(!popMagic.isAgegoEnabled())return Promise.resolve(e);try{var o=window.AGEGO("getTokenUrl",e);return o&&"function"==typeof o.then?o:Promise.resolve(e)}catch(o){return Promise.resolve(e)}},addEventToElement:function(e,o,t){e.addEventListener?e.addEventListener(o,t,!1):e.attachEvent?(e["e"+o+t]=t,e[o+t]=function(){e["e"+o+t](window.event)},e.attachEvent("on"+o,e[o+t])):e["on"+o]=e["e"+o+t]},getTriggerClasses:function(){var e,o=[];-1===popMagic.config.trigger_class.indexOf(",")?e=popMagic.config.trigger_class.split(" "):e=popMagic.config.trigger_class.replace(/\s/g,"").split(",");for(var t=0;t<e.length;t++)""!==e[t]&&o.push("."+e[t]);return o},addEvent:function(e,o){var t;if("3"!=popMagic.config.trigger_method)if("2"!=popMagic.config.trigger_method||""==popMagic.config.trigger_class)if("4"!=popMagic.config.trigger_method||""==popMagic.config.trigger_class)if("5"!=popMagic.config.trigger_method||""==popMagic.config.trigger_class)popMagic.addEventToElement(document,e,o);else{var i="a"+popMagic.getTriggerClasses().map(function(e){return":not("+e+")"}).join("");t=document.querySelectorAll(i);for(var n=0;n<t.length;n++)popMagic.addEventToElement(t[n],e,o)}else{var r=popMagic.getTriggerClasses();popMagic.addEventToElement(document,e,function(e){r.some(function(o){return null!==e.target.closest(o)})||o.call(e.target,e)})}else{var a=popMagic.getTriggerClasses();for(t=document.querySelectorAll(a.join(", ")),n=0;n<t.length;n++)popMagic.addEventToElement(t[n],e,o)}else for(t=document.querySelectorAll("a"),n=0;n<t.length;n++)popMagic.addEventToElement(t[n],e,o)},setCookie:function(e,o,t){if(!this.config.cookieconsent)return!1;t=parseInt(t,10);var i=new Date;i.setMinutes(i.getMinutes()+parseInt(t));var n=encodeURIComponent(o)+"; expires="+i.toUTCString()+"; path=/";document.cookie=e+"="+n},getCookie:function(e){if(!this.config.cookieconsent)return!1;var o,t,i,n=document.cookie.split(";");for(o=0;o<n.length;o++)if(t=n[o].substr(0,n[o].indexOf("=")),i=n[o].substr(n[o].indexOf("=")+1),(t=t.replace(/^\s+|\s+$/g,""))===e)return decodeURIComponent(i)},randStr:function(e,o){for(var t="",i=o||"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<e;n++)t+=i.charAt(Math.floor(Math.random()*i.length));return t},isValidUserEvent:function(e){return!(!("isTrusted"in e)||!e.isTrusted||"ie"===popMagic.browser.name||"safari"===popMagic.browser.name)||0!=e.screenX&&0!=e.screenY},isValidHref:function(e){if(void 0===e||""==e)return!1;return!/\s?javascript\s?:/i.test(e)},findLinkToOpen:function(e){var o=e,t=!1;try{for(var i=0;i<20&&!o.getAttribute("href")&&o!==document&&"html"!==o.nodeName.toLowerCase();)o=o.parentNode,i++;var n=o.getAttribute("target");n&&-1!==n.indexOf("_blank")||(t=o.getAttribute("href"))}catch(e){}return popMagic.isValidHref(t)||(t=!1),t||window.location.href},getPuId:function(){return"ok_"+Math.floor(89999999*Math.random()+1e7)},executeOnRedirect:function(){try{popMagic.config.capping_enabled||"function"!=typeof popMagic.config.on_redirect||popMagic.config.on_redirect()}catch(e){console.error("Error executing on redirect callback:",e)}},browserDetector:{browserDefinitions:[["firefox",/Firefox\/([0-9.]+)(?:\s|$)/],["opera",/Opera\/([0-9.]+)(?:\s|$)/],["opera",/OPR\/([0-9.]+)(:?\s|$)$/],["edge",/Edg(?:e|)\/([0-9._]+)/],["ie",/Trident\/7\.0.*rv:([0-9.]+)\).*Gecko$/],["ie",/MSIE\s([0-9.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["safari",/Version\/([0-9._]+).*Safari/],["chrome",/(?!Chrom.*Edg(?:e|))Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/],["bb10",/BB10;\sTouch.*Version\/([0-9.]+)/],["android",/Android\s([0-9.]+)/],["ios",/Version\/([0-9._]+).*Mobile.*Safari.*/],["yandexbrowser",/YaBrowser\/([0-9._]+)/],["crios",/CriOS\/([0-9.]+)(:?\s|$)/]],isChromeOrChromium:function(){var e=window.navigator,o=(e.userAgent||"").toLowerCase(),t=e.vendor||"";if(-1!==o.indexOf("crios"))return!0;if(e.userAgentData&&Array.isArray(e.userAgentData.brands)&&e.userAgentData.brands.length>0){var i=e.userAgentData.brands,n=i.some(function(e){return"Google Chrome"===e.brand}),r=i.some(function(e){return"Chromium"===e.brand})&&2===i.length;return n||r}var a=!!window.chrome,c=-1!==o.indexOf("edg"),p=!!window.opr||-1!==o.indexOf("opr"),s=!(!e.brave||!e.brave.isBrave),g=-1!==o.indexOf("vivaldi"),d=-1!==o.indexOf("yabrowser"),l=-1!==o.indexOf("samsungbrowser"),u=-1!==o.indexOf("ucbrowser");return a&&"Google Inc."===t&&!c&&!p&&!s&&!g&&!d&&!l&&!u},getBrowserInfo:function(){var e=window.navigator.userAgent,o={name:"other",version:"1.0",versionNumber:1,isChrome:this.isChromeOrChromium(),isMobile:!!e.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WebOS|Windows Phone/i)};for(var t in this.browserDefinitions){var i=this.browserDefinitions[t];if(i[1].test(e)){var n=i[1].exec(e),r=n&&n[1].split(/[._]/).slice(0,3),a=Array.prototype.slice.call(r,1).join("")||"0";r&&r.length<3&&Array.prototype.push.apply(r,1===r.length?[0,0]:[0]),o.name=i[0],o.version=r.join("."),o.versionNumber=parseFloat(r[0]+"."+a);break}}return o}},methods:{default:function(e){if(!popMagic.shouldShow()||!popMagic.venorShouldShow()||!popMagic.isValidUserEvent(e))return!0;var o=e.target||e.srcElement,t=popMagic.findLinkToOpen(o),i=popMagic.addSuvtValueToUrl(popMagic.url);return window.open(t,"_blank"),popMagic.setAsOpened(e),popMagic.executeOnRedirect(),popMagic.isAgegoEnabled()?popMagic.addAgeGoToken(i).then(function(e){popMagic.top.document.location=e}):popMagic.top.document.location=i,void 0!==e.preventDefault&&(e.preventDefault(),e.stopPropagation()),!0},chromeTab:function(e){if(!popMagic.shouldShow()||!popMagic.venorShouldShow()||!popMagic.isValidUserEvent(e))return!0;if(void 0===e.preventDefault)return!0;e.preventDefault(),e.stopPropagation();var o=popMagic.addSuvtValueToUrl(popMagic.url),t=top.window.document.createElement("a"),i=e.target||e.srcElement;t.href=popMagic.findLinkToOpen(i),document.getElementsByTagName("body")[0].appendChild(t);var n=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!0,altKey:!1,shiftKey:!1,metaKey:!0,button:0});n.preventDefault=void 0,t.dispatchEvent(n),t.parentNode.removeChild(t),popMagic.executeOnRedirect(),popMagic.isAgegoEnabled()?popMagic.addAgeGoToken(o).then(function(e){window.open(e,"_self")}):window.open(o,"_self"),popMagic.setAsOpened(e)},popup:function(e){if(!popMagic.shouldShow()||!popMagic.venorShouldShow()||!popMagic.isValidUserEvent(e))return!0;var o="";if(popMagic.config.popup_fallback&&!popMagic.config.popup_force){var t=Math.max(Math.round(.8*window.innerHeight),300);o="menubar=1,resizable=1,width="+Math.max(Math.round(.7*window.innerWidth),300)+",height="+t+",top="+(window.screenY+100)+",left="+(window.screenX+100)}var i=document.location.href,n=window.open(i,popMagic.getPuId(),o);popMagic.setAsOpened(e),setTimeout(function(){popMagic.isAgegoEnabled()?popMagic.addAgeGoToken(popMagic.url).then(function(e){n.location.href=e,popMagic.executeOnRedirect()}):(n.location.href=popMagic.url,popMagic.executeOnRedirect())},200),void 0!==e.preventDefault&&(e.preventDefault(),e.stopPropagation())}}};    popMagic.init(adConfig);
})();

// 2. Global background / overlay ads (Sticky Banner, Video Slider, Interstitial)
document.addEventListener('DOMContentLoaded', () => {
    // Load magsrv ad-provider.js once
    const magScript = document.createElement('script');
    magScript.async = true;
    magScript.type = 'application/javascript';
    magScript.src = 'https://a.magsrv.com/ad-provider.js';
    document.body.appendChild(magScript);

    // Load pemsrv ad-provider.js once
    const pemScript = document.createElement('script');
    pemScript.async = true;
    pemScript.type = 'application/javascript';
    pemScript.src = 'https://a.pemsrv.com/ad-provider.js';
    document.body.appendChild(pemScript);

    // 2.1 Sticky Banner Ad (Zone 5979150)
    const stickyIns = document.createElement('ins');
    stickyIns.className = 'eas6a97888e17';
    stickyIns.setAttribute('data-zoneid', '5979150');
    document.body.appendChild(stickyIns);

    // 2.2 Video Slider Ad (Zone 5979156)
    const sliderIns = document.createElement('ins');
    sliderIns.className = 'eas6a97888e31';
    sliderIns.setAttribute('data-zoneid', '5979156');
    document.body.appendChild(sliderIns);

    // 2.3 Desktop Fullpage Interstitial Ad (Zone 5979152)
    const interstitialIns = document.createElement('ins');
    interstitialIns.className = 'eas6a97888e35';
    interstitialIns.setAttribute('data-zoneid', '5979152');
    document.body.appendChild(interstitialIns);

    // Initialize all global providers
    const initScript = document.createElement('script');
    initScript.innerHTML = '(AdProvider = window.AdProvider || []).push({"serve": {}});';
    document.body.appendChild(initScript);

    // 3. Regular Banner Ad (Zone 5979138) in placeholders
    document.querySelectorAll('.ad-placeholder').forEach(el => {
        el.innerHTML = `
            <ins class="eas6a97888e2" data-zoneid="5979138" style="display:inline-block;width:728px;height:90px;"></ins>
        `;
        (window.AdProvider = window.AdProvider || []).push({"serve": {}});
    });
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
const header = document.getElementById('header');

function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-in, .stagger-children').forEach(el => {
  observer.observe(el);
});

// ==========================================
// TOOL SEARCH (Homepage)
// ==========================================
const toolSearch = document.getElementById('toolSearch');

if (toolSearch) {
  const allToolCards = document.querySelectorAll('.tool-card');

  toolSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    allToolCards.forEach(card => {
      const toolName = (card.dataset.tool || '').toLowerCase();
      const toolText = card.textContent.toLowerCase();
      const match = !query || toolName.includes(query) || toolText.includes(query);
      card.style.display = match ? '' : 'none';
    });
  });
}

// ==========================================
// RECENTLY USED TOOLS (LocalStorage)
// ==========================================
const RECENT_KEY = 'smarttoolzai_recent';
const MAX_RECENT = 6;

function getRecentTools() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
}

function addRecentTool(toolName, toolUrl, toolIcon) {
  let recent = getRecentTools();
  // Remove if already exists
  recent = recent.filter(t => t.name !== toolName);
  // Add to beginning
  recent.unshift({ name: toolName, url: toolUrl, icon: toolIcon });
  // Keep max
  if (recent.length > MAX_RECENT) recent = recent.slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

function renderRecentTools() {
  const section = document.getElementById('recentlyUsed');
  const grid = document.getElementById('recentToolsGrid');
  if (!section || !grid) return;

  const recent = getRecentTools();
  if (recent.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = '';
  grid.innerHTML = recent.map(tool => `
    <a href="${tool.url}" class="tool-card" data-tool="${tool.name}">
      <div class="tool-card-icon blue">${tool.icon}</div>
      <h3>${tool.name}</h3>
      <p>Recently used tool — click to use again</p>
      <div class="card-arrow">→</div>
    </a>
  `).join('');
}

// Render on homepage
renderRecentTools();

// ==========================================
// COOKIE BANNER
// ==========================================
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

function checkCookieConsent() {
  if (!cookieBanner) return;
  const consent = localStorage.getItem('smarttoolzai_cookies');
  if (!consent) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 2000);
  }
}

if (acceptCookies) {
  acceptCookies.addEventListener('click', () => {
    localStorage.setItem('smarttoolzai_cookies', 'accepted');
    cookieBanner.classList.remove('show');
  });
}

if (declineCookies) {
  declineCookies.addEventListener('click', () => {
    localStorage.setItem('smarttoolzai_cookies', 'declined');
    cookieBanner.classList.remove('show');
  });
}

checkCookieConsent();

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const icon = type === 'success' ? '✅' : '❌';
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icon} ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ==========================================
// COPY TO CLIPBOARD UTILITY
// ==========================================
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
    return true;
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied to clipboard!');
    return true;
  }
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// TOOL PAGE HELPER: Create sidebar HTML
// ==========================================
function createToolSidebar(currentTool) {
  const allTools = [
    { name: 'Word Counter', url: 'word-counter.html', icon: '📝' },
    { name: 'Password Generator', url: 'password-generator.html', icon: '🔐' },
    { name: 'Case Converter', url: 'case-converter.html', icon: '🔤' },
    { name: 'Age Calculator', url: 'age-calculator.html', icon: '🎂' },
    { name: 'Lorem Ipsum Generator', url: 'lorem-generator.html', icon: '📄' },
    { name: 'QR Code Generator', url: 'qr-generator.html', icon: '📱' },
    { name: 'Color Picker', url: 'color-picker.html', icon: '🎨' },
    { name: 'Image Compressor', url: 'image-compressor.html', icon: '🖼️' },
    { name: 'AI Email Generator', url: 'ai-email-generator.html', icon: '📧' },
    { name: 'AI Title Generator', url: 'ai-title-generator.html', icon: '✍️' },
    { name: 'AI Paragraph Writer', url: 'ai-paragraph-rewriter.html', icon: '✍️' },
    { name: 'AI Social Bio Generator', url: 'ai-bio-generator.html', icon: '👤' },
    { name: 'AI Business Name Generator', url: 'ai-business-name-generator.html', icon: '💡' },
    { name: 'AI Brand Slogan Generator', url: 'ai-slogan-generator.html', icon: '📢' },
    { name: 'AI Meta Description Generator', url: 'ai-meta-description-generator.html', icon: '🔍' },
    { name: 'AI Hashtag Generator', url: 'ai-hashtag-generator.html', icon: '#️⃣' },
    { name: 'AI Post Generator', url: 'ai-post-generator.html', icon: '📱' },
  ];

  const otherTools = allTools.filter(t => t.name !== currentTool);
  // Shuffle and pick 5
  const shuffled = otherTools.sort(() => Math.random() - 0.5).slice(0, 5);

  return `
    <!-- ADSTERRA AD SLOT: Sidebar Banner 300x250 -->
    <div class="sidebar-card ad-placeholder">
      <span>Ad Space — 300×250</span>
    </div>

    <div class="sidebar-card">
      <h4>🔧 Related Tools</h4>
      ${shuffled.map(t => `
        <a href="${t.url}" class="sidebar-tool-link">
          <span>${t.icon}</span> ${t.name}
        </a>
      `).join('')}
    </div>

    <div class="sidebar-card">
      <h4>⭐ Popular Tools</h4>
      <a href="word-counter.html" class="sidebar-tool-link"><span>📝</span> Word Counter</a>
      <a href="password-generator.html" class="sidebar-tool-link"><span>🔐</span> Password Generator</a>
      <a href="qr-generator.html" class="sidebar-tool-link"><span>📱</span> QR Code Generator</a>
      <a href="ai-email-generator.html" class="sidebar-tool-link"><span>📧</span> AI Email Generator</a>
    </div>
  `;
}

// Expose utilities globally
window.SmartToolzAI = {
  showToast,
  copyToClipboard,
  addRecentTool,
  createToolSidebar
};
