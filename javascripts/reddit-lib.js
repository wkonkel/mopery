// use jsonp when anonymous
// use xd communication when not (unattach browser plugin required)

// possibly xd entry point:  http://www.reddit.com/.json?jsonp=alert('hi')//

var Reddit = {
  callbacks: [],
  read: function(url, callback) {
    Reddit.callbacks.push(callback);
    var script_tag = document.createElement('script');
    script_tag.src = 'http://www.reddit.com' + url + '.json?jsonp=Reddit.callbacks[' + (Reddit.callbacks.length-1) + ']';
    document.body.appendChild(script_tag);
  }

  //   // REQUIRES CROSS-DOMAIN
  //   api: function() {
  //     $.get('/.json', function(data) {
  //       console.log(data);
  //       return data;
  //     });
  //   }
};
