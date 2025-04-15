import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users } from "lucide-react"

export function ProjectList() {
  const projects = [
    {
      id: "PRJ-001",
      name: "Composant A-123",
      client: "Automotive Corp",
      phase: "Phase 2",
      progress: 45,
      ppapStatus: "En cours",
      team: 5,
      dueDate: "15/05/2023",
    },
    {
      id: "PRJ-002",
      name: "Système B-456",
      client: "Aero Industries",
      phase: "Phase 3",
      progress: 72,
      ppapStatus: "En attente",
      team: 8,
      dueDate: "22/06/2023",
    },
    {
      id: "PRJ-003",
      name: "Module C-789",
      client: "Medical Devices Inc",
      phase: "Phase 1",
      progress: 20,
      ppapStatus: "Non démarré",
      team: 4,
      dueDate: "10/07/2023",
    },
    {
      id: "PRJ-004",
      name: "Assemblage D-012",
      client: "Automotive Corp",
      phase: "Phase 4",
      progress: 90,
      ppapStatus: "Validé",
      team: 6,
      dueDate: "05/05/2023",
    },
    {
      id: "PRJ-005",
      name: "Composant E-345",
      client: "Electronics Ltd",
      phase: "Phase 2",
      progress: 55,
      ppapStatus: "En cours",
      team: 3,
      dueDate: "30/05/2023",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projets actifs</CardTitle>
        <Button variant="outline" size="sm">
          Voir tous les projets
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projet</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead>Progression</TableHead>
              <TableHead>Statut PPAP</TableHead>
              <TableHead>Équipe</TableHead>
              <TableHead>Échéance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>
                  <Badge variant="outline">{project.phase}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="w-[80px]" />
                    <span className="text-xs">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.ppapStatus === "Validé"
                        ? "success"
                        : project.ppapStatus === "Non démarré"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {project.ppapStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{project.team}</span>
                  </div>
                </TableCell>
                <TableCell>{project.dueDate}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
