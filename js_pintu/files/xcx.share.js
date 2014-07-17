/*
 *project: hc360.com WebF2E Resource Pool
 *version: 1.0
 *create: 2012-11-22
 *update: 2013-1-1 22:00
 *author: F2E xiechengxiong
 */
(function(win, doc){
    if(typeof jQuery === 'undefined') {
        return;
    }
    var $ = jQuery;
    var Config = {
        sinaBlog: {mark: 'share_sinablog', title: '分享到新浪微博', url: 'http://service.weibo.com/share/share.php', backPos: '0 0'},
        qZone: {mark: 'share_qzone', title: '分享到QQ空间', url: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey', backPos: '0 -50px'},
        renRen: {mark: 'share_renren', title: '分享到人人网', url: 'http://widget.renren.com/dialog/share', backPos: '0 -100px'},
        qqBlog: {mark: 'share_qqblog', title: '分享到腾讯微博', url: 'http://share.v.t.qq.com/index.php', backPos: '0 -150px'}
    };
    $.fn.share = function(options) {
        var opts = $.extend({}, $.fn.share.defaults, options);
        return this.each(function() {
            this.innerHTML = createShareDom(opts);
            addHandler(this, 'click', function(e) {
                var _target = e.target || e.srcElement;
                var dataShare = _target.getAttribute('data-share');
                if(dataShare) {
                    win.open(dataShare, '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
                }
                opts.clickHandler && opts.clickHandler(e || win.event);
            });
        });
    };
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }
    function createShareDom(opts) {
        var shareDom = [];
        for(var i = 0, len = opts.modules.length; i < len; i++) {
            var module = Config[opts.modules[i]];
            if(module) {
                var dataShare = '';
                var shareUrl = encodeURIComponent(opts.shareUrl);
                var shareTitle = encodeURIComponent(opts.shareTitle);
                var shareImg = encodeURIComponent(opts.shareImg);
                var size = opts.size === 16 ? 16 : 32;
                var aStyle = 'float: left;width: '+ size +'px;height: '+ size +'px;background: url(http://xiechengxiong.com/github/src/images/share-bg-'+ size +'.png) '+ module.backPos +';';
                var liStyle = 'width: '+ size +'px;height: '+ size +'px;margin: 0 5px 5px 0;list-style: none;float: '+ (opts.align === 'horizontal' ? 'left;' : 'none;');
                switch (module.mark){
                    case 'share_sinablog': dataShare = module.url +'?title='+ shareTitle +'&url='+ shareUrl +'&pic='+ shareImg; break;
                    case 'share_qzone': dataShare = module.url +'?title='+ shareTitle +'&url='+ shareUrl +'&pics='+ shareImg +'&desc='+ shareTitle; break;
                    case 'share_renren': dataShare = module.url +'?title='+ shareTitle +'&resourceUrl='+ shareUrl +'&srcUrl='+ shareUrl +'&pic='+ shareImg +'&description='+ shareTitle; break;
                    case 'share_qqblog': dataShare = module.url +'?c=share&a=index&title='+ shareTitle +'&url='+ shareUrl +'&pic='+ shareImg; break;
                    default: break;
                }
                shareDom.push('<li style="'+ liStyle +'"><a href="'+ (opts.mode === 'open' ? 'javascript:void(0);" data-share="'+ dataShare +'"' : dataShare +'" target="'+ opts.mode +'"') +' title="'+ module.title +'" class="'+ module.mark +'" style="'+ aStyle +'"></a></li>');
            }
        }
        return '<ul>'+ shareDom.join('') +'</ul>';
    }
    $.fn.share.defaults = {
        align: 'horizontal',
        mode: '_blank',
        modules: ['sinaBlog', 'qZone', 'renRen', 'qqBlog'],
        shareUrl: win.location.href,
        shareImg: '',
        shareTitle: doc.title,
        size: 32,
        clickHandler: null
    };
})(window, document);