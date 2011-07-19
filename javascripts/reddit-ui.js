// todo
// - clicking "(unattached)" pops up an asset editor modal dialog (docked? floating window? toolbar?)
// - register regexps for rendering different story types based on domain (youtube, imgur, scrape 3rd party sites article, etc)
// - developer chat (based on irc)
// - remote XSS plugin 
// - read-only browsable version at http://unattached.com/reddit, but "login" requires the toolbar (doesn't support iphone)
// - ssh://some-key@ssh.unattach.com/  link to verify ssh keys instead of copying/pasting. 
//   - node.js app that listens for ssh connections and just records the public keys
// - search box (built on google)
// - automatically pull in new versions of http://connect.facebook.net/en_US/all.js
// - load imgur.com images automatically, read the width/height, and decide how to render it based on that (fullscreen popup, etc).
// interface todo:
// - add level above current root (homepage) for subreddits (default is homepage though, left goes to subreddits)

(function() { with (Hasher.Controller('Application')) {
  route({
    '#': 'index'
  });
  
  layout('default');


  function select_li(li) {
    li = li || this;
    $('#ul-root li').removeClass('selected').removeClass('near_selected');
    $(li).addClass('selected');
    if (li.previousSibling) $(li.previousSibling).addClass('near_selected');
    if (li.nextSibling) $(li.nextSibling).addClass('near_selected');
     
    $('body').stop(true, true);
    $('body').animate({ scrollTop: $(li).offset().top - ($(window).height()-$(li).height())/2 + 20 }, 200);
  }

  create_action('index', function() {
    Reddit.read('/', function(data) {
      //console.log(data);
      render('index_with_data', data);
      
      $('body').scrollTop(0);
      select_li($('#ul-root li:first')[0]);
    });
    
    $(document.body).keydown(function(e) {
      // 37 - left
      // 38 - up
      // 39 - right
      // 40 - down
      if (e.keyCode == 37) { 
        console.log( "left" );
        return false;
      } else if (e.keyCode == 38) { 
        console.log( "up" );
        var elem = $('#ul-root li.selected')[0];
        if (elem.previousSibling) select_li(elem.previousSibling);
        return false;
      } else if (e.keyCode == 39) { 
        console.log( "right" );
        var elem = $('#ul-root li.selected')[0];
        console.log(elem);
        console.log(elem.data);
        // if (elem.children) {
        //   $(elem.nextSibling).addClass('selected');
        //   $(elem).removeClass('selected');
        // }


        return false;
      } else if (e.keyCode == 40) { 
        console.log( "down" );
        var elem = $('#ul-root li.selected')[0];
        if (elem.nextSibling) select_li(elem.nextSibling);
        return false;
      } else {
        console.log("unknown key code: " + e.keyCode);
      }

    });
  });
  
  create_action('unattach', function() {
    console.log('show edit dialog iframe');
    
  });
}

with (Hasher.View('Application')) {
  create_layout('default', function(yield) {
    return yield;
  });

  create_view('index', function() {
    return div({ id: 'waiting' }, 'Loading... please wait.');
  });

  create_view('index_with_data', function(json) {
    return ul({ id: 'ul-root' }, 
      $.map(json.data.children, function(child) {
        //return li({ events: { mouseover: function() { select_li(this) }, click: action('show_child') } },
        console.log(child.data);
        return li(
          ((child.data.thumbnail && child.data.thumbnail.length > 0) ? img({ src: child.data.thumbnail }) : null),
          div({ 'class': 'title' }, child.data.title),
          div({style: 'clear:both' }),
          div('Ups: ', child.data.ups, ' Downs: ', child.data.downs, ' Comments: ', child.data.num_comments),
          ul(
            li(child.data.selftext_html),
            li('comment1'),
            li('comment2')
          )
        );
      })
    );
  });
}})();









  
  //       // div({ style: 'display: none' },
  //       //   div("author: ", data.author),
  //       //   div("created_utc: ", data.created_utc),
  //       //   div("domain: ", data.domain),
  //       //   div("downs: ", data.downs),
  //       //   div("num_comments: ", data.num_comments),
  //       //   div("over_18: ", data.over_18),
  //       //   div("permalink: ", data.permalink),
  //       //   div("subreddit: ", data.subreddit),
  //       //   div("thumbnail: ", data.thumbnail),
  //       //   div("title: ", data.title),
  //       //   div("ups: ", data.ups),
  //       //   div("url: ", data.url),
  //       //   div("selftext_html: ", data.selftext_html)
  //       // ),
  


  // create_view('index2', function() {
  //   return div({ id: "container" },
  //     ul({ id: "subreddits" },
  //       li(
  //         div(img({ src: 'http://static.reddit.com/reddit.com.header.png' })),
  //         div({ style: 'text-align: right; padding: 3px 10px 10px 0;' }, a({ href: action('unattach') }, '(unattached)'))
  //       ),
  //       li(
  //         div(input({ type: 'search', value: 'search', style: 'color: #666' }))
  //       ),
  //       li({ 'class': "selected" }, 
  //         a({ href: '#/' }, "Homepage")
  //       )
  //     ),
  //     div({ id: "content" },
  // 
  //       
  //       ul({ id: "articles" })
  //     ),
  //     div({ id: "js-root" })
  //   );
  // });




  
  // create_action('index', function() {
  // 
  // 
  //   Reddit.read('/', function(data) {
  //     for (var i=0; i < data.data.children.length; i++) {
  //       var li = document.createElement('li');
  //       document.getElementById('articles').appendChild(li);
  //   
  //       var h2 = document.createElement('h2');
  //       li.appendChild(h2);
  //         
  //       var a = document.createElement('a');
  //       a.href = data.data.children[i].data.url;
  //       a.target = '_blank';
  //       a.innerHTML = data.data.children[i].data.title;
  //       h2.appendChild(a);
  //   
  //       if (data.data.children[i].data.domain.indexOf('imgur.com') != -1) {
  //         var img = document.createElement('img');
  //         img.src = data.data.children[i].data.url;
  //         li.appendChild(img);
  //       }
  //         
  //       if (data.data.children[i].data.media_embed && data.data.children[i].data.media_embed.content) {
  //         var div = document.createElement('div');
  //         div.innerHTML = data.data.children[i].data.media_embed.content.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  //         li.appendChild(div);
  //       }
  //   
  //       if (data.data.children[i].data.selftext) {
  //         var p = document.createElement('p');
  //         p.innerHTML = data.data.children[i].data.selftext;
  //         li.appendChild(p);
  //       }
  //     }
  //   });
  //   
  //   Reddit.read('/reddits', function(data) {
  //     for (var i=0; i < data.data.children.length; i++) {
  //       var li = document.createElement('li');
  //       document.getElementById('subreddits').appendChild(li);
  //       
  //       var a = document.createElement('a');
  //       a.href = '#/' + data.data.children[i].data.display_name;
  //       a.innerHTML = data.data.children[i].data.display_name;
  //       li.appendChild(a);
  //     }
  //   });
  //   
  //   console.log('index action')
  //   console.log(document.cookie)
  // });
  
  // // helper:
  // var pageflip = function(yield) {
  //   var _div = div({ id: "pageflip" },
  //      img({ src: "http://www.sohtanaka.com/web-design/examples/peeling-effect/page_flip.png", alt: "" }),
  //     div({ 'class': 'msg_block' }, yield)
  //   );
  //   
  //   $(_div).hover(function() {
  //    $("#pageflip img").stop().animate({ width: '307px', height: '319px' }, 320);
  //    $("#pageflip .msg_block").animate({ width: '307px', height: '307px' }, 300);
  //  }, function() {
  //    $("#pageflip img").stop().animate({ width: '50px', height: '52px' }, 220);
  //    $("#pageflip .msg_block").stop().animate({ width: '50px', height: '50px' }, 200);
  //   });
  //   
  //   return _div;
  // }
  //
  // // usage:
  // pageflip(
  //   div(a({ href: action() }, 'edit')),
  //   div('oh ya!')
  // ),

