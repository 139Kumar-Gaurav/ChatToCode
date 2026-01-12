// Password validation utility
export const passwordRules = {
  minLength: {
    rule: (password) => password.length >= 8,
    label: "At least 8 characters",
    icon: "✓",
  },
  hasUpperCase: {
    rule: (password) => /[A-Z]/.test(password),
    label: "One uppercase letter",
    icon: "✓",
  },
  hasLowerCase: {
    rule: (password) => /[a-z]/.test(password),
    label: "One lowercase letter",
    icon: "✓",
  },
  hasNumber: {
    rule: (password) => /\d/.test(password),
    label: "One number",
    icon: "✓",
  },
  hasSpecialChar: {
    rule: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    label: "One special character",
    icon: "✓",
  },
};

export const validatePassword = (password) => {
  const results = {};
  Object.keys(passwordRules).forEach((key) => {
    results[key] = passwordRules[key].rule(password);
  });
  return results;
};

export const getPasswordStrength = (password) => {
  const validations = validatePassword(password);
  const passedCount = Object.values(validations).filter(Boolean).length;

  if (passedCount === 0) return { strength: 0, label: "Very Weak", color: "red" };
  if (passedCount === 1) return { strength: 1, label: "Weak", color: "orange" };
  if (passedCount === 2) return { strength: 2, label: "Fair", color: "yellow" };
  if (passedCount === 3) return { strength: 3, label: "Good", color: "blue" };
  if (passedCount === 4) return { strength: 4, label: "Strong", color: "green" };
  return { strength: 5, label: "Very Strong", color: "green" };
};

export const isPasswordStrong = (password) => {
  const validations = validatePassword(password);
  // At least 4 out of 5 requirements met
  const passedCount = Object.values(validations).filter(Boolean).length;
  return passedCount >= 4;
};
