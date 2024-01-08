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
import { useRouter } from "next/navigation"
import { useState } from "react"

export function UploadDialog() {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File>()
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>()
    async function upload(){
        if (!file) return alert("There is no file")
        if (!name || !email || !phone) return alert("Not all fields are entered")
        setOpen(false)

        try {
            const data = new FormData()
            data.set('file', file)
            data.set('name', name)
            data.set('email', email)
            data.set('phone', phone)
      
            const res = await fetch('/api/upload', {
              method: 'POST',
              body: data
            })
            if (!res.ok) throw new Error(await res.text())
          } catch (e: any) {
            console.error(e)
          }
        router.refresh()
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">Upload cv</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload cv</DialogTitle>
          <DialogDescription>
            Add all data of the person here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              placeholder="0612345678"
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cv" className="text-right">
              CV
            </Label>
            <Input
              id="cv"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={upload}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
