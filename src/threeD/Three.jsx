import { useEffect, useState,useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
function Three() {
    const textInput = useRef(null)
    useEffect(() => {

       
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x3100c08);
        const canvas = document.querySelector("#canvas")
        const renderer = new THREE.WebGLRenderer({canvas,antialias:true})
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        const camera = new THREE.PerspectiveCamera(
              45,
              canvas.offsetWidth / canvas.offsetHeight,
              1,
              10000
            );
            camera.position.set(-100, 60, 700);
            camera.lookAt(0, 0, 0);
            const loader = new GLTFLoader();
            loader.load("./model/testing_rooms/scene.gltf",(model)=>{
              console.log(model.scene)
              // model.scale.set(.001,.0001,.001)
                scene.add(model.scene)

            })
            
    function animate() {
        requestAnimationFrame(animate);
       
        renderer.render(scene,camera);
       
        }
        animate()
      
     
    }, [])

  return (
    <>
      <div className="canvas-container">
        {" "}
        <canvas id="canvas" ref={textInput}></canvas>
      </div>
    </>
  );
}

export default Three