"use client"

import { useState } from "react"
import { CalendarIcon, Plus, X } from "lucide-react"
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const categories = ["Food & Drink", "Utilities", "Rent", "Household", "Entertainment", "Transportation", "Other"]

const friends = [
  {
    name: "Alex",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=A",
  },
  {
    name: "Sam",
    email: "sam@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=S",
  },
  {
    name: "Jordan",
    email: "jordan@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=J",
  },
]

export function AddExpenseDialog({ open, onOpenChange }) {
  const [date, setDate] = useState(new Date())
  const [selectedFriends, setSelectedFriends] = useState([...friends])
  const [splitType, setSplitType] = useState("equal")

  const handleAddExpense = (e) => {
    e.preventDefault()
    // In a real app, we would save the expense to the database
    onOpenChange(false)
  }

  const toggleFriend = (friend) => {
    if (selectedFriends.some((f) => f.name === friend.name)) {
      setSelectedFriends(selectedFriends.filter((f) => f.name !== friend.name))
    } else {
      setSelectedFriends([...selectedFriends, friend])
    }
  }

  const removeFriend = (friend) => {
    setSelectedFriends(selectedFriends.filter((f) => f.name !== friend.name))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add an expense</DialogTitle>
          <DialogDescription>Enter the details of your expense to split it with your friends.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddExpense}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="e.g., Dinner, Groceries, Rent" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="amount" type="number" step="0.01" min="0" className="pl-7" placeholder="0.00" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Split with</Label>
              <div className="flex flex-wrap gap-2">
                {selectedFriends.map((friend) => (
                  <div key={friend.name} className="flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{friend.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full"
                      onClick={() => removeFriend(friend)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1 rounded-full">
                      <Plus className="h-3 w-3" />
                      <span className="text-xs">Add</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {friends.map((friend) => (
                      <DropdownMenuItem
                        key={friend.name}
                        onClick={() => toggleFriend(friend)}
                        disabled={selectedFriends.some((f) => f.name === friend.name)}
                      >
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        {friend.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="split-type">Split type</Label>
              <Select value={splitType} onValueChange={setSplitType}>
                <SelectTrigger id="split-type">
                  <SelectValue placeholder="How to split the expense" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equal">Split equally</SelectItem>
                  <SelectItem value="percentage">Split by percentage</SelectItem>
                  <SelectItem value="amount">Split by exact amounts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {splitType !== "equal" && (
              <div className="rounded-md border p-4">
                <h4 className="mb-2 text-sm font-medium">Custom split</h4>
                {selectedFriends.map((friend, index) => (
                  <div key={friend.name} className="mb-2 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{friend.name}</span>
                    <div className="relative ml-auto">
                      {splitType === "percentage" && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      )}
                      {splitType === "amount" && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      )}
                      <Input
                        type="number"
                        className={cn("w-24", splitType === "percentage" ? "pr-7" : "pl-7")}
                        placeholder={splitType === "percentage" ? "0" : "0.00"}
                        min="0"
                        step={splitType === "percentage" ? "1" : "0.01"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

