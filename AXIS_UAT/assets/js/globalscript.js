$(document).ready(function(){
		$("ul.dropdown-menu li").click(function(){
			$(this).parent().parent().parent().parent().find('.diy-input').val($(this).html());
		});
});
$(window).on("load",function(){
	$("ul.dropdown-menu, .diy-city").mCustomScrollbar();
});
