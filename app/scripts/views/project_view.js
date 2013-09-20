App.ProjectView = Ember.View.extend({
  templateName: 'project',
  classNames: ['project'],
  classNameBindings: ['statusClassName'],
  statusClassName: function() {
    var result = this.get('project.sortedBuilds.firstObject.result');
    return (''+result).toLowerCase() || "pending";
  }.property('project.sortedBuilds.firstObject.result'),
});

App.BuildView = Ember.View.extend({
  tagName: 'a',
  classNames: ['build'],
  classNameBindings: ['statusClassName'],
  attributeBindings: ['build.url:href'],
  statusClassName: function() {
    var result = this.get('build.result');
    return (result||"pending").toLowerCase();
  }.property('build.result'),
});
