import { createContext } from "react";

type User = { 
    name: string, 
    email: string, 
    role: string, 
    id: string 
}

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;