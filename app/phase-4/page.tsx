"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileUp,
  Plus,
  Save,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  CalendarIcon,
  User,
  ChevronRight,
  Download,
  Trash2,
  Pencil,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  ArrowUpRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { apqpPhases, teamMembers } from "../diagram/data"

// Get Phase 4 data from the APQP phases
const phase4 = apqpPhases.find((phase) => phase.id === 4)
const phase4Processes = phase4?.subprocesses || []

export default function Phase4Page() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterOwner, setFilterOwner] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCompleted, setShowCompleted] = useState(true)

  // Filter processes based on selected filters
  const filteredProcesses = phase4Processes.filter((process) => {
    // Filter by status
    if (filterStatus !== "all" && process.status !== filterStatus) return false

    // Filter by owner
    if (filterOwner !== "all" && process.owner.id.toString() !== filterOwner) return false

    // Filter by search query
    if (searchQuery && !process.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // Filter completed processes
    if (!showCompleted && process.status === "completed") return false

    return true
  })

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
        return <AlertCircle className="h-5 w-5 text-gray-400" />
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
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  // Get selected process details
  const getSelectedProcessDetails = () => {
    if (!selectedProcess) return null

    const process = phase4Processes.find((p) => p.id === selectedProcess)
    if (!process) return null

    return (
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{process.name}</CardTitle>
              <CardDescription>ID: {process.id}</CardDescription>
            </div>
            {getStatusBadge(process.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Responsable</Label>
              <div className="flex items-center mt-1">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback>{process.owner.initials}</AvatarFallback>
                </Avatar>
                <span>{process.owner.name}</span>
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Progression</Label>
              <div className="flex items-center mt-1">
                <Progress value={process.progress} className="h-2 mr-2" />
                <span className="text-sm">{process.progress}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Date de début</Label>
              <div className="flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{process.startDate ? new Date(process.startDate).toLocaleDateString() : "Non définie"}</span>
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Date d'échéance</Label>
              <div className="flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{process.dueDate ? new Date(process.dueDate).toLocaleDateString() : "Non définie"}</span>
              </div>
            </div>
          </div>

          {process.description && (
            <div>
              <Label className="text-sm text-muted-foreground">Description</Label>
              <p className="mt-1">{process.description}</p>
            </div>
          )}

          {process.documents && process.documents.length > 0 && (
            <div>
              <Label className="text-sm text-muted-foreground">Documents associés</Label>
              <div className="mt-1 space-y-2">
                {process.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      {getDocumentIcon(doc.type)}
                      <span className="ml-2 text-blue-500 hover:underline cursor-pointer">{doc.name}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{new Date(doc.date).toLocaleDateString()}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Voir les détails
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button size="sm">
              <FileUp className="h-4 w-4 mr-2" />
              Ajouter un document
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  }

  // Render process form based on process ID
  const renderProcessForm = (processId: number) => {
    const process = phase4Processes.find((p) => p.id === processId)
    if (!process) return null

    switch (processId) {
      case 401: // Production Trial Run
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trial-id">ID Essai</Label>
                <Input id="trial-id" placeholder="Ex: PT-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trial-date">Date</Label>
                <Input id="trial-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trial-responsible">Responsable</Label>
                <Input id="trial-responsible" placeholder="Nom du responsable" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trial-quantity">Quantité</Label>
                <Input id="trial-quantity" placeholder="Ex: 300 pièces" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Résultats de l'essai</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indicateur</TableHead>
                    <TableHead>Objectif</TableHead>
                    <TableHead>Résultat</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Taux de conformité</TableCell>
                    <TableCell>≥ 98%</TableCell>
                    <TableCell>99.3%</TableCell>
                    <TableCell>
                      <Badge variant="success">Conforme</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cadence</TableCell>
                    <TableCell>120 pcs/h</TableCell>
                    <TableCell>115 pcs/h</TableCell>
                    <TableCell>
                      <Badge variant="outline">Acceptable</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Temps de changement</TableCell>
                    <TableCell>≤ 30 min</TableCell>
                    <TableCell>35 min</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Non conforme</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>OEE</TableCell>
                    <TableCell>≥ 85%</TableCell>
                    <TableCell>82%</TableCell>
                    <TableCell>
                      <Badge variant="outline">Acceptable</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label>Problèmes rencontrés</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Problème</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Action corrective</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Temps de changement trop long</TableCell>
                    <TableCell>Réduction de la capacité</TableCell>
                    <TableCell>Optimisation SMED</TableCell>
                    <TableCell>M. Martin</TableCell>
                    <TableCell>15/05/2023</TableCell>
                    <TableCell>
                      <Badge variant="secondary">En cours</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Micro-arrêts fréquents</TableCell>
                    <TableCell>Réduction OEE</TableCell>
                    <TableCell>Maintenance préventive</TableCell>
                    <TableCell>L. Bernard</TableCell>
                    <TableCell>10/05/2023</TableCell>
                    <TableCell>
                      <Badge variant="secondary">En cours</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trial-conclusion">Conclusion</Label>
              <Textarea
                id="trial-conclusion"
                placeholder="Conclusion de l'essai de production"
                rows={4}
                defaultValue="L'essai de production a démontré que le process est capable de produire des pièces conformes avec un taux de qualité satisfaisant. Des améliorations sont nécessaires concernant le temps de changement et la réduction des micro-arrêts pour atteindre les objectifs de performance."
              />
            </div>

            <div className="space-y-2">
              <Label>Documents associés</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 402: // Measurement Systems Evaluation
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="msa-id">ID MSA</Label>
                <Input id="msa-id" placeholder="Ex: MSA-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msa-date">Date</Label>
                <Input id="msa-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msa-responsible">Responsable</Label>
                <Input id="msa-responsible" placeholder="Nom du responsable" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msa-status">Statut</Label>
                <Select defaultValue="in-progress">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planifiée</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                    <SelectItem value="approved">Approuvée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Études MSA réalisées</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter étude
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Caractéristique</TableHead>
                    <TableHead>Instrument</TableHead>
                    <TableHead>Type d'étude</TableHead>
                    <TableHead>Résultat</TableHead>
                    <TableHead>Critère</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Diamètre intérieur</TableCell>
                    <TableCell>Pied à coulisse digital</TableCell>
                    <TableCell>GR&R</TableCell>
                    <TableCell>12.5%</TableCell>
                    <TableCell>≤ 30%</TableCell>
                    <TableCell>
                      <Badge variant="success">Acceptable</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rugosité</TableCell>
                    <TableCell>Rugosimètre</TableCell>
                    <TableCell>GR&R</TableCell>
                    <TableCell>18.3%</TableCell>
                    <TableCell>≤ 30%</TableCell>
                    <TableCell>
                      <Badge variant="success">Acceptable</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Couple serrage</TableCell>
                    <TableCell>Clé dynamométrique</TableCell>
                    <TableCell>Linéarité & Biais</TableCell>
                    <TableCell>32.5%</TableCell>
                    <TableCell>≤ 30%</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Non acceptable</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label>Graphique MSA - Diamètre intérieur</Label>
              <div className="rounded-md border p-4 h-64 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Graphique d'analyse GR&R</p>
                  <p className="text-xs text-muted-foreground">%GR&R = 12.5%, ndc = 8</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="msa-conclusion">Conclusion</Label>
              <Textarea
                id="msa-conclusion"
                placeholder="Conclusion de l'étude MSA"
                rows={4}
                defaultValue="Les systèmes de mesure pour le diamètre intérieur et la rugosité sont acceptables avec des %GR&R inférieurs à 30%. Le système de mesure pour le couple de serrage présente un %GR&R supérieur à 30% et nécessite une amélioration. Une action corrective a été initiée pour remplacer la clé dynamométrique par un modèle plus précis."
              />
            </div>

            <div className="space-y-2">
              <Label>Documents associés</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 403: // Preliminary Process Capability Study
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capability-id">ID Étude</Label>
                <Input id="capability-id" placeholder="Ex: PPC-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capability-date">Date</Label>
                <Input id="capability-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capability-responsible">Responsable</Label>
                <Input id="capability-responsible" placeholder="Nom du responsable" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capability-type">Type d'étude</Label>
                <Select defaultValue="pp-ppk">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pp-ppk">Pp/Ppk (Performance)</SelectItem>
                    <SelectItem value="cp-cpk">Cp/Cpk (Capabilité)</SelectItem>
                    <SelectItem value="both">Les deux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Résultats de capabilité</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter caractéristique
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Caractéristique</TableHead>
                    <TableHead>Spécification</TableHead>
                    <TableHead>Pp/Cp</TableHead>
                    <TableHead>Ppk/Cpk</TableHead>
                    <TableHead>Taille échantillon</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Diamètre extérieur</TableCell>
                    <TableCell>25.2 ± 0.1 mm</TableCell>
                    <TableCell>2.15</TableCell>
                    <TableCell>1.85</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>
                      <Badge variant="success">Conforme</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Graphique
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Longueur</TableCell>
                    <TableCell>100.0 ± 0.2 mm</TableCell>
                    <TableCell>1.75</TableCell>
                    <TableCell>1.42</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>
                      <Badge variant="success">Conforme</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Graphique
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rugosité</TableCell>
                    <TableCell>Ra ≤ 1.6 µm</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>1.12</TableCell>
                    <TableCell>30</TableCell>
                    <TableCell>
                      <Badge variant="success">Conforme</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Graphique
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Couple serrage</TableCell>
                    <TableCell>12 ± 1 Nm</TableCell>
                    <TableCell>1.25</TableCell>
                    <TableCell>0.95</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Non conforme</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Graphique
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label>Graphique de capabilité - Diamètre extérieur</Label>
              <div className="rounded-md border p-4 h-64 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Graphique de distribution normale</p>
                  <p className="text-xs text-muted-foreground">Pp = 2.15, Ppk = 1.85</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capability-conclusion">Conclusion</Label>
              <Textarea
                id="capability-conclusion"
                placeholder="Conclusion de l'étude de capabilité"
                rows={4}
                defaultValue="Les caractéristiques dimensionnelles (diamètre, longueur) et la rugosité présentent une capabilité satisfaisante (Ppk > 1.33). Le couple de serrage présente une capabilité insuffisante (Ppk < 1.33). Une action corrective a été initiée pour améliorer le process de serrage."
              />
            </div>

            <div className="space-y-2">
              <Label>Documents associés</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 404: // Production Part Approval
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ppap-id">ID PPAP</Label>
                <Input id="ppap-id" placeholder="Ex: PPAP-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ppap-level">Niveau PPAP</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Niveau 1</SelectItem>
                    <SelectItem value="2">Niveau 2</SelectItem>
                    <SelectItem value="3">Niveau 3</SelectItem>
                    <SelectItem value="4">Niveau 4</SelectItem>
                    <SelectItem value="5">Niveau 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ppap-submission-date">Date de soumission</Label>
                <Input id="ppap-submission-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ppap-status">Statut</Label>
                <Select defaultValue="in-preparation">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-preparation">En préparation</SelectItem>
                    <SelectItem value="submitted">Soumis</SelectItem>
                    <SelectItem value="approved">Approuvé</SelectItem>
                    <SelectItem value="rejected">Rejeté</SelectItem>
                    <SelectItem value="conditionally-approved">Approuvé conditionnellement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Avancement PPAP</Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avancement global</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Élément PPAP</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Date cible</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Design Records</TableCell>
                      <TableCell>
                        <Badge variant="success">Terminé</Badge>
                      </TableCell>
                      <TableCell>J. Dupont</TableCell>
                      <TableCell>10/04/2023</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Engineering Change Documents</TableCell>
                      <TableCell>
                        <Badge variant="success">Terminé</Badge>
                      </TableCell>
                      <TableCell>J. Dupont</TableCell>
                      <TableCell>12/04/2023</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Customer Engineering Approval</TableCell>
                      <TableCell>
                        <Badge variant="secondary">En attente</Badge>
                      </TableCell>
                      <TableCell>M. Martin</TableCell>
                      <TableCell>20/04/2023</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Design FMEA</TableCell>
                      <TableCell>
                        <Badge variant="success">Terminé</Badge>
                      </TableCell>
                      <TableCell>L. Bernard</TableCell>
                      <TableCell>15/04/2023</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Process Flow Diagram</TableCell>
                      <TableCell>
                        <Badge variant="success">Terminé</Badge>
                      </TableCell>
                      <TableCell>C. Petit</TableCell>
                      <TableCell>18/04/2023</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Documents soumission</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer document
                </Button>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir dossier complet
                </Button>
              </div>
              <div className="rounded-md border p-4">
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-sm">PSW_A123_Rev01.pdf</li>
                  <li className="text-sm">Rapport_dimension_A123.pdf</li>
                  <li className="text-sm">Control_Plan_A123.pdf</li>
                  <li className="text-sm">Appearance_Approval_A123.pdf</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 405: // Production Validation Testing
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pvt-id">ID Test</Label>
                <Input id="pvt-id" placeholder="Ex: PVT-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pvt-date">Date</Label>
                <Input id="pvt-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pvt-responsible">Responsable</Label>
                <Input id="pvt-responsible" placeholder="Nom du responsable" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pvt-status">Statut</Label>
                <Select defaultValue="in-progress">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planifié</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="approved">Approuvé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Tests de validation</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter test
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead>Spécification</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Critères d'acceptation</TableHead>
                    <TableHead>Résultat</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Résistance mécanique</TableCell>
                    <TableCell>Min. 250 MPa</TableCell>
                    <TableCell>Test de traction</TableCell>
                    <TableCell>≥ 250 MPa</TableCell>
                    <TableCell>275 MPa</TableCell>
                    <TableCell>
                      <Badge variant="success">Validé</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Résistance thermique</TableCell>
                    <TableCell>-40°C à +120°C</TableCell>
                    <TableCell>Cycle thermique</TableCell>
                    <TableCell>Pas de déformation</TableCell>
                    <TableCell>Conforme</TableCell>
                    <TableCell>
                      <Badge variant="success">Validé</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Résistance chimique</TableCell>
                    <TableCell>Huile, carburant</TableCell>
                    <TableCell>Immersion 72h</TableCell>
                    <TableCell>Pas de dégradation</TableCell>
                    <TableCell>Légère décoloration</TableCell>
                    <TableCell>
                      <Badge variant="outline">Acceptable</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Durée de vie</TableCell>
                    <TableCell>10 ans / 500k cycles</TableCell>
                    <TableCell>Test accéléré</TableCell>
                    <TableCell>Pas de défaillance</TableCell>
                    <TableCell>En cours</TableCell>
                    <TableCell>
                      <Badge variant="secondary">En cours</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pvt-conclusion">Conclusion</Label>
              <Textarea
                id="pvt-conclusion"
                placeholder="Conclusion des tests de validation"
                rows={4}
                defaultValue="Le produit répond aux exigences de résistance mécanique et thermique. La résistance chimique est acceptable avec une légère décoloration qui n'affecte pas les performances. Le test de durée de vie est en cours et les résultats préliminaires sont positifs."
              />
            </div>

            <div className="space-y-2">
              <Label>Rapports de test</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer rapport
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 406: // Packaging Evaluation
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packaging-id">ID Évaluation</Label>
                <Input id="packaging-id" placeholder="Ex: PKG-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packaging-date">Date</Label>
                <Input id="packaging-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packaging-responsible">Responsable</Label>
                <Input id="packaging-responsible" placeholder="Nom du responsable" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packaging-status">Statut</Label>
                <Select defaultValue="completed">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planifiée</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                    <SelectItem value="approved">Approuvée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Tests d'emballage</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter test
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead>Spécification</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Critères d'acceptation</TableHead>
                    <TableHead>Résultat</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Chute</TableCell>
                    <TableCell>1.2m</TableCell>
                    <TableCell>Test de chute</TableCell>
                    <TableCell>Pas de dommage produit</TableCell>
                    <TableCell>Conforme</TableCell>
                    <TableCell>
                      <Badge variant="success">Validé</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Vibration</TableCell>
                    <TableCell>ASTM D4169</TableCell>
                    <TableCell>Test vibration</TableCell>
                    <TableCell>Pas de dommage emballage</TableCell>
                    <TableCell>Conforme</TableCell>
                    <TableCell>
                      <Badge variant="success">Validé</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Compression</TableCell>
                    <TableCell>500 kg</TableCell>
                    <TableCell>Test compression</TableCell>
                    <TableCell>Pas de déformation</TableCell>
                    <TableCell>Légère déformation</TableCell>
                    <TableCell>
                      <Badge variant="outline">Acceptable</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Climat</TableCell>
                    <TableCell>-20°C à +70°C</TableCell>
                    <TableCell>Cycle climatique</TableCell>
                    <TableCell>Pas de dégradation</TableCell>
                    <TableCell>Conforme</TableCell>
                    <TableCell>
                      <Badge variant="success">Validé</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label htmlFor="packaging-conclusion">Conclusion</Label>
              <Textarea
                id="packaging-conclusion"
                placeholder="Conclusion de l'évaluation d'emballage"
                rows={4}
                defaultValue="L'emballage répond aux exigences de protection du produit pendant le transport et le stockage. Une légère déformation a été observée lors du test de compression, mais elle reste dans les limites acceptables et n'affecte pas la protection du produit."
              />
            </div>

            <div className="space-y-2">
              <Label>Documents associés</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 407: // Production Control Plan
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="control-plan-id">ID Plan</Label>
                <Input id="control-plan-id" placeholder="Ex: CP-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="control-plan-version">Version</Label>
                <Input id="control-plan-version" placeholder="Ex: V1.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="control-plan-date">Date</Label>
                <Input id="control-plan-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="control-plan-responsible">Responsable</Label>
                <Input id="control-plan-responsible" placeholder="Nom du responsable" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Caractéristiques à surveiller</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter caractéristique
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Étape process</TableHead>
                    <TableHead>Caractéristique</TableHead>
                    <TableHead>Classification</TableHead>
                    <TableHead>Spécification</TableHead>
                    <TableHead>Méthode de contrôle</TableHead>
                    <TableHead>Fréquence</TableHead>
                    <TableHead>Taille échantillon</TableHead>
                    <TableHead>Méthode réaction</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Usinage</TableCell>
                    <TableCell>Diamètre</TableCell>
                    <TableCell>
                      <Badge variant="outline">Critique</Badge>
                    </TableCell>
                    <TableCell>25.2 ± 0.1 mm</TableCell>
                    <TableCell>Pied à coulisse</TableCell>
                    <TableCell>Toutes les heures</TableCell>
                    <TableCell>3 pièces</TableCell>
                    <TableCell>Arrêt production, tri 100%</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Assemblage</TableCell>
                    <TableCell>Couple serrage</TableCell>
                    <TableCell>
                      <Badge variant="outline">Significative</Badge>
                    </TableCell>
                    <TableCell>12 ± 1 Nm</TableCell>
                    <TableCell>Clé dynamométrique</TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell>Toutes</TableCell>
                    <TableCell>Reprise, formation opérateur</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Test final</TableCell>
                    <TableCell>Étanchéité</TableCell>
                    <TableCell>
                      <Badge variant="outline">Critique</Badge>
                    </TableCell>
                    <TableCell>Pas de fuite à 2 bar</TableCell>
                    <TableCell>Test pression</TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell>Toutes</TableCell>
                    <TableCell>Rebut, analyse cause</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label htmlFor="control-plan-notes">Notes</Label>
              <Textarea
                id="control-plan-notes"
                placeholder="Notes sur le plan de contrôle"
                rows={4}
                defaultValue="Ce plan de contrôle remplace la version préliminaire et intègre les améliorations identifiées lors des essais de production. Il a été validé par l'équipe qualité et production."
              />
            </div>

            <div className="space-y-2">
              <Label>Documents associés</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 408: // Quality Planning Sign-Off
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="signoff-id">ID Approbation</Label>
                <Input id="signoff-id" placeholder="Ex: QPS-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signoff-date">Date</Label>
                <Input id="signoff-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signoff-location">Lieu</Label>
                <Input id="signoff-location" placeholder="Lieu de la réunion" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signoff-status">Statut</Label>
                <Select defaultValue="in-progress">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planifiée</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                    <SelectItem value="approved">Approuvée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Participants</Label>
              <div className="flex flex-wrap gap-2">
                {teamMembers.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Checkbox id={`member-${member.id}`} />
                    <Label htmlFor={`member-${member.id}`}>{member.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Éléments à approuver</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élément</TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Commentaires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Plan de contrôle production</TableCell>
                    <TableCell>CP-2023-001</TableCell>
                    <TableCell>V1.0</TableCell>
                    <TableCell>
                      <Badge variant="success">Approuvé</Badge>
                    </TableCell>
                    <TableCell>Aucun</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rapport de capabilité</TableCell>
                    <TableCell>PPC-2023-001</TableCell>
                    <TableCell>V1.0</TableCell>
                    <TableCell>
                      <Badge variant="success">Approuvé</Badge>
                    </TableCell>
                    <TableCell>Action corrective pour couple serrage</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rapport MSA</TableCell>
                    <TableCell>MSA-2023-001</TableCell>
                    <TableCell>V1.0</TableCell>
                    <TableCell>
                      <Badge variant="outline">En revue</Badge>
                    </TableCell>
                    <TableCell>En attente de validation finale</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dossier PPAP</TableCell>
                    <TableCell>PPAP-2023-001</TableCell>
                    <TableCell>V1.0</TableCell>
                    <TableCell>
                      <Badge variant="outline">En revue</Badge>
                    </TableCell>
                    <TableCell>En attente de validation client</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signoff-conclusion">Conclusion</Label>
              <Textarea
                id="signoff-conclusion"
                placeholder="Conclusion de l'approbation"
                rows={4}
                defaultValue="La majorité des éléments du plan qualité ont été approuvés. Le rapport MSA et le dossier PPAP sont en cours de revue finale. L'équipe projet a démontré que le produit et le processus de fabrication répondent aux exigences spécifiées."
              />
            </div>

            <div className="space-y-2">
              <Label>Signatures</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {teamMembers.slice(0, 3).map((member) => (
                  <div key={member.id} className="border rounded-md p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="h-16 border-dashed border-2 rounded-md flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Signature</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <p>Sélectionnez un processus pour afficher son formulaire</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phase 4: Validation Produit & Process</h1>
          <p className="text-muted-foreground mt-1">
            Validation du produit et du processus de fabrication avant la production en série.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Aperçu
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Process list */}
        <div className="lg:col-span-1">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Processus</CardTitle>
                <Badge variant="outline" className="font-normal">
                  {filteredProcesses.length} / {phase4Processes.length}
                </Badge>
              </div>
              <CardDescription>Progression globale: {phase4?.progress || 0}%</CardDescription>
              <Progress value={phase4?.progress || 0} className="h-2" />
            </CardHeader>
            <CardContent className="pb-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Statut</Label>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger>
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
                      <div className="space-y-2">
                        <Label>Responsable</Label>
                        <Select value={filterOwner} onValueChange={setFilterOwner}>
                          <SelectTrigger>
                            <SelectValue placeholder="Tous les responsables" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les responsables</SelectItem>
                            {teamMembers.map((member) => (
                              <SelectItem key={member.id} value={member.id.toString()}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="show-completed"
                          checked={showCompleted}
                          onCheckedChange={(checked) => setShowCompleted(checked as boolean)}
                        />
                        <Label htmlFor="show-completed">Afficher les processus terminés</Label>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="px-6 pb-6 space-y-2">
                {filteredProcesses.length > 0 ? (
                  filteredProcesses.map((process) => (
                    <div
                      key={process.id}
                      className={`p-3 rounded-md cursor-pointer transition-all hover:bg-gray-50
                        ${
                          process.status === "completed"
                            ? "bg-green-50 border border-green-100"
                            : process.status === "in-progress"
                              ? "bg-blue-50 border border-blue-100"
                              : process.status === "overdue"
                                ? "bg-red-50 border border-red-100"
                                : "bg-gray-100 border border-gray-200"
                        }
                        ${selectedProcess === process.id ? "ring-2 ring-primary" : ""}
                      `}
                      onClick={() => setSelectedProcess(process.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getStatusIcon(process.status)}
                          <span className="ml-2 text-sm font-medium">{process.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarFallback className="text-[10px]">{process.owner.initials}</AvatarFallback>
                          </Avatar>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progression: {process.progress}%</span>
                          <span>
                            {process.dueDate ? new Date(process.dueDate).toLocaleDateString() : "Non définie"}
                          </span>
                        </div>
                        <Progress value={process.progress} className="h-1 mt-1" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Aucun processus trouvé</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="details">Détails du processus</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Vue d'ensemble de la Phase 4</CardTitle>
                  <CardDescription>
                    Progression et statut des processus de la phase "Validation Produit & Process"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Progression globale</h3>
                      <div className="flex items-center mb-1">
                        <Progress value={phase4?.progress || 0} className="h-2 flex-1 mr-2" />
                        <span>{phase4?.progress || 0}%</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        <div className="bg-green-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">Terminés</p>
                          <p className="text-xl font-bold text-green-600">
                            {phase4Processes.filter((p) => p.status === "completed").length}
                          </p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">En cours</p>
                          <p className="text-xl font-bold text-blue-600">
                            {phase4Processes.filter((p) => p.status === "in-progress").length}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">Non démarrés</p>
                          <p className="text-xl font-bold text-gray-600">
                            {phase4Processes.filter((p) => p.status === "not-started").length}
                          </p>
                        </div>
                        <div className="bg-red-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">En retard</p>
                          <p className="text-xl font-bold text-red-600">
                            {phase4Processes.filter((p) => p.status === "overdue").length}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Responsables</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers.slice(0, 4).map((member) => {
                          const memberProcesses = phase4Processes.filter((p) => p.owner.id === member.id)
                          if (memberProcesses.length === 0) return null

                          return (
                            <div key={member.id} className="flex items-start space-x-3 p-3 border rounded-md">
                              <Avatar>
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback>{member.initials}</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                                <div className="flex items-center space-x-2 text-xs">
                                  <span className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                    {memberProcesses.filter((p) => p.status === "completed").length}
                                  </span>
                                  <span className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                                    {memberProcesses.filter((p) => p.status === "in-progress").length}
                                  </span>
                                  <span className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
                                    {memberProcesses.filter((p) => p.status === "not-started").length}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Prochaines échéances</h3>
                      <div className="space-y-2">
                        {phase4Processes
                          .filter((p) => p.status !== "completed")
                          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                          .slice(0, 3)
                          .map((process) => (
                            <div
                              key={process.id}
                              className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                              onClick={() => {
                                setSelectedProcess(process.id)
                                setActiveTab("details")
                              }}
                            >
                              <div className="flex items-center">
                                {getStatusIcon(process.status)}
                                <div className="ml-3">
                                  <p className="font-medium">{process.name}</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <User className="h-3 w-3 mr-1" />
                                    <span>{process.owner.name}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="text-right mr-2">
                                  <p className="text-sm font-medium">
                                    {process.dueDate ? new Date(process.dueDate).toLocaleDateString() : "Non définie"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{process.progress}% terminé</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Voir tous les processus
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              {selectedProcess ? (
                <>
                  {getSelectedProcessDetails()}

                  <Card className="border shadow-sm">
                    <CardHeader>
                      <CardTitle>Formulaire du processus</CardTitle>
                      <CardDescription>Complétez les informations requises pour ce processus</CardDescription>
                    </CardHeader>
                    <CardContent>{renderProcessForm(selectedProcess)}</CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <Button variant="outline">Annuler</Button>
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              ) : (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-muted-foreground">Sélectionnez un processus dans la liste pour voir ses détails</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
