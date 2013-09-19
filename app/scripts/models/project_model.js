App.Project = DS.Model.extend({
  url: DS.attr('string'),
  name: DS.attr('string'),
  color: DS.attr('string'),
  result: DS.attr('string'),
  builds: DS.hasMany('build'),
});
