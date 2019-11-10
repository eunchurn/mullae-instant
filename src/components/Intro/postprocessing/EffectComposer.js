import {
  LinearFilter,
  RGBAFormat,
  Vector2,
  WebGLRenderTarget,
} from "three/src/Three";
import { ClearMaskPass, MaskPass } from "./MaskPass";
import { ShaderPass } from "./ShaderPass";
import { CopyShader } from "../shaders/CopyShader";
/**
 * @author alteredq / http://alteredqualia.com/
 */

export const EffectComposer = function effectcomposer(renderer, renderTarget) {
  this.renderer = renderer;

  if (renderTarget === undefined) {
    const parameters = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      stencilBuffer: false,
    };

    const size = renderer.getDrawingBufferSize(new Vector2());
    renderTarget = new WebGLRenderTarget(size.width, size.height, parameters);
    renderTarget.texture.name = "EffectComposer.rt1";
  }

  this.renderTarget1 = renderTarget;
  this.renderTarget2 = renderTarget.clone();
  this.renderTarget2.texture.name = "EffectComposer.rt2";
  this.writeBuffer = this.renderTarget1;
  this.readBuffer = this.renderTarget2;
  this.passes = [];

  // dependencies
  if (CopyShader === undefined) {
    console.error("THREE.EffectComposer relies on THREE.CopyShader");
  }
  if (ShaderPass === undefined) {
    console.error("THREE.EffectComposer relies on THREE.ShaderPass");
  }
  this.copyPass = new ShaderPass(CopyShader);
  this.previousFrameTime = Date.now();
};

Object.assign(EffectComposer.prototype, {
  swapBuffers() {
    const tmp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = tmp;
  },

  addPass(pass) {
    this.passes.push(pass);
    const size = this.renderer.getDrawingBufferSize(new Vector2());
    pass.setSize(size.width, size.height);
  },

  insertPass(pass, index) {
    this.passes.splice(index, 0, pass);
  },

  render(deltaTime) {
    // deltaTime value is in seconds
    if (deltaTime === undefined) {
      deltaTime = (Date.now() - this.previousFrameTime) * 0.001;
    }
    this.previousFrameTime = Date.now();
    const currentRenderTarget = this.renderer.getRenderTarget();
    let maskActive = false;
    let pass;
    let i;
    const il = this.passes.length;

    for (i = 0; i < il; i += 1) {
      pass = this.passes[i];
      if (pass.enabled !== false) {
        pass.render(
          this.renderer,
          this.writeBuffer,
          this.readBuffer,
          deltaTime,
          maskActive,
        );
        if (pass.needsSwap) {
          if (maskActive) {
            const { context } = this.renderer;
            context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);
            this.copyPass.render(
              this.renderer,
              this.writeBuffer,
              this.readBuffer,
              deltaTime,
            );
            context.stencilFunc(context.EQUAL, 1, 0xffffffff);
          }
          this.swapBuffers();
        }
        if (MaskPass !== undefined) {
          if (pass instanceof MaskPass) {
            maskActive = true;
          } else if (pass instanceof ClearMaskPass) {
            maskActive = false;
          }
        }
      }
    }
    this.renderer.setRenderTarget(currentRenderTarget);
  },

  reset(renderTarget) {
    if (renderTarget === undefined) {
      const size = this.renderer.getDrawingBufferSize(new Vector2());
      renderTarget = this.renderTarget1.clone();
      renderTarget.setSize(size.width, size.height);
    }
    this.renderTarget1.dispose();
    this.renderTarget2.dispose();
    this.renderTarget1 = renderTarget;
    this.renderTarget2 = renderTarget.clone();
    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;
  },
  setSize(width, height) {
    this.renderTarget1.setSize(width, height);
    this.renderTarget2.setSize(width, height);
    for (let i = 0; i < this.passes.length; i += 1) {
      this.passes[i].setSize(width, height);
    }
  },
});

export default EffectComposer;
