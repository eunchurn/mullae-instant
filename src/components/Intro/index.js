/**
 * Original code
 * example code of https://github.com/drcmda/react-three-fiber
 *
 * Copyright (c) 2019 Paul Henschel and other contributors
 * Released under the MIT license.
 *
 * modified by Eunchurn Park
 */
import * as THREE from "three/src/Three";
import React, { useRef, useEffect, useMemo } from "react";
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { extend, Canvas, useRender, useThree } from "react-three-fiber";
// A React animation lib, see: https://github.com/react-spring/react-spring
import { apply, useSpring, a } from "react-spring/three";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import Loader from "@components/Loader";

// Import and register postprocessing classes as three-native-elements for both react-three-fiber & react-spring
// They'll be available as native elements <effectComposer /> from then on ...
import { GlitchPass } from "./postprocessing/GlitchPass";
import { EffectComposer } from "./postprocessing/EffectComposer";
import { RenderPass } from "./postprocessing/RenderPass";

apply({ EffectComposer, RenderPass, GlitchPass });
extend({ EffectComposer, RenderPass, GlitchPass });

const useEffectAsync = (effect, inputs) => {
  useEffect(() => {
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);
};

const StyledCanvas = styled(Canvas)`
  position: absolute !important;
  top: 0;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
`;

/** This renders text via canvas and projects it as a sprite */
const Text = ({
  children,
  position,
  opacity,
  color = "white",
  fontSize = 180,
}) => {
  const {
    // size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight },
  } = useThree();
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const mCanvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 2048;
    const context = canvas.getContext("2d");
    context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = color;
    context.fillText(children, 1024, 1024 - 410 / 2);
    return canvas;
  }, [fontSize, color, children]);
  return (
    <a.sprite scale={[scale, scale, 1]} position={position}>
      <a.spriteMaterial attach="material" transparent opacity={opacity}>
        <canvasTexture
          attach="map"
          image={mCanvas}
          premultiplyAlpha
          onUpdate={s => {
            s.needsUpdate = true;
          }}
        />
      </a.spriteMaterial>
    </a.sprite>
  );
};

/** This component rotates a bunch of stars */
const Stars = ({ position }) => {
  const group = useRef();
  let theta = 0;
  useRender(() => {
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.01)));
    const s = Math.cos(THREE.Math.degToRad(theta * 2));
    group.current.rotation.set(r, r, r);
    group.current.scale.set(s, s, s);
  });
  const [geo, mat, coords] = useMemo(() => {
    const Mgeo = new THREE.SphereBufferGeometry(1, 10, 10);
    const Mmat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("peachpuff"),
      transparent: true,
    });
    const Mcoords = new Array(1000)
      .fill()
      .map(() => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
      ]);
    return [Mgeo, Mmat, Mcoords];
  }, []);
  return (
    <a.group ref={group} position={position}>
      {coords.map(([p1, p2, p3]) => (
        <mesh key={p1} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </a.group>
  );
};

/** This component creates a glitch effect */
const Effects = React.memo(({ factor }) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  useEffectAsync(async () => {
    const ret = await composer.current.setSize(size.width, size.height);
    return () => ret;
  }, [size]);
  // This takes over as the main render-loop (when 2nd arg is set to true)
  useRender(() => composer.current.render(), true);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <a.glitchPass attachArray="passes" renderToScreen factor={factor} />
    </effectComposer>
  );
});

/** This component maintains the scene */
const Scene = props => {
  // const { size } = useThree();
  const { top } = props;
  return (
    <>
      <Effects factor={top.interpolate([0, 150], [1, 0])} />
      <Stars position={top.interpolate(() => [0, -0.5, 0])} />
      <Text
        opacity={top.interpolate([0, 200], [1, 0])}
        position={top.interpolate(() => [0, -0.4, 0])}
        fontSize={120}
      >
        #mullae_instant
      </Text>
    </>
  );
};

/** Intro component */
const Intro = props => {
  const { showScene } = props;
  const ref = useRef(null);
  const transition = useTransition(showScene, null, {
    from: {
      position: "absolute",
      width: "100%",
      height: "100vh",
      transform: "matrix(0, 0, 0, 0, 0, 0)",
      opacity: 0,
    },
    enter: {
      transform: "matrix(1, 0, 0, 1, 0, 0)",
      opacity: 1,
    },
    leave: { opacity: 0 },
    config: { duration: 0 },
  });

  const [{ top, mouse }] = useSpring(() => ({ top: 0, mouse: [0, 0] }));
  return (
    <>
      {showScene &&
        transition.map(
          ({ item, key }) =>
            item && (
              <animated.div key={key} style={{ ...props }} ref={ref}>
                <StyledCanvas>
                  <Scene top={top} mouse={mouse} />
                </StyledCanvas>
                <Loader />
              </animated.div>
            ),
        )}
    </>
  );
};

export default Intro;
