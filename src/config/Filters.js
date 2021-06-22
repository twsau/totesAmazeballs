import { BulgePinchFilter, CRTFilter, DropShadowFilter } from 'pixi-filters';

const Filters = {
  camera: () => {
    return [
      new CRTFilter({
        curvature: 0,
        lineContrast: 0.000001,
        noise: 0.1,
        noiseSize: 1,
        vignetting: 0.42,
        vignettingAlpha: 1.1,
        vignettingBlur: 1
      })
    ];
  },
  stage: screen => {
    return [
      new BulgePinchFilter({
        radius: screen.width / 2 + 20,
        strength: 0.314159,
        center: [0.5, 0.5]
      })
    ];
  }
}

export default Filters;