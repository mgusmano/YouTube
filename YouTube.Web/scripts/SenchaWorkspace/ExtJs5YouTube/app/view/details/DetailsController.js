Ext.define('ExtJs5YouTube.view.east.DetailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detailsController',

    onFavoriteClick: function () {
        var data = this.getViewModel().get('currentVideo');
        this.fireEvent('newFavorite', data);
    }

    //listen: {
    //    controller: {
    //        //videogridController: {
    //        //    showDetails: 'showDetails'
    //        //},
    //        //navigationController: {
    //        //    showDetails: 'showDetails'
    //        //},
    //        //centerController: {
    //        //    showDetails: 'showDetails'
    //        //},
    //        rootController: {
    //            showDetails: 'showDetails'
    //        }

    //    }
    //},

    //showDetails: function (theDetails) {
    //    this.getViewModel().set('currentVideo', theDetails);
    //}
    
});