export const UNITS = {
  pounds: 'lbs',
  fluidOunce: 'fl oz',
  quarts: 'qt',
};

export const CHEMICALS = {
  base: {
    label: 'Baking Soda',
    unit: UNITS.pounds,
  },
  acid: {
    label: 'Muriatic Acid',
    unit: UNITS.fluidOunce,
  },
  salt: {
    label: 'Salt',
    unit: UNITS.pounds,
  },
  chlorine: {
    id: 'chlorine',
    label: 'Chlorine',
  },
  nonChlorine: {
    label: 'Non-Chlorine',
  },
};

export const LABELS = {
  alkForm: {
    header: 'Calculate Alkalinity Needed',
    button: 'Calculate',
  },
  saltForm: {
    header: 'Calculate Salt Needed',
    button: 'Calculate',
  },
  chlorineForm: {
    header: 'Calculate Chlorine Needed',
    button: 'Calculate',
  },
};

export const POOL_SHAPES = {
  rectanguler: 'Rectangular',
  circular: 'Circular',
  oval: 'Oval',
  oblong: 'Oblong',
};

export const CHLORINE_TYPES = {
  granular: 'Granular',
  liquid: 'Liquid',
};
