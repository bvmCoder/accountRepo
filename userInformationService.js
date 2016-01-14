(function() {

    var userInformationService = function userInformationService($http) {

        var _getUser = function _getUser(username) {
            return $http.get("https://api.github.com/users/" + username)
                .then(function(response) {
                    return response.data;
                });
        };

        var _getRepos = function _getRepos(user) {
            return $http.get(user.repos_url)
                .then(function(response) {
                    return response.data;
                });
        };

        return {
            getUser: _getUser,
            getRepos: _getRepos
        };

    };

    var gitHubAngular = angular.module('gitHubAngular');
    gitHubAngular.factory('userInformationService', userInformationService);

}());
