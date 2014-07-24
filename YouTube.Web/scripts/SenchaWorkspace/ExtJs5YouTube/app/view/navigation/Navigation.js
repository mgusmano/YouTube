Ext.define("ExtJs5YouTube.view.navigation.Navigation",{
    extend: 'Ext.tree.Panel',
    xtype: 'navigation',
    title: 'Navigation',
    controller: "navigationController",
    stateful: true,
    stateId: 'stateNavigation',
    width: 200,
    minWidth: 200,
    split: true,
    collapsible: true,
    rootVisible: false,
    lines: false,
    useArrows: false,
    hideHeaders: true,
    reserveScrollbar: false,
    columns: [
        { xtype: 'treecolumn', flex: 1, dataIndex: 'title', 
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                var s = '';
                if (record.data.leaf) {
                    s = '<i style="width: 15px;color: #386a9d;margin: 0px 10px 0px -20px" class="fa ' + record.data.fa + '"></i>';
                }
                return s + '<span style="color: #386a9d" >' + value + '</span>';
            }
        }
    ],

    listeners: {
        scope: 'controller',
        selectionchange: 'onNavSelectionChange'
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                { text: 'Clear', width: '100px', handler: 'onClearClick', glyph: 0xf12d }
            ]
        }
    ]

});