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
