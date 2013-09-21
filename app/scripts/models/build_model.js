App.Build = DS.Model.extend({
  project: DS.belongsTo('project'),
  number: DS.attr('string'),
  result: DS.attr('string'),
  timestamp: DS.attr('number'),
  logs: DS.hasMany('log', {async: true, inverse: 'build'}),
  isFailure: function() {
    var result = this.get('result');
    return !result || (''+result).toLowerCase() === 'failure';
  }.property('result'),
});

App.BuildAdapter = DS.RESTAdapter.extend({
  find: function (store, type, id) {
    return Ember.$.ajax(id + '/api/json/');
  },
  findQuery: function (store, type, query) {
    return Ember.$.ajax(query.id + '/api/json/');
  },
  findMany: function(store, type, ids, owner) {
    return Ember.RSVP.all(ids.map(function(id) {
        return store.find('build', {id:id});
    }));
  },
  findHasMany: function (store, record, url, relationship) {
    return Ember.$.ajax("/proxy?url=" + url, {
      dataType: 'text',
      type: "GET",
      jsonp: false,
    }).then(function(data) {
      var payload = {
        logs: [{
          id: url,
          owner: record.get('id'),
          logText : data,
        }],
      };
      console.log(payload);
      return payload;
    });
  },
});

App.BuildSerializer = DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    payload.url = payload.url.replace(/\/$/, '');
    var new_payload = {
      build: {
        id: payload.url,
        number: payload.number,
        result: payload.result,
        timestamp: payload.timestamp,
        logs: [encodeURIComponent(payload.url + "/consoleText")],
        links: {
          logs: encodeURIComponent(payload.url + "/consoleText"),
        },
      },
    };
    return this._super(store, type, new_payload, id, requestType);
  },
  extractArray: function(store, type, payload, id, requestType) {
    payload.url = payload.url.replace(/\/$/, '');
    var new_payload = {
      builds: [{
        id: payload.url,
        number: payload.number,
        result: payload.result,
        timestamp: payload.timestamp,
        logs: [payload.url + "/consoleText"],
        links: {
          logs: payload.url + "/consoleText",
        },
      }],
    };
    return this._super(store, type, new_payload, id, requestType);
  }
});
