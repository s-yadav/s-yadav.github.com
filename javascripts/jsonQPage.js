// JavaScript Document
//global selector
var globalS={
	nav:$('#nav_Wrap'),
	blocks:$('#iniltialize,#intro,#traverse,#manip,#return,#utility')
	}

globalS.navLi=globalS.nav.find('li');

//global variable
var globalV={
		navTop:	globalS.nav.offset().top,
	}	

$(window).scroll(function(e) {
	
	
	var win=$(this),
    	scrollTop=$(this).scrollTop(),
		blocks=globalS.blocks;
		//to make navTop as fixed
	
	for(var i=0,ln=blocks.length; i<ln; i++ ){
		var cur=$(blocks[i]),
			id=blocks[i].id,
			curTop=cur.offset().top;
		
		if(curTop<scrollTop+100){
			globalS.navLi.filter('.current').removeClass('current');
			globalS.navLi.filter('[linkId="'+id+'"]').addClass('current');
			}
		else{
			break;
			}	
		
		}
	
	if(scrollTop+40>globalV.navTop){
		globalS.nav.addClass('fixed');
		}
	else{
		globalS.nav.removeClass('fixed');
		}	
		

});

//to redirect to page location

$('li[linkId],div[linkId],span[linkId]').on('click',function(){
	document.location='#'+$(this).attr('linkId');
	});

//add slide toggle in examples
$('.example-trigger').click(function(e) {
    e.preventDefault();
	$(this).next().slideToggle();
});