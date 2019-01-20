//const customerRestURL = 'http://localhost:3000/invoice';

angular.module('productUpdate')
    .component('productUpdate', {
        templateUrl: 'app/product-update/product-update.template.html',
        controller: ['$http' ,'$routeParams' ,
            function productNewController($http, $routeParams) {
                self = this;

                self.$onInit = function() {
                    // Empty model for product
                    self.product = [];
                    self.loadUpdate();
                };

                self.loadUpdate = function() {
                    console.log('fetching product');
                    self.productId = $routeParams.productId;
                    $http.get(productsRestUrl + "/" + self.productId).then(function (response) {
                        self.product = response.data[0];
                        console.log(response.data);
                    });
                };

                // Calculate prices and tax
                self.setTaxExluded = function () {
                    var tmp = parseFloat(self.product.price.price / (1 + (0.01 * self.product.price.taxrate)));
                    self.product.price.taxExcluded = parseFloat(tmp.toFixed(2));
                };

                self.setTaxIncluded = function() {
                    var tmp = parseFloat(self.product.price.taxExcluded * (1 + (0.01 * self.product.price.taxrate)));
                    self.product.price.price = parseFloat(tmp.toFixed(2));
                };

                // Update product to webservice
                self.updateProduct = function() {
                    delete self.product._id;

                    if (self.productform.$valid) {
                        $http.put(productsRestUrl + '/' + self.productId, self.product, ).
                        then(function (response) {
                            // Show all products after post
                            location.href = "#!/products/";
                        });
                    }
                };

                // Back to product-listings
                self.cancelUpdate = function() {
                    location.href = "#!/products/";
                }

            }
        ]
});

