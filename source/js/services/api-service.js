angular.module('app.services', ['ngCollection']);
angular.module('app.services').service('api', ['$http',
    function($http) {

        function request(config) {

            config.headers = config.headers || {};

            return $http(config);
        }

        request.get = function(url, config) {
            var config = config || {};
            return request(_.extend(config, {
                url: url,
                method: 'GET'
            }));
        }

        request.post = function(url, data, config) {
            var config = config || {};
            return request(_.extend(config, {
                url: url,
                data: data,
                method: 'POST'
            }));
        }

        request.put = function(url, data, config) {
            var config = config || {};
            return request(_.extend(config, {
                url: url,
                data: data,
                method: 'PUT'
            }));
        }

        request.delete = function(url, config) {
            var config = config || {};
            return request(_.extend(config, {
                url: url,
                method: 'DELETE'
            }));
        }

        return request;
    }
]);
