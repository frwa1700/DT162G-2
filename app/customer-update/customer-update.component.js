angular.module('customerUpdate')
    .component('customerUpdate', {
        templateUrl: 'app/customer-update/customer-update.template.html',
        controller: ['$http' , '$routeParams' ,
            function customerNewController($http, $routeParams) {

                self = this;

                self.$onInit = function() {
                    self.customer = [];
                    self.loadUpdate();
                };
                self.loadUpdate = function() {
                    self.customerId = $routeParams.customerId;
                    console.log(customerRestURL + "/" + self.customerId);
                    $http.get(customerRestURL + "/" + self.customerId).then(function (response) {
                        self.customer = response.data[0];
                    });
                };
                // Update customer to webservice
                self.updateCustomer = function() {
                    delete self.customer._id;

                    if (self.customerform.$valid) {
                        $http.put(customerRestURL + '/' + self.customerId, self.customer, ).
                        then(function (response) {
                            // Show all customers after update
                            location.href = "#!/customers";
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

