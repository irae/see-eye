App.ProjectsController = Ember.ArrayController.extend({
  sortProperties: ['lastBuildDate'],
  sortAscending: false,

  refreshBuilds: function() {
    this.get('model').forEach(function(project) {
      project.get('builds').forEach(function(build) {
        var result = build.get('result');
        if(!result || result.length < 1) {
          if(!build._refreshInterval) {
            console.log('setInterval project', project.get('name'), ' build ', build.get('number'));
            build._refreshInterval = setInterval(function(){
              build.reload();
            }, 5000);
          }
        } else {
          if(build._refreshInterval) {
            console.log('CLEAR project', project.get('name'), ' build ', build.get('number'));
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
