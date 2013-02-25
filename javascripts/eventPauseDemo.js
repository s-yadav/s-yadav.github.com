// JavaScript Document
$('.testDiv').click(function(e) {
    alert('I am clicked');
});

$('.testDiv').click(function(e) {
    alert('I am second clicked handler');
});

$('.testDiv').hover(function(e) {
    alert('I am hovered');
});

$('.childDiv').click(function(e) {
    alert('I am child div');
});

//pause and active example
$('.pause').click(function(e) {
   $(this).closest('.demoDiv').find('.testDiv').eventPause('pause');
});

$('.active').click(function(e) {
   $(this).closest('.demoDiv').find('.testDiv').eventPause('active');
});

//pausechild and active child example
$('.pauseChild').click(function(e) {
   $(this).closest('.demoDiv').find('.testDiv').eventPause('pauseChild');
});

$('.activeChild').click(function(e) {
   $(this).closest('.demoDiv').find('.testDiv').eventPause('activeChild');
});

//pause/active specific event
$('.pauseEvent').click(function(e) {
   $(this).closest('.demoDiv').find('.testDiv').eventPause('hover');
});

$('.activeEvent').click(function(e) {
   $(this).closest('.demoDiv').find('.testDiv').eventPause('activeChild','hover');
});

//enable/disable changing state
$('.enable').click(function(e) {
   $(this).closest('.demoDiv').find('.testDiv').eventPause('enable');
});

$('.disable').click(function(e) {
   $(this).closest('.demoDiv').find('.testDiv').eventPause('disable');
});
