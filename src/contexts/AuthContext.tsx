import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/api'
import Router from 'next/router'

interface SignInCredentials {
  email: string
  password: string
}

interface User {
  email: string
  permissions: string[]
  roles: string[]
}

interface AuthContextProps {
  signIn(credentials: SignInCredentials): Promise<void>
  user: User
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactElement
}

export function signOut() {
  destroyCookie(undefined, 'nexttest.token')
  destroyCookie(undefined, 'nexttest.refreshToken')

  Router.push('/')
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = false

  useEffect(() => {
    const { 'nexttest.token': token } = parseCookies()

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { email, permissions, roles } = response.data
          setUser({
            email,
            permissions,
            roles,
          })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nexttest.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setCookie(undefined, 'nexttest.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setUser({
        email,
        permissions,
        roles,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
