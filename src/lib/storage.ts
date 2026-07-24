// Spendr Storage Helper — Per-user localStorage

export interface Profile {
  name: string;
  budget: number;
}

const getKeys = (userId: string) => ({
  NAME: `spendr_user_name_${userId}`,
  BUDGET: `spendr_monthly_budget_${userId}`,
  EXPENSES: `spendr_expenses_${userId}`,
});

export const saveProfile = (
  userId: string,
  name: string,
  budget: number
): void => {
  try {
    const KEYS = getKeys(userId);
    localStorage.setItem(KEYS.NAME, name);
    localStorage.setItem(KEYS.BUDGET, String(budget));
  } catch (e) {
    console.error("saveProfile error:", e);
  }
};

export const loadProfile = (userId: string): Profile => {
  try {
    const KEYS = getKeys(userId);
    const name = localStorage.getItem(KEYS.NAME);
    const budget = localStorage.getItem(KEYS.BUDGET);

    return {
      name: name ?? "",
      budget: budget ? Number(budget) : 15000,
    };
  } catch (e) {
    console.error("loadProfile error:", e);
    return {
      name: "",
      budget: 15000,
    };
  }
};

export const clearProfile = (userId: string): void => {
  try {
    const KEYS = getKeys(userId);
    localStorage.removeItem(KEYS.NAME);
    localStorage.removeItem(KEYS.BUDGET);
    localStorage.removeItem(KEYS.EXPENSES);
  } catch (e) {
    console.error("clearProfile error:", e);
  }
};

export interface Expense {
  id: string;
  amount: number;
  category: string;
  vibe: string;
  note: string;
  date: number;
}

export const saveExpenses = (
  userId: string,
  expenses: Expense[]
): void => {
  try {
    const KEYS = getKeys(userId);
    localStorage.setItem(KEYS.EXPENSES, JSON.stringify(expenses));
  } catch (e) {
    console.error("saveExpenses error:", e);
  }
};

export const loadExpenses = (userId: string): Expense[] => {
  try {
    const KEYS = getKeys(userId);
    const raw = localStorage.getItem(KEYS.EXPENSES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("loadExpenses error:", e);
    return [];
  }
};