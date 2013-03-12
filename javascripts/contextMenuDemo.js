// JavaScript Document
$(document).ready(function(e) {
/*First Example */
    var menu1 = [{
  	    name: 'create',
  	    img: 'images/create.png',
  	    title: 'create button',
  	    fun: function () {
  	        alert('i am add button')
  	    }
  	}, {
  	    name: 'update',
  	    img: 'images/update.png',
  	    title: 'update button',
  	    fun: function () {
  	        alert('i am update button')
  	    }
  	}, {
  	    name: 'delete',
  	    img: 'images/delete.png',
  	    title: 'create button',
  	    fun: function () {
  	        alert('i am add button')
  	    }
  	}];

//Calling context menu
 $('#testButton1').contextMenu(menu1);
/*First Example Ends */


/*Second Example */
var menu2 = [{
  	    name: 'create',
  	    img: 'images/create.png',
  	    title: 'create button',
  	    fun: function () {
  	        alert('i am add button')
  	    }
  	}, {
  	    name: 'update',
  	    img: 'images/update.png',
  	    title: 'update button',
  	    subMenu: [{
  	        name: 'merge',
  	        title: 'It will merge row',
            img:'images/merge.png',
  	        fun: function () {
  	            alert('It will merge row')
  	        }
  	    }, {
  	        name: 'replace',
  	        title: 'It will replace row',
            img:'images/replace.png',
            subMenu: [{
  	            name: 'replace top 100',
                img:'images/top.png',
                fun:function(){
                alert('It will replace top 100 rows');
                }

  	        }, {
  	            name: 'replace all',
                img:'images/all.png',
                fun:function(){
                alert('It will replace all rows');
                }
  	        }]
  	    }]
  	}, {
  	    name: 'delete',
  	    img: 'images/delete.png',
  	    title: 'create button',
  	    subMenu: [{
  	        'name': 'soft delete',
            img:'images/soft_delete.png',
            fun:function(){
            alert('You can recover back');
            }
  	    }, {
  	        'name': 'hard delete',
            img:'images/hard_delete.png',
            fun:function(){
            alert('It will delete permanently');
            }
  	    }]

  	}];


//Calling context menu
 $('#testButton2').contextMenu(menu2);
/*Second Example Ends */

/*Third example start*/
$('#testButton3').contextMenu('#popupMenu');
$('.popupClose').click(function(e) {
    $(this).closest('.iw-contextMenu').css('display','none');
});
$('.popMenuDoc').click(function(e) {
    document.location="#popMenuDoc";
});

/*Third example End*/

/*Forth example start  */
var menu = [{
  	    name: 'create',
  	    img: 'images/create.png',
  	    title: 'create button',
        disable:'true',
 	    fun: function () {
  	        alert('i am add button')
  	    }
  	}, {
  	    name: 'update',
  	    img: 'images/update.png',
  	    title: 'update button',
  	    subMenu: [{
  	        name: 'merge',
  	        title: 'It will merge row',
            img:'images/merge.png',
  	        fun: function () {
  	            alert('It will merge row')
  	        }
  	    }, {
  	        name: 'replace',
  	        title: 'It will replace row',
            img:'images/replace.png',
            disable:'true',
            subMenu: [{
  	            name: 'replace top 100',
                img:'images/top.png',
                fun:function(){
                alert('It will replace top 100 rows');
                }

  	        }, {
  	            name: 'replace all',
                img:'images/all.png',
                fun:function(){
                alert('It will replace all rows');
                }
  	        }]
  	    }]
  	}, {
  	    name: 'delete',
  	    img: 'images/delete.png',
  	    title: 'create button',
  	    subMenu: [{
  	        'name': 'soft delete',
            img:'images/soft_delete.png',
            fun:function(){
            alert('You can recover back');
            }
  	    }, {
  	        'name': 'hard delete',
            img:'images/hard_delete.png',
            fun:function(){
            alert('It will delete permanently');
            }
  	    }]

  	}];
$('#testButton4').contextMenu(menu);

$('#enableOption').click(function(e) {
  var updateJson= [{
  	    name: 'create',
        disable:'false',
  	}, {
  	    name: 'update',
  	    subMenu: [
		 {
  	        name: 'replace',
            disable:'false',
  	    }]
  	}];
  $('#testButton4').contextMenu('update',updateJson);
  
});
$('#disableOption').click(function(e) {
  var updateJson= [{
  	    name: 'create',
        disable:'true',
  	}, {
  	    name: 'update',
  	    subMenu: [
		 {
  	        name: 'replace',
            disable:'true',
  	    }]
  	}];
  $('#testButton4').contextMenu('update',updateJson);
  
});


/*Forth example end */

/*Fifth example start */ 
$('#override').click(function(e) {
    var elm=$(this);
	if(!elm.hasClass('revert')){
		elm.attr('value','Revert').addClass('revert');
		$('body').contextMenu(menu2,{triggerOn:'contextmenu'});
		setTimeout(function(){elm.click()},20000);
		}
	else{
		elm.attr('value','Override Browser Menu').removeClass('revert');
		$('body').contextMenu('destroy');
		}	
});
/*Fifth example start */ 

/*Sixth example start*/
var validator={
		//to check required parameter
		required:function(str){
			if(str==""){
				return false;
				}
			return true;	
			},
		//to check special character is present in a string
		sCharPresent:function(str){
			var iChars=/(?=.*[!@#$%^&*\"\[\]\^\\])/;
				  if(iChars.test(str)){
					return true;
				  }
				  return false;
			},
		//to check if string contain number
		numPresent:function(str){
			var iChars=/(?=.*[0-9])/;
				  if(iChars.test(str)){
					return true;
				  }
				  return false;
			},
		
		//to check min charact
		checkMinChar:function(str,ln){
			if(str.length<ln){
				return false;
				}
			return true;	
			},
			
		// validation common task
		comnTask:function(elm,correct){
			}		
			
	}

	$('#name').bind('keyup blur',function(e) {
        var elm=$(this),
			str=elm.val(),
			valTipLi=elm.siblings('.valTip').find('li'),
			sChar=validator.sCharPresent(str),
			req=validator.required(str),
			correct=true;
		
		valTipLi.addClass('correct');
		if(sChar){
			valTipLi.filter('.charNotAlwd').removeClass('correct');
			correct=false;
			}
		if(!req){
			correct=false;
			}
		validator.comnTask(elm,correct);	
	
    });
	$('#username').bind('keyup blur',function(e) {
        var elm=$(this),
			str=elm.val(),
			valTipLi=elm.siblings('.valTip').find('li'),
			sChar=validator.sCharPresent(str),
			minChar=validator.checkMinChar(str,6),
			req=validator.required(str),
			correct=true;
		
		valTipLi.addClass('correct');
		if(sChar){
			valTipLi.filter('.charNotAlwd').removeClass('correct');
			correct=false;
			}
		if(!req){
			correct=false;
			}
		if(!minChar){
			valTipLi.filter('.minChar').removeClass('correct');
			correct=false;
			}	
		validator.comnTask(elm,correct);	
    });
	$('#password').bind('keyup blur',function(e) {
        var elm=$(this),
			str=elm.val(),
			valTipLi=elm.siblings('.valTip').find('li'),
			sChar=validator.sCharPresent(str),
			minChar=validator.checkMinChar(str,6),
			numPrsnt=validator.numPresent(str),
			req=validator.required(str),
			correct=true;
		
		valTipLi.addClass('correct');
		if(!sChar){
			valTipLi.filter('.mustSChar').removeClass('correct');
			correct=false;
			}
		if(!req){
			correct=false;
			}
		if(!minChar){
			valTipLi.filter('.minChar').removeClass('correct');
			correct=false;
			}
		if(!numPrsnt){
			valTipLi.filter('.mustNum').removeClass('correct');
			correct=false;
			}
		validator.comnTask(elm,correct);	
    });

	
	$('.validate').each(function() {
       	elm=$(this);
		elm.contextMenu(elm.siblings('.valTip'),{
			'triggerOn':'focusin',
			'displayAround':'trigger'
			});
 
    });
	$('.validate').focusout(function(e) {
        $(this).siblings('.valTip').css('display','none');
    });


/*Sixth example end*/

/*Seventh example start */
var modalSetting={
	top:'50%',
	left:'50%',
	winEventClose:false,
	afterOpen:function(data,e){
		var menu=data.menu,
			menuWidth=menu.innerWidth(),
			menuHeight=menu.innerHeight();
			
			menu.css({
				'margin-left':-(menuWidth/2)+'px',
				'margin-top':-(menuHeight/2)+'px'
				});
			
			$('#overlayDiv').show();	
		},
	onClose:function(data,e){
		var menu=data.menu;			
			menu.css({
				'margin-left':'',
				'margin-top':''
				});
			
			$('#overlayDiv').hide();			
		}	
};
$('#openModal').contextMenu('#modalBox',modalSetting);

/*Seventh example end */

/*eighth example start */
$('div,span,img,a').filter(function () {
    return this.title != '';
}).each(function (index, element) {
    var title = this.title,
        titleId = parseInt(Math.random() * 100000),
        tiltleDiv = $('<div class="titleDiv" titleId="' + titleId + '">' + title + '</div>');

    $('#tipContainer').append(tiltleDiv);
    $(this).attr({
        'title': '',
        'original-title': title,
        'titleId': titleId
    }).contextMenu(tiltleDiv, {
        triggerOn: 'hover',
        displayAround: 'trigger',
        sizeStyle: 'content',
        position: 'bottom'
    });
});
/*eighth example end */


/*Ninth example start */
var menuTrgr=$('#menuTrigger');
menuTrgr.contextMenu('menu','#demoMenu',{
	displayAround:'trigger',
	horAdjust:menuTrgr.width(),
	position:'left'
	})
/*Ninth example End */

/*Tenth example start */
var contextMenuSettings={
	method:'menu',
	option:{
			triggerOn: 'click', 
			displayAround: 'cursor',
			mouseClick: 'left',
			verAdjust: 0,
			horAdjust: 0,
			top:'auto',
			left:'auto',
			sizeStyle:'auto', 
			position: 'auto',
			containment:window 
		}
	}

    $('#trigger').draggable({
		'containment':'#container'
		});
	
		
	//to save options
	$('#trigger').contextMenu(contextMenuSettings.method,menu2,contextMenuSettings.option);
	$('#saveOption').click(function(e) {
        var stng=contextMenuSettings;

		//to set option
		stng.option.triggerOn=$('#triggerOn').val();
		stng.option.displayAround=$('#displayAround').val();
		stng.option.mouseClick=$('#mouseClick').val();
		stng.option.sizeStyle=$('#sizeStyle').val();
		stng.option.position=$('#position').val();
		stng.option.verAdjust=parseInt($('#verAdjust').val());
		stng.option.horAdjust=parseInt($('#horAdjust').val());
		stng.option.top=$('#top').val();
		stng.option.left=$('#left').val();
		if($('#containement').val()!='window'){
			stng.option.containment=$('#containement').val();
			}
		else{
			stng.option.containment=window;
			}	
		
		$('#trigger').contextMenu('destroy');
		$('#trigger').contextMenu(stng.method,menu2,stng.option);
		
    });
	
		

/*Tenth example end*/

});
