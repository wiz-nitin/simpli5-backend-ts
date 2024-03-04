"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = exports.validateEmail = exports.verifyRequiredFields = exports.allowFields = void 0;
const allowFields = (allowedFieldsArray, inputObject) => allowedFieldsArray.reduce((acc, allowedField) => {
    if (inputObject === null || inputObject === void 0 ? void 0 : inputObject[allowedField]) {
        acc[allowedField] = inputObject[allowedField];
    }
    return acc;
}, {});
exports.allowFields = allowFields;
const verifyRequiredFields = (requiredFieldsArray = [], inputObject = {}) => requiredFieldsArray.reduce((acc, requiredField) => {
    if (!(requiredField in inputObject)) {
        acc.isValid = false;
        acc.missingFields.push(requiredField);
    }
    return acc;
}, { isValid: true, missingFields: [] });
exports.verifyRequiredFields = verifyRequiredFields;
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/; // Assuming phone number is a 10-digit number
    return phoneRegex.test(phoneNumber);
};
exports.validatePhoneNumber = validatePhoneNumber;
