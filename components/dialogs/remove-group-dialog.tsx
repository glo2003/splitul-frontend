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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Group } from "@/lib/types";
import { useState } from "react";

type RemoveGroupDialogProps = {
  open: boolean;
  groups: Group[];
  onOpenChange: (open: boolean) => void;
  deleteGroup: (groupName: string) => Promise<void>;
};

export function RemoveGroupDialog({
  open,
  groups,
  onOpenChange,
  deleteGroup,
}: RemoveGroupDialogProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState(false);

  const handleRemoveGroup = async () => {
    if (!selectedGroup) return;

    try {
      setIsConfirming(true);
      deleteGroup(selectedGroup);
      onOpenChange(false);
      setSelectedGroup("");
    } catch (error) {
      console.error("Failed to remove group:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Group</DialogTitle>
          <DialogDescription>
            Select a group you want to remove. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Select group</Label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select a group to remove" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.name} value={group.name}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedGroup && (
            <div className="grid gap-2">
              <Label>Confirmation</Label>
              <p className="text-sm text-destructive">
                {`Are you sure you want to remove ${selectedGroup}? This action
                cannot be undone and all group data will be permanently deleted.`}
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setSelectedGroup("");
            }}
            disabled={isConfirming}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleRemoveGroup}
            disabled={isConfirming || !selectedGroup}
          >
            {isConfirming ? "Removing..." : "Remove group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
