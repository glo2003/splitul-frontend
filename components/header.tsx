import { Group } from "@/lib/types";
import { LogOut } from "lucide-react";
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

type HeaderProps = {
  userName: string;
  groups?: Group[];
  isGroupsLoading: boolean;
  selectedGroup: string | undefined;
  setSelectedGroup: (group: string | undefined) => void;
  setIsCreateGroupOpen: (open: boolean) => void;
  setIsJoinGroupOpen: (open: boolean) => void;
  setIsDeleteGroupOpen: (open: boolean) => void;
};
export const Header = ({
  userName,
  groups,
  isGroupsLoading,
  selectedGroup,
  setSelectedGroup,
  setIsCreateGroupOpen,
  setIsJoinGroupOpen,
  setIsDeleteGroupOpen,
}: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <MobileSidebar
        groups={groups}
        isLoading={isGroupsLoading}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        setIsCreateGroupOpen={setIsCreateGroupOpen}
        setIsJoinGroupOpen={setIsJoinGroupOpen}
        setIsDeleteGroupOpen={setIsDeleteGroupOpen}
      />
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
