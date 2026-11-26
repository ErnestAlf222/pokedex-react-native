import { RADAR_ANCHOR_TOLERANCE } from '../config';
import { getStatRatio } from './stats';

export interface RadarPoint {
  x: number;
  y: number;
}

export type RadarAnchor = 'start' | 'middle' | 'end';

const FULL_TURN_RADIANS = 2 * Math.PI;
const START_ANGLE = -Math.PI / 2;

// Calcula el punto de un eje a cierta distancia del centro: el primer eje apunta arriba y los demás avanzan en sentido horario.
export const getRadarPoint = (
  index: number,
  count: number,
  distance: number,
  center: number,
): RadarPoint => {
  const angle = START_ANGLE + (FULL_TURN_RADIANS * index) / count;
  return {
    x: center + distance * Math.cos(angle),
    y: center + distance * Math.sin(angle),
  };
};

// Puntos del polígono de valores: cada valor se escala contra el máximo y el radio.
export const getRadarPoints = (
  values: number[],
  max: number,
  radius: number,
  center: number,
): RadarPoint[] =>
  values.map((value, index) =>
    getRadarPoint(
      index,
      values.length,
      getStatRatio(value, max) * radius,
      center,
    ),
  );

// Puntos de un anillo de la rejilla: todos los ejes a la misma distancia.
export const getRadarRing = (
  count: number,
  distance: number,
  center: number,
): RadarPoint[] =>
  Array.from({ length: count }, (_, index) =>
    getRadarPoint(index, count, distance, center),
  );

// Convierte los puntos al formato del atributo points de un polígono SVG.
export const toSvgPoints = (points: RadarPoint[]): string =>
  points.map(({ x, y }) => `${x},${y}`).join(' ');

// Alinea la etiqueta según el lado del centro en que cae su punto.
export const getRadarAnchor = (x: number, center: number): RadarAnchor => {
  if (x < center - RADAR_ANCHOR_TOLERANCE) {
    return 'end';
  }
  return x > center + RADAR_ANCHOR_TOLERANCE ? 'start' : 'middle';
};
