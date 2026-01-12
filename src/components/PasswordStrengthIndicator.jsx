import { validatePassword, getPasswordStrength } from "../utils/passwordValidator";

const PasswordStrengthIndicator = ({ password }) => {
  const validations = validatePassword(password);
  const strengthInfo = getPasswordStrength(password);
  const colorMap = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  return (
    <div className="mt-3 space-y-2">
      {/* Strength Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${colorMap[strengthInfo.color]}`}
          style={{ width: `${(strengthInfo.strength / 5) * 100}%` }}
        ></div>
      </div>

      {/* Strength Label */}
      <p className={`text-sm font-semibold text-${strengthInfo.color}-600`}>
        Password Strength: {strengthInfo.label}
      </p>

      {/* Validation Rules */}
      <div className="space-y-1">
        <div className={validations.minLength ? "text-green-600" : "text-gray-400"}>
          <span className="text-sm">
            {validations.minLength ? "✓" : "✗"} At least 8 characters
          </span>
        </div>
        <div className={validations.hasUpperCase ? "text-green-600" : "text-gray-400"}>
          <span className="text-sm">
            {validations.hasUpperCase ? "✓" : "✗"} One uppercase letter (A-Z)
          </span>
        </div>
        <div className={validations.hasLowerCase ? "text-green-600" : "text-gray-400"}>
          <span className="text-sm">
            {validations.hasLowerCase ? "✓" : "✗"} One lowercase letter (a-z)
          </span>
        </div>
        <div className={validations.hasNumber ? "text-green-600" : "text-gray-400"}>
          <span className="text-sm">
            {validations.hasNumber ? "✓" : "✗"} One number (0-9)
          </span>
        </div>
        <div className={validations.hasSpecialChar ? "text-green-600" : "text-gray-400"}>
          <span className="text-sm">
            {validations.hasSpecialChar ? "✓" : "✗"} One special character (!@#$%^&*)
          </span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
