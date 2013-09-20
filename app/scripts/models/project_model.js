App.Project = DS.Model.extend({
  name: DS.attr('string'),
  color: DS.attr('string'),
  builds: DS.hasMany('build', {async:true}),
  sortedBuilds: function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['number'],
      content: this.get('builds'),
      sortAscending: false,
    });
  }.property('builds'),
});

var projectStorage;

function saveStorage (url) {
  if(url) {
    var projectExists = projectStorage.projects.some(function(item) {
      return url === item;
    });
    if(!projectExists) {
      projectStorage.projects.push(url);
    }
  }
  window.localStorage.setItem('projects', JSON.stringify(projectStorage));
}

try {
  projectStorage = JSON.parse(window.localStorage.getItem('projects'));
} catch(e) {}

if(!projectStorage) {
  var projectStorage = {
    projects: []
  };
  saveStorage();
}

App.ProjectAdapter = DS.RESTAdapter.extend({
  findAll: function (store, type, id) {
    return {
      projects: projectStorage.projects.map(function(url) {
        var project = store.createRecord('project', { id: url });
        project.reload();
        return project;
      })
    };
  },
  find: function (store, type, id) {
    return Ember.$.ajax(id + '/api/json/');
  }
});

App.ProjectSerializer = DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    payload.url = payload.url.replace(/\/$/, '');
    var new_payload = {
      project: {
        id: payload.url,
        name: payload.name,
        color: payload.color,
        builds: payload.builds.sort(function(a, b) {
          return b.number - a.number;
        }).slice(0, 15).map(function(b) {
          return b.url;
        })
      },
    };
    saveStorage(payload.url);
    var upstream = (payload.upstreamProjects && payload.upstreamProjects.length && payload.upstreamProjects) || [];
    var downstream = (payload.downstreamProjects && payload.downstreamProjects.length && payload.downstreamProjects) || [];
    var relatedProjects = downstream.concat(upstream);
    relatedProjects.forEach(function(related) {
      store.find('project', related.url);
    });
    return this._super(store, type, new_payload, id, requestType);
  }
});
