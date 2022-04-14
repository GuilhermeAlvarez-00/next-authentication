import { createContext, ReactElement, useContext } from 'react'

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextProps {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactElement
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false

  async function signIn({ email, password }: SignInCredentials) {
    console.log('context', {
      email,
      password,
    })
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
