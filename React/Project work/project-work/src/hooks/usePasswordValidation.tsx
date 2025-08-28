// hooks/usePasswordValidation.js

export const usePasswordValidation = () => {
  const getPasswordError = (password: string, confirmPassword: string) => {
    if (password.length === 0) return "";

    if (password.length < 8 ||
        !/(?=.*[A-Za-z])/.test(password) ||
        !/(?=.*\d)/.test(password) ||
        !/(?=.*[@$!%*?&])/.test(password)) {
      return "pass_does_not_match_the_requirements";
    }

    if (password !== confirmPassword) {
      return "pass_do_not_match";
    }

    return "";
  };

  const isPasswordStrong = (password: string) => {
    return password.length >= 8 &&
           /(?=.*[A-Za-z])/.test(password) &&
           /(?=.*\d)/.test(password) &&
           /(?=.*[@$!%*?&])/.test(password);
  };

  return {
    getPasswordError,
    isPasswordStrong
  };
};