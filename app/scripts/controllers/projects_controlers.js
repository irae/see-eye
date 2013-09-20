App.ProjectsController = Ember.ArrayController.extend({
  sortProperties: ['lastBuildDate'],
  sortAscending: false,

  projectUrl: null,
  actions: {
    addProject: function() {
      this.get('store').find('project', this.get('projectUrl'));
    }
  }
});
