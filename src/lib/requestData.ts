export const allowFields = (allowedFieldsArray: string[], inputObject: { [key: string]: any }) => allowedFieldsArray.reduce((acc, allowedField) => {
  if (inputObject?.[allowedField]) {
    (acc as any)[allowedField] = inputObject[allowedField];
  }
  return acc;
}, {});

export const verifyRequiredFields = (requiredFieldsArray: string[] = [], inputObject: { [key: string]: any } = {}) => requiredFieldsArray.reduce((acc, requiredField) => {
  if (!(requiredField in inputObject)) {
    acc.isValid = false;
    acc.missingFields.push(requiredField);
  }
  return acc;
}, { isValid: true, missingFields: [] });

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^\d{10}$/; // Assuming phone number is a 10-digit number
  return phoneRegex.test(phoneNumber);
}
