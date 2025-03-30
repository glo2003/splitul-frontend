import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Group } from "@/lib/types";
import { ArrowRight, LogOut, Plus, Settings, Users } from "lucide-react";
import Link from "next/link";
import { ErrorMessage } from "./error-message";

interface MobileSidebarProps {
  groups: Group[] | undefined;
  isLoading: boolean;
  selectedGroup: string | undefined;
  setSelectedGroup: (group: string | undefined) => void;
  setIsCreateGroupOpen: (isOpen: boolean) => void;
  setIsJoinGroupOpen: (isOpen: boolean) => void;
}

export function MobileSidebar({
  groups,
  isLoading,
  selectedGroup,
  setSelectedGroup,
  setIsCreateGroupOpen,
  setIsJoinGroupOpen,
}: MobileSidebarProps) {
  const renderGroups = (groups: Group[] | undefined) => {
    if (!groups) {
      return <ErrorMessage />;
    }

    return (
      <>
        {groups.map((group) => (
          <Button
            key={group.name}
            variant={selectedGroup === group.name ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => setSelectedGroup(group.name)}
          >
            <Users className="mr-2 h-5 w-5" />
            {group.name}
          </Button>
        ))}
        <Button
          variant="ghost"
          className="justify-start text-primary"
          onClick={() => setIsJoinGroupOpen(true)}
        >
          <ArrowRight className="mr-2 h-5 w-5" />
          Join A Group
        </Button>
        <Button
          variant="ghost"
          className="justify-start text-primary"
          onClick={() => setIsCreateGroupOpen(true)}
        >
          <Plus className="mr-2 h-5 w-5" />
          Create New Group
        </Button>
      </>
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex h-12 items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 font-semibold text-2xl"
          >
            SplitUL
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="px-2 text-sm font-medium text-muted-foreground">
            My Groups
          </h3>
          {isLoading ? (
            <>
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
            </>
          ) : (
            renderGroups(groups)
          )}
        </div>
        <div className="mt-auto">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          <Button variant="outline" className="mt-2 w-full justify-start">
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
