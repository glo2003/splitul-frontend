import { AddExpenseDialog } from "@/components/dialogs/add-expense-dialog";
import { BalanceTab } from "@/components/tabs/balance-tab";
import { OverviewTab } from "@/components/tabs/overview-tab";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Expense, ExpensesHistory, Member } from "@/lib/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type GroupInformationProps = {
  userName: string;
  members?: Member[];
  selectedGroup?: string;
  expenseHistory?: ExpensesHistory;
  isGroupsLoading: boolean;
  isExpensesLoading: boolean;
  isMembersLoading: boolean;
  addExpense: (expense: Expense) => void;
  settleUp: (memberToSettle: string) => void;
};

export const GroupInformation = ({
  userName,
  members,
  selectedGroup,
  expenseHistory,
  isGroupsLoading,
  isExpensesLoading,
  isMembersLoading,
  addExpense,
  settleUp,
}: GroupInformationProps) => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  if (isGroupsLoading) {
    return (
      <main className="flex flex-col">
        <div className="flex-1">
          <Skeleton className="m-3 h-8"></Skeleton>
          <Skeleton className="m-3 h-64"></Skeleton>
        </div>
      </main>
    );
  }

  if (!selectedGroup) {
    return (
      <main className="flex justify-center">
        <h3 className="text-xl mt-[33vh] px-4 text-center font-semibold text-gray-600">
          Please select or create a group to continue
        </h3>
      </main>
    );
  }

  return (
    <main className="flex flex-col">
      <div className="flex-1">
        <Tabs defaultValue="overview" className="h-full">
          <div className="flex flex-col border-b px-4 py-2">
            <div className="pl-1">
              <p className="opacity-70 font-semibold text-lg">
                {selectedGroup}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="balances">Balances</TabsTrigger>
              </TabsList>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (
                    !members ||
                    !members.some((member) => member.memberName != userName)
                  )
                    toast("The group must have other members to add expenses");
                  else {
                    setIsAddExpenseOpen(true);
                  }
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </div>
          </div>
          <OverviewTab
            userName={userName}
            expenseHistory={expenseHistory}
            isExpenseLoading={isExpensesLoading}
            members={members}
            isMembersLoading={isMembersLoading}
          />
          <BalanceTab
            userName={userName}
            members={members}
            settleUp={settleUp}
          />
        </Tabs>
      </div>
      <AddExpenseDialog
        userName={userName}
        members={members?.filter((member) => member.memberName !== userName)}
        addExpense={addExpense}
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
      />
    </main>
  );
};
