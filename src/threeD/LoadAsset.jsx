import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

function loadModel(
  modelNAme,
  scene,
  setLoad,
  load,
  setItemsLoaded,
  setITemsTotal,
  format
) {
  console.log(modelNAme)
  return new Promise((resolve, reject) => {
    let walker;
    let mixer;
    let building;
    let textMesh1
    const manager = new THREE.LoadingManager();
    const loader = new FBXLoader(manager);
    const streetLOader = new GLTFLoader(manager);
    const fontLoader = new FontLoader(manager);
     fontLoader.load( './fonts/helvetiker.json', function ( font ) {

      const textgeometry = new TextGeometry( 'EXPLORE !', {
        font:font,
        size: 1.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.5,
        bevelSize: 0.3,
        bevelOffset: 0,
        bevelSegments: 5,
      } );
      const material =[
        new THREE.MeshPhongMaterial({
           color: 0xff22cc,
           flatShading: true,
        }), // front
        new THREE.MeshPhongMaterial({
           color: 0xffcc22
        }), // side
     ]
  ;
       textMesh1 = new THREE.Mesh( textgeometry, material );
       textMesh1.name='explore'
      textMesh1.rotation.y=Math.PI
      textMesh1.position.set(33,6,31)
      
      scene.add(textMesh1)
      console.log(textMesh1)
     } );
    format && loader.load(`./model/3.fbx`, (model) => {
      console.log("reached")
      window.model = model;
      building = model

      model.position.y = -10;
      model.name = "street";
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
      //model.position.z = -10

      // model.traverse((child) => {

      //   if (child.name.includes("Plane")) {
      //     const texture = new THREE.TextureLoader();
      //     texture.load(
      //       "./model/vampire-castle-corridor/textures/CorridorFloor.png",
      //       (texture) => {
      //         child.material.map = texture;
      //         child.material.needsUpdate = true;
      //       }
      //     );
      //   }
      //   if (child.name.includes("corridorpCube")) {
      //     const texture = new THREE.TextureLoader();
      //     texture.load(
      //       "./model/vampire-castle-corridor/textures/CorridorBricksAligned.png",
      //       (texture) => {
      //         child.material.map = texture;
      //         child.material.needsUpdate = true;
      //       }
      //     );
      //   }
      //   if (child.isMesh && child.name.includes("pCylinder")) {
      //     const texture = new THREE.TextureLoader();
      //     texture.load(
      //       "./model/vampire-castle-corridor/textures/CorridorRoof.png",
      //       (texture) => {
      //         child.material.map = texture;
      //         child.material.needsUpdate = true;
      //       }
      //     );
      //   }
      //   if (
      //     child.isMesh &&
      //     (child.name.includes("polySurface51") ||
      //       child.name.includes("polySurface69"))
      //   ) {
      //     const texture = new THREE.TextureLoader();
      //     texture.load(
      //       "./model/vampire-castle-corridor/textures/CorridorDoorFrame.png",
      //       (texture) => {
      //         child.material.map = texture;
      //         child.material.needsUpdate = true;
      //       }
      //     );
      //   }
      // });


    });
    // format && loader.load(`./model/${modelNAme}.fbx`, (model) => {
    //   window.model = model;
    //   building=model
    //   building = model;
    //   model.position.y = -10;
    //   model.name = "corridor";
    //   // model.rotation.x =-Math.PI/2
    //   const group = new THREE.Group();
    //   group.attach(model);
    //   //scene.add(group)
    //     //model.scale.set(.01,.01,.01)

    //   model.traverse((child) => {
    //     if (child.isMesh) {
    //       child.material.color = new THREE.Color(0x5e6069);
    //       child.material.needsUpdate = true;
    //     }
    //     if (child.name.includes("Plane")) {
    //       const texture = new THREE.TextureLoader();
    //       texture.load(
    //         "./model/vampire-castle-corridor/textures/CorridorFloor.png",
    //         (texture) => {
    //           child.material.map = texture;
    //           child.material.needsUpdate = true;
    //         }
    //       );
    //     }
    //     if (child.name.includes("corridorpCube")) {
    //       const texture = new THREE.TextureLoader();
    //       texture.load(
    //         "./model/vampire-castle-corridor/textures/CorridorBricksAligned.png",
    //         (texture) => {
    //           child.material.map = texture;
    //           child.material.needsUpdate = true;
    //         }
    //       );
    //     }
    //     if (child.isMesh && child.name.includes("pCylinder")) {
    //       const texture = new THREE.TextureLoader();
    //       texture.load(
    //         "./model/vampire-castle-corridor/textures/CorridorRoof.png",
    //         (texture) => {
    //           child.material.map = texture;
    //           child.material.needsUpdate = true;
    //         }
    //       );
    //     }
    //     if (
    //       child.isMesh &&
    //       (child.name.includes("polySurface51") ||
    //         child.name.includes("polySurface69"))
    //     ) {
    //       const texture = new THREE.TextureLoader();
    //       texture.load(
    //         "./model/vampire-castle-corridor/textures/CorridorDoorFrame.png",
    //         (texture) => {
    //           child.material.map = texture;
    //           child.material.needsUpdate = true;
    //         }
    //       );
    //     }
    //   });

    //   //scene.add(model);
    // });
    !format && streetLOader.load(`./model/${modelNAme}/scene.gltf`, (model) => {
      model.scene.position.y = -10;
      //scene.add(model.scene);
      model.scene.position.z = -20;
      model.scene.rotation.y = -Math.PI;
      model.scene.scale.set(.5, .5, .5);
      console.log(model)
      building = model.scene
      window.model = model.scene
      model.scene.name = "corridor";

    })

    const loaderMiya = new GLTFLoader(manager);
    loaderMiya.load("./model/character_walk/scene.gltf", (model) => {
      // scene.add(model.scene);
      mixer = new THREE.AnimationMixer(model.scene);
      model.scene.position.y = -9.8;
      model.scene.position.z = -8.799999999999981;
      model.scene.scale.set(5,5,5);
      model.scene.rotation.y = -Math.PI;
       model.scene.traverse((child)=>{
        if (child.isMesh) {
          child.castShadow = true;
        child.receiveShadow = true;
        child.material.metalness = .1;
        child.material.roughness = 0.65;
        }
        
       })
      model.scene.name = "walking";

      walker = model;
      window.walker = walker.scene
    });
    manager.onStart = function (url, itemsLoaded, itemsTotal) { };

    manager.onLoad = function () {
      console.log("finished")
      setTimeout(() => {
        scene.add(building)
        scene.add(walker.scene)
        setLoad(!load);
        resolve({ status: true, mixer: mixer, model: walker, street: building ,text:textMesh1});

      }, 3000)

    };

    manager.onProgress = function (url, itemLoaded, itemTotal) {
      setItemsLoaded(itemLoaded);
      setITemsTotal(itemTotal);
    };

    manager.onError = function (url) { };
  });
}

export default loadModel;