Ext.define('ExtJs5YouTube.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainController',
    alternateClassName: 'mc',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onUnmatchedRoute'
            }
        }
    },

    onUnmatchedRoute: function (hash) {
        alert('unmatched');
    },

    statics: {
        initialLoad: true,

        getJson: function(videoids) {
            var theVideos = videoids.split(",,");
            theVideosJson = [];
            for (var i = 0, l = theVideos.length - 1; i < l; i++) {
                var aVideo = theVideos[i].split(",");
                var o = {};
                o.videoId = aVideo[0];
                o.active = (aVideo[1] === "true");
                theVideosJson.push(o);
            }
            return theVideosJson;
        },

        getHash: function (operation, videoId, me) {
            var hash = window.location.hash.substr(1);
            var hashArray = hash.split("/");
            var search = hashArray[0];
            var videoids = hashArray[1];
            var theVideosJson = [];
            if (videoids != 'empty') {
                theVideosJson = mc.getJson(videoids);
            }

            var baseHash = search + '/';
            var newHash = baseHash;
            switch (operation) {
                case 'add':
                    for (var i in theVideosJson) {
                        newHash = newHash + theVideosJson[i].videoId + ',' + 'false' + ',,';
                    }
                    newHash = newHash + videoId + ',' + 'true' + ',,';
                    break;
                case 'remove':
                    for (var i in theVideosJson) {
                        if (theVideosJson[i].videoId != videoId) {
                            newHash = newHash + theVideosJson[i].videoId + ',' + 'false' + ',,';
                        }
                    }
                    break;
                case 'change':
                    var foundIt = false;
                    for (var i in theVideosJson) {
                        if (theVideosJson[i].videoId != videoId) {
                            newHash = newHash + theVideosJson[i].videoId + ',' + 'false' + ',,';
                        }
                        else {
                            foundIt = true;
                            newHash = newHash + theVideosJson[i].videoId + ',' + 'true' + ',,';
                        }

                    }
                    if (foundIt === false && (videoId != undefined)) {
                        newHash = newHash + videoId + ',' + 'true' + ',,';
                    }
                    break;
            }
            if (newHash === baseHash) {
                newHash = newHash + 'empty';
            }
            me.redirectTo(newHash, true);
        }
    },

routes: {
    ':search/:videoids': {
        before: 'beforeRouteVideo',
        action: 'onRouteVideo'
    }
},

beforeRouteVideo: function (search, videoids, action) {
    console.log('beforeRouteVideo');
    if (ExtJs5YouTube.view.main.MainController.initialLoad === true) {
        ExtJs5YouTube.view.main.MainController.initialLoad = false;
        action.resume();
    }
},

onRouteVideo: function (search, videoids) {
    var me = this;

    var searchString = unescape(search);
    if (searchString != 'empty') {
        this.fireEvent('doSearch', searchString);
    }

    if (videoids != 'empty') {
        var theVideosJson = mc.getJson(videoids);
        var videosString = '';
        for (var i in theVideosJson) {
            videosString = videosString + theVideosJson[i].videoId + ',';
        }
        Ext.data.JsonP.request({
            url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyB5KD0DIDz5fWJFPK-6j7pZyPeKMhsK2fs&id=' + videosString,
            callbackName: 'test',
            method: 'GET',
            success: function (response) {
                for (var i = 0, l = response.items.length; i < l; i++) {
                    var record = response.items[i];
                    var data = {
                        id: record.id,
                        title: record.snippet.title,
                        description: record.snippet.description,
                        url: record.snippet.thumbnails.medium.url,
                        publishedAt: record.snippet.publishedAt
                    };
                    me.fireEvent('createPlayer', me, data, theVideosJson[i].active);
                    if (theVideosJson[i].active === true) {
                        //me.fireEvent('showDetails', data);
                        me.getViewModel().set('currentVideo', data);

                    }
                }
            },
            failure: function (response) {
                alert('fail');
            }
        });
    }
}

});