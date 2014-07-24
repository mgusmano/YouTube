Ext.define('ExtJs5YouTube.view.videogrid.VideoGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.videogridController',
    requires: [
        "ExtJs5YouTube.view.player.Player"
    ],

    onFavoriteClick: function (grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex);
        var data = record.data;
        this.fireEvent('newFavorite', data);
    },

    onPlayClick: function (grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex);
        var data = record.data;
        this.fireEvent('createPlayer', this, data, true);
        this.getViewModel().set('currentVideo', data);
        //debugger;
        //mc.getHash('add', data.id, this)
        //this.redirectTo(hash, true);
    },

    onGridSelect: function (grid, record, index, eOpts) {
        var data = record.data;
        this.getViewModel().set('currentVideo', data);
    }

    //fireTheEvent: function (event, data, activate) {
    //    var theDetails = {};
    //    theDetails.id = data.id;
    //    theDetails.title = data.title;
    //    theDetails.description = data.description;
    //    theDetails.url = data.url;
    //    theDetails.publishedAt = data.publishedAt;
    //    this.fireEvent(event, this, theDetails, activate);
    //}

});