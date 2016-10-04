/**
 * Created by DarkMukke on 03/10/2016.
 */


//namespace
var App = App || {};
App.Helper = App.Helper || {};

jQuery( document ).ready(function( $ ) {

        App.Helper.Template = function () {

            this.member = null;

            this.privateMethod = function () {

            };

            this.init = function () {

            };


            this.init();

        };

        App.Helper.Template.prototype.publicMethod = function () {

        };

        var Template = new App.Helper.Template();
});
