Ext.define('ExtJs5YouTube.view.navigation.NavigationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigationController',
    requires: [
        'Ext.data.TreeStore'
    ],

    listen: {
        controller: {
            '*': {
                newFavorite: 'newFavorite'
            }
        }
    },

    init: function () {
        var theNavItems = Ext.state.Manager.getProvider().get('navItems', this.getDefaultNavItems());
        this.setTheStore(theNavItems);
    },

    newFavorite: function (data) {
        var theNavItems = Ext.state.Manager.getProvider().get('navItems', this.getDefaultNavItems());
        var o = { id: data.id, title: data.title, qtip: data.title, leaf: true, fa: 'fa-youtube', description: data.description, url: data.url, publishedAt: data.publishedAt };
        var theText = "Favorites";
        theNavItems.forEach(function (arrayItem) {
            if (arrayItem.title === theText) {
                var children = arrayItem.children;
                children.push(o);
            }
        });
        Ext.state.Manager.getProvider().set('navItems', theNavItems);
        this.setTheStore(theNavItems);
    },

    onNavSelectionChange: function (selModel, records) {
        var record = records[0];
        if (record && record.isLeaf()) {
            var data = record.data;
            this.fireEvent('createPlayer', this, data, true);
            this.getViewModel().set('currentVideo', data);
            mc.getHash('add', record.data.id, this)
            //var hash = mc.getHash('add', record.data.id)
            //this.redirectTo(hash, true);
        }
    },

    onClearClick: function () {
        Ext.state.Manager.getProvider().set('navItems', this.getDefaultNavItems());
        this.setTheStore(this.getDefaultNavItems());
    },

    setTheStore: function (theNavItems) {
        var store = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: theNavItems
            }
        });
        this.getView().setStore(store);
    },

    getDefaultNavItems: function () {
        return [
            {
                title: "Favorites",
                fa: 'fa-youtube',
                expanded: true,
                children: [
                ]
            }
        ];
    }

});