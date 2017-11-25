// This is the assembled Scene put into the Canvas element

/* Check if WebGL */

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
  const baseGeometry = new THREE.CircleGeometry(50, 40);
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
  var material = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: false } );
  var oneSplyt = createSplytUnit(small);
  scene.add( oneSplyt );
  scene.add( base );
  scene.add( axisHelper );

  camera.position.y = 150;
  camera.position.z = 300;
  camera.up = new THREE.Vector3(0, 1, 0);
  camera.lookAt( oneSplyt.position );

  renderer.render(scene, camera);

  // Camera
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render ); // remove when using animation loop
  // enable animation loop when using damping or autorotation
  //controls.enableDamping = true;
  //controls.dampingFactor = 0.25;
  controls.enableZoom = false;



  // DOM stuff
  var container = document.getElementById( 'canvas' );
  container.appendChild( renderer.domElement );
  document.body.appendChild( container );


function render() {
    // oneSplyt.rotation.y += 0.01;
    // oneSplyt.rotation.x += 0.02;
    renderer.render( scene, camera );
  }

(function animate() {
    // requestAnimationFrame( animate );
    // controls.update();
    render();
})
();


// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize( window.innerWidth, window.innerHeight );
// }
