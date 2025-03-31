"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listGroups,
  createGroup,
  deleteGroup,
  addMember,
  getGroup,
  addExpense,
  getExpenses,
  settleDebt,
  getMembers,
} from "@/api/groups";
import { Group, Member, Expense, ExpensesHistory } from "@/lib/types";

export function useGroup(groupName: string) {
  return useQuery<Group, Error>({
    queryKey: ["groups", groupName],
    queryFn: () => getGroup(groupName),
  });
}

export function useGroups() {
  return useQuery<Group[], Error>({
    queryKey: ["groups"],
    queryFn: listGroups,
  });
}

export function useMembers(
  groupName: string | undefined,
  memberName: string | undefined,
) {
  return useQuery<Member[], Error>({
    queryKey: ["members", groupName, memberName],
    queryFn: () => {
      return getMembers(groupName!, memberName!);
    },
    enabled: !!groupName && !!memberName,
  });
}

export function useExpenses(
  groupName: string | undefined,
  memberName: string | undefined,
) {
  return useQuery<ExpensesHistory, Error>({
    queryKey: ["expenses", groupName, memberName],
    queryFn: () => getExpenses(groupName!, memberName!),
    enabled: !!groupName && !!memberName,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupName: string) => createGroup(groupName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },
  });
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupName,
      memberName,
    }: {
      groupName: string;
      memberName: string;
    }) => deleteGroup(groupName, memberName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      groupName,
      memberName,
    }: {
      groupName: string;
      memberName: string;
    }) => {
      await addMember(groupName, memberName);
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      await queryClient.refetchQueries({ queryKey: ["groups"] });
    },
  });
}

export function useAddExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupName,
      expense,
    }: {
      groupName: string;
      expense: Expense;
    }) => addExpense(groupName, expense),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["groups", variables.groupName],
      });
      queryClient.invalidateQueries({
        queryKey: ["expenses", variables.groupName],
      });
      queryClient.invalidateQueries({
        queryKey: ["members", variables.groupName],
      });
    },
  });
}

export function useSettleDebt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupName,
      memberToSettle,
      loggedInMember,
    }: {
      groupName: string;
      memberToSettle: string;
      loggedInMember: string;
    }) => settleDebt(groupName, memberToSettle, loggedInMember),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["groups", variables.groupName],
      });
      queryClient.invalidateQueries({
        queryKey: ["expenses", variables.groupName],
      });
      queryClient.invalidateQueries({
        queryKey: ["members", variables.groupName],
      });
    },
  });
}
