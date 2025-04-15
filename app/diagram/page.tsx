"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Printer, Download, Plus } from "lucide-react"

import GanttChart from "./gantt"
import ResponsibilityMatrix from "./matrix"
import ProjectTimeline from "./timeline"
import DiagramFlow from "./flow"

export default function DiagramPage() {
  const [activeTab, setActiveTab] = useState<string>("flow")

  // Function to print the current view
  const printDiagram = () => {
    window.print()
  }

  // Function to export the current view
  const exportDiagram = () => {
    alert("Fonctionnalité d'exportation à implémenter")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diagramme APQP</h1>
          <p className="text-muted-foreground">
            Visualisation et suivi du processus APQP (Advanced Product Quality Planning)
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={printDiagram}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline" onClick={exportDiagram}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau processus
          </Button>
        </div>
      </div>

      <Tabs defaultValue="flow" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flow">Flux APQP</TabsTrigger>
          <TabsTrigger value="gantt">Diagramme de Gantt</TabsTrigger>
          <TabsTrigger value="matrix">Matrice de responsabilité</TabsTrigger>
          <TabsTrigger value="timeline">Chronologie</TabsTrigger>
        </TabsList>

        <TabsContent value="flow">
          <DiagramFlow />
        </TabsContent>

        <TabsContent value="gantt">
          <GanttChart />
        </TabsContent>

        <TabsContent value="matrix">
          <ResponsibilityMatrix />
        </TabsContent>

        <TabsContent value="timeline">
          <ProjectTimeline />
        </TabsContent>
      </Tabs>
    </div>
  )
}
