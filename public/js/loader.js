
    var width = 960;
    var height = 500;
    var aspectRatio = width / height;
    var fov = 45;
    var nearClip = 0.1;
    var farClip = 1000;
    var rotateSpeed = 0.005;

    var cameraPosition = new THREE.Vector3(50, 20, 50);
    var cameraTarget = new THREE.Vector3(0, -5, 0);
    var lightPosition = new THREE.Vector3(25, 30, -50);

    var ambientLightIntensity = 0.45;
    var directionalLightIntensity = 1.75;

    var clearColour = 0x404040;
    var ambientLightColour = 0xFFFFFF;
    var directionalLightColour = 0xFFFFFF;

    var shadowFrustum = 50;
    var shadowMapWidth = 1024;
    var shadowMapHeight = 1024;

    var blackMaterial = new THREE.MeshPhongMaterial({
        color: 0x110C11,
        reflectivity: 0.1,
        shininess: 20,
        shading: THREE.SmoothShading
    });

    var whiteMaterial = new THREE.MeshPhongMaterial({
        color: 0xFCF6E3,
        reflectivity: 10,
        shininess: 25,
        shading: THREE.SmoothShading
    });

    // create scene and a object3D container to store all the mesh items
    var scene = new THREE.Scene();
    var container = new THREE.Object3D();

    // initialise the camera
    var camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearClip, farClip);
    camera.position.copy(cameraPosition);
    camera.lookAt(cameraTarget);

    // add an ambient and directional light
    var ambientLight = new THREE.AmbientLight(ambientLightColour, ambientLightIntensity);
    var directionalLight = new THREE.DirectionalLight(directionalLightColour, directionalLightIntensity);
    directionalLight.position.copy(lightPosition);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.right = shadowFrustum;
    directionalLight.shadow.camera.left = -shadowFrustum;
    directionalLight.shadow.camera.top = shadowFrustum;
    directionalLight.shadow.camera.bottom = -shadowFrustum;
    directionalLight.shadow.mapSize.width = shadowMapWidth;
    directionalLight.shadow.mapSize.height = shadowMapHeight;

    scene.add(ambientLight);
    scene.add(directionalLight);

    // create renderer and attach to DOM
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(clearColour, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    document.body.appendChild(renderer.domElement);

    // create loading manager to load in all our models
    var manager = new THREE.LoadingManager();
    manager.onLoad = init;
    var loader = new THREE.JSONLoader(manager);


    items.forEach(function(item) {
        loader.load(item.model, function(geometry, materials) {
            var material = item.board ? new THREE.MeshFaceMaterial(materials) :
                    item.black ? blackMaterial : whiteMaterial;
            var obj = new THREE.Mesh(geometry, material);
            obj.position.set(item.position.x, item.position.y, item.position.z);
            obj.rotation.set(degreeToRad(item.rotation.x), degreeToRad(item.rotation.y),
                degreeToRad(item.rotation.z));
            obj.castShadow = true;
            obj.receiveShadow = true;
            container.add(obj);
        });
    });

    function init() {
        scene.add(container);
        render();
    }

    function render() {
        container.rotation.y += rotateSpeed;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function degreeToRad(deg) {
        return deg * (Math.PI / 180);
    }