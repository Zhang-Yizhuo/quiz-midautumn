var textbool = true;
var index = 0;

$( document ).ready(function() {
	$("#ansy").click(function(){
		$("#yorn").empty();
		$("#yorn").append("<p style='color:green;size:20px'><strong>Correct!</strong></p>");
	});

	$("#ansn").click(function(){
		$("#yorn").empty();
		$("#yorn").append("<p style='color:red;size:20px'><strong>Wrong!</strong></p>");
	});

      $.get("/jokes",function(data){
          // TODO: change HTML instead of alert
          $("#setup").html(data.setup);
          $("#punchline").html(data.punchline);
          index = data.id;

          if (data.votes === undefined) {
              $("#Votes").html(0);
          } else {
              $("#Votes").html(data.votes);
          }

      },"json");
	  
	
	
});

$(function() {
    $(".blue").click(
        function() {
			$("#yorn").empty();
            $.get("/jokes",function(data){
                // TODO: change HTML instead of alert
                $("#setup").html(data.setup);
                $("#punchline").html(data.punchline);

                index = data.id;

                if (data.votes === undefined) {
                    $("#Votes").html(0);
                } else {
                    $("#Votes").html(data.votes);
                }

            },"json")
        }
    );
});



$(function() {
  $(".green").click(
    function() {
    // $.post("/upvote");
    $.ajax({
      url: '/upvote',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({id:index}),

      success: function(data, status, xhr) {
          $("#Votes").html(data.votes);
      }
    });
  });
});

$(function() {
  $(".red").click(
    function() {
    // $.post("/downvote");
    $.ajax({
      url: '/downvote',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({id:index}),

      success: function(data, status, xhr) {
          $("#Votes").html(data.votes);
      }
    });
  });
});
