  (function(angular) {
      (function() {
          'use strict';
      })();

      var gitHubAngular = angular.module('gitHubAngular', []);
      console.dir(gitHubAngular);

      var MainController = function MainController($scope, $http, $log, $interval, $location, $anchorScroll) {
          var self = this;
          //self.username = 'Patel Sarkar';
          self.message = 'GitHub Repository Information';
          self.userName = 'angular';
          self.repoSortOrder = '-stargazers_count';
          self.countDown = 7;


          self.onUserComplete = function onUserComplete(response) {
              self.user = response.data;
              console.log(self.user);
              $http.get(self.user.repos_url)
                  .then(self.onRepos, self.onError);
          };

          self.onRepos = function onRepos(response) {
              self.user.repos = response.data;
              console.log(self.user.repos);
              $location.hash('userDetails');
              $anchorScroll();
          };

          self.onError = function onError(response) {
              self.error = 'Could Not Fetch The Data From The Server!' + response;
          };

          self.search = function search(username) {
              $log.info('Searching for ' + username);
              $http.get('https://api.github.com/users/' + username)
                  .then(self.onUserComplete, self.onError);
              if (countDown) {
                  console.log(countDown);
                  $interval.cancel(countDown);
                  self.countDown = null;
              }
          };

          self.decrementCountDown = function decrementCountDown() {
              self.countDown -= 1;
              if (self.countDown < 1) {
                  self.search(self.userName);
              }
          };

          var countDown = null;
          var startCountDown = function startCountDown() {
              countDown = $interval(self.decrementCountDown, 1000, self.countDown);
          };

          startCountDown();
      };

      gitHubAngular.controller('MainController', ['$scope', '$http', '$log', '$interval', '$location', '$anchorScroll', MainController]);



  }(angular));
