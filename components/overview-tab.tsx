import { ExpensesHistory } from "@/api/groups";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

type OverviewTabProps = {
  expenseHistory?: ExpensesHistory;
};

export const OverviewTab = ({ expenseHistory }: OverviewTabProps) => {
  return (
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
            expenseHistory.expenses.map((expense, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{expense.paidBy.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.purchaseDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{expense.amount}</p>
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
