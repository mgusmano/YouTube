Ext.define('EMSPEED.common.Marc', {
    singleton: true,
    alternateClassName: 'marc',
    //requires: ['Ext.mixin.Mashup'],


    mixins: ['Ext.mixin.Mashup'],

    requiredScripts: [
        '../js/jquery/jquery-1.9.1.js'
    ],

    constructor: function (config) {
        this.callParent(arguments);

        //$('body').on('click', '', function () {
        //    alert('hi');
        //});
    },

    test: function (p) {
        console.log(p + ' from EMSPEED.common.Marc Sencha package');
    }

});