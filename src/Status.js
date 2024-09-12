import React from "react";
import {
    Text,
    Html
} from "@react-three/drei";
import {suspend} from "suspend-react";
const inter = import ("@pmndrs/assets/fonts/inter_regular.woff");

const Status = (props) => {
    const text = "crypgex";
    
    return (
        <Text
            fontSize={14}
            letterSpacing={-0.025}
            font={suspend(inter).default}
            color="black"
            {...props}>
            {text}
            <Html
                style={{
                color: "transparent",
                fontSize: "33.5em"
                }}
                transform>
                {text}
            </Html>
        </Text>
    )
}

export default Status;