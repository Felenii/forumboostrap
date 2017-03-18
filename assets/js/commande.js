$( document ).ready(function() {

    $('#menu1, #menu2, #menu3, #menu4').bind('input', function() {
        $('#quantity_menu_1').html($('#menu1').val());
        $('#quantity_menu_2').html($('#menu2').val());
        $('#quantity_menu_3').html($('#menu3').val());
        $('#quantity_menu_4').html($('#menu4').val());

        var totalMenu1 = $('#price1').data('price') * $('#menu1').val();
        var totalMenu2 = $('#price2').data('price') * $('#menu2').val();
        var totalMenu3 = $('#price3').data('price') * $('#menu3').val();
        var totalMenu4 = $('#price4').data('price') * $('#menu4').val();

        $('#cost1').html(totalMenu1);
        $('#cost2').html(totalMenu2);
        $('#cost3').html(totalMenu3);
        $('#cost4').html(totalMenu4);

        $('#total').text(totalMenu1 + totalMenu2 + totalMenu3 + totalMenu4);

    });
});