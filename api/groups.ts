import { httpClient } from "./http-client";

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

const listGroups = async (): Promise<Group[]> => {
  return httpClient.request({ endpoint: "/groups", method: "GET" }) as Promise<
    Group[]
  >;
};

const createGroup = async (groupName: string): Promise<void> => {
  httpClient.request({
    endpoint: "/groups",
    method: "POST",
    body: { name: groupName },
  });
};

const getGroup = async (groupName: string): Promise<Group> => {
  return httpClient.request({
    endpoint: `/groups/${groupName}`,
    method: "GET",
  });
};

const deleteGroup = async (
  groupName: string,
  memberName: string,
): Promise<void> => {
  return httpClient.request({
    endpoint: `/groups/${groupName}`,
    method: "DELETE",
    headers: { Member: memberName },
  });
};

const addMember = async (
  groupName: string,
  memberName: string,
): Promise<void> => {
  httpClient.request({
    endpoint: `/groups/${groupName}/members`,
    method: "POST",
    body: { memberName },
  });
};

const getMembers = async (
  groupName: string,
  memberName: string,
): Promise<Member[]> => {
  return httpClient.request({
    endpoint: `/groups/${groupName}/members`,
    method: "GET",
    headers: { Member: memberName },
  });
};

const settleDebt = async (
  groupName: string,
  memberToSettle: string,
  loggedInMember: string,
): Promise<void> => {
  return httpClient.request({
    endpoint: `/groups/${groupName}/members/${memberToSettle}/settle`,
    method: "PUT",
    headers: { Member: loggedInMember },
  });
};

const addExpense = async (
  groupName: string,
  expense: Expense,
): Promise<void> => {
  return httpClient.request({
    endpoint: `/groups/${groupName}/expenses`,
    method: "POST",
    body: expense,
  });
};

const getExpenses = async (
  groupName: string,
  memberName: string,
): Promise<ExpensesHistory> => {
  return httpClient.request({
    endpoint: `/groups/${groupName}/expenses`,
    method: "GET",
    headers: { Member: memberName },
  });
};

export {
  listGroups,
  createGroup,
  getGroup,
  deleteGroup,
  addMember,
  getMembers,
  settleDebt,
  addExpense,
  getExpenses,
};
