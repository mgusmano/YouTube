
// IE console.log fix
if (!window.console) console = {
    log: function () {
    }
};

//Ext.require("Ext.app.EventBus");
//Ext.override(Ext.app.EventBus, {
//    constructor: function () {
//        this.mixins.observable.constructor.call(this);
//        this.bus = {};
//        var me = this;
//        Ext.override(Ext.Component, {
//            fireEvent: function (ev) {
//                if (this.callParent(arguments) !== false) {
//                    return me.dispatch.call(me, ev, this, arguments);
//                }
//                return false;
//            }
//        });
//    }
//});

Ext.define('EMSPEED.common.com', {
    singleton: true,
    alternateClassName: 'com',

    config: {
        projectId: null
    },
    constructor: function () {

        //this.proxy = 'memoryProxy';
        this.proxy = 'emspeedProxy';

        if (typeof layoutsFolder === 'undefined') {
            this.layoutsFolder = '/_layouts/EMSPortal/';
        }
        else {
            this.layoutsFolder = layoutsFolder;
        }
        this.appFolder = this.layoutsFolder + 'app';

        //this.siteRoot = 'http://' + location.hostname + ':' + location.port + '/';
		this.siteRoot = "http://emspeed1.nam.slb.com:/";
        this.serviceRoot = 'http://' + location.hostname + ':8095/';
        //this.serviceRoot = 'http://localhost:29176/';
        this.usesWithCredentials = true;
        this.currentTab = "Project Management";
        this.portalSiteId = 1;
        this.adminSiteId = 2;
        this.myprojectsSiteId = 3;
        this.flatDisplayTypeId = 1;
        this.hierarchicalDisplayTypeId = 2;
    },

    getData: function (p) {
        var theUrl = com.ajaxUrl(p.service, p.method);
        $.ajax(com.ajaxOptions({
            url: theUrl,
            data: p.params
        }))
        .done(function (data) {
            p.callback(data);
        });
    },

    theColors: [
    ['insignificant', 'low', 'low', 'low', 'medium'],
    ['low', 'low', 'medium', 'medium', 'high'],
    ['low', 'medium', 'medium', 'high', 'high'],
    ['low', 'medium', 'high', 'high', 'extreme'],
    ['medium', 'high', 'high', 'extreme', 'extreme']
    ],

    pad: function (num) {
        return ((num > 9) ? num : "0" + num);
    },

    getSiteId: function () {
        var sSitePrefix = "/sites/";
        var sSiteUrl = location.href;
        var iPrefixStart = sSiteUrl.toLowerCase().indexOf(sSitePrefix);
        if (iPrefixStart === -1) {
            var sAdminSuffix = "/administration.aspx";
            var iAdminSuffixStart = sSiteUrl.toLowerCase().indexOf(sAdminSuffix);
            if (iAdminSuffixStart === -1) {
                return this.myprojectsSiteId;
            }
            return this.adminSiteId;
        }
        else {
            return this.portalSiteId;
        }
    },

    getTheProjectId: function () {
        var sSitePrefix = "/sites/";
        var sSiteUrl = location.href;
        var iPrefixStart = sSiteUrl.toLowerCase().indexOf(sSitePrefix);
        if (iPrefixStart === -1) {
            return 0;
        }
        else {
            var shortUrl = sSiteUrl.substr(iPrefixStart, sSiteUrl.length);
            var urlArray = shortUrl.split('/');
            var projectId = urlArray[2];
            return projectId;
        }
    },

    loading: 0,
    startLoading: function (message) {
        if (message == null || message == '') {
            message = 'Loading data...';
        }
        this.loading++;
        if (this.loading == 1) {
            Ext.MessageBox.show({
                title: 'Please wait',
                width: 280,
                maxWidth: 280,
                height: 100,
                maxHeight: 100,
                closable: false,
                msg: message
            });
        }
    },

    endLoading: function () {
        if (this.loading === 1) {
            Ext.MessageBox.hide();
        }
        this.loading--;
    },

    columnWrap: function (value) {
        return '<div style="white-space:normal !important;">' + value + '</div>';
    },

    setTheTitle: function (me, value) {
        return me.up().dockedItems.items[0].setText(value);
    },

    confirmSelection: function (callback, title, message, scope) {
        Ext.MessageBox.confirm(title, message, function (btn) { callback.call(scope || this, btn === 'yes', scope); });
    },

    getComboText: function (combo) {
        var value = combo.getValue();
        var valueField = combo.valueField;
        var record;
        combo.getStore().each(function (r) {
            if (r.data[valueField] == value) {
                record = r;
                return false;
            }
        });
        return record.data.name;
    },

    ajaxUrl: function (theService, theMethod) {
        return com.ajaxUrlOptions({ service: theService, method: theMethod });
    },

    ajaxUrlOptions: function (options) {
        var port = options.port || '8095',
            host = options.host || location.hostname,
            type = options.type || 'json';
        return 'http://' + host + ':' + port + '/' + options.service + '.svc/' + type + '/' + options.method;
    },

    ajaxOptions: function (options) {
        if (options === undefined) {
            return 0;
        }

        var theDataType = options.dataType || 'json';

        theAjaxObject = {
            url: options.url,
            type: options.type || 'POST',
            crossDomain: options.crossDomain || true,
            data: Ext.encode(options.data),
            contentType: options.contentType || "application/json; charset=utf-8",
            xhrFields: options.xhrFields || { withCredentials: true },
            async: options.asyc || true,
            beforeSend: function (xhr) {

                if (options.data) {
                    data: Ext.encode(options.data);
                }

                if (options.auth) {
                    xhr.setRequestHeader(options.auth); //May need to use "Authorization" instead
                }

                if ("withCredentials" in xhr) {
                    this.withCredentials = true;
                }
            },
            error: options.error || function (xhr, status, errorThrown) {
                com.constructErrorMessage(xhr, this.url);
                throw Error;
            }
        };

        if (theDataType !== 'void') {
            theAjaxObject.dataType = theDataType;
        }

        return theAjaxObject;
    },

    constructErrorMessage: function (data, url) {
        if (data.status == 500) {
            var e = Ext.decode(data.responseText);
            globalError = e.message + ' ' + e.correlationId;
            globalErrorUrl = url;
        }
        else {
            globalError = data.status + ' ' + data.statusText + ': ' + url;
        }
    },

    showError: function (response, opts) {
        var theErrorMessageHeadingText = 'The following failure occured, please report to level 2 support:';
        var theMessage = '';
        try {
            var r = Ext.decode(response.responseText);
            if (r.correlationId === undefined) {
                theMessage += 'Status: ' + response.status + '-' + response.statusText;
            }
            else {
                theMessage = r.message + ' ' + r.correlationId;
            }
        }
        catch (err) {
            theMessage += 'Status: ' + response.status + '-' + response.statusText + ', URL: ' + opts.url;
        }
        com.showErrorFromTry2(theMessage);
    },

    showErrorFromTry2: function (error) {
        alert(error);
        var theErrorMessageHeadingText = 'The following try failure occurred, please report to level 2 support:';

        var theErrorMessageText = document.createElement('div');
        theErrorMessageText.setAttribute('id', 'theErrorMessageText');
        theErrorMessageText.style.fontSize = '18px';
        theErrorMessageText.style.marginTop = '100px';
        theErrorMessageText.style.marginLeft = '5px';
        theErrorMessageText.style.marginBottom = '20px';
        theErrorMessageText.innerHTML = theErrorMessageHeadingText;

        var theErrorMessage = document.createElement('div');
        theErrorMessage.setAttribute('id', 'theErrorMessage');
        theErrorMessage.style.fontSize = '14px';
        theErrorMessage.style.marginTop = '20px';
        theErrorMessage.style.marginLeft = '5px';
        theErrorMessage.style.marginBottom = '100px';
        if (error.stack != undefined) {
            theErrorMessage.innerHTML = error.stack;
        }
        else if (error.message != undefined) {
            theErrorMessage.innerHTML = error.message;
        }
        else {
            theErrorMessage.innerHTML = error;
        }

        document.getElementById("content").appendChild(theErrorMessageText);
        document.getElementById("content").appendChild(theErrorMessage);

        if (Ext.get('loading') != null) {
            Ext.get('loading').remove();
        }
        if (Ext.getCmp('reportingBasePanel') != null) {
            Ext.getCmp('reportingBasePanel').setLoading(false);
            Ext.getCmp('reportingBasePanel').setVisible(false);
        }
    },

    popUpWindow: function (url) {
        var leftPosition = 0;
        var topPosition = (window.screen.height / 2) - ((height / 2) + 50);
        var height = window.screen.height - 100;
        var width = window.screen.width - 50;
        var windowName = new Date().getTime() + 'test';
        window.open(url, windowName, "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no,resizable=yes");
        return false;
    },

    getFormattedUTCLongDate: function () {
        var date = new Date();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();
        var hour = date.getUTCHours();
        var minute = date.getUTCMinutes();
        var second = date.getUTCSeconds();
        var ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;

        var shortD = com.pad(month) + '/' + com.pad(day) + '/' + year + ' ' + hour + ':' + minute + ':' + second + ' ' + ampm;

        return shortD;
    },
    getFormattedUTCShortDate: function () {
        var now = new Date();
        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

        return now_utc;
    },
    getFormattedLongDate: function (date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;

        var shortD = com.pad(month) + '/' + com.pad(day) + '/' + year + ' ' + hour + ':' + minute + ':' + second + ' ' + ampm;

        return shortD;
    },

    getFormattedShortDate: function (date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        today = mm + '/' + dd + '/' + yyyy;

        return today;
    },

    getIndexFromId: function (array, id) {
        var index;
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                index = i;
            }
        }
        return index;
    },

    compareSequence: function (a, b) {
        if (a.sequence < b.sequence)
            return -1;
        if (a.sequence > b.sequence)
            return 1;
        return 0;
    },

    compareSectionId: function (a, b) {
        if (a.sectionId < b.sectionId)
            return -1;
        if (a.sectionId > b.sectionId)
            return 1;
        return 0;
    },

    compareSectionsAvailableId: function (a, b) {
        if (a.sectionsAvailableId < b.sectionsAvailableId)
            return -1;
        if (a.sectionsAvailableId > b.sectionsAvailableId)
            return 1;
        return 0;
    },

    compareId: function (a, b) {
        if (a.id < b.id)
            return -1;
        if (a.id > b.id)
            return 1;
        return 0;
    }
});


//    setCursorByID: function (id, cursorStyle) {
//        var elem;
//        if (document.getElementById &&
//        (elem = document.getElementById(id))) {
//            if (elem.style) elem.style.cursor = cursorStyle;
//        }
//    },

//    initialiseHistory: function () {
//        Ext.getBody().createChild({
//            tag: 'form',
//            action: '#',
//            cls: 'x-hidden',
//            id: 'history-form',
//            children: [
//                {
//                    tag: 'input',
//                    id: Ext.History.fieldId,
//                    type: 'hidden'
//                },
//                {
//                    tag: 'iframe',
//                    id: Ext.History.iframeId
//                }
//            ]
//        });

//        Ext.History.init();
//        Ext.History.on('change', handleHistoryChange, this);
//    },

//    handleHistoryChange: function (token) {
//        switch (token) {
//            case 'SelectReportType':
//                Ext.getCmp('pnlReporting').setChild(0);
//                break;
//            case 'CreateCdpReport':
//                Ext.getCmp('pnlReporting').setChild(1);
//                break;
//            //        case '': //nothing after the #, show a default view                                                                                                                                                                                                                           
//        }
//    },

//time
var startDate; // = new Date();
var startTime; // = startDate.getTime();

//'<span class="label">Time since data was refreshed:</span> <span id="theTime" class="value"></span>',

//at end of app.js
//startDate = new Date();
//startTime = startDate.getTime();
//time_spent();

//at end of dashboard.reloadPortlets()
//startDate = new Date();
//startTime = startDate.getTime();

function seconds_elapsed() {
    var date_now = new Date();
    var time_now = date_now.getTime();
    var time_diff = time_now - startTime;
    var seconds_elapsed = Math.floor(time_diff / 1000);
    return (seconds_elapsed);
}

function time_spent() {
    var secs = seconds_elapsed();
    var mins = Math.floor(secs / 60);
    secs -= mins * 60;
    var hour = Math.floor(mins / 60);
    mins -= hour * 60;
    document.getElementById('theTime').innerHTML = pad(hour) + ":" + pad(mins) + ":" + pad(secs);
    setTimeout("time_spent ()", 500);
}

function pad(num) {
    return ((num > 9) ? num : "0" + num);
}
