frontest.config(["$routeProvider","$httpProvider",function(e,t){e.when("/",{templateUrl:"pages/home.html",controller:"homeController"}).when("/login",{templateUrl:"pages/login.html",controller:"homeController"}),t.interceptors.push(["$q","$location","store",function(e,t,r){return{request:function(e){return e.headers=e.headers||{},r.token&&(e.headers.Authorization=r.token),e},responseError:function(r){return(401===r.status||403===r.status)&&t.path("/login"),e.reject(r)}}}])}]);