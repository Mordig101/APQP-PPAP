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

// Get Phase 1 data from the APQP phases
const phase1 = apqpPhases.find((phase) => phase.id === 1)
const phase1Processes = phase1?.subprocesses || []

export default function Phase1Page() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterOwner, setFilterOwner] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCompleted, setShowCompleted] = useState(true)

  // Filter processes based on selected filters
  const filteredProcesses = phase1Processes.filter((process) => {
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

    const process = phase1Processes.find((p) => p.id === selectedProcess)
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
    const process = phase1Processes.find((p) => p.id === processId)
    if (!process) return null

    switch (processId) {
      case 101: // Voice of the Customer
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Nom du client</Label>
                <Input id="customer-name" placeholder="Entrez le nom du client" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-name">Nom du projet</Label>
                <Input id="project-name" placeholder="Entrez le nom du projet" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-requirements">Exigences client</Label>
              <Textarea id="customer-requirements" placeholder="Listez les exigences principales du client" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benchmark-data">Données de benchmark</Label>
              <Textarea id="benchmark-data" placeholder="Entrez les données de benchmark pertinentes" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Documents de référence</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer un document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="market-feedback">Retours d'expérience / Études de marché</Label>
              <Textarea
                id="market-feedback"
                placeholder="Entrez les retours d'expérience ou données d'études de marché"
                rows={4}
              />
            </div>
          </div>
        )

      case 102: // Business Plan/Marketing Strategy
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business-objectives">Objectifs commerciaux</Label>
              <Textarea
                id="business-objectives"
                placeholder="Définissez les objectifs commerciaux du projet"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="market-analysis">Analyse de marché</Label>
              <Textarea id="market-analysis" placeholder="Entrez l'analyse de marché pour ce produit" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-customers">Clients cibles</Label>
              <Textarea id="target-customers" placeholder="Décrivez les clients cibles pour ce produit" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Documents stratégiques</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer un document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX, PPTX</span>
              </div>
            </div>
          </div>
        )

      case 103: // Product/Process Benchmark Data
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="competitor-analysis">Analyse des concurrents</Label>
              <Textarea id="competitor-analysis" placeholder="Entrez l'analyse des produits concurrents" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry-standards">Normes de l'industrie</Label>
              <Textarea
                id="industry-standards"
                placeholder="Listez les normes et standards de l'industrie applicables"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="performance-metrics">Métriques de performance</Label>
              <Textarea id="performance-metrics" placeholder="Définissez les métriques de performance clés" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Documents de benchmark</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer un document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, XLSX, CSV</span>
              </div>
            </div>
          </div>
        )

      case 104: // Product/Process Assumptions
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-assumptions">Hypothèses produit</Label>
              <Textarea id="product-assumptions" placeholder="Listez les hypothèses concernant le produit" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="process-assumptions">Hypothèses processus</Label>
              <Textarea
                id="process-assumptions"
                placeholder="Listez les hypothèses concernant le processus de fabrication"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="constraints">Contraintes</Label>
              <Textarea id="constraints" placeholder="Identifiez les contraintes connues" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="risks">Risques</Label>
              <Textarea id="risks" placeholder="Identifiez les risques potentiels" rows={4} />
            </div>
          </div>
        )

      case 105: // Product Reliability Studies
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reliability-requirements">Exigences de fiabilité</Label>
              <Textarea
                id="reliability-requirements"
                placeholder="Définissez les exigences de fiabilité du produit"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-methods">Méthodes de test</Label>
              <Textarea id="test-methods" placeholder="Décrivez les méthodes de test de fiabilité" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reliability-targets">Objectifs de fiabilité</Label>
              <Textarea
                id="reliability-targets"
                placeholder="Définissez les objectifs de fiabilité quantifiables"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Rapports d'études</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer un rapport
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 106: // Customer Inputs
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer-feedback">Retours client</Label>
              <Textarea id="customer-feedback" placeholder="Documentez les retours des clients" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-specifications">Spécifications client</Label>
              <Textarea
                id="customer-specifications"
                placeholder="Listez les spécifications fournies par le client"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-expectations">Attentes client</Label>
              <Textarea
                id="customer-expectations"
                placeholder="Documentez les attentes exprimées par le client"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Documents client</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer un document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 107: // Design Goals
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="functional-goals">Objectifs fonctionnels</Label>
              <Textarea id="functional-goals" placeholder="Définissez les objectifs fonctionnels du produit" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="performance-goals">Objectifs de performance</Label>
              <Textarea
                id="performance-goals"
                placeholder="Définissez les objectifs de performance du produit"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="design-constraints">Contraintes de conception</Label>
              <Textarea id="design-constraints" placeholder="Identifiez les contraintes de conception" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Documents de conception</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer un document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, CAD</span>
              </div>
            </div>
          </div>
        )

      case 108: // Reliability and Quality Goals
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reliability-goals">Objectifs de fiabilité</Label>
              <Textarea
                id="reliability-goals"
                placeholder="Définissez les objectifs de fiabilité du produit"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality-goals">Objectifs de qualité</Label>
              <Textarea id="quality-goals" placeholder="Définissez les objectifs de qualité du produit" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality-metrics">Métriques de qualité</Label>
              <Textarea id="quality-metrics" placeholder="Définissez les métriques de qualité mesurables" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Documents qualité</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer un document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 109: // Preliminary Bill of Material
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Importer nomenclature</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer Excel/CSV
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: XLSX, CSV</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ajouter composant manuellement</Label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="part-number">Référence</Label>
                  <Input id="part-number" placeholder="Référence" />
                </div>
                <div>
                  <Label htmlFor="part-name">Désignation</Label>
                  <Input id="part-name" placeholder="Désignation" />
                </div>
                <div>
                  <Label htmlFor="part-quantity">Quantité</Label>
                  <Input id="part-quantity" placeholder="Quantité" type="number" />
                </div>
                <div className="flex items-end">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="text-center text-muted-foreground">
                Aucun composant ajouté. Veuillez importer une nomenclature ou ajouter des composants manuellement.
              </div>
            </div>
          </div>
        )

      case 110: // Preliminary Process Flow Chart
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Importer synoptique</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer fichier
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, VSDX, PNG, JPG</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Créer synoptique</Label>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Créer nouveau synoptique
              </Button>
            </div>

            <div className="border rounded-md p-4">
              <div className="text-center text-muted-foreground">
                Aucun synoptique importé. Veuillez importer un fichier ou créer un nouveau synoptique.
              </div>
            </div>
          </div>
        )

      case 111: // Preliminary Listing of Special Product and Process Characteristics
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Caractéristiques spéciales</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="characteristic-name">Caractéristique</Label>
                  <Input id="characteristic-name" placeholder="Nom de la caractéristique" />
                </div>
                <div>
                  <Label htmlFor="characteristic-type">Type</Label>
                  <Select>
                    <SelectTrigger id="characteristic-type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="safety">Sécurité</SelectItem>
                      <SelectItem value="regulatory">Réglementaire</SelectItem>
                      <SelectItem value="functional">Fonctionnelle</SelectItem>
                      <SelectItem value="critical">Critique</SelectItem>
                      <SelectItem value="significant">Significative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div className="text-center text-muted-foreground">
                Aucune caractéristique spéciale définie. Utilisez le formulaire ci-dessus pour ajouter des
                caractéristiques.
              </div>
            </div>
          </div>
        )

      case 112: // Product Assurance Plan
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quality-objectives">Objectifs qualité</Label>
              <Textarea id="quality-objectives" placeholder="Définissez les objectifs qualité du produit" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verification-methods">Méthodes de vérification</Label>
              <Textarea
                id="verification-methods"
                placeholder="Décrivez les méthodes de vérification prévues"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validation-methods">Méthodes de validation</Label>
              <Textarea id="validation-methods" placeholder="Décrivez les méthodes de validation prévues" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inspection-plan">Plan d'inspection</Label>
              <Textarea id="inspection-plan" placeholder="Décrivez le plan d'inspection préliminaire" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Documents du plan d'assurance</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer un document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
              </div>
            </div>
          </div>
        )

      case 113: // Management Support
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resource-requirements">Besoins en ressources</Label>
              <Textarea
                id="resource-requirements"
                placeholder="Détaillez les ressources nécessaires pour le projet"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="management-commitment">Engagement de la direction</Label>
              <Textarea
                id="management-commitment"
                placeholder="Documentez l'engagement de la direction pour le projet"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-risks">Risques du projet</Label>
              <Textarea id="project-risks" placeholder="Identifiez les risques potentiels du projet" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mitigation-strategies">Stratégies d'atténuation</Label>
              <Textarea
                id="mitigation-strategies"
                placeholder="Décrivez les stratégies d'atténuation des risques"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Documents de support</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileUp className="mr-2 h-4 w-4" />
                  Importer un document
                </Button>
                <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, PPTX</span>
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
          <h1 className="text-3xl font-bold tracking-tight">Phase 1: Plan & Define</h1>
          <p className="text-muted-foreground mt-1">
            Définition des objectifs du projet, des exigences du client et planification initiale.
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
                  {filteredProcesses.length} / {phase1Processes.length}
                </Badge>
              </div>
              <CardDescription>Progression globale: {phase1?.progress || 0}%</CardDescription>
              <Progress value={phase1?.progress || 0} className="h-2" />
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
                  <CardTitle>Vue d'ensemble de la Phase 1</CardTitle>
                  <CardDescription>Progression et statut des processus de la phase "Plan & Define"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Progression globale</h3>
                      <div className="flex items-center mb-1">
                        <Progress value={phase1?.progress || 0} className="h-2 flex-1 mr-2" />
                        <span>{phase1?.progress || 0}%</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        <div className="bg-green-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">Terminés</p>
                          <p className="text-xl font-bold text-green-600">
                            {phase1Processes.filter((p) => p.status === "completed").length}
                          </p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">En cours</p>
                          <p className="text-xl font-bold text-blue-600">
                            {phase1Processes.filter((p) => p.status === "in-progress").length}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">Non démarrés</p>
                          <p className="text-xl font-bold text-gray-600">
                            {phase1Processes.filter((p) => p.status === "not-started").length}
                          </p>
                        </div>
                        <div className="bg-red-50 p-2 rounded-md text-center">
                          <p className="text-sm text-muted-foreground">En retard</p>
                          <p className="text-xl font-bold text-red-600">
                            {phase1Processes.filter((p) => p.status === "overdue").length}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Responsables</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers.slice(0, 4).map((member) => {
                          const memberProcesses = phase1Processes.filter((p) => p.owner.id === member.id)
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
                        {phase1Processes
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
