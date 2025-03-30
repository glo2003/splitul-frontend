import { Group } from "@/lib/types";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileSidebar } from "./sidebars/mobile-sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

type HeaderProps = {
  userName: string;
  groups?: Group[];
  isGroupsLoading: boolean;
  selectedGroup: string | undefined;
  setSelectedGroup: (group: string | undefined) => void;
  setIsCreateGroupOpen: (open: boolean) => void;
  setIsJoinGroupOpen: (open: boolean) => void;
};
export const Header = ({
  userName,
  groups,
  isGroupsLoading,
  selectedGroup,
  setSelectedGroup,
  setIsCreateGroupOpen,
  setIsJoinGroupOpen,
}: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 sm:max-w-none">
          <SheetTitle></SheetTitle>
          <MobileSidebar
            groups={groups}
            isLoading={isGroupsLoading}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            setIsCreateGroupOpen={setIsCreateGroupOpen}
            setIsJoinGroupOpen={setIsJoinGroupOpen}
          />
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 font-semibold"
        >
          <span className="hidden md:inline-block text-2xl">SplitUL</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end gap-1">
        <div className="text-sm font-semibold text-gray-800">
          {userName ?? ""}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{userName[0] ?? ""}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("userName");
                router.push("/");
              }}
            >
              <LogOut className="mr-2 h-4 w-4 " />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
