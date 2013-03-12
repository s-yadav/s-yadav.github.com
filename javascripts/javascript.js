// JavaScript Document
//global selector
var globalS={
	nav:$('#nav_Wrap'),
	intro:$('#intro'),
	doc:$('#documentation'),
	demo:$('#demo'),
	concept:$('#concept'),
	navIntro:$('#navIntro'),	
	navDemo:$('#navDemo'),	
	navDoc:$('#navDoc'),	
	navConcept:$('#navConcept'),	
	}

globalS.navLi=globalS.nav.find('li');

//global variable
var globalV={
		navTop:	globalS.nav.offset().top,
		introTop:globalS.intro.offset().top,
		docTop:globalS.doc.offset().top,
		demoTop:globalS.demo.offset().top,
		conceptTop:globalS.concept.offset().top
	}	

$(window).scroll(function(e) {
	var win=$(this),
    	scrollTop=$(this).scrollTop();
		//to make navTop as fixed
	if(scrollTop+40>globalV.navTop){
		globalS.nav.addClass('fixed');
		}
	else{
		globalS.nav.removeClass('fixed');
		}	

	//to make nav menu selected according to scroll
	var start=scrollTop+100;
	globalS.navLi.filter('.current').removeClass('current');
	if(start<globalV.demoTop){
		globalS.navIntro.addClass('current');
		}	
	if((start>globalV.demoTop)&&(start<globalV.docTop)){
		globalS.navDemo.addClass('current');
		}
	else if((start>globalV.docTop)&&(start<globalV.conceptTop)){
		globalS.navDoc.addClass('current');
		}
	else if(start>globalV.conceptTop){
		globalS.navConcept.addClass('current');
		}
		

});

//to redirect to page location

$('li[linkId],div[linkId],span[linkId]').on('click',function(){
	document.location='#'+$(this).attr('linkId');
	});

$('#pageNav').find('li').each(function(index, element) {
    var elm=$(this),
		subNav=elm.attr('subNav');
	
	if(subNav&&(subNav!='')){
		elm.contextMenu('menu','#'+subNav,{
			triggerOn:'hover',
			displayAround:'trigger',
			position:'right',
			verAdjust:-50
			})
		}	
});
