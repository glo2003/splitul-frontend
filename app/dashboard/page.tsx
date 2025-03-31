"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../hooks/user";
import { CreateGroupDialog } from "@/components/dialogs/create-group-dialog";
import { DesktopSidebar } from "@/components/sidebars/desktop-sidebar";
import { JoinGroupDialog } from "@/components/dialogs/join-group-dialog";
import {
  useCreateGroup,
  useGroups,
  useAddMember,
  useExpenses,
  useMembers,
  useAddExpense,
  useSettleDebt,
  useDeleteGroup,
} from "@/hooks/groups";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { GroupInformation } from "@/components/group-information";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ApiError } from "@/api/http-client";
import { Expense } from "@/lib/types";
import { RemoveGroupDialog } from "@/components/dialogs/remove-group-dialog";

export default function DashboardPage() {
  const { userName } = useUser();
  const router = useRouter();

  const [selectedGroup, setSelectedGroup] = useState<string>();
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isJoinGroupOpen, setIsJoinGroupOpen] = useState(false);
  const [isDeleteGroupOpen, setIsDeleteGroupOpen] = useState(false);

  const { data: groups, isLoading: isGroupsLoading } = useGroups();
  const { data: members, isLoading: isMembersLoading } = useMembers(
    selectedGroup,
    userName,
  );
  const { data: expenseHistory, isLoading: isExpensesLoading } = useExpenses(
    selectedGroup,
    userName,
  );

  const createGroupMutation = useCreateGroup();
  const deleteGroupMutation = useDeleteGroup();
  const addMemberMutation = useAddMember();
  const addExpenseMutation = useAddExpense();
  const settleDebt = useSettleDebt();

  useEffect(() => {
    if (!userName) {
      router.push("/");
    }
  }, [userName, router]);

  useEffect(() => {
    if (groups) {
      const userGroups = groups.filter((group) =>
        group.members.includes(userName),
      );
      if (userGroups.length > 0) setSelectedGroup(userGroups[0].name);
    }
  }, [groups, userName]);

  const handleCreateGroup = async (groupName: string) => {
    try {
      await createGroupMutation.mutateAsync(groupName);
      await addMemberMutation.mutateAsync({ groupName, memberName: userName });

      toast.success("Group created and joined successfully");
    } catch (error) {
      const apiError = error as ApiError;

      toast.error(apiError.message, {
        description: apiError.description,
      });
    }
  };

  const handleJoinGroup = async (groupName: string) => {
    try {
      await addMemberMutation.mutateAsync({ groupName, memberName: userName });

      toast.success("Group joined successfully");
    } catch (error) {
      const apiError = error as ApiError;

      toast.error(apiError.message, {
        description: apiError.description,
      });
    }
  };

  const handleAddExpense = async (expense: Expense) => {
    try {
      await addExpenseMutation.mutateAsync({
        groupName: selectedGroup!,
        expense,
      });

      toast.success("Expense added successfully");
    } catch (error) {
      const apiError = error as ApiError;

      toast.error(apiError.message, {
        description: apiError.description,
      });
    }
  };

  const handleSettleDebt = async (memberToSettle: string) => {
    try {
      await settleDebt.mutateAsync({
        groupName: selectedGroup!,
        memberToSettle,
        loggedInMember: userName,
      });

      toast.success("Settled up successfully");
    } catch (error) {
      const apiError = error as ApiError;

      toast.error(apiError.message, {
        description: apiError.description,
      });
    }
  };

  const handleDeleteGroup = async (groupName: string) => {
    try {
      await deleteGroupMutation.mutateAsync({
        groupName,
        memberName: userName,
      });
      toast.success("Group deleted successfully");
    } catch (error) {
      const apiError = error as ApiError;

      toast.error(apiError.message, {
        description: apiError.description,
      });
    }
  };
  if (!userName) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        userName={userName}
        groups={groups?.filter((group) => group.members.includes(userName))}
        isGroupsLoading={isGroupsLoading}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        setIsCreateGroupOpen={setIsCreateGroupOpen}
        setIsJoinGroupOpen={setIsJoinGroupOpen}
        setIsDeleteGroupOpen={setIsDeleteGroupOpen}
      />
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <DesktopSidebar
          key={groups?.length}
          groups={groups?.filter((group) => group.members.includes(userName))}
          isLoading={isGroupsLoading}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          setIsCreateGroupOpen={setIsCreateGroupOpen}
          setIsJoinGroupOpen={setIsJoinGroupOpen}
          setIsDeleteGroupOpen={setIsDeleteGroupOpen}
        />
        <GroupInformation
          userName={userName}
          members={members}
          selectedGroup={selectedGroup}
          expenseHistory={expenseHistory}
          isGroupsLoading={isGroupsLoading}
          isExpensesLoading={isExpensesLoading}
          isMembersLoading={isMembersLoading}
          addExpense={handleAddExpense}
          settleUp={handleSettleDebt}
        />
      </div>
      <CreateGroupDialog
        open={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
        handleCreateGroup={handleCreateGroup}
      />
      <JoinGroupDialog
        open={isJoinGroupOpen}
        groups={groups}
        onOpenChange={setIsJoinGroupOpen}
        handleJoinGroup={handleJoinGroup}
      />
      <RemoveGroupDialog
        open={isDeleteGroupOpen}
        groups={
          groups
            ? groups.filter((group) => group.members.includes(userName))
            : []
        }
        onOpenChange={setIsDeleteGroupOpen}
        deleteGroup={handleDeleteGroup}
      />
      <Toaster richColors />
    </div>
  );
}
