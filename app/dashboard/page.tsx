"use client";

import { LogOut, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "../../hooks/user";
import { AddExpenseDialog } from "@/components/add-expense-dialog";
import { CreateGroupDialog } from "@/components/create-group-dialog";
import { DesktopSidebar } from "@/components/desktop-sidebar";
import { JoinGroupDialog } from "@/components/join-group-dialog";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCreateGroup,
  useGroups,
  useAddMember,
  useExpenses,
} from "@/hooks/groups";
import { useRouter } from "next/navigation";
import { OverviewTab } from "@/components/overview-tab";

export default function DashboardPage() {
  const { userName } = useUser();
  const router = useRouter();

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>();
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isJoinGroupOpen, setIsJoinGroupOpen] = useState(false);

  const { data: groups, isLoading: isGroupsLoading } = useGroups();
  const { data: expenseHistory, isLoading: isExpensesLoading } = useExpenses(
    selectedGroup,
    userName,
  );

  const createGroupMutation = useCreateGroup();
  const addMemberMutation = useAddMember();

  useEffect(() => {
    if (!userName) {
      router.push("/");
    }
  }, [userName, router]);

  if (!userName) {
    return null;
  }

  const handleCreateGroup = async (groupName: string) => {
    try {
      await createGroupMutation.mutateAsync(groupName);
      await addMemberMutation.mutateAsync({ groupName, memberName: userName });
    } catch (error) {
      console.error("Error adding member to group: ", userName, error);
    }
  };

  const handleJoinGroup = async (groupName: string) => {
    try {
      await addMemberMutation.mutateAsync({ groupName, memberName: userName });
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

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
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-none">
            <MobileSidebar
              groups={groups}
              isLoading={isGroupsLoading}
              setIsCreateGroupOpen={setIsCreateGroupOpen}
              setIsJoinGroupOpen={setIsJoinGroupOpen}
            />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 font-semibold"
          >
            <span className="hidden md:inline-block text-2xl">SplitUL</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-1">
          <div className="text-sm font-semibold text-gray-800">
            {userName ?? ""}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{userName[0] ?? ""}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  localStorage.removeItem("userName"); // Clear stored username
                  router.push("/");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
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
        <main className="flex flex-col">
          <div className="flex-1">
            <Tabs defaultValue="overview" className="h-full">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="balances">Balances</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-4">
                  <p className="opacity-70 font-semibold">{selectedGroup}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddExpenseOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                  </Button>
                </div>
              </div>
              <OverviewTab expenseHistory={expenseHistory} />
              <TabsContent value="balances" className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Current Balances</h3>
                  <Button variant="outline" size="sm">
                    Settle Up
                  </Button>
                </div>
                <div className="space-y-4">
                  {balances.map((balance, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {balance.person.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{balance.person}</p>
                          <p className="text-sm text-muted-foreground">
                            {balance.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${balance.amount > 0 ? "text-green-500" : balance.amount < 0 ? "text-red-500" : ""}`}
                        >
                          {balance.amount > 0
                            ? `+$${balance.amount.toFixed(2)}`
                            : balance.amount < 0
                              ? `-$${Math.abs(balance.amount).toFixed(2)}`
                              : "$0.00"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {balance.amount > 0
                            ? "owes you"
                            : balance.amount < 0
                              ? "you owe"
                              : "settled up"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <AddExpenseDialog
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
    </div>
  );
}

const recentActivity = [
  {
    user: "Alex",
    description: "Added expense: Groceries",
    date: "Today, 2:30 PM",
    amount: "$45.80",
    category: "Food & Drink",
  },
  {
    user: "You",
    description: "Added expense: Electricity",
    date: "Yesterday, 6:15 PM",
    amount: "$78.35",
    category: "Utilities",
  },
  {
    user: "Sam",
    description: "Paid you",
    date: "2 days ago",
    amount: "+$32.50",
    category: "Payment",
  },
  {
    user: "You",
    description: "Paid Alex",
    date: "3 days ago",
    amount: "-$25.00",
    category: "Payment",
  },
  {
    user: "Jordan",
    description: "Added expense: Pizza night",
    date: "4 days ago",
    amount: "$36.75",
    category: "Food & Drink",
  },
];

const expenses = [
  {
    description: "Groceries",
    paidBy: "Alex",
    date: "Today",
    amount: 45.8,
    category: "Food & Drink",
  },
  {
    description: "Electricity",
    paidBy: "You",
    date: "Yesterday",
    amount: 78.35,
    category: "Utilities",
  },
  {
    description: "Internet",
    paidBy: "Sam",
    date: "2 days ago",
    amount: 60.0,
    category: "Utilities",
  },
  {
    description: "Pizza night",
    paidBy: "Jordan",
    date: "4 days ago",
    amount: 36.75,
    category: "Food & Drink",
  },
  {
    description: "Cleaning supplies",
    paidBy: "You",
    date: "1 week ago",
    amount: 22.5,
    category: "Household",
  },
  {
    description: "Rent",
    paidBy: "You",
    date: "2 weeks ago",
    amount: 1200.0,
    category: "Housing",
  },
];

const balances = [
  {
    person: "Alex",
    email: "alex@example.com",
    amount: -45.8,
  },
  {
    person: "Sam",
    email: "sam@example.com",
    amount: -32.62,
  },
  {
    person: "Jordan",
    email: "jordan@example.com",
    amount: 124.5,
  },
];
