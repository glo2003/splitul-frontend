"use client";

import { LogOut, Menu, Plus, Settings, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AddExpenseDialog } from "@/components/add-expense-dialog";
import { CreateGroupDialog } from "@/components/create-group-dialog";
import { DesktopSidebar } from "@/components/desktop-sidebar";
import { JoinGroupDialog } from "@/components/join-group-dialog";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useGroups } from "@/hooks/groups";

export default function DashboardPage() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("apartment");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isJoinGroupOpen, setIsJoinGroupOpen] = useState(false);

  const { data: groups, isLoading: isGroupsLoading } = useGroups();

  // const createGroupMutation = useCreateGroup();
  // const deleteGroupMutation = useDeleteGroup();
  // const addMemberMutation = useAddMember();
  //
  // const handleCreateGroup = async (groupName: string) => {
  //   try {
  //     await createGroupMutation.mutateAsync(groupName);
  //     // Handle success (e.g., show notification)
  //   } catch (error) {
  //     // Handle error
  //   }
  // };
  //
  // const handleDeleteGroup = async (groupName: string, memberName: string) => {
  //   try {
  //     await deleteGroupMutation.mutateAsync({ groupName, memberName });
  //     // Handle success
  //   } catch (error) {
  //     // Handle error
  //   }
  // };
  //
  // const handleAddMember = async (groupName: string, memberName: string) => {
  //   try {
  //     await addMemberMutation.mutateAsync({ groupName, memberName });
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
        <div className="flex flex-1 items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
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
            groups={groups}
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
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
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
              <TabsContent value="overview" className="p-4 md:p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Total Group Expenses</h3>
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-bold">$487.65</div>
                      <p className="text-sm text-muted-foreground">
                        Last 30 days
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">You Owe</h3>
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-red-500">
                        $78.42
                      </div>
                      <p className="text-sm text-muted-foreground">
                        To 2 people
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">You Are Owed</h3>
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-green-500">
                        $124.50
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From 1 person
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="mb-4 font-semibold">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${activity.user.charAt(0)}`}
                              alt={activity.user}
                            />
                            <AvatarFallback>
                              {activity.user.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {activity.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${activity.amount.startsWith("+") ? "text-green-500" : activity.amount.startsWith("-") ? "text-red-500" : ""}`}
                          >
                            {activity.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="expenses" className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">All Expenses</h3>
                </div>
                <div className="space-y-4">
                  {expenses.map((expense, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${expense.paidBy.charAt(0)}`}
                            alt={expense.paidBy}
                          />
                          <AvatarFallback>
                            {expense.paidBy.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-muted-foreground">
                            Paid by {expense.paidBy} • {expense.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${expense.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {expense.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
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
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${balance.person.charAt(0)}`}
                            alt={balance.person}
                          />
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
      />
      <JoinGroupDialog
        open={isJoinGroupOpen}
        onOpenChange={setIsJoinGroupOpen}
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
