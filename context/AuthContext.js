import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check AsyncStorage for user state on app load
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUser();
  }, []);

  const handleLogin = async (user) => {
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

    const handleLogout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

  return (
    <AuthContext.Provider 
        value={{ user, setUser, handleLogin, handleLogout}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };