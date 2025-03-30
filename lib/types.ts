export type Member = {
  memberName: string;
  debts: {
    [memberName: string]: number;
  };
};

export type Expense = {
  description: string;
  amount: number;
  purchaseDate: string;
  paidBy: string;
  split: SplitType;
};

export type ExpensesHistory = {
  total: number;
  expenses: Expense[];
};

export type Group = {
  members: string[];
  name: string;
};

export type SplitType = "equally";

export type Balance = { memberName: string; amount: number };
