import React, { useEffect, useState } from 'react';
import { Spring } from "react-spring/renderprops";

//A spinner component, it deactivates dom interaction and features a repeated animation of a goblin head icon
//growing in the middle of the screen.  This is most prominently displayed during importing a recipe, which can be
//a little lengthy.
export default function Spinner() {

    //Style for the spinner
    const style = ({ props }) => ({
        borderRadius: "100%",
        height: props.diameter,
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        width: props.diameter,
        zIndex: 1
    });

    const [reset, setReset] = useState(false);

    useEffect(() => {
    }, [reset]);

    return (
        <div>
            <Spring
                reset
                config={{ tension: 180, friction: 12 }}
                from={{ diameter: 0 }}
                to={{ diameter: 100 }}
                onRest={() => setReset(!reset)}
            >
                {(props) => (
                    <img
                        src="http://localhost:3000/images/gob-head.png"
                        style={style({ props })}
                    />
                )}
            </Spring>
        </div >
    );
}
