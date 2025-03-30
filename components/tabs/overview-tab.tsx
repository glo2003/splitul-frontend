import { ExpensesHistory, Member } from "@/api/groups";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { TabsContent } from "../ui/tabs";
import React from "react";
import { OverviewCard } from "./overview-card";
import { formatToAmount } from "@/lib/utils";

type OverviewTabProps = {
  userName: string;
  isExpenseLoading: boolean;
  expenseHistory?: ExpensesHistory;
  isMembersLoading: boolean;
  members?: Member[];
};

const getMoneyOwe = (
  members: Member[],
  username: string,
): { debtorsCount: number; moneyOwe: number } => {
  const currentUserMember = members.find(
    (member) => member.memberName === username,
  );
  if (!currentUserMember) return { debtorsCount: 0, moneyOwe: 0 };

  const moneyOwe = Object.values(currentUserMember.debts).reduce(
    (acc, amount) => acc - amount,
    0,
  );

  console.log(moneyOwe);

  const debtorsCount = Object.values(currentUserMember.debts).length;

  return { debtorsCount, moneyOwe };
};

const getMoneyOwed = (
  members: Member[],
  username: string,
): { creditorsCount: number; moneyOwed: number } => {
  const otherMembers = members.filter(
    (member) => member.memberName !== username,
  );

  const creditorsCount = otherMembers.filter(
    (member) => member.debts[username] > 0,
  ).length;

  const moneyOwed = otherMembers.reduce((total, member) => {
    const debtToUser = member.debts[username] || 0;
    return total + debtToUser;
  }, 0);

  return { creditorsCount, moneyOwed };
};

export const OverviewTab = ({
  userName,
  expenseHistory,
  isExpenseLoading,
  isMembersLoading,
  members,
}: OverviewTabProps) => {
  const { debtorsCount, moneyOwe } = getMoneyOwe(members || [], userName);
  const { creditorsCount, moneyOwed } = getMoneyOwed(members || [], userName);
  return (
    <TabsContent value="overview" className="p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <OverviewCard
          isLoading={isExpenseLoading}
          title="Total Expenses"
          amount={expenseHistory?.total}
          infotext="In this group"
          color="text-black"
        />
        <OverviewCard
          isLoading={isMembersLoading}
          title="You Owe"
          amount={moneyOwe}
          infotext={`To ${debtorsCount} people`}
          color="text-red-500"
        />
        <OverviewCard
          isLoading={isMembersLoading}
          title="You Are Owed"
          amount={moneyOwed}
          infotext={`To ${creditorsCount} people`}
          color="text-green-500"
        />
      </div>
      <div className="mt-6">
        <h3 className="mb-4 font-semibold">Expense History</h3>
        <div className="space-y-4">
          {!expenseHistory ? (
            <div className="text-muted-foreground text-center py-4">
              No expense history available
            </div>
          ) : expenseHistory.expenses.length === 0 ? (
            <div className="text-muted-foreground text-center py-4">
              No recent expenses
            </div>
          ) : (
            expenseHistory.expenses
              .sort(
                (a, b) =>
                  new Date(b.purchaseDate).getDate() -
                  new Date(a.purchaseDate).getDate(),
              )
              .map((expense, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {expense.paidBy.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.purchaseDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatToAmount(expense.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {expense.split}
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </TabsContent>
  );
};
