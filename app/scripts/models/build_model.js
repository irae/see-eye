App.Build = DS.Model.extend({
  project: DS.belongsTo('project'),
  number: DS.attr('string'),
  result: DS.attr('string'),
  timestamp: DS.attr('number'),
});

App.BuildAdapter = DS.RESTAdapter.extend({
  findQuery: function (store, type, query) {
    return Ember.$.ajax(query.id + '/api/json/');
  },
  findMany: function(store, type, ids, owner) {
    return Ember.RSVP.all(ids.map(function(id) {
        return store.find('build', {id:id});
    }));
  },
});

App.BuildSerializer = DS.RESTSerializer.extend({
  extractArray: function(store, type, payload, id, requestType) {
    var new_payload = {
      builds: [{
        id: payload.url,
        number: payload.number,
        result: payload.result,
        timestamp: payload.timestamp,
      }],
    };
    return this._super(store, type, new_payload, id, requestType);
  }
});
