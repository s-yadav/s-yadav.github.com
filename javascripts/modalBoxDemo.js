// JavaScript Document
$(document).ready(function(e) {
    $('#demo1').click(function(e) {
        $('.modalBox').modalBox();
    });

    $('#demo2').click(function(e) {
		$('.modalBox').modalBox({
			width:'500px',
			height:'500px'
			});
    });

    $('#demo3').click(function(e) {
		$('.modalBox').modalBox({
			top:'100px',
			left:'100px'
			});
    });

	$('#demo4').click(function(e) {
        $('.modalBox').modalBox({
		iconImg:'images/x.png',
		keyClose:true,
		iconClose:true,
		bodyClose:true
		});
    });
	
	$('#demo5').click(function(e) {
        $('.modalBox2').modalBox({
		iconImg:'images/x.png',
		keyClose:true,
		iconClose:true,
		bodyClose:true
		});
    });
	
	$('#demo6').click(function(e) {
       $('.modalBox').modalBox({
		onOpen:function(){
			alert('successfully open');
			},
		onClose:function(){
			alert('successfully close');
			}
		}); 
    });
	
	$('#demo7').click(function(e) {
        $('.modalBox').modalBox({
		width:300,
        height:300,
        top:100,
        left:100,
		iconImg:'images/x.png',
		iconClose:true,
	});
	
	$('.modalBox2').modalBox({
			width:300,
			height:300,
			top:100,
			left:500,
			iconImg:'images/x.png',
			iconClose:true,
	});
    });
});
