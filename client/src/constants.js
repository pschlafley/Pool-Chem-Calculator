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
  signUpForm: {
    header: 'Sign Up',
    button: 'Submit',
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

export const CHLORINE_RESULT_MESSAGES = {
  granular: {
    start: 'You should add',
    end: 'lbs of solid chlorine shock to your pool.',
    subMessage:
      'You may need to add more bags of shock if your pool has a lot of algae!',
  },
  liquid: {
    start: 'You should add',
    end: 'gallons of liquid chlorine shock you to your pool.',
    subMessage:
      'You may need to add more bags of shock if your pool has a lot of algae!',
  },
  oxidixing: {
    // Non-Chlorine shock - oxidizing shock
    start: 'You should add',
    end: 'lbs of non chlorine oxidizing shock to your pool.',
  },
  none: 'You do not need to add any chlorine.',
};

export const INPUT_TYPES = {
  text: 'text',
  password: 'password',
};
