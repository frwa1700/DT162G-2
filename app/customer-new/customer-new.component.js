angular.module('customerNew')
    .component('customerNew', {
        templateUrl: 'app/customer-new/customer-new.template.html',
        controller: ['$http' ,
            function customerNewController($http) {

                self = this;

                self.$onInit = function() {
                    self.customer = {
                        name: "",
                        adress: "",
                        zipcode: "",
                        city: "",
                        phone: "",
                        email: ""
                        };

                };

                // Post customer to webservice
                self.postCustomer = function() {
                    if (self.customerform.$valid) {
                        $http.post(customerRestURL, self.customer).then(function (response) {
                            // Show all customers after post
                            location.href = "#!/customers";
                        });

                    }
                };


                // Back to product-listings
                self.cancelNew = function() {
                    location.href = "#!/customers";
                }


            }
        ]
});

