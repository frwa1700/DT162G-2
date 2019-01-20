//const customerRestURL = 'http://localhost:3000/invoice';

angular.module('productNew')
    .component('productNew', {
        templateUrl: 'app/product-new/product-new.template.html',
        controller: ['$http' ,
            function productNewController($http) {
                self = this;

                self.$onInit = function() {
                    self.addNewProduct = false;

                    // Empty model for new product
                    self.newproduct = {
                        name: "",
                        sku: "",
                        unitType: "st",
                        price: {
                            price: 10.00,
                            taxrate: "25",
                            taxExcluded: 0
                            }
                        };
                    self.setTaxExluded();
                };

                // Calculate prices and tax
                self.setTaxExluded = function () {
                    var tmp = parseFloat(self.newproduct.price.price / (1 + (0.01 * self.newproduct.price.taxrate)));
                    self.newproduct.price.taxExcluded = parseFloat(tmp.toFixed(2));
                };

                self.setTaxIncluded = function() {
                    var tmp = parseFloat(self.newproduct.price.taxExcluded * (1 + (0.01 * self.newproduct.price.taxrate)));
                    self.newproduct.price.price = parseFloat(tmp.toFixed(2));
                };

                // Post products to webservice
                self.postProduct = function() {
                    if (self.newproductform.$valid) {
                        $http.post(productsRestUrl, self.newproduct).then(function (response) {
                            console.log(response.data);
                            // Show all products after post
                            location.href = "#!/products/";
                        });
                    }
                };

                // Back to product-listings
                self.cancelNew = function() {
                    location.href = "#!/products/";
                }

            }
        ]
});

