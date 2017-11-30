// Responsive logic for device widths

function differentWidths(){

    if($(window).width() < 700){
        // Mobile or Tablet
        $(".mobileDevice").css("display", "block");
        $("#content").css("display", "none");
    } else {
        // Desktop
        $(".mobileDevice").css("display", "none");
        $("#content").css("display", "block");
    }
}

// Check if WebGL available

function initGL(canvas) {
    try {
        gl = canvas.getContext("webgl",{preserveDrawingBuffer: true});
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        console.log("Trying....");
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL");
    }
}
