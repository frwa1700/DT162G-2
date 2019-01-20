angular.module('productList')
    .component('productList', {
        templateUrl: 'app/product-list/product-list.template.html',
        controller: ['$http' ,
            function InvoiceListController($http) {
                var self = this;

                self.$onInit = function() {
                    self.products = [];
                    self.sortType = 'name';
                    self.sortReverse = false;


                    // Load products
                    self.loadProducts();
                };

                // Load producst
                self.loadProducts = function() {

                    self.products = [];
                    // Load invoices
                    $http.get(productsRestUrl).
                    then(function (response) {
                        self.products = response.data;
                    })

                };

                // Delete a product
                self.delProduct = function(productId) {
                    if (confirm('Är det säkert att du vill radera produkten?'))
                    {
                        $http.delete(productsRestUrl + '/' + productId).
                        then(function (response) {
                            if (response.status == 204) {
                                // Success
                            }
                        });
                        // Reload invoices
                        self.loadProducts();
                    }
                };

                // Change a product
                self.changeProduct = function(theProduct) {
//                    if (confirm('TJo'))
                    {

                    }
                }

            }
        ]
    });
