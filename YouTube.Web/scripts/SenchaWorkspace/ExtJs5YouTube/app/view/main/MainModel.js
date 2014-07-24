Ext.define('ExtJs5YouTube.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainModel',
    data: {
        currentVideo: null
    },
    formulas: {
        disabled: {
            bind: {
                cv: '{currentVideo}'
            },
            get: function (data) {
                if (data.cv === null) {
                    return true;
                }
                else {
                    if (data.cv.id === undefined) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    }
});
