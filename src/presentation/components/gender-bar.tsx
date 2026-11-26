import { StyleSheet, Text, View } from 'react-native';
import {
  UI_MESSAGES,
  UNIT_LABELS,
  colors,
  fontSize,
  fontWeight,
  genderColors,
  radius,
  sizes,
  spacing,
} from '../../core';
import { PokemonGender } from '../../domain';

interface GenderBarProps {
  gender: PokemonGender | null;
}

// Barra dividida entre hembra y macho con sus porcentajes, o aviso si la especie no tiene género.
export const GenderBar = ({ gender }: GenderBarProps) => {
  if (gender === null) {
    return <Text style={styles.none}>{UI_MESSAGES.noGender}</Text>;
  }

  return (
    <View>
      <View style={styles.bar}>
        <View
          style={{ flex: gender.female, backgroundColor: genderColors.female }}
        />
        <View
          style={{ flex: gender.male, backgroundColor: genderColors.male }}
        />
      </View>
      <View style={styles.labels}>
        <Text style={styles.label}>
          {`${UI_MESSAGES.female} ${gender.female}${UNIT_LABELS.percent}`}
        </Text>
        <Text style={styles.label}>
          {`${UI_MESSAGES.male} ${gender.male}${UNIT_LABELS.percent}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: sizes.genderBarHeight,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  label: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
  },
  none: { fontSize: fontSize.body, color: colors.textSecondary },
});
