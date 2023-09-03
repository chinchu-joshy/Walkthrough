
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
function loadRoomModel(
  canvas,
  modelNAme,
  scene,
  setLoad,
  load,
  setItemsLoaded,
  setITemsTotal,
  
) {
 
  console.log(modelNAme)
  return new Promise((resolve, reject) => {
   let room;
   let textMesh1
   let textMesh2
   let textMesh3
    const manager = new THREE.LoadingManager();
    const loader = new FBXLoader(manager);
    const fontLoader = new FontLoader(manager);
    fontLoader.load("./fonts/helvetiker.json", function (font) {
      const textgeometry = new TextGeometry("EXIT !", {
        font: font,
        size: 2.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.5,
        bevelSize: 0.3,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const material = [
        new THREE.MeshPhongMaterial({
          color: 0xff22cc,
          flatShading: true,
        }), // front
        new THREE.MeshPhongMaterial({
          color: 0xffcc22,
        }), // side
      ];
      textMesh1 = new THREE.Mesh(textgeometry, material);
      textMesh1.name = "exit";
      textMesh1.rotation.y = Math.PI/2;
      textMesh1.position.set(-108, 9, 12);

      scene.add(textMesh1);
      console.log(textMesh1);




      const textgeometry2 = new TextGeometry('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', {
        font: font,
        size: .2,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.5,
        bevelSize: 0.3,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      const material2 = [
        new THREE.MeshPhongMaterial({
          color: 0xff22cc,
          flatShading: true,
        }), // front
        new THREE.MeshPhongMaterial({
          color: 0xffcc22,
        }), // side
      ];
      textMesh2 = new THREE.Mesh(textgeometry2, material);
      textMesh2.name = "about";
      textMesh2.rotation.y = Math.PI/2;
      textMesh2.position.set(-90, 9, 12);

      scene.add(textMesh2);
      console.log(textMesh2);
    });
    
   
    
    loader.load(`./model/${modelNAme}.fbx`, (model) => {
      console.log("reached")
      window.room = model;
      room = model

      model.position.y = -10;
      model.name = "room";
      // model.rotation.x =-Math.PI/2

      model.scale.set(.08, .08, .08)
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        child.receiveShadow = true;
        child.material.metalness = .1;
        child.material.roughness = 0.65;
        }
        if ( child.name === 'Plane003' ||child.name === 'Plane' || child.name === 'Plane002') {
         child.visible = false
        

        } else{
          child.userData.box = new THREE.Box3().setFromObject(child)
          // const helper = new THREE.Box3Helper(new THREE.Box3().setFromObject(child), 0xffff00);
          // scene.add(helper);
        }
       


      })
      
    });
    manager.onStart = function (url, itemsLoaded, itemsTotal) { };

    manager.onLoad = function () {
      console.log("finished")
      setTimeout(() => {
         scene.add(room)
        setLoad(!load);
        resolve({ status: true, model: room });

      }, 3000)

    };

    manager.onProgress = function (url, itemLoaded, itemTotal) {
      setItemsLoaded(itemLoaded);
      setITemsTotal(itemTotal);
    };

    manager.onError = function (url) { };
  });
}

export default loadRoomModel;