angular.
    module('core')
    .filter('zipcode', function () {
        return function (input) {
            if (!input) { return input }
            if (input.toString().length >= 5) {
                input = input.toString().replace(/ /g,''); // Remove all spaces
                return input.toString().slice(0,3) + " " + input.toString().slice(3);
            }
        };
    });