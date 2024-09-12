import React from "react";
import {
    useGLTF,
    MeshTransmissionMaterial
} from "@react-three/drei";

useGLTF.preload("/bc_crypgex2.glb");

const Crystal = (props) => {
    const { crystalRef, groupRef, bRef, cRef, transition } = props;
    const bc = useGLTF("/bc_crypgex2.glb ");
    // console.log(crypgex.nodes)
    console.log(bc.nodes)

    return (
        <group name={"group"}>
            <mesh ref={crystalRef} name="crystal">
                <icosahedronGeometry args={[6, 0]}/>
                <MeshTransmissionMaterial backside backsideThickness={0.5} thickness={0.5}/>
            </mesh>
            <group ref={groupRef}>
                <group name={"bitcoin"}>
                    <mesh
                    ref={bRef}
                    receiveShadow
                    castShadow
                    geometry={bc.nodes.Bitcoin.geometry}
                    scale={2.5}
                    rotation={[0, -Math.PI, 0]}
                    
                    >
                        <MeshTransmissionMaterial 
                        backside 
                        backsideThickness={1} 
                        thickness={1}
                        transmissionSampler={true}
                        />
                    </mesh>
                </group>
                <group name={"crypgex"}>
                    <mesh
                    ref={cRef}
                    receiveShadow
                    castShadow
                    geometry={bc.nodes.Crypgex.geometry}
                    scale={2.5}
                    // rotation={[0, -Math.PI, 0]}
                    
                    >
                        <MeshTransmissionMaterial 
                        backside 
                        backsideThickness={1}
                        thickness={1}
                        transmissionSampler={true}
                        />
                    </mesh>
                </group>
            </group>
            
        </group>
    )
}

export default Crystal;