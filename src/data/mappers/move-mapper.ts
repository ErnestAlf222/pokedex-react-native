import { formatSlug, pickLocalizedText } from '../../core';
import { MoveDetail } from '../../domain';
import { MoveDto } from '../models';

// Convierte un movimiento de PokéAPI en la entidad de dominio, con nombre y descripción en español (o inglés si falta).
export const toMoveDetail = (dto: MoveDto): MoveDetail => ({
  name:
    pickLocalizedText(dto.names, ({ name }) => name) || formatSlug(dto.name),
  type: dto.type.name,
  damageClass: dto.damage_class.name,
  power: dto.power,
  accuracy: dto.accuracy,
  pp: dto.pp,
  description: pickLocalizedText(
    dto.flavor_text_entries,
    ({ flavor_text }) => flavor_text,
  ),
});
