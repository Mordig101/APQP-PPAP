import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Mail, Phone, Download, Filter, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Chef de Projet",
      department: "Gestion de Projet",
      email: "j.dupont@company.com",
      phone: "+33 1 23 45 67 89",
      photo: "/placeholder.svg?height=40&width=40",
      status: "active",
      skills: ["APQP", "PPAP", "Gestion de projet", "Automobile"],
      projects: ["Composant A-123", "Système B-456"],
      availability: "Disponible",
    },
    {
      id: 2,
      name: "Marie Laurent",
      role: "Ingénieur Qualité",
      department: "Qualité",
      email: "m.laurent@company.com",
      phone: "+33 1 23 45 67 90",
      photo: "/placeholder.svg?height=40&width=40",
      status: "active",
      skills: ["PPAP", "Audit qualité", "MSA", "SPC"],
      projects: ["Composant A-123", "Module C-789"],
      availability: "Disponible",
    },
    {
      id: 3,
      name: "Thomas Martin",
      role: "Ingénieur Process",
      department: "Production",
      email: "t.martin@company.com",
      phone: "+33 1 23 45 67 91",
      photo: "/placeholder.svg?height=40&width=40",
      status: "busy",
      skills: ["PFMEA", "Lean Manufacturing", "Kaizen", "TPM"],
      projects: ["Système B-456"],
      availability: "Occupé jusqu'au 15/06",
    },
    {
      id: 4,
      name: "Sophie Dubois",
      role: "Ingénieur R&D",
      department: "R&D",
      email: "s.dubois@company.com",
      phone: "+33 1 23 45 67 92",
      photo: "/placeholder.svg?height=40&width=40",
      status: "active",
      skills: ["DFMEA", "CAO", "Simulation", "Matériaux"],
      projects: ["Module C-789", "Composant E-345"],
      availability: "Disponible",
    },
    {
      id: 5,
      name: "Pierre Moreau",
      role: "Responsable Achats",
      department: "Achats",
      email: "p.moreau@company.com",
      phone: "+33 1 23 45 67 93",
      photo: "/placeholder.svg?height=40&width=40",
      status: "away",
      skills: ["Sourcing", "Négociation", "Gestion fournisseurs"],
      projects: ["Composant A-123", "Assemblage D-012"],
      availability: "En congés jusqu'au 20/06",
    },
    {
      id: 6,
      name: "Claire Petit",
      role: "Technicien Méthodes",
      department: "Méthodes",
      email: "c.petit@company.com",
      phone: "+33 1 23 45 67 94",
      photo: "/placeholder.svg?height=40&width=40",
      status: "active",
      skills: ["Gammes de fabrication", "Temps standards", "Ergonomie"],
      projects: ["Assemblage D-012"],
      availability: "Disponible",
    },
    {
      id: 7,
      name: "Luc Bernard",
      role: "Responsable Laboratoire",
      department: "Laboratoire",
      email: "l.bernard@company.com",
      phone: "+33 1 23 45 67 95",
      photo: "/placeholder.svg?height=40&width=40",
      status: "active",
      skills: ["Tests matériaux", "Métrologie", "Calibration"],
      projects: ["Composant E-345", "Module C-789"],
      availability: "Disponible",
    },
    {
      id: 8,
      name: "Émilie Roux",
      role: "Responsable HSE",
      department: "HSE",
      email: "e.roux@company.com",
      phone: "+33 1 23 45 67 96",
      photo: "/placeholder.svg?height=40&width=40",
      status: "active",
      skills: ["Sécurité", "Environnement", "Réglementation"],
      projects: ["Système B-456"],
      availability: "Disponible",
    },
  ]

  const responsibilities = [
    {
      phase: "Phase 1: Plan & Define",
      roles: {
        "Chef de Projet": "R",
        "Ingénieur Qualité": "C",
        "Ingénieur Process": "C",
        "Ingénieur R&D": "A",
        "Responsable Achats": "I",
        "Technicien Méthodes": "I",
        "Responsable Laboratoire": "I",
        "Responsable HSE": "C",
      },
    },
    {
      phase: "Phase 2: Conception Produit",
      roles: {
        "Chef de Projet": "A",
        "Ingénieur Qualité": "C",
        "Ingénieur Process": "C",
        "Ingénieur R&D": "R",
        "Responsable Achats": "C",
        "Technicien Méthodes": "I",
        "Responsable Laboratoire": "C",
        "Responsable HSE": "C",
      },
    },
    {
      phase: "Phase 3: Conception Process",
      roles: {
        "Chef de Projet": "A",
        "Ingénieur Qualité": "C",
        "Ingénieur Process": "R",
        "Ingénieur R&D": "C",
        "Responsable Achats": "C",
        "Technicien Méthodes": "R",
        "Responsable Laboratoire": "I",
        "Responsable HSE": "C",
      },
    },
    {
      phase: "Phase 4: Validation",
      roles: {
        "Chef de Projet": "A",
        "Ingénieur Qualité": "R",
        "Ingénieur Process": "C",
        "Ingénieur R&D": "C",
        "Responsable Achats": "I",
        "Technicien Méthodes": "C",
        "Responsable Laboratoire": "R",
        "Responsable HSE": "I",
      },
    },
    {
      phase: "Phase 5: Feedback",
      roles: {
        "Chef de Projet": "R",
        "Ingénieur Qualité": "R",
        "Ingénieur Process": "C",
        "Ingénieur R&D": "C",
        "Responsable Achats": "I",
        "Technicien Méthodes": "C",
        "Responsable Laboratoire": "C",
        "Responsable HSE": "I",
      },
    },
    {
      phase: "Dossiers PPAP",
      roles: {
        "Chef de Projet": "A",
        "Ingénieur Qualité": "R",
        "Ingénieur Process": "C",
        "Ingénieur R&D": "C",
        "Responsable Achats": "I",
        "Technicien Méthodes": "C",
        "Responsable Laboratoire": "C",
        "Responsable HSE": "I",
      },
    },
  ]

  const projects = [
    {
      id: "PRJ-001",
      name: "Composant A-123",
      client: "Automotive Corp",
      phase: "Phase 2",
      teamMembers: ["Jean Dupont", "Marie Laurent", "Pierre Moreau"],
    },
    {
      id: "PRJ-002",
      name: "Système B-456",
      client: "Aero Industries",
      phase: "Phase 3",
      teamMembers: ["Jean Dupont", "Thomas Martin", "Émilie Roux"],
    },
    {
      id: "PRJ-003",
      name: "Module C-789",
      client: "Medical Devices Inc",
      phase: "Phase 1",
      teamMembers: ["Marie Laurent", "Sophie Dubois", "Luc Bernard"],
    },
    {
      id: "PRJ-004",
      name: "Assemblage D-012",
      client: "Automotive Corp",
      phase: "Phase 4",
      teamMembers: ["Pierre Moreau", "Claire Petit"],
    },
    {
      id: "PRJ-005",
      name: "Composant E-345",
      client: "Electronics Ltd",
      phase: "Phase 2",
      teamMembers: ["Sophie Dubois", "Luc Bernard"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "busy":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "away":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Disponible"
      case "busy":
        return "Occupé"
      case "away":
        return "Absent"
      default:
        return ""
    }
  }

  const getResponsibilityBadge = (responsibility: string) => {
    switch (responsibility) {
      case "R":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Responsable</Badge>
      case "A":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Approbateur</Badge>
      case "C":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Consulté</Badge>
      case "I":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Informé</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Équipe projet</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un membre
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Membres d'équipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="mt-2 text-xs text-muted-foreground">Répartis sur 5 projets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disponibilité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="mt-2 text-xs text-muted-foreground">6/8 membres disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Départements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="mt-2 text-xs text-muted-foreground">Départements impliqués</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compétences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="mt-2 text-xs text-muted-foreground">Compétences disponibles</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Membres</TabsTrigger>
          <TabsTrigger value="organization">Organisation</TabsTrigger>
          <TabsTrigger value="responsibilities">Matrice RACI</TabsTrigger>
          <TabsTrigger value="projects">Affectation projets</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Membres de l'équipe</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Rechercher..." className="w-[250px]" />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.photo} alt={member.name} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{member.name}</CardTitle>
                            <CardDescription>{member.role}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {getStatusIcon(member.status)}
                          <span className="ml-1 text-xs">{getStatusText(member.status)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-1">Département</p>
                          <Badge variant="outline">{member.department}</Badge>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-1">Compétences</p>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-1">Projets</p>
                          <div className="flex flex-wrap gap-1">
                            {member.projects.map((project, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {project}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organigramme de l'équipe</CardTitle>
              <CardDescription>Structure organisationnelle de l'équipe projet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  <div className="flex flex-col items-center">
                    {/* Chef de projet */}
                    <div className="mb-8">
                      <div className="border rounded-lg p-4 bg-primary/5 w-64 text-center">
                        <p className="font-semibold">Jean Dupont</p>
                        <p className="text-sm text-muted-foreground">Chef de Projet</p>
                      </div>
                    </div>

                    {/* Niveau 2 */}
                    <div className="grid grid-cols-4 gap-8 mb-8 relative">
                      <div className="absolute top-[-20px] left-0 right-0 h-[20px] border-l border-dashed"></div>
                      <div className="absolute top-[-20px] left-[12.5%] right-[12.5%] h-[20px] border-t border-dashed"></div>

                      <div className="border rounded-lg p-4 bg-secondary/5 w-48 text-center">
                        <p className="font-semibold">Marie Laurent</p>
                        <p className="text-sm text-muted-foreground">Ingénieur Qualité</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-secondary/5 w-48 text-center">
                        <p className="font-semibold">Thomas Martin</p>
                        <p className="text-sm text-muted-foreground">Ingénieur Process</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-secondary/5 w-48 text-center">
                        <p className="font-semibold">Sophie Dubois</p>
                        <p className="text-sm text-muted-foreground">Ingénieur R&D</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-secondary/5 w-48 text-center">
                        <p className="font-semibold">Pierre Moreau</p>
                        <p className="text-sm text-muted-foreground">Responsable Achats</p>
                      </div>
                    </div>

                    {/* Niveau 3 */}
                    <div className="grid grid-cols-3 gap-8 relative">
                      <div className="absolute top-[-20px] left-[16.67%] right-[16.67%] h-[20px] border-t border-dashed"></div>
                      <div className="absolute top-[-20px] left-[16.67%] h-[20px] border-l border-dashed"></div>
                      <div className="absolute top-[-20px] left-[50%] h-[20px] border-l border-dashed"></div>
                      <div className="absolute top-[-20px] left-[83.33%] h-[20px] border-l border-dashed"></div>

                      <div className="border rounded-lg p-4 bg-muted/20 w-48 text-center">
                        <p className="font-semibold">Claire Petit</p>
                        <p className="text-sm text-muted-foreground">Technicien Méthodes</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-muted/20 w-48 text-center">
                        <p className="font-semibold">Luc Bernard</p>
                        <p className="text-sm text-muted-foreground">Responsable Laboratoire</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-muted/20 w-48 text-center">
                        <p className="font-semibold">Émilie Roux</p>
                        <p className="text-sm text-muted-foreground">Responsable HSE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition par département</CardTitle>
              <CardDescription>Distribution des membres de l'équipe par département</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center text-muted-foreground">
                  <p>Graphique de répartition par département</p>
                  <p className="text-xs mt-2">(Graphique à implémenter)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responsibilities" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Matrice RACI</CardTitle>
                  <CardDescription>Responsabilités des membres de l'équipe par phase</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrer par phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les phases</SelectItem>
                      <SelectItem value="phase1">Phase 1: Plan & Define</SelectItem>
                      <SelectItem value="phase2">Phase 2: Conception Produit</SelectItem>
                      <SelectItem value="phase3">Phase 3: Conception Process</SelectItem>
                      <SelectItem value="phase4">Phase 4: Validation</SelectItem>
                      <SelectItem value="phase5">Phase 5: Feedback</SelectItem>
                      <SelectItem value="ppap">Dossiers PPAP</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Phase</TableHead>
                      {teamMembers.map((member) => (
                        <TableHead key={member.id} className="text-center">
                          <div className="flex flex-col items-center">
                            <Avatar className="h-8 w-8 mb-1">
                              <AvatarImage src={member.photo} alt={member.name} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">{member.name.split(" ")[0]}</span>
                            <span className="text-xs text-muted-foreground">{member.role.split(" ")[0]}</span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {responsibilities.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.phase}</TableCell>
                        {teamMembers.map((member) => (
                          <TableCell key={member.id} className="text-center">
                            {getResponsibilityBadge(item.roles[member.role as keyof typeof item.roles] || "")}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 border rounded-md p-4 bg-muted/10">
                <h4 className="text-sm font-semibold mb-2">Légende RACI</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mr-2">R</Badge>
                    <span className="text-sm">Responsable</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mr-2">A</Badge>
                    <span className="text-sm">Approbateur</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 mr-2">C</Badge>
                    <span className="text-sm">Consulté</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 mr-2">I</Badge>
                    <span className="text-sm">Informé</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Affectation aux projets</CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrer par projet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les projets</SelectItem>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projet</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Phase</TableHead>
                    <TableHead>Membres affectés</TableHead>
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
                        <div className="flex -space-x-2">
                          {project.teamMembers.map((memberName, index) => {
                            const member = teamMembers.find((m) => m.name === memberName)
                            return (
                              <Avatar key={index} className="border-2 border-background h-8 w-8">
                                <AvatarImage src={member?.photo} alt={memberName} />
                                <AvatarFallback>
                                  {memberName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            )
                          })}
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            {project.teamMembers.length}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Gérer l'équipe
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Charge de travail par membre</CardTitle>
              <CardDescription>Nombre de projets par membre d'équipe</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Membre</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Nombre de projets</TableHead>
                    <TableHead>Projets</TableHead>
                    <TableHead>Disponibilité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={member.photo} alt={member.name} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.projects.length}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.projects.map((project, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(member.status)}
                          <span className="ml-2">{member.availability}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
