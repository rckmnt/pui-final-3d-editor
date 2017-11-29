// This is the assembled Scene put into the Canvas element

/* Check if WebGL */

// function initGL(canvas) {
//     try {
//         gl = canvas.getContext("webgl",{preserveDrawingBuffer: true});
//         gl.viewportWidth = canvas.width;
//         gl.viewportHeight = canvas.height;
//         console.log("Trying....");
//     } catch (e) {
//     }
//     if (!gl) {
//         alert("Could not initialise WebGL");
//     }
// }
// onload="initGL();" goes in body tag

/* Environment */

  const axisHelper = new THREE.AxesHelper(50);
  const baseGeometry = new THREE.CylinderGeometry(25, 25, 10, 16);
  const baseMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });
  const base = new THREE.Mesh( baseGeometry, baseMaterial );

/* Scene */
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 10000 );

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
  renderer.shadowMap.enabled = true
  renderer.setSize( window.innerWidth * .75, window.innerHeight * .75);


// Assemble scene
  // var material = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: false } );
  var oneSplyt = createSplytUnit(small);
  // var fullTree = createSplytTree(megaTree);
  scene.add( oneSplyt );
  // scene.add( fullTree );
  scene.add( base );
  scene.add( axisHelper );

  camera.position.y = 150;
  camera.position.z = 300;
  camera.up = new THREE.Vector3(0, 1, 0);
  camera.lookAt( oneSplyt.position );

  renderer.render(scene, camera);

// Camera
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.enableZoom = false;


// DOM stuff
  var container = document.getElementById( 'canvas' );
  container.appendChild( renderer.domElement );
  document.body.appendChild( container );

// Update
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


// HOVER OVER

// globals for Mouse Hover Over
var INTERSECTED;

// initialize object to perform world/screen calculations
var mouse = new THREE.Vector2(); // create once

// when the mouse moves, call the given function
document.addEventListener('mousemove', onDocumentMouseMove, false);


// Browser Functions
function onDocumentMouseMove(event) {
  // update the mouse variable
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


// update from https://jsfiddle.net/wilt/52ejur45/
function update() {
  onWindowResize();

  // find intersections

  // create a Ray with origin at the mouse position
  //   and direction into the scene (camera direction)
  var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
  vector.unproject(camera);
  var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  // ray.setFromCamera( mouse.clone(), camera );

  // create an array containing all objects in the scene with which the ray intersects
  var intersects = ray.intersectObjects(scene.children);

  // INTERSECTED = the object in the scene currently closest to the camera
  //    and intersected by the Ray projected from the mouse position

  // if there is one (or more) intersections
  if (intersects.length > 0) {
    // if the closest object intersected is not the currently stored intersection object
    if (intersects[0].object != INTERSECTED) {
      // restore previous intersection object (if it exists) to its original color
      if (INTERSECTED)
        INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
        // store reference to closest object as current intersection object
        INTERSECTED = intersects[0].object;
        // store color of closest object (for later restoration)
        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
        // set a new color for closest object
        INTERSECTED.material.color.setHex(0xffff00);
    }
  } else // there are no intersections
  {
    // restore previous intersection object (if it exists) to its original color
    if (INTERSECTED)
      INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
    // remove previous intersection object reference
    //     by setting current intersection object to "nothing"
    INTERSECTED = null;
  }
}


(function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
    update();
    // log(mouse.x);
    // log(mouse.y);
})
();

function render() {
    renderer.render( scene, camera );
  }


