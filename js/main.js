/**
 * jQuery Carousel with Parallax v0.1.2
 *
 * Copyright (c) 2016 Simone Alessandrini
 * Licensed under the  The GNU General Public License v3.0 (See terms below)
 *
 * @author Simone Alessandrini
 *
 * @projectDescription    jQuery plugin to create a parallax effect within carousel elements
 * 
 * @version 0.1.2
 * 
 * @requires jquery.js (v 1.2.x minimum)
 *
 *
 * TERMS OF USE - jQuery Carousel with Parallax
 * Open source under The GNU General Public License v3.0
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Simone Alessandrini "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JON RAASCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the authors and should not be interpreted as representing official policies, either expressed or implied, of Jon Raasch, who is the man.
 * 
 * @donate: https://www.paypal.me/SAlessandrini
 *
 */
var cnfg = {
    width: 900,
    height: 700,
    currItem: null,
    nextItem: null,
    prevItem: null,
    containerHeight: 0,
    containerWidth: 0,
    parallaxSpeed: 4000,
    length: 0,
    currentIndex: 1
};


(function ($) {

    $.parallax = {
        init: function () {
            cnfg.currItem = $('#parallax ul').find('li:first-child');
            cnfg.nextItem = $('#parallax ul').find('li:nth-child(2)');
            cnfg.currItem.addClass('visible');
            cnfg.nextItem.addClass('next');
            cnfg.containerHeight = cnfg.height;
            cnfg.containerWidth = cnfg.width;
            $('#parallax ul').height(cnfg.containerHeight).width(cnfg.containerWidth);

            cnfg.nextItem.find('.parallax-item').each(function () {
                $(this).css({marginTop: '+=' + ($(this).data('move')) + '%'});
                $(this).width(cnfg.containerWidth);
                $(this).height(cnfg.containerHeight);
            });

            cnfg.length = $('#parallax ul li').length;
        },
        next: function () {
            $('#nextParallax').prop('disabled', true);
            $('#prevParallax').prop('disabled', true);

            var currItms = cnfg.currItem.find('div');
            var nextItms = cnfg.nextItem.find('div');

            var itms = $.merge(currItms, nextItms);

            $.each(itms, function () {
                var move = $(this).data('move');
                if ($(this).is(".parallax-item")) {
                    $(this).stop().animate({marginTop: '-=' + move + '%'}, cnfg.parallaxSpeed);
                } else {
                    if ($(this).parent('li').hasClass('visible')) {
                        $(this).stop().animate({
                            height: '+=' + move + '%'
                        }, cnfg.parallaxSpeed);
                    }
                }

            });

            cnfg.currItem.stop().animate({marginTop: '-=' + cnfg.height}, cnfg.parallaxSpeed, function () {
                $(this).removeClass('visible');
                cnfg.prevItem = $(this).prev('li').removeClass('prev');
                cnfg.currItem = $(this).next('li').addClass('visible');

                cnfg.prevItem = $(this);

                cnfg.currItem = $(this).next('li');
                cnfg.nextItem = cnfg.currItem.next('li');

                cnfg.prevItem.removeClass('visible').addClass('prev');
                cnfg.currItem.removeClass('next');
                cnfg.nextItem.addClass('next');

                cnfg.nextItem.find('.parallax-item').each(function () {
                    $(this).css({marginTop: ($(this).data('move')) + '%'});
                });

                cnfg.currentIndex++;
                console.log(cnfg.currentIndex);
                if (cnfg.currentIndex < cnfg.length) {
                    $('#nextParallax').prop('disabled', false);
                    $('#prevParallax').prop('disabled', false);
                } else {
                    $('#nextParallax').prop('disabled', true);
                    $('#prevParallax').prop('disabled', false);
                }
            });
        },
        prev: function () {
            $('#nextParallax').prop('disabled', true);
            $('#prevParallax').prop('disabled', true);

            var currItms = cnfg.currItem.find('div');
            cnfg.prevItem = cnfg.currItem.prev('li');
            var prevItem = cnfg.prevItem.find('div');

            var itms = $.merge(currItms, prevItem);

            $.each(itms, function () {
                var move = $(this).data('move');
                if ($(this).is(".parallax-item")) {
                    $(this).stop().animate({marginTop: '+=' + move + '%'}, cnfg.parallaxSpeed);
                } else {
                    if ($(this).parent('li').hasClass('prev')) {
                        $(this).stop().animate({
                            height: '-=' + move + '%'
                        }, cnfg.parallaxSpeed);
                    }
                }

            });

            cnfg.prevItem.stop().animate({marginTop: '+=' + cnfg.height}, cnfg.parallaxSpeed, function () {
                $(this).attr('class', 'visible');
                cnfg.prevItem = $(this).next('li').attr('class', 'next');

                cnfg.prevItem = $(this).prev('li').attr('class', 'prev');
                cnfg.currItem = $(this);
                cnfg.nextItem = cnfg.currItem.next('li').addClass('next');

                cnfg.nextItem.next('li').removeClass('next');

                cnfg.nextItem.find('.parallax-item').each(function () {
                    $(this).css({marginTop: ($(this).data('move')) + '%'});
                });

                cnfg.currentIndex--;
                console.log(cnfg.currentIndex);
                if (cnfg.currentIndex > 1) {
                    $('#prevParallax').prop('disabled', false);
                    $('#nextParallax').prop('disabled', false);
                } else {
                    $('#prevParallax').prop('disabled', true);
                    $('#nextParallax').prop('disabled', false);
                }
            });

        }
    };
})(jQuery);

jQuery(document).ready(function ($) {

    $.parallax.init();

    $('#nextParallax').bind('click tap', function () {

        $.parallax.next(cnfg);
    })
    $('#prevParallax').bind('click tap', function () {

        $.parallax.prev(cnfg);
    })
});
