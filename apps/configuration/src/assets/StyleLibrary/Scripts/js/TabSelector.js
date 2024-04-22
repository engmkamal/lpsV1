
$(function () {
    var selector = '.tab-nav ul li';
    // Joint items
    var jointselector = '.joints-item-wrap ul li';

    //var SideNavselector = $('.cd-accordion-menu li.no-sum-child');
    //var SideNavselectorsub = $('.cd-accordion-menu li.has-children ul li');


    //Tab
    $('.tab-nav ul').on('click', 'li', function () {
        $(selector).removeClass('tab-current');
        $(this).addClass('tab-current');
    });

    // joint items
    $('.joints-item-wrap ul').on('click', 'li', function () {
        $(jointselector).removeClass('joint-tab-current');
        $(this).addClass('joint-tab-current');
    });



    //// Side Navigation
    //$(SideNavselector).on('click', function () {
    //    $(SideNavselector).removeClass('active');
    //    $(this).addClass('active');
    //});

    //$(SideNavselectorsub).on('click', function () {
    //    $(SideNavselectorsub).removeClass('active');
    //    $(this).addClass('active');
    //});

});