(function() {
angular.module('MyApp', ['ui.router', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
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
    .state('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'SignupCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('/account', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl',
      resolve: { loginRequired: loginRequired }
    })
    .state('/forgot', {
      templateUrl: 'partials/forgot.html',
      controller: 'ForgotCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('/reset/:token', {
      templateUrl: 'partials/reset.html',
      controller: 'ResetCtrl',
      resolve: { skipIfAuthenticated: skipIfAuthenticated }
    })
    .state('/api', {
      templateUrl: 'partials/api.html',
      controller: 'ResetCtrl'
      // , resolve: { skipIfAuthenticated: skipIfAuthenticated }
    });



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
