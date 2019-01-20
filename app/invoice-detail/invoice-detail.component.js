
angular.module('invoiceDetail')
    .component('invoiceDetail', {
        templateUrl: 'app/invoice-detail/invoice-detail.template.html',
        controller: ['$http', '$routeParams' ,
            function InvoiceListController($http, $routeParams) {
                var self = this;
                this.invoiceId = $routeParams.invoiceId;

                this.$onInit = function() {
                    $http.get(invoicesRestURL + "/" + this.invoiceId).then(function (response) {
                        self.invoice = response.data[0];
                        console.log(response.data);
                    });
                };
            }
        ]
    });