import { cleanApiText, pickLocalized, pickLocalizedText } from '../src/core';
import { bulbasaurSpeciesDto } from '../__fixtures__/pokemon-data';

const { flavor_text_entries, genera } = bulbasaurSpeciesDto;

// Quita las entradas en español de un listado para simular una especie sin traducción.
const withoutSpanish = <T extends { language: { name: string } }>(
  entries: T[],
) => entries.filter(({ language }) => language.name !== 'es');

// Pruebas de la elección de entradas localizadas con datos reales de Bulbasaur.
describe('pickLocalized', () => {
  it('elige la entrada más reciente (la última) en el idioma por defecto', () => {
    expect(pickLocalized(flavor_text_entries)?.flavor_text).toBe(
      'Nace con un extraño bulbo plantado en el lomo que se va desarrollando a medida que el Pokémon crece.',
    );
  });

  it('cae al idioma de respaldo cuando no hay entradas en español', () => {
    expect(
      pickLocalized(withoutSpanish(flavor_text_entries))?.flavor_text,
    ).toBe(
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    );
    expect(pickLocalized(withoutSpanish(genera))?.genus).toBe('Seed Pokémon');
  });

  it('elige la categoría en el idioma por defecto', () => {
    expect(pickLocalized(genera)?.genus).toBe('Pokémon Semilla');
  });

  it('permite indicar otro idioma y otro respaldo', () => {
    expect(pickLocalized(genera, 'en', 'es')?.genus).toBe('Seed Pokémon');
    expect(pickLocalized(genera, 'fr', 'es')?.genus).toBe('Pokémon Semilla');
  });

  it('devuelve undefined si no hay ni el idioma ni el respaldo', () => {
    expect(pickLocalized([])).toBeUndefined();
    expect(pickLocalized(genera, 'fr', 'de')).toBeUndefined();
  });
});

// Pruebas del selector de texto localizado para listas con distinta forma (names, flavor text, genera).
describe('pickLocalizedText', () => {
  const names = [
    { name: 'Tackle', language: { name: 'en' } },
    { name: 'Placaje', language: { name: 'es' } },
  ];
  const flavors = [
    { flavor_text: 'Línea uno\nlínea dos', language: { name: 'es' } },
    { flavor_text: 'Line one', language: { name: 'en' } },
  ];

  it('toma el campo indicado de la entrada en español', () => {
    expect(pickLocalizedText(names, ({ name }) => name)).toBe('Placaje');
  });

  it('limpia el texto con el mismo criterio que cleanApiText', () => {
    expect(pickLocalizedText(flavors, ({ flavor_text }) => flavor_text)).toBe(
      'Línea uno línea dos',
    );
  });

  it('cae al inglés si no hay entrada en español', () => {
    expect(
      pickLocalizedText(
        names.filter(({ language }) => language.name !== 'es'),
        ({ name }) => name,
      ),
    ).toBe('Tackle');
  });

  it('devuelve una cadena vacía si no hay ni español ni inglés', () => {
    expect(pickLocalizedText([], ({ name }: { name: string }) => name)).toBe(
      '',
    );
  });

  it('permite indicar otro idioma y otro respaldo', () => {
    expect(pickLocalizedText(names, ({ name }) => name, 'en', 'es')).toBe(
      'Tackle',
    );
  });

  it('sirve igual con la forma de los genera de la especie', () => {
    expect(pickLocalizedText(genera, ({ genus }) => genus)).toBe(
      'Pokémon Semilla',
    );
  });
});

// Pruebas de la limpieza de textos de la API.
describe('cleanApiText', () => {
  it('cambia los saltos de línea por espacios', () => {
    expect(cleanApiText(flavor_text_entries[1]!.flavor_text)).toBe(
      'Una rara semilla le fue plantada en el lomo al nacer. La planta brota y crece con este Pokémon.',
    );
  });

  it('limpia saltos y el salto de página (\\f) de los textos antiguos', () => {
    expect(cleanApiText(flavor_text_entries[0]!.flavor_text)).toBe(
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.',
    );
  });

  it('quita los caracteres de control, el guion suave y compacta los espacios', () => {
    expect(cleanApiText('  Pika­chu\u0000 \u0085  eléctrico\t\r\n ')).toBe(
      'Pikachu eléctrico',
    );
  });

  it('devuelve una cadena vacía con un texto vacío', () => {
    expect(cleanApiText('')).toBe('');
  });
});
