Ext.define('EMSPEED.commom.ajaxProxy', {
    alias: 'proxy.ajaxProxy',
    extend: 'Ext.data.proxy.Ajax',

    constructor: function (config) {
        //console.log('constructor ' + config);
        console.log(config);
        Ext.apply(this, config);
        this.reader = { 
            type: 'json' 
        };
        this.callParent(arguments); 
    },

    buildUrl: function (request) {
        var urlBase = 'http://emspeed1.nam.slb.com';
        var theUrl = urlBase + ':8095/' + encodeURIComponent(this.service) + '.svc/json/' + encodeURIComponent(this.method);
        return theUrl;
    },

    limitParam: false, //to remove param "limit"
    pageParam: false, //to remove param "page"
    startParam: false, //to remove param "start"
    noCache: false, //to remove param "_dc"
    paramsAsJson: true,
    withCredentials: true,
    useDefaultXhrHeader: false,
    actionMethods: {
        read: 'POST'
    },
    writer: {
        type: 'json'
    },

    listeners: {
        exception: function (proxy, request, operation, eOpts)
        {
            alert(proxy.service + ' ' + proxy.method + ' ' + request.status + ' ' + request.statusText + ' ');
        }
    }
    //buildRequest: function (operation) {
    //    var request = this.callParent(arguments);
    //    // For documentation on jsonData see Ext.Ajax.request 
    //    //request.jsonData = request.params;
    //    //request.params = {};
    //    return request;
    //}

});