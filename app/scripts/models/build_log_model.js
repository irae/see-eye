App.Log = DS.Model.extend({
  build: DS.belongsTo('build', {inverse: 'logs'}),
  logText: DS.attr('string'),
  logParts: function() {
    var result = Ember.A();
    var parts = [];
    var text = this.get('logText');
    if(text) {
      parts = text.split('[start]');
      parts.splice(0,1);
    }
    result = parts.map(function(part) {
      return Ember.Object.create({
        name: part.substr(0, part.indexOf("\n")).trim()
      });
    });
    var fail = result.find(function(item){
      return item.name === "Build Failure";
    });
    var indexFail = result.indexOf(fail) - 1;
    result.forEach(function(item, index) {
      if(index === indexFail) {
        item.status = "failure";
      }
      if(index < indexFail) {
        item.status = 'success';
      }
      if(index > indexFail) {
        item.status = 'pending';
      }
    });
    return result;
  }.property('logText'),
});
