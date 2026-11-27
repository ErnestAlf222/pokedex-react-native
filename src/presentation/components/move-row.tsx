import { useMoveDetail } from '../hooks';
import { MoveBasicRow } from './move-basic-row';
import { MoveCard } from './move-card';

interface MoveRowProps {
  name: string;
  level: number;
}

// Fila de un movimiento: pide su propio detalle al montarse y muestra la tarjeta; sin datos (cargando, sin red o con error) cae a la fila básica.
export const MoveRow = ({ name, level }: MoveRowProps) => {
  const { data } = useMoveDetail(name);

  return data ? (
    <MoveCard move={data} level={level} />
  ) : (
    <MoveBasicRow name={name} level={level} />
  );
};
