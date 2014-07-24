Ext.define("ExtJs5YouTube.view.north.North",{
    extend: 'Ext.Container',
    xtype: 'north',
    title: 'Ext JS 5 YouTube Viewer',
    cls: 'northContainer',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },

    initComponent: function () {
        document.title = this.title;

        this.items = [
            {
                xtype: 'component',
                cls: 'northLogo'
            },
            {
                xtype: 'component',
                cls: 'northTitle',
                html: this.title,
                flex: 1
            },
            {
                xtype: 'component',
                cls: 'northMenu',
                margin: '0 5 0 0'
            }
        ];



        //if (!Ext.getCmp('options-toolbar')) {
        //    this.items.push({
        //        xtype: 'themeSwitcher'
        //    });
        //}

        this.callParent();
    }

});
