import { createContext } from 'react';
import { AuthContextType } from './types';

// Create the AuthContext with an initial default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);