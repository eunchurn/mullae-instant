import * as THREE from 'three/src/Three';
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { AppContext } from '@components/Context';
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import {
  apply as applyThree,
  Canvas,
  useRender,
  useThree,
} from 'react-three-fiber';
// A React animation lib, see: https://github.com/react-spring/react-spring
import {
  apply as applySpring,
  useSpring,
  a,
  interpolate,
} from 'react-spring/three';
import { useTransition, useChain, animated, config } from 'react-spring';
import styled from 'styled-components';
import MacOS from '@components/MacOS';
import data from './data';

// Import and register postprocessing classes as three-native-elements for both react-three-fiber & react-spring
// They'll be available as native elements <effectComposer /> from then on ...
import { GlitchPass } from './postprocessing/GlitchPass';
import { EffectComposer } from './postprocessing/EffectComposer';
import { RenderPass } from './postprocessing/RenderPass';

applySpring({ EffectComposer, RenderPass, GlitchPass });
applyThree({ EffectComposer, RenderPass, GlitchPass });

// Styles
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const StyledCanvas = styled(Canvas)`
  position: absolute !important;
  top: 0;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
`;

const ArrowContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100vh;
  z-index: 3;
  @media only screen and (max-width: 600px) {
    height: 84vh;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  width: 100px;
  z-index: 4;
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
  color = 'white',
  fontSize = 180,
}) => {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight },
  } = useThree();
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const canvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 2048;
    const context = canvas.getContext('2d');
    context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
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
      color: new THREE.Color('peachpuff'),
      transparent: true,
    });
    const coords = new Array(1000)
      .fill()
      .map(i => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
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
    size,
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
        z + top / 2000,
      ])}
    />
  ));
};

/** This component maintains the scene */
const Scene = props => {
  // const { size } = useThree();
  const { top } = props;
  return (
    <>
      <Effects factor={top.interpolate([0, 150], [1, 0])} />
      <Stars position={top.interpolate(pos => [0, -0.5, 0])} />
      <Text
        opacity={top.interpolate([0, 200], [1, 0])}
        position={top.interpolate(pos => [0, -0.4, 0])}
        fontSize={120}
      >
        #mullae_instant
      </Text>
    </>
  );
};

const ArrowDownButton = () => {
  const {
    clickDown: [state, setState],
  } = useContext(AppContext);
  return (
    <Button onClick={() => setState(!state)}>
      <svg
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#FFFFFF"
        viewBox="0 0 24 24"
      >
        <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
      </svg>
    </Button>
  );
};

const useHookWithRefCallback = () => {
  const ref = useRef(null);
  const setRef = useCallback(node => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
    }

    // Save a reference to the node
    ref.current = node;
  }, []);

  return [setRef];
};

/** Intro component */
const Intro = props => {
  const { showScene } = props;
  const [showArrow, setShowArrow] = useState(false);
  const ref = useCallback(node => {
    if (node !== null) {
      setTimeout(() => setShowArrow(true), 3000);
    }
  }, []);

  const transition = useTransition(showScene, null, {
    from: {
      position: 'absolute',
      width: '100%',
      height: '100vh',
      transform: 'matrix(0, 0, 0, 0, 0, 0)',
      opacity: 0,
    },
    enter: {
      transform: 'matrix(1, 0, 0, 1, 0, 0)',
      opacity: 1,
    },
    leave: { opacity: 0 },
    config: { duration: 0 },
  });
  // This tiny spring right here controlls all(!) the animations, one for scroll, the other for mouse movement ...

  // <StyledCanvas>
  //   <Scene top={top} mouse={mouse} />
  // </StyledCanvas>
  // {showArrow && (
  //   <ArrowContainer>
  //     <ArrowDownButton />
  //   </ArrowContainer>
  // )}
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }));
  return (
    <>
      {showScene &&
        transition.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={{ ...props }} ref={ref}>
                <StyledCanvas>
                  <Scene top={top} mouse={mouse} />
                </StyledCanvas>
                <MacOS />
              </animated.div>
            ),
        )}
    </>
  );
};

export default Intro;
