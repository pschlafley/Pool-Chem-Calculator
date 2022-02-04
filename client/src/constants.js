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
};

// TODO - refactor ALK_INPUT into an array of objects to map through
export const FORM_VALUES = {
  alk: {
    header: 'Calculate Alkalinity Needed',
    inputLabels: ['Pool Gallons:', 'Current Alkalinity (in PPM):'],
    placeholders: ['Enter Gallons', 'Enter Alkalinity'],
    inputNames: ['gallons', 'alkalinity'],
  },
  buttons: {
    calculate: 'Calculate',
  },
};
