/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Ext5Test.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Ext5Test',

    views: [
        // TODO: add views here
    ],

    controllers: [
        'Root'
        // TODO: add controllers here
    ],

    stores: [
        // TODO: add stores here
    ],
    
    launch: function () {
        console.log(courses);
        console.log(Ext.mjg);
        // TODO - Launch the application
    }
});
