App.ProjectsRoute = Ember.Route.extend({
  model: function(params) {
    var model = Ember.A();
    model.push(this.store.find('project', 'http://jenkins.screwdriver.corp.yahoo.com:9999/yhudson/job/phototool-trunk-component/'));
    return model;
  }
});
