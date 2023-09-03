import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import loadModel from "./LoadAsset";
import loadRoomModel from "./Room";
import Loader from "./Loader";
import TWEEN from "@tweenjs/tween.js";
import {CSS2DRenderer,CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer"
function Three({ path }) {
  const textInput = useRef(null);
  const [load, setLoad] = useState(true);
  const [call, setCall] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState(1);
  const [itemsTotal, setITemsTotal] = useState(5);
  const inputElement = useRef();
  let Rubbishintersect;
  let Old_Urbanintersect;
  let Shipping_Containerintersect;
  let content;
  let Ms_barrelintersect;
  let Wood_container_paintedintersect;
  let Garbage_bagsintersect;
  let Simple_Fire_Hydrantintersect;
  let Urban_Graffitintersect;
  let Old_Benchintersect;
  let movement;
  let offset=0.05
  let text
  let format = true;
  let mixer;
  const dir = new THREE.Vector3();
  let walker;
  let camera;
  let helper;
  let renderer;
  let box;
  let canvas
  let door = false;
  let doorTouch = false;
  let returntoScene = false;
  let roomEntry = 0;
  let scene;
  let street;
  let keypressed;
  let controls;
  let Path;
  let raycaster;
  let room;
  let clock = new THREE.Clock();
  let plane11;
  let plane12;
  let plane13;
  let plane14;
  let plane15;
  let plane16;
  let box1;
  let box2;
  let box3;
  let labelRenderer
  let box4;
  let box5;
  let box6;
  let intersects;
  const style = {
    display: load === true ? "none" : "block",
    width: load === false && "100vw",
    height: load === false && "100vh",
  };
  async function init() {
    raycaster = new THREE.Raycaster();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x151922);
	 
     canvas = document.querySelector("#canvas");
    //   labelRenderer=new CSS2DRenderer()
    // labelRenderer.setSize(window.innerWidth,window.innerHeight)
    // labelRenderer.domElement.style.position='absolute'
    // labelRenderer.domElement.style.top='0px'
    // labelRenderer.domElement.className='about'
    // labelRenderer.innerHTML = 'hello world'
    // labelRenderer.domElement.style.pointerEvents='none'
    // labelRenderer.domElement.hidden= false
    
    // document.querySelector('#parent')?.appendChild(labelRenderer.domElement)
    
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera = new THREE.PerspectiveCamera(
      50,
      canvas.offsetWidth / canvas.offsetHeight,
      0.01,
      1000
    );

    // camera.position.set(0, 0, 2);

    let shadowMapSize = 50;
    const light = new THREE.AmbientLight(0xffffff, 0.3); // soft white light
    scene.add(light);
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xb3cee5, 0.7);
    //  hemiLight.color.setHSL(1, 1, 0.6);
    //  hemiLight.groundColor.setHSL(0.00, 1, 0.75);
    //hemiLight.position.set(0, 1, 0);
    scene.add(hemiLight);
    const directionalLight = new THREE.DirectionalLight(0xfb2010, 1);
    // directionalLight.castShadow = true;
    // directionalLight.shadow.mapSize.width = 2048;
    // directionalLight.shadow.mapSize.height = 2048;
    // directionalLight.shadow.camera.near = 0.5;
    // directionalLight.shadow.camera.far = shadowMapSize * 2;
    // directionalLight.shadow.camera.top = shadowMapSize;
    // directionalLight.shadow.camera.bottom = -shadowMapSize;
    // directionalLight.shadow.camera.left = -shadowMapSize;
    // directionalLight.shadow.camera.right = shadowMapSize;
    // directionalLight.shadow.focus = 1;
    // directionalLight.shadow.normalBias = 0.02;
   // directionalLight.position.set(40, 30, -30);
    //scene.add(directionalLight);
    //     const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    // scene.add( helper );

    const directionalLight3 = new THREE.DirectionalLight(0xb3cee5, 1);
    directionalLight3.castShadow = true;
    directionalLight3.shadow.camera.top = shadowMapSize;
    directionalLight3.shadow.camera.bottom = -shadowMapSize;
    directionalLight3.shadow.camera.left = -shadowMapSize;
    directionalLight3.shadow.camera.right = shadowMapSize;
    directionalLight3.shadow.focus = 1;
    directionalLight3.shadow.normalBias = 0.02;
    directionalLight3.position.set(100, 100, -10);
    //scene.add(directionalLight3);
    // const helper3 = new THREE.DirectionalLightHelper( directionalLight3, 5 );
    // scene.add( helper3 );
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.castShadow = true;
    directionalLight2.shadow.mapSize.width = 2048;
    directionalLight2.shadow.mapSize.height = 2048;
    //   directionalLight2.shadow.camera.near = 0.5;
    //  directionalLight2.shadow.camera.far = shadowMapSize * 2;
    directionalLight2.shadow.camera.top = shadowMapSize;
    directionalLight2.shadow.camera.bottom = -shadowMapSize;
    directionalLight2.shadow.camera.left = -shadowMapSize;
    directionalLight2.shadow.camera.right = shadowMapSize;
    directionalLight2.shadow.focus = 1;
    directionalLight2.shadow.normalBias = 0.02;

    directionalLight2.position.set(0, 30, -30);
    //scene.add(directionalLight2);
    //     const helper2 = new THREE.DirectionalLightHelper( directionalLight2, 5 );
    // scene.add( helper2 );

    //spotLight.position.set(0, 5, 10);

    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableZoom = false;
    // controls.minPolarAngle = 0; // radians
    // controls.maxPolarAngle = Math.PI / 2.1; // radians

    controls = new OrbitControls(camera, canvas);
    // controls.target.set(0, 0, 0);
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.minPolarAngle = Math.PI / 2.4;
    controls.maxPolarAngle = Math.PI / 2.15;

    controls.rotateSpeed = 0.25;




/* --------------------------------- tesying -------------------------------- */
// const geometryt = new THREE.PlaneGeometry( 1, 1 );
// const materialt = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// const planet = new THREE.Mesh( geometryt, materialt );
// scene.add( planet );
// const element = document.getElementById('content')
     
    
//     // root.render(element);
//     const cPointLabel=new CSS2DObject(element)
    
//     // moonMassLabel.position.set( 1.5 * MOON_RADIUS, 0, 0 );
//     // moonMassLabel.center.set( 0, 0 );
   
//     cPointLabel.renderOrder = Infinity;
		
//     planet.add(cPointLabel)




























    if (path) {
      Path = path.modelPath;
      format = false;
    } else {
      Path =
        "vampire-castle-corridor/source/EthanVampireCorridor/SM_EthanVampireCorridor";
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
      street = data.street;
      text =data.text
      if (data.status && walker) {
        mixer = data.mixer;
        
         
          
        
          
        //    if(format === false) {

        //     window.addEventListener("mousemove",(e)=>{
        //       e.preventDefault();

        //     const data =  scene.getObjectByName("corridor")

        //   // controls.target.x += e.offsetX /1000
        //  controls.target.y += 0.01

        //   })
        //    }

        //   window.addEventListener("keydown", function (e) {
        //  console.log(camera.position)
        //     keypressed = true
        //     if (e.key === "ArrowUp") {
        //        walker.scene.attach(camera);
        //       camera.lookAt(walker.scene.position)
        //       camera.updateProjectionMatrix();
        //       walker.scene.rotation.y = -Math.PI;
        //       walker.animations.forEach((clip) => {
        //         mixer.clipAction(clip).play();
        //       });
        //       walker.scene.position.z -= 0.2;
        //     }
        //     if (e.key === "ArrowDown") {
        //       walker.rotation.y = Math.PI;
        //       walker.animations.forEach((clip) => {
        //         mixer.clipAction(clip).play();
        //       });
        //       walker.position.z += 0.2;
        //     }
        //     if (e.key === "ArrowRight") {
        //       walker.rotation.y = 0.1;
        //     }
        //     if (e.key === "ArrowLeft") {
        //       walker.rotation.y = -0.1;
        //     }
        //   });
        //   window.addEventListener("keyup", function (e) {
        //      console.log("up",camera.position)
        //       keypressed = true
        //       // scene.attach(camera)
        //     walker.animations.forEach((clip) => {
        //       mixer.stopAllAction();
        //     });
        //   });
        walker.scene.add(camera);
        camera.position.z = 0;
        camera.position.y = 1;
        new TWEEN.Tween(camera.position)
            .to({ x: 0, y: .7, z: -3.2 }, 4000)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();

        /* ---------------------------- creating geometry --------------------------- */

        const geometry = new THREE.PlaneGeometry(10, 2);
        const geometry2 = new THREE.PlaneGeometry(11, 2);
        const geometry3 = new THREE.PlaneGeometry(110, 2);
        const geometry4 = new THREE.PlaneGeometry(72, 2);
        const geometry5 = new THREE.PlaneGeometry(72, 2);
        const geometry6 = new THREE.PlaneGeometry(180, 2);

        /* ---------------------------- creating material --------------------------- */

        const material = new THREE.MeshBasicMaterial({
          color: 0xffff00,
          side: THREE.DoubleSide,
        });

        /* ------------------------------ creating mesh ----------------------------- */

        let plane = new THREE.Mesh(geometry, material);
        let plane2 = new THREE.Mesh(geometry2, material);
        let plane3 = new THREE.Mesh(geometry3, material);
        let plane4 = new THREE.Mesh(geometry4, material);
        let plane5 = new THREE.Mesh(geometry5, material);
        let plane6 = new THREE.Mesh(geometry6, material);

        plane.visible = false;
        plane2.visible = false;
        plane3.visible = false;
        plane4.visible = false;
        plane5.visible = false;
        plane6.visible = false;

        /* ----------------------------- seting position ---------------------------- */

        plane.position.y = -8.1;
        plane.position.z = 31;

        plane2.position.y = -8.1;
        plane2.position.z = 31;
        plane2.position.x = 30;

        plane3.position.y = -8.1;
        plane3.position.z = 31;
        plane3.position.x = 91;

        plane4.position.y = -8.1;
        plane4.position.z = -5;
        plane4.position.x = 141;
        plane4.rotation.y = Math.PI / 2;

        plane5.position.y = -8.1;
        plane5.position.z = -5;
        plane5.position.x = -47;
        plane5.rotation.y = Math.PI / 2;

        plane6.position.set(45, -8.1, -38);

        plane.name = "plane";
        plane2.name = "plane2";
        plane3.name = "plane3";
        plane4.name = "plane4";
        plane5.name = "plane5";
        plane6.name = "plane6";
        //plane.visible = false

        /* ------------------------------ creating box ------------------------------ */

        plane.userData.box = new THREE.Box3().setFromObject(plane);
        plane2.userData.box = new THREE.Box3().setFromObject(plane2);
        plane3.userData.box = new THREE.Box3().setFromObject(plane3);
        plane4.userData.box = new THREE.Box3().setFromObject(plane4);
        plane5.userData.box = new THREE.Box3().setFromObject(plane5);
        plane6.userData.box = new THREE.Box3().setFromObject(plane6);

        /* ----------------------------- adding to scene ---------------------------- */

        scene.add(plane);
        scene.add(plane2);
        scene.add(plane3);
        scene.add(plane4);
        scene.add(plane5);
        scene.add(plane6);
        window.addEventListener("keydown", function (e) {
          //   raycaster.set(
          //     controls.target,
          //     dir.subVectors(camera.position, controls.target).normalize()
          // )
          // // raycaster.setFromCamera( offset, camera );
          // intersects = raycaster.intersectObjects(scene.children)
          box = new THREE.Box3().setFromObject(walker.scene);
          //        helper = new THREE.Box3Helper( box );
          // scene.add( helper );

          Rubbishintersect = false;
          Old_Urbanintersect = false;
          Shipping_Containerintersect = false;
          Ms_barrelintersect = false;
          Wood_container_paintedintersect = false;
          Garbage_bagsintersect = false;
          Simple_Fire_Hydrantintersect = false;
          Urban_Graffitintersect = false;
          Old_Benchintersect = false;
          movement = false;
          if (room) {
            rooomCollision();
          }
          /* ------------------------- checking for collision ------------------------- */

          // movement=box.intersectsBox(plane.userData.box)
          if (plane2) {
            doorTouch = box.intersectsBox(plane2?.userData?.box);
          }

          if (doorTouch) {
            text=null
            street = null;
            plane = null;
            plane2 = null;
            plane3 = null;
            plane4 = null;
            plane5 = null;
            plane6 = null;
            doorTouch = false;
            roomEntry++;
            newRoom();

            // return
          }
          //  console.log(door)
          // movement=box.intersectsBox(plane3.userData.box)
          // movement=box.intersectsBox(plane4.userData.box)
          // movement=box.intersectsBox(plane5.userData.box)
          if (street) {
            if (
              box.intersectsBox(plane?.userData?.box) ||
              box.intersectsBox(plane3?.userData?.box) ||
              box.intersectsBox(plane4?.userData?.box) ||
              box.intersectsBox(plane5?.userData?.box) ||
              box.intersectsBox(plane6?.userData?.box)
            ) {
              movement = true;
            }
          }
          // movement = box.intersectsBox(plane6.userData.box)
          let offset = walker.scene.rotation.y;
          street &&
            street.traverse((child) => {
              if (child.userData.box && child.isMesh) {
                if (child.name.includes("Rubbish")) {
                  box.intersectsBox(child.userData.box);
                  Rubbishintersect = box.intersectsBox(child.userData.box);
                  if (Rubbishintersect === true) {
                    movement = true;
                  }
                }

                if (child.name.includes("Shipping_Container")) {
                  box.intersectsBox(child.userData.box);
                  Shipping_Containerintersect = box.intersectsBox(
                    child.userData.box
                  );
                  if (Shipping_Containerintersect === true) {
                    movement = true;
                  }
                }
                if (child.name.includes("Ms_barrel")) {
                  box.intersectsBox(child.userData.box);
                  Ms_barrelintersect = box.intersectsBox(child.userData.box);
                  if (Ms_barrelintersect === true) {
                    movement = true;
                  }
                }
                if (child.name.includes("Wood_container_painted")) {
                  box.intersectsBox(child.userData.box);
                  Wood_container_paintedintersect = box.intersectsBox(
                    child.userData.box
                  );
                  if (Wood_container_paintedintersect === true) {
                    movement = true;
                  }
                }
                if (child.name.includes("Garbage_bags001")) {
                  box.intersectsBox(child.userData.box);
                  Garbage_bagsintersect = box.intersectsBox(child.userData.box);
                  if (Garbage_bagsintersect === true) {
                    movement = true;
                  }
                }
                if (child.name.includes("Simple_Fire_Hydrant")) {
                  box.intersectsBox(child.userData.box);
                  Simple_Fire_Hydrantintersect = box.intersectsBox(
                    child.userData.box
                  );
                  if (Simple_Fire_Hydrantintersect === true) {
                    movement = true;
                  }
                }

                if (child.name.includes("Old_Bench")) {
                  box.intersectsBox(child.userData.box);
                  Old_Benchintersect = box.intersectsBox(child.userData.box);
                  if (Old_Benchintersect === true) {
                    movement = true;
                  }
                }
              }
            });

          if (e.key === "ArrowUp") {
            //ball.position.z -= 0.0001;
            //  ball.position.z = ball.position.z- .0001;

            !movement && walker.scene.translateZ(0.6);
            walker.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
            // walker.scene.rotation.y=offset+ (3.14 + controls.getAzimuthalAngle())
            //  walker.scene.position.x = walker.scene.position.x- .0001;
            // walker.scene.rotation.y =walker.scene.rotation.y + .001;
          }
          if (e.key === "ArrowDown") {
            //  walker.scene.position.z += 0.0001;
            walker.scene.translateZ(-0.8);
            walker.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
          }
          if (e.key === "ArrowRight" && !movement) {
            // walker.scene.position.x -= 0.0001;
            walker.scene.rotation.y = walker.scene.rotation.y - 0.1;
            walker.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
          }
          if (e.key === "ArrowLeft" && !movement) {
            // walker.scene.position.x += 0.0001;
            // walker.scene.rotation.y = -angle / 2;
            walker.scene.rotation.y = walker.scene.rotation.y + 0.1;
            walker.animations.forEach((clip) => {
              mixer.clipAction(clip).play();
            });
          }
        });
        window.addEventListener("keyup", function (e) {
          keypressed = true;
          // scene.attach(camera)
          walker.animations.forEach((clip) => {
            mixer.stopAllAction();
          });
        });
      }
    });
    console.log(door);
  }

  /* ---------------------------- loading new room ---------------------------- */

  async function newRoom() {
    if (roomEntry === 1) {
		roomEntry = 0
      console.log("reached room");
      scene.remove(scene.getObjectByName("street"));
      scene.remove(scene.getObjectByName("explore"));
      scene.remove(scene.getObjectByName("plane"));
      scene.remove(scene.getObjectByName("plane2"));
      scene.remove(scene.getObjectByName("plane3"));
      scene.remove(scene.getObjectByName("plane4"));
      scene.remove(scene.getObjectByName("plane5"));
      scene.remove(scene.getObjectByName("plane6"));
      camera.position.z = 0;
      camera.position.y = 1;
      setLoad(true);
      setItemsLoaded(1);
      await loadRoomModel(
        canvas,
        (Path = "room final file 1"),
        scene,
        setLoad,
        load,
        setItemsLoaded,
        setITemsTotal
      ).then((data) => {
        room = data.model;
        
        new TWEEN.Tween(camera.position)
            .to({ x: 0, y: .7, z: -3.2 }, 4000)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();

        /* ---------------------------- creating geometry --------------------------- */

        const geometry11 = new THREE.PlaneGeometry(30, 2);
        const geometry12 = new THREE.PlaneGeometry(30, 2);
        const geometry13 = new THREE.PlaneGeometry(230, 2);
        const geometry14 = new THREE.PlaneGeometry(180, 2);
        const geometry15 = new THREE.PlaneGeometry(100, 2);
        const geometry16 = new THREE.PlaneGeometry(225, 2);
        const geometry17 = new THREE.BoxGeometry(4, 4, 4);
        const geometry18 = new THREE.BoxGeometry(25, 4, 35);
        const geometry19 = new THREE.BoxGeometry(7, 4, 7);
        const geometry20 = new THREE.BoxGeometry(25, 4, 15);
        const geometry21 = new THREE.BoxGeometry(4, 4, 4);
        const geometry22 = new THREE.BoxGeometry(10, 1, 10);

        /* ---------------------------- creating material --------------------------- */

        const material = new THREE.MeshBasicMaterial({
          color: 0xffff00,
          side: THREE.DoubleSide,
        });

        /* ------------------------------ creating mesh ----------------------------- */

        plane11 = new THREE.Mesh(geometry11, material);
        plane12 = new THREE.Mesh(geometry12, material);
        plane13 = new THREE.Mesh(geometry13, material);
        plane14 = new THREE.Mesh(geometry14, material);
        plane15 = new THREE.Mesh(geometry15, material);
        plane16 = new THREE.Mesh(geometry16, material);
        box1 = new THREE.Mesh(geometry17, material);
        box2 = new THREE.Mesh(geometry18, material);
        box3 = new THREE.Mesh(geometry19, material);
        box4 = new THREE.Mesh(geometry20, material);
        box5 = new THREE.Mesh(geometry21, material);
        box6 = new THREE.Mesh(geometry22, material);

        /* ----------------------------- seting position ---------------------------- */

        plane11.position.y = -8.1;
        plane11.position.z = 66;
        plane11.position.x = -108;
        plane11.rotation.y = Math.PI / 2;

        plane12.position.y = -8.1;
        plane12.position.z = -64;
        plane12.position.x = -108;
        plane12.rotation.y = Math.PI / 2;

        plane13.position.y = -8.1;
        plane13.position.z = 76;
        plane13.position.x = 11;

        plane14.position.y = -8.1;
        plane14.position.z = -5;
        plane14.position.x = 109;
        plane14.rotation.y = Math.PI / 2;

        plane15.position.y = -8.1;
        plane15.position.z = 1;
        plane15.position.x = -111;
        plane15.rotation.y = Math.PI / 2;
        plane16.position.set(2, -8.1, -83);

        box1.position.x = -78;
        box1.position.y = -8.1;
        box1.position.z = -70;

        box2.position.x = -28;
        box2.position.y = -8.1;
        box2.position.z = -62;
        box2.rotation.y = 0.3;
        box2.scale.z = 1.5;

        box3.position.x = 104;
        box3.position.y = -8.1;
        box3.position.z = -8;

        box4.position.x = 86;
        box4.position.y = -8.1;
        box4.position.z = 23;

        box5.position.x = 24;
        box5.position.y = -8.1;
        box5.position.z = -52;

        box6.position.x = 21;
        box6.position.y = -8.1;
        box6.position.z = -9;

        plane11.name = "plane11";
        plane12.name = "plane12";
        plane13.name = "plane13";
        plane14.name = "plane14";
        plane15.name = "plane15";
        plane16.name = "plane16";
        //plane.visible = false

        plane11.visible = false;
        plane12.visible = false;
        plane13.visible = false;
        plane14.visible = false;
        plane15.visible = false;
        plane16.visible = false;
        box1.visible = false;
        box2.visible = false;
        box3.visible = false;
        box4.visible = false;
        box5.visible = false;
        box6.visible = false;

        /* ------------------------------ creating box ------------------------------ */

        plane11.userData.box = new THREE.Box3().setFromObject(plane11);
        plane12.userData.box = new THREE.Box3().setFromObject(plane12);
        plane13.userData.box = new THREE.Box3().setFromObject(plane13);
        plane14.userData.box = new THREE.Box3().setFromObject(plane14);
        plane15.userData.box = new THREE.Box3().setFromObject(plane15);
        plane16.userData.box = new THREE.Box3().setFromObject(plane16);
        box1.userData.box = new THREE.Box3().setFromObject(box1);
        box2.userData.box = new THREE.Box3().setFromObject(box2);
        box3.userData.box = new THREE.Box3().setFromObject(box3);
        box4.userData.box = new THREE.Box3().setFromObject(box4);
        box5.userData.box = new THREE.Box3().setFromObject(box5);
        box6.userData.box = new THREE.Box3().setFromObject(box6);

        /* ----------------------------- adding to scene ---------------------------- */

        scene.add(plane11);
        scene.add(plane12);
        scene.add(plane13);
        scene.add(plane14);
        scene.add(plane15);
        scene.add(plane16);
        scene.add(box1);
        scene.add(box2);
        scene.add(box3);
        scene.add(box4);
        scene.add(box5);
        scene.add(box6);
      });
    }
  }
  function rooomCollision() {
    if (room) {
      console.log("room");
	  returntoScene = box.intersectsBox(plane15?.userData?.box)
     
	  if (returntoScene) {
		

		returntoScene = false
		roomEntry++;
		backtoScene()

		// return
	  }
      if (
        box.intersectsBox(plane11?.userData?.box) ||
        box.intersectsBox(plane12?.userData?.box) ||
        box.intersectsBox(plane13?.userData?.box) ||
        box.intersectsBox(plane14?.userData?.box) ||
        box.intersectsBox(plane16?.userData?.box) ||
        box.intersectsBox(box1?.userData?.box) ||
        box.intersectsBox(box2?.userData?.box) ||
        box.intersectsBox(box3?.userData?.box) ||
        box.intersectsBox(box4?.userData?.box) ||
        box.intersectsBox(box5?.userData?.box) ||
        box.intersectsBox(box6?.userData?.box)
      ) {
        movement = true;
        console.log("entered collision");
      }
    }
  }
  /* -------------------------- animate function call ------------------------- */
function backtoScene() {
	if (roomEntry === 1) {
		roomEntry = 0
		
		setCall(true)
		setLoad(true);
      setItemsLoaded(1);

	}

}
  function animate() {
    requestAnimationFrame(animate);
if(text) {
 

  if(text.position.y <8 || text.position.y>5) {
    
    text.position.y+=offset

  }
  
  if(text.position.y >8.09 || text.position.y <5 ) {
    console.log('reached')
    offset=-offset
  }
  // if(labelRenderer){
  //   labelRenderer.render(scene,camera)
  // }
  
  
}
    let delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }

    //  ball.position.x += 0.01;
    //  ball.rotation.y =  ball.rotation.y +.01;

    if (walker) {
      camera.lookAt(
        walker.scene.position.x,
        walker.scene.position.y + 3,
        walker.scene.position.z
      );
    }
    TWEEN.update();
    renderer.render(scene, camera);
    controls.update();
  }
  useEffect(() => {
    init();

    animate();
  }, [call]);
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
      <div className="canvas-container" id='parent'>
        {load === true && (
          <Loader
            width={400}
            test={{ loaded: itemsLoaded, total: itemsTotal }}
          />
        )}
        <canvas id="canvas" style={{ style }} ref={textInput}></canvas>
       
        <p id='content'>hjf</p>
      </div>
    </>
  );
}

export default Three;
