
var renderer;
var scene;
var camera;
var cameraControl;

var depth = 200;
var width = 200;
var margin = 10;
var MAX_HEIGHT = 5;
var groundMesh;
var sizeSelector = 15;
var upping = 5;
var looking = new THREE.Vector3( 1000, 0, 1000 );

var state = false;



function initThree(){
    //// INIT
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);

    ////RENDERER
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // position and point the camera to the center of the scene
    camera.position.x = 500;
    camera.position.y = 40;
    camera.position.z = 1000;
    camera.lookAt( looking );

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    spotLight.shadowCameraNear = 20;
    spotLight.shadowCameraFar = 50;
    spotLight.castShadow = true;
    scene.add(spotLight);

    scene.add(new THREE.AmbientLight(0xffffff));


    groundMesh = createPlane3D(depth, width,margin, MAX_HEIGHT);

    scene.add(groundMesh);

    document.body.appendChild(renderer.domElement);

    ////EXTRA
    // cameraControl = new THREE.OrbitControls(camera);

    control = new function(){
        this.camX = 40;
        this.camY = 1000;
        this.camZ = 1010;
        this.selector = sizeSelector;
        this.depth_modifier = upping;
    };
    addControlGui(control);
    addStatsObject();

    render();

    console.log("Initialazing!")

    window.addEventListener('resize', handleResize, false);

}


function render() {
    camera.position.x = control.camX;
    camera.position.y = control.camY;
    camera.position.z = control.camZ;
    camera.lookAt( looking );
    sizeSelector = control.selector;
    upping = control.depth_modifier;

    stats.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'camX', -1000, 1000);
    gui.add(controlObject, 'camY', 0, 1500);
    gui.add(controlObject, 'camZ', 0, 2000);
    gui.add(controlObject, 'selector', 0, 30);
    gui.add(controlObject, 'depth_modifier', -30, 30);
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
}

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = initThree;