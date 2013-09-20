App.ProjectsController = Ember.ArrayController.extend({
  projectUrl: null,
  actions: {
    addProject: function() {
      this.get('store').find('project', this.get('projectUrl'));
    }
  }
});
