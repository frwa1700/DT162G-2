// Define the rest-url
//const baseUrl = "http://webbutveckling17.se:3000/";
const baseUrl = "http://localhost:3000/";

const productsRestUrl = baseUrl + "products";
const customerRestURL = baseUrl + "customer";
const invoicesRestURL = baseUrl  + "invoice";


angular.module('dt162gApp').
config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.
        when('/', {
            title: 'Waldfelts',
            templateUrl: 'templates/main.html'
        }).
        when('/products/:productId', {
            title: 'Redigera produkt',
            template: '<product-update></product-update>'
        }).
        when('/products', {
            title: 'Produkter',
            template: '<product-list></product-list>'
        }).
        when('/new/product', {
            title: 'Ny produkt',
            template: '<product-new></product-new>'
        }).
        when('/invoices', {
            title: 'Fakturor',
            template: '<invoice-list></invoice-list>'
        }).
        when('/new/invoice', {
            title: 'Ny faktura',
            template: '<invoice-new></invoice-new>'
        }).
        when('/invoice/:invoiceId', {
            title: 'Faktura',
            template: '<invoice-detail></invoice-detail>'
        }).
        when('/customers', {
            title: 'Kunder',
            template: '<customer-list></customer-list>'
        }).
        when('/customers/:customerId', {
            title: 'Redigera kund',
            template: '<customer-update></customer-update>'
        }).

        when('/new/customer', {
            title: 'Ny kund',
            template: '<customer-new></customer-new>'
        }).

        otherwise('/');
    }
]).
run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}]);

