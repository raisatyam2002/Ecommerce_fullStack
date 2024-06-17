import { useState, useContext, createContext, useEffect } from "react";

type AuthState = {
  user: any; // Replace 'any' with your user type
  token: string;
};

type AuthContextType =
  | [AuthState, React.Dispatch<React.SetStateAction<AuthState>>]
  | undefined;

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({ ...auth, user: parseData.user, token: parseData.token });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export { useAuth, AuthProvider };
