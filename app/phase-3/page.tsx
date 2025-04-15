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

// Get Phase 3 data from the APQP phases
const phase3 = apqpPhases.find((phase) => phase.id === 3)
const phase3Processes = phase3?.subprocesses || []

export default function Phase3Page() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterOwner, setFilterOwner] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCompleted, setShowCompleted] = useState(true)

  // Filter processes based on selected filters
  const filteredProcesses = phase3Processes.filter((process) => {
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

    const process = phase3Processes.find((p) => p.id === selectedProcess)
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
    const process = phase3Processes.find((p) => p.id === processId)
    if (!process) return null

    switch (processId) {
      case 301: // Packaging Standards and Specifications
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packaging-id">ID Document</Label>
                <Input id="packaging-id" placeholder="Ex: PKG-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packaging-version">Version</Label>
                <Input id="packaging-version" placeholder="Ex: V1.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packaging-date">Date de création</Label>
                <Input id="packaging-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="packaging-responsible">Responsable</Label>
                <Input id="packaging-responsible" placeholder="Nom du responsable" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="packaging-requirements">Exigences d'emballage</Label>
              <Textarea id="packaging-requirements" placeholder="Décrivez les exigences d'emballage" rows={4} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Types d'emballage</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter type
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Dimensions</TableHead>
                    <TableHead>Matériau</TableHead>
                    <TableHead>Quantité par unité</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Carton individuel</TableCell>
                    <TableCell>Emballage unitaire</TableCell>
                    <TableCell>200x150x100 mm</TableCell>
                    <TableCell>Carton ondulé</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Carton groupé</TableCell>
                    <TableCell>Emballage de transport</TableCell>
                    <TableCell>600x400x300 mm</TableCell>
                    <TableCell>Carton double cannelure</TableCell>
                    <TableCell>10</TableCell>
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
              <Label>Documents d'emballage</Label>
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

      case 302: // Product/Process Quality System Review
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quality-review-id">ID Revue</Label>
                <Input id="quality-review-id" placeholder="Ex: QSR-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quality-review-date">Date de revue</Label>
                <Input id="quality-review-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quality-review-team">Équipe de revue</Label>
                <Input id="quality-review-team" placeholder="Membres de l'équipe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quality-review-location">Lieu</Label>
                <Input id="quality-review-location" placeholder="Lieu de la revue" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Éléments du système qualité</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élément</TableHead>
                    <TableHead>Exigence</TableHead>
                    <TableHead>Conformité</TableHead>
                    <TableHead>Commentaires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Procédures de contrôle</TableCell>
                    <TableCell>ISO 9001:2015 § 8.5.1</TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliant">Conforme</SelectItem>
                          <SelectItem value="partial">Partiellement conforme</SelectItem>
                          <SelectItem value="non-compliant">Non conforme</SelectItem>
                          <SelectItem value="na">Non applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Commentaires" />
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Traçabilité</TableCell>
                    <TableCell>ISO 9001:2015 § 8.5.2</TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliant">Conforme</SelectItem>
                          <SelectItem value="partial">Partiellement conforme</SelectItem>
                          <SelectItem value="non-compliant">Non conforme</SelectItem>
                          <SelectItem value="na">Non applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Commentaires" />
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Maîtrise des non-conformités</TableCell>
                    <TableCell>ISO 9001:2015 § 8.7</TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliant">Conforme</SelectItem>
                          <SelectItem value="partial">Partiellement conforme</SelectItem>
                          <SelectItem value="non-compliant">Non conforme</SelectItem>
                          <SelectItem value="na">Non applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Commentaires" />
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
              <Label htmlFor="quality-review-conclusion">Conclusion</Label>
              <Textarea
                id="quality-review-conclusion"
                placeholder="Conclusion de la revue du système qualité"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Actions correctives</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="action-description">Description</Label>
                  <Input id="action-description" placeholder="Description de l'action" />
                </div>
                <div>
                  <Label htmlFor="action-responsible">Responsable</Label>
                  <Input id="action-responsible" placeholder="Responsable de l'action" />
                </div>
                <div>
                  <Label htmlFor="action-due-date">Échéance</Label>
                  <Input id="action-due-date" type="date" />
                </div>
              </div>
              <Button className="mt-2">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter action
              </Button>
            </div>
          </div>
        )

      case 303: // Process Flow Chart
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="process-flow-id">ID Synoptique</Label>
                <Input id="process-flow-id" placeholder="Ex: PFC-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="process-flow-version">Version</Label>
                <Input id="process-flow-version" placeholder="Ex: V1.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="process-flow-date">Date de création</Label>
                <Input id="process-flow-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="process-flow-responsible">Responsable</Label>
                <Input id="process-flow-responsible" placeholder="Nom du responsable" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Étapes du process</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter étape
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N°</TableHead>
                    <TableHead>Étape</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Équipement</TableHead>
                    <TableHead>Paramètres clés</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>10</TableCell>
                    <TableCell>Réception matière</TableCell>
                    <TableCell>Contrôle visuel et documentaire</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Conformité certificat</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>20</TableCell>
                    <TableCell>Usinage</TableCell>
                    <TableCell>Usinage CNC des composants</TableCell>
                    <TableCell>Centre d'usinage XYZ</TableCell>
                    <TableCell>Vitesse, avance, température</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>30</TableCell>
                    <TableCell>Contrôle dimensionnel</TableCell>
                    <TableCell>Vérification des cotes critiques</TableCell>
                    <TableCell>MMT</TableCell>
                    <TableCell>Précision ±0.01mm</TableCell>
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
              <Label>Diagramme de flux</Label>
              <div className="rounded-md border p-4 flex items-center justify-center h-80 bg-gray-50">
                <div className="text-center">
                  <Button variant="outline" className="mb-2">
                    <FileUp className="mr-2 h-4 w-4" />
                    Importer diagramme
                  </Button>
                  <p className="text-sm text-muted-foreground">Formats acceptés: PDF, PNG, VSDX</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 304: // Floor Plan Layout
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="floor-plan-id">ID Plan</Label>
                <Input id="floor-plan-id" placeholder="Ex: FPL-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor-plan-version">Version</Label>
                <Input id="floor-plan-version" placeholder="Ex: V1.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor-plan-date">Date de création</Label>
                <Input id="floor-plan-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor-plan-responsible">Responsable</Label>
                <Input id="floor-plan-responsible" placeholder="Nom du responsable" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Plan d'implantation</Label>
              <div className="rounded-md border p-4 flex items-center justify-center h-80 bg-gray-50">
                <div className="text-center">
                  <Button variant="outline" className="mb-2">
                    <FileUp className="mr-2 h-4 w-4" />
                    Importer plan
                  </Button>
                  <p className="text-sm text-muted-foreground">Formats acceptés: PDF, DWG, PNG</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="floor-plan-description">Description</Label>
              <Textarea id="floor-plan-description" placeholder="Description du plan d'implantation" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Zones de production</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="zone-name">Nom de la zone</Label>
                  <Input id="zone-name" placeholder="Ex: Zone d'assemblage" />
                </div>
                <div>
                  <Label htmlFor="zone-area">Surface (m²)</Label>
                  <Input id="zone-area" type="number" placeholder="Ex: 50" />
                </div>
                <div className="flex items-end">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 305: // Characteristics Matrix
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="matrix-id">ID Matrice</Label>
                <Input id="matrix-id" placeholder="Ex: CM-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="matrix-version">Version</Label>
                <Input id="matrix-version" placeholder="Ex: V1.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="matrix-date">Date de création</Label>
                <Input id="matrix-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="matrix-responsible">Responsable</Label>
                <Input id="matrix-responsible" placeholder="Nom du responsable" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Matrice des caractéristiques</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter caractéristique
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Caractéristique</TableHead>
                    <TableHead>Classification</TableHead>
                    <TableHead>Spécification</TableHead>
                    <TableHead>Méthode de contrôle</TableHead>
                    <TableHead>Étape process</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Diamètre</TableCell>
                    <TableCell>
                      <Badge variant="outline">Critique</Badge>
                    </TableCell>
                    <TableCell>25.2 ± 0.1 mm</TableCell>
                    <TableCell>Pied à coulisse</TableCell>
                    <TableCell>Usinage</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rugosité</TableCell>
                    <TableCell>
                      <Badge variant="outline">Significative</Badge>
                    </TableCell>
                    <TableCell>Ra 1.6</TableCell>
                    <TableCell>Rugosimètre</TableCell>
                    <TableCell>Usinage</TableCell>
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
              <Label>Importer matrice existante</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer fichier
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: XLSX, PDF</span>
              </div>
            </div>
          </div>
        )

      case 306: // Process FMEA
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pfmea-id">ID PFMEA</Label>
                <Input id="pfmea-id" placeholder="Ex: PFMEA-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pfmea-process">Process</Label>
                <Input id="pfmea-process" placeholder="Nom du process" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pfmea-team">Équipe PFMEA</Label>
                <Input id="pfmea-team" placeholder="Membres de l'équipe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pfmea-date">Date de création</Label>
                <Input id="pfmea-date" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Document PFMEA</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un mode de défaillance
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Étape process</TableHead>
                    <TableHead>Mode de défaillance</TableHead>
                    <TableHead>Effet</TableHead>
                    <TableHead>Sévérité (S)</TableHead>
                    <TableHead>Cause</TableHead>
                    <TableHead>Occurrence (O)</TableHead>
                    <TableHead>Contrôles</TableHead>
                    <TableHead>Détection (D)</TableHead>
                    <TableHead>RPN</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Usinage</TableCell>
                    <TableCell>Dimension hors tolérance</TableCell>
                    <TableCell>Non-conformité produit</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>Usure outil</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>Contrôle dimensionnel</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell className="font-bold">84</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Assemblage</TableCell>
                    <TableCell>Composant manquant</TableCell>
                    <TableCell>Défaillance fonctionnelle</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>Erreur opérateur</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>Contrôle visuel</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell className="font-bold">96</TableCell>
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
              <Label>Importer PFMEA existant</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer fichier
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: XLSX, PDF</span>
              </div>
            </div>
          </div>
        )

      case 307: // Pre-Launch Control Plan
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prelaunch-id">ID Plan</Label>
                <Input id="prelaunch-id" placeholder="Ex: PLCP-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prelaunch-version">Version</Label>
                <Input id="prelaunch-version" placeholder="Ex: V1.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prelaunch-date">Date de création</Label>
                <Input id="prelaunch-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prelaunch-responsible">Responsable</Label>
                <Input id="prelaunch-responsible" placeholder="Nom du responsable" />
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
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label>Importer plan existant</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer fichier
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: XLSX, PDF</span>
              </div>
            </div>
          </div>
        )

      case 308: // Process Instructions
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Instructions de travail</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle instruction
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Étape process</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Date création</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>WI-001</TableCell>
                    <TableCell>Usinage</TableCell>
                    <TableCell>Programmation CNC</TableCell>
                    <TableCell>1.2</TableCell>
                    <TableCell>15/03/2023</TableCell>
                    <TableCell>
                      <Badge variant="success">Validée</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>WI-002</TableCell>
                    <TableCell>Assemblage</TableCell>
                    <TableCell>Montage composants</TableCell>
                    <TableCell>1.0</TableCell>
                    <TableCell>20/03/2023</TableCell>
                    <TableCell>
                      <Badge variant="outline">En revue</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Détails de l'instruction - WI-001: Programmation CNC</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ID</Label>
                    <Input value="WI-001" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Version</Label>
                    <Input value="1.2" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Étape process</Label>
                    <Input value="Usinage" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Équipement</Label>
                    <Input value="Centre d'usinage XYZ" readOnly />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value="Cette instruction détaille les étapes de programmation du centre d'usinage CNC pour la fabrication des composants A-123."
                    readOnly
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Étapes</Label>
                  <div className="rounded-md border p-4">
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Vérifier la disponibilité du programme CNC-A123-V1.2</li>
                      <li>Charger le programme dans la machine</li>
                      <li>
                        Vérifier les paramètres d'usinage:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Vitesse de rotation: 1200 tr/min</li>
                          <li>Avance: 300 mm/min</li>
                          <li>Profondeur de passe: 0.5 mm max</li>
                        </ul>
                      </li>
                      <li>Installer l'outillage spécifié dans le porte-outil</li>
                      <li>Vérifier l'alignement de la pièce brute</li>
                      <li>Lancer le programme et surveiller le premier cycle</li>
                      <li>Contrôler la première pièce avant de lancer la série</li>
                    </ol>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Images & Documents</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-2">
                      <div className="aspect-video bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">setup_machine.jpg</span>
                      </div>
                      <p className="text-xs text-center">Configuration machine</p>
                    </div>
                    <div className="border rounded-md p-2">
                      <div className="aspect-video bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">tool_setup.jpg</span>
                      </div>
                      <p className="text-xs text-center">Installation outils</p>
                    </div>
                    <div className="border rounded-md p-2">
                      <div className="aspect-video bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">program_screen.jpg</span>
                      </div>
                      <p className="text-xs text-center">Écran programmation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 309: // Measurement System Analysis Plan
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="msa-id">ID Plan MSA</Label>
                <Input id="msa-id" placeholder="Ex: MSA-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msa-version">Version</Label>
                <Input id="msa-version" placeholder="Ex: V1.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msa-date">Date de création</Label>
                <Input id="msa-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="msa-responsible">Responsable</Label>
                <Input id="msa-responsible" placeholder="Nom du responsable" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Études MSA planifiées</Label>
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
                    <TableHead>Date prévue</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Diamètre intérieur</TableCell>
                    <TableCell>Pied à coulisse digital</TableCell>
                    <TableCell>GR&R</TableCell>
                    <TableCell>15/05/2023</TableCell>
                    <TableCell>J. Dupont</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Planifiée</Badge>
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
                    <TableCell>20/05/2023</TableCell>
                    <TableCell>M. Martin</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Planifiée</Badge>
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
                    <TableCell>25/05/2023</TableCell>
                    <TableCell>L. Bernard</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Planifiée</Badge>
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
              <Label htmlFor="msa-methodology">Méthodologie</Label>
              <Textarea
                id="msa-methodology"
                placeholder="Décrivez la méthodologie utilisée pour les études MSA"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="msa-criteria">Critères d'acceptation</Label>
              <Textarea
                id="msa-criteria"
                placeholder="Définissez les critères d'acceptation pour les études MSA"
                rows={4}
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

      case 310: // Preliminary Process Capability Study Plan
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capability-id">ID Plan</Label>
                <Input id="capability-id" placeholder="Ex: PPC-2023-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capability-version">Version</Label>
                <Input id="capability-version" placeholder="Ex: V1.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capability-date">Date de création</Label>
                <Input id="capability-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capability-responsible">Responsable</Label>
                <Input id="capability-responsible" placeholder="Nom du responsable" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Études de capabilité planifiées</Label>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter étude
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Caractéristique</TableHead>
                    <TableHead>Spécification</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Taille échantillon</TableHead>
                    <TableHead>Date prévue</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Diamètre</TableCell>
                    <TableCell>25.2 ± 0.1 mm</TableCell>
                    <TableCell>Pp/Ppk</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>20/05/2023</TableCell>
                    <TableCell>J. Dupont</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Couple serrage</TableCell>
                    <TableCell>12 ± 1 Nm</TableCell>
                    <TableCell>Pp/Ppk</TableCell>
                    <TableCell>30</TableCell>
                    <TableCell>25/05/2023</TableCell>
                    <TableCell>M. Martin</TableCell>
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
              <Label htmlFor="capability-methodology">Méthodologie</Label>
              <Textarea
                id="capability-methodology"
                placeholder="Décrivez la méthodologie utilisée pour les études de capabilité"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capability-criteria">Critères d'acceptation</Label>
              <Textarea
                id="capability-criteria"
                placeholder="Définissez les critères d'acceptation pour les études de capabilité"
                rows={4}
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

      case 311: // Management Support
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="support-date">Date de revue</Label>
                <Input id="support-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-location">Lieu</Label>
                <Input id="support-location" placeholder="Lieu de la revue" />
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
              <Label htmlFor="support-resources">Ressources nécessaires</Label>
              <Textarea
                id="support-resources"
                placeholder="Détaillez les ressources nécessaires pour le projet"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-risks">Risques identifiés</Label>
              <Textarea id="support-risks" placeholder="Identifiez les risques potentiels du projet" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-mitigation">Stratégies d'atténuation</Label>
              <Textarea
                id="support-mitigation"
                placeholder="Décrivez les stratégies d'atténuation des risques"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-commitment">Engagement de la direction</Label>
              <Textarea
                id="support-commitment"
                placeholder="Documentez l'engagement de la direction pour le projet"
                rows={4}
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
          <h1 className="text-3xl font-bold tracking-tight">Phase 3: Conception & Développement Process</h1>
          <p className="text-muted-foreground mt-1">
            Conception du processus de fabrication, vérification et validation des méthodes.
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
                  {filteredProcesses.length} / {phase3Processes.length}
                </Badge>
              </div>
              <CardDescription>Progression globale: {phase3?.progress || 0}%</CardDescription>
              <Progress value={phase3?.progress || 0} className="h-2" />
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
                  <CardTitle>Vue d'ensemble de la Phase 3</CardTitle>
                  <CardDescription>
                    Progression et statut des processus de la phase "Conception & Développement Process"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Progression globale</h3>
                      <div className="flex items-center mb-1">
                        <Progress value={phase3?.progress || 0} className="h-2 flex-1 mr-2" />
                        <span>{phase3?.progress || 0}%</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        <div className="bg-green-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">Terminés</p>
                          <p className="text-xl font-bold text-green-600">
                            {phase3Processes.filter((p) => p.status === "completed").length}
                          </p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">En cours</p>
                          <p className="text-xl font-bold text-blue-600">
                            {phase3Processes.filter((p) => p.status === "in-progress").length}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">Non démarrés</p>
                          <p className="text-xl font-bold text-gray-600">
                            {phase3Processes.filter((p) => p.status === "not-started").length}
                          </p>
                        </div>
                        <div className="bg-red-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">En retard</p>
                          <p className="text-xl font-bold text-red-600">
                            {phase3Processes.filter((p) => p.status === "overdue").length}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Responsables</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers.slice(0, 4).map((member) => {
                          const memberProcesses = phase3Processes.filter((p) => p.owner.id === member.id)
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
                        {phase3Processes
                          .filter((p) => p.status !== "completed")
                          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                          .slice(0, 3)
                          .map((process) => (
                            <div key={process.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center">
                                <div className="mr-3">{getStatusIcon(process.status)}</div>
                                <div>
                                  <p className="font-medium">{process.name}</p>
                                  <p className="text-xs text-muted-foreground">Responsable: {process.owner.name}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  {process.dueDate ? new Date(process.dueDate).toLocaleDateString() : "Non définie"}
                                </p>
                                <p className="text-xs text-muted-foreground">Échéance</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Documents récents</h3>
                      <div className="space-y-2">
                        {phase3Processes
                          .flatMap((p) => p.documents || [])
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .slice(0, 5)
                          .map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center">
                                {getDocumentIcon(doc.type)}
                                <span className="ml-2 text-blue-500 hover:underline cursor-pointer">{doc.name}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span>{new Date(doc.date).toLocaleDateString()}</span>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              {selectedProcess ? (
                <>
                  {getSelectedProcessDetails()}
                  <Card className="border shadow-sm">
                    <CardHeader>
                      <CardTitle>Formulaire du processus</CardTitle>
                    </CardHeader>
                    <CardContent>{renderProcessForm(selectedProcess)}</CardContent>
                    <CardFooter className="flex justify-end border-t pt-4">
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Sauvegarder
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              ) : (
                <Card className="border shadow-sm">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Sélectionnez un processus</h3>
                      <p className="text-muted-foreground">
                        Veuillez sélectionner un processus dans la liste pour afficher ses détails.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
