import React from "react";
import {
    useGLTF,
    MeshTransmissionMaterial
} from "@react-three/drei";
import { Color } from "three";

useGLTF.preload("/crypcoinJ.glb");

const Crystal = (props) => {
    const { crystalRef, groupRef, bRef, cRef, aRef } = props;
    
    const bc = useGLTF("/crypcoinJ.glb ");
    console.log(bc.nodes)
    return (
        <group name={"group"}>
            <mesh ref={crystalRef} name="crystal">
                <icosahedronGeometry args={[6, 0]}/>
                <MeshTransmissionMaterial backside backsideThickness={0.5} thickness={0.5} background={new Color('rgb(224, 224, 224)')}/>
            </mesh>
            <group ref={groupRef}>
                <group name={"bitcoin"}>
                    <mesh
                    ref={bRef}
                    receiveShadow
                    castShadow
                    geometry={bc.nodes.Bitcoin.geometry}
                    scale={2.42}

                    rotation={[0, Math.PI, 0]}
                    
                    >
                        <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(0, 0, 0)"}
                        />
                        {/* <MeshTransmissionMaterial 
                        backside 
                        backsideThickness={1} 
                        thickness={1}
                        transmissionSampler={true}
                        // distortion={1}
                        // distortionScale={1}
                        color={"rgb(100, 100, 100)"}
                        /> */}
                    </mesh>
                </group>
                <group ref={cRef} name={"crypgex"}>
                    {/* <mesh
                    // ref={aRef}
                    receiveShadow
                    castShadow
                    geometry={bc.nodes.ArrowPart.geometry}
                    scale={2.5}
                    // rotation={[0, Math.PI/2, 0]}
                    >
                        <meshStandardMaterial
                        // opacity={1}
                        // transparent
                        roughness={1}
                        color={"rgb(100, 100, 100)"}
                        />
                        {/* <MeshTransmissionMaterial 
                        backside 
                        backsideThickness={0.5}
                        thickness={0.5}
                        transmissionSampler={true}
                        // roughness={0.5}
                        color={"rgb(255, 0, 255)"}
                        // distortion={0.5}
                        // distortionScale={2}
                        /> 
                    </mesh> */}
                    <mesh
                    //  ref={cRef}
                    receiveShadow
                    castShadow
                    geometry={bc.nodes.XPart.geometry}
                    scale={2.5}
                    // rotation={[Math.PI/40, 0, 0]}
                    >
                        <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(0, 0, 0)"}
                        />
                        {/* <meshStandardMaterial
                        roughness={1}
                        color={"rgb(100, 100, 100)"}
                        /> */}
                        {/* <MeshTransmissionMaterial 
                        backside 
                        backsideThickness={1}
                        thickness={1}
                        transmissionSampler={true}
                        color={"rgb(100, 100, 100)"}
                        // distortion={1}
                        // distortionScale={1}
                        /> */}
                    </mesh>
                </group>
            </group>
        </group>
    )
}

export default Crystal;