
$(function ($) {
    if ($(window).width() >= 1024) {
        //Scroll
        $('.scroll').niceScroll({
            width: '6px',
            autohidemode: false
        });
    }

    //Horizontal Scroll in tablets Mobiles
    if ($(window).width() <= 768) {
        //Scroll
        $('.hscroll').niceScroll({
            cursorcolor: "#ccc",
            width: '6px'
        });
    };

    //Payment Reedem Radio Show Hide
    $(".inforadios li input[type='radio']").on('ifChecked',function () {
        if($(this).val() == "manual")
        {$(".manual").show();$(".aadar").hide();}

        else
        {$(".aadar").show();$(".manual").hide();}
    });

    //Increase input-width on input each time
    /*    $('.increase-width').keyup(function(){
     $('<span id="width">').append( $(this).val() ).appendTo('body');
     $(this).width( $('#width').width() + 6 );
     $('#width').remove();
     });*/

    //Wow.js(Animation) + animate.css integration
    new WOW().init();

    //Parallax
    jQuery(window).trigger('resize').trigger('scroll');
    $('.parallax-window').parallax();

    //Owl Carousel
    var owl = $('.allslider'),
        owlOptions = {
            loop:true,
            margin:10,
            navigation: true,
            nav: true,
            navText: ["<i class='control-img icon-prev'></i>","<i class='control-img icon-next'></i>"],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                980:{
                    items:2
                },
                1000:{
                    items:3
                }
            }
        };

    //Active Owl Slider in Mobile and not in desktop
    if ( $(window).width() < 981 ) {
        var owlActive = owl.owlCarousel(owlOptions);
    } else {
        owl.addClass('off');
    }
    $(window).resize(function() {
        if ( $(window).width() < 981 ) {
            if ( $('.owl-carousel').hasClass('off') ) {
                var owlActive = owl.owlCarousel(owlOptions);
                owl.removeClass('off');
            }
        } else {
            if ( !$('.owl-carousel').hasClass('off') ) {
                owl.addClass('off').trigger('destroy.owl.carousel');
                owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
            }
        }
    });

    $('.announcelist').owlCarousel({
        loop:true,
        margin:15,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    })


// Main function to check screen width
    function ele_adjust() {
        var conwid = $(".container").width()
        if (conwid > 767){
            web();
        }  else {
            mobile();
        }
    }
    /*
     //Active Owl Slider in desktop to mobile
     var owlActive = owl.owlCarousel(owlOptions);*/

    $('.fb-canvas').owlCarousel({
        items:1,
        margin:10,
        autoHeight:true,
        pagination:true
    });

    $('.myLinkToTop').click(function () {
        $('html, body').animate({scrollTop:$(document).height()}, 2000);
        return false;
    });


    //Mobile To Web
    function web() {
        // Footer Accordion to List
        $(".menutoacc").removeClass("accordion");

        /*Maintain the div fixed till the height of main div*/
        var windw = this;
        var $infield = $('.content-section').height();
        $.fn.followTo = function ( pos ) {
            var $this = this,
                $window = $(windw);
            $window.scroll(function(){
                if ($window.scrollTop() > pos) {
                    $this.css({
                        position: 'absolute',
                        top: pos
                    });

                }
                if ($window.scrollTop() < pos) {
                    $this.css({
                        position: 'fixed',
                        top: 'auto'
                    });
                }

            });
        };
        $('.final-insureselection').followTo($infield);
    }

    //Web To Mobile
    function mobile() {
        // Footer List to Accordion
        $(".menutoacc").addClass("accordion");
        $('.menutoacc.accordion .footerlinks:eq(0)').show();
        $(".footerlink-head").click(function () {
            if (false == $(this).next().is(':visible')) {
                $(' .footerlinks').slideUp(300);
                $(".footerlink-head").removeClass('active');
            }
            $(this).next().slideDown(300);
            $(this).addClass('active');
            return false;
        });

    }

    // Run Main function to check screen width
    ele_adjust();
    $(window).resize(ele_adjust);
});

//Auto Complete for Search Option
$( function() {
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },
        _renderMenu: function (ul, items) {
            var that = this,
                currentCategory = "";
            $.each(items, function (index, item) {
                if(item.label == "No Results Found"){
                    var li,
                        listdata = "<div class='ui-cateinner clearfix'><div class='cate-left pull-left'><span class='item-labels'>" + item.label;
                    li = that._renderItemData(ul, item);
                    li.append(listdata);
                }
                else{
                    var li,
                        listdata = "<div class='ui-cateinner clearfix'><div class='cate-left pull-left'><span class='item-labels'>" + item.label + "</span><span class='item-cate'>" + item.cate + "</span></div>" + "<div class='score-levels pull-right'><span class='item-score'>" + item.scores + "</span>" + "<span class='item-stitle'>" + item.stitle + "</span></div>" + "</span>";
                    if (item.category != currentCategory) {
                        ul.append("<li class='ui-autocomplete-category'><h6 class='page-title page-title1'><span>" + item.category + "</span></h6></li>");
                        currentCategory = item.category;
                    }
                    li = that._renderItemData(ul, item);
                    li.append(listdata);
                }
            });
        }
    });
    var data = [
        {
            label: "Infosys Top 200 Fund RP (Growth)",
            cate: "Mutual Fund",
            scores: "5",
            stitle: "Search Score",
            category: ""
        },
        {label: "Sysco Industries Ltd.", cate: "Stock", scores: "13", stitle: "Search Score", category: ""},
        {label: "Reliance Car Insurance", cate: "Life Insurance", scores: "22", stitle: "Search Score", category: ""},
        {
            label: "Max Bupa General Insurance",
            cate: "Life Insurance",
            scores: "120",
            stitle: "Search Score",
            category: "Top Searched"
        },
        {
            label: "Award Winning Stocks",
            cate: "Baskets",
            scores: "85",
            stitle: "Search Score",
            category: "Top Searched"
        },
        {
            label: "Franklin India Prima Plus",
            cate: "Mutual Fund",
            scores: "83",
            stitle: "Search Score",
            category: "Top Searched"
        }
    ];
    var NoResultsLabel = "No Results Found";

    $(".types").catcomplete({
        delay: 0,
        source: function(request, response) {
            var results = $.ui.autocomplete.filter(data, request.term);

            if (!results.length) {
                results = [NoResultsLabel];
            }

            response(results);
        },
        open: function (event, ui) {
            $(this).autocomplete("widget").css({
                "width": ($(this).width() + "px")
            });
            if (ui.item.label === NoResultsLabel) {
                event.preventDefault();
            }
        },
        select: function (event, ui) {
            if (ui.item.label === NoResultsLabel) {
                event.preventDefault();
            }
        },
        focus: function (event, ui) {
            if (ui.item.label === NoResultsLabel) {
                event.preventDefault();
            }
        }
    });
});

//Data Table scripts
$(document).ready( function () {
    //Owl Carousel For Sensex Slider
    $('.sensexslider').owlCarousel({
        loop: true,
        margin: 10,
        navigation: true,
        nav: true,
        navText: ["<i class='control-img icon-prev'></i>", "<i class='control-img icon-next'></i>"],
        responsive: {
            1000: {
                items: 8
            },
            1330: {
                items: 10
            },
            1580: {
                items: 12
            },
            1920: {
                items: 15
            }
        }
    });




    $('.main-blog-content > table').wrap('<div class="table-responsive"></div>');

    $('[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
    });
    $('a[data-toggle="modal"]').on('shown.bs.modal', function (e) {
        $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
    });

    $('#top-holding,#top-sectors').DataTable({
        "searching": false,
        "paging": false,
        "ordering": true,
        "info": false
    });

    $('#top-holding-popup,#top-sector-popup').DataTable({
        "searching": false,
        "paging": false,
        "ordering": true,
        "info": false,
        "scrollY": '50vh'
    });
    $('#marketLens-table,#quarterlyResult-table,#eventUpdate-table').DataTable({
        scrollY: '280px',
        scrollCollapse: true,
        paging: false,
        ordering: true,
        searching: false,
        info: false
    });

    $('.table-height').DataTable({
        scrollY: '300px',
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        responsive: true
    });

    $('#announcement-table,#bookClosure-table,#bonus-table,#rights-table,#delistedShares-table,#boardMeetings-table,#AGM-table,#dividend-table').DataTable({
        scrollY: '30vh',
        scrollCollapse: true,
        paging: false,
        ordering: false,
        searching: false,
        info: false
    });

    $('.modal').on('shown.bs.modal', function (e) {
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    });

    $('#order_status_mf,#order_status_equity').DataTable({
        scrollY: '300px',
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        ordering: true,
        searching: false,
        info: false
    });

    $('.portfolio-table').DataTable({
        scrollY: '300px',
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        responsive: true
    });

    $('.fixed-header-scrollable').DataTable({
        scrollY: '300px',
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        responsive: true
    });

    $('#order-logs').DataTable( {
        scrollY:'540px',
        scrollX:true,
        scrollCollapse:true,
        paging:false,
        ordering:true,
        searching:false,
        info: false,
        fixedColumns: true
    } );

    //Scroll to top of page
    $(".sol-credit").click( function() {
        $('.sol-credit-table').slideToggle(500);
        $('.sol-debit-table').slideUp(500);
    });
    $(".sol-debit").click( function() {
        $('.sol-debit-table').slideToggle(500);
        $('.sol-credit-table').slideUp(500);
    });
});

$(document).ready(function () {

    //Scroll to top of page
    $(".scrolltop").click( function() {
        $(window).scrollTop(0);
    });

    // Filter Open Below 1200 Screen
    $(".filter-pos").click(function () {
        $('.filtering').addClass('open');
        $('body').addClass('overlayOpen');
        $('.filteroverlay').addClass('open');
    });

    // Filter Close Below 1200 Screen
    $(".cloes-filter").click(function () {
        $('.filtering').removeClass('open');
        $('body').removeClass('overlayOpen');
        $('.filteroverlay').removeClass('open');
    });

    // Filter open class remove above 1200 Screen
    $(window).resize(function(){
        var windowSize = $(window).width();
        if (windowSize >= 1280) {
            $('.filtering').removeClass('open');
            $('body').removeClass('overlayOpen');
            $('.filteroverlay').removeClass('open');
        }
    });

    //Auto adjust Height
    //Filter Accordian
    $(".filterdiv .single-item").click(function(){
        $(this).parents('.filterdiv').siblings('.filterdiv').find('.filter-head,.single-item').removeClass('active');
        $(this).parents('.filterdiv').siblings('.filterdiv').find('.filter-head').next(".filteraccshow").slideUp("fast");
        $(this).next(".filteraccshow").slideToggle("fast");
        $(this).toggleClass("active");
    });
    $(".filterdiv .filter-head").click(function(){
        $(this).parents('.filterdiv').siblings('.filterdiv').find('.filter-head,.single-item').removeClass('active');
        $(this).parents('.filterdiv').siblings('.filterdiv').find('.filter-head').next(".filteraccshow").slideUp("fast");
        $(this).next(".filteraccshow").slideToggle("fast");
        $(this).toggleClass("active");
    });

    //Sticky Header
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.header-section').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.header-section').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('.header-section').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
    }

    //Top Search
    $(".types").keypress(function () {
        $(this).siblings(".search-clear").show();
        if (e.which == 13) {
            window.location.href = "search-list.html";
        }
    });

    $(".types1").keypress(function () {
        $(this).siblings(".search-clears").show();
    });

    //Search Clear
    $(".searchbar .search-clear").on('click', function(){
        $(".searchbar .types").val('');
        $(this).hide();
    });

    //Search Clears
    $(".search-clears").on('click', function(){
        $('.types1').val('');
        $(this).hide();
    });

    //Show More Card
    $('.view-more-click').on('click', function(){
        $(this).parents('').siblings('ul').find('.no-display').fadeIn(1000);
    });

    //Multiple modal enable scroll
    $('.modal').on('hidden.bs.modal', function (e) {
        if($('.modal').hasClass('in')) {
            $('body').addClass('modal-open');
        }
        else {
            $('body').css( "padding-right", "0" );
        }
    });

    //Stocklist page linking to respective stocklist-details page
    $('.stockcard').on('click', function (e) {
        var p = $(e.target).closest('.buy-list,.expandcard,.card-hover,.info-cat,.info-details').length;
        if(!p){
            window.location.href='stocklist-details.html';
        }
    });

    //Stocklist page linking to respective stocklist-details page
/*    $('.insure-portfolio').on('click', function (e) {
        var p = $(e.target).closest('.buy-insurance, .buy-insurance + a').length;
        if(!p){
            window.location.href='https://www.google.co.in/';
        }
    });*/

    //Basketlist page linking to respective Basket Mutual Fund details page
    $('.baskets-viewed').on('click', function (e) {
        var p = $(e.target).closest('.buy-list,.expandcard,.card-hover,.info-cat,.info-details').length;
        if(!p){
            window.location.href='baskets-stockdetails.html';
        }
    });

    //Basketlist page linking to respective Basket Mutual Fund details page
    $('.mfcard').on('click', function (e) {
        var p = $(e.target).closest('.buy-list,.expandcard,.card-hover,.info-cat,.info-details').length;
        if(!p){
            window.location.href='mutualfund-details.html';
        }
    });

    $(document).on('click', function (e) {
        var p = $(e.target).closest('.searchbar-mobile,.header-section').length;
        if (!p) {
            $(".searchbar-mobile").hide();
        }
    });


    //Webinar page linking to respective Webinar-details page
    $('.event1 a.blue-txt').on('click', function (e) {
        var p = $(e.target).closest('.buy-list').length;
        if(!p){
            window.location.href='webinar-event.html';
        }
    });

    //Webinar page linking to respective Webinar-details page
    $('.event2').on('click', function (e) {
        var p = $(e.target).closest('.buy-list').length;
        if(!p){
            window.location.href='news-details.html';
        }
    });


    if ($(window).width() <= 768) {
        //Scroll
        $('.hscroll').niceScroll({
            cursorcolor: "#ccc",
            width: '6px'
        });
    }

    //Mobile search
    $(".search-click").on('click', function(){
        $(".searchbar-mobile").slideToggle();
        $(this).siblings(".types").val('');
    });

    $(".searchbar-mobile .search-clear").on('click', function(){
        $(".searchbar-mobile").css({'display':'none'});
    });

    //Wizard
    $('.pcacs-tabs').click(function () {
        var pastep = "." + $(this).attr('title');
        $(this).parents('.pacs').hide();
        $(pastep).show();
    });

    //Wizard
    $('.stepswizard > li > a').click(function () {
        if($(this).attr('disabled')){
            $(this).parents('.pacs').show();
        }
        else {
            var pastep = "." + $(this).attr('title');
            $(this).parents('.pacs').hide();
            $(pastep).show();
        }
    });

    //Info icon hover
    $('.info-cat').bind('mouseover touchstart', function() {
        $(this).siblings('.info-details').show();
        $(this).find('.info-details').show();
    });

    $('.info-cat').bind('mouseleave touchend', function() {
        $(this).siblings('.info-details').hide();
        $(this).find('.info-details').hide();
    });

    //Character Limit
    $(".span-txt").each(function(){
        len=$(this).text().length;
        if(len>27)
        {
            $(this).text($(this).text().substr(0,27));
        }
    });

    //Sort Dropdown Selection
    $('.sort-drop .select').change(function() {
        $('.sort-order').hide();
        $('#' + $(this).val()).show();
    });

    //Title attributes
    if ($(window).width() <= 1024) {
        $('.span-txt').removeAttr('title');
        $("body").tooltip({ selector: '[data-toggle="tooltip"]' });
        $('[data-toggle="tooltip"]').tooltip('disable');
    }


    //Card select list
    $('.sharecartwish-options li a, .siplist li a').on('click', function () {
        //$('.sharedropdown a').removeClass('selected');
        $(this).toggleClass('selected');
        /*if ($('.sharedropdown a').hasClass('selected')) {
         $('.sharedropdown a').removeClass('selected');
         }*/
    });
    $(document).on('click', function (e) {
        var p = $(e.target).closest('.sharecartwish-options .sharedropdown a ').length;
        if (!p) {
            $('.sharedropdown a').removeClass('selected');
        }
    });

    $("#exchange").change(function(){
        $(this).find("option:selected").each(function(){
            if($(this).attr("value")=="nse"){
                $(".exchangeTbl").not(".nse").hide();
                $(".nse").show();
            }
            else if($(this).attr("value")=="bse"){
                $(".exchangeTbl").not(".bse").hide();
                $(".bse").show();
            }
            else if($(this).attr("value")=="nfo"){
                $(".exchangeTbl").not(".nfo").hide();
                $(".nfo").show();
            }
            else if($(this).attr("value")=="bfo"){
                $(".exchangeTbl").not(".bfo").hide();
                $(".bfo").show();
            }
            else{
                $(".exchangeTbl").hide();
            }
        });
    }).change();

    $("#exchange").change(function(){
        $(this).find("option:selected").each(function(){
            if($(this).attr("value")=="nse"){
                $(".exchangeTbl").not(".nse").hide();
                $(".nse").show();
            }
            else if($(this).attr("value")=="bse"){
                $(".exchangeTbl").not(".bse").hide();
                $(".bse").show();
            }
            else if($(this).attr("value")=="nfo"){
                $(".exchangeTbl").not(".nfo").hide();
                $(".nfo").show();
            }
            else if($(this).attr("value")=="bfo"){
                $(".exchangeTbl").not(".bfo").hide();
                $(".bfo").show();
            }
            else{
                $(".exchangeTbl").hide();
            }
        });
    }).change();

    //Sensex
    $('.sensex-icon').on('click', function () {
        $(this).toggleClass('open');
        $('.sensex-show').slideToggle(500);
        senslider.reloadSlider();
    });
    $('.topnav li').on('click', function(e) {
        $('.sensex-show').hide();
    });

    //Footer Slider
    $(".invest-title").click(function(){
        $(this).toggleClass("active");
        $(".invest-news").slideToggle("slow");
        $('.footer-acc').toggleClass("active");
    });

    //Dropdown with selectable Elements
    $(".dropdown-select .dropdown-menu li a").click(function () {
        var selText = $(this).text();
        $(this).parents('.dropdown-select').find('.dropdown-toggle').html(selText);
    });

    setTimeout(function(){
        introview().start();
    }, 500);

    //Toggle Card Options

    $('ul.gridview li:first-child .cardbg').find('.card-hover').animate({height: 'show'});
    $('.expandcard-expand').on('click', function () {
        //$('.card-hover:first(or :eq(0)').animate({height: 'show'});
        //$('.gridview li .card-hover:not(:first)').hide();
        $('.card-hover').animate({height: 'hide'});
        $(this).siblings('ul,.cardbg').find('.card-hover').animate({height: 'show'});
       /* setTimeout(function(){
         introview().start();
        }, 500);*/
    });


    $('.expandcard-overlay').on('click', function () {
        $(this).parents('.cardbg').find('.card-hover').animate({height: 'hide'});
    });

    //Amnouncement of topics
    $('.announcement a').on('click', function () {
        $('.announcement').slideUp();
        $('.header-section').removeClass('prelogin-header');
        $('.content-section').removeClass('content-alert');
        $('.navbar-collapse').addClass('mainnav-alert');
        $('.searchbar-mobile').addClass('search-alert');

    });

    //Filter Uncheck Checkboxes
    $(".innerpadfilter-btns .clearall").on('click',function () {
        var $filterlength = $(this).parents('ul').find('input:checkbox:checked').length;
        $(this).parents('.filteraccshow').siblings('.filter-head').find('.badge1').text($filterlength);
        $(this).parents('.filteraccshow').find('.icheckbox_minimal').removeClass('checked');
    });

    $('input.selectAll').on('ifToggled', function (event) {
        var chkToggle;
        $(this).is(':checked') ? chkToggle = "check" : chkToggle = "uncheck";
        $(this).parents("li").siblings().find('input.customcheckradio:not(.all)').iCheck(chkToggle);
    });

    $(document).on('click', function (e) {
        var p = $(e.target).closest('.mainnav').length;
        if (!p) {
            $('.info-details').hide();
            $('.sensex-icon').removeClass('open');
            $('.sensex-show').slideUp('slow');
        }
    });

    //Sort Selection
    $('.sort-order li a').on('click', function(){
        $(this).parents('li').siblings('li').find('a').removeClass('active');
        $(this).addClass('active');
    });

    // Sorting Functionality
    $('.sort-fn').on('click', function(){
        $(this).find('i').toggleClass('sortdown').toggleClass('sortup');
    });

    //Destroy Tooltip
    if ( $(window).width() < 780 ){
        $('#element').tooltip('destroy');
    }

    $('.sharecartwish-options li a span').on('click', function(){
        if ($('.sharecartwish-options li a span').hasClass('active')){
            $(this).addClass('active');
        }
    });


    //Grid List view Toggle
    $('.grid-icon').addClass('active');
    $('.gridlistview-sec a.grid-view').click(function() {
        $('.gridlistview-sec').removeClass('listview');
        $('.gridlistview-sec').addClass('gridview');
        $('.grid-icon').addClass('active');
        $('.list-icon').removeClass('active');
    });
    $('.gridlistview-sec a.list-view').click(function() {
        $('.gridlistview-sec').removeClass('gridview');
        $('.gridlistview-sec').addClass('listview');
        $('.list-icon').addClass('active');
        $('.grid-icon').removeClass('active');
    });

    //Toggle Respective Security questions in login
    $(".question-height li .checkkbox").on('ifChecked',function () {
        $(this).siblings('.login-answers').slideToggle();
        var $filterlength = $(this).parents('ul').find('input:checkbox:checked').length;
        $('.questsecure-modal').find('.question-selectnow span').text($filterlength);
        if($filterlength >= 5){
            $(':checkbox:not(:checked)').prop('disabled', true);
            $('.question-selectnow').css("color", "#169307");
        }
    });

    $(".question-height li .checkkbox").on('ifUnchecked',function () {
        $(this).siblings('.login-answers').slideToggle();
        $(this).siblings('.login-answers').find('input').val('');
        var $filterlength = $(this).parents('ul').find('input:checkbox:checked').length;
        $('.questsecure-modal').find('.question-selectnow  span').text($filterlength);
        if($filterlength < 5){
            $(':checkbox:not(:checked)').prop('disabled', false);
            $('.question-selectnow').css("color", "#000000");
        }
    });

    //Onboarding -- First OTP
    $('.send-firstotp').on('click', function(){
        $(this).parents('li').remove();
        $(this).parent('div').remove();
        $('.newotp-details').slideDown(500);
    });


    //OnBoarding -- Pre-OTP
    $('.aadhar-enter').on('change', function(){
        $('.pre-otp').show();
    });

    //OnBoarding -- Send OTP
    $('.send-opt').on('click', function(){
        $('.pre-otp,.opt-section').toggle();
    });

    //Validate OTP in Stage 1A -Onboarding
    $('.validate-otp').on('click', function(){
        $(this).parents('li').hide();
        $('.validate-next,.validated-otp').show();
    });

    //Change Mobile Number for OTP
    $('.changeotp-mnumber').on('click', function(){
        $('.stage1aotp,.validate-next').hide();
        $('.new-mobilenumber').show();
    });

    //Send OTP to Changed Mobile Number
    $('.validate-sendotp').on('click', function(){
        $(this).parents('li').hide();
        $('.changeotp-mnumber').hide();
        $('.stage1aotp').show();
    });

    $('.proceed-aadharotp').on('click', function(){
        $(this).parents('li').hide();
        $('.otpwith-aadhar').show();
    });


    //Change Mobile Number for OTP
    $('.change-pernumber').on('click', function(){
        $(this).parents('li').hide();
        $('.new-profilemobilenumber').show();
    });
    $('.validate-newsendotp').on('click', function(){
        $(this).parents('li').hide();
        $('.validate3otp').show();
    });
    $('.validate-newotp').on('click', function(){
        $(this).parents('li').hide();
        $('.validated-newotp').show();
    });


    $('.validate-otps').on('click', function(){
        $(this).parents('li').hide();
        $('.validated-otps').show();
    });


    //validate OTP
    $('.validate-otp').on('click', function(){
        $(this).parents('li').hide();
        $('.validated-otp,.show-signup,.validate-next').show();
        $('.new-mobilenumber,.show-sendotp').hide();
    });

    //Change Mobile Number for OTP
    $('.changeotp-mnumber').on('click', function(){
        $('.send-2otp').show();
        $('.mob2otp,.validate-next,.show-signup,.validate-next,.validate-otp,.newotp-details,.show-sendotp').hide();
        $('#input-phoneno').focus();
    });

    //Change Mobile Number for OTP with new mobile fiels
    $('.changeotp-mnumber-new').on('click', function(){
        $('.lcvalidate-sendotp,.new-mobilenumber').show();
        $('.mob2otp,.validate-next,.show-signup,.validate-next,.validate-otp,.stage1aotp,.show-sendotp').hide();
        $('#input-phoneno').focus();
    });

    //Change Mobile Number for OTP with new mobile fields
    $('.send-2otp').on('click', function(){
        /*$('.new-mobilenumber,.show-sendotp,.validate-otp,.pan-inputinfo').show();
         $('.mob2otp,.validate-next,.show-signup,.hide-error,.stage1aotp').hide();*/
        $('.validate-next,.pan-inputinfo,.stage1aotp,.validate-otp,.mob2otp,.changeotp-mnumber').show();
        $('.changeotp-mnumber-new,.new-mobilenumber,.send-2otp,.show-sendotp').hide();
        $('#input-phoneno').focus();
    });

    $('.stage1aotp .validate-otp').on('click', function(){
        $(this).parents('li').hide();
        $('.show-signup,.validate-sendotp,.pan-inputinfo').show();
        $('.changeotp-mnumber,.changeotp-mnumber-new,.new-mobilenumber,.mob2otp,.validate-otp,.show-sendotp').hide();
    });


    //Send OTP to Changed Mobile Number for Lead ge popup
    $('.lcvalidate-sendotp').on('click', function(){
        $(this).parents('li').hide();
        $('.show-signup,.new-mobilenumber,.hide-error,.validate-otp,.show-sendotp,.stage1aotp,.mob2otp,.changeotp-mnumber-new').show();
        $('.lcvalidate-sendotp,.hide-error,.validate-next,.validated-otp,.new-mobilenumber,.validate2').hide();
    });

    //Send OTP to Changed Mobile Number for Lead ge popup
    $('.validate2').on('click', function(){
        $(this).parents('li').hide();
        $('.show-signup,.hide-error,.validate-otp,.show-sendotp,.validate-next,.pan-inputinfo,.stage1aotp,.validated-otp').show();
        $('.changeotp-mnumber-new,.lcvalidate-sendotp,.hide-error,.new-mobilenumber,.validate2,.stagelead1otp,.mob2otp,.show-sendotp').hide();
    });

    //Send OTP in DIY POPUP
    $('.donot-displayotp').on('click', function(){
    $(this).parents('li').hide();
    $('.stage1aotp,.validate-otp').show();
    //$('.changeotp-mnumber-new,.lcvalidate-sendotp,.hide-error,.new-mobilenumber,.validate2,.stagelead1otp,.mob2otp,.show-sendotp').hide();
    });

    //Select image for password
    $('.user-pwds li').on('click', function(){
        $('li').removeClass('default-state');
    });

    //need assistance
    $('.need-assistance-mob,.close-need-assistance').on('click', function(){
        $('.need-assistance-open').toggle();
    });

    $('.queryFeedBack').change(function() {
        $('.resetpwd').hide();
        $('#' + $(this).val()).show();
    });

    //Close the attached proof
    $('.close-proof').on('click', function(){
        $(this).parents('tr').remove();
    });

    /*    //Masonary for auto card adjustment in articles
     var $grid = $('.gridnew').imagesLoaded( function() {
     $grid.masonry({
     itemSelector: '.grid-item',
     });
     });*/

    // To make Masonry in Tabs
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $(window).trigger("resize");
    });
    $(window).resize(function(){
        $this = $('.gridnew');
        $this.masonry({ itemSelector: '.content_block_row_wrap' });
    });

    //listing no of filter options selected
    $(".filteraccshow ul li label").on('ifChecked',function() {
        var $filterlength = $(this).parents('ul').find('input:checkbox:checked').length;
        $(this).parents('.filteraccshow').siblings('.filter-head').find('.badge1').text($filterlength);
    }).on('ifUnchecked',function() {
        var $filterlength = $(this).parents('ul').find('input:checkbox:checked').length;
        $(this).parents('.filteraccshow').siblings('.filter-head').find('.badge1').text($filterlength);
    });
    //Checkbox All to select all sibilings
    // $(".filteraccshow ul li .all-checked").on('ifChecked',function() {
    //     $(this).parents('li').siblings('li').find('label').iCheck('check');
    // }).on('ifUnchecked',function() {
    //     $(this).parents('li').siblings('li').find('label').iCheck('uncheck');
    // });

    //Security Questions funcitonality
    $(".question-height ul li label").on('ifChecked',function() {
        var $filterlength = $(this).parents('ul').find('input:checkbox:checked').length;
        $('.question-height').find('.question-selectnow').text($filterlength);
        if($filterlength > 5){
            $('.question-selected ').show();
        }else{
            $('.question-selected ').hide();
        }
    }).on('ifUnchecked',function() {
        var $filterlength = $(this).parents('ul').find('input:checkbox:checked').length;
        $('.question-height').find('.question-selectnow').text($filterlength);
        if($filterlength > 5){
            $('.question-selected ').show();
        }else{
            $('.question-selected ').hide();
        }
    });

    //Some Basic Functions
    $('.choose-similar').on('click', function(){
        $(this).parents('.allocation-results').find('.fundslist').slideToggle();
        $(this).find('.fa').toggleClass('fa-angle-right').toggleClass('fa-angle-down');
        $(this).parents('.main-portpolio').toggleClass('active');
    });


    // Allow to dropdown to stay when tabs are  used in it
    $(".notification-menu .notification-tabs ul li a").click(function(ev) {
        $("a.dropdown-notify").dropdown();
        return false;
    });

    //Funds Selections
    $('.fundSelections li a').on('click', function(){
        $(this).parent('li').siblings('li').removeClass('active');
        $(this).parent('li').addClass('active');
    });

    //Verify IFSC Code
    $('.proceed-verify').on('click', function(){
        $('.proceed-post,.proceed-pre').toggle();
    });

    $('.upload-doc').on('click', function(){
        $(this).find('.icon18').toggleClass('upload').toggleClass('delete');
        $(this).siblings('.upload-box').find('img').toggle();
    });

    //show preferences on click in on Boarding
    $('.click-onboard').on('click', function(){
        $('.pref-updates').slideToggle(500);
    });

    //Toggle for Options in Basket Details
    $('.customize-btrade').on('click', function(){
        $(this).parents('.basket-editmode').find('.editnoinput,.editinput').toggle();
        $(this).parents('.basket-editmode').find('.morest-input').slideToggle(500);
    });

    //Add another input for the same product in basketlist trade now
    $('.add-basketinput').on('click', function(){
        $('.demoedit').removeClass('no-border');
        $('.basket-new').show();
    });

    //Trade closing when closing reuired basket
    $('.trade-cancel').on('click', function(){
        $(this).parents('.basket-editmode').remove();
        var $basketlen = $('.basket-editopt>li').length;
        if($basketlen<=0){
            $('.proceed-alert,.quicksip-btn').toggle();
        }
    });

    $(".markettick").select2().change(function(){
        if ($(this).val() == "market" ) {
            $(this).parents('.in-formelements').siblings('.limitprice').hide();
            $(this).parents('.sentence-input').siblings('.input-forms').find('.limitprice').hide();
        } else {
            $(this).parents('.in-formelements').siblings('.limitprice').show();
            $(this).parents('.sentence-input').siblings('.input-forms').find('.limitprice').show();
        }
    });

    //Toggle for options in trade now popup of stock
    $('.options-link .more-popt').on('click', function(){
        $(this).parents('.options-link').find('.trade-forms .morest-input').slideToggle(500);
        /*        $(this).find('.more-popt').text( ($(this).text() == 'Show Less' ? 'Show More' : 'Show Less') );*/
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    });

    //Video Toogle option in video template
    $('.slider-action').click(function () {
        $(this).find('.video-py').toggleClass('fa-play').toggleClass('fa-pause');
        $(this).find('.play-video').text( ($(this).text() == 'Pause' ? 'Play' : 'Pause') );
    });

    //Replace Card Show
    $('.replace').click(function () {
        $('.showreplace').fadeIn(500);
        $('.fadeinlist').fadeOut(500);
    });

    //Show Inline Edit
    $('.edit-icon').click(function () {
        $('.showinputedit').show();
        $('.invest-edit-txt').hide();
        $('.edit-icon').hide();
        $('.save-icon').show();
    });
    //Hide Inline Edit
    $('.save-icon').click(function () {
        $('.showinputedit').hide();
        $('.invest-edit-txt').show();
        $('.save-icon').hide();
        $('.edit-icon').show();
    });

    //Express Interest Toggle Section
    $('.intrest-button').click(function () {
        $(this).siblings('.express-interest').slideToggle(500);
    });

    $('.hide-express').click(function () {
        $(this).parents('.express-interest').slideUp(500);
    });

    //Redefine Sort options in blog and other pages
    $('.brefinebylist li a').on('click', function(){
        $('.brefinebylist').find('li').removeClass('active')
        $(this).parents('li').addClass('active');
    });

    $(".cardhead > a").each(function(i){
        var len = $(this).text().length;
        if(len >= 44){
            $(this).text($(this).text().substr(0,44)+'...');
        }
    });

    //Close cart
    /*$('.clatclosebutton').on('click', function(){
     var $rowCount = $(this).closest('.company-cart').find('.carttable tr').length;
     $(this).parents('tr').remove();
     if($rowCount === 2){
     $('.removesection').hide();
     }else{}
     });
     $('.clatclosebutton').on('click', function(){
     var $rowCount = $(this).closest('.company-cart').find('.carttable tr').length;
     $(this).parents('tr').remove();
     if($rowCount === 2){
     $('.removesection1').hide();
     }else{}
     });
     $('.clatclosebutton').on('click', function(){
     var $rowCount = $(this).closest('.company-cart').find('.carttable tr').length;
     $(this).parents('tr').remove();
     if($rowCount === 2){
     $('.removesection2').hide();
     }else{}
     });
     $('.clatclosebutton').on('click', function(){
     var $rowCount = $(this).closest('.company-cart').find('.carttable tr').length;
     $(this).parents('tr').remove();
     if($rowCount === 2){
     $('.removesection3').hide();
     }else{}
     });
     $('.clatclosebutton').on('click', function(){
     var $rowCount = $(this).closest('.company-cart').find('.carttable tr').length;
     $(this).parents('tr').remove();
     if($rowCount === 2){
     $('.removesection4').hide();
     }else{}
     });

     */
    //blog search remove text on click clear icon

    //Magnific Popup
    var groups = {};
    $('.galleryItem').each(function() {
        var id = parseInt($(this).attr('data-group'), 10);

        if(!groups[id]) {
            groups[id] = [];
        }

        groups[id].push( this );
    });


    $.each(groups, function() {

        $(this).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            gallery: { enabled:true }
        })

    });

    //for magnific video popup
    $('.magnific-youtube, .magnific-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        preloader: false,
        fixedContentPos: false
    });

    //for audio play
    $('.article-audio').hide();
    $('.article-img.audio-artimg a.btn-custom-img').on('click', function(){
        $('.article-img.audio-artimg a.btn-custom-img').toggle();
//            document.getElementById('player').play();
        $('.players').trigger('play');
        $('.article-audio').toggle();
    });
    $('.article-audio a.audio-dismiss').on('click',function(){
        $('.article-img.audio-artimg a.btn-custom-img').toggle();
        $('.article-audio').toggle();
    });

    //remove card investment advisor
    $('.item-close').click(function () {
        $(this).parents('.allocation-results').fadeOut(500);
    });

    //Star Rating
    $('.rating-display').rating({displayOnly: true, step: 0.5});

    //Increment Decrement
    $("input[name='incdec']").TouchSpin({
        min: 0,
        max: 1000000000,
        stepinterval: 1,
        maxboostedstep: 1,
        buttondown_class: "icon24 icon-minus",
        buttonup_class: "icon24 icon-plus"
    });

    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    //Custom Checkbox
    $('.customcheckradio').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal'
    });
    $('.customcheckradio-stream').iCheck({
        checkboxClass: 'icheckbox_minimal-stream',
        radioClass: 'iradio_minimal-stream'
    });


    //Checkall
    $("#checkall").change(function () {
        $("input:checkbox").prop('checked', $(this).prop("checked"));
    });

    //MF Quick SIP valid till cancelled
    $('input[id="input-v1"]').on('ifChecked', function () {
        $(this).parents('li.marrnone').find("#input-m1").prop('disabled', true).val("");
    }).on('ifUnchecked', function () {
        $(this).parents('li.marrnone').find("#input-m1").prop('disabled', false);
    });

    //select mandate depend on bank selection
    $(document).ready(function() {
        $('.box').hide(); //hide
        $('.hdfc').show(); //set default class to be shown here, or remove to hide all
    });
    $('select.select-frequency').change(function() { //on change do stuff
        $('.box').hide(); //hide all with .box class
        $('.' + $(this).val()).show(); //show selected option's respective element
    });

    $(".checksub").click(function () {
        var $maincheck = $(this).find('.icheckbox_minimal');

        if ($maincheck.hasClass('checked')) {
            $(this).parent().addClass('active');
            $(this).parents('.cart-row').find('.final-value2').addClass('active');
        }
        else {
            $(this).parent().removeClass('active');
            $(this).parents('.cart-row').find('.final-value2').removeClass('active');
        }
    });

    //Home page Radio check uncheck label color change
    $('.hmradio').on('ifChecked', function () {
        $(this).find('.agelimit').addClass('changecolor');
    });

    $('.hmradio').on('ifUnchecked', function () {
        $(this).find('.agelimit').removeClass('changecolor');
    });

    //Login popups noscroll removal
    $(document).click(function (e) {
        var p = $(e.target).closest('.modal-content').length;
        if (!p) {
            $('body').removeClass('noscroll');
        }
    });
    $('.close').on('click', function(){
        $('body').removeClass("noscroll");
    });

    //Menu open Body scroll none
    if ($(window).width() <= 960) {
        $('.topnav li').click(function () {
            $('body').toggleClass('noscroll');
        });
        $('.navbar-toggle').click(function () {
            $('.filter-pos').toggleClass('redindex');
            $('body').toggleClass('posscroll');
        });
        /*        $('.user-details img').click(function () {
         $('body').addClass('posscroll');
         });*/
        $('.header-profile').mouseleave(function(){
            $('body').removeClass('posscroll');
        }).mouseenter(function(){
            $('body').addClass('posscroll');
        });
    }


    $('.mfnavlist').click(function () {
        var listcount = $(".mfnavextlink li").length;

        if (listcount == 1) {
            $('.mfnavextlink li').addClass('navextone');
        }
        else if (listcount == 2) {
            $('.mfnavextlink li').addClass('navexttwo');
        }

        else if (listcount == 3) {
            $('.mfnavextlink li').addClass('navextonethree');
        }
        else{
            $('.mfnavextlink li').addClass('navexfour');
        }
    });

    //Toggle the dropdown of notification and making tabs to work in header
    $('.notification-menu a[data-toggle="tab"]').click(function (e) {
        e.stopPropagation();
        $(this).tab('show')
    });

    $('.keep-open').on({
        "shown.bs.dropdown": function() { $(this).attr('closable', false); },
        "click":             function() { },
        "hide.bs.dropdown":  function() { return $(this).attr('closable') == 'true'; }
    });

    $('.keep-open > a').on({
        "click": function() {
            $(this).parent().attr('closable', true );
        }
    })


    // Back To Top
    $(window).scroll(function () {
        if ($(this).scrollTop() < 100) {
            $('#backtotop,.backtotop').fadeOut();
        } else
        {
            $('#backtotop,.backtotop').fadeIn();
        }
    });
    $('#backtotop,.backtotop').on('click', function () {
        $('html, body').animate({scrollTop: 0});
        return false;
    });



    //Intrested plans thanq message show
    $('.reqcplan').on('click', function () {
        $('.thanreq').show();
        $('.reqcplan').hide();
    });

    //Pre Password  in 2nd time login
    $('.pre-password .user-pwds label').on('click', function(){
        $('.pre-password,.pre-pwd').hide();
        $('.post-input').addClass('post-input1');
        $('.post-link').addClass('post-link1');
    });

    $('.pre-pwd').on('click', function(){
        $('.click-pwdimag').addClass('error-pwd');
    });

    $('.backlogin').on('click', function(){
        $('.pre-password,.pre-pwd').show();
        $('.post-input').removeClass('post-input1');
        $('.post-link').removeClass('post-link1');
        $('.pre-password').find('#pwd1').removeAttr('checked');
    });

    //Non Trading Login Flows
    $('.nonTradeoption .pan-switch').on('ifChecked',function(){
        $('.pan-dob').toggle();
    });
    $('.nonTradeoption .dob-switch').on('ifChecked',function(){
        $('.pan-dob').toggle();
    });


    //Cart Funcitonalities
    $('.remove-prod').on('click', function(){
        $(this).parents('.row-eq-height').remove();
        var $cartlength = $('.company-cart').find('.row-eq-height').length;
        /*        if($cartlength <=5 ){
         window.location.href = "index.html";
         }*/
    });

    $('.wishlist-cart').on('click', function(){
        $(this).find('span').text() =='Add to Wishlist' ? 'Remove from Wishlist' : 'Add to Wishlist';
    });

    $(".company-cart .checksub").on('ifChecked',function () {
        $(this).parents('.row-eq-height').find('.final-value2').addClass('active');
    });
    $(".company-cart .checksub").on('ifUnchecked',function () {
        $(this).parents('.row-eq-height').find('.final-value2').removeClass('active');
    });

    $(".company-cart .checkmain").on('ifChecked',function () {
        $('.final-value2').addClass('active');
        $(".company-cart .checksub").iCheck('check');
    });

    $(".company-cart .checkmain").on('ifUnchecked',function () {
        $('.final-value2').removeClass('active');
        $(".company-cart .checksub").iCheck('uncheck');
    });

    //Open respective meter based on radio options
    $('.risk-aplist li .apradio1').on('ifChecked', function(){
        $('.risk').hide();
        $('.risk1').show();
    });
    $('.risk-aplist li .apradio2').on('ifChecked', function(){
        $('.risk').hide();
        $('.risk2').show();
    });
    $('.risk-aplist li .apradio3').on('ifChecked', function(){
        $('.risk').hide();
        $('.risk3').show();
    });

    //Year Selection in Wealth Designer
    $('.yearselector-slider li a').on('click', function(){
        $('.yearselector-slider li a').removeClass('active');
        $(this).addClass('active');
    });

    //Add attributes to cart
    /*    $('.add-attribute').on('click', function(){
     $(this).parents('li').prepend('<li class="marginb30"><select class="select" data-placeholder="Attributes"><option></option><option>Attributes - 1</option><option>Attributes - 2</option><option>Attributes - 3</option></select></li>');
     });*/

    //center Modal
    $('.modal').on('show.bs.modal', centerModals);
    $(window).on('resize', function() {
        $('.modal:visible').each(centerModals);
    });


    //Fetched Data Show
    $('.fetcheddatashow').click(function () {
        $('.aadar-fetcheddetails,.address-manual,.onboardinfoedit1').show();
        $('.aadar,.fetcheddatashow').hide();
    });

    //Manullay input the data of address details
    $('.modify-fetcheddata').click(function () {
        $('.aadar-fetcheddetails,.manual').toggle();
        $('.inforadios li').trigger('click');
    });

    $('.inforadios li label').click(function () {
        $(this).trigger('click');
        $('.aadar-fetcheddetails,.manual').toggle();
    });


    //Onboarding Products Choosing Options--Currencies Charges, -- Commodities Charges, --same as correspondance address
    $('.currencies-section label input[type="checkbox"]').on('ifChecked', function () {
        $('.currencyinfo').slideDown();
    }).on('ifUnchecked', function () {
        $('.currencyinfo').slideUp();
    });
    $('.commodities-section label input[type="checkbox"]').on('ifChecked', function () {
        $('.commodityinfo').slideDown();
    }).on('ifUnchecked', function () {
        $('.commodityinfo').slideUp();
    });

    $('.sameaddress input[type="checkbox"]').on('ifChecked', function () {
        $('.same-addresslocation').find('.same-add').slideUp();
    }).on('ifUnchecked', function () {
        $('.same-addresslocation').find('.same-add').slideDown();
    });

    $('.newaddress input[type="checkbox"]').on('ifChecked', function () {
        $('#new-address').modal('show');
        $('.info-edit-mode,.info-view-mode').toggle();
    }).on('ifUnchecked', function () {
        $('.info-edit-mode,.info-view-mode').toggle();
    });

    $('.addnew-address').on('click', function(){
        $('.new-add').slideToggle();
    });

    $('#valid-aadhar').blur(function()
    {
        if( $(this).val() == '' ) {
            $('.proceed-withfilling,.info-edit-mode').show();
            $('.proceed-withoutfilling,.info-view-mode,.newaddressarea').hide();
        }else{
            $('.proceed-withfilling,.info-edit-mode').hide();
            $('.proceed-withoutfilling,.info-view-mode,.newaddressarea').show();
        }
    });

    /*Aadhar Process*/
    $('.proceedto-aconset').on('click', function () {
        $(this).parents('.wizard-btns').hide();
        $('.aadar-conset').slideDown(500);
    });

    /*Authorize Reliance Process*/
    $('.authorize-reliance').on('click', function () {
        $('.proceed-withfilling,.info-edit-mode').hide();
        $('.proceed-withoutfilling,.info-view-mode,.newaddressarea').show();
    });

    $('.choosencate input[type="radio"]').on('ifChecked', function () {
        $(this).parents('li').siblings('.sub-add').slideDown();
    }).on('ifUnchecked', function () {
        $(this).parents('li').siblings('.sub-add,.sub-action').slideUp();
    });

    $('.choo-paction input[type="radio"]').on('ifChecked', function () {
        $(this).parents('li').siblings('.sub-action').slideDown();
    }).on('ifUnchecked', function () {
        $(this).parents('li').siblings('.sub-action').slideUp();
    });

    //Dont Know IFSC Code -- Show lookup Inputs
    $('.lookup-ifsc').on('click', function(){
        $('.bankdetails-lookup').slideDown();
    });

    //Dont Know IFSC Code -- Show lookup Options
    $('#brlocation').select2().on('change', function() {
        minimumResultsForSearch: -1;
        $('.bankdetails-table').show();
    });

    //Add additional Copy for address
    $('.add-addcopy').on('click', function(){
        $(this).hide();
        $(this).siblings('.main-addcopy').addClass('additional-copy');
        $(this).siblings('.second-addcopy').show();
    });

    //Add More For insurance health
    $('.addmore-hi').on('click', function(){
        $('.showmoresd').show();
    });
    $('.close-son').on('click', function(){
        $('.showmoresd').hide();
    });

    //Add More For insurance health
    $('.addmore-hi1').on('click', function(){
        $('.showmoresd1').show();
    });
    $('.close-dtr').on('click', function(){
        $('.showmoresd1').show();
    });

    //Show More / Less Functionality for management CEO
    $('.show-more').click(function() {
        if($('.show-more-snippet').css('height') != '150px'){
            $('.show-more-snippet').stop().animate({height: '150px'}, 200);
            $(this).text('Show More >>');
        }else{
            $('.show-more-snippet').css({height:'100%'});
            var xx = $('.show-more-snippet').height();
            $('.show-more-snippet').css({height:'150px'});
            $('.show-more-snippet').stop().animate({height: xx}, 400);
            $(this).text('Show Less <<');
        }
    });


    //Submit Incomplete Form
    $('.submit-inform').on('click', function(){
        $('.incomplete-alert,.pacs').hide();
        $('.profileaddresschangestep4').show();
    });

    //Pay via bank option
    $('input[name="payment-mode"]').on('ifChecked',function () {
        if($(this).val() === "ledger"){
            $('.pay-via-bank-option').slideUp();
            $('.create-mandate, .bank-details').slideUp();
        }
        else if($(this).val() === "bank"){
            $('.pay-via-bank-option').slideDown();
        }
    });

    //After Aadhar Alert
    $('.aadhar-atbtn').on('click', function(){
        $(this).hide();
        $('.aadhar-alert,.after-aadharop').show();
    });

    //Disable Email for self
    $('.self-emailattribute input[type="radio"]').on('ifChecked', function () {
        $('.self-emaildisable').hide();
    }).on('ifUnchecked', function () {
        $('.self-emaildisable').show();
    });


    //Disable Mobilenumber for self
    $('.self-mobileattribute input[type="radio"]').on('ifChecked', function () {
        $('.self-mobdisable').hide();
    }).on('ifUnchecked', function () {
        $('.self-mobdisable').show();
    });

    //Show More Preferences
    $('.view-morepref').on('click', function(){
        $(this).parents('.pref-options').siblings('.intrestedsegments').slideDown();
    });

    $('.nomineeaddress input[type="checkbox"]').on('ifChecked', function () {
        $('.nominee-aaddress').find('.nominee-add').slideUp();
    }).on('ifUnchecked', function () {
        $('.nominee-aaddress').find('.nominee-add').slideDown();
    });

    $('.differntadd input[type="radio"]').on('ifChecked', function () {
        $('.differa-addres').find('.diff-add').slideDown();
    }).on('ifUnchecked', function () {
        $('.differa-addres').find('.diff-add').slideUp();
    });

    $('.nriaddress input[type="radio"]').on('ifChecked', function () {
        $(this).parents('li').siblings('.nri-add').slideDown();
    }).on('ifUnchecked', function () {
        $(this).parents('li').siblings('.nri-add').slideUp();
        $('.differntadd input[type="radio"]').iCheck('uncheck');
    });


    $('.guardianaddress input[type="checkbox"]').on('ifChecked', function () {
        $('.guardian-address').find('.guardian-add').slideUp();
    }).on('ifUnchecked', function () {
        $('.guardian-address').find('.guardian-add').slideDown();
    });

    $('.termsproceed input[type="radio"]').on('ifChecked', function () {
        $('#alert-proceed').modal('show');
    });

    //Married Girl Status - Reflect of maiden name
    $('.female-selected input[type="radio"]').on('ifChecked', function () {
        $('.married-wselect').slideDown();
    }).on('ifUnchecked', function () {
        $('.married-wselect').slideUp();
    });

    $('.married-selected input[type="radio"]').on('ifUnchecked', function () {
        $('.married-wselect').slideUp();
    });

    //Insurance Advisor Flow
    $('.insurance-options .fundSelections li a').on('click', function() {
        var $insurOpt = $(this).data("title");
        $(".insureflows").attr("title",$insurOpt);
    });

    //Stock Details Options Table Cells coloring
    $('.stock-table tbody tr.selected-calls').find('td:lt(11):gt(0)').addClass('td-yellow');
    $('.stock-table tbody tr.selected-puts').find('td:lt(22):gt(11)').addClass('td-yellow');


    //Insurance Information Inaccurate
    $('.info-inaccurate').on('click', function(){
        $('.profileaddresschangestep3,.profileaddresschangestep4').toggle();
    });

    $('.mbinsure-table .memno').on('ifChecked', function () {
        $(this).parents('tr').find('.input-standard').show();
    }).on('ifUnchecked', function () {
        $(this).parents('tr').find('.input-standard').hide();
    });


    $('.member-dat .memno').on('ifChecked', function () {
        $(this).siblings('.in-formelements').show();
    }).on('ifUnchecked', function () {
        $(this).siblings('.in-formelements').hide();
    });

    // Medical History
    $('.medihistory .medical-his').on('ifChecked', function () {
        $('#medi-history').modal('show');
    }).on('ifUnchecked', function () {
        $('#medi-history').modal('hide');
    });

    //PAN Number verification
    $( ".pan-verprocess" ).change(function() {
        $('.loader-info').fadeIn().delay(500).fadeOut(1000);
        $('.loadingdata-type').text("PAN Number");
        $('.pan-verified1').show(1510);
        setTimeout(function(){
            $('#paninformation').modal('show');
        }, 2000);
    });

    //PAN Number verification
    $( ".redirection" ).click(function() {
        $('.loader-info').fadeIn().delay(1000).fadeOut(2000);
        $('.loadingdata-type').text("Request");
        $('.pan-verified1').show(2510);
        /*        setTimeout(function(){
         $('#paninformation').modal('show');
         }, 3000);*/
    });

    // enale disable bank details and create mandate ID
    $(".select-mandate").change(function () {
        if ($(this).val() == "new-mandate") {
            $('.bank-details').hide();
            $('.create-mandate').show();
        }
        else {
            $('.bank-details').show();
            $('.create-mandate').hide();
        }
    });

    //portfolio-dropdown Show respective Modal window
    $(".portfolio-dropdown").change(function () {
        if ($(this).val() == "add") {
            $('#addPopup').modal('show');
        }
        if ($(this).val() == "purchase") {
            $('#purchasePopup').modal('show');
        }
        if ($(this).val() == "redeem") {
            $('#redeemPopup').modal('show');
        }
        if ($(this).val() == "stp") {
            $('#stpPopup').modal('show');
        }
        if ($(this).val() == "switch") {
            $('#switchPopup').modal('show');
        }
        if ($(this).val() == "swp") {
            $('#swpPopup').modal('show');
        }
    });

    //Modal open autofocus field
    $('#login1').on('shown.bs.modal', function () {
        $('#input-r12').focus();
    });
    $('#setpwdn').on('shown.bs.modal', function () {
        $('#input-pwd1').focus();
    });
    $('#preset-pwd').on('shown.bs.modal', function () {
        $('#input-rp1').focus();
    });
    $('#secquestn').on('shown.bs.modal', function () {
        $('#input-s3').focus();
    });
    $('#stocktrade').on('shown.bs.modal', function () {
        $('#incdec11').focus();
    });

    //KRA Verification
    $('.intial-data').select().change(
        function(){
            $('.loader-info').fadeIn().delay(500).fadeOut(1000);
            $('.loadingdata-type').text("KRA");
            $('.kra-verified').show(1510);
        }
    );

    //On board complete incomplete profile
    $('.onboard-message').on('click', function(){
        $('.profileaddresschangestep1').hide();
        $(this).hide();
    });


    //All plugin Callbacks
    //Progress Bar
    $(".progressbar").progressbar({
        value: 50
    });




    //Homepage Click div show
    $('.meetexpert-view').on('click', function() {
        $(this).toggleClass('active');
        $(this).closest('.flyoutsec-show').find('.expert-view').slideToggle(500);
        $('.flyout-bg').toggleClass('open');
    });
    //Homepage Click div show
    $('.close-flyout').on('click', function() {
        $(this).closest('.flyout-bg').find('.expert-view').slideUp(500);
        $('.flyout-bg').removeClass('open');
        $('.meetexpert-view').removeClass('active');
        event.preventDefault();
    });

    //Owl Carousel For Sensex Slider
    $('.yearselector-slider').owlCarousel({
        loop:true,
        navigation: true,
        nav: true,
        navText: ["<i class='icon14 nav-left'></i>","<i class='icon14 nav-right'></i>"],
        responsive:{
            0:{
                items:4
            },
            768:{
                items:7
            },
            1024:{
                items:10
            }
        }
    });

    //Owl Carousel For Wealth Design Slider
    $('.wealthslider').owlCarousel({
        loop:true,
        margin:13,
        navigation: true,
        nav: true,
        navText: ["<i class='icon14 nav-left'></i>","<i class='icon14 nav-right'></i>"],
        responsive:{
            0:{
                items:1
            }
        }
    });

    //Owl Carousel For Template Slider
    $('.templateslider').owlCarousel({
        loop:true,
        margin:10,
        navigation: true,
        nav: true,
        navText: ["<i class='control-img icon-prev'></i>","<i class='control-img icon-next'></i>"],
        responsive:{
            1000:{
                items:4
            },
            1330:{
                items:6
            },
            1580:{
                items:8
            },
            1920:{
                items:12
            }
        }
    });

    //Owl Carousel For Video options
    $('.videoslider').owlCarousel({
        loop:true,
        margin:15,
        navigation: true,
        nav: true,
        navText: ["<i class='control-img icon-prev'></i>","<i class='control-img icon-next'></i>"],
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    //Custom Select
    $(".select").select2({
        minimumResultsForSearch: -1,
        placeholder: function () {
            $(this).data('placeholder');
        }
    })/*.on("select2:open", function () {
     $('.select2-results__options').niceScroll();
     })*/;


    /*    //Auto Height
     $('.stock-list .filter-head').on('click', function() {
     $(".stock-list .gridlistview-sec").css("min-height", $(this).parents('.sort-filter')[0].scrollHeight);
     });*/
    /*var scrollPos = 0;
     $('.modal')
     .on('show.bs.modal', function (){
     scrollPos = $('body').scrollTop();
     $('body').css({
     overflow: 'hidden',
     top : -scrollPos
     });
     })
     .on('hide.bs.modal', function (){
     $('body').css({
     overflow: '',
     top: ''
     }).scrollTop(scrollPos);
     });*/


    //Date Picker
    $(".datepicker").datepicker({
        showOn: "button",
        buttonImage: "assets/images/calendar.png",
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'd M, y'
    });
    //Date Picker
    $(".datepicker-blue").datepicker({
        showOn: "button",
        buttonImage: "assets/images/calender-blue.png",
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'd M, y'
    });

    //Range Slider
    /*Price Slider*/
    $(".price-slider").slider({
        range: true,
        min:100,
        max:10000,
        step:100,
        values: [100, 75000 ],
        slide: function (event, ui) {
            $('.amount').val(ui.values[0]);
            $('.amount1').val(ui.values[1]);
        }
    });
    $(".amount").val( $(".price-slider").slider("values",0));
    $(".amount1").val( $(".price-slider").slider("values",1));

    /*Volume Slider*/
    $(".vol-slider").slider({
        range: true,
        min:50000,
        max:200000,
        step:100,
        values: [50000, 100000 ],
        slide: function (event, ui) {
            $('.vol1').val(ui.values[0]);
            $('.vol2').val(ui.values[1]);
        }
    });
    $(".vol1").val( $(".vol-slider").slider("values",0));
    $(".vol2").val( $(".vol-slider").slider("values",1));

    /*Market Cap Slider*/
    $(".cap-slider").slider({
        range: true,
        min:50000,
        max:200000,
        step:100,
        values: [50000, 100000 ],
        slide: function (event, ui) {
            $('.cap1').val(ui.values[0]);
            $('.cap2').val(ui.values[1]);
        }
    });
    $(".cap1").val( $(".cap-slider").slider("values",0));
    $(".cap2").val( $(".cap-slider").slider("values",1));

    /*Price Slider*/
    $( ".slider-range-min" ).slider({
        range: "min",
        min:1000,
        max: 100000,
        step:10,
        value:40000,
        slide: function( event, ui ) {
            $( ".input-sipamt" ).val( ui.value );
        }
    });

    $( ".slider-range-minns" ).slider({
        range: "min",
        min:1000,
        max: 100000,
        step:10,
        value:40000,
        slide: function( event, ui ) {
            $( ".input-sipamt" ).val( ui.value );
        }
    });

    $( ".input-sipamt" ).val( $( ".slider-range-min" ).slider( "value") );

    $( ".input-sipamt" ).on("change", function() {
        $( ".slider-range-min" ).slider( "value", this.value );
    });

    /*Volume Slider*/
    $(".vol-slider").slider({
        range: true,
        min:50000,
        max:200000,
        step:100,
        values: [50000, 100000 ],
        slide: function (event, ui) {
            $('.vol1').val(ui.values[0]);
            $('.vol2').val(ui.values[1]);
        }
    });
    $(".vol1").val( $(".vol-slider").slider("values",0));
    $(".vol2").val( $(".vol-slider").slider("values",1));

    /*Market Cap Slider*/
    $(".cap-slider").slider({
        range: true,
        min:50000,
        max:200000,
        step:100,
        values: [50000, 100000 ],
        slide: function (event, ui) {
            $('.cap1').val(ui.values[0]);
            $('.cap2').val(ui.values[1]);
        }
    });
    $(".cap1").val( $(".cap-slider").slider("values",0));
    $(".cap2").val( $(".cap-slider").slider("values",1));


    // center modal
    function centerModals(){
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }

    //Accordian Functionality for Toggling
    function toggleIcon(e) {
        $(e.target).prev('.panel-heading').find(".more-less").toggleClass('accordian-plus accordian-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);



    //FAQ Collapse All Expand All
    $('#accShow').on('click', function() {
        $('.faqacc .collapse').each(function (index) {
            $(this).collapse("toggle");
        });
        $(this).text( ($(this).text() == 'COLLAPSE All' ? 'EXPAND All' : 'COLLAPSE All') );
    });

    //IE9 Place Holder Enable
    $(function() {
        $('.searchbar input, input')
    });

    //Enabling a div on checking Radio Button
    $(".mfUnits").on('ifChecked',function () {
        if($(this).val() === "folio"){
            $(this).closest('ul.sipformlist').find('.folio-number').find('select').attr("disabled", false);
            $(this).closest('ul.sipformlist').find('.folio-number').find('select').removeClass("disabled");
        }
        else {
            $(this).closest('ul.sipformlist').find('.folio-number').find('select').attr("disabled", true);
            $(this).closest('ul.sipformlist').find('.folio-number').find('select').addClass("disabled");
        }
    });

    //Enabling a div on checking Radio Button
    $(".exchange-class").on('ifChecked',function () {
        if($(this).val() === "Dividend"){
            $(this).closest('ul.sipformlist').find('.showradiodiv').find('input[type="radio"]:visible').attr("disabled", false);
            $(this).closest('ul.sipformlist').find('.showradiodiv').find('.iradio_minimal').removeClass("disabled");
            $(this).closest('ul.sipformlist').find('.dissablegrowth').removeClass("dissabled-clr");

        }
        else {
            $(this).closest('ul.sipformlist').find('.showradiodiv').find('input[type="radio"]:visible').attr("disabled", true);
            $(this).closest('ul.sipformlist').find('.showradiodiv').find('.iradio_minimal').addClass("disabled");
            $(this).closest('ul.sipformlist').find('.dissablegrowth').addClass("dissabled-clr");
        }
    });

    //Redeem All unit and all amount
    $('input[name="exchange-sip"],input[name="switch"]').on('ifChecked',function () {
        if($(this).val() === "unit"){
            $('.unit-redeem').css("display", "inline-block");
            $('.amount-redeem').css("display", "none");
            $('.unit-redeem-all').css("display", "inline-block");
            $('.amount-redeem-all').css("display", "none");
            $('.partial-unit').css("display", "none");
            $('.partial-amount').css("display", "none");


        }
        else {
            $('.unit-redeem').css("display", "none");
            $('.amount-redeem').css("display", "inline-block");
            $('.amount-redeem-all').css("display", "inline-block");
            $('.unit-redeem-all').css("display", "none");
            $('.partial-unit').css("display", "none");
            $('.partial-amount').css("display", "none");
        }
    });

    //Unit selection Sentence
    $('input[name="selectunit"],input[name="switchAmt"]').on('ifChecked',function () {
        if($(this).val() === "all"){
            $('.unit-redeem-all').css("display", "inline-block");
            $('.amount-redeem-all').css("display", "none");
            $('.partial-unit').css("display", "none");
            $('.partial-amount').css("display", "none");
        }
        else {
            $('.unit-redeem-all').css("display", "none");
            $('.amount-redeem-all').css("display", "none");
            $('.partial-unit').css("display", "inline-block");
            $('.partial-amount').css("display", "none");
        }
    });

    //Amount selection sentence
    $('input[name="selectamt"],input[name="switchAmt"]').on('ifChecked',function () {
        if($(this).val() === "all"){
            $('.unit-redeem-all').css("display", "none");
            $('.amount-redeem-all').css("display", "inline-block");
            $('.partial-unit').css("display", "none");
            $('.partial-amount').css("display", "none");
        }
        else {
            $('.unit-redeem-all').css("display", "none");
            $('.amount-redeem-all').css("display", "none");
            $('.partial-unit').css("display", "inline-block");
            $('.partial-amount').css("display", "none");
        }
    });

    //Enabling a div on checking selecting scheame type
    $('input[name="siptype"]').on('ifChecked',function () {
        if($(this).val() === "amount"){
            $('.siptype-amt').css("display", "inline-block");
            $('.siptype-qty').css("display", "none");
        }
        else {
            $('.siptype-qty').css("display", "inline-block");
            $('.siptype-amt').css("display", "none");
        }
    });

    //Enabling a div on checking selecting scheame type
    $(".select-scheme").change(function () {
        if($(this).val() === "Dividend"){
            $(this).closest('ul.sipformlist').find('.showradiodiv').find('input[type="radio"]:visible').attr("disabled", false);
            $(this).closest('ul.sipformlist').find('.showradiodiv').find('.iradio_minimal').removeClass("disabled");
            $(this).closest('ul.sipformlist').find('.dissablegrowth').removeClass("dissabled-clr");

        }
        else {
            $(this).closest('ul.sipformlist').find('.showradiodiv').find('input[type="radio"]:visible').attr("disabled", true);
            $(this).closest('ul.sipformlist').find('.showradiodiv').find('.iradio_minimal').addClass("disabled");
            $(this).closest('ul.sipformlist').find('.dissablegrowth').addClass("dissabled-clr");
        }
    });

    //MF quick SIP growth
    $(".mflumsum").change(function(){
        if ($(this).val() == "growth" ) {
            $(this).parents('.in-formelements').siblings('.limitprice').hide();
        } else {
            $(this).parents('.in-formelements').siblings('.limitprice').show();
        }
    });

    //edit email option
    $('input[name=editEmail]').on('ifChecked',function () {
        if($(this).val() === "no"){
            $(this).parents('li.marginb30').siblings(".edit-email-trigger").slideDown();
        }
        else {
            $(this).parents('li.marginb30').siblings(".edit-email-trigger").slideUp();
        }
    });

    $('input[name=relationship]').on('ifChecked',function () {
        if(this.checked){
            $(this).parents('li.marginb30').siblings('.sentence-input').find('span').text($(this).val());
        }
    });

    //edit Mobile  Number option
    $('input[name=editMobileNumber]').on('ifChecked',function () {
        if($(this).val() === "no"){
            $(this).parents('li.marginb30').siblings(".mobile-number-trigger").slideDown();
        }
        else {
            $(this).parents('li.marginb30').siblings(".mobile-number-trigger").slideUp();
        }
    });

    $('input[name=relationship1]').on('ifChecked',function () {
        if(this.checked){
            $(this).parents('li.marginb30').siblings('.sentence-input').find('span').text($(this).val());
        }
    });

    //First Installment Checkbox
    $('#input-l25').on('ifChecked',function () {
        $(this).parents('label').siblings('p.text-alert').slideDown();
    });
    $('#input-l25').on('ifUnchecked',function () {
        $(this).parents('label').siblings('p.text-alert').slideUp();
    });


    /*$(".select-bank-class").on('ifChecked',function () {
     if($(this).val() === "idbi"){
     $(this).parentsUntil('li').find('.mandate-class').show().sibling().find('.mandate-class').hide();
     }
     else {
     $(this).parentsUntil('li').find('.mandate-class').show().sibling().find('.mandate-class').hide();
     }
     });*/

    //Mandate ID generation
    $(".submit-mandate").click(function(){
        $(this).hide();
        $('.btn-back').hide();
        $('.submit-mandate').hide();
        $('.mandatID').show();
        $('.done-mandate').show();
    });

    //Enabling a div on checking Radio Button
    $(".exchange-class1").on('ifChecked',function () {
        if($(this).val() === "physical"){
            $('.physical').show();
            $('.electronic').hide();
            /*$('#input-ma').prop('disabled', false).val("50000");*/

        }
        else if ($(this).val() === "electronic") {
            $('.electronic').show();
            $('.physical').hide();
            /*$('#input-ma').prop('disabled', true).val("");*/
        }
    });

    //Enabling a div on checking Radio Button
    $("#mandateID").change(function(){
        $(this).find("option:selected").each(function(){
            if($(this).val() === "physical"){
                $('.physical').show();
                $('.electronic').hide();
                /*$('#input-ma').prop('disabled', false).val("50000");*/

            }else if ($(this).val() === "electronic") {
                $('.electronic').show();
                $('.physical').hide();
                /*$('#input-ma').prop('disabled', true).val("");*/
            }
        });
    }).change();

    /*$(".sort-filter").stick_in_parent({
        recalc_every: 1
    });*/
    $(".sort-filter").stick_in_parent();

    $(".compare-head-sticky").stick_in_parent({
        parent: ".container",
        offset_top: 40,
    });

    //Instant Pay Toggle
    $(".paynowlist li a").click(function(){
        $('.paynowlist li a').removeClass('active');
        $(this).addClass('active');
    });

    //Browser History Back
    $(".history-back").click(function () {
        window.history.back();
    });

    //for text truncate
    $("#announcements .announcementCard h6, #pressrelease h5.article-head").each(function(){
        if ($(this).text().length > 85) {
            $(this).text($(this).text().substr(0, 85));
            $(this).append('...');
        }
    });

    //PProfile Details name Number Edit
    $('.edit-save-profdet').on('click', function(){
        $(this).closest('.profiler-detaillist li').find('.editnoinput,.editinput').toggle();
        $(this).find('i').toggleClass('trade-tick').toggleClass('trade-edit');
    });

    //Preview the uploaded file
    $(".input-upload").fileinput({'showUpload':false, 'previewFileType':'any'});

    //Toggle for options in Management Team
    $('.showmoremanage a').on('click', function () {
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        $(this).siblings(".text").toggleClass("moretxt-show");
        if ($(this).find('.more-popt').text() == "Read Less")
            $(this).find('.more-popt').text("Read More");
        else
            $(this).find('.more-popt').text("Read Less");
    });

    /*Equilize Heights*/
    $.fn.equalizeHeights = function(){
        return this.height( Math.max.apply(this, $(this).map(function(i,e){ return $(e).height() }).get() ) )
    }

    /*Bolg Customer care*/
    $(".state").select2({
    })

    $(".city").select2({
    })

    //Tags Cloud selection show more show less
    $('ul.tags-section').each(function(){
        var $ul = $(this),
            $lis = $ul.find('li:gt(15)'),
            isExpanded = $ul.hasClass('expanded');
        $lis[isExpanded ? 'show' : 'hide']();

        if($lis.length > 0){
            $ul
                .append($('<li class="expand"><a href="javascript:void(0);" class="blue-txt">' + (isExpanded ? 'Less Tags' : 'More Tags') + '</a></li>')
                    .click(function(event){
                        var isExpanded = $ul.hasClass('expanded');
                        event.preventDefault();
                        $(this).text(isExpanded ? 'More Tags' : 'Less Tags');
                        $ul.toggleClass('expanded');
                        $lis.toggle();
                    }));
        }
    });

    //Sector family Search block
    var sector = [{ id: 0, text: 'Tata capital' }, { id: 1, text: 'Reliance Capital' }, { id: 2, text: 'Bajaj Capital' }, { id: 3, text: 'Zee Entertainment' }, { id: 4, text: 'Sundaram Capital' }];
    var family = [{ id: 0, text: 'Tata' }, { id: 1, text: 'Reliance' }, { id: 2, text: 'Bajaj' }, { id: 3, text: 'Zee' },];

    $(".js-example-data-array-sector").select2({
        data: sector
    })

    $(".js-example-data-array-selected-family").select2({
        data: family
    })

    /*// Run function on load, could also run on dom ready
     window.onload = function() {
     // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
     if(typeof window.localStorage !== "undefined" && !localStorage.getItem('visited')) {
     // Set visited flag in local storage
     localStorage.setItem('visited', true);

     }
     }*/

    //Intro JS
    introview = function () {
        var tour = introJs();
        tour.setOption('tooltipPosition', 'auto');
        tour.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
        tour.setOption("nextLabel", "");
        tour.setOption("prevLabel", "");
        tour.start();
/*        tour.oncomplete(function() {
            $('#stocksip').hide();
        }).onexit(function(){
            $('#stocktrade').hide();
        }).onchange(function(targetElement) {
            // and show modal on Step 4
            if($(targetElement).attr("data-step") == 13) {
                $('#stocktrade').show();
            }
            // don't forget to hide modal on other steps
            if($(targetElement).attr("data-step") != 13) {
                $('#stocktrade').hide();
            }
        });*/
    }

    /*$(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            $(".header-section").css("position", "fixed");
            $(".content-section").css("padding-top","118px");
        } else {
            $(".header-section").css("position", "relative");
            $(".content-section").css("padding-top","0");
        }
    });*/

});
//Subscription Alert
$( ".ctaSubscribe" ).click(function() {
    BootstrapAlert.info({
        message: "Item Successfully added to you cart",
        dissmissible: true,
    });
});
$( "#demo-1" ).click(function() {
    BootstrapAlert.info({
        title: "Info!",
        message: "This is An info alert",
        dissmissible: true,
    });
});
$( "#demo-2" ).click(function() {
    BootstrapAlert.alert({
        title: "Danger!",
        message: "This is a danger alert",
        dissmissible: true,
    });
});
$( "#demo-3" ).click(function() {
    BootstrapAlert.warning({
        title: "Warning!",
        message: "This is a warning alert",
        dissmissible: true,
    });
});
$( "#demo-4" ).click(function() {
    BootstrapAlert.success({
        title: "Success!",
        message: "This is a success alert",
        dissmissible: true,
    });
});
/*!
 * BootstrapAlert v1.0
 * Copyright MantaCode Sp. z o.o.
 * Licensed under MIT
 * requires: jQuery, Bootstrap
 */
(function (root, factory) {
    /*'use strict';*/
    if (typeof define === "function" && define.amd) {
        define("bootstrapAlert", [ "jquery" ], function(a0) {
            return root["BootstrapAlert"] = factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        root["BootstrapAlert"] = factory(jQuery);
    }
})(this, function($) {
   /*'use strict';*/

    function createBootstrapAlert() {
        var BootstrapAlert = {};

        function showAlert(cssClass, userConfig) {
            var config = {
                autoHide: true,
                hideTimeout: 3000,
                dissmissible: false,
                parentClass: 'bootstrap-alert',
                innerClass: 'bootstrap-alert-message',
                title: '',
                message: ''
            };
            $.extend(config, userConfig);

            var contentStyle = [
                'position: relative;',
                'width: 100%;',
                'left: -50%;'
            ].join('');

            var alertContent = document.createElement('div');
            alertContent.className = 'alert ' + config.innerClass + ' ' + cssClass;
            alertContent.setAttribute('role', 'alert');
            alertContent.style = contentStyle;
            if (config.dissmissible) {
                alertContent.innerHTML += [
                    '<button type="button" class="close" data-dismiss="alert">',
                    '<span aria-hidden="true">&times;</span>',
                    '</button>'
                ].join('');
            }
            alertContent.innerHTML += '<strong>' + config.title + '</strong> ' + config.message;


            var alertElement = document.createElement('div');
            alertElement.className = config.parentClass;
            alertElement.style = [
                'position: fixed;',
                'width: 90%;',
                'max-width: 600px;',
                'left: 50%;',
                'top: 15px;',
                'z-index: 9999;',
            ].join('');
            alertElement.appendChild(alertContent);
            document.body.appendChild(alertElement);

            if(config.autoHide) {
                window.setTimeout(function() {
                    $(alertElement).fadeOut(function() {
                        $(alertElement).remove();
                    });
                }, config.hideTimeout);
            }

            $(alertElement).on('closed.bs.alert', function () {
                $(alertElement).remove();
            });
        }

        BootstrapAlert.alert = function (config) {
            showAlert('alert-danger', config);
        };

        BootstrapAlert.info = function (config) {
            showAlert('alert-info', config);
        };

        BootstrapAlert.warning = function (config) {
            showAlert('alert-warning', config);
        };

        BootstrapAlert.success = function (config) {
            showAlert('alert-success', config);
        };

        return BootstrapAlert;
    }
    return createBootstrapAlert();
});

$(".article-head > a").each(function(i){
    var len = $(this).text().length;
    if(len > 50){
        $(this).text($(this).text().substr(0,50)+'...');
    }
});

$(".article-info").each(function(i){
    var len = $(this).text().length;
    if(len > 180){
        $(this).text($(this).text().substr(0,180)+'...');
    }
});
// wrap Inner for ordered list style
$('.main-blog-content > ol > li,.main-blog-content > ol > li > ol > li').wrapInner("<span></span>");

//compare functionality stocklist


$(document).ready(function(){
    var couter = 1;
    $( ".gridlistview-sec ul > li.item" ).each(function() {

        if(couter != 1 && couter%3 == 0){
            $(this).after('<li class="col-md-12 hidden-xs hidden-sm"><div class="compare-section" id="compare-section"><ul class="list-inline"><li><div class="compare-block dot-border added-compare1"><div class="clearfix compare-data"><h5 class="cardhead pull-left"><a href="javascript:void(0)">HDFC Bank Limited</a></h5><a href="javascript:void(0)" class="pull-right close-comp"><i class="icon16 compare-collapse"></i></a></div><div class="display-table compare-select"><div class="display-table-cell"><i class="icon16 add-cproduct"></i></div></div></div></li><li><div class="compare-block dot-border  added-compare2"><div class="clearfix compare-data"><h5 class="cardhead pull-left"><a href="javascript:void(0)">Punjab National Bank</a></h5><a href="javascript:void(0)" class="pull-right close-comp"><i class="icon16 compare-collapse"></i></a></div><div class="display-table compare-select"><div class="display-table-cell"><i class="icon16 add-cproduct"></i></div></div></div></li><li><div class="compare-block dot-border  added-compare3"><div class="clearfix compare-data"><h5 class="cardhead pull-left"><a href="javascript:void(0)">Zee Entertainment</a></h5><a href="javascript:void(0)" class="pull-right close-comp"><i class="icon16 compare-collapse"></i></a></div><div class="display-table compare-select"><div class="display-table-cell"><i class="icon16 add-cproduct"></i></div></div></div></li><li><div class="compare-block dot-border"><div class="display-table compare-select"><div class="display-table-cell"><i class="icon16 add-cproduct"></i></div></div></div></li><li><div class="display-table"><div class="display-table-cell"><a href="compare-products-stocks.html" class="btn btn-primary compare-btn">Compare</a></div></div></li></ul><a href="javascript:void(0)" class="compare-close" data-toggle="tooltip" title="Close"></a></div></li>');
        }
        couter++;

        //Comapre popup
        $( ".compare-select" ).click(function() {
            $('#comparePopup').modal('show');
        });

        //Compare Basket
        $('.add-compare').on('click', function(){
            $(this).parents('li.item').siblings("li.hidden-xs.hidden-sm").find('.compare-section').hide();
            $(this).parents('li.item').nextAll("li.hidden-xs.hidden-sm:first").find('.compare-section').show();
        });
        $('.add-compare1').on('click', function(){
            $(this).parents('li.item').siblings("li.hidden-xs.hidden-sm").find('.compare-section').hide();
            $(this).parents('li.item').nextAll("li.hidden-xs.hidden-sm:first").find('.compare-section').show();
            $(this).find('.icon24').toggleClass('active');
            var $comptoggle =  $('.added-compare1');
            $comptoggle.toggleClass('dot-border');
            $comptoggle.find('.compare-data').toggle();
            $comptoggle.find('.compare-select').toggle();
        });
        $('.add-compare2').on('click', function(){
            $(this).parents('li.item').siblings("li.hidden-xs.hidden-sm").find('.compare-section').hide();
            $(this).parents('li.item').nextAll("li.hidden-xs.hidden-sm:first").find('.compare-section').show();
            $(this).find('.icon24').toggleClass('active');
            var $comptoggle =  $('.added-compare2');
            $comptoggle.toggleClass('dot-border');
            $comptoggle.find('.compare-data').toggle();
            $comptoggle.find('.compare-select').toggle();
        });
        $('.add-compare3').on('click', function(){
            $(this).parents('li.item').siblings("li.hidden-xs.hidden-sm").find('.compare-section').hide();
            $(this).parents('li.item').nextAll("li.hidden-xs.hidden-sm:first").find('.compare-section').show();
            $(this).find('.icon24').toggleClass('active');
            var $comptoggle =  $('.added-compare3');
            $comptoggle.toggleClass('dot-border');
            $comptoggle.find('.compare-data').toggle();
            $comptoggle.find('.compare-select').toggle();
        });

        // Closing Compare Cards
        $('.added-compare1 .compare-collapse').on('click', function(){
            var $closecompare = $(this).parents('.added-compare1');
            $closecompare.toggleClass('dot-border');
            $closecompare.find('.compare-data').toggle();
            $closecompare.find('.compare-select').toggle();
            $('.add-compare1').removeClass('selected').find('.icon24').removeClass('active');
        });

        $('.added-compare2 .compare-collapse').on('click', function(){
            var $closecompare = $(this).parents('.added-compare2');
            $closecompare.toggleClass('dot-border');
            $closecompare.find('.compare-data').toggle();
            $closecompare.find('.compare-select').toggle();
            $('.add-compare2').find('.icon24').toggleClass('active');
        });

        $('.added-compare3 .compare-collapse').on('click', function(){
            var $closecompare = $(this).parents('.added-compare3');
            $closecompare.toggleClass('dot-border');
            $closecompare.find('.compare-data').toggle();
            $closecompare.find('.compare-select').toggle();
            $('.add-compare3').find('.icon24').toggleClass('active');
        });

        $( ".compare-close" ).click(function() {
            $('.compare-section').slideUp();
        });

        //Close Comparing Options
        $('.close-comp1').on('click', function(){
            var $compa = $(this).parents('td');
            $compa.find('.compare-visible').toggle();
            $compa.find('.compare-select').toggle();
            $('.products-comparision tr td:nth-child(2)').find('.rating-container, img,.comp-innerdata,.comp-catdata,.comp-value1').hide();
        });

        //Added to Comapare in compare table
        $('.added-compare1').on('click', function(){
            var $compa = $(this).parents('td');
            $compa.find('.compare-visible').toggle();
            $compa.find('.compare-select').toggle();
            $('.products-comparision tr td:nth-child(2)').find('.rating-container, img,.comp-innerdata,.comp-catdata,.comp-value1').show();
        });
    });

    //Sticky Compare
    // Hide Header on on scroll down
    /*var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.compare-head-sticky').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.compare-head-sticky').removeClass('comp-down').addClass('comp-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('.compare-head-sticky').removeClass('comp-up').addClass('comp-down');
            }
        }
        lastScrollTop = st;
    }*/
   
});

/*$(function () {

    var msie6 = $.browser == 'msie' && $.browser.version < 7;

    if (!msie6 && $('.sort-filter').offset()!=null) {
        var top = $('.sort-filter').offset().top - parseFloat($('.sort-filter').css('margin-top').replace(/auto/, 0));
        var height = $('.sort-filter').height();
        var winHeight = $(window).height();
        var footerTop = $('footer').offset().top - parseFloat($('footer').css('margin-top').replace(/auto/, 0));
        var gap = 7;
        $(window).scroll(function (event) {
            // what the y position of the scroll is
            var y = $(this).scrollTop();

            // whether that's below the form
            if (y+winHeight >= top+ height+gap && y+winHeight<=footerTop) {
                // if so, ad the fixed class
                $('.sort-filter').addClass('sort-filterfixed').css('top',winHeight-height-gap +'px');
            }
            else if (y+winHeight>footerTop) {
                // if so, ad the fixed class
                $('.sort-filter').addClass('sort-filterfixed').css('top',footerTop-height-y-gap+'px');
            }
            else
            {
                // otherwise remove it
                $('.sort-filter').removeClass('sort-filterfixed').css('top','0px');
            }
        });
    }
});*/



