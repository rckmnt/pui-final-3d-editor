// Responsive logic

function differentWidths(){

    if(window.innerWidth < 700){
        // Mobile or Tablet
        $(".mobileDevice").css("display", "block");
        $("#content").css("display", "none");
    } else {
        // Desktop
        $(".mobileDevice").css("display", "none");
        $("#content").css("display", "block");
    }
}