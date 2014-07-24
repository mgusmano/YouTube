Ext.define("ExtJs5YouTube.view.videogrid.VideoList",{
    "extend": "Ext.grid.Panel",
    xtype: 'videogrid',
    title: 'Master List',
    "controller": "videogridController",
    id: 'videoGrid',
    listeners: {
        scope: 'controller',
        select: 'onGridSelect'
    },

    width: '100%',
    store: Ext.create('ExtJs5YouTube.store.VideosStore'),
    columns: [
        {
            xtype:'actioncolumn',
            text: 'Favorite',
            width: 100,
            align: 'center',
            items: [
                {
                    icon: 'resources/images/add.png',
                    //iconCls: 'favorite-col',
                    tooltip: 'Add to Favorites',
                    handler: 'onFavoriteClick'
                }
            ]
        },

        {
            xtype: 'actioncolumn',
            text: 'Play',
            width: 100,
            align: 'center',
            items: [
                {
                    icon: 'resources/images/book.png',
                    //iconCls: 'favorite-col',
                    tooltip: 'Play',
                    handler: 'onPlayClick'
                }
            ]
        },
        { text: 'Video Id', dataIndex: 'id', width: 150 },
        { text: 'Title', dataIndex: 'title', flex: 1 }
    ]
});