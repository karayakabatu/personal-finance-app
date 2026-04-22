import { create } from 'zustand'
import { supabase } from '../lib/supabase.js'

const useFinanceStore = create((set, get) => ({
  expenses: [],
  income: null,
  loading: false,

  fetchData: async (userEmail) => {
    set({ loading: true })

    const [{ data: expensesData }, { data: incomeData }] = await Promise.all([
      supabase
        .from('expenses')
        .select('*')
        .eq('user_email', userEmail)
        .order('created_at', { ascending: false }),
      supabase
        .from('incomes')
        .select('*')
        .eq('user_email', userEmail)
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
    ])

    set({
      expenses: expensesData ?? [],
      income: incomeData ?? null,
      loading: false,
    })
  },

  saveIncome: async (userEmail, amount) => {
    const existing = get().income

    if (existing) {
      const { data } = await supabase
        .from('incomes')
        .update({ amount })
        .eq('id', existing.id)
        .select()
        .single()

      if (data) set({ income: data })
    } else {
      const { data } = await supabase
        .from('incomes')
        .insert({ user_email: userEmail, amount })
        .select()
        .single()

      if (data) set({ income: data })
    }
  },

  addExpense: async (userEmail, title, amount, category) => {
    const { data } = await supabase
      .from('expenses')
      .insert({ user_email: userEmail, title, amount, category })
      .select()
      .single()

    if (data) {
      set((state) => ({ expenses: [data, ...state.expenses] }))
    }
  },

  updateExpense: async (id, title, amount, category) => {
    const { data } = await supabase
      .from('expenses')
      .update({ title, amount, category })
      .eq('id', id)
      .select()
      .single()

    if (data) {
      set((state) => ({
        expenses: state.expenses.map((e) => (e.id === id ? data : e)),
      }))
    }
  },

  deleteExpense: async (id) => {
    await supabase.from('expenses').delete().eq('id', id)
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    }))
  },

  clearData: () => set({ expenses: [], income: null }),
}))

export default useFinanceStore
