import { Home, Users, ArrowRight, Plus, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorMessage } from "./error-message";
import { Separator } from "@/components/ui/separator";
import { Group } from "@/lib/types";

type DesktopSidebarProps = {
  groups: Group[] | undefined;
  isLoading: boolean;
  selectedGroup: string | undefined;
  setSelectedGroup: (group: string | undefined) => void;
  setIsCreateGroupOpen: (isOpen: boolean) => void;
  setIsJoinGroupOpen: (isOpen: boolean) => void;
  setIsDeleteGroupOpen: (isOpen: boolean) => void;
};

export function DesktopSidebar({
  groups,
  isLoading,
  selectedGroup,
  setSelectedGroup,
  setIsCreateGroupOpen,
  setIsJoinGroupOpen,
  setIsDeleteGroupOpen,
}: DesktopSidebarProps) {
  if (isLoading) {
    return (
      <aside className="hidden border-r md:block">
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex h-12 items-center gap-2 px-2 font-semibold">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="px-2 text-sm font-medium text-muted-foreground">
              My Groups
            </h3>
            <>
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
            </>
          </div>
          <div className="mt-auto">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
        </div>
      </aside>
    );
  }

  if (!groups) {
    return (
      <aside className="hidden border-r md:block">
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex h-12 items-center gap-2 px-2 font-semibold">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="px-2 text-sm font-medium text-muted-foreground">
              My Groups
            </h3>
            <ErrorMessage />
          </div>
          <div className="mt-auto">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden border-r md:block">
      <div className="flex h-full flex-col gap-2 p-4 content-between">
        <div>
          <div className="flex h-12 items-center gap-2 px-2 font-semibold">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="px-2 text-sm font-medium text-muted-foreground">
              My Groups
            </h3>
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
            <Separator />
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
          </div>
        </div>
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setIsDeleteGroupOpen(true)}
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Delete
          </Button>
        </div>
      </div>
    </aside>
  );
}
