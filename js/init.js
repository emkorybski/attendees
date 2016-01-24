(function($){
  $(function(){

      $('.button-collapse').sideNav();

      // populate interests dropdown
      $.getJSON("http://localhost/ws/interests", function( interests ) {
          $.each( interests, function( index, value ) {
              $("#interest-list").append("<li><a>" + value + "</a></li>");
          });
      }).done(function() {
              $('#ld').hide('fast');
          });

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
                      "<td class='interests'>" + data[k][8].replace("{", "").replace("}", "") + "</td></tr>");
              }
          }
      }).done(function() {
              $('.progress').hide('fast');
              $('.pagination').show('fast');
            });

      // all remaining results pages
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
                                  "<td class='interests'>" + data[k][8].replace("{", "").replace("}", "") + "</td></tr>");
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
                                  "<td class='interests'>" + data[k][8].replace("{", "").replace("}", "") + "</td></tr>");
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
                                  "<td class='interests'>" + data[k][8].replace("{", "").replace("}", "") + "</td></tr>");
                          }
                      }
                      break;
              }

          }).done(function() {
                  $('.progress').hide('fast');
                  $('.pagination').show('fast');
              });
      });
        // make 'Name' clickable
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

      // interleave rows by interest
      $(document).on("click", "#interest-list a", function(evt){
          evt.preventDefault();

          var nu_order = [];
          var row_collection = $("tr");

          var intr = $(this).html();

          $(row_collection).each(function(){
                var int_phrase = $(this).find("td.interests").text();
                if($(this).hasClass("teal lighten-5")){
                    $(this).removeClass("teal lighten-5");
                }
                if(int_phrase.indexOf(intr) > -1){
                    // pop this row from this collection and add it to the nu_order
                    var node_klon = $(this).clone();
                    $(this).remove();
                    nu_order.push(node_klon);
                    $(nu_order).each(function(){
                        $(this).addClass("teal lighten-5");
                        $(results).prepend($(this));
                    });
                }
          });
      });

      // amend pagination hashing
      $(window).on('load', function(){
          window.location.hash = '1';
      });

  });
})(jQuery); // end of jQuery name space
