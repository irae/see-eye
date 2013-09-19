App.ApplicationRoute = Ember.Route.extend({
  afterModel: function(model) {
    this.transitionTo('projects');
  }
});
