export const LIST_COLUMNS = 2;
export const END_REACHED_THRESHOLD = 0.5;
export const LIST_SEPARATOR = ', ';
export const SLUG_SEPARATOR = '-';
export const WORD_SEPARATOR = ' ';

export const POKEMON_NUMBER_PREFIX = '#';
export const POKEMON_NUMBER_PAD_LENGTH = 3;
export const POKEMON_NUMBER_PAD_CHAR = '0';

export const DECIMETERS_PER_METER = 10;
export const HECTOGRAMS_PER_KILOGRAM = 10;

export const POKEBALL_ICON_NAME = 'catching-pokemon';
export const BACK_ICON_NAME = 'arrow-back';
export const SEARCH_ICON_NAME = 'search';
export const CLEAR_ICON_NAME = 'close';
export const SEARCH_DEBOUNCE_MS = 300;
export const BANNER_ANIMATION_MS = 250;
export const BANNER_RESTORED_DURATION_MS = 2500;

export const ALL_TYPES_VALUE = '';
export const CARD_ENTER_DELAY_MS = 60;
export const CARD_ENTER_DURATION_MS = 350;
export const MAX_ANIMATED_CARDS = 8;
export const PRESS_ANIMATION_MS = 100;
export const CARD_GRADIENT_START = { x: 0, y: 0 } as const;
export const CARD_GRADIENT_END = { x: 1, y: 1 } as const;

export const INFINITE_REPETITIONS = -1;
export const POKEBALL_SPIN_DURATION_MS = 1000;
export const HERO_FLOAT_DURATION_MS = 2000;
export const FULL_TURN_DEGREES = 360;
export const HALF_TURN_DEGREES = 180;
export const HERO_FLIP_DURATION_MS = 800;
export const PLACEHOLDER_FADE_DURATION_MS = 250;

export const DETAIL_TABS = ['about', 'stats', 'evolutions', 'moves'] as const;
export type DetailTab = (typeof DETAIL_TABS)[number];
export const DEFAULT_DETAIL_TAB: DetailTab = 'about';
export const TAB_FADE_DURATION_MS = 200;

export const SCROLL_EVENT_THROTTLE = 16;
export const SPRING_CONFIG = { damping: 14, stiffness: 140, mass: 1 } as const;
export const ARTWORK_ENTRY_DELAY_MS = 120;
export const TITLE_ENTRY_DELAY_MS = 200;
export const TITLE_ENTRY_STAGGER_MS = 70;
export const SHEET_ENTRY_DELAY_MS = 100;
export const SECTION_ENTER_DELAY_MS = 70;
export const SECTION_ENTER_DURATION_MS = 300;
export const MAX_STAGGERED_ITEMS = 8;
export const GRADIENT_TRANSITION_MS = 450;
export const TAB_SWIPE_ACTIVE_OFFSET_X = 16;
export const TAB_SWIPE_FAIL_OFFSET_Y = 12;
export const TAB_SWIPE_COMMIT_DISTANCE = 60;
export const TAB_SWIPE_COMMIT_VELOCITY = 600;
export const TAB_SWIPE_EDGE_RESISTANCE = 0.2;
export const RADAR_GROW_DURATION_MS = 700;
export const STAT_BAR_STAGGER_MS = 80;
export const VIBRATION_MS = 12;
export const HERO_GLOW_ID = 'heroGlow';
export const HERO_SHADOW_ID = 'heroShadow';
export const DETAIL_ICONS = {
  height: 'height',
  weight: 'fitness-center',
  abilities: 'auto-awesome',
  gender: 'wc',
  eggGroups: 'egg',
  weaknesses: 'shield',
} as const;
export type DetailIconName = (typeof DETAIL_ICONS)[keyof typeof DETAIL_ICONS];
export const INFO_COLUMNS = 2;
export const MOVE_SEPARATOR = ' · ';

export const STAT_LEVEL_THRESHOLDS = { medium: 50, high: 90 } as const;
export const RADAR_LEVELS = 4;
export const RADAR_ANCHOR_TOLERANCE = 1;

export const MAX_STAT_VALUE = 255;
export const STAT_BAR_DURATION_MS = 600;
export const PERCENT = 100;
