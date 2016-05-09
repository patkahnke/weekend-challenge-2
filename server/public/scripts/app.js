$(document).ready(function(){
var tenSecondTimer = setInterval(displayNextPerson, 10000);
loadData();

//all functions are declared below
  function loadData() {
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data) {
      //Initial Set-up of DOM
      createDataCarousel(data);//append a visual element to the DOM with object data attached for each person
      setUpOnePerson(data);//display the first person's info on the DOM

      //Event handlers for clicks on "previous," "next," and the elements themselves
      $('#previous').on('click', displayPreviousPerson);
      $('#next').on('click', displayNextPerson);
      $('#carousel-points').on('click', '.points', displayClickedPerson);
      },

      error: function() {
        console.log('server is not responding');
      },

      timeout: function() {
        console.log('timed out');
      },
    });
  }

  function createDataCarousel(data) {
  for (var i = 0; i < data.mu.length; i++) {
    $('#carousel-points').append('<div class="points"></div>');
    var $el = $('#carousel-points').children().last();
    $el.data('name', data.mu[i].name);
    $el.data('git_username', data.mu[i].git_username);
    $el.data('shoutout', data.mu[i].shoutout);
    $el.append('<h4>' + data.mu[i].name + '</h4');
    };
  }

  function setUpOnePerson(data) {
    $('.name').text('Name: ' + data.mu[0].name);
    $('.git-user-name').text('Git Username: ' + data.mu[0].git_username);
    $('.shoutout').text('Shoutout: ' + data.mu[0].shoutout);
    $('#carousel-points').children().first().addClass('clicked');
  }

  function displayPreviousPerson() {
    var $el = $('#carousel-points').find('.clicked').prev();
      $('#fade').fadeOut('slow', function() {
        $('.name').text('Name: ' + $el.data('name'));
        $('.git-user-name').text('Git Username: ' + $el.data('git_username'));
        $('.shoutout').text('Shoutout: ' + $el.data('shoutout'));
        $('#fade').fadeIn( 'slow');
      });
    $el.parent().find('.clicked').removeClass('clicked')
    $el.addClass('clicked');
    clearInterval(tenSecondTimer);
    tenSecondTimer = setInterval(displayNextPerson, 10000);
  }

  function displayNextPerson() {
    var $el = $('#carousel-points').find('.clicked').next();
    $('#fade').fadeOut('slow', function() {
    $('.name').text('Name: ' + $el.data('name'));
    $('.git-user-name').text('Git Username: ' + $el.data('git_username'));
    $('.shoutout').text('Shoutout: ' + $el.data('shoutout'));
    $('#fade').fadeIn( 'slow');
    });
    $el.parent().find('.clicked').removeClass('clicked')
    $el.addClass('clicked');
    clearInterval(tenSecondTimer);
    if($el.is(':last-child')) {
      tenSecondTimer = setInterval(goToFirstPerson, 10000);
    } else {
      tenSecondTimer = setInterval(displayNextPerson, 10000);
    };
  }

  function displayClickedPerson() {
    $('.name').text('Name: ' + $(this).data('name'));
    $('.git-user-name').text('Git Username: ' + $(this).data('git_username'));
    $('.shoutout').text('Shoutout: ' + $(this).data('shoutout'));
    $(this).parent().find('.clicked').removeClass('clicked')
    $(this).addClass('clicked');
    clearInterval(tenSecondTimer);
    tenSecondTimer = setInterval(displayNextPerson, 10000);
  }

  function goToFirstPerson() {
    var $el = $('#carousel-points').children().first();
    $('#fade').fadeOut('slow', function() {
    $('.name').text($el.data('name'));
    $('.git-user-name').text($el.data('git_username'));
    $('.shoutout').text($el.data('shoutout'));
    $('#fade').fadeIn( 'slow');
    });
    $el.parent().find('.clicked').removeClass('clicked')
    $el.addClass('clicked');
    clearInterval(tenSecondTimer);
    if($el.is(':last-child')) {
      tenSecondTimer = setInterval(goToFirstPerson, 10000);
    } else {
      tenSecondTimer = setInterval(displayNextPerson, 10000);
    }
  }
});
