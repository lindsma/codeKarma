angular.module('codeKarmaApp').controller('DevProjectsController', function($scope, $state, RequestService) {

    $scope.progress = 0;



    // show pull request button when progress === 100%

    this.updateButton = function(progress, id) {
      for (var index = 0; index < $scope.projects.length; index++) {
          if ($scope.projects[index].id === id ) {
              console.log(id);
              $scope.projects[index].progress = progress;
              console.log($scope.projects[index]);
          }
      }
      console.log(progress);
      $('.' + id).toggleClass('active');
      // $('button.help-btn .' + id).removeClass('active');
      // $('div.tooltip .' + id).addClass('active');
    };

    // remove pull request button when progress < 100%

    this.revertButton = function(progress) {
      this.progress = progress;
      console.log(progress);
      $('button.help-btn').addClass('active');
      $('div.tooltip').removeClass('active');
    };

    this.pullRequest = function(id) {
      $('.dev-projects-container').addClass('modal-up');
      this.showModal = true;
      this.projectId = id;

      this.token = RequestService.fetchToken();
      this.branchUrl = "https://code-karma-api.herokuapp.com/branches/" + this.projectId + "?token=" + this.token;

      var settings = {
          "async": true,
          "crossDomain": true,
          "url": this.branchUrl,
          "method": "GET"
      };

      $.ajax(settings).done(function(response) {
          $scope.headBranches = response.head_branches;
          $scope.baseBranches = response.base_branches;

          $scope.$apply();
      });

    };

    this.closeModal = function() {
      this.showModal = false;
      $('.dev-projects-container').removeClass('modal-up');
    };

    // get info from pull request form fields

    $scope.pullInfo = {
      title: '',
      body: '',
      head: '',
      base: ''
    };

    this.submitRequest = function() {

      this.requestUrl = "https://code-karma-api.herokuapp.com/developer_projects/" + this.projectId + "?token=" + this.token;
      console.log($scope.pullInfo);
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": this.requestUrl,
          "method": "POST",
          "data": $scope.pullInfo
      };

      $.ajax(settings).done(function(response) {
        console.log(response);
      });

  };

    // get projects info

    this.getProjects = function() {
      RequestService.getDevProjects(function(response) {
          $scope.projects = response.my_developer_projects;
          console.log($scope.projects);
          $scope.$apply();
        });
    };

    // update and post progress

    $scope.updateProgress = function(progress, date, id) {
      console.log(id);

        this.status = {
          "percentage_complete": progress,
          "est_completion_date": date
        };

        RequestService.setProgress(this.status, id);

    };


    this.getProjects();

});
