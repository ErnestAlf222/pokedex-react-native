import {
  MAX_STAT_VALUE,
  getRadarAnchor,
  getRadarPoint,
  getRadarPoints,
  getRadarRing,
  toSvgPoints,
} from '../src/core';

const CENTER = 150;
const RADIUS = 100;

// Distancia de un punto al centro.
const distance = ({ x, y }: { x: number; y: number }) =>
  Math.hypot(x - CENTER, y - CENTER);

// Pruebas de la geometría del radar de stats.
describe('getRadarPoint', () => {
  it('el primer eje apunta hacia arriba', () => {
    const point = getRadarPoint(0, 6, RADIUS, CENTER);

    expect(point.x).toBeCloseTo(CENTER);
    expect(point.y).toBeCloseTo(CENTER - RADIUS);
  });

  it('avanza en sentido horario: con 6 ejes el segundo queda arriba a la derecha', () => {
    const point = getRadarPoint(1, 6, RADIUS, CENTER);

    expect(point.x).toBeCloseTo(CENTER + RADIUS * Math.cos(Math.PI / 6));
    expect(point.y).toBeCloseTo(CENTER - RADIUS / 2);
  });

  it('el eje opuesto queda abajo', () => {
    const point = getRadarPoint(3, 6, RADIUS, CENTER);

    expect(point.x).toBeCloseTo(CENTER);
    expect(point.y).toBeCloseTo(CENTER + RADIUS);
  });
});

describe('getRadarPoints', () => {
  it('con el stat máximo el punto queda en el borde y con 0 en el centro', () => {
    const [top, right] = getRadarPoints(
      [MAX_STAT_VALUE, 0],
      MAX_STAT_VALUE,
      RADIUS,
      CENTER,
    );

    expect(distance(top!)).toBeCloseTo(RADIUS);
    expect(distance(right!)).toBeCloseTo(0);
  });

  it('escala proporcionalmente al máximo', () => {
    const [point] = getRadarPoints(
      [MAX_STAT_VALUE / 2],
      MAX_STAT_VALUE,
      RADIUS,
      CENTER,
    );

    expect(distance(point!)).toBeCloseTo(RADIUS / 2);
  });

  it('no sale del borde si el valor supera el máximo', () => {
    const [point] = getRadarPoints(
      [MAX_STAT_VALUE * 2],
      MAX_STAT_VALUE,
      RADIUS,
      CENTER,
    );

    expect(distance(point!)).toBeCloseTo(RADIUS);
  });

  it('devuelve un punto por stat (los 6 de Bulbasaur)', () => {
    const points = getRadarPoints(
      [45, 49, 49, 65, 65, 45],
      MAX_STAT_VALUE,
      RADIUS,
      CENTER,
    );

    expect(points).toHaveLength(6);
  });
});

describe('getRadarRing', () => {
  it('genera un punto por eje, todos a la misma distancia del centro', () => {
    const ring = getRadarRing(6, 50, CENTER);

    expect(ring).toHaveLength(6);
    ring.forEach(point => expect(distance(point)).toBeCloseTo(50));
  });
});

describe('toSvgPoints', () => {
  it('une los puntos en el formato del atributo points', () => {
    expect(
      toSvgPoints([
        { x: 1, y: 2 },
        { x: 3.5, y: 4 },
      ]),
    ).toBe('1,2 3.5,4');
  });
});

describe('getRadarAnchor', () => {
  it('alinea a la izquierda, al centro o a la derecha según el lado', () => {
    expect(getRadarAnchor(CENTER - 50, CENTER)).toBe('end');
    expect(getRadarAnchor(CENTER, CENTER)).toBe('middle');
    expect(getRadarAnchor(CENTER + 50, CENTER)).toBe('start');
  });
});
