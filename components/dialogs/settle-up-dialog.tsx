import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { formatToAmount } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Balance } from "@/lib/types";

type SettleUpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creditors: Balance[];
  settleUp: (memberToSettle: string) => void;
};

export function SettleUpDialog({
  open,
  creditors,
  onOpenChange,
  settleUp,
}: SettleUpDialogProps) {
  const [selectedCreditor, setSelectedCreditor] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState(false);

  const selectedAmount = creditors.find(
    (c) => c.memberName === selectedCreditor,
  )?.amount;

  const handleSettleUp = async () => {
    if (!selectedCreditor || !selectedAmount) return;

    try {
      setIsConfirming(true);
      settleUp(selectedCreditor);
      onOpenChange(false);
      setSelectedCreditor("");
    } catch (error) {
      console.error("Failed to settle up:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settle up</DialogTitle>
          <DialogDescription>
            Select a person you want to settle up with.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Select person</Label>
            <Select
              value={selectedCreditor}
              onValueChange={setSelectedCreditor}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a person to pay" />
              </SelectTrigger>
              <SelectContent>
                {creditors.map((creditor) => (
                  <SelectItem
                    key={creditor.memberName}
                    value={creditor.memberName}
                  >
                    <div className="flex justify-between items-center w-full gap-2">
                      <span>{creditor.memberName}</span>
                      <span className="text-muted-foreground">
                        {formatToAmount(Math.abs(creditor.amount))}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCreditor && selectedAmount && (
            <div className="grid gap-2">
              <Label>Confirmation</Label>
              <p className="text-sm text-muted-foreground">
                By clicking confirm, you acknowledge that you have paid{" "}
                {formatToAmount(Math.abs(selectedAmount))} to {selectedCreditor}
                .
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setSelectedCreditor("");
            }}
            disabled={isConfirming}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSettleUp}
            disabled={isConfirming || !selectedCreditor}
          >
            {isConfirming ? "Confirming..." : "Confirm payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
