Ext.define("ExtJs5YouTube.view.details.Details", {
    "extend": "Ext.panel.Panel",
    xtype: 'details',
    title: 'Details',
    controller: "detailsController",
    bodyPadding: 20,
    width: 360,
    split: true,
    collapsible: true,

    bind: {
        data: {
            bindTo: '{currentVideo}',
            deep: true
        }
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                { bind: {disabled: '{disabled}' },  text: 'Favorite', width: '100px', handler: 'onFavoriteClick' }
                { bind: { disabled: '{!currentVideo.id}' }, text: 'Favorite', width: '100px', handler: 'onFavoriteClick' }
            ]
        }
    ],

    tpl: [
    '<tpl if="this.isData(values)">',
        '<div>',
        '<b>{title}</b><br/><br/>',
        '{description}<br/><br/>',
        '<img src="{url}" alt="" ><br/><br/>',
        'Published: {publishedAt:date("F j, Y")}<br/><br/>',
        'Video ID: {id}<br/><br/>',
        '</div>',
        '</tpl>', {
            isData: function (data) {
                if (data.id === undefined) {
                    return false;
                }
                return true;
            }
        }
    ]
});
