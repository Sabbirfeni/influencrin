"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  GraduationCap,
  Star,
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Upload,
} from "lucide-react";

import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

type Influencer = {
  id: string;
  fullname: string;
  profile_image: string;
  avg_rating_score: number | null;
  categories: { category_name: string }[];
};

export const columns: ColumnDef<Influencer>[] = [
  {
    accessorKey: "profile_image",
    header: "Profile",
    cell: ({ row }) => {
      const image = row.original.profile_image;
      const fullname = row.original.fullname;

      return (
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={`${
              import.meta.env.VITE_SERVER_BASE_URL
            }/images/uploads/influencer-profiles/${image}`}
            alt={fullname}
          />
          <AvatarFallback className="text-xs">
            {fullname
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "avg_rating_score",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Avg Rating <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const score = row.original.avg_rating_score;
      return (
        <span className="flex items-center">
          {" "}
          {score ? (
            <>
              <Star className="w-3 h-3 " fill="#0a66c2" stroke="none" /> {score}
            </>
          ) : (
            <span className="text-gray-400 text-xs">NA</span>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "categories",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.categories?.[0];
      if (!category) return <span>—</span>;

      return (
        <Badge
          key={category.id}
          variant="outline"
          className={`group flex items-center gap-1 text-xs px-3 py-1 rounded-full transition duration-300 bg-white border text-primary border-primary cursor-default`}
        >
          {category.category_name}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const handle = row.original.handle;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-4">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={`/influencers/${handle}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
