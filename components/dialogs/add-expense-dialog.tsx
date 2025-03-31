import { useState } from "react";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Member, Expense, SplitType } from "@/lib/types";

type AddExpenseDialogProps = {
  userName: string;
  members?: Member[];
  addExpense: (expense: Expense) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddExpenseDialog({
  userName,
  members,
  addExpense,
  open,
  onOpenChange,
}: AddExpenseDialogProps) {
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [selectedMembers, setSelectedMembers] = useState(
    members ? [...members] : [],
  );
  const [splitType, setSplitType] = useState<SplitType>("equally");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{
    description?: string;
    amount?: string;
    purchaseDate?: string;
    members?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        newErrors.amount = "Amount must be a valid number";
      } else if (numAmount <= 0) {
        newErrors.amount = "Amount must be greater than 0";
      }
    }

    if (!purchaseDate) {
      newErrors.purchaseDate = "Date is required";
    }

    if (selectedMembers.length === 0) {
      newErrors.members = "Select at least one member";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setPurchaseDate(new Date());
    setSelectedMembers(members ? [...members] : []);
    setSplitType("equally");
    setErrors({});
  };

  const handleAddExpense = () => {
    if (!validateForm()) {
      return;
    }

    const expense: Expense = {
      description,
      amount: +amount,
      purchaseDate: purchaseDate.toLocaleDateString(),
      paidBy: userName,
      split: splitType,
    };
    addExpense(expense);
    onOpenChange(false);
  };

  const removeMember = (member: Member) => {
    setSelectedMembers(
      selectedMembers.filter((f) => f.memberName !== member.memberName),
    );
  };

  if (!members) {
    return;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        resetForm();
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add an expense</DialogTitle>
          <DialogDescription>
            Enter the details of your expense to split it with your friends.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g., Dinner, Groceries, Rent"
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <span className="text-sm text-red-500">{errors.description}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                className={cn("pl-7", errors.amount ? "border-red-500" : "")}
                placeholder="0.00"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {errors.amount && (
              <span className="text-sm text-red-500">{errors.amount}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !purchaseDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {purchaseDate ? format(purchaseDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={purchaseDate}
                  onSelect={(date: Date | undefined) =>
                    setPurchaseDate(date || new Date())
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.purchaseDate && (
              <span className="text-sm text-red-500">
                {errors.purchaseDate}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Split with</Label>
            <div className="flex flex-wrap gap-2">
              {selectedMembers.length === 0 ? (
                <span className="text-sm text-muted-foreground">
                  No members selected
                </span>
              ) : (
                selectedMembers.map((member) => (
                  <div
                    key={member.memberName}
                    className="flex items-center gap-1 rounded-full bg-muted px-2 py-1"
                  >
                    <span className="text-xs">{member.memberName}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full"
                      onClick={() => removeMember(member)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 rounded-full"
                  >
                    <Plus className="h-3 w-3" />
                    <span className="text-xs">Add</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {(() => {
                    const availableMembers = members?.filter(
                      (member) => !selectedMembers.includes(member),
                    );

                    if (!availableMembers?.length) {
                      return (
                        <DropdownMenuItem disabled>
                          <span className="text-muted-foreground">
                            No other members
                          </span>
                        </DropdownMenuItem>
                      );
                    }

                    return availableMembers.map((member) => (
                      <DropdownMenuItem
                        key={member.memberName}
                        onClick={() =>
                          setSelectedMembers((prev) => [...prev, member])
                        }
                      >
                        {member.memberName}
                      </DropdownMenuItem>
                    ));
                  })()}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {errors.members && (
              <span className="text-sm text-red-500">{errors.members}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="split-type">Split type</Label>
            <Select
              value={splitType}
              onValueChange={(value: SplitType) => setSplitType(value)}
            >
              <SelectTrigger id="split-type">
                <SelectValue placeholder="How to split the expense" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equally">Split equally</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleAddExpense}>
            Save expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
