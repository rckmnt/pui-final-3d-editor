// State

const initialTree = {
  size: "small",
  status: "added",
  rotation: 0,
  left: null,
  right: null
}

const initialState = {
  tree: initialTree,
  currentSize: "small",
  route: "/",
  ui: {
    windowHeight: 0,
    windowWidth: 0
  }
}

var megaTree = {"size":"small","status":"added","rotation":0,"left":{"status":"added","rotation":2.518526334837162,"size":"small","right":{"status":"added","rotation":0.76686996353668,"size":"small","left":{"status":"added","rotation":2.4784066776397276,"size":"large","right":{"status":"added","rotation":1.1367891624142814,"size":"small","left":{"status":"added","rotation":3.9340512625549056,"size":"small"}},"left":null},"right":null},"left":{"status":"added","rotation":4.4262601724255255,"size":"small","left":{"status":"added","rotation":3.4121004507546933,"size":"small","right":{"status":"added","rotation":1.4794632055591657,"size":"small","right":{"status":"added","rotation":2.3058228307674455,"size":"small","right":{"status":"added","rotation":2.6886019831511048,"size":"small"},"left":{"status":"added","rotation":6.06601055295845,"size":"small","left":null}},"left":null},"left":{"status":"added","rotation":0.29748984760492503,"size":"small","right":null}},"right":null}},"right":{"status":"added","rotation":4.302611734316891,"size":"small","left":{"status":"added","rotation":4.442169348981059,"size":"small","left":{"status":"added","rotation":6.280214124772243,"size":"small","left":null},"right":{"status":"added","rotation":4.2197540044806034,"size":"small","right":{"status":"added","rotation":3.856991851850945,"size":"small"},"left":{"status":"added","rotation":5.741265811111512,"size":"small"}}},"right":{"status":"added","rotation":1.000677082764315,"size":"large","left":null,"right":null}}};


// Toggle Which Y Type to Add

var currentY = "small";

function toggleYPiece(box) {
    if (box.id == "large_drag"){
        // Selected
        $("#large_drag").css("background-color", faintBlue);
	    $("#large_drag").css("border-color", "black");
	    $("#large_drag").css("border-style", "solid");

        // Unselected
	    $("#small_drag").css("border-style", "none");
        $("#small_drag").css("background-color", white);
		log("Large");
		currentY = "large";
		return "large";
	} else if (box.id == "small_drag"){
        // Selected
        $("#small_drag").css("background-color", faintBlue);
	    $("#small_drag").css("border-color", "black");
	    $("#small_drag").css("border-style", "solid");

        // Unselected
        $("#large_drag").css("border-style", "none");
        $("#large_drag").css("background-color", white);
	    log("Small");
	    currentY = "small";
	    return "small";
	}
}