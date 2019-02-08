"use strict"

$( document ).ready(function() {
    $("form").on( "submit", function(event) {
        event.preventDefault();
        $.ajax({
            url: "/person/" + $("#personID").val(),
            type: "GET"
        })
        .done(function(result){
            $("#searchResult").html("<p>" + result.firstName + "</p>");
        })
        .fail(function(xhr, status, errorThrown) {
         $("#searchResult").html("<p>" + 'Nobody with that ID.' + "</p>");
     })
    });
});
