import { Home, Users, ArrowRight, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Group } from "@/api/groups";
import { Skeleton } from "./ui/skeleton";
import { ErrorMessage } from "./error-message";

interface DesktopSidebarProps {
  groups: Group[] | undefined;
  isLoading: boolean;
  selectedGroup: string | null;
  setSelectedGroup: (group: string) => void;
  setIsCreateGroupOpen: (isOpen: boolean) => void;
  setIsJoinGroupOpen: (isOpen: boolean) => void;
}

export function DesktopSidebar({
  groups,
  isLoading,
  selectedGroup,
  setSelectedGroup,
  setIsCreateGroupOpen,
  setIsJoinGroupOpen,
}: DesktopSidebarProps) {
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
          Join Group
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
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex h-12 items-center gap-2 px-2 font-semibold">
        <Home className="h-5 w-5" />
        <span>Dashboard</span>
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
      </div>
    </div>
  );
}
