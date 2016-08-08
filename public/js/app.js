(function() {
angular.module('MyApp', ['ui.router', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'partials/contact.html',
      controller: 'ContactCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      controller: 'SignupCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('account', {
      url: '/account',
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl',
      resolve: { loginRequired: loginRequired }
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'partials/forgot.html',
      controller: 'ForgotCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('resetToken', {
      url: '/reset/:token',
      templateUrl: 'partials/reset.html',
      controller: 'ResetCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('api', {
      url: '/api',
      templateUrl: 'partials/api.html',
      controller: 'ApiCtrl'
      // , resolve: { skipIfAuthenticated: skipIfAuthenticated }
    });


    // TODO handle this by sharing config info!!!
    // var isLocal = window.location.host.toLowerCase() === 'localhost:3000';
    var origin = window.location.origin;

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.google({
      url: '/auth/google',
      clientId: '148490790374-le8vnobnfqhb3cogg7vhho7m7kpli4ak.apps.googleusercontent.com',
      redirectUri: origin + '/auth/google/callback'
    });

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });
})();
