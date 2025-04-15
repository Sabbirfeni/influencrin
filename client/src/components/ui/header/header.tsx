"use client";

import SearchBar from "@/components/search/search-bar";
import Logo from "../logo/logo";
import HeaderUserAvatar from "./header-user-avatar/header-user-avatar";
import { Button } from "../button";
import { Plus, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between shadow-sm px-2 md:px-20 py-3 md:py-4">
      <Logo />

      <SearchBar />
      {/* <HeaderUserAvatar /> */}

      {/* Desktop actions */}
      <div className="hidden md:flex items-center gap-3">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Influencer
        </Button>
        <Button>Login</Button>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="pr-0 !important">
              <Menu
                style={{ height: "20px", width: "20px" }}
                className="text-primary"
                strokeWidth={2.5}
              />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px] px-4 py-6">
            <div className="flex flex-col gap-3 mt-8">
              <Button variant="default" onClick={() => setOpen(false)}>
                Add Influencer
              </Button>

              <Button onClick={() => setOpen(false)}>Login</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Header;
