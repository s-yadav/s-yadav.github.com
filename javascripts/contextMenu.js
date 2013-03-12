/*
	*contextMenu.js v 1.0.0 Beta
	*Author: Sudhanshu Yadav
	*s-yadav.github.com
	*Copyright (c) 2013 Sudhanshu Yadav.
	*Dual licensed under the MIT and GPL licenses
*/
;(function ($, window, document, undefined) {
    $.fn.contextMenu = function (method, selector, option) {
        "use strict";
        //parameter fix
        if (!methods[method]) {
            option = selector;
            selector = method;
            method = 'popup';
        }


        //need to check for array object
        else if (selector != null) {
            if (!((selector instanceof Array) || (typeof selector === 'string') || (selector.nodeType) || (selector.jquery))) {
                option = selector;
                selector = null;
            }
        }

        if ((selector instanceof Array) && (method != 'update')) {
            method = 'menu'
        }

        var myoptions = option;
        if (method != 'update') {
            option = iMethods.optionOtimizer(method, option);
            var myoptions = $.extend({}, $.fn.contextMenu.defaults, option);
            if (!myoptions.baseTrigger) {
                myoptions.baseTrigger = this;
            }
        }
        methods[method].call(this, selector, myoptions);
        return this;
    };
    $.fn.contextMenu.defaults = {
        triggerOn: 'click', //avaliable options are all event related mouse plus enter option
        displayAround: 'cursor', // cursor or trigger
        mouseClick: 'left',
        verAdjust: 0,
        horAdjust: 0,
        top: 'auto',
        left: 'auto',
        containment: window,
        winEventClose: true,
        sizeStyle: 'auto', //allowed values are auto and content (popup size will be according content size)
        position: 'auto', //allowed values are top, left, bottom and right
        //callback
        onOpen: function (data, event) {},
        afterOpen: function (data, event) {},
        onClose: function (data, event) {},
    }

    var methods = {
        menu: function (selector, option) {
            var trigger = $(this);
            selector = iMethods.createMenuList(trigger, selector, option);
            iMethods.contextMenuBind.call(this, selector, option, 'menu');
        },
        popup: function (selector, option) {
            $(selector).addClass('iw-contextMenu');
            iMethods.contextMenuBind.call(this, selector, option, 'popup');
        },
        update: function (selector, option) {
            this.each(function () {
                var trgr = $(this),
                    menuData = trgr.data('iw-menuData'),
                    menu = menuData.menu;
                if (typeof selector === 'object') {

                    for (var i = 0; i < selector.length; i++) {
                        var name = selector[i].name,
                            disable = selector[i].disable,
                            elm = menu.children('li').filter(function () {
                                return $(this).contents().filter(function () {
                                    return this.nodeType == 3;
                                }).text() == name;
                            }),
                            subMenu = selector[i].subMenu;

                        if (disable == 'true') {
                            elm.addClass('iw-mDisable');
                        } else {
                            elm.removeClass('iw-mDisable');
                        }

                        //to change submenus
                        if (subMenu) {
                            elm.contextMenu('update', subMenu);
                        }
                    }

                }

                iMethods.onOff(menu);
                menuData.option = $.extend({}, menuData.option, option);
                trgr.data('iw-menuData', menuData)

                //bind event again if trigger option has changed.
                var eventType = menuData.option.triggerOn;
                if (option) {
                    if (eventType != option.triggerOn) {
                        trigger.unbind('.contextMenu');
                        //to bind event
                        trigger.bind(eventType + '.contextMenu', iMethods.eventHandler);
                    }
                }
            });
        },
        refresh: function () {
            var menuData = this.filter(function () {
                return $(this).data('iw-menuData') != null;
            }).data('iw-menuData'),
                newElm = this.filter(function () {
                    return $(this).data('iw-menuData') == null;
                })
                iMethods.contextMenuBind.call(newElm, menuData.menuSelector, menuData.option);
        },
        value: function (key) {
            var menuData = $(this).data('iw-menuData');
            if (menuData[key]) {
                return menuData[key];
            } else if (menuData.option) {
                return menuData.option[key];
            }
            return null;
        },
        destroy: function () {
            $('#contextMenuTempTextBox').remove();
            this.each(function () {
                var trgr = $(this),
                    menuId = trgr.data('iw-menuData').menuId,
                    menu = $('.iw-contextMenu[menuId=' + menuId + ']'),
                    menuData = menu.data('iw-menuData');

                if (menuData.noTrigger == 1) {
                    if (menu.hasClass('iw-created')) {
                        menu.remove();
                    } else {
                        menu.removeClass('iw-contextMenu ' + cur.attr['menuId'])
                            .removeAttr('menuId').removeData('iw-menuData');
                        //to destroy submenus
                        menu.find('li.iw-mTrigger').contextMenu('destroy');
                    }
                } else {
                    menuData.noTrigger--;
                    menu.data('iw-menuData', menuData);
                }
                trgr.unbind('.contextMenu').removeClass('iw-mTrigger').removeData('iw-menuData');
            });
        }
    };
    var iMethods = {
        contextMenuBind: function (selector, option, method) {
            var trigger = this,
                menu = $(selector),
                menuData = menu.data('iw-menuData');

            //fallback
            if (menu.length == 0) {
                menu = trigger.find(selector);
                if (menu.length == 0) {
                    return;
                }
            }

            if (method == 'menu') {
                iMethods.menuHover(menu);
            }
            //get base trigger
            var baseTrigger = option.baseTrigger;

            //to add current menu.
            if (baseTrigger.index(trigger) != -1) {
                menu.addClass('iw-curMenu');
            }


            if (!menuData) {
                var menuId;
                if (!baseTrigger.data('iw-menuData')) {
                    menuId = Math.ceil(Math.random() * 100000);
                    baseTrigger.data('iw-menuData', {
                        'menuId': menuId
                    });
                } else {
                    menuId = baseTrigger.data('iw-menuData').menuId;
                }
                //create clone menu to calculate exact height and width.
                var cloneMenu = menu.clone();
                cloneMenu.appendTo('body');

                menuData = {
                    'menuId': menuId,
                    'menuWidth': cloneMenu.outerWidth(true),
                    'menuHeight': cloneMenu.outerHeight(true),
                    'noTrigger': 1,
                    'trigger': trigger
                };


                //to set data on selector
                menu.data('iw-menuData', menuData).attr('menuId', menuId);
                //remove clone menu
                cloneMenu.remove();
            } else {
                menuData.noTrigger++;
                menu.data('iw-menuData', menuData);
            }

            //to set data on trigger
            trigger.addClass('iw-mTrigger').data('iw-menuData', {
                'menuId': menuData.menuId,
                'option': option,
                'menu': menu,
                'menuSelector': selector,
                'method': method
            });

            //hover fix
            if (option.triggerOn == 'hover') {
                var eventType = 'mouseenter';
                //hover out if display is of context menu is on hover
                if (baseTrigger.index(trigger) != -1) {
                    baseTrigger.add(menu).bind('mouseleave.contextMenu', function (e) {
                        if ($(e.relatedTarget).closest('.iw-contextMenu').length == 0) {
                            $('.iw-contextMenu[menuId="' + menuData.menuId + '"]').hide(100);
                        }
                    });
                }

            } else {
                var eventType = option.triggerOn;
            }


            //to add temprory textbox
            iMethods.tempTextBox();

            //to bind event
            trigger.bind(eventType + '.contextMenu', iMethods.eventHandler);

            //to stop bubbling in menu
            menu.bind('click mouseenter', function (e) {
                e.stopPropagation();
            });
        },
        eventHandler: function (e) {
            e.preventDefault();
            var trigger = $(this),
                trgrData = trigger.data('iw-menuData'),
                menu = trgrData.menu,
                menuData = menu.data('iw-menuData'),
                option = trgrData.option,
                cntnmnt = option.containment,
                clbckData = {
                    trigger: trigger,
                    menu: menu
                },
                //check conditions
                cntWin = cntnmnt == window,
                btChck = option.baseTrigger.index(trigger) == -1;

            //to close previous open menu.
            if (!btChck) {
                $('.iw-contextMenu[menuId="' + menuData.menuId + '"]').css('display', 'none');
            }

            //call open callback
            option.onOpen.call(this, clbckData, e);


            var cObj = $(cntnmnt);
            cHeight = cObj.innerHeight(),
                cWidth = cObj.innerWidth(),
                cTop = 0,
                cLeft = 0,
                menuHeight = menuData.menuHeight,
                menuWidth = menuData.menuWidth,
                va = verAdjust = parseInt(option.verAdjust),
                ha = horAdjust = parseInt(option.horAdjust);

            if (!cntWin) {
                cTop = cObj.offset().top;
                cLeft = cObj.offset().left;

                //to add relative position if no position is defined on containment
                if (cObj.css('position') == 'static') {
                    cObj.css('position', 'relative');
                }

            }

            if (option.sizeStyle == 'auto') {
                menuHeight = Math.min(menuHeight, cHeight);
                menuWidth = Math.min(menuWidth, cWidth);
                menuWidth = menuWidth + 20;
            }
            if (option.displayAround == 'cursor') {
                var left = cntWin ? e.pageX - cObj.scrollLeft() : e.pageX - cLeft,
                    top = cntWin ? e.pageY - cObj.scrollTop() : e.pageY - cTop;
                var bottomMenu = top + menuHeight,
                    rightMenu = left + menuWidth;
                //max height and width of context menu
                if (bottomMenu > cHeight) {
                    if ((top - menuHeight) < 0) {
                        if ((bottomMenu - cHeight) < (menuHeight - top)) {
                            top = cHeight - menuHeight;
                            va = -1 * va;
                        } else {
                            top = 0;
                            va = 0;
                        }
                    } else {
                        top = top - menuHeight;
                        va = -1 * va;
                    }
                }
                if (rightMenu > cWidth) {
                    if ((left - menuWidth) < 0) {
                        if ((rightMenu - cWidth) < (menuWidth - left)) {
                            left = cWidth - menuWidth;
                            ha = -1 * ha;
                        } else {
                            left = 0;
                            ha = 0;
                        }
                    } else {
                        left = left - menuWidth;
                        ha = -1 * ha;
                    }
                }
            } else if (option.displayAround == 'trigger') {
                var triggerHeight = trigger.outerHeight(true),
                    triggerWidth = trigger.outerWidth(true),
                    triggerLeft = cntWin ? trigger.offset().left - cObj.scrollLeft() : trigger.offset().left - cLeft,
                    triggerTop = cntWin ? trigger.offset().top - cObj.scrollTop() : trigger.offset().top - cTop,
                    left = triggerLeft + triggerWidth,
                    top = triggerTop,
                    leftShift = triggerWidth;



                var bottomMenu = top + menuHeight,
                    rightMenu = left + menuWidth;
                //max height and width of context menu
                if (bottomMenu > cHeight) {
                    if ((top - menuHeight) < 0) {
                        if ((bottomMenu - cHeight) < (menuHeight - top)) {
                            top = cHeight - menuHeight;
                            va = -1 * va;
                        } else {
                            top = 0;
                            va = 0;
                        }
                    } else {
                        top = top - menuHeight + triggerHeight;
                        va = -1 * va;
                    }
                }
                if (rightMenu > cWidth) {
                    if ((left - menuWidth) < 0) {
                        if ((rightMenu - cWidth) < (menuWidth - left)) {
                            left = cWidth - menuWidth;
                            ha = -1 * ha;
                            leftShift = -triggerWidth;
                        } else {
                            left = 0;
                            ha = 0;
                            leftShift = 0;
                        }
                    } else {
                        left = left - menuWidth - triggerWidth;
                        ha = -1 * ha;
                        leftShift = -triggerWidth;
                    }
                }
                //test end
                if (option.position == 'top') {
                    menuHeight = Math.min(menuData.menuHeight, triggerTop);
                    top = triggerTop - menuHeight;
                    va = verAdjust;
                    left = left - leftShift;
                } else if (option.position == 'left') {
                    menuWidth = Math.min(menuData.menuWidth, triggerLeft);
                    left = triggerLeft - menuWidth;
                    ha = horAdjust;
                } else if (option.position == 'bottom') {
                    menuHeight = Math.min(menuData.menuHeight, (cHeight - triggerTop - triggerHeight));
                    top = triggerTop + triggerHeight;
                    va = option.verAdjust;
                    left = left - leftShift;
                } else if (option.position == 'right') {
                    menuWidth = Math.min(menuData.menuWidth, (cWidth - triggerLeft - triggerWidth));
                    left = triggerLeft + triggerWidth;
                    ha = horAdjust;
                }
            }
            //to draw contextMenu
            var outerLeftRight = menu.outerWidth(true) - menu.width(),
                outerTopBottom = menu.outerHeight(true) - menu.height();


            //applying css property
            var cssObj = {
                'position': (cntWin || btChck) ? 'fixed' : 'absolute',
                'display': 'inline-block',
                'height': '',
                'width': '',
                'overflow-y': menuHeight != menuData.menuHeight ? 'auto' : 'hidden',
                'overflow-x': menuWidth != menuData.menuWidth ? 'auto' : 'hidden'
            };

            if (option.sizeStyle == 'auto') {
                cssObj.height = menuHeight - outerTopBottom + 'px';
                cssObj.width = menuWidth - outerLeftRight + 'px';
            }
            //to get position from offset parent
            if (option.left != 'auto') {
                left = iMethods.getPxSize(option.left, cWidth)
            };
            if (option.top != 'auto') {
                top = iMethods.getPxSize(option.top, cHeight)
            };
            if (!cntWin) {
                var oParPos = trigger.offsetParent().offset();
                if (btChck) {
                    left = left + cLeft - $(window).scrollLeft();
                    top = top + cTop - $(window).scrollTop();
                } else {
                    left = left - (cLeft - oParPos.left);
                    top = top - (cTop - oParPos.top);
                }
            }
            cssObj.left = left + ha + 'px';
            cssObj.top = top + va + 'px';

            menu.css(cssObj);

            //to call after open call back
            option.afterOpen.call(this, clbckData, e);


            //to assign event
            if (!trigger.is('input,select,textarea') && (trgrData.method == 'menu')) {
                $('#iw-tempTxt').focus();
            }

            //to add current menu class
            if (trigger.closest('.iw-contextMenu').length == 0) {
                $('.iw-curMenu').removeClass('iw-curMenu');
                menu.addClass('iw-curMenu');
            }

            $(document.documentElement).unbind('keyup', iMethods.keyEvent);
            $('body').unbind('click', iMethods.clickEvent);
            var dataParm = {
                trigger: trigger,
                menu: menu,
                option: option,
                method: trgrData.method
            }
            $('body').click(dataParm, iMethods.clickEvent);
            $(document.documentElement).keyup(dataParm, iMethods.keyEvent);
            if (option.winEventClose) {
                $(window).bind('scroll resize', dataParm, iMethods.scrollEvent);
            }
        },

        scrollEvent: function (e) {
            iMethods.closeContextMenu(e.data.option, e.data.trigger, e.data.menu, e);
        },

        clickEvent: function (e) {
            var button = e.data.trigger.get(0);

            if ((button !== e.target) && ($(e.target).closest('.iw-contextMenu').length == 0)) {
                iMethods.closeContextMenu(e.data.option, e.data.trigger, e.data.menu, e);
            }
        },
        keyEvent: function (e) {
            var menu = e.data.menu,
                option = e.data.option,
                keyCode = e.keyCode;
            // handle cursor keys
            if (keyCode == 27) {
                iMethods.closeContextMenu(option, e.data.trigger, menu, e);
            }
            if (e.data.method == 'menu') {
                var curMenu = $('.iw-curMenu'),
                    optList = curMenu.children('li:not(.iw-mDisable)'),
                    selected = optList.filter('.iw-mSelected'),
                    index = optList.index(selected),
                    focusOn = function (elm) {
                        selected.removeClass('iw-mSelected')
                        elm.addClass('iw-mSelected');
                    },
                    first = function () {
                        focusOn(optList.filter(':first'))
                    },
                    last = function () {
                        focusOn(optList.filter(':last'))
                    },
                    next = function () {
                        focusOn(optList.filter(':eq(' + (index + 1) + ')'))
                    },
                    prev = function () {
                        focusOn(optList.filter(':eq(' + (index - 1) + ')'))
                    },
                    subMenu = function () {
                        var menuData = selected.data('iw-menuData');
                        if (menuData) {
                            selected.triggerHandler('mouseenter.contextMenu');
                            var selector = menuData.menu;
                            selector.addClass('iw-curMenu');
                            curMenu.removeClass('iw-curMenu');
                            curMenu = selector;
                            optList = curMenu.children('li:not(.iw-mDisable)');
                            selected = optList.filter('.iw-mSelected');
                            first();
                        }
                    },
                    parMenu = function () {
                        var selector = curMenu.data('iw-menuData').trigger;
                        var parMenu = selector.closest('.iw-contextMenu');
                        if (parMenu.length != 0) {
                            curMenu.removeClass('iw-curMenu').css('display', 'none');
                            parMenu.addClass('iw-curMenu');
                        }
                    };
                switch (keyCode) {
                    case 13:
                        selected.click();
                        break;
                    case 40:
                        selected.length == 0 ? first() : next();
                        break;
                    case 38:
                        selected.length == 0 ? last() : prev();
                        break;
                    case 33:
                        first();
                        break;
                    case 34:
                        last();
                        break;
                    case 37:
                        parMenu();
                        break;
                    case 39:
                        subMenu();
                        break;
                }
            }
        },
        closeContextMenu: function (option, trigger, menu, e) {

            //unbind all events from top DOM
            $(document.documentElement).unbind('keyup', iMethods.keyEvent);
            $('body').unbind('click', iMethods.clickEvent);
            $(window).unbind('scroll resize', iMethods.scrollEvent);
            $('.iw-contextMenu').hide();
            $(document).focus();

            //call close function
            option.onClose.call(this, {
                trigger: trigger,
                menu: menu
            }, e);
        },
        getPxSize: function (size, of) {
            if (size.indexOf('%') != -1) {
                return parseInt(size) * of / 100;
            } else {
                return parseInt(size);
            }
        },
        menuHover: function (menu) {
            menu.children('li').bind('mouseenter', function (e) {
                //to make curmenu
                $('.iw-curMenu').removeClass('iw-curMenu');
                menu.addClass('iw-curMenu');
                //to select the list
                var selected = menu.find('li.iw-mSelected'),
                    submenu = selected.find('.iw-contextMenu');
                if ((submenu.length != 0) && (selected[0] != this)) {
                    submenu.hide(100);
                }
                selected.removeClass('iw-mSelected');
                $(this).addClass('iw-mSelected');
            });
        },
        createMenuList: function (trgr, selector, option) {
            var baseTrigger = option.baseTrigger,
                randomNum = Math.floor(Math.random() * 10000);
            if ((typeof selector == 'object') && (!selector.nodeType) && (!selector.jquery)) {
                var menuList = $('<ul class="iw-contextMenu iw-created iw-cm-menu" id="iw-contextMenu' + randomNum + '"></ul>');
                for (var i = 0; i < selector.length; i++) {
                    var name = selector[i].name,
                        fun = selector[i].fun,
                        subMenu = selector[i].subMenu,
                        img = selector[i].img || '',
                        title = selector[i].title || name,
                        disable = selector[i].disable,
                        list = $('<li title="' + title + '">' + name + '</li>');
                    if ((img != null) && (img != '')) {
                        list.prepend('<img src="' + img + '" align="absmiddle" class="iw-mIcon" />');
                    }

                    //to add disable
                    if (disable == 'true') {
                        list.addClass('iw-mDisable');
                    }

                    list.bind('click', fun);

                    //to create sub menu
                    menuList.append(list);
                    if (subMenu) {
                        list.append('<div class="iw-cm-arrow-right" />');
                        iMethods.subMenu(list, subMenu, baseTrigger, option);
                    }
                }
                if (baseTrigger.index(trgr[0]) == -1) {
                    trgr.append(menuList)
                } else {
                    var par = option.containment == window ? 'body' : option.containment;
                    $(par).append(menuList);
                }

                iMethods.onOff($('#iw-contextMenu' + randomNum));
                return '#iw-contextMenu' + randomNum;
            } else if ($(selector).length != 0) {
                var element = $(selector);
                element.removeClass('iw-contextMenuCurrent')
                    .addClass('iw-contextMenu iw-cm-menu iw-contextMenu' + randomNum)
                    .attr('menuId', 'iw-contextMenu' + randomNum)
                    .css('display', 'none');

                //to create subMenu
                element.find('ul').each(function (index, element) {
                    var subMenu = $(this),
                        parent = subMenu.parent('li');
                    parent.append('<div class="iw-cm-arrow-right" />');
                    subMenu.addClass('iw-contextMenuCurrent');
                    iMethods.subMenu(parent, '.iw-contextMenuCurrent', baseTrigger, option);
                });
                iMethods.onOff($('.iw-contextMenu' + randomNum));
                return '.iw-contextMenu' + randomNum;
            }
        },
        subMenu: function (trigger, selector, baseTrigger, option) {
            trigger.contextMenu('menu', selector, {
                triggerOn: 'hover',
                displayAround: 'trigger',
                position: 'auto',
                baseTrigger: baseTrigger,
                containment: option.containment
            });
        },
        onOff: function (menu) {

            menu.find('.iw-mOverlay').remove();
            menu.find('.iw-mDisable').each(function () {
                var list = $(this);
                list.append('<div class="iw-mOverlay"/>');
                list.find('.iw-mOverlay').bind('click mouseenter', function (event) {
                    event.stopPropagation();
                });

            });

        },
        tempTextBox: function () {
            //to add a temproryTextBox
            var textBox = $('#iw-tempTxt');
            if (textBox.length == 0) {
                $('body').append('<input type="text" id="iw-tempTxt" />');
                $('#iw-tempTxt').css({
                    'position': 'fixed',
                    'bottom': '1px',
                    'left': '1px',
                    'width': '0px',
                    'border': 'none',
                });
            }

        },
        optionOtimizer: function (method, option) {
            if (!option) {
                return;
            }
            if (method == 'menu') {
                if (!option.mouseClick) {
                    option.mouseClick = 'right';
                }
            }
            if ((option.mouseClick == 'right') && (option.triggerOn == 'click')) {
                option.triggerOn = 'contextmenu';
            }

            if (['hover', 'mouseenter', 'mouseover', 'mouseleave', 'mouseout', 'focusin', 'focusout'].indexOf(option.triggerOn) != -1) {
                option.displayAround = 'trigger';
            }
            return option;
        },
    }
})(jQuery, window, document);