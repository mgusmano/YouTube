Ext.define('EMSPEEDExt5.ux.ajax.SimManager', {
    override: 'Ext.ux.ajax.SimManager',


//Ext.override(Ext.ux.ajax.SimManager, {
    getXhr: function (method, url, options, async) {
        var simlet = this.getSimlet(url);
        if (simlet) {
            method = "GET";
            options.method = "GET";
            url = simlet.url;
            return simlet.openRequest(method, url, options, async);
        }
        return null;
    }
});
