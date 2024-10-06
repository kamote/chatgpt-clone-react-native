import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { AuthContextType, UserInfo } from './types';

interface AuthProviderProps {
  children: React.ReactNode;
}

// Example API response structure
interface SignInResponse {
  token: string;
  user: UserInfo;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const mutation = useMutation({
    mutationFn: (credentials) => {
      // return axios.post('/todos', newTodo)
      return axios.post<SignInResponse>('https://example.com/api/signin', credentials);
    },
    onSuccess: (data:any) => {
      // Assuming the response contains the user token and user info
      setIsSignedIn(true);
      setUserToken(data.data.token);
      setUserInfo(data.data.user);
    },
    onError: (error:any) => {
      // Handle error case
      console.error('Sign-in failed', error);
    },
  });

  // This will be used to trigger the sign-in process
  const signIn = (username: string, password: string) => {
    mutation.mutate({ username, password });
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUserToken(null);
    setUserInfo(null);
  };

  const value: AuthContextType = {
    isLoaded,
    isSignedIn,
    signIn,
    signOut,
    userToken,
    userInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
