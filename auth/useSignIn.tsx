import { useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};