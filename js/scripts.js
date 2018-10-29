
  var List = $("#userName").val();
   var array = [];


$(document).ready(function(){
$("#input").submit(function(event){
  event.preventDefault();
  var List = $("#list").val();

  array.push(List);

  $("#output").text(array);

});
});
