App.ProjectsRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('project');
  },
  afterModel: function(projects) {
    setInterval(function(){
      projects.forEach(function(project) {
        project.reload();
      });
    }, 5000);
  }
});
