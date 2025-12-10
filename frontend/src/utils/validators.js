// Validate email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate slug
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Validate required fields
export const validateRequired = (fields) => {
  const errors = {};
  
  Object.keys(fields).forEach((key) => {
    if (!fields[key] || fields[key].toString().trim() === '') {
      errors[key] = `${key} is required`;
    }
  });
  
  return errors;
};
