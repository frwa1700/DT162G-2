//const customerRestURL = 'http://localhost:3000/invoice';

angular.module('invoiceList')
    .component('invoiceList', {
        templateUrl: 'app/invoice-list/invoice-list.template.html',
        controller: ['$http' ,
            function InvoiceListController($http) {
                var self = this;

                self.$onInit = function() {
                    self.loadInvoices();
                    self.sortType = 'dateCreated';
                    self.sortReverse = false;
                };

                self.loadInvoices = function() {
                    self.invoices = [];
                    // Load invoices
                    $http.get(invoicesRestURL).
                    then(function (response) {
                        self.invoices = response.data;
                    })
                };

                // Delete a product
                self.delInvoice = function(invoiceId) {
                    if (confirm('Är det säkert att du vill radera fakturan?'))
                    {
                        $http.delete(invoicesRestURL + '/' + invoiceId).
                        then(function (response) {
                            if (response.status == 204) {
                                // Success
                                // Reload invoices
                                self.loadInvoices();
                            }
                        });
                    }
                };

                // Marks as payed
                self.setPayed = function(invoiceId) {
                    if (confirm("Vill du markera fakturan som betald?"))
                    {
                        var updataData = { invoicePayed: true };
                        $http.put(invoicesRestURL + '/' + invoiceId, updataData).
                        then(function (response) {
                                // Reload invoices
                                self.loadInvoices();

                        });

                    }
                };
            }
        ]
    });