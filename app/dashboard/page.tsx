"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Home, LogOut, Menu, Plus, Settings, User, Users, X } from "lucide-react"

import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateGroupDialog } from "@/components/create-group-dialog"
import { JoinGroupDialog } from "@/components/join-group-dialog"

export default function DashboardPage() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState("apartment")
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [isJoinGroupOpen, setIsJoinGroupOpen] = useState(false)

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
            <MobileSidebar setIsCreateGroupOpen={setIsCreateGroupOpen} setIsJoinGroupOpen={setIsJoinGroupOpen} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-1 font-semibold">
            <span className="hidden md:inline-block">SplitEase</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Button variant="outline" size="sm" onClick={() => setIsAddExpenseOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {selectedGroup === "apartment"
                        ? "Apartment"
                        : selectedGroup === "trip"
                          ? "Spring Break Trip"
                          : "Study Group"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedGroup("apartment")}>Apartment</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedGroup("trip")}>Spring Break Trip</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedGroup("study")}>Study Group</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <TabsContent value="overview" className="p-4 md:p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Total Group Expenses</h3>
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-bold">$487.65</div>
                      <p className="text-sm text-muted-foreground">Last 30 days</p>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">You Owe</h3>
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-red-500">$78.42</div>
                      <p className="text-sm text-muted-foreground">To 2 people</p>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">You Are Owed</h3>
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-green-500">$124.50</div>
                      <p className="text-sm text-muted-foreground">From 1 person</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="mb-4 font-semibold">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${activity.user.charAt(0)}`}
                              alt={activity.user}
                            />
                            <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{activity.description}</p>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${activity.amount.startsWith("+") ? "text-green-500" : activity.amount.startsWith("-") ? "text-red-500" : ""}`}
                          >
                            {activity.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">{activity.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="expenses" className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">All Expenses</h3>
                  <Button variant="outline" size="sm" onClick={() => setIsAddExpenseOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                  </Button>
                </div>
                <div className="space-y-4">
                  {expenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${expense.paidBy.charAt(0)}`}
                            alt={expense.paidBy}
                          />
                          <AvatarFallback>{expense.paidBy.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-muted-foreground">
                            Paid by {expense.paidBy} • {expense.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${expense.amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{expense.category}</p>
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
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${balance.person.charAt(0)}`}
                            alt={balance.person}
                          />
                          <AvatarFallback>{balance.person.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{balance.person}</p>
                          <p className="text-sm text-muted-foreground">{balance.email}</p>
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
                          {balance.amount > 0 ? "owes you" : balance.amount < 0 ? "you owe" : "settled up"}
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
      <AddExpenseDialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen} />
      <CreateGroupDialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen} />
      <JoinGroupDialog open={isJoinGroupOpen} onOpenChange={setIsJoinGroupOpen} />
    </div>
  )
}

function DesktopSidebar({ selectedGroup, setSelectedGroup, setIsCreateGroupOpen, setIsJoinGroupOpen }) {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex h-12 items-center gap-2 px-2 font-semibold">
        <Home className="h-5 w-5" />
        <span>Dashboard</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="px-2 text-sm font-medium text-muted-foreground">My Groups</h3>
        <Button
          variant={selectedGroup === "apartment" ? "secondary" : "ghost"}
          className="justify-start"
          onClick={() => setSelectedGroup("apartment")}
        >
          <Users className="mr-2 h-5 w-5" />
          Apartment
        </Button>
        <Button
          variant={selectedGroup === "trip" ? "secondary" : "ghost"}
          className="justify-start"
          onClick={() => setSelectedGroup("trip")}
        >
          <Users className="mr-2 h-5 w-5" />
          Spring Break Trip
        </Button>
        <Button
          variant={selectedGroup === "study" ? "secondary" : "ghost"}
          className="justify-start"
          onClick={() => setSelectedGroup("study")}
        >
          <Users className="mr-2 h-5 w-5" />
          Study Group
        </Button>
        <Button variant="ghost" className="justify-start text-primary" onClick={() => setIsJoinGroupOpen(true)}>
          <Users className="mr-2 h-5 w-5" />
          Join Group
        </Button>
        <Button variant="ghost" className="justify-start text-primary" onClick={() => setIsCreateGroupOpen(true)}>
          <Plus className="mr-2 h-5 w-5" />
          Create New Group
        </Button>
      </div>
      <div className="mt-auto">
        <Button variant="outline" className="w-full justify-start">
          <Settings className="mr-2 h-5 w-5" />
          Settings
        </Button>
      </div>
    </div>
  )
}

function MobileSidebar({ setIsCreateGroupOpen, setIsJoinGroupOpen }) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex h-12 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-1 font-semibold">
            SplitEase
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>
        <div className="flex flex-col gap-1">
          <Button variant="ghost" className="justify-start">
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <h3 className="px-2 text-sm font-medium text-muted-foreground">My Groups</h3>
          <Button variant="ghost" className="justify-start">
            <Users className="mr-2 h-5 w-5" />
            Apartment
          </Button>
          <Button variant="ghost" className="justify-start">
            <Users className="mr-2 h-5 w-5" />
            Spring Break Trip
          </Button>
          <Button variant="ghost" className="justify-start">
            <Users className="mr-2 h-5 w-5" />
            Study Group
          </Button>
          <Button variant="ghost" className="justify-start text-primary" onClick={() => setIsJoinGroupOpen(true)}>
            <Users className="mr-2 h-5 w-5" />
            Join Group
          </Button>
          <Button variant="ghost" className="justify-start text-primary" onClick={() => setIsCreateGroupOpen(true)}>
            <Plus className="mr-2 h-5 w-5" />
            Create New Group
          </Button>
        </div>
        <div className="mt-auto">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          <Button variant="outline" className="mt-2 w-full justify-start">
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
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
]

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
]

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
]

