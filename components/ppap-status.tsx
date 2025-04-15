import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock } from "lucide-react"

export function PpapStatus() {
  const ppapElements = [
    { name: "Design Records", status: "completed" },
    { name: "Engineering Change Documents", status: "completed" },
    { name: "Customer Engineering Approval", status: "pending" },
    { name: "Design FMEA", status: "completed" },
    { name: "Process Flow Diagram", status: "completed" },
    { name: "Process FMEA", status: "completed" },
    { name: "Control Plan", status: "pending" },
    { name: "MSA Studies", status: "pending" },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Statut PPAP</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ppapElements.map((element) => (
            <div key={element.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {element.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
                <span className="text-sm">{element.name}</span>
              </div>
              <span className="text-xs font-medium capitalize text-muted-foreground">{element.status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
