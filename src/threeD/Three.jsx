import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import loadModel from "./LoadAsset";
import Loader from "./Loader";
function Three({path}) {

  const textInput = useRef(null);
  const [load, setLoad] = useState(true);
  const [itemsLoaded, setItemsLoaded] = useState(1);
  const [itemsTotal, setITemsTotal] = useState(5);
  let format =true;
  let mixer;
  let walker;
  let camera;
  let renderer;
  let scene;
  let controls;
  let Path;
  let clock = new THREE.Clock();
  const style = {
    display: load === true ? "none" : "block",
    width: load === false && "100vw",
    height: load === false && "100vh",
  };
  async function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x151922);
    const canvas = document.querySelector("#canvas");
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera = new THREE.PerspectiveCamera(
      50,
      canvas.offsetWidth / canvas.offsetHeight,
      0.01,
      1000
    );

    camera.position.set(0, 0, 2);
    camera.rotation.x = -26.57;
    camera.lookAt(0, 50, 0);

    const light = new THREE.AmbientLight(0xffffff, 0.1); // soft white light
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xfb2010, 1);
    directionalLight.castShadow = true;
    directionalLight.position.set(50, 30, -30);
    scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.castShadow = true;
    directionalLight2.position.set(0, 100, -30);
    scene.add(directionalLight2);
    //     const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    // scene.add( helper );

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = Math.PI / 2.1; // radians
    controls.update();
    if(path){
        
        Path= path.modelPath
        format = false



    } else {
        Path = "vampire-castle-corridor/source/EthanVampireCorridor/SM_EthanVampireCorridor"
    }

    await loadModel(
        Path,
      scene,
      setLoad,
      load,
      setItemsLoaded,
      setITemsTotal,
      format
    ).then((data) => {
      walker = data.model;
      if (data.status && walker) {
        mixer = data.mixer;
       if(format === false) {

        window.addEventListener("mousemove",(e)=>{
          e.preventDefault();

        const data =  scene.getObjectByName("corridor")
        
      // controls.target.x += e.offsetX /1000
     controls.target.y += 0.01
       
      })
       }
       
        window.addEventListener("keydown", function (e) {
          if (e.key === "ArrowUp") {
            walker.scene.attach(camera);
            camera.lookAt(walker.scene.position)
            camera.updateProjectionMatrix();
            walker.scene.rotation.y = -Math.PI;
            walker.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
            walker.scene.position.z -= 0.2;
          }
          if (e.key === "ArrowDown") {
            walker.rotation.y = Math.PI;
            walker.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
            walker.position.z += 0.2;
          }
          if (e.key === "ArrowRight") {
            walker.rotation.y = 0.1;
          }
          if (e.key === "ArrowLeft") {
            walker.rotation.y = -0.1;
          }
        });
        window.addEventListener("keyup", function (e) {
          walker.animations.forEach((clip) => {
            mixer.stopAllAction();
          });
        });
      }
    });
  }
  function animate() {
    requestAnimationFrame(animate);

    let delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }
    if (walker) {
      camera.lookAt(
        walker.scene.position.x,
        walker.scene.position.y + 5,
        walker.scene.position.z
      );
    }

    renderer.render(scene, camera);
    controls.update();
  }
  useEffect(() => {
    init();

    animate();
  }, []);
  //   window.addEventListener("resize", onWindowResize);

  // stop() {
  //   this.speed.rotation = 0;
  //   this.speed.velocity = 0;
  // }
  // update() {
  //   if (this.boatmodel) {
  //     this.boatmodel.rotation.y += this.speed.rotation;
  //     this.boatmodel.translateX(this.speed.velocity);
  //   } else {

  //   }
  // }
  return (
    <>
      <div className="canvas-container">
        {load === true && (
          <Loader
            width={400}
            test={{ loaded: itemsLoaded, total: itemsTotal }}
          />
        )}
        <canvas id="canvas" style={{ style }} ref={textInput}></canvas>
      </div>
    </>
  );
}

export default Three;
