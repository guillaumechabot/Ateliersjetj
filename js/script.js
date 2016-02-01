
var links = Array.prototype.slice.call(
   document.querySelectorAll('[data-link]')),
    sections = Array.prototype.slice.call(
  document.querySelectorAll('[data-section]'));


window.addEventListener('load',init,false);
function d(el){
  if(el) return document.querySelector(el);
}

var menu = d('.menu').querySelector('ul'),
    menuBtn = d('.toggle_menu');

function removeLinks(_success){
  Array.prototype.forEach.call(links,function(o){
    o.classList.remove('active');});
  Array.prototype.forEach.call(sections,function(o){
   o.classList.remove('show-section');
  });
  if(_success()) return _success();
}

function toggleSections(){
  Array.prototype.forEach.call(links,function(o){
    o.addEventListener('click',function(e){
      var section = d('[data-section="'+this.getAttribute('data-link')+'"]');
      window.location.hash = this.getAttribute('data-link');
      e.preventDefault();
      removeLinks(function(){
        o.classList.add('active');
        section.classList.add('show-section');
        menu.classList.toggle('show_menu');
      });
    });
  });
}

function navigation(){
  menuBtn.addEventListener('click',function(){
    menu.classList.toggle('show_menu');
    if(menu.classList.contains('show_menu')){
      menuBtn.innerHTML = '<i class="fa fa-close"></i>';
    }else{
      menuBtn.innerHTML = '<i class="fa fa-navicon"></i>';
    }
  });
}


function init(){
  d('[data-section="home"]').classList.add('show-section');
  d('[data-link="home"]').classList.add('active');
  
  try{
   // loader();
    navigation();
    toggleSections();
  }catch(e){
  }
}

$(function() {

  // Get the form.
  var form = $('#ajax-contact');

  // Get the messages div.
  var formMessages = $('#form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
    .done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      $(formMessages).removeClass('error');
      $(formMessages).addClass('success');

      // Set the message text.
      $(formMessages).text(response);

      // Clear the form.
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
    })
    .fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      $(formMessages).removeClass('success');
      $(formMessages).addClass('error');

      // Set the message text.
      if (data.responseText !== '') {
        $(formMessages).text(data.responseText);
      } else {
        $(formMessages).text('Oops! An error occured and your message could not be sent.');
      }
    });

  });

});


// Render card
function renderCard(i, item) {
  var output = 
  '<div class="pure-u-1-2 " id="card-'+ i +'">'+
  '<div class="placeholder">' +
  '<div class="info" title="Information" id="info-'+ i +'" name="' + i + '"><span class="info-btn '+ item.imageGroup[0].color +'-border"> <div class="info-toggle  '+ item.imageGroup[0].color +'-color"> <span class="dots '+ item.imageGroup[0].color +'-background"> </span></span></div></div>' +
  '<div class="ovr">' +
  '<div class="box_title">'+
  '<div class="box_header">'+
  '<h1>' + item.titleEn  + '</h1></div>'+
  '<div class="product_desc"><h4>' + item.descEn + '</h4>'+
  '<h4>' + item.titleFr + '</br>'+item.descFr + '</h4>'+
  '<h4>' + item.price + '</h4>'+
  '</div></div>'+
  '</div>'+
  '<div class="carousel">';
  $.each(item.imageGroup, function(i, image) {
      output += '<div class="item">' +
          '<div class="imageContainer">' +
          '<img alt="'+ item.titleEn + '" class="' + image.color + '" src="' + image.url + '"/>' +
          '</div>' + '</div>';
  });
  output += '</div></div></div>'+';
  return output;
}

function colorizeIcon(){  
  $('.carousel').on('afterChange', function(event, slick, currentSlide){
    var imageType =$(this).find('img').eq(currentSlide).attr('class');
    $(this).parent().find('.dots').removeClass( "dark-background light-background" ).addClass(imageType+'-background');
    $(this).parent().find('.info-btn').removeClass( "dark-border light-border" ).addClass(imageType+'-border');
    $(this).parent().find('.info-toggle').removeClass( "dark-color light-color" ).addClass(imageType+'-color');
  }); 
}

function slickIt(){

        var $carousel = $('.carousel')
        .on('init', function(slick) {
            console.log('fired!');
        })

        $('.carousel').slick({
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: false,
          variableWidth: false,
          autoplay: false,
          fade: true,
          draggable: false,
          arrows: true,
          responsive:[
            {breakpoint:500,settings:{
              fade: false,
              draggable: true,
              arrows: false
            }},
          ],
        });
}

function renderCollection(collection) {
  var output = '';
  $.each(collection, function(i, item) { 
	 output += renderCard(i, item);      
  }); 
  $(".post").html(output);  
  $('.info').on('click', function(e) {
    
    var cardId= $(this).attr("name");
	
	if ($(this).hasClass('border')) {
		$('.info').removeClass('border');		
	}	
	else { 
	 	$('.info').removeClass('border');
	 	$(this).addClass('border');	 
	}
		 		
      if ($(this).find('.info-toggle').hasClass('isActive')) {
        $('.info-toggle').removeClass('isActive');
        $('.dots').removeClass('isActive');
        $('.info-btn').removeClass('isActive'); 
        $('.ovr').removeClass('show'); 
      } 
      else { 
        $('.info-toggle').removeClass('isActive');
        $('.dots').removeClass('isActive');
        $('.info-btn').removeClass('isActive'); 
        $('.ovr').removeClass('show');
        $(this).find('.info-toggle').addClass('isActive');
        $(this).find('.dots').addClass('isActive');
         $(this).find('.info-btn').addClass('isActive'); 
        $("#card-" + cardId + "> .ovr").addClass('show');
      }           
        
   });
   
   slickIt();
   colorizeIcon();
   
}

$( document ).ready(function() {

      var dataJSON = {};
	  
      $.getJSON("js/object.js",
          function(data) {
		      renderCollection(data[1][0]);
			  	dataJSON=data;
          });


    var $dropdown = $('#dropdown');
    var mySelect = $('.select');
    mySelect.fancySelect().on('change.fs', function() {
	    $(this).trigger('change.$');
	    renderCollection(dataJSON[$dropdown.val()][0]); 	    
    });

});



