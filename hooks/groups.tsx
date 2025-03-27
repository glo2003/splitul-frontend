"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listGroups,
  createGroup,
  deleteGroup,
  addMember,
  Group,
} from "@/api/groups";

export function useGroups() {
  return useQuery<Group[], Error>({
    queryKey: ["groups"],
    queryFn: listGroups,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupName: string) => createGroup(groupName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
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
    mutationFn: ({
      groupName,
      memberName,
    }: {
      groupName: string;
      memberName: string;
    }) => addMember(groupName, memberName),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["groups", variables.groupName],
      });
      await queryClient.refetchQueries({
        queryKey: ["groups"],
      });
    },
  });
}
