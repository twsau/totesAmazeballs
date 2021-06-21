import { BulgePinchFilter, CRTFilter } from 'pixi-filters';

export default function Filters(screen) {
  return [
    new BulgePinchFilter({
      radius: screen.width / 2,
      strength: 0.314
    }),
    new CRTFilter({
      curvature: 0,
      lineContrast: 0.000001,
      noise: 0.1,
      noiseSize: 1,
      vignetting: 0.41,
      vignettingAlpha: 1.1,
      vignettingBlur: 1
    })
  ];
}