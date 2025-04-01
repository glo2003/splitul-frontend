import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Group } from "@/lib/types";

interface JoinGroupDialogProps {
  open: boolean;
  groups: Group[] | undefined;
  onOpenChange: (isOpen: boolean) => void;
  handleJoinGroup: (groupName: string) => void;
}

export function JoinGroupDialog({
  open,
  groups,
  onOpenChange,
  handleJoinGroup,
}: JoinGroupDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (groups) {
      if (searchQuery) {
        const filteredGroups = groups.filter((group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredGroups(filteredGroups);
      } else {
        setFilteredGroups(groups);
      }
    }
  }, [groups, searchQuery]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Join a group</DialogTitle>
          <DialogDescription>
            Browse available groups or search for a specific group to join.
          </DialogDescription>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => (
                <div
                  key={group.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {group.members.length} members
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      onOpenChange(false);
                      handleJoinGroup(group.name);
                    }}
                  >
                    Join
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex h-[200px] items-center justify-center">
                <p className="text-center text-muted-foreground">
                  No groups found matching your search.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
