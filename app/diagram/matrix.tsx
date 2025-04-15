"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Download,
  Filter,
  Search,
  Share2,
  Printer,
  Settings,
  HelpCircle,
  Eye,
  Save,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Import the mock data from the main diagram page
import { apqpPhases, teamMembers } from "./data"

// Define RACI roles
const raciRoles = [
  { id: "R", name: "Responsable", description: "Personne qui exécute la tâche" },
  { id: "A", name: "Approbateur", description: "Personne qui approuve le travail" },
  { id: "C", name: "Consulté", description: "Personne consultée avant la décision" },
  { id: "I", name: "Informé", description: "Personne informée après la décision" },
]

// Generate RACI matrix data
const generateRaciMatrix = () => {
  const matrix = []

  // For each phase
  apqpPhases.forEach((phase) => {
    // Add phase row
    matrix.push({
      id: `phase-${phase.id}`,
      type: "phase",
      name: `Phase ${phase.id}: ${phase.name}`,
      assignments: generateRandomAssignments(teamMembers, true),
    })

    // Add subprocess rows
    phase.subprocesses.forEach((subprocess) => {
      matrix.push({
        id: `subprocess-${subprocess.id}`,
        type: "subprocess",
        phaseId: phase.id,
        name: subprocess.name,
        assignments: generateRandomAssignments(teamMembers, false),
      })
    })
  })

  return matrix
}

// Helper function to generate random RACI assignments
const generateRandomAssignments = (members, isPhase) => {
  const assignments = {}

  members.forEach((member) => {
    // For phases, make assignments more sparse
    if (isPhase && Math.random() > 0.6) {
      return
    }

    // Randomly assign RACI roles
    const random = Math.random()
    if (random < 0.2) {
      assignments[member.id] = "R"
    } else if (random < 0.4) {
      assignments[member.id] = "A"
    } else if (random < 0.6) {
      assignments[member.id] = "C"
    } else if (random < 0.8) {
      assignments[member.id] = "I"
    }
  })

  return assignments
}

const raciMatrix = generateRaciMatrix()

export default function ResponsibilityMatrix() {
  const [filterPhase, setFilterPhase] = useState<string>("all")
  const [filterMember, setFilterMember] = useState<string>("all")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showOnlyAssigned, setShowOnlyAssigned] = useState<boolean>(false)
  const [showPhases, setShowPhases] = useState<boolean>(true)
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [visibleMembers, setVisibleMembers] = useState<number[]>(teamMembers.map((m) => m.id))

  // Filter matrix rows based on selected filters and search query
  const filteredMatrix = raciMatrix.filter((row) => {
    // Filter by phase
    if (filterPhase !== "all" && row.type === "subprocess") {
      if (row.phaseId.toString() !== filterPhase) {
        return false
      }
    }

    // Filter by search query
    if (searchQuery && !row.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by role and member
    if (filterRole !== "all" || filterMember !== "all" || showOnlyAssigned) {
      const hasMatchingAssignment = Object.entries(row.assignments).some(([memberId, role]) => {
        const memberMatch = filterMember === "all" || memberId === filterMember
        const roleMatch = filterRole === "all" || role === filterRole
        return memberMatch && roleMatch
      })

      if (!hasMatchingAssignment && (filterRole !== "all" || filterMember !== "all" || showOnlyAssigned)) {
        return false
      }
    }

    // Hide phases if needed
    if (!showPhases && row.type === "phase") {
      return false
    }

    return true
  })

  // Function to toggle member visibility
  const toggleMemberVisibility = (memberId: number) => {
    if (visibleMembers.includes(memberId)) {
      setVisibleMembers(visibleMembers.filter((id) => id !== memberId))
    } else {
      setVisibleMembers([...visibleMembers, memberId])
    }
  }

  // Function to get cell background color based on RACI role
  const getCellBgColor = (role: string) => {
    switch (role) {
      case "R":
        return "bg-green-100 text-green-800"
      case "A":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      case "I":
        return "bg-purple-100 text-purple-800"
      default:
        return ""
    }
  }

  // Function to export the matrix
  const exportMatrix = () => {
    alert("Fonctionnalité d'exportation à implémenter")
  }

  // Function to print the matrix
  const printMatrix = () => {
    window.print()
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Matrice de responsabilité</CardTitle>
              <CardDescription>Matrice RACI pour les processus APQP</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={printMatrix}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <Button variant="outline" size="sm" onClick={exportMatrix}>
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
                      <Checkbox id="show-phases" checked={showPhases} onCheckedChange={setShowPhases} />
                      <Label htmlFor="show-phases">Afficher les phases</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-assigned" checked={showOnlyAssigned} onCheckedChange={setShowOnlyAssigned} />
                      <Label htmlFor="show-assigned">Afficher uniquement les tâches assignées</Label>
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
                          <Label htmlFor="filter-role" className="text-right">
                            Rôle RACI
                          </Label>
                          <Select value={filterRole} onValueChange={setFilterRole} className="col-span-3">
                            <SelectTrigger id="filter-role">
                              <SelectValue placeholder="Tous les rôles" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous les rôles</SelectItem>
                              {raciRoles.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.id} - {role.name}
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

            {/* RACI Legend */}
            <div className="flex flex-wrap items-center justify-end gap-4 text-xs">
              <TooltipProvider>
                {raciRoles.map((role) => (
                  <Tooltip key={role.id}>
                    <TooltipTrigger asChild>
                      <div className={`flex items-center px-2 py-1 rounded-md ${getCellBgColor(role.id)}`}>
                        <span className="font-bold">{role.id}</span>
                        <span className="ml-1">- {role.name}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{role.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">Matrice RACI</p>
                    <p className="text-sm">Définit les rôles et responsabilités pour chaque tâche</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>

        <div className="p-6">
          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 border-r z-10">
                      Tâche
                    </th>
                    {teamMembers
                      .filter((member) => visibleMembers.includes(member.id))
                      .map((member) => (
                        <th key={member.id} className="px-2 py-3 text-center">
                          <div className="flex flex-col items-center">
                            <Avatar className="h-8 w-8 mb-1">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>{member.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">{member.name}</span>
                            <span className="text-xs text-muted-foreground">{member.role}</span>
                          </div>
                        </th>
                      ))}
                    <th className="px-2 py-3 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <div className="p-2">
                            <p className="text-sm font-medium mb-2">Afficher/Masquer les membres</p>
                            {teamMembers.map((member) => (
                              <div key={member.id} className="flex items-center space-x-2 mb-1">
                                <Checkbox
                                  id={`member-${member.id}`}
                                  checked={visibleMembers.includes(member.id)}
                                  onCheckedChange={() => toggleMemberVisibility(member.id)}
                                />
                                <Label htmlFor={`member-${member.id}`}>{member.name}</Label>
                              </div>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMatrix.length > 0 ? (
                    filteredMatrix.map((row) => (
                      <tr
                        key={row.id}
                        className={`hover:bg-gray-50 ${
                          selectedRow === row.id ? "bg-blue-50" : row.type === "phase" ? "bg-gray-50" : ""
                        }`}
                        onClick={() => setSelectedRow(row.id)}
                      >
                        <td
                          className={`px-4 py-3 sticky left-0 border-r z-10 ${
                            selectedRow === row.id ? "bg-blue-50" : row.type === "phase" ? "bg-gray-50" : "bg-white"
                          } ${row.type === "phase" ? "font-medium" : "pl-8"}`}
                        >
                          {row.name}
                        </td>
                        {teamMembers
                          .filter((member) => visibleMembers.includes(member.id))
                          .map((member) => (
                            <td key={member.id} className="px-2 py-3 text-center">
                              {row.assignments[member.id] && (
                                <div
                                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${getCellBgColor(
                                    row.assignments[member.id],
                                  )}`}
                                >
                                  {row.assignments[member.id]}
                                </div>
                              )}
                            </td>
                          ))}
                        <td className="px-2 py-3 text-center">
                          <Button variant="ghost" size="sm">
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={visibleMembers.length + 2} className="px-4 py-8 text-center text-muted-foreground">
                        Aucune tâche trouvée avec les filtres sélectionnés
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected row details */}
          {selectedRow && (
            <div className="mt-4 border rounded-md p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">Détails de la tâche</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRow(null)}>
                  ✕
                </Button>
              </div>

              {(() => {
                const row = raciMatrix.find((r) => r.id === selectedRow)
                if (!row) return null

                return (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="font-medium">{row.name}</h4>
                      {row.type === "subprocess" && (
                        <p className="text-sm text-muted-foreground">Phase {row.phaseId}</p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Assignations RACI</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {Object.entries(row.assignments).map(([memberId, role]) => {
                          const member = teamMembers.find((m) => m.id.toString() === memberId)
                          if (!member) return null

                          return (
                            <div key={memberId} className="flex items-center space-x-2 p-2 border rounded-md">
                              <div
                                className={`flex items-center justify-center w-6 h-6 rounded-full font-bold ${getCellBgColor(
                                  role as string,
                                )}`}
                              >
                                {role}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir les détails
                      </Button>
                      <Button size="sm" variant="outline">
                        <Save className="h-4 w-4 mr-1" />
                        Modifier les assignations
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
