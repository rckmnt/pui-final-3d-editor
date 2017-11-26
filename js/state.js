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

// Toggle Which Y Type to Add

var currentY = "small";

function toggleYPiece(box) {
    if (box.id == "large_drag"){
	    $("#large_drag").css("border-color", "black");
	    $("#large_drag").css("border-style", "solid");
	    $("#small_drag").css("border-style", "none");
		log("Large");
		currentY = "large";
		return "large";
	} else if (box.id == "small_drag"){
	    $("#small_drag").css("border-color", "black");
	    $("#small_drag").css("border-style", "solid");
	    $("#large_drag").css("border-style", "none");
	    log("Small");
	    currentY = "small";
	    return "small";
	}
}