import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

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
    const manager = new THREE.LoadingManager();
    const loader = new FBXLoader(manager);
    const streetLOader = new GLTFLoader(manager);
    console.log(format)
    format && loader.load(`./model/${modelNAme}.fbx`, (model) => {
      window.model = model;
      building=model
      building = model;
      model.position.y = -10;
      model.name = "corridor";
      // model.rotation.x =-Math.PI/2
      const group = new THREE.Group();
      group.attach(model);
      //scene.add(group)
        //model.scale.set(.01,.01,.01)

      model.traverse((child) => {
        if (child.isMesh) {
          child.material.color = new THREE.Color(0x5e6069);
          child.material.needsUpdate = true;
        }
        if (child.name.includes("Plane")) {
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
          const texture = new THREE.TextureLoader();
          texture.load(
            "./model/vampire-castle-corridor/textures/CorridorDoorFrame.png",
            (texture) => {
              child.material.map = texture;
              child.material.needsUpdate = true;
            }
          );
        }
      });

      //scene.add(model);
    });
    !format && streetLOader.load(`./model/${modelNAme}/scene.gltf`,(model)=>{
      model.scene.position.y = -10;
      //scene.add(model.scene);
      model.scene.position.z = -20;
      model.scene.rotation.y = -Math.PI;
      model.scene.scale.set(.5,.5,.5);
      console.log(model)
      building = model.scene
      window.model=model.scene
      model.scene.name = "corridor";

  })

    const loaderMiya = new GLTFLoader(manager);
    loaderMiya.load("./model/character_walk/scene.gltf", (model) => {
     // scene.add(model.scene);
      mixer = new THREE.AnimationMixer(model.scene);
      model.scene.position.y = -10;
      model.scene.position.z = -20;
      model.scene.scale.set(5, 5, 5);
      model.scene.rotation.y = -Math.PI;
      
      model.scene.name = "walking";

      walker = model;
    });
    manager.onStart = function (url, itemsLoaded, itemsTotal) {};

    manager.onLoad = function () {
      console.log("finished")
     setTimeout(()=>{
      scene.add(building)
      scene.add(walker.scene)
      setLoad(!load);
      resolve({ status: true, mixer: mixer, model: walker });

     },3000)
     
    };

    manager.onProgress = function (url, itemLoaded, itemTotal) {
      setItemsLoaded(itemLoaded);
      setITemsTotal(itemTotal);
    };

    manager.onError = function (url) {};
  });
}

export default loadModel;