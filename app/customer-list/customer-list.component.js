angular.module('customerList')
    .component('customerList', {
        templateUrl: 'app/customer-list/customer-list.template.html',
        controller: ['$http' ,
            function CustomersListController($http) {
                var self = this;

                self.$onInit = function() {

                    // Load products
                    self.loadCustomers();
                };


                // Load customers
                self.loadCustomers = function() {
                    self.customers = [];
                    // Load invoices
                    $http.get(customerRestURL).
                    then(function (response) {
                        self.customers = response.data;
                    })

                };

                // Delete a customer
                self.delCustomer = function(customerId) {
                    if (confirm('Är det säkert att du vill radera kunden?'))
                    {
                        $http.delete(customer + '/' + customerId).
                        then(function (response) {
                            if (response.status == 204) {
                                // Success
                                self.loadCustomers();
                            }
                        });
                        // Reload Customers

                    }
                };
            }
        ]
    });
