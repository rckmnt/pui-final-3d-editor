
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

		// Scene
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

		// Renderer
		var renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setClearColor(0xffffff, 1);
		renderer.setSize( window.innerWidth, window.innerHeight);


		// DOM stuff
		var container = document.getElementById( 'canvas' );
		container.appendChild( renderer.domElement );
		document.body.appendChild( container );

		var geometry = new THREE.BoxGeometry( 1, 3, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
		var cube = new THREE.Mesh( geometry, material );
		scene.add( cube );
		scene.add( plane );
		scene.add( axisHelper );
		cube.rotation.y += 0.2;
		cube.rotation.x += 1.2;
		camera.position.z = 5;
		renderer.render(scene, camera);

function render() {
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.02;
    renderer.render( scene, camera );
	}

(function animate() {
    requestAnimationFrame( animate );
    render();
})();
