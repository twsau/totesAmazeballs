import { BulgePinchFilter, CRTFilter } from 'pixi-filters';

const Filters = {
  camera: () => {
    return [
      new CRTFilter({
        lineWidth: 0,
        vignetting: 0.52,
        vignettingBlur: 1
      })
    ];
  },
  stage: screen => {
    return [
      new BulgePinchFilter({
        radius: screen.width / 2,
        strength: 0.314,
        center: [0.5, 0.5]
      })
    ];
  }
}

export default Filters;