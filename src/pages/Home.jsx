import { Suspense, useEffect, useRef, useState } from "react";
import sakura from "../assets/sakura.mp3";
import {Canvas} from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/AppIsland'
import Sky from '../models/Sky'
import Mew from '../models/Mew'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'
import { soundoff, soundon } from "../assets/icons";

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  const timeoutRef = useRef(null);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        setIsTextVisible(false); // Hide text
        clearTimeout(timeoutRef.current);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        timeoutRef.current = setTimeout(() => {
          setIsTextVisible(true); // Show text after 3 seconds
        }, 2000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [0.8, 0.8, 0.8];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -3.2, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.7, 1.7, 1.7];
      screenPosition = [0.5, -1.5, -18.4];
    } else {
      screenScale = [5, 5, 5];
      screenPosition = [1, -3.5, -38.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
         {isTextVisible && <HomeInfo />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[3.5, 3, 0.5]} intensity={4} />
          <ambientLight intensity={2} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={5}
          />

          <Mew />
          <Sky isRotating={isRotating} />
          <Island
           
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.4, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, -20.2, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-9 h-9 cursor-pointer object-contain'
        />
      </div>
    </section>
  );
};

export default Home;