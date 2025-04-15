import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function PhaseProgress() {
  const phases = [
    { name: "Phase 1: Plan & Define", progress: 100 },
    { name: "Phase 2: Conception Produit", progress: 85 },
    { name: "Phase 3: Conception Process", progress: 60 },
    { name: "Phase 4: Validation", progress: 25 },
    { name: "Phase 5: Feedback", progress: 0 },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Avancement par phase APQP</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{phase.name}</div>
                <div className="text-sm text-muted-foreground">{phase.progress}%</div>
              </div>
              <Progress value={phase.progress} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
