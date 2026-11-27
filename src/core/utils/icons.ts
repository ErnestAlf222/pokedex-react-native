import {
  DAMAGE_CLASS_ICONS,
  DamageClassIconName,
  FALLBACK_DAMAGE_CLASS_ICON,
  FALLBACK_TYPE_ICON,
  TYPE_ICONS,
  TypeIconName,
} from '../config';

// Ícono del tipo; si el tipo es desconocido usa el de respaldo.
export const getTypeIcon = (type: string): TypeIconName =>
  (TYPE_ICONS as Record<string, TypeIconName>)[type] ?? FALLBACK_TYPE_ICON;

// Ícono de la clase de daño (physical, special o status); si es desconocida usa el de respaldo.
export const getDamageClassIcon = (damageClass: string): DamageClassIconName =>
  (DAMAGE_CLASS_ICONS as Record<string, DamageClassIconName>)[damageClass] ??
  FALLBACK_DAMAGE_CLASS_ICON;
