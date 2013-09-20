Ember.$.ajaxSetup({
  dataType: "jsonp",
  type: "jsonp",
  jsonp: "jsonp",
  error: function(xhr, status, error) {
    if(status === "parsererror") {
      document.location.href = "https://gh.bouncer.login.yahoo.com/login?url=" + encodeURIComponent(document.location.href);
    }
  }
});
