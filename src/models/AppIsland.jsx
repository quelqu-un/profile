import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/appisland.glb";


const AppIsland =({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) => {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
    <a.group ref={islandRef} {...props}>
    
    <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane7_Frond_0.geometry}
            material={materials.Frond}
            position={[0.792, 0.008, -0.276]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane6_Frond_0.geometry}
            material={materials.Frond}
            position={[0.799, 0.11, -0.249]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane2_Frond_0.geometry}
            material={materials.Frond}
            position={[0.779, 0.054, -0.264]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane3_Frond_0.geometry}
            material={materials.Frond}
            position={[0.842, 0.119, -0.246]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane4_Frond_0.geometry}
            material={materials.Frond}
            position={[0.823, 0.102, -0.251]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane5_Frond_0.geometry}
            material={materials.Frond}
            position={[-0.091, 0.458, -0.45]}
            rotation={[-0.058, -0.186, -0.257]}
          />
    
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube3_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder8_Light_Metal_0.geometry}
            material={materials.Light_Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder6_Light_Metal_0.geometry}
            material={materials.Light_Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube2_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder15_Chairs_0.geometry}
            material={materials.Chairs}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder7_Light_Metal_0.geometry}
            material={materials.Light_Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder9_Chairs_0.geometry}
            material={materials.Chairs}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder14_Chairs_0.geometry}
            material={materials.Chairs}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube44_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
            position={[0.273, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube45_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
            position={[0.309, 0, 0]}
          />
     
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder18_Light_Metal_0.geometry}
            material={materials.Light_Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder18_Gray_Metals_0.geometry}
            material={materials.Gray_Metals}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder18_lambert1_0.geometry}
            material={materials.lambert1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder18_Medium_Metal_0.geometry}
            material={materials.Medium_Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane19_Umbrella_Yellow_0.geometry}
            material={materials.Umbrella_Yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane18_Umbrella_Yellow_0.geometry}
            material={materials.Umbrella_Yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane15_Umbrella_Yellow_0.geometry}
            material={materials.Umbrella_Yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane16_Umbrella_Yellow_0.geometry}
            material={materials.Umbrella_Yellow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pPlane17_Umbrella_Yellow_0.geometry}
            material={materials.Umbrella_Yellow}
          />
   
                                                  
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube35_Medium_Metal_0.geometry}
            material={materials.Medium_Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube35_Gray_Metals_0.geometry}
            material={materials.Gray_Metals}
          />
   
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube19_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube16_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube14_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube40_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube37_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube39_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube38_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube41_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube42_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube43_Wood_Parts_0.geometry}
            material={materials.Wood_Parts}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder17_Light_Metal_0.geometry}
            material={materials.Light_Metal}
          />
      
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCube4_Chairs_0.geometry}
            material={materials.Chairs}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pCylinder13_Floaty_Details_0.geometry}
            material={materials.Floaty_Details}
          />
      
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube1_Phone_Back_Stuff_0.geometry}
          material={materials.Phone_Back_Stuff}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube1_Gray_Metals_0.geometry}
          material={materials.Gray_Metals}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder1_Sandy_0.geometry}
          material={materials.Sandy}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pPlane1_Water_0.geometry}
          material={materials.Water}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder2_Tree_Trunk_0.geometry}
          material={materials.Tree_Trunk}
          position={[0.748, -0.217, -0.269]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere1_Coconut_0.geometry}
          material={materials.Coconut}
          position={[2.412, -0.329, -0.234]}
          rotation={[0, 0, Math.PI / 6]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube8_Icon1_0.geometry}
          material={materials.Icon1}
          position={[0, 0.157, 0.006]}
          rotation={[-0.068, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder16_Floaty_Details_0.geometry}
          material={materials.Floaty_Details}
          position={[-0.132, 0, 0.001]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube9_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.04, 0.001, 0]}
          rotation={[0, 0, -0.059]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube11_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube12_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[0, 0, -0.078]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pPlane10_Water_Walk_0.geometry}
          material={materials.Water_Walk}
          position={[0, 0.018, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube13_Icon9_0.geometry}
          material={materials.Icon9}
          position={[-0.696, -0.096, 0.032]}
          rotation={[0.067, 0.523, -0.033]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere3_Coconut_0.geometry}
          material={materials.Coconut}
          position={[-0.769, 3.01, 1.18]}
          rotation={[-0.812, 0.277, -0.745]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere4_Coconut_0.geometry}
          material={materials.Coconut}
          position={[0.484, 1.626, -4.042]}
          rotation={[-2.487, 0.424, -2.234]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere5_Coconut_0.geometry}
          material={materials.Coconut}
          position={[4.137, -2.145, 0.417]}
          rotation={[3.029, 0.326, 2.71]}
          scale={1.098}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube23_Icon8_0.geometry}
          material={materials.Icon8}
          position={[-1.706, -0.027, -2.005]}
          rotation={[0, 0, -0.064]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube24_Icon7_0.geometry}
          material={materials.Icon7}
          position={[1.722, -0.101, -2.018]}
          rotation={[0.055, 0, 0.032]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube25_Icon5_0.geometry}
          material={materials.Icon5}
          position={[2.612, -0.049, -0.531]}
          rotation={[0, 0.262, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube26_Icon4_0.geometry}
          material={materials.Icon4}
          position={[-0.005, -0.531, -2.086]}
          rotation={[0.204, 0, -0.191]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube27_Phone_Back_Stuff_0.geometry}
          material={materials.Phone_Back_Stuff}
          position={[-0.006, 0.307, -0.183]}
          rotation={[-0.011, 0.549, -0.035]}
          scale={[1, 0.673, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube28_Phone_Back_Stuff_0.geometry}
          material={materials.Phone_Back_Stuff}
          position={[-0.421, 1.069, 0]}
          scale={0.083}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pPlane11_Floaty_Details_0.geometry}
          material={materials.Floaty_Details}
          position={[0.079, -0.073, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pPlane12_Floaty_Details_0.geometry}
          material={materials.Floaty_Details}
          position={[0, -0.002, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pPlane13_Floaty_Details_0.geometry}
          material={materials.Floaty_Details}
          position={[0.459, -0.173, 0.33]}
          rotation={[0.148, -0.504, 0.3]}
          scale={1.314}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pPlane14_Floaty_Details_0.geometry}
          material={materials.Floaty_Details}
          position={[-0.956, -0.588, 0.564]}
          rotation={[-0.464, -0.659, -0.685]}
          scale={1.588}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube29_Icon6_0.geometry}
          material={materials.Icon6}
          position={[-1.763, -0.028, 6.532]}
          rotation={[0, 0, 0.042]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube30_Icon2_0.geometry}
          material={materials.Icon2}
          position={[0.772, -0.154, 4.064]}
          rotation={[0.087, -0.522, 0.044]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere6_Coconut_0.geometry}
          material={materials.Coconut}
          position={[4.107, -2.365, 0.563]}
          rotation={[-2.376, 1.038, 2.335]}
          scale={1.098}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube31_Phone_Back_Stuff_0.geometry}
          material={materials.Phone_Back_Stuff}
          position={[-0.554, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube32_Phone_Back_Stuff_0.geometry}
          material={materials.Phone_Back_Stuff}
          position={[0, 0, -0.852]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube33_Phone_Back_Stuff_0.geometry}
          material={materials.Phone_Back_Stuff}
          position={[-0.554, 0, -1.067]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube34_Phone_Back_Stuff_0.geometry}
          material={materials.Phone_Back_Stuff}
          position={[0.575, 0, -4.277]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface1_Icon10_0.geometry}
          material={materials.Icon10}
          position={[-2.7, -0.31, -3.256]}
          rotation={[0, -0.262, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder19_Floaty_Details_0.geometry}
          material={materials.Floaty_Details}
          position={[0.278, 0.064, 0.303]}
          rotation={[0, -Math.PI / 6, 0.262]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube46_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-1.092, 0.02, -0.072]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube47_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[0.048, -0.01, 0.014]}
          rotation={[0, 0, 0.068]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube48_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.305, -0.011, 0.014]}
          rotation={[0, 0, 0.069]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube49_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[0.33, 0, 0]}
          rotation={[0, 0, -0.029]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube50_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.439, -0.029, 0.017]}
          rotation={[-0.023, 0, -0.114]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube51_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.519, -0.056, 0.025]}
          rotation={[-0.035, 0, 0.028]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube52_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[0, 0, -0.665]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube54_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[0.021, -0.046, 0.046]}
          rotation={[-0.066, 0, 0.043]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube56_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[0.153, -0.071, 0.042]}
          rotation={[-0.061, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube57_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.224, -0.243, 1.59]}
          rotation={[0, 0, -0.085]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube58_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[0.193, -0.266, 1.576]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube59_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.572, -0.245, 1.59]}
          rotation={[0, 0, -0.069]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube60_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.126, -0.256, 1.576]}
          rotation={[0, 0, 0.059]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube61_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.637, -0.282, 1.59]}
          rotation={[0, 0, 0.094]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube62_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube63_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.16, -0.186, 1.509]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube64_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.904, -0.186, 1.509]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube65_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[0, 0, -0.519]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube67_Wood_Parts_0.geometry}
          material={materials.Wood_Parts}
          position={[-0.909, -0.253, 0.99]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube68_Icon3_0.geometry}
          material={materials.Icon3}
          position={[-3.316, -0.485, 2.62]}
          rotation={[0.779, -1.226, 0.694]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere7_Light_Metal_0.geometry}
          material={materials.Light_Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere8_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.093, -0.035, 0]}
          rotation={[0, 0, 0.109]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere9_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.385, 0.017, 0]}
          rotation={[0, 0, -0.055]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere10_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.434, -0.038, 0]}
          rotation={[0, 0, 0.121]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere11_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.792, 0.17, -0.048]}
          rotation={[0.073, -0.011, -0.144]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere12_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.821, -0.064, 0.017]}
          rotation={[-0.029, -0.016, 0.05]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere13_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.982, -0.018, 0]}
          rotation={[0, 0, 0.121]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere14_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.968, -0.176, -0.784]}
          rotation={[-0.078, -0.009, 0.12]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere15_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.152, -0.267, 1.589]}
          rotation={[0, 0, 0.004]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere16_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.378, -0.241, 1.589]}
          rotation={[0, 0, -0.057]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere17_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.457, -0.283, 1.589]}
          rotation={[0, 0, 0.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere18_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.71, -0.254, 1.589]}
          rotation={[0, 0, -0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere19_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.766, -0.315, 1.589]}
          rotation={[0, 0, 0.151]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere20_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.766, -0.315, 1.066]}
          rotation={[0, 0, 0.151]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere21_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.71, -0.254, 1.068]}
          rotation={[0, 0, -0.02]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere22_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.457, -0.283, 1.066]}
          rotation={[0, 0, 0.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere23_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.378, -0.241, 1.067]}
          rotation={[0, 0, -0.057]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere24_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.152, -0.267, 1.067]}
          rotation={[0, 0, 0.004]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere25_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.816, 0.317, -1.286]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere26_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.722, 0.317, -1.286]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere27_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.626, 0.317, -1.286]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere28_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.528, 0.317, -1.286]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere29_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.816, 0.317, -1.574]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere30_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.722, 0.317, -1.574]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere31_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.626, 0.317, -1.574]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere32_Light_Metal_0.geometry}
          material={materials.Light_Metal}
          position={[-0.536, 0.317, -1.574]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube69_Icon11_0.geometry}
          material={materials.Icon11}
          position={[1.755, -0.075, 6.532]}
          rotation={[0, 0, -0.146]}
        />
    

    </a.group>
  );
}
export default AppIsland