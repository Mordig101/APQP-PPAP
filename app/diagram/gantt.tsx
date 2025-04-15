"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Download,
  Filter,
  Search,
  Share2,
  Printer,
  ZoomIn,
  ZoomOut,
  Settings,
  Save,
  Eye,
  CalendarIcon,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Import the mock data from the main diagram page
import { apqpPhases, teamMembers, projects } from "./data"

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500"
    case "in-progress":
      return "bg-blue-500"
    case "not-started":
      return "bg-gray-300"
    case "overdue":
      return "bg-red-500"
    default:
      return "bg-gray-300"
  }
}

// Helper function to get status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "in-progress":
      return <Clock className="h-4 w-4 text-blue-500" />
    case "not-started":
      return <AlertCircle className="h-4 w-4 text-gray-400" />
    case "overdue":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <Info className="h-4 w-4 text-gray-400" />
  }
}

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Calculate the earliest and latest dates in the project
const calculateDateRange = () => {
  let earliestDate = new Date()
  let latestDate = new Date("2000-01-01")

  apqpPhases.forEach((phase) => {
    const phaseStartDate = new Date(phase.startDate)
    const phaseDueDate = new Date(phase.dueDate)

    if (phaseStartDate < earliestDate) earliestDate = phaseStartDate
    if (phaseDueDate > latestDate) latestDate = phaseDueDate

    phase.subprocesses.forEach((subprocess) => {
      if (subprocess.startDate) {
        const subprocessStartDate = new Date(subprocess.startDate)
        if (subprocessStartDate < earliestDate) earliestDate = subprocessStartDate
      }
      if (subprocess.dueDate) {
        const subprocessDueDate = new Date(subprocess.dueDate)
        if (subprocessDueDate > latestDate) latestDate = subprocessDueDate
      }
    })
  })

  // Add buffer to the date range
  earliestDate.setDate(earliestDate.getDate() - 15)
  latestDate.setDate(latestDate.getDate() + 15)

  return { earliestDate, latestDate }
}

const { earliestDate, latestDate } = calculateDateRange()

// Generate months for the timeline
const generateMonths = () => {
  const months = []
  const currentDate = new Date(earliestDate)

  while (currentDate <= latestDate) {
    months.push(new Date(currentDate))
    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  return months
}

const months = generateMonths()

// Calculate the total duration in days
const totalDurationDays = Math.ceil((latestDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24))

// Calculate position percentage based on date
const calculatePosition = (date: string) => {
  const targetDate = new Date(date)
  const daysFromStart = Math.ceil((targetDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24))
  return (daysFromStart / totalDurationDays) * 100
}

// Calculate width percentage based on start and end dates
const calculateWidth = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const durationDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return (durationDays / totalDurationDays) * 100
}

export default function GanttChart() {
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [filterPhase, setFilterPhase] = useState<string>("all")
  const [filterMember, setFilterMember] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterProject, setFilterProject] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showCompleted, setShowCompleted] = useState<boolean>(true)
  const [showMilestones, setShowMilestones] = useState<boolean>(true)
  const [showDependencies, setShowDependencies] = useState<boolean>(true)
  const [showCriticalPath, setShowCriticalPath] = useState<boolean>(false)
  const [showToday, setShowToday] = useState<boolean>(true)
  const [selectedTask, setSelectedTask] = useState<number | null>(null)
  const ganttRef = useRef<HTMLDivElement>(null)

  // Filter phases and subprocesses based on selected filters and search query
  const filteredPhases = apqpPhases
    .filter((phase) => {
      // Filter by phase
      if (filterPhase !== "all" && phase.id.toString() !== filterPhase) {
        return false
      }

      // Filter by search query
      if (searchQuery && !phase.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        // Check if any subprocess matches the search query
        const hasMatchingSubprocess = phase.subprocesses.some((subprocess) =>
          subprocess.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        if (!hasMatchingSubprocess) {
          return false
        }
      }

      // If filtering by member, status, project, or department, check if any subprocess matches
      if (filterMember !== "all" || filterStatus !== "all" || !showCompleted) {
        const hasMatchingSubprocess = phase.subprocesses.some((subprocess) => {
          const memberMatch = filterMember === "all" || subprocess.owner.id.toString() === filterMember
          const statusMatch = filterStatus === "all" || subprocess.status === filterStatus
          const completedMatch = showCompleted || subprocess.status !== "completed"
          return memberMatch && statusMatch && completedMatch
        })
        return hasMatchingSubprocess
      }

      return true
    })
    .map((phase) => ({
      ...phase,
      subprocesses: phase.subprocesses.filter((subprocess) => {
        // Apply member filter
        if (filterMember !== "all" && subprocess.owner.id.toString() !== filterMember) {
          return false
        }
        // Apply status filter
        if (filterStatus !== "all" && subprocess.status !== filterStatus) {
          return false
        }
        // Apply completed filter
        if (!showCompleted && subprocess.status === "completed") {
          return false
        }
        // Apply search query
        if (searchQuery && !subprocess.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false
        }
        return true
      }),
    }))

  // Function to handle zoom in
  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 25, 200))
  }

  // Function to handle zoom out
  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 25, 50))
  }

  // Function to reset zoom
  const handleResetZoom = () => {
    setZoomLevel(100)
  }

  // Function to export the Gantt chart
  const exportGantt = () => {
    alert("Fonctionnalité d'exportation à implémenter")
  }

  // Function to print the Gantt chart
  const printGantt = () => {
    window.print()
  }

  // Function to get task details
  const getTaskDetails = (taskId: number) => {
    // Find the task in phases or subprocesses
    for (const phase of apqpPhases) {
      if (phase.id === taskId) {
        return {
          id: phase.id,
          name: phase.name,
          status: phase.status,
          progress: phase.progress,
          startDate: phase.startDate,
          dueDate: phase.dueDate,
          owner: phase.owner,
          description: phase.description,
          isPhase: true,
        }
      }

      for (const subprocess of phase.subprocesses) {
        if (subprocess.id === taskId) {
          return {
            id: subprocess.id,
            name: subprocess.name,
            status: subprocess.status,
            progress: subprocess.progress,
            startDate: subprocess.startDate,
            dueDate: subprocess.dueDate,
            owner: subprocess.owner,
            description: subprocess.description,
            isPhase: false,
            phaseId: phase.id,
            phaseName: phase.name,
          }
        }
      }
    }
    return null
  }

  // Calculate today's position
  const today = new Date()
  const todayPosition = calculatePosition(today.toISOString())

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Diagramme de Gantt</CardTitle>
              <CardDescription>Visualisation temporelle des phases et processus APQP</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={printGantt}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <Button variant="outline" size="sm" onClick={exportGantt}>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Options
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="p-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox id="show-completed" checked={showCompleted} onCheckedChange={setShowCompleted} />
                      <Label htmlFor="show-completed">Afficher les tâches terminées</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox id="show-milestones" checked={showMilestones} onCheckedChange={setShowMilestones} />
                      <Label htmlFor="show-milestones">Afficher les jalons</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="show-dependencies"
                        checked={showDependencies}
                        onCheckedChange={setShowDependencies}
                      />
                      <Label htmlFor="show-dependencies">Afficher les dépendances</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox id="show-critical" checked={showCriticalPath} onCheckedChange={setShowCriticalPath} />
                      <Label htmlFor="show-critical">Afficher le chemin critique</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-today" checked={showToday} onCheckedChange={setShowToday} />
                      <Label htmlFor="show-today">Afficher la ligne d'aujourd'hui</Label>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="flex flex-col space-y-4">
            {/* Search and filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une tâche..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtres
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filtres</h4>
                        <p className="text-sm text-muted-foreground">Filtrer les tâches selon différents critères</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="filter-phase" className="text-right">
                            Phase
                          </Label>
                          <Select value={filterPhase} onValueChange={setFilterPhase} className="col-span-3">
                            <SelectTrigger id="filter-phase">
                              <SelectValue placeholder="Toutes les phases" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Toutes les phases</SelectItem>
                              {apqpPhases.map((phase) => (
                                <SelectItem key={phase.id} value={phase.id.toString()}>
                                  Phase {phase.id}: {phase.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="filter-member" className="text-right">
                            Membre
                          </Label>
                          <Select value={filterMember} onValueChange={setFilterMember} className="col-span-3">
                            <SelectTrigger id="filter-member">
                              <SelectValue placeholder="Tous les membres" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous les membres</SelectItem>
                              {teamMembers.map((member) => (
                                <SelectItem key={member.id} value={member.id.toString()}>
                                  {member.name} ({member.role})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="filter-status" className="text-right">
                            Statut
                          </Label>
                          <Select value={filterStatus} onValueChange={setFilterStatus} className="col-span-3">
                            <SelectTrigger id="filter-status">
                              <SelectValue placeholder="Tous les statuts" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous les statuts</SelectItem>
                              <SelectItem value="completed">Terminé</SelectItem>
                              <SelectItem value="in-progress">En cours</SelectItem>
                              <SelectItem value="not-started">Non démarré</SelectItem>
                              <SelectItem value="overdue">En retard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="filter-project" className="text-right">
                            Projet
                          </Label>
                          <Select value={filterProject} onValueChange={setFilterProject} className="col-span-3">
                            <SelectTrigger id="filter-project">
                              <SelectValue placeholder="Tous les projets" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous les projets</SelectItem>
                              {projects.map((project) => (
                                <SelectItem key={project.id} value={project.id.toString()}>
                                  {project.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Zoom controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="w-32 flex items-center space-x-2">
                  <Slider
                    value={[zoomLevel]}
                    min={50}
                    max={200}
                    step={25}
                    onValueChange={(value) => setZoomLevel(value[0])}
                  />
                  <span className="text-xs">{zoomLevel}%</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleResetZoom}>
                  Réinitialiser
                </Button>
              </div>

              {/* Legend */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>Terminé</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>En cours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                  <span>Non démarré</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>En retard</span>
                </div>
                {showCriticalPath && (
                  <div className="flex items-center">
                    <div className="w-3 h-3 border-2 border-yellow-500 mr-1"></div>
                    <span>Chemin critique</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <div className="p-6">
          <div className="border rounded-md" ref={ganttRef}>
            {/* Timeline header */}
            <div className="flex border-b">
              <div className="w-64 min-w-64 border-r p-2 bg-gray-50 font-medium">Tâche</div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex" style={{ width: `${zoomLevel}%`, minWidth: "100%" }}>
                  {months.map((month, index) => (
                    <div
                      key={index}
                      className="border-r p-2 bg-gray-50 font-medium text-center"
                      style={{ width: `${100 / months.length}%` }}
                    >
                      {month.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gantt content */}
            <ScrollArea className="h-[500px]">
              <div className="relative">
                {/* Today line */}
                {showToday && (
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                    style={{ left: `calc(${todayPosition}% + 256px)` }}
                  ></div>
                )}

                {/* Phases and tasks */}
                {filteredPhases.map((phase) => (
                  <div key={phase.id}>
                    {/* Phase row */}
                    <div
                      className={`flex border-b hover:bg-gray-50 ${selectedTask === phase.id ? "bg-blue-50" : ""}`}
                      onClick={() => setSelectedTask(phase.id)}
                    >
                      <div className="w-64 min-w-64 border-r p-2 font-medium flex items-center">
                        <div className="mr-2">{getStatusIcon(phase.status)}</div>
                        <div>
                          <div className="flex items-center">
                            <span>
                              Phase {phase.id}: {phase.name}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center mt-1">
                            <Avatar className="h-4 w-4 mr-1">
                              <AvatarFallback className="text-[8px]">{phase.owner.initials}</AvatarFallback>
                            </Avatar>
                            <span>{phase.owner.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 relative" style={{ width: `${zoomLevel}%`, minWidth: "100%" }}>
                        {/* Phase bar */}
                        <div
                          className={`absolute h-6 rounded-md mt-2 ${getStatusColor(phase.status)} opacity-80`}
                          style={{
                            left: `${calculatePosition(phase.startDate)}%`,
                            width: `${calculateWidth(phase.startDate, phase.dueDate)}%`,
                          }}
                        >
                          <div className="h-full flex items-center justify-center text-white text-xs font-medium">
                            {phase.progress}%
                          </div>
                        </div>

                        {/* Phase dates */}
                        <div
                          className="absolute text-xs -mt-3"
                          style={{ left: `${calculatePosition(phase.startDate)}%` }}
                        >
                          {formatDate(phase.startDate)}
                        </div>
                        <div
                          className="absolute text-xs -mt-3"
                          style={{ left: `${calculatePosition(phase.dueDate)}%` }}
                        >
                          {formatDate(phase.dueDate)}
                        </div>
                      </div>
                    </div>

                    {/* Subprocess rows */}
                    {phase.subprocesses.map((subprocess) => (
                      <div
                        key={subprocess.id}
                        className={`flex border-b hover:bg-gray-50 ${
                          selectedTask === subprocess.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedTask(subprocess.id)}
                      >
                        <div className="w-64 min-w-64 border-r p-2 pl-6 flex items-center">
                          <div className="mr-2">{getStatusIcon(subprocess.status)}</div>
                          <div>
                            <div>{subprocess.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Avatar className="h-4 w-4 mr-1">
                                <AvatarFallback className="text-[8px]">{subprocess.owner.initials}</AvatarFallback>
                              </Avatar>
                              <span>{subprocess.owner.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 relative" style={{ width: `${zoomLevel}%`, minWidth: "100%" }}>
                          {/* Subprocess bar */}
                          {subprocess.startDate && subprocess.dueDate && (
                            <div
                              className={`absolute h-5 rounded-sm mt-2 ${getStatusColor(subprocess.status)} ${
                                showCriticalPath && subprocess.id % 5 === 0 ? "border-2 border-yellow-500" : ""
                              }`}
                              style={{
                                left: `${calculatePosition(subprocess.startDate)}%`,
                                width: `${calculateWidth(subprocess.startDate, subprocess.dueDate)}%`,
                              }}
                            >
                              <div className="h-full flex items-center justify-center text-white text-xs">
                                {subprocess.progress}%
                              </div>
                            </div>
                          )}

                          {/* Dependencies */}
                          {showDependencies && subprocess.id % 3 === 0 && subprocess.id > 200 && (
                            <svg
                              className="absolute top-0 h-full w-full pointer-events-none"
                              style={{ left: 0, top: 0 }}
                            >
                              <path
                                d={`M${calculatePosition(subprocess.startDate)}%,12 C${
                                  calculatePosition(subprocess.startDate) - 10
                                }%,-20 ${calculatePosition(subprocess.startDate) - 20}%,-20 ${
                                  calculatePosition(subprocess.startDate) - 30
                                }%,12`}
                                stroke="#888"
                                strokeWidth="1"
                                fill="none"
                                strokeDasharray="4,2"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Task details panel */}
          {selectedTask && (
            <div className="mt-4 border rounded-md p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">Détails de la tâche</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTask(null)}>
                  ✕
                </Button>
              </div>

              {(() => {
                const task = getTaskDetails(selectedTask)
                if (!task) return null

                return (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{task.isPhase ? `Phase ${task.id}: ${task.name}` : task.name}</h4>
                        {!task.isPhase && (
                          <p className="text-sm text-muted-foreground">
                            Phase {task.phaseId}: {task.phaseName}
                          </p>
                        )}
                      </div>
                      <Badge
                        className={
                          task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : task.status === "overdue"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {task.status === "completed"
                          ? "Terminé"
                          : task.status === "in-progress"
                            ? "En cours"
                            : task.status === "overdue"
                              ? "En retard"
                              : "Non démarré"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Responsable</p>
                        <div className="flex items-center mt-1">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback>{task.owner.initials}</AvatarFallback>
                          </Avatar>
                          <span>{task.owner.name}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Progression</p>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className={`h-2.5 rounded-full ${getStatusColor(task.status)}`}
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{task.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Date de début</p>
                        <div className="flex items-center mt-1">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{formatDate(task.startDate)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date d'échéance</p>
                        <div className="flex items-center mt-1">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                      </div>
                    </div>

                    {task.description && (
                      <div>
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="mt-1">{task.description}</p>
                      </div>
                    )}

                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir les détails
                      </Button>
                      <Button size="sm" variant="outline">
                        <Save className="h-4 w-4 mr-1" />
                        Mettre à jour
                      </Button>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </div>

        <CardFooter className="flex justify-between border-t p-6">
          <div className="text-sm text-muted-foreground">
            <p>Dernière mise à jour: 15 avril 2023</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Partager
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-1" />
              Exporter
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
