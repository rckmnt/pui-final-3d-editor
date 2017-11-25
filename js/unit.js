// Creates one Splyt Y piece


const { sin, cos } = Math

function createCylinder(length, radius) {
  return new THREE.CylinderGeometry(radius, radius, length, 24, 8, false)
}

function createArm({ length, angle }, baseHeight, radius) {
  const obj = createCylinder(length, radius)
  obj.rotateZ(angle)
  obj.translate(-length * sin(angle) / 2,
    baseHeight + length * cos(angle) / 2,
    0
  )
  return obj
}

const o = 1

function createSplytUnit(size) {
  const { baseHeight, radius, leftArm, rightArm } = size

  const baseObj = createCylinder(baseHeight - o, radius)
  baseObj.translate(0, baseHeight / 2 + o, 0)

  const leftArmObj = createArm(leftArm, baseHeight, radius)
  const rightArmObj = createArm(rightArm, baseHeight, radius)

  const materials = [
    new THREE.MeshLambertMaterial({
      color: 0xfff9dc,
      flatShading: true
    })
  ]

  const smallYGeo = new THREE.Geometry()
  ;[baseObj, leftArmObj, rightArmObj].forEach(o => smallYGeo.merge(o, o.matrix))

  const smallYMesh = THREE.SceneUtils.createMultiMaterialObject(smallYGeo, materials)

  return smallYMesh
}


function transformSplyt(object, dimensions, direction, rotation) {
  const { baseHeight } = dimensions
  const { angle, length } = dimensions[direction + "Arm"]
  object.rotateZ(angle)
  object.rotateY(rotation)
  object.position.set(-length * sin(angle), baseHeight + length * cos(angle), 0)
}

// Recursively go through each Splyt Unit in the Tree to build

function createSplytTree(state) {
  if (!state || state.status === "adding") {
    const emptyGroup = new Group()
    const sphereGeometry = new SphereGeometry(12, 16, 16)
    const sphereMaterial = new MeshBasicMaterial({ color: 0xffc235 })
    const sphereMesh = new Mesh(sphereGeometry, sphereMaterial)
    sphereMesh.translateY(13)
    emptyGroup.add(sphereMesh)
    return emptyGroup
  } else {
    const leftGroup = createSplytTree(state.left)
    transformSplyt(leftGroup, splyt[state.size], "left", state.rotation)
    const rightGroup = createSplytTree(state.right)
    transformSplyt(rightGroup, splyt[state.size], "right", state.rotation)
    const group = new Group()
    group.add(leftGroup)
    group.add(rightGroup)
    group.add(createSplytUnit(splyt[state.size]))
    return group
  }
}
