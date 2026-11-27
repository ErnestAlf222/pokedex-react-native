import { formatSlug, pickLocalizedText } from '../../core';
import { AbilityDetail } from '../../domain';
import { AbilityDto } from '../models';

// Convierte una habilidad de PokéAPI en la entidad de dominio, con nombre y descripción en español (o inglés si falta).
export const toAbilityDetail = (dto: AbilityDto): AbilityDetail => ({
  name:
    pickLocalizedText(dto.names, ({ name }) => name) || formatSlug(dto.name),
  description: pickLocalizedText(
    dto.flavor_text_entries,
    ({ flavor_text }) => flavor_text,
  ),
});
