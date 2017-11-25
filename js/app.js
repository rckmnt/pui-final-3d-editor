import {
  WebGLRenderer,
  Scene,
  Vector3,
  Box3,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  DoubleSide,
  AxisHelper,
  Mesh,
  MeshLambertMaterial,
  CircleGeometry
} from "three"


import getVizContainerDimensions from "../../styles/layout"
import create from "./splyt"
import { blue, white } from "../../styles/vars"

export default (container, initialState) => {
  let state = initialState

  /* Renderer */

  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setClearColor(0xffffff, 1)
  renderer.shadowMap.enabled = true

  function render(node) {
    renderer.render(scene, camera)
  }

  /* Update */

  function resize({ width, height }, { x, y }, cameraAngle) {
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.position.set(
      (x + y) * 1.2 * Math.sin(cameraAngle),
      (x + y) * 0.8,
      (x + y) * 1.2 * Math.cos(cameraAngle)
    )
    camera.lookAt(new Vector3(0, (x + y) * 0.45), 0)
    camera.updateProjectionMatrix()
  }

  let model
  let modelBounds

  function setModel(tree) {
    if (model) {
      scene.remove(model)
    }
    model = create(tree)
    scene.add(model)
    modelBounds = new Box3().setFromObject(model)
    return model
  }

  function update(newState) {
    let prevState = state
    state = newState
    if (
      state.global.ui.windowWidth === 0 ||
      state.global.ui.windowHeight === 0
    ) {
      return
    }
    const cameraAngle =
      (state.drag.totalFinalized[0] + state.drag.current[0]) / 200
    if (prevState.global.tree !== state.global.tree || !model) {
      setModel(state.global.tree)
    }
    const { min, max } = modelBounds
    resize(
      getVizContainerDimensions(state.global.ui),
      {
        x: Math.abs(min.x - max.x),
        y: Math.abs(min.y - max.y)
      },
      cameraAngle
    )
    render()
  }

  render()
  update(initialState)
  container.appendChild(renderer.domElement)

  return {
    render,
    update
  }
}
