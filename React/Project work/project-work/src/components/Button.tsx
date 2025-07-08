import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap justify-center   gap-2 md:flex-row">
      <Button variant={"outline"}>Button<ChevronDownIcon/></Button>
    </div>
  )
}
