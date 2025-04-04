import { Group, Member, Expense, ExpensesHistory } from "@/lib/types";
import { initializeHttpClient } from "./http-client";
const httpClient = await initializeHttpClient();

const listGroups = async (): Promise<Group[]> => {
  return httpClient.request({ endpoint: "/groups", method: "GET" }) as Promise<
    Group[]
  >;
};

const createGroup = async (groupName: string): Promise<void> => {
  return httpClient.request({
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
  return httpClient.request({
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
