App.ProjectsController = Ember.ArrayController.extend({
  projectUrl: null,
  actions: {
    addProject: function() {
      this.store.find('project', this.get('projectUrl'));
    }
  }
});
