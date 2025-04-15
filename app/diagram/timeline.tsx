"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Filter,
  Search,
  Printer,
  Settings,
  Calendar,
  Clock,
  CheckCircle2,
  Info,
  FileText,
  MessageSquare,
  Flag,
  Star,
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  Plus,
  Eye,
  Save,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Import the mock data from the main diagram page
import { apqpPhases, teamMembers } from "./data"

// Generate timeline events
const generateTimelineEvents = () => {
  const events = []

  // Add project start event
  events.push({
    id: 1,
    type: "milestone",
    title: "Démarrage du projet",
    date: "2023-01-10",
    description: "Lancement officiel du projet APQP",
    owner: teamMembers[0],
    important: true,
  })

  // Add phase events
  apqpPhases.forEach((phase) => {
    // Phase start
    events.push({
      id: `phase-start-${phase.id}`,
      type: "phase-start",
      title: `Début de la Phase ${phase.id}: ${phase.name}`,
      date: phase.startDate,
      description: `Démarrage de la phase ${phase.id} du processus APQP`,
      owner: phase.owner,
      phaseId: phase.id,
      important: phase.id === 1,
    })

    // Phase end
    events.push({
      id: `phase-end-${phase.id}`,
      type: "phase-end",
      title: `Fin de la Phase ${phase.id}: ${phase.name}`,
      date: phase.dueDate,
      description: `Fin prévue de la phase ${phase.id} du processus APQP`,
      owner: phase.owner,
      phaseId: phase.id,
      important: false,
    })

    // Add some subprocess events
    phase.subprocesses.forEach((subprocess) => {
      if (subprocess.status === "completed") {
        events.push({
          id: `subprocess-${subprocess.id}`,
          type: "task-completed",
          title: `Tâche terminée: ${subprocess.name}`,
          date: subprocess.dueDate,
          description: `La tâche ${subprocess.name} a été terminée`,
          owner: subprocess.owner,
          phaseId: phase.id,
          subprocessId: subprocess.id,
          important: false,
        })
      }
    })
  })

  // Add some document events
  events.push({
    id: "doc-1",
    type: "document",
    title: "Document ajouté: Spécifications techniques",
    date: "2023-02-05",
    description: "Les spécifications techniques ont été ajoutées au projet",
    owner: teamMembers[2],
    documentName: "Specifications_Techniques_v1.pdf",
    important: false,
  })

  events.push({
    id: "doc-2",
    type: "document",
    title: "Document ajouté: Plan de contrôle",
    date: "2023-03-15",
    description: "Le plan de contrôle a été ajouté au projet",
    owner: teamMembers[1],
    documentName: "Plan_Controle_v1.xlsx",
    important: false,
  })

  // Add some comment events
  events.push({
    id: "comment-1",
    type: "comment",
    title: "Commentaire: Révision des spécifications",
    date: "2023-02-10",
    description: "Les spécifications doivent être révisées pour inclure les nouvelles exigences du client",
    owner: teamMembers[0],
    important: true,
  })

  events.push({
    id: "comment-2",
    type: "comment",
    title: "Commentaire: Problème de qualité identifié",
    date: "2023-04-05",
    description: "Un problème de qualité a été identifié lors des tests préliminaires",
    owner: teamMembers[3],
    important: true,
  })

  // Add some meeting events
  events.push({
    id: "meeting-1",
    type: "meeting",
    title: "Réunion: Revue de conception",
    date: "2023-02-20",
    description: "Réunion de revue de conception avec l'équipe de développement",
    owner: teamMembers[2],
    attendees: [teamMembers[0], teamMembers[1], teamMembers[2], teamMembers[3]],
    important: false,
  })

  events.push({
    id: "meeting-2",
    type: "meeting",
    title: "Réunion: Revue de processus",
    date: "2023-04-10",
    description: "Réunion de revue du processus de fabrication",
    owner: teamMembers[1],
    attendees: [teamMembers[0], teamMembers[1], teamMembers[4]],
    important: false,
  })

  // Add some milestone events
  events.push({
    id: "milestone-1",
    type: "milestone",
    title: "Jalon: Approbation de la conception",
    date: "2023-03-01",
    description: "La conception du produit a été approuvée par le client",
    owner: teamMembers[0],
    important: true,
  })

  events.push({
    id: "milestone-2",
    type: "milestone",
    title: "Jalon: Validation du prototype",
    date: "2023-05-15",
    description: "Le prototype a été validé avec succès",
    owner: teamMembers[2],
    important: true,
  })

  // Sort events by date
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return events
}

const timelineEvents = generateTimelineEvents()

// Group events by month and year
const groupEventsByMonth = (events) => {
  const grouped = {}

  events.forEach((event) => {
    const date = new Date(event.date)
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`

    if (!grouped[key]) {
      grouped[key] = {
        month: date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
        events: [],
      }
    }

    grouped[key].events.push(event)
  })

  return Object.values(grouped)
}

// Get icon for event type
const getEventIcon = (type) => {
  switch (type) {
    case "milestone":
      return <Flag className="h-5 w-5 text-red-500" />
    case "phase-start":
      return <Calendar className="h-5 w-5 text-green-500" />
    case "phase-end":
      return <Calendar className="h-5 w-5 text-blue-500" />
    case "task-completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "document":
      return <FileText className="h-5 w-5 text-yellow-500" />
    case "comment":
      return <MessageSquare className="h-5 w-5 text-purple-500" />
    case "meeting":
      return <Clock className="h-5 w-5 text-blue-500" />
    default:
      return <Info className="h-5 w-5 text-gray-500" />
  }
}

// Get badge for event type
const getEventBadge = (type) => {
  switch (type) {
    case "milestone":
      return <Badge className="bg-red-100 text-red-800">Jalon</Badge>
    case "phase-start":
      return <Badge className="bg-green-100 text-green-800">Début de phase</Badge>
    case "phase-end":
      return <Badge className="bg-blue-100 text-blue-800">Fin de phase</Badge>
    case "task-completed":
      return <Badge className="bg-green-100 text-green-800">Tâche terminée</Badge>
    case "document":
      return <Badge className="bg-yellow-100 text-yellow-800">Document</Badge>
    case "comment":
      return <Badge className="bg-purple-100 text-purple-800">Commentaire</Badge>
    case "meeting":
      return <Badge className="bg-blue-100 text-blue-800">Réunion</Badge>
    default:
      return <Badge variant="outline">Autre</Badge>
  }
}

export default function ProjectTimeline() {
  const [filterType, setFilterType] = useState<string>("all")
  const [filterPhase, setFilterPhase] = useState<string>("all")
  const [filterMember, setFilterMember] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showImportantOnly, setShowImportantOnly] = useState<boolean>(false)
  const [expandedMonths, setExpandedMonths] = useState<string[]>([])
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<string>("detailed")

  // Filter events based on selected filters and search query
  const filteredEvents = timelineEvents.filter((event) => {
    // Filter by type
    if (filterType !== "all" && event.type !== filterType) {
      return false
    }

    // Filter by phase
    if (filterPhase !== "all" && event.phaseId?.toString() !== filterPhase) {
      return false
    }

    // Filter by member
    if (filterMember !== "all" && event.owner?.id.toString() !== filterMember) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !event.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by importance
    if (showImportantOnly && !event.important) {
      return false
    }

    return true
  })

  // Group filtered events by month
  const groupedEvents = groupEventsByMonth(filteredEvents)

  // Toggle month expansion
  const toggleMonthExpansion = (month) => {
    if (expandedMonths.includes(month)) {
      setExpandedMonths(expandedMonths.filter((m) => m !== month))
    } else {
      setExpandedMonths([...expandedMonths, month])
    }
  }

  // Expand all months
  const expandAllMonths = () => {
    setExpandedMonths(groupedEvents.map((group) => group.month))
  }

  // Collapse all months
  const collapseAllMonths = () => {
    setExpandedMonths([])
  }

  // Function to export the timeline
  const exportTimeline = () => {
    alert("Fonctionnalité d'exportation à implémenter")
  }

  // Function to print the timeline
  const printTimeline = () => {
    window.print()
  }

  // Function to get event details
  const getEventDetails = (eventId) => {
    return timelineEvents.find((event) => event.id === eventId)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Chronologie du projet</CardTitle>
              <CardDescription>Vue chronologique des événements et jalons du projet</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={printTimeline}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <Button variant="outline" size="sm" onClick={exportTimeline}>
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
                      <Checkbox
                        id="show-important"
                        checked={showImportantOnly}
                        onCheckedChange={setShowImportantOnly}
                      />
                      <Label htmlFor="show-important">Afficher uniquement les événements importants</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Label htmlFor="view-mode">Mode d'affichage:</Label>
                      <Select value={viewMode} onValueChange={setViewMode}>
                        <SelectTrigger id="view-mode" className="w-[180px]">
                          <SelectValue placeholder="Mode d'affichage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="detailed">Vue détaillée</SelectItem>
                          <SelectItem value="compact">Vue compacte</SelectItem>
                        </SelectContent>
                      </Select>
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
                    placeholder="Rechercher un événement..."
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
                        <p className="text-sm text-muted-foreground">
                          Filtrer les événements selon différents critères
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="filter-type" className="text-right">
                            Type
                          </Label>
                          <Select value={filterType} onValueChange={setFilterType} className="col-span-3">
                            <SelectTrigger id="filter-type">
                              <SelectValue placeholder="Tous les types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous les types</SelectItem>
                              <SelectItem value="milestone">Jalons</SelectItem>
                              <SelectItem value="phase-start">Début de phase</SelectItem>
                              <SelectItem value="phase-end">Fin de phase</SelectItem>
                              <SelectItem value="task-completed">Tâches terminées</SelectItem>
                              <SelectItem value="document">Documents</SelectItem>
                              <SelectItem value="comment">Commentaires</SelectItem>
                              <SelectItem value="meeting">Réunions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
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
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Expand/Collapse controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={expandAllMonths}>
                  Tout développer
                </Button>
                <Button variant="outline" size="sm" onClick={collapseAllMonths}>
                  Tout réduire
                </Button>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
                <div className="flex items-center">
                  <Flag className="h-3 w-3 text-red-500 mr-1" />
                  <span>Jalon</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 text-green-500 mr-1" />
                  <span>Début de phase</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 text-blue-500 mr-1" />
                  <span>Fin de phase</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                  <span>Tâche terminée</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>Document</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 text-purple-500 mr-1" />
                  <span>Commentaire</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 text-blue-500 mr-1" />
                  <span>Réunion</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="p-6">
          <div className="flex">
            {/* Timeline content */}
            <div className="w-2/3 pr-6">
              {groupedEvents.length > 0 ? (
                <div className="space-y-6">
                  {groupedEvents.map((group, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div
                        className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                        onClick={() => toggleMonthExpansion(group.month)}
                      >
                        <h3 className="text-lg font-medium">{group.month}</h3>
                        <Button variant="ghost" size="sm">
                          {expandedMonths.includes(group.month) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {expandedMonths.includes(group.month) && (
                        <div className="divide-y">
                          {group.events.map((event) => (
                            <div
                              key={event.id}
                              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                                selectedEvent === event.id ? "bg-blue-50" : ""
                              } ${event.important ? "border-l-4 border-yellow-500" : ""}`}
                              onClick={() => setSelectedEvent(event.id)}
                            >
                              <div className="flex items-start">
                                <div className="mr-3 mt-1">{getEventIcon(event.type)}</div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{event.title}</h4>
                                    {getEventBadge(event.type)}
                                  </div>

                                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <CalendarIcon className="h-3 w-3 mr-1" />
                                    <span>
                                      {new Date(event.date).toLocaleDateString("fr-FR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </div>

                                  {viewMode === "detailed" && (
                                    <>
                                      <p className="mt-2 text-sm">{event.description}</p>

                                      <div className="flex items-center mt-2">
                                        <Avatar className="h-6 w-6 mr-2">
                                          <AvatarFallback>{event.owner?.initials}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{event.owner?.name}</span>
                                      </div>
                                    </>
                                  )}
                                </div>

                                {event.important && (
                                  <div className="ml-2">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground border rounded-md">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Aucun événement trouvé avec les filtres sélectionnés</p>
                </div>
              )}
            </div>

            {/* Event details panel */}
            <div className="w-1/3 border-l pl-6">
              <div className="sticky top-4">
                <h3 className="text-lg font-semibold mb-4">
                  {selectedEvent ? "Détails de l'événement" : "Sélectionnez un événement"}
                </h3>

                {selectedEvent ? (
                  (() => {
                    const event = getEventDetails(selectedEvent)
                    if (!event) return null

                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-3">{getEventIcon(event.type)}</div>
                            <h4 className="font-medium">{event.title}</h4>
                          </div>
                          {getEventBadge(event.type)}
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <div className="flex items-center mt-1">
                            <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {new Date(event.date).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                weekday: "long",
                              })}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Responsable</p>
                          <div className="flex items-center mt-1">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>{event.owner?.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <span>{event.owner?.name}</span>
                              <p className="text-xs text-muted-foreground">{event.owner?.role}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Description</p>
                          <p className="mt-1">{event.description}</p>
                        </div>

                        {event.phaseId && (
                          <div>
                            <p className="text-sm text-muted-foreground">Phase associée</p>
                            <p className="mt-1">
                              Phase {event.phaseId}: {apqpPhases.find((p) => p.id === event.phaseId)?.name}
                            </p>
                          </div>
                        )}

                        {event.documentName && (
                          <div>
                            <p className="text-sm text-muted-foreground">Document</p>
                            <div className="flex items-center mt-1">
                              <FileText className="h-4 w-4 mr-2 text-yellow-500" />
                              <span className="text-blue-500 underline cursor-pointer">{event.documentName}</span>
                            </div>
                          </div>
                        )}

                        {event.attendees && (
                          <div>
                            <p className="text-sm text-muted-foreground">Participants</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {event.attendees.map((attendee) => (
                                <div key={attendee.id} className="flex items-center border rounded-full px-2 py-1">
                                  <Avatar className="h-4 w-4 mr-1">
                                    <AvatarFallback className="text-[8px]">{attendee.initials}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{attendee.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2 mt-4">
                          <Button size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir les détails complets
                          </Button>
                          <Button size="sm" variant="outline">
                            <Save className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                        </div>
                      </div>
                    )
                  })()
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Info className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Sélectionnez un événement pour voir les détails</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <CardFooter className="flex justify-between border-t p-6">
          <div className="text-sm text-muted-foreground">
            <p>Dernière mise à jour: 15 avril 2023</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Ajouter un événement
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
