// AuthContext types
export interface UserInfo {
  id: string;
  name: string;
}

export interface AuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  userToken: string | null;
  userInfo: UserInfo | null;
}
