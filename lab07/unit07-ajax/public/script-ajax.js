$( function() {
  $( ".widget input[type=submit], .widget a, .widget button" ).button();
  $( "button, input, a" ).click( function( event ) {
    event.preventDefault();
    $.ajax({

    // The URL for the request
    url: "/hello",

    data: {
      name: "lab07"
    },
    // Whether this is a POST or GET request
    type: "GET",
})
  // Code to run if the request succeeds (is done);
  // The response is passed to the function
  .done(function( json ) {
    $("<em>").text(json.name).appendTo("body");
  })
  // Code to run if the request fails; the raw request and
  // status codes are passed to the function
  .fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })
  } );
} );
