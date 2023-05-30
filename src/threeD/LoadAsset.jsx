import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TGALoader } from "three/examples/jsm/loaders/TGALoader";
import Loader from "./Loader";
function Three() {
  const textInput = useRef(null);
  const [load, setLoad] = useState(true)
  let mixer;
  let clock;
  let walker;
  let camera;
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x151922);
    const canvas = document.querySelector("#canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1.25;
    // renderer.shadowMap.enabled = true;
    let Buildingmodel;
    clock = new THREE.Clock();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera = new THREE.PerspectiveCamera(
      50,
      canvas.offsetWidth / canvas.offsetHeight,
      0.01,
      1000
    );

    //const loader = new GLTFLoader();
    let flag = false;
    camera.position.set(0, 0, 2);
    camera.rotation.x = -26.57;
    camera.lookAt(0, 50, 0);
    const manager = new THREE.LoadingManager();
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
      console.log(
        "Started loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files."
      );
    };

    manager.onLoad = function () {
      console.log("loaded")
      setLoad(true)
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      if(itemsLoaded === itemsTotal){
        setLoad(false)
      }
    };

    manager.onError = function (url) {
      console.log("There was an error loading " + url);
    };
    const loader = new FBXLoader(manager);
    loader.load(
      "./model/vampire-castle-corridor/source/EthanVampireCorridor/SM_EthanVampireCorridor.fbx",
      (model) => {
        window.model = model;
        model.position.y = -10;
        // model.rotation.x =-Math.PI/2
        const group = new THREE.Group();
        group.attach(model);
        //scene.add(group)
        //  model.scale.set(.01,.01,.01)

        console.log("loaded the final");
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.color = new THREE.Color(0x5e6069);
            child.material.needsUpdate = true;
          }
          if (child.name.includes("Plane")) {
            console.log("loaded the final");
            const texture = new THREE.TextureLoader();
            texture.load(
              "./model/vampire-castle-corridor/textures/CorridorFloor.png",
              (texture) => {
                child.material.map = texture;
                child.material.needsUpdate = true;
              }
            );
          }
          if (child.name.includes("corridorpCube")) {
            console.log("loaded the final");
            const texture = new THREE.TextureLoader();
            texture.load(
              "./model/vampire-castle-corridor/textures/CorridorBricksAligned.png",
              (texture) => {
                child.material.map = texture;
                child.material.needsUpdate = true;
              }
            );
          }
          if (child.isMesh && child.name.includes("pCylinder")) {
            console.log("loaded the final");
            const texture = new THREE.TextureLoader();
            texture.load(
              "./model/vampire-castle-corridor/textures/CorridorRoof.png",
              (texture) => {
                child.material.map = texture;
                child.material.needsUpdate = true;
              }
            );
          }
          if (
            child.isMesh &&
            (child.name.includes("polySurface51") ||
              child.name.includes("polySurface69"))
          ) {
            console.log("loaded the final");
            const texture = new THREE.TextureLoader();
            texture.load(
              "./model/vampire-castle-corridor/textures/CorridorDoorFrame.png",
              (texture) => {
                child.material.map = texture;
                child.material.needsUpdate = true;
              }
            );
          }
          // const tgaloader = new TGALoader();
          // const texture1 = tgaloader.load(
          //   "./model/vampire-castle-corridor/source/EthanVampireCorridor/CorridorDoor.tga"
          // );
          // texture1.colorSpace = THREE.SRGBColorSpace;
          // const door = new THREE.BoxGeometry(10, 10, 2);
          // const material1 = new THREE.MeshPhongMaterial({
          //   color: 0xffffff,
          //   map: texture1,
          // });

          // const mesh1 = new THREE.Mesh(door, material1);
          // mesh1.position.x = -50;
          // scene.add(mesh1);
        });

        //EthanBarrelUVBlood
        //pCylinder

        scene.add(model);
      }
    );

    const loaderMiya = new GLTFLoader(manager);
    loaderMiya.load("./model/character_walk/scene.gltf", (model) => {
      scene.add(model.scene);
      mixer = new THREE.AnimationMixer(model.scene);
      model.scene.position.y = -10;
      model.scene.position.z = -20;
      model.scene.scale.set(5, 5, 5);
      model.scene.rotation.y = -Math.PI;
      model.scene.attach(camera);
      camera.updateProjectionMatrix();
      walker = model;
     
    });

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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = Math.PI / 2.1; // radians
    controls.update();
   
    function animate() {
      requestAnimationFrame(animate);
      var delta = clock.getDelta();

      if (mixer) mixer.update(delta);
      if (walker) {
        
        camera.lookAt(walker.scene.position.x,walker.scene.position.y+5,walker.scene.position.z)

      }
      
      renderer.render(scene, camera);
      controls.update();
    }
    animate();
  }, []);
//   window.addEventListener("resize", onWindowResize);
  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") {
      walker.scene.rotation.y = -Math.PI;
      walker.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    walker.scene.position.z -= 0.2;
    }
    if (e.key === "ArrowDown") {
      walker.scene.rotation.y = Math.PI;
      walker.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
      walker.scene.position.z += 0.2;
     
    }
    if (e.key === "ArrowRight") {
      walker.scene.rotation.y = 0.1;
    }
    if (e.key === "ArrowLeft") {
      walker.scene.rotation.y = -0.1;
    }
  });
  window.addEventListener("keyup", function (e) {
    walker.animations.forEach((clip) => {
      mixer.stopAllAction()
    });
  });

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
    {load && <Loader/>}
      <div className="canvas-container">
        {" "}
        <canvas id="canvas" ref={textInput}></canvas>
      </div>
    </>
  );
}

export default Three;
