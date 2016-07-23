
$( document ).ready(function(){

var animals = ['cat', 'dog', 'chicken', 'llama', 'sloth', 'koala'];

function renderButtons() {
  $('#buttonsView').empty();

  for (var i = 0; i < animals.length; i++) {
      var a = $('<button>');
      a.addClass('newAnimals');
      a.attr('data-name', animals[i]);
      a.text(animals[i]);
      $('#buttonsView').append(a);
  }
}

function showanimals() {
  var type = $(this).attr('data-name');
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&rating=pg&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: 'GET'
  })

  .done(function(response) {
    var results = response.data;
      for (var i = 0; i< results.length; i++) {
        var responseDiv = $('<div>');
        var p = $('<p>').text(results[i].rating);
        var img = $('<img>').attr('src', results[i].images.fixed_height_still.url).attr('data-animated', results[i].images.fixed_height.url).attr('data-state', 'still').attr('data-still', results[i].images.fixed_height_still.url);

        img.addClass('buttonDisplay');
        (responseDiv).append(img);
        $('#animalsselect').prepend(img);
        console.log(response);
      }
  });
}

renderButtons();

$('#addGif').on('click', function() {
  var ani = $('#gif-input').val().trim();
  ani.push(ani);
  renderButtons();
  return false;
});

$(document).on('click', '.newAnimals', showanimals);
});

$(document).on('click', '.buttonDisplay', function(){
  var State = $(this).attr('data-state');
  if ($(this).attr('data-state') == 'still') {
      $(this).attr('src', $(this).data('animated'));
      $(this).attr('data-state', 'animated');
  }else{
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
  }
});
