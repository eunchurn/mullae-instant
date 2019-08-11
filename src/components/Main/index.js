import * as THREE from "three/src/Three";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from "react";
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import {
  apply as applyThree,
  Canvas,
  useRender,
  useThree
} from "react-three-fiber";
// A React animation lib, see: https://github.com/react-spring/react-spring
import {
  apply as applySpring,
  useSpring,
  a,
  interpolate
} from "react-spring/three";
import { useTransition, animated, config } from "react-spring";
import styled, { createGlobalStyle } from "styled-components";
import Draggable from "react-draggable";
import data from "./data";

// Import and register postprocessing classes as three-native-elements for both react-three-fiber & react-spring
// They'll be available as native elements <effectComposer /> from then on ...
import { EffectComposer } from "./postprocessing/EffectComposer";
import { RenderPass } from "./postprocessing/RenderPass";
import { GlitchPass } from "@postprocessing/GlitchPass";
import miIntro from "@images/miIntro.svg";
import Warning from "@components/Warning";

applySpring({ EffectComposer, RenderPass, GlitchPass });
applyThree({ EffectComposer, RenderPass, GlitchPass });

// Styles

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #272727;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}

html,
body {
  width: 100%;
  height: 100%;
}
body {
  position: fixed;
  overflow: hidden;
}

body {
  overscroll-behavior-y: none;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial,
    sans-serif;
  color: black;
}
`;

const IntroContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #272727;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  position: absolute;
  overflow: auto;
  top: 0px;
  width: 100%;
  height: 100vh;
  font-size: 20em;
  font-weight: 800;
  line-height: 0.9em;
  div {
    height: "525vh";
  }
`;

const StyledCanvas = styled(Canvas)`
  position: absolute important!;
  top: 0;
  pointer-events: none;
  z-index: 1;
`;

const WarningContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

/** This component loads an image and projects it onto a plane */
const Image = ({ url, opacity, scale, ...props }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  const [hovered, setHover] = useState(false);
  const hover = useCallback(() => setHover(true), []);
  const unhover = useCallback(() => setHover(false), []);
  const { factor } = useSpring({ factor: hovered ? 1.1 : 1 });
  return (
    <a.mesh
      {...props}
      onHover={hover}
      onUnhover={unhover}
      scale={factor.interpolate(f => [scale * f, scale * f, 1])}
    >
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <a.meshLambertMaterial attach="material" transparent opacity={opacity}>
        <primitive attach="map" object={texture} />
      </a.meshLambertMaterial>
    </a.mesh>
  );
};

/** This renders text via canvas and projects it as a sprite */
const Text = ({
  children,
  position,
  opacity,
  color = "white",
  fontSize = 180
}) => {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree();
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const canvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 2048;
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
          image={canvas}
          premultiplyAlpha
          onUpdate={s => (s.needsUpdate = true)}
        />
      </a.spriteMaterial>
    </a.sprite>
  );
};

/** This component creates a fullscreen colored plane */
const Background = ({ color }) => {
  const { viewport } = useThree();
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <a.meshBasicMaterial attach="material" color={color} depthTest={false} />
    </mesh>
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
    const geo = new THREE.SphereBufferGeometry(1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("peachpuff"),
      transparent: true
    });
    const coords = new Array(1000)
      .fill()
      .map(i => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400
      ]);
    return [geo, mat, coords];
  }, []);
  return (
    <a.group ref={group} position={position}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </a.group>
  );
};

/** This component creates a glitch effect */
const Effects = React.memo(({ factor }) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size
  ]);
  // This takes over as the main render-loop (when 2nd arg is set to true)
  useRender(() => composer.current.render(), true);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <a.glitchPass attachArray="passes" renderToScreen factor={factor} />
    </effectComposer>
  );
});

/** This component creates a bunch of parallaxed images */
const Images = ({ top, mouse, scrollMax }) => {
  return data.map(([url, x, y, factor, z, scale], index) => (
    <Image
      key={index}
      url={url}
      scale={scale}
      opacity={top.interpolate([0, 500], [0, 1])}
      position={interpolate([top, mouse], (top, mouse) => [
        (-mouse[0] * factor) / 50000 + x,
        (mouse[1] * factor) / 50000 +
          y * 1.15 +
          ((top * factor) / scrollMax) * 2,
        z + top / 2000
      ])}
    />
  ));
};

/** This component maintains the scene */
const Scene = props => {
  const { size } = useThree();
  const { top, mouse } = props;
  const scrollMax = size.height * 4.5;
  console.log(top);
  console.log(scrollMax);
  return (
    <React.Fragment>
      <a.spotLight
        intensity={1.2}
        color="white"
        position={mouse.interpolate((x, y) => [x / 100, -y / 100, 6.5])}
      />
      <Effects factor={top.interpolate([0, 150], [1, 0])} />
      <Background
        color={top.interpolate(
          [0, scrollMax * 0.25, scrollMax * 0.8, scrollMax],
          // ["#27282F", "#247BA0", "#70C1B3", "#f8f3f1"]
          ["#2c3e50", "#2980b9", "#c0392b", "#ecf0f1"]
        )}
      />
      <Stars position={top.interpolate(top => [0, -1 + top / 20, 0])} />
      <Images top={top} mouse={mouse} scrollMax={scrollMax} />
      <Text
        opacity={top.interpolate([0, 200], [1, 0])}
        position={top.interpolate(top => [0, -1 + top / 200, 0])}
        fontSize={120}
      >
        #mullae_instant
      </Text>
      <Text
        position={top.interpolate(top => [
          0,
          -20 + ((top * 10) / scrollMax) * 2,
          0
        ])}
        color="black"
        fontSize={150}
      >
        coming soon
      </Text>
    </React.Fragment>
  );
};

/** Main component */
const Main = () => {
  const [showScene, setShowScene] = useState();
  const transition = useTransition(showScene, null, {
    from: {
      position: "absolute",
      width: "100%",
      height: "100vh",
      transform: "matrix(0, 90, 90, 0, 0, 0)",
      opacity: 0
    },
    enter: { transform: "matrix(1, 0, 0, 1, 0, 0)", opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 5000 }
  });
  // This tiny spring right here controlls all(!) the animations, one for scroll, the other for mouse movement ...
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }));
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    [set]
  );
  const onScroll = useCallback(e => set({ top: e.target.scrollTop }), [set]);
  // useEffect(() => void setTimeout(() => setShowScene(false), 3000), [
  //   setShowScene
  // ]);
  const Scroll = () => (
    <ScrollContainer onScroll={onScroll} onMouseMove={onMouseMove}>
      <div style={{ height: "525vh" }} />
    </ScrollContainer>
  );
  return (
    <React.Fragment>
      <GlobalStyle />
      <IntroContainer>
        {!showScene && <img src={miIntro} />}
        {showScene &&
          transition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={{ ...props }}>
                  <StyledCanvas>
                    <Scene top={top} mouse={mouse} />
                  </StyledCanvas>
                </animated.div>
              )
          )}
        {showScene && <Scroll />}
      </IntroContainer>
      {!showScene && (
        <Draggable>
          <WarningContainer>
            <Warning upState={{ click: [showScene, setShowScene] }} />
          </WarningContainer>
        </Draggable>
      )}
    </React.Fragment>
  );
};

export default Main;
