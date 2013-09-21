App.Log = DS.Model.extend({
  build: DS.belongsTo('build', {inverse: 'logs'}),
  logText: DS.attr('string'),
});

// App.BuidLogSerializer = DS.RESTSerializer.extend({
//   extractArray: function(store, type, payload, id, requestType) {
//     var new_payload = {
//     };
//     // debugger;
//     return this._super(store, type, payload, id, requestType);
//   }
// });
