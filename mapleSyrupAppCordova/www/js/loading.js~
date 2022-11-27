window.addEventListener("load", function(){

    var smallScreen =  ($(document).height() > $(window).height()); //so if the height of the page is greater then
    
    var $logoTitle = $('#logoTitle');
    $logoTitle.data('size','big');
    if(smallScreen){ // think i don't need this becuase if there is a scroll then i want to remove the header
        //alert("hell");
       
        $logoTitle.data('size','small');
        $logoTitle.addClass("titleMini");
        $logoTitle.children().addClass("titleMiniText");
    } //if small screen
    
    
    
    
    
    $("#logoTitle").click(function(){
        var $logoTitle = $('#logoTitle');
        //alert($(document).height() + "   " + ($(window).height() + 40));
        
        if($logoTitle.data('size') == 'small' && (600 < $(window).height())  )
        {
            
            $logoTitle.data('size','big');
            $logoTitle.removeClass("titleMini");
            $logoTitle.children().removeClass("titleMiniText");
        }
    });
    
    //click event that exits out of the menu
    $(".fa-times").click(function(){
         $("#results").css("top","-100%");
         $("main").css("display","show");
         $("#results").css("background","rgba(0, 0, 0,0)");
    });
    
    
    $(".fa-qrcode").click(function(){
        $("#results").css("opacity","0.0");
        $("#qrCode").css("display", "initial");

    });

	$("#qrCode").qrcode({
		render: 'image',
		ecLevel: 'H',
		size: 550,
		fill: '#AAA',
		text: window.location.protocol + window.location.host + window.location.pathname

	}).click(function(){
         $("#results").css("opacity","1");
		 $(this).css("display", "none");
    });



    
    
    
    
});

$(window).scroll(function(){
    var $logoTitle = $('#logoTitle');
    if($logoTitle.data('size') == 'big')
    {
        $logoTitle.data('size','small');
        $logoTitle.addClass("titleMini");
        $logoTitle.children().addClass("titleMiniText");
    }
});
