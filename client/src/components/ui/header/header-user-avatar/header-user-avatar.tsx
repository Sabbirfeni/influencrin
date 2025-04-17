import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, UsersIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // make sure this path is correct
import { Link } from "react-router-dom";

function HeaderUserAvatar() {
  return (
    <div className="ml-3 md:ml-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer w-10 h-10">
            <AvatarImage sizes="4" src="/avatar.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border border-gray-200">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/my-account">
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <UsersIcon className="mr-2 h-4 w-4" />
            Manage Influencers
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderUserAvatar;
