/**
 * Created by Ruben on 03/10/2016.
 */
/**
 * Autoloader register
 * @usage: App.Autoload = new App.Helper.Autoloader('/assets/my/base/path/App')
 *
 */


//namespace
var App = App || {};
App.Helper = App.Helper || {};

/**
 *
 * @param basePath Basepath must be relative to the document root.
 * @param currentpath Current route.
 *          Will attempt to auoload App/Route/the/current/route.js and App/Route/the/current/route.css .
 * @param availableFiles (Optional) An array of available files, add this to prevent 404's in page.
 * @constructor
 */
App.Helper.Autoloader = function (basePath, currentpath, availableFiles) {
    this.register = [];
    this.basePath = basePath;
    this.availableFiles = (typeof availableFiles !== 'undefined') ?  JSON.parse(availableFiles) : null;

    /**
     * Method to crate an html script object with the correct filename and inject it into the DOM
      * @param uri
      * @param css Boolean, set to tru if loading js, only used to load the current route's css.
     */
    this.injectScript = function (uri, css) {
        css = (typeof css !== 'undefined') ?  css : false;
        console.log(uri);
        if(this.uriExists(uri)) {
            var $el = css ? jQuery('<link />') : jQuery('<script></script>');
            var type = css ? 'text/css' : 'text/javascript';
            var linkatt = css ? 'href' : 'src';
            $el.attr('type', type);
            $el.attr(linkatt, uri);
            if(css) {
                $el.attr('rel', 'stylesheet');
            }
            jQuery('head').append($el);
        }
    };

    this.translateNS = function (fullClassNS) {
        //try to load both js and css files for the required namespace
        this.injectScript(this.basePath + fullClassNS + '.js');
        this.injectScript(this.basePath + fullClassNS + '.css', true);

    };

    /**
     * Checks if a file exists
     * @param url
     * @returns {boolean}
     */
    this.uriExists =function (url)
    {

        if( null !== this.availableFiles ) {
            return jQuery.inArray(url, this.availableFiles);
        } else {
            $.ajax({
                url: url,
                success: function(){
                    return true
                },
                error: function(){
                    return false;
                }
            });
        }
    };

    if(currentpath == '/' || currentpath == '') {
        currentpath = '/root';
    }

    //try to load both js and css files for the required namespace
    this.injectScript(this.basePath + '/App/Route' + currentpath + '.js');
    this.injectScript(this.basePath + '/App/Route' + currentpath + '.css', true);


};

/**
 * Method to load script required in other scripts
 * @public
 * @usage App.Autoload.require('/App/Helper/Validate')
 */
App.Helper.Autoloader.prototype.require = function (fullClassNS) {
    if( jQuery.inArray(fullClassNS, this.register)) {
        //register so we dont load the same object twice
        this.register.push(fullClassNS);
        this.translateNS(fullClassNS)
    }
};



