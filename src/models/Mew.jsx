import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import MewScene from "../assets/3d/mew.glb";


const Mew = () => {
    const birdRef = useRef();

      // Load the 3D model and animations from the provided GLTF file
      const { scene, animations } = useGLTF(MewScene);
    
      // Get access to the animations for the bird
      const { actions } = useAnimations(animations, birdRef);
    
      // Play the "Take 001" animation when the component mounts
      // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
      useEffect(() => {
        actions["Take 001"].play();
      }, []);
    
      useFrame(({ clock, camera }) => {
        // Update the Y position to simulate bird-like motion using a sine wave
        birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5 + 2;

    
        // Check if the bird reached a certain endpoint relative to the camera
        if (birdRef.current.position.x > camera.position.x + 35) {
          // Change direction to backward and rotate the bird 180 degrees on the y-axis
          birdRef.current.rotation.y =  179.45;
        } else if (birdRef.current.position.x < camera.position.x - 10) {
          // Change direction to forward and reset the bird's rotation
          birdRef.current.rotation.y = 0;
        }
    
        // Update the X and Z positions based on the direction
        if (birdRef.current.rotation.y === 0) {
          // Moving forward
          birdRef.current.position.x += 0.2;
          birdRef.current.position.z -= 0.2;
        } else {
          // Moving backward
          birdRef.current.position.x -= 0.2;
          birdRef.current.position.z += 0.2;
        }
      });
  return (
    <mesh ref={birdRef}  rotation={[9.8, 19, 10]} position={[-5, 3, 1]} scale={[0.8, 0.8 , 0.8]}>
    
    <primitive object={scene} />
  </mesh>
  );
  }


export default Mew

{/* <skinnedMesh
name="Object_7"
geometry={nodes.Object_7.geometry}
material={materials.blinn1}
skeleton={nodes.Object_7.skeleton}
/> */}