angular.module('searchBlock')
    .component('searchBlock', {
        bindings: {
            out: '<', // Callback to send search to
            type: '@' // String holding search-type

        },
        templateUrl: 'app/search-block/search-block.template.html',
        controller: ['$http' ,
            function InvoiceListController($http) {
                var self = this;

                self.$onInit = function() {
                    self.settingsModel = {
                        products:   {
                            "name": "produkter",
                            "searchtext": "Sök efter produktnamn",
                            "placeholder": "produktnamn",
                            "type": "products",
                            "queryStr": "/?name=",
                            "queryLimit": 5
                        },
                        customer: {
                            "name": "kunder",
                            "searchtext": "Sök befintlig kund eller skapa ny",
                            "placeholder": "Namn",
                            "type": "customer",
                            "queryStr": "/?name=",
                            "queryLimit": 5
                        }
                    };
                    self.settings = self.settingsModel[self.type];
                    self.resultList = [];
                    self.callback = self.out;
                    self.addnew = false;
                };


                this.searchQuery = function (string) {
                    if (string.length < 2 )
                    {
                        self.resultList = []; // Clear searchresult
                    } else  {
                        self.resultList = [];

                        // Make querystring from settings
                        var query = baseUrl + self.settings.type + self.settings.queryStr;
                        query += string + '&limit=' + self.settings.queryLimit;
                        $http.get(query).then(function (response) {
                            if (response.status == 200) {
                                self.resultList = response.data;
                                self.addnew = false;
                            } else {
                                self.addnew = true;
                                self.resultList = []; // Clear searchresults
                            }
                        });

                    }
                };

                self.complete=function(string){
                    var output=[];
                    angular.forEach( this.resultList,function(result){
                        if(result.name.toLowerCase().indexOf(string.toLowerCase())>=0){
                            output.push(result);
                        }
                    });
                };

                self.addNew = function() {
                    self.result.addnew = true;
                    self.out(self.result);
                };

                self.addExisting = function() {
                    self.resultList[0].addnew = false;
                    self.out(self.resultList[0]);
                    self.out = self.callback;
                };

            }
        ]
});

