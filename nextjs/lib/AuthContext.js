import { createContext, useState } from 'react'

const AuthContext = createContext({
  isAuthUser : false,
  setAuthUser: () => {}
})

export const AuthProvider = ({ children, authenticated }) => {
  const [isAuthUser, setAuthUser] = useState(authenticated);
  return (
    <AuthContext.Provider value={{isAuthUser, setAuthUser }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useIsAuthUser() {
  const context = useAuth();
  return context.isAuthUser;
}

export default AuthContext