Ext.define('ExtJs5YouTube.model.Video', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.Request'
    ],
    fields: [
        { name: 'id', mapping: 'id.videoId', type: 'string' },
        { name: 'videoId', mapping: 'id.videoId', type: 'string' },
        { name: 'title', mapping: 'snippet.title', type: 'string' },
        { name: 'description', mapping: 'snippet.description', type: 'string' },
        { name: 'url', mapping: 'snippet.thumbnails.medium.url', type: 'string' },
        { name: 'publishedAt', mapping: 'snippet.publishedAt', type: 'string' }
    ],
    proxy: {
        type: 'jsonp',
        //url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&type=video&q=extjs 5&key=AIzaSyB5KD0DIDz5fWJFPK-6j7pZyPeKMhsK2fs&maxResults=35',
        limitParam: false, //to remove param "limit"
        pageParam: false, //to remove param "page"
        startParam: false, //to remove param "start"
        noCache: false, //to remove param "_dc"
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});