"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Download,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Info,
  Search,
  Filter,
  GitBranch,
  FileText,
  CalendarIcon,
  BarChart,
  Settings,
  Printer,
  Share2,
  Plus,
  ArrowUpRight,
  ArrowRight,
  Pencil,
  Eye,
  Trash2,
  MoreHorizontal,
  User,
  Users,
  Layers,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the mock data from the data file
import { apqpPhases, teamMembers, projects, departments } from "./data"

export default function DiagramFlow() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null)
  const [selectedSubprocess, setSelectedSubprocess] = useState<number | null>(null)
  const [expandedPhases, setExpandedPhases] = useState<number[]>([])
  const [filterPhase, setFilterPhase] = useState<string>("all")
  const [filterMember, setFilterMember] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterProject, setFilterProject] = useState<string>("all")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showCompleted, setShowCompleted] = useState<boolean>(true)
  const [viewMode, setViewMode] = useState<string>("detailed")
  const [showDependencies, setShowDependencies] = useState<boolean>(false)
  const [showCriticalPath, setShowCriticalPath] = useState<boolean>(false)
  const [myTasksTab, setMyTasksTab] = useState<string>("assigned")
  const diagramRef = useRef<HTMLDivElement>(null)

  // Initialize with first phase expanded
  useEffect(() => {
    setExpandedPhases([1])
  }, [])

  // Toggle phase expansion
  const togglePhaseExpansion = (phaseId: number) => {
    if (expandedPhases.includes(phaseId)) {
      setExpandedPhases(expandedPhases.filter((id) => id !== phaseId))
    } else {
      setExpandedPhases([...expandedPhases, phaseId])
    }
  }

  // Expand all phases
  const expandAllPhases = () => {
    setExpandedPhases(apqpPhases.map((phase) => phase.id))
  }

  // Collapse all phases
  const collapseAllPhases = () => {
    setExpandedPhases([])
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Terminé</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>
      case "not-started":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Non démarré</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">En retard</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "not-started":
        return <AlertCircle className="h-5 w-5 text-gray-400" />
      case "overdue":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-gray-400" />
    }
  }

  // Get document icon
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "excel":
        return <FileText className="h-4 w-4 text-green-500" />
      case "word":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "powerpoint":
        return <FileText className="h-4 w-4 text-orange-500" />
      case "visio":
        return <GitBranch className="h-4 w-4 text-purple-500" />
      case "cad":
        return <FileText className="h-4 w-4 text-orange-500" />
      case "zip":
        return <FileText className="h-4 w-4 text-gray-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

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

  // Get subprocess details
  const getSubprocessDetails = () => {
    if (!selectedSubprocess) return null

    let subprocess = null
    let parentPhase = null
    for (const phase of apqpPhases) {
      const found = phase.subprocesses.find((sp) => sp.id === selectedSubprocess)
      if (found) {
        subprocess = found
        parentPhase = phase
        break
      }
    }

    if (!subprocess || !parentPhase) return null

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{subprocess.name}</h3>
            <p className="text-sm text-muted-foreground">
              Phase {parentPhase.id}: {parentPhase.name}
            </p>
          </div>
          {getStatusBadge(subprocess.status)}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Responsable</p>
            <div className="flex items-center mt-1">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarFallback>{subprocess.owner.initials}</AvatarFallback>
              </Avatar>
              <span>{subprocess.owner.name}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Progression</p>
            <div className="flex items-center mt-1">
              <Progress value={subprocess.progress} className="h-2 mr-2" />
              <span className="text-sm">{subprocess.progress}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Date de début</p>
            <div className="flex items-center mt-1">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{subprocess.startDate ? new Date(subprocess.startDate).toLocaleDateString() : "Non définie"}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date d'échéance</p>
            <div className="flex items-center mt-1">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{subprocess.dueDate ? new Date(subprocess.dueDate).toLocaleDateString() : "Non définie"}</span>
            </div>
          </div>
        </div>

        {subprocess.description && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{subprocess.description}</p>
          </div>
        )}

        {subprocess.documents && subprocess.documents.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Documents associés</h4>
            <ul className="text-sm space-y-2">
              {subprocess.documents.map((doc) => (
                <li key={doc.id} className="flex items-center">
                  {getDocumentIcon(doc.type)}
                  <span className="ml-2 text-blue-500 underline cursor-pointer">{doc.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{new Date(doc.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {subprocess.comments && subprocess.comments.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Commentaires</h4>
            <div className="space-y-2">
              {subprocess.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-2 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">
              <Pencil className="h-4 w-4 mr-1" />
              Mettre à jour le statut
            </Button>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Ajouter un document
            </Button>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              Voir les détails complets
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    )
  }

  // Get phase details
  const getPhaseDetails = () => {
    if (!selectedPhase) return null

    const phase = apqpPhases.find((p) => p.id === selectedPhase)
    if (!phase) return null

    const completedSubprocesses = phase.subprocesses.filter((sp) => sp.status === "completed").length
    const inProgressSubprocesses = phase.subprocesses.filter((sp) => sp.status === "in-progress").length
    const notStartedSubprocesses = phase.subprocesses.filter((sp) => sp.status === "not-started").length
    const totalSubprocesses = phase.subprocesses.length

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{phase.name}</h3>
            <p className="text-sm text-muted-foreground">Phase {phase.id} du processus APQP</p>
          </div>
          {getStatusBadge(phase.status)}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Responsable</p>
            <div className="flex items-center mt-1">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={phase.owner.avatar || "/placeholder.svg"} alt={phase.owner.name} />
                <AvatarFallback>{phase.owner.initials}</AvatarFallback>
              </Avatar>
              <div>
                <span>{phase.owner.name}</span>
                <p className="text-xs text-muted-foreground">{phase.owner.role}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Contact</p>
            <div className="text-sm mt-1">
              <p>{phase.owner.email}</p>
              <p>{phase.owner.phone}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Date de début</p>
            <div className="flex items-center mt-1">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{new Date(phase.startDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date d'échéance</p>
            <div className="flex items-center mt-1">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{new Date(phase.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Progression globale</p>
          <div className="flex items-center mt-1">
            <Progress value={phase.progress} className="h-2 mr-2" />
            <span className="text-sm">{phase.progress}%</span>
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              Terminés: {completedSubprocesses}
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
              En cours: {inProgressSubprocesses}
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
              Non démarrés: {notStartedSubprocesses}
            </span>
          </div>
        </div>

        {phase.description && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{phase.description}</p>
          </div>
        )}

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Processus ({totalSubprocesses})</h4>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {phase.subprocesses.map((subprocess) => (
                <div
                  key={subprocess.id}
                  className={`p-2 rounded-md cursor-pointer transition-all
                    ${
                      subprocess.status === "completed"
                        ? "bg-green-50"
                        : subprocess.status === "in-progress"
                          ? "bg-blue-50"
                          : subprocess.status === "overdue"
                            ? "bg-red-50"
                            : "bg-gray-100"
                    }
                    ${selectedSubprocess === subprocess.id ? "ring-2 ring-primary" : ""}
                  `}
                  onClick={() => {
                    setSelectedSubprocess(subprocess.id)
                    setSelectedPhase(null)
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(subprocess.status)}
                      <span className="ml-2 text-sm">{subprocess.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarFallback className="text-[10px]">{subprocess.owner.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{subprocess.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Voir les détails complets
            </Button>
            <Button size="sm" variant="outline">
              <BarChart className="h-4 w-4 mr-1" />
              Voir les métriques
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Exporter le rapport
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    )
  }

  // Export diagram as image
  const exportDiagram = () => {
    if (diagramRef.current) {
      // This is a placeholder for actual export functionality
      alert("Fonctionnalité d'exportation à implémenter")
    }
  }

  // Get my tasks
  const getMyTasks = () => {
    const currentUserId = 1 // Assuming current user is Jean Dupont (id: 1)

    const assignedTasks = apqpPhases.flatMap((phase) =>
      phase.subprocesses
        .filter((subprocess) => subprocess.owner.id === currentUserId)
        .map((subprocess) => ({
          ...subprocess,
          phaseId: phase.id,
          phaseName: phase.name,
        })),
    )

    const involvedTasks = apqpPhases
      .flatMap((phase) =>
        phase.subprocesses
          .filter((subprocess) => subprocess.owner.id !== currentUserId)
          .map((subprocess) => ({
            ...subprocess,
            phaseId: phase.id,
            phaseName: phase.name,
          })),
      )
      .slice(0, 5) // Just showing a few for demo purposes

    return { assignedTasks, involvedTasks }
  }

  const { assignedTasks, involvedTasks } = getMyTasks()

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-4 bg-white rounded-t-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Flux de processus APQP</CardTitle>
            <CardDescription>Visualisation du flux de processus APQP avec statut et progression</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={expandAllPhases}>
              Tout développer
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAllPhases}>
              Tout réduire
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0 px-6 pt-4 bg-gray-50">
        <div className="flex flex-col space-y-4">
          {/* Search and filters */}
          <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un processus..."
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
                      <p className="text-sm text-muted-foreground">Filtrer les processus selon différents critères</p>
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="filter-department" className="text-right">
                          Département
                        </Label>
                        <Select value={filterDepartment} onValueChange={setFilterDepartment} className="col-span-3">
                          <SelectTrigger id="filter-department">
                            <SelectValue placeholder="Tous les départements" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les départements</SelectItem>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id.toString()}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                          id="show-completed"
                          checked={showCompleted}
                          onCheckedChange={(checked) => setShowCompleted(checked as boolean)}
                        />
                        <Label htmlFor="show-completed">Afficher les processus terminés</Label>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Mode d'affichage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailed">Vue détaillée</SelectItem>
                  <SelectItem value="compact">Vue compacte</SelectItem>
                  <SelectItem value="kanban">Vue Kanban</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Switch id="show-dependencies" checked={showDependencies} onCheckedChange={setShowDependencies} />
                  <Label htmlFor="show-dependencies">Dépendances</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-critical-path" checked={showCriticalPath} onCheckedChange={setShowCriticalPath} />
                  <Label htmlFor="show-critical-path">Chemin critique</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end space-x-4 text-xs bg-white p-2 rounded-lg shadow-sm">
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
          </div>
        </div>
      </CardContent>

      <div className="flex flex-col lg:flex-row p-6 bg-gray-50">
        {/* Left side - APQP Flow Diagram */}
        <div className="w-full lg:w-2/3 lg:pr-6">
          <div className="bg-white rounded-lg shadow-md p-6" ref={diagramRef}>
            {/* APQP Flow Diagram */}
            <div className="mt-4 relative">
              {/* Connection lines */}
              <div className="absolute top-[80px] left-0 w-full border-t-2 border-gray-200 z-0"></div>

              {/* Phases */}
              <div className="flex justify-between relative z-10">
                {filteredPhases.map((phase, index) => (
                  <div
                    key={phase.id}
                    className="flex flex-col items-center"
                    style={{ width: `${100 / filteredPhases.length}%` }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className={`w-24 h-24 rounded-full flex items-center justify-center mb-3 cursor-pointer transition-all
                              ${
                                phase.status === "completed"
                                  ? "bg-green-100 border-2 border-green-500"
                                  : phase.status === "in-progress"
                                    ? "bg-blue-100 border-2 border-blue-500"
                                    : phase.status === "overdue"
                                      ? "bg-red-100 border-2 border-red-500"
                                      : "bg-gray-100 border-2 border-gray-300"
                              }
                              ${selectedPhase === phase.id ? "ring-2 ring-offset-2 ring-primary" : ""}
                              hover:shadow-lg
                            `}
                            onClick={() => {
                              setSelectedPhase(phase.id)
                              setSelectedSubprocess(null)
                            }}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-2xl font-bold">{phase.id}</span>
                              {showCriticalPath && (
                                <div className="mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                  Critique
                                </div>
                              )}
                            </div>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p className="font-medium">{phase.name}</p>
                            <p className="text-xs">{phase.progress}% terminé</p>
                            <p className="text-xs">Échéance: {new Date(phase.dueDate).toLocaleDateString()}</p>
                            <p className="text-xs">Responsable: {phase.owner.name}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="text-center">
                      <p className="font-medium text-sm">{phase.name}</p>
                      <div className="flex items-center justify-center mt-1">
                        <Progress value={phase.progress} className="h-1.5 w-20" />
                        <span className="text-xs ml-1">{phase.progress}%</span>
                      </div>
                      <div className="flex items-center justify-center mt-2">
                        <button
                          className="text-xs text-primary flex items-center hover:underline"
                          onClick={() => togglePhaseExpansion(phase.id)}
                        >
                          {expandedPhases.includes(phase.id) ? (
                            <>
                              <ChevronDown className="h-3 w-3 mr-1" />
                              Réduire
                            </>
                          ) : (
                            <>
                              <ChevronRight className="h-3 w-3 mr-1" />
                              Détails
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Subprocesses */}
                    {expandedPhases.includes(phase.id) && (
                      <div className="mt-4 w-full bg-gray-50 rounded-md p-3 shadow-sm">
                        <ScrollArea className="h-[300px]">
                          <div className="space-y-2">
                            {phase.subprocesses.length > 0 ? (
                              phase.subprocesses.map((subprocess) => (
                                <div
                                  key={subprocess.id}
                                  className={`p-3 rounded-md cursor-pointer transition-all hover:shadow-sm
                                    ${
                                      subprocess.status === "completed"
                                        ? "bg-green-50 border border-green-100"
                                        : subprocess.status === "in-progress"
                                          ? "bg-blue-50 border border-blue-100"
                                          : subprocess.status === "overdue"
                                            ? "bg-red-50 border border-red-100"
                                            : "bg-gray-100 border border-gray-200"
                                    }
                                    ${selectedSubprocess === subprocess.id ? "ring-2 ring-primary" : ""}
                                  `}
                                  onClick={() => {
                                    setSelectedSubprocess(subprocess.id)
                                    setSelectedPhase(null)
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      {getStatusIcon(subprocess.status)}
                                      <span className="ml-2 text-sm font-medium">{subprocess.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Avatar className="h-5 w-5">
                                        <AvatarFallback className="text-[10px]">
                                          {subprocess.owner.initials}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="ml-1 text-xs">{subprocess.progress}%</span>
                                    </div>
                                  </div>
                                  {viewMode === "detailed" && (
                                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                      <div className="flex items-center">
                                        <CalendarIcon className="h-3 w-3 mr-1" />
                                        <span>
                                          {subprocess.dueDate
                                            ? new Date(subprocess.dueDate).toLocaleDateString()
                                            : "Non définie"}
                                        </span>
                                      </div>
                                      {showDependencies && (
                                        <div className="flex items-center justify-end">
                                          <ArrowRight className="h-3 w-3 mr-1" />
                                          <span>2 dépendances</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-4 text-muted-foreground">
                                <p className="text-sm">Aucun processus trouvé</p>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* My Tasks Section */}
            <div className="mt-12 border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Mes tâches</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter une tâche
                </Button>
              </div>

              <Tabs defaultValue="assigned" value={myTasksTab} onValueChange={setMyTasksTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="assigned" className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Assignées à moi
                  </TabsTrigger>
                  <TabsTrigger value="involved" className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Où je suis impliqué
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="assigned">
                  <div className="grid grid-cols-1 gap-3">
                    {assignedTasks.length > 0 ? (
                      assignedTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer shadow-sm"
                          onClick={() => {
                            setSelectedSubprocess(task.id)
                            setSelectedPhase(null)
                            // Expand the phase containing this subprocess
                            if (!expandedPhases.includes(task.phaseId)) {
                              setExpandedPhases([...expandedPhases, task.phaseId])
                            }
                          }}
                        >
                          <div className="flex items-center">
                            {getStatusIcon(task.status)}
                            <div className="ml-3">
                              <p className="font-medium text-sm">{task.name}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>
                                  Phase {task.phaseId}: {task.phaseName}
                                </span>
                                <span className="mx-1">•</span>
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                <span>
                                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Non définie"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Progress value={task.progress} className="h-1.5 w-16 mr-2" />
                            <span className="text-xs">{task.progress}%</span>
                            <Button variant="ghost" size="sm" className="ml-2">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground border rounded-md">
                        <Layers className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>Aucune tâche assignée</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="involved">
                  <div className="grid grid-cols-1 gap-3">
                    {involvedTasks.length > 0 ? (
                      involvedTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer shadow-sm"
                          onClick={() => {
                            setSelectedSubprocess(task.id)
                            setSelectedPhase(null)
                            // Expand the phase containing this subprocess
                            if (!expandedPhases.includes(task.phaseId)) {
                              setExpandedPhases([...expandedPhases, task.phaseId])
                            }
                          }}
                        >
                          <div className="flex items-center">
                            {getStatusIcon(task.status)}
                            <div className="ml-3">
                              <p className="font-medium text-sm">{task.name}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>
                                  Phase {task.phaseId}: {task.phaseName}
                                </span>
                                <span className="mx-1">•</span>
                                <User className="h-3 w-3 mr-1" />
                                <span>{task.owner.name}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Progress value={task.progress} className="h-1.5 w-16 mr-2" />
                            <span className="text-xs">{task.progress}%</span>
                            <Button variant="ghost" size="sm" className="ml-2">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground border rounded-md">
                        <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>Aucune tâche où vous êtes impliqué</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Right side - Details Panel */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedPhase
                ? "Détails de la phase"
                : selectedSubprocess
                  ? "Détails du processus"
                  : "Sélectionnez un élément"}
            </h3>

            {selectedPhase && getPhaseDetails()}
            {selectedSubprocess && getSubprocessDetails()}

            {!selectedPhase && !selectedSubprocess && (
              <div className="text-center py-12 text-muted-foreground">
                <Info className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Sélectionnez une phase ou un processus pour voir les détails</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CardFooter className="flex justify-between border-t p-6 bg-white rounded-b-lg shadow-sm mt-6">
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
  )
}
