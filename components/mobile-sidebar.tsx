import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, Users, Plus, Settings, LogOut, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Group } from "@/api/groups";
import { ErrorMessage } from "./error-message";
import { Skeleton } from "./ui/skeleton";

interface MobileSidebarProps {
  groups: Group[] | undefined;
  isLoading: boolean;
  setIsCreateGroupOpen: (isOpen: boolean) => void;
  setIsJoinGroupOpen: (isOpen: boolean) => void;
}

export function MobileSidebar({
  groups,
  isLoading,
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
          <Button key={group.name} variant="ghost" className="justify-start">
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
