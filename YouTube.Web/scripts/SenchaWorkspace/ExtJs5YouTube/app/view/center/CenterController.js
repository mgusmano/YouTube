Ext.define('ExtJs5YouTube.view.center.CenterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.centerController',

    listen: {
        controller: {
            '*': {
                createPlayer: 'createPlayer',
                doSearch: 'doSearch'
            }
        }
    },

    createPlayer: function (me, data, active) {
        var player = Ext.create("ExtJs5YouTube.view.player.Player", {
            itemId: 'x' + data.id,
            videoId: data.id,
            title: data.title,
            description: data.description,
            url: data.url,
            publishedAt: data.publishedAt,
            tooltip: data.title,
            closable: true
        });
        this.getView().add(player);
        if (active === true) {
            this.getView().setActiveTab(player);
        }
    },

    doSearch: function (search) {
        var searchVal = this.getReferences().theSearchText.setValue(search);
        this.refreshSearch();
    },

    onClearTriggerClick: function () {
        var refs = this.getReferences();
        refs.theSearchText.setValue();
    },

    onSearchTriggerClick: function () {
        this.refreshSearch();
        this.getView().setActiveTab(Ext.getCmp('videoGrid'));
    },

    refreshSearch: function () {
        var searchVal = this.getReferences().theSearchText.getValue();
        var theUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&type=video&q=' + searchVal + '&key=AIzaSyB5KD0DIDz5fWJFPK-6j7pZyPeKMhsK2fs&maxResults=50';
        Ext.getCmp('videoGrid').getStore().getProxy().setUrl(theUrl);
        Ext.getCmp('videoGrid').getStore().load();
    },

    onBeforeRemove: function (tabPanel, component, eOpts) {
        this.getViewModel().set('currentVideo', null);
        mc.getHash('remove', component.videoId, this)
    },

    onBeforeTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        if (oldCard === null) {
            return;
        }
        if (oldCard.xtype === 'player') {
            oldCard.stop();
        }
        var record = newCard.config;
        var data = {
            id: record.videoId,
            title: record.title,
            description: record.description,
            url: record.url,
            publishedAt: record.publishedAt
        };
        this.getViewModel().set('currentVideo', data);
        mc.getHash('change', record.videoId, this)
    }
    
});