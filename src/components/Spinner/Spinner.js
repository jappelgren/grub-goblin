import { Spring } from "react-spring/renderprops";
import { Modal } from 'react-modal';

import React, { useEffect, useState } from 'react';

export default function Spinner() {
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
                from={{ diameter: 0, transform: 'rotate(0deg)' }}
                to={{ diameter: 100, transform: 'rotate(180deg)' }}
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
