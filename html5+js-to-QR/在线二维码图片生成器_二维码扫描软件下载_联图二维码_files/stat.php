(function(win, doc){
    try{
        function cookie(key, value){
            if(arguments.length > 1){
                var expires = new Date(9999, 11, 31).toUTCString();
                var names = doc.domain.split('.');
                var domain = '';
                for(var i=names.length-1; i>0; i--){
                    domain = '.' + names[i] + domain;
                    doc.cookie = key + '=' + encodeURIComponent(value) + '; expires=' + expires + '; domain='+domain+'; path=/';
                    if(cookie(key)==value) {
                        return true;
                    }
                }
                return doc.cookie = key + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
            }
            var result;
            return doc.cookie? ((result = new RegExp('(?:^|; )' + key + '=([^;]*)').exec(doc.cookie)) ? decodeURIComponent(result[1]) : null) : null;
        }
        function unique(){
            var guid = '';
            for(var i=0; i<8; i++){
                guid += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                if(i >= 1 && i <= 4) {
                    guid += '-'
                }
            }
            return guid;
        }
        var param = new Object();
        param.now = parseInt((new Date()).getTime() / 1000);
        param.home = 'http://www.kutongji.com/report/?siteid=38';
        param.log = 'http://l1.kutongji.com/log.php';
        param.site = '38';
        param.sid = cookie('kutongji_sid' + param.site);
        param.sin = cookie('kutongji_sin' + param.site) || '';
        param.visit = parseInt(cookie('kutongji_visit' + param.site) || 0);
        param.last = cookie('kutongji_last' + param.site) || 0;        
        
        if(!param.sid){
            cookie('kutongji_sid' + param.site, param.sid = unique());
        }
        if(!doc.referrer || doc.referrer.split('/', 3)[2] !== doc.domain){
            cookie('kutongji_sin' + param.site, param.sin = (doc.referrer || ''));
        }
        var interval = param.now - param.last;
        interval < 86400 ? param.visit-- : cookie('kutongji_visit' + param.site, param.visit+1);
        cookie('kutongji_last' + param.site, param.now);
        
        var loadtime = (win._speedMark && win._speedMark.getTime) ? ((new Date()).getTime() - win._speedMark.getTime()) / 1000 : 0;

        var logurl = param.log + (param.log.indexOf('?') === -1 ? '?':'&') + 'site=' + param.site;
        logurl += '&sid=' + encodeURIComponent(param.sid);
        logurl += '&sin=' + encodeURIComponent(param.sin);
        logurl += '&ref=' + encodeURIComponent(doc.referrer || '');
        logurl += '&url=' + encodeURIComponent(doc.URL.split("#")[0]);
        logurl += '&ua=' + encodeURIComponent(win.navigator.userAgent);
        logurl += '&sc=' + encodeURIComponent(win.screen.width + 'x' + win.screen.height);
        logurl += '&lg=' + encodeURIComponent(win.navigator.language||win.navigator.browserLanguage||win.navigator.systemLanguage||win.navigator.userLanguage);
        logurl += '&lt=' + loadtime;
        logurl += '&rv=' + param.visit;
        logurl += '&pt=' + interval;

        doc.write('<img src="'+logurl+'" alt="'+param.home+'" width="1" height="1" border="0" />');
    }catch(err){
        var msg = err; for(var p in err) msg += '{' + p + '=' + err[p] + '}';
        doc.write('<img src="http://debug.kutongji.com/debug.php?msg='+encodeURIComponent(msg+((win.navigator && win.navigator.userAgent)? win.navigator.userAgent : ''))+'" alt="debug" width="1" height="1" border="0" />');
    }
})(window, document);
