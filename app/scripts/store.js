Ember.$.ajaxSetup({
  dataType: "jsonp",
  type: "jsonp",
  jsonp: "jsonp",
  error: function(xhr, status, error) {
    var errorInStrings = (status && /error/i.test(status) && error && /Forbidden/i.test(error));
    var errorInXHR = (xhr && xhr.status && xhr.status === 403);
    if(errorInXHR || errorInStrings) {
      document.location.href = "https://gh.bouncer.login.yahoo.com/login?url=" + encodeURIComponent(document.location.href);
    }
  }
});
