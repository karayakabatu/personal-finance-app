import { create } from 'zustand'

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  role: null,
  email: '',
  login: (email) => {
    const lowerEmail = email.toLowerCase()

    let role = 'user'
    if (lowerEmail.includes('admin')) {
      role = 'admin'
    } else if (lowerEmail.includes('advisor')) {
      role = 'advisor'
    }

    set({
      isAuthenticated: true,
      role,
      email,
    })
  },
  logout: () =>
    set({
      isAuthenticated: false,
      role: null,
      email: '',
    }),
}))

export default useAuthStore
