"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleCreateGroup: (groupName: string) => void;
};

export function CreateGroupDialog({
  open,
  onOpenChange,
  handleCreateGroup,
}: Props) {
  const [groupName, setGroupName] = useState("");
  // const createGroupMutation = useCreateGroup();

  // const handleCreateGroup = async (e: HTMLFormElement) => {
  //   e.preventDefault();
  //   console.log("Creating group:", groupName);
  //
  //   try {
  //     await createGroupMutation.mutateAsync(groupName);
  //   } catch (error) {
  //     onError(error);
  //   }
  //   setGroupName("");
  //   onOpenChange(false);
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new group</DialogTitle>
          <DialogDescription>
            Enter a name for your new expense sharing group.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="group-name">Group name</Label>
            <Input
              id="group-name"
              placeholder="e.g., Apartment, Road Trip, Study Group"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onSubmit={() => handleCreateGroup(groupName)}
            disabled={!groupName.trim()}
          >
            Create group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
