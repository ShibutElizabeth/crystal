import {Canvas, useFrame} from "@react-three/fiber";
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
  const aRef = useRef();

  function Rig() {
    let k = 2;
    let time = 0;
    
    useFrame((state, delta) => {
      
      // console.log(state.camera)
      // console.log(mref.current)
      // easing.damp3(
      //   state.camera.position,
      //   [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
      //   0.2,
      //   delta,
      // );
      state.camera.lookAt(0, 0, 0);
      if(cRef.current && bRef.current){
        const epsilon = 0.0; // Допуск для точности
        group.current.rotation.y += 0.01;
        crystalRef.current.rotation.y -= 0.006;
        easing.damp3(
          crystalRef.current.rotation,
          [Math.sin(-state.pointer.x), state.pointer.y, 0],
          0.5,
          delta
        );
        const rotationY = group.current.rotation.y % (Math.PI * 2);

        group.current.position.y = 0.7 * (Math.cos(time * k));
        time += delta;

        // Первый объект (виден от 0 до π/2 и от 3π/2 до 2π)
        const isVisibleFirst = (Math.abs(rotationY) + epsilon < Math.PI / 2) || (Math.abs(rotationY) - epsilon < Math.PI / 2) 
          || (Math.abs(rotationY) + epsilon > 3 * Math.PI / 2) || (Math.abs(rotationY) - epsilon > 3 * Math.PI / 2);

        // Управление видимостью
        bRef.current.visible = isVisibleFirst;
        cRef.current.visible = !isVisibleFirst;
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
        fov: 50,
        // zoom: 50,
        // isOrthographicCamera: true,
        }}>
        <color attach="background" args={["#e0e0e0"]}/>
        <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2}/>
        {/* <Status position={[0, 0, -10]}/> */}
        {/* <Float floatIntensity={2}> */}
          <Crystal crystalRef={crystalRef} groupRef={group} bRef={bRef} cRef={cRef} aRef={aRef}/>
        {/* </Float> */}
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
                position={[-10, 15, 0]}
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
