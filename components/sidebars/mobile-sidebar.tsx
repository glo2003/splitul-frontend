import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Group } from "@/lib/types";
import { ArrowRight, Menu, Plus, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { ErrorMessage } from "./error-message";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

interface MobileSidebarProps {
  groups: Group[] | undefined;
  isLoading: boolean;
  selectedGroup: string | undefined;
  setSelectedGroup: (group: string | undefined) => void;
  setIsCreateGroupOpen: (isOpen: boolean) => void;
  setIsJoinGroupOpen: (isOpen: boolean) => void;
  setIsDeleteGroupOpen: (isOpen: boolean) => void;
}

export function MobileSidebar({
  groups,
  isLoading,
  selectedGroup,
  setSelectedGroup,
  setIsCreateGroupOpen,
  setIsJoinGroupOpen,
  setIsDeleteGroupOpen,
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 sm:max-w-none">
        <SheetTitle></SheetTitle>
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
              <Separator />
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
