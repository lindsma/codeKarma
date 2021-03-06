angular.module('codeKarmaApp').service('ClientService', function($http, $location, $state) {


    function createProject(storedToken, data, callback) {
        var url = "https://code-karma-api.herokuapp.com/projects" + "?token=" + storedToken;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "POST",
            "data": data
        };

        $.ajax(settings).done(callback);

    }

    function updateClientInfo(storedToken, storedId, data, callback) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/clients/" + storedId + "?token=" + storedToken,
            "method": "PUT",
            "data": data
        };

        $.ajax(settings).done(callback);
    }

    function getClientProjects(storedToken, storedId, callback) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/projects/" + storedId + "?token=" + storedToken,
            "method": "GET"
        };

        $.ajax(settings).done(callback);
    }

    function updateClientProject(storedToken, projectId, data, callback) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/projects/" + projectId + "?token=" + storedToken,
            "method": "PUT",
            "data": data
        };

        $.ajax(settings).done(callback);
    }

function getClient(storedToken, storedId, callback) {
    $http({
        method: 'GET',
        url: "https://code-karma-api.herokuapp.com/clients/" + storedId + "?token=" + storedToken,
    }).then(callback, function errorCallback(response) {
        return response;
    });
}

function deleteProject(storedToken, projectId, callback) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://code-karma-api.herokuapp.com/projects/" + projectId + "?token=" + storedToken,
    "method": "DELETE"
  };

  $.ajax(settings).done(callback);
}


return {
    getClient: getClient,
    deleteProject: deleteProject,
    createProject: createProject,
    updateClientInfo: updateClientInfo,
    updateClientProject: updateClientProject,
    getClientProjects: getClientProjects
};


});
