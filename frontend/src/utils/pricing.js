export const SERVICE_TYPES = [
  'Studio Rental Only',
  'Package 1',
  'Package 2',
  'Package 3',
  'Custom Project'
];

export const EQUIPMENT_ADDONS = [
  'Lighting & Grip Kit',
  'Photography Kit',
  'Video Kit',
  'Camera Kit',
  'Pro Audio Gear'
];

export const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

export const PACKAGE_PRICES = {
  'Package 1': 170,
  'Package 2': 300,
  'Package 3': 500
};

export function calculatePrice({ serviceType, hours, selectedEquipment }) {
  if (serviceType === 'Custom Project') {
    return null;
  }

  const equipmentTotal = (selectedEquipment?.length || 0) * 450;

  if (serviceType === 'Studio Rental Only') {
    return Math.max(Number(hours) || 1, 1) * 300 + equipmentTotal;
  }

  return (PACKAGE_PRICES[serviceType] || 0) + equipmentTotal;
}

export function formatQar(value) {
  if (value === null || value === undefined) {
    return 'Custom quotation required';
  }

  return `${Number(value).toLocaleString()} QAR`;
}
