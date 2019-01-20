/*
    Created by Fredrik Waldfelt
    Component to use for new invoice at project in course DT162G
 */

angular.module('invoiceNew')
    .component('invoiceNew', {
        templateUrl: 'app/invoice-new/invoice-new.template.html',
        controller: ['$http'  ,
            function productNewController($http) {
                self = this;

                this.$onInit = function() {
                    // Empty invoice-model to use
                    self.newInvoice = {
                        invoicePayed: false,
                        //totalTax: 0,
                        totalSumTaxExcluded: 0,
                        totalSum: 0,
                        orderRows: 0,
                        products: [],
                        customer: {
                            name : "",
                            adress : "",
                            zipcode : "",
                            city   : "",
                            email : "",
                            phone : ""
                            }
                    };

                    // No customer at start
                    self.customer = [];

                    // Empty product-model to use for new products
                    self.productModel = {
                        addnew: true,
                        name: "",
                        sku: "",
                        unitType: "st",
                        quantity: 1,
                        priceTotal: 0,
                        price: {
                            price: 0,
                            taxrate: "25",
                            taxExcluded: 0,
                        }
                    };

                    // Settings for creating new data or not
                    self.settings = {
                        newCustomer: true, // New customer as default. Changed when retrieved a customer from search
                        productReady: false, // Used to enable/disable save-button
                        invoiceSaved: false, // Set to true when saved.
                        invoiceId: "" // ID of the new invoice
                    };

                    // Default searchResult to empty productModel to show in productform
                    self.searchResult = self.productModel;

                };

                // Calculate prices and tax
                self.setTaxExluded = function () {
                    var tmp = parseFloat(self.searchResult.price.price / (1 + (0.01 * self.searchResult.price.taxrate)));
                    self.searchResult.price.taxExcluded = parseFloat(tmp.toFixed(2));
                    this.updatePrice();
                };

                self.setTaxIncluded = function() {
                      var tmp = parseFloat(self.searchResult.price.taxExcluded * (1 + (0.01 * self.searchResult.price.taxrate)));
                      self.searchResult.price.price = parseFloat(tmp.toFixed(2));
                      this.updatePrice();
                };

                // Update total price of row
                self.updatePrice = function() {
                    self.searchResult.priceTotal = self.searchResult.quantity * self.searchResult.price.price;
                };

                // Callback from search
                this.customerSearch = function(customerResponseData) {
                    // If new customer we shouldn't add the response to the invoice
                    if (customerResponseData.newCustomer === true)
                    {
                        self.newInvoice.customer = [];
                        self.settings.newCustomer = true;
                    } else {
                        self.newInvoice.customer.name = customerResponseData.name;
                        self.newInvoice.customer.adress = customerResponseData.adress;
                        self.newInvoice.customer.zipcode = customerResponseData.zipcode;
                        self.newInvoice.customer.city = customerResponseData.city;
                        self.newInvoice.customer.email = customerResponseData.email;
                        self.newInvoice.customer.phone = customerResponseData.phone;
                        self.settings.newCustomer = false;
                    }
                }

                // Callback from product-search
                self.productSearch = function(value) {
                    self.searchResult = value;
                    self.searchResult.quantity = 1;
                };

                // Add product to invoice
                self.addProduct = function () {
                    // only add if productform is valid
                    if (self.productform.$valid)
                    {
                        var tmp = parseFloat(self.searchResult.price.taxExcluded * self.searchResult.quantity);
                        var sumTax = parseFloat(tmp.toFixed(2));
                        // Add sums to product and invoice
                        self.searchResult.priceTotal = self.searchResult.price.price * self.searchResult.quantity;
                        self.newInvoice.totalSum += self.searchResult.priceTotal;
                        self.newInvoice.totalSumTaxExcluded += self.searchResult.price.taxExcluded * self.searchResult.quantity;
                        self.newInvoice.orderRows += 1;

                        // Create variable to add to invoice
                        var productToAdd = {
                            name: self.searchResult.name,
                            sku: self.searchResult.sku,
                            unitType: self.searchResult.unitType,
                            quantity: self.searchResult.quantity,
                            priceTotal: self.searchResult.priceTotal,
                            price: {
                                price: self.searchResult.price.price,
                                taxrate: self.searchResult.price.taxrate,
                                taxExcluded: self.searchResult.price.taxExcluded
                            }
                        };
                        // Post if Product should be saved
                        if (self.searchResult.addnew) self.postProduct(productToAdd);

                        // Push product to invoice
                        self.newInvoice.products.push( productToAdd);

                        // There is an orderrow, using to enable/disable save-button
                        self.settings.productReady = true;

                        self.searchResult = self.productModel;
                    };
                };

                // Post invoice to webservice
                self.saveData = function() {
                    // Post customer if a new should be created
                    if (self.settings.newCustomer) self.postCustomer(self.newInvoice.customer);

                    $http.post(invoicesRestURL, self.newInvoice).
                    then(function (response) {
                        if (response.status == 200) {
                            self.settings.invoiceSaved = true;
                            self.settings.invoiceId = response.data.id;
                        } else {
                            console.error("Data sparades inte.");
                        }
                    });


                };

                // Post products to webservice
                self.postProduct = function(newProduct) {
                    $http.post(productsRestUrl, newProduct).
                    then(function (response) {
                        console.log(response.data);
                    });
                };

                // Post customer to webservice
                self.postCustomer = function(newCustomer) {
                    $http.post(customerRestURL, newCustomer).
                    then(function (response) {
                        console.log(response.data);

                    });
                }

                // Show invoice
                self.showInvoice = function() {
                    var invoiceUrl = "#!/invoice/" + self.settings.invoiceId;
                    location.href = invoiceUrl;
                }

                // Back to invoice-listings
                self.cancelNew = function() {
                    location.href = "#!/invoices";
                }


            }
        ]
});

