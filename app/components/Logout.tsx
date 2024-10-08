"use client";
import { useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LogoutProps {
  user: Session["user"];
}

const Logout = ({ user }: LogoutProps) => {
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-none">
        <Image
          src={user?.image || ""}
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full cursor-pointer w-10"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg mt-2 w-48 absolute -right-5 select-none">
        <DropdownMenuLabel className="px-4 py-2 text-gray-800 font-semibold">
          My Account
        </DropdownMenuLabel>
        <hr className="border-gray-200" />
        <DropdownMenuItem className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
          <Link
            href="/profile"
            className="block w-full text-left"
            onClick={handleItemClick}
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
          <Link
            href="/profile/applied-jobs"
            className="block w-full text-left"
            onClick={handleItemClick}
          >
            My jobs
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
          onClick={() => {
            handleItemClick();
            signOut();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Logout;
