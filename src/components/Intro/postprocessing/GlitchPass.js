import {
  DataTexture,
  FloatType,
  Math as _Math,
  Mesh,
  OrthographicCamera,
  PlaneBufferGeometry,
  RGBFormat,
  Scene,
  ShaderMaterial,
  UniformsUtils,
} from "three/src/Three";
import { DigitalGlitch } from "../shaders/DigitalGlitch";
import { Pass } from "./Pass";
/**
 * @author alteredq / http://alteredqualia.com/
 */

export const GlitchPass = function glitchpass(dtSize) {
  Pass.call(this);
  if (DigitalGlitch === undefined)
    console.error("THREE.GlitchPass relies on THREE.DigitalGlitch");
  const shader = DigitalGlitch;
  this.uniforms = UniformsUtils.clone(shader.uniforms);
  if (dtSize === undefined) dtSize = 64;
  this.uniforms.tDisp.value = this.generateHeightmap(dtSize);
  this.material = new ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
  });
  this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new Scene();
  this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
  this.quad.frustumCulled = false; // Avoid getting clipped
  this.scene.add(this.quad);
  this.factor = 0;
};

GlitchPass.prototype = Object.assign(Object.create(Pass.prototype), {
  constructor: GlitchPass,

  render(renderer, writeBuffer, readBuffer) {
    const factor = Math.max(0, this.factor);
    this.uniforms.tDiffuse.value = readBuffer.texture;
    this.uniforms.seed.value = Math.random() * factor; // default seeding
    this.uniforms.byp.value = 0;
    if (factor) {
      this.uniforms.amount.value = (Math.random() / 90) * factor;
      this.uniforms.angle.value = _Math.randFloat(-Math.PI, Math.PI) * factor;
      this.uniforms.distortion_x.value = _Math.randFloat(0, 1) * factor;
      this.uniforms.distortion_y.value = _Math.randFloat(0, 1) * factor;
      this.uniforms.seed_x.value = _Math.randFloat(-0.3, 0.3) * factor;
      this.uniforms.seed_y.value = _Math.randFloat(-0.3, 0.3) * factor;
    } else this.uniforms.byp.value = 1;
    this.quad.material = this.material;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      renderer.render(this.scene, this.camera);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      renderer.render(this.scene, this.camera);
    }
  },

  generateHeightmap(dtSize) {
    const dataArr = new Float32Array(dtSize * dtSize * 3);
    const length = dtSize * dtSize;

    for (let i = 0; i < length; i += 1) {
      const val = _Math.randFloat(0, 1);
      dataArr[i * 3 + 0] = val;
      dataArr[i * 3 + 1] = val;
      dataArr[i * 3 + 2] = val;
    }

    const texture = new DataTexture(
      dataArr,
      dtSize,
      dtSize,
      RGBFormat,
      FloatType,
    );
    texture.needsUpdate = true;
    return texture;
  },
});

export default GlitchPass;
