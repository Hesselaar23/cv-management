"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { deleteEntryById } from "@/lib/databaseUtils";
import { Entry } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

  async function deleteEntry(entry: Entry) {
    const id = entry.id;
    await deleteEntryById(id)
  }

  export function DeleteAlertDialog(
    {
      open, 
      setOpen, 
      entry
    }: {
      open: boolean; 
      setOpen :Dispatch<SetStateAction<boolean>>;
      entry: Entry 
    }) {
    const router = useRouter();
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              the data from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async() => {
                await deleteEntry(entry)
                router.refresh()
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  