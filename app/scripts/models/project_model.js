App.Project = DS.Model.extend({
  name: DS.attr('string'),
  color: DS.attr('string'),
  builds: DS.hasMany('build', {async:true}),
});


App.ProjectAdapter = DS.RESTAdapter.extend({
  find: function (store, type, id) {
    return Ember.$.ajax(id + '/api/json/');
  }
});

App.ProjectSerializer = DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    var new_payload = {
      project: {
        id: payload.url,
        name: payload.name,
        color: payload.color,
        builds: payload.builds.sort(function(a, b) {
          return a.number > b.number;
        }).slice(0, 4).map(function(b) {
          return b.url;
        })
      },
    };
    return this._super(store, type, new_payload, id, requestType);
  }
});
