import React from "react";
import {
    useGLTF,
    MeshTransmissionMaterial
} from "@react-three/drei";
import { Color } from "three";

useGLTF.preload("/crypcoinNew.glb");

const Crystal = (props) => {
    const { crystalRef, groupRef, bRef, cRef } = props;
    
    const bc = useGLTF("/crypcoinNew.glb ");
    console.log(bc.nodes)
    return (
        <group name={"group"}>
            <mesh ref={crystalRef} name="crystal">
                <icosahedronGeometry args={[6, 0]}/>
                <MeshTransmissionMaterial backside backsideThickness={0.5} thickness={0.5} background={new Color('rgb(224, 224, 224)')}/>
            </mesh>
            <group ref={groupRef}>
                <group ref={bRef} name={"bitcoin"}>
                    <mesh
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
                    </mesh>
                    <mesh
                    ref={bRef}
                    receiveShadow
                    castShadow
                    geometry={bc.nodes.BitcoinLine.geometry}
                    scale={2.42}
                    rotation={[0, Math.PI, 0]}
                    
                    >
                        <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(0, 0, 0)"}
                        />
                    </mesh>
                </group>
                <group ref={cRef} name={"crypgex"}>
                    <mesh
                    receiveShadow
                    castShadow
                    geometry={bc.nodes.XPart.geometry}
                    scale={2.5}
                    >
                        <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(0, 0, 0)"}
                        />
                    </mesh>
                    <mesh
                    receiveShadow
                    castShadow
                    geometry={bc.nodes.XPartLine.geometry}
                    scale={2.5}
                    >
                        <meshBasicMaterial 
                        roughness={1}
                        color={"rgb(0, 0, 0)"}
                        />
                    </mesh>
                </group>
            </group>
        </group>
    )
}

export default Crystal;