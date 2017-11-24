// This is the assembled Scene put into the Canvas element



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

/* Environment */

  const axisHelper = new THREE.AxesHelper(50);

  const planeGeometry = new THREE.CircleGeometry(50, 40);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, 0, 0);

/* Scene */
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 10000 );

/* Lights */

  const lights = (function() {
    const light1 = new THREE.DirectionalLight(white, 0.2)
    light1.position.set(10, 10, 10)

    const light2 = new THREE.DirectionalLight(white, 0.2)
    light2.position.set(-10, -10, -10)

    const light3 = new THREE.AmbientLight(blue)

    return [light1, light2, light3]
  })()

  lights.forEach(light => {
    scene.add(light)
  })

  // Renderer
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize( window.innerWidth/2, window.innerHeight/2);

  // Assemble scene
  var geometry = new THREE.BoxGeometry( 1, 3, 1 );
  var material = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: false } );
  var cube = new THREE.Mesh( geometry, material );
  var oneSplyt = createSplytUnit(small);
  scene.add( oneSplyt );
  scene.add( plane );
  scene.add( axisHelper );
  cube.rotation.y += 0.2;
  cube.rotation.x += 1.2;

  camera.position.y = 150;
  camera.position.z = 300;
  camera.lookAt( createSplytUnit(small).position );

  renderer.render(scene, camera);

  // DOM stuff
  var container = document.getElementById( 'canvas' );
  container.appendChild( renderer.domElement );
  document.body.appendChild( container );


function render() {
    oneSplyt.rotation.y += 0.01;
    oneSplyt.rotation.x += 0.02;
    renderer.render( scene, camera );
  }

(function animate() {
    requestAnimationFrame( animate );
    render();
})();



// import {
//   CylinderGeometry,
//   Geometry,
//   SceneUtils,
//   SmoothShading,
//   MeshLambertMaterial
// } from "three"

// const { sin, cos } = Math

// function createCylinder(length, radius) {
//   return new CylinderGeometry(radius, radius, length, 24, 8, false)
// }

// function createArm({ length, angle }, baseHeight, radius) {
//   const obj = createCylinder(length, radius)
//   obj.rotateZ(angle)
//   obj.translate(
//     -length * sin(angle) / 2,
//     baseHeight + length * cos(angle) / 2,
//     0
//   )
//   return obj
// }

// const o = 1

// export default function createSplytUnit(size) {
//   const { baseHeight, radius, leftArm, rightArm } = size

//   const baseObj = createCylinder(baseHeight - o, radius)
//   baseObj.translate(0, baseHeight / 2 + o, 0)

//   const leftArmObj = createArm(leftArm, baseHeight, radius)
//   const rightArmObj = createArm(rightArm, baseHeight, radius)

//   const materials = [
//     new MeshLambertMaterial({
//       color: 0xfff9dc,
//       shading: SmoothShading
//     })
//   ]

//   const smallYGeo = new Geometry()
//   ;[baseObj, leftArmObj, rightArmObj].forEach(o => smallYGeo.merge(o, o.matrix))

//   const smallYMesh = SceneUtils.createMultiMaterialObject(smallYGeo, materials)

//   return smallYMesh
// }
