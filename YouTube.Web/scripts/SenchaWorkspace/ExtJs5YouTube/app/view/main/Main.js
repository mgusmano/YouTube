Ext.define('ExtJs5YouTube.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'main',
    controller: 'mainController',
    viewModel: { type: 'mainModel'},
    layout: { type: 'border' },
    items: [
        { region: 'north',  xtype: 'north'      },
        { region: 'west',   xtype: 'navigation' },
        { region: 'center', xtype: 'center'     },
        { region: 'east',   xtype: 'details'    },
        { region: 'south',  xtype: 'south'      }
    ]
});
