App.ProjectsController = Ember.ArrayController.extend({
  sortProperties: ['lastBuildDate'],
  sortAscending: false,

  refreshBuilds: function() {
    this.get('model').forEach(function(project) {
      project.get('builds').forEach(function(build) {
        var result = build.get('result');
        if(!result || result.length < 1) {
          if(!build._refreshInterval && build.get('number')) {
            build._refreshInterval = setInterval(function(){
              build.reload();
            }, 5000);
          }
        } else {
          if(build._refreshInterval) {
            clearInterval(build._refreshInterval);
            delete build._refreshInterval;
          }
        }
      });
    });
  }.observes('model.@each.builds.@each.result'),

  projectUrl: null,
  actions: {
    addProject: function() {
      this.get('store').find('project', this.get('projectUrl'));
    }
  }
});
