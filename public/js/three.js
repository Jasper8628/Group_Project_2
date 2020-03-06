
var socketCast = io.connect("https://mighty-caverns-93048.herokuapp.com/")
// var socketGame = io.connect("http://localhost:4000/chest.html");
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0xff0000 );
const tloader = new THREE.TextureLoader()
tloader.load('./images/dark.jpg', function (texture) {
  scene.background = texture
})

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const light = new THREE.SpotLight(0xffffff, 2.0, 600)
scene.add(light)
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(2, -3, 2)
dirLight.castShadow = true
scene.add(dirLight)

const backLight = new THREE.DirectionalLight(0xffffff, 1)
backLight.position.set(0, 3, 1)
backLight.castShadow = true
scene.add(backLight)

const renderer = new THREE.WebGLRenderer()
const w = window.innerWidth
const h = window.innerHeight
renderer.setSize(0.8 * w, 0.6 * h)
$('#scene').append(renderer.domElement)
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.maxPolarAngle = THREE.Math.degToRad(359)
const domEvents = new THREEx.DomEvents(camera, renderer.domElement)

/* var objloader = new THREE.OBJLoader();
objloader.load("/images/new-bishop.obj", function (object) {
    console.log(1);
    object.position.z = 0;
    object.position.y = 0;
    object.position.x = 0;

    scene.add(object);
    renderer.render(scene,camera);
    console.log(2);
    console.log(object);
    console.log(3);
}); */

/*
 var loader = new THREE.GLTFLoader();
loader.load("/images/queen/scene.gltf", function (gltf) {
    gltf.scene.position.z = 0;
    gltf.scene.scale.z = 2.5;
    gltf.scene.scale.y = 2.5;
    gltf.scene.scale.x = 2.5;
    gltf.scene.rotation.x = 1.5;

    scene.add(gltf.scene);
});   */

const geometry = new THREE.BoxGeometry(1, 1, 0.2)
let alt = false
let posX = 0
let posY = 0
for (i = -4; i < 4; i++) {
  posY = posY + i
  if (alt) {
    alt = false
  } else {
    alt = true
  }
  for (j = -4; j < 4; j++) {
    let material
    let cube
    if (alt) {
      material = new THREE.MeshBasicMaterial({ color: 0x000000 })
      cube = new THREE.Mesh(geometry, material)
      alt = false
    } else {
      material = new THREE.MeshBasicMaterial({ color: 0xffffff })
      cube = new THREE.Mesh(geometry, material)
      alt = true
    }
    posX = posX + j
    cube.position.x = j
    cube.position.y = i
    cube.name = i + ' ' + j
    scene.add(cube)
    domEvents.addEventListener(cube, 'click', event => {
      console.log(cube.id)
      if (selected3D) {
        UserMove.to = ClickedSquare3D(cube.position.x + 4, cube.position.y + 4)
        // console.log(UserMove.to);
        const gameData = {
          pieceName: pieceName,
          capName: capName,
          to: UserMove.to,
          from: UserMove.from,
          fen: '',
          side: gameSide
        }
        if (playerColor == playerSide) {
          MakeUserMove()
          gameData.fen = newFen
          socketCast.emit('game', gameData)
        }
      }
      selected3D = false
    })
  }
}
const delta = 0

camera.position.z = 5.5
camera.position.y = -5.5
// camera.lookAt(1,0,1);
controls.minDistance = 1
controls.maxDistance = 100
function animate () { /*
    delta+=0.01
    console.log(delta);
    camera.lookAt(light.position);
    camera.position.z=Math.sin(delta)*10;
    camera.position.x=Math.cos(delta)*10; */
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()
