"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Dispatch, SetStateAction } from "react";
import React from "react"

export function ShareDialog(
    {
        openShare,
        setShareOpen
    }: {
        openShare: boolean;
        setShareOpen: Dispatch<SetStateAction<boolean>>;
    }) {
    
    const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Dialog open={openShare} onOpenChange={setShareOpen}>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>Share cv</DialogTitle>
          <DialogDescription>
            Choose the date for the availability of the cv
          </DialogDescription>
        </DialogHeader>
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            />
        <DialogFooter>
          <Button type="submit">Get the link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
