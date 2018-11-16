"use strict"

$( document ).ready(function() {
    $("form").on( "submit", function(event) {
        event.preventDefault();
        var form = $(this);
        $.ajax({
            url: '/people',
            type: "POST",
            data: form.serialize(),
            dataType: 'json'
        })
        .done(function(result){
            $("#Result").html("<p>" + result.firstName + " " + result.lastName + " created!" + "</p>");
        })
        .fail(function(xhr, status, errorThrown) {
           $("#Result").html("<p>" + 'Person not created' + "</p>");
       })
    });
});
