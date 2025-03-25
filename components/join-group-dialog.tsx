"use client";

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

import { useGroups } from "@/hooks/groups";
import { Group } from "@/api/groups";

// const availableGroups = [
//   {
//     id: "g1",
//     name: "Campus Housing",
//     description: "For students living in the north campus dorms",
//     members: 8,
//     avatar: "/placeholder.svg?height=40&width=40&text=CH",
//   },
//   {
//     id: "g2",
//     name: "CS Study Group",
//     description: "Split costs for study materials and snacks",
//     members: 12,
//     avatar: "/placeholder.svg?height=40&width=40&text=CS",
//   },
//   {
//     id: "g3",
//     name: "Basketball Team",
//     description: "Team expenses and tournament fees",
//     members: 15,
//     avatar: "/placeholder.svg?height=40&width=40&text=BT",
//   },
//   {
//     id: "g4",
//     name: "Road Trip 2024",
//     description: "Summer road trip expenses",
//     members: 6,
//     avatar: "/placeholder.svg?height=40&width=40&text=RT",
//   },
//   {
//     id: "g5",
//     name: "Film Club",
//     description: "Equipment rentals and event costs",
//     members: 20,
//     avatar: "/placeholder.svg?height=40&width=40&text=FC",
//   },
//   {
//     id: "g6",
//     name: "Apartment 4B",
//     description: "Shared apartment expenses",
//     members: 4,
//     avatar: "/placeholder.svg?height=40&width=40&text=4B",
//   },
//   {
//     id: "g7",
//     name: "Graduation Party",
//     description: "Planning the end of year celebration",
//     members: 25,
//     avatar: "/placeholder.svg?height=40&width=40&text=GP",
//   },
// ];

interface JoinGroupDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function JoinGroupDialog({ open, onOpenChange }: JoinGroupDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [joiningGroup, setJoiningGroup] = useState("");

  const { data: groups, isLoading: isGroupsLoading } = useGroups();
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

  const handleJoinGroup = (groupName: string) => {
    setJoiningGroup(groupName);
    setTimeout(() => {
      onOpenChange(false);
    }, 1000);
  };

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
                    onClick={() => handleJoinGroup(group.name)}
                    disabled={joiningGroup === group.name}
                  >
                    {joiningGroup === group.name ? "Joining..." : "Join"}
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
