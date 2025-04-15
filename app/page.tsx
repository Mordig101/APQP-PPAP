import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectList } from "@/components/project-list"
import { KpiCards } from "@/components/kpi-cards"
import { PhaseProgress } from "@/components/phase-progress"
import { PpapStatus } from "@/components/ppap-status"
import { QualityAlerts } from "@/components/quality-alerts"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Tous les projets</TabsTrigger>
              <TabsTrigger value="active">Projets actifs</TabsTrigger>
              <TabsTrigger value="completed">Projets terminés</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <KpiCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PhaseProgress />
        <PpapStatus />
        <QualityAlerts />
      </div>

      <ProjectList />
    </div>
  )
}
