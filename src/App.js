import {Canvas, useFrame} from "@react-three/fiber";
import { useState } from "react";
import {
    Float,
    Lightformer,
    ContactShadows,
    Environment,
} from "@react-three/drei";
import {easing} from "maath";
import { useRef } from "react";
import gsap from "gsap";
import Crystal from "./Crystal";
import Status from "./Status";

export const App = () => {
  const path = '/back.hdr';
  const crystalRef = useRef();
  const group = useRef();
  const bRef = useRef();
  const cRef = useRef();

  const [rotationY, setRotationY] = useState(0);
  const [transition, setTransition] = useState(0);



  function Rig() {
    let k = 2;
    let time = 0;
    useFrame((state, delta) => {
      easing.damp3(
        state.camera.position,
        [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
        0.2,
        delta,
      );
      state.camera.lookAt(0, 0, 0);
      if(cRef.current && bRef.current){
        const epsilon = 0.01; // Допуск для точности
        group.current.rotation.y += 0.02;
        const rotationY = group.current.rotation.y % (Math.PI * 2);

        // bRef.current.position.y = 0.7* Math.cos(time * k)
        group.current.position.y = 0.7 * Math.cos(time * k) -0.5;
        time += delta;

        // Первый объект (виден от 0 до π/2 и от 3π/2 до 2π)
        const isVisibleFirst = (rotationY <= Math.PI / 2 + epsilon) || (rotationY <= Math.PI / 2 - epsilon) 
        || (rotationY > 3 * Math.PI / 2 + epsilon) || (rotationY > 3 * Math.PI / 2 - epsilon);

        // Второй объект (виден от π/2 до 3π/2)
        const isVisibleSecond = ((rotationY >= Math.PI / 2) && (rotationY <= 3 * Math.PI / 2)); //|| ((rotationY >= Math.PI / 2) && (rotationY <= 3 * Math.PI / 2));


        // Управление видимостью
        bRef.current.visible = isVisibleFirst;
        cRef.current.visible = isVisibleSecond;
      }
    })
  }

  return ( 
    <> 
      <Canvas
        eventSource={document.getElementById("root")}
        eventPrefix="client"
        shadows
        camera={{
        position: [
            0, 0, 20
        ],
        fov: 50
        }}>
        <color attach="background" args={["#e0e0e0"]}/>
        <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2}/>
        <Status position={[0, 0, -10]}/>
        <Float floatIntensity={2}>
          <Crystal crystalRef={crystalRef} groupRef={group} bRef={bRef} cRef={cRef} transition={transition}/>
        </Float>
        <ContactShadows
            scale={100}
            position={[0, -8, 0]}
            blur={1}
            far={100}
            opacity={0.85}/>
        <Environment files={path}>
            <Lightformer
                intensity={10}
                position={[10, 15, 0]}
                scale={[10, 50, 1]}
                onUpdate={(self) => self.lookAt(0, 0, 0)}/>
            <Lightformer
                intensity={10}
                position={[-10, 5, 0]}
                scale={[10, 20, 1]}
                color={"rgb(0, 20, 92)"}
                onUpdate={(self) => self.lookAt(0, 0, 0)}/>
            <Lightformer
                intensity={10}
                position={[10, 10, 0]}
                scale={[10, 20, 1]}
                color={"rgb(105, 0, 87)"}
                onUpdate={(self) => self.lookAt(0, 0, 0)}/>
            <Lightformer
                intensity={10}
                position={[0, 5, 0]}
                scale={[10, 20, 1]}
                color={"rgb(52, 34, 107)"}
                onUpdate={(self) => self.lookAt(0, 0, 0)}/>
            <Lightformer
                intensity={10}
                position={[0, 5, -2]}
                scale={[10, 50, 1]}
                color={"rgb(23, 0, 92)"}
                onUpdate={(self) => self.lookAt(0, 0, 0)}/>
        </Environment>
        <Rig/>
      </Canvas> 
    </>
  );
}
//rgb(46, 210, 255) rgb(255, 0, 251) rgb(0, 13, 130) rgb(115, 0, 255)
