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