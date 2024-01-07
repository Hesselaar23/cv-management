export type Entry = {
    id: string
    name: string
    email: string
    phone: string
    file: string
    status: "waiting" | "shared" | "opened" | "withdrawn"  
    created: Date
  }