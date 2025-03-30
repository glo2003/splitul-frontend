import { useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Balance, Member } from "@/lib/types";
import { SettleUpDialog } from "../dialogs/settle-up-dialog";

type BalanceTabProps = {
  userName: string;
  members?: Member[];
  settleUp: (memberToSettle: string) => void;
};

const getDebtors = (userName: string, members: Member[]): Balance[] => {
  return members
    .filter((member) => member.debts[userName] > 0)
    .map((member) => ({
      memberName: member.memberName,
      amount: member.debts[userName],
    }));
};

const getCreditors = (userName: string, members: Member[]): Balance[] => {
  const currentUser = members.find((member) => member.memberName === userName);
  if (currentUser?.debts) {
    return Object.entries(currentUser.debts)
      .filter(([, amount]) => amount > 0)
      .map(([memberName, amount]) => ({
        memberName,
        amount: -amount,
      }));
  }

  return [];
};

export const BalanceTab = ({
  userName,
  members,
  settleUp,
}: BalanceTabProps) => {
  const [isSettleUpOpen, setIsSettleUpOpen] = useState(false);
  const debtors = getDebtors(userName, members || []);
  const creditors = getCreditors(userName, members || []);
  const balances = [...debtors, ...creditors].sort((a, b) =>
    a.memberName.toLowerCase().localeCompare(b.memberName.toLowerCase()),
  );

  return (
    <TabsContent value="balances" className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Current Balances</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSettleUpOpen(true)}
        >
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
                <AvatarFallback>{balance.memberName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{balance.memberName}</p>
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
      <SettleUpDialog
        open={isSettleUpOpen}
        onOpenChange={setIsSettleUpOpen}
        creditors={creditors}
        settleUp={settleUp}
      />
    </TabsContent>
  );
};
