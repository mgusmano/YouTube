window.xonerror = function (message, url, linenumber) {
    alert(message);
}

Ext.define('ExtJs5YouTube.Application', {
    extend: 'Ext.app.Application',
    name: 'ExtJs5YouTube',
    requires: [
        'Ext.state.CookieProvider'
    ],

    init: function () {
        console.log('application init');

        //var init = [
        //    { search: 'elton john', active: true },
        //    { videoId: 'NrLkTZrPZA4', active: true },
        //    { videoId: '13GD78Bmo8s', active: true },
        //    { videoId: 'NrLkTZrPZA4', active: true }
        //];
        //this.setDefaultToken(Ext.util.Format.htmlEncode(init));


        this.setDefaultToken('empty/empty');
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        //Ext.state.Manager.setProvider(Ext.create('Ext.state.LocalStorageProvider'));
        Ext.setGlyphFontFamily('FontAwesome');
        //http://fortawesome.github.io/Font-Awesome/cheatsheet/
    },
    
    launch: function () {

        console.log(courses);
        console.log(Ext.mjg);

        //Ext.util.Observable.capture(Ext.getCmp($0.id), function (evname) { console.log(evname, arguments); })
        //var c = Ext.getCmp('Center');
        //Ext.util.Observable.capture(c, function (evname) { console.log(evname, arguments); })
        //Ext.util.Observable.releaseCapture(c);
    }
});
