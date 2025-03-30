"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../hooks/user";
import { AddExpenseDialog } from "@/components/add-expense-dialog";
import { CreateGroupDialog } from "@/components/create-group-dialog";
import { DesktopSidebar } from "@/components/desktop-sidebar";
import { JoinGroupDialog } from "@/components/join-group-dialog";
import {
  useCreateGroup,
  useGroups,
  useAddMember,
  useExpenses,
  useMembers,
  useAddExpense,
} from "@/hooks/groups";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { GroupInformation } from "@/components/group-information";
import { Expense } from "@/api/groups";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ApiError } from "@/api/http-client";

export default function DashboardPage() {
  const { userName } = useUser();
  const router = useRouter();

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>();
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isJoinGroupOpen, setIsJoinGroupOpen] = useState(false);

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
  const addMemberMutation = useAddMember();
  const addExpenseMutation = useAddExpense();

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

  // const deleteGroupMutation = useDeleteGroup();
  //
  // const handleDeleteGroup = async (groupName: string, memberName: string) => {
  //   try {
  //     await deleteGroupMutation.mutateAsync({ groupName, memberName });
  //     // Handle success
  //   } catch (error) {
  //     // Handle error
  //   }
  // };

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
      />
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r md:block">
          <DesktopSidebar
            key={groups?.length}
            groups={groups?.filter((group) => group.members.includes(userName))}
            isLoading={isGroupsLoading}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            setIsCreateGroupOpen={setIsCreateGroupOpen}
            setIsJoinGroupOpen={setIsJoinGroupOpen}
          />
        </aside>
        <GroupInformation
          userName={userName}
          members={members}
          selectedGroup={selectedGroup}
          expenseHistory={expenseHistory}
          isGroupsLoading={isGroupsLoading}
          isExpensesLoading={isExpensesLoading}
          isMembersLoading={isMembersLoading}
          setIsAddExpenseOpen={setIsAddExpenseOpen}
        />
      </div>
      <AddExpenseDialog
        userName={userName}
        members={members?.filter((member) => member.memberName !== userName)}
        addExpense={handleAddExpense}
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
      />
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
      <Toaster richColors />
    </div>
  );
}
