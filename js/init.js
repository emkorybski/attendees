(function($){
  $(function(){
    $('.button-collapse').sideNav();
      // 1st page results
      $.getJSON( "http://localhost/ws/attendees", function( data ) {

          var results = document.getElementById("results");
          for (var k in data){
              if (data.hasOwnProperty(k)) {
                 // console.log(data[k][1]);
                  $(results).append("<tr>" +
                      "<td><img width='70' height='70' src=" + data[k][9] + " /></td>" +
                      "<td><a class='lname modal-trigger' data-link='http://localhost/ws/attendees/" + data[k][0] + "'>" + data[k][1] + " " + data[k][2] + "</a></td>" +
                      "<td>" + data[k][4] + "</td>" +
                      "<td>" + data[k][5] + "</td>" +
                      "<td>" + data[k][3] + "</td>" +
                      "<td>" + data[k][8].replace("{", "").replace("}", "") + "</td></tr>");
              }
          }

      }).done(function() {
              $('.progress').hide('fast');
              $('.pagination').show('fast');
      });

      // all remaining pages
      $('.pagination li a').on("click", function(){
          $('.pagination li a').each(function(){
              $(this).parent().removeClass('active');
          });
          var page_num = $(this).data('target');
          $(this).parent().addClass('active');
          $.getJSON( "http://localhost/ws/attendees/pg/" + page_num, function( data ) {


              var results = document.getElementById("results");
              switch (page_num) {
                  case 2:
                      $(results).empty();
                      for (var k in data){
                          if (data.hasOwnProperty(k)) {
                              // console.log(data[k][1]);
                              $(results).append("<tr>" +
                                  "<td><img width='70' height='70' src=" + data[k][9] + " /></td>" +
                                  "<td><a class='lname modal-trigger' data-link='http://localhost/ws/attendees/" + data[k][0] + "'>" + data[k][1] + " " + data[k][2] + "</a></td>" +
                                  "<td>" + data[k][4] + "</td>" +
                                  "<td>" + data[k][5] + "</td>" +
                                  "<td>" + data[k][3] + "</td>" +
                                  "<td>" + data[k][8].replace("{", "").replace("}", "") + "</td></tr>");
                          }
                      }
                      break;
                  case 3:
                      $(results).empty();
                      for (var k in data){
                          if (data.hasOwnProperty(k)) {
                              // console.log(data[k][1]);
                              $(results).append("<tr>" +
                                  "<td><img width='70' height='70' src=" + data[k][9] + " /></td>" +
                                  "<td><a class='lname modal-trigger' data-link='http://localhost/ws/attendees/" + data[k][0] + "'>" + data[k][1] + " " + data[k][2] + "</a></td>" +
                                  "<td>" + data[k][4] + "</td>" +
                                  "<td>" + data[k][5] + "</td>" +
                                  "<td>" + data[k][3] + "</td>" +
                                  "<td>" + data[k][8].replace("{", "").replace("}", "") + "</td></tr>");
                          }
                      }
                      break;
                  case 4:
                      $(results).empty();
                      for (var k in data){
                          if (data.hasOwnProperty(k)) {
                              // console.log(data[k][1]);
                              $(results).append("<tr>" +
                                  "<td><img width='70' height='70' src=" + data[k][9] + " /></td>" +
                                  "<td><a class='lname modal-trigger' data-link='http://localhost/ws/attendees/" + data[k][0] + "'>" + data[k][1] + " " + data[k][2] + "</a></td>" +
                                  "<td>" + data[k][4] + "</td>" +
                                  "<td>" + data[k][5] + "</td>" +
                                  "<td>" + data[k][3] + "</td>" +
                                  "<td>" + data[k][8].replace("{", "").replace("}", "") + "</td></tr>");
                          }
                      }
                      break;
              }

          }).done(function() {
                  $('.progress').hide('fast');
                  $('.pagination').show('fast');
              });
      });

        $(document).on("click", "a.lname", function(evt){
            evt.preventDefault();
            var ilink = $(this).data("link");
            console.log(ilink);
            $.getJSON( ilink, function( idata ) {

                // populate modal ...

                $("#ind_info h4").html(idata[1] + " " + idata[2]);
                $("#ind_info img").attr("src", idata[10]);
                $("#title").html("<b>Title:</b> " + idata[4]);
                $("#company").html("<b>Company:</b> " + idata[5]);
                $("#country").html("<b>Country:</b> "+ idata[3]);
                $("#interests").html("<b>Interests:</b> " + idata[8].replace("{", "").replace("}", ""));
                $("#bio").html("<b>1-sentence bio:</b> " + idata[7]);

            }).done(function() {
                    // ... then open it
                    $('#ind_info').openModal();
                });
        });


      $(window).on('load', function(){
          window.location.hash = '1';
      });

  });
})(jQuery); // end of jQuery name space
