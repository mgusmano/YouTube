Ext.define("ExtJs5YouTube.view.center.Center",{
    extend: "Ext.tab.Panel",
    xtype: 'center',
    controller: "centerController",
    id: 'Center',

    listeners: {
        scope: 'controller',
        beforetabchange: 'onBeforeTabChange',
        beforeremove: 'onBeforeRemove'
    },

    items: [
        {
            glyph: 0xf166,
            xtype: 'videogrid',
            reference: 'videogrid'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            cls: 'x-panel-header x-header x-header-noborder x-docked x-unselectable x-panel-header-default x-horizontal x-panel-header-horizontal x-panel-header-default-horizontal x-top x-panel-header-top x-panel-header-default-top x-docked-top x-panel-header-docked-top x-panel-header-default-docked-top x-box-layout-ct x-noborder-trl',
            dock: 'top',
            items: [
                {
                    xtype: 'textfield',
                    dock: 'top',
                    emptyText: "Type a YouTube search term and press 'enter' or click the magnifying glass >>",
                    width: '100%',
                    enableKeyEvents: true,
                    reference: 'theSearchText',

                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            handler: 'onClearTriggerClick'
                        },
                        search: {
                            cls: 'x-form-search-trigger',
                            weight: 1,
                            handler: 'onSearchTriggerClick'
                        }
                    },

                   listeners: {
                       keyup: {
                            fn: function(field, event, eOpts) {
                                if (event.getKey() == event.ENTER) {
                                    field.onSearchTriggerClick();
                                }
                            },
                            buffer: 300
                        }
                   },

                   onSearchTriggerClick: function () {
                       var searchVal = this.getValue();
                       var theUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&type=video&q=' + searchVal + '&key=AIzaSyB5KD0DIDz5fWJFPK-6j7pZyPeKMhsK2fs&maxResults=50';
                       //var theVideoGrid = this.down('videogrid');
                       Ext.getCmp('videoGrid').getStore().getProxy().setUrl(theUrl);
                       Ext.getCmp('videoGrid').getStore().load();
                       this.up('panel').setActiveTab(Ext.getCmp('videoGrid'));
                   }
                }
            ]
        }
    ]

});