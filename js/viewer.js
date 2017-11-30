// This is the assembled Scene put into the Canvas element


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
  // scene.add( axisHelper );

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

  if ($(window).width() > 700) {
        container.appendChild( renderer.domElement );
        container.appendChild( container );
  }


// Update

// when the mouse moves, call the given function
// document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener( 'resize', onWindowResize, false );


// Browser Functions

function onDocumentMouseMove(event) {
  // update the mouse variable
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onWindowResize(){
    if ($(window).width() > 700) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * .75, window.innerHeight * .75);
      render();
    }
}

// Three.js Rendering

function update() {
  onWindowResize();
}

function render() {
    renderer.render( scene, camera );
    differentWidths()
  }

(function animate() {
    requestAnimationFrame( animate );
    controls.update();
    update();
    render();
    // log(mouse.x, mouse.y);
})



