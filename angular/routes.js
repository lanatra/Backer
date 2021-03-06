// Routes
frontest.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'homeController'
    });

    $httpProvider.interceptors.push(['$q', '$location', 'store', function($q, $location, store) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};

                if (store.get("Cookie") !== null) {
                    config.headers.Authorization = store.get("Cookie");
                } else {
                    $location.path('/login');
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);
}]);