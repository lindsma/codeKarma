angular.module('codeKarmaApp').controller('AllProjectsController', function($state, $scope, $http, RequestService) {

    $scope.details = false;
    this.selectedProject = null;


    $scope.toggleDetails = function(project) {
        project.show = !project.show;
    };

    this.getUrl = function() {
        this.url = RequestService.getProjectsUrl();
    };

    this.getProjects = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": this.url,
            "method": "GET"
        };

        $.ajax(settings).done(function(response) {

          $scope.projects = response.all_projects;
          console.log($scope.projects);

          $scope.$apply();

        });
    };

    // fork project function


    // add project info to user object


    // determine icon to show on project - grab category(fix_type )


    this.getIcon = function(responseObj) {

        this.category = responseObj.fix_type;

        if (this.category === "Bug Fix") {
            this.img = "bugfix";
            this.alt = "Icon Fair";
        } else if (this.category === "Design Update") {
            this.img = "design_update";
            this.alt = "Oliviu Stoian";
        } else if (this.category === "New Feature") {
            this.img = "new_feature";
            this.alt = "Phil Goodwin";
        }

    };

    this.getUrl();
    $scope.projects = this.getProjects();
});
