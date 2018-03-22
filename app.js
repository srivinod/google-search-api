// Make sure in jsFiddle you have selected option onLoad.
(function() {
})();

var page = 0;

$(".search-bar").keyup(function(event){
    if(event.keyCode == 13){
        $("#search").click();
    }
});

$('#next_page').click(function(){
    $("#search").click();
});
 

$("#search").click(function(){

   var session_cxid =  sessionStorage.getItem('cx_session');
   var session_apikey =  sessionStorage.getItem('apikey_session');

   if (session_cxid == null || session_apikey == null) {
     $('.apikeyBox').removeClass('hide');
     $('.apikeyBox').addClass('show');
   }

    var cxid = $('.cxId').val();
    var apikey = $('.apiKey').val();

    sessionStorage.setItem('cx_session',cxid);
    sessionStorage.setItem('apikey_session',apikey);

   var search_keyword = $(".search-bar").val();
   $.ajax({
   type: "GET",
   dataType: "json",
   url:"https://www.googleapis.com/customsearch/v1?q="+search_keyword+"&cx="+sessionStorage.getItem('cx_session')+"&key="+sessionStorage.getItem('apikey_session'),
   data:{start:++page},
   //   url: "https://api.myjson.com/bins/1gsbgt",
   success: function(data){

     $('.search-results').html('');
     $('.occurence').html('');

     var results = [];
     var searchVal = eval("/"+search_keyword+"/gi");

     console.log(searchVal);

     for (var i=0;i<data.items.length;i++)
     {
          if (data.items[i].title.match(searchVal)) {
              results.push(data.items[i]);
          }
      }

     $('.occurence').append("Total occurences for '"+search_keyword +"': "+results.length);
      console.log(results);

     $.each(data.items, function (index, item) {
      var eachrow = "<div class='result-item'>"
                  + "<h2 class='result-item-title'>" + item.title + "</h2>"
                  + "<h2 class='result-item-description'>" + item.snippet + "</h2>"
                  + "<a class='result-item-link' href='"+item.formattedUrl+"' target='_blank'>" + item.formattedUrl + "</a>"
                  + "<h3 class='result-item-site'>" + item.displayLink + "</h3>"
                  + "</div>";
      $('.search-results').append(eachrow);
      $('.pagination').show();
    });
        // console.log(data.items);
        // console.log("page count >>" +page);
      }
   });

});
