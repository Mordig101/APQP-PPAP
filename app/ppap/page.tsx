import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileUp, Plus, Search, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export default function PpapPage() {
  const ppapDossiers = [
    {
      id: "PPAP-001",
      project: "Composant A-123",
      client: "Automotive Corp",
      level: 3,
      status: "En cours",
      submissionDate: "15/05/2023",
      approvalDate: "-",
    },
    {
      id: "PPAP-002",
      project: "Système B-456",
      client: "Aero Industries",
      level: 4,
      status: "Soumis",
      submissionDate: "22/04/2023",
      approvalDate: "-",
    },
    {
      id: "PPAP-003",
      project: "Module C-789",
      client: "Medical Devices Inc",
      level: 2,
      status: "Approuvé",
      submissionDate: "10/03/2023",
      approvalDate: "25/03/2023",
    },
    {
      id: "PPAP-004",
      project: "Assemblage D-012",
      client: "Automotive Corp",
      level: 5,
      status: "Rejeté",
      submissionDate: "05/04/2023",
      approvalDate: "-",
    },
    {
      id: "PPAP-005",
      project: "Composant E-345",
      client: "Electronics Ltd",
      level: 3,
      status: "En préparation",
      submissionDate: "-",
      approvalDate: "-",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dossiers PPAP</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau dossier PPAP
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des dossiers PPAP</CardTitle>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Rechercher..." 
                className="w-[250px]" 
                icon={<Search className="h-4 w-4 text-muted-foreground" />} 
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date soumission</TableHead>
                <TableHead>Date approbation</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ppapDossiers.map((dossier) => (
                <TableRow key={dossier.id}>
                  <TableCell className="font-medium">{dossier.id}</TableCell>
                  <TableCell>{dossier.project}</TableCell>
                  <TableCell>{dossier.client}</TableCell>
                  <TableCell>{dossier.level}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        dossier.status === "Approuvé"
                          ? "default"
                          : dossier.status === "Rejeté"
                            ? "destructive"
                            : dossier.status === "Soumis"
                              ? "outline"
                              : "secondary"
                      }
                    >
                      {dossier.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dossier.submissionDate}</TableCell>
                  <TableCell>{dossier.approvalDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Voir détails
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
          <CardTitle>Détail du dossier PPAP-001</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="checklist">Checklist PPAP</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="psw">PSW</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ppap-id">ID PPAP</Label>
                  <Input id="ppap-id" value="PPAP-001" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppap-project">Projet</Label>
                  <Input id="ppap-project" value="Composant A-123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppap-client">Client</Label>
                  <Input id="ppap-client" value="Automotive Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppap-level">Niveau PPAP</Label>
                  <Select defaultValue="3">
                    <SelectTrigger id="ppap-level">
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
                  <Label htmlFor="ppap-status">Statut</Label>
                  <Select defaultValue="en-cours">
                    <SelectTrigger id="ppap-status">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-preparation">En préparation</SelectItem>
                      <SelectItem value="en-cours">En cours</SelectItem>
                      <SelectItem value="soumis">Soumis</SelectItem>
                      <SelectItem value="approuve">Approuvé</SelectItem>
                      <SelectItem value="rejete">Rejeté</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppap-submission-date">Date de soumission</Label>
                  <Input id="ppap-submission-date" type="date" value="2023-05-15" />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="ppap-description">Description</Label>
                <Textarea
                  id="ppap-description"
                  placeholder="Description du dossier PPAP"
                  value="Dossier PPAP pour le composant A-123 destiné au client Automotive Corp. Ce dossier concerne la validation du processus de production pour la nouvelle référence."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="ppap-contact">Contact client</Label>
                  <Input id="ppap-contact" value="John Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppap-email">Email contact</Label>
                  <Input id="ppap-email" type="email" value="j.smith@automotive-corp.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppap-reference">Référence pièce</Label>
                  <Input id="ppap-reference" value="AC-2023-X789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppap-revision">Révision</Label>
                  <Input id="ppap-revision" value="B" />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Annuler</Button>
                <Button>Enregistrer</Button>
              </div>
            </TabsContent>

            <TabsContent value="checklist" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Checklist PPAP Niveau 3</CardTitle>
                  <CardDescription>Liste des éléments requis pour la soumission PPAP de niveau 3</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">N°</TableHead>
                          <TableHead>Élément</TableHead>
                          <TableHead className="w-[150px]">Statut</TableHead>
                          <TableHead className="w-[150px]">Responsable</TableHead>
                          <TableHead className="w-[120px]">Date</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>Dossier de conception (Design Records)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Jean Dupont</TableCell>
                          <TableCell>10/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2</TableCell>
                          <TableCell>Documents de modification technique</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Marie Laurent</TableCell>
                          <TableCell>12/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>3</TableCell>
                          <TableCell>Approbation technique client</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700">
                              En cours
                            </Badge>
                          </TableCell>
                          <TableCell>Thomas Martin</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>4</TableCell>
                          <TableCell>AMDEC Produit</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Sophie Dubois</TableCell>
                          <TableCell>08/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5</TableCell>
                          <TableCell>Synoptique du processus</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Jean Dupont</TableCell>
                          <TableCell>05/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>6</TableCell>
                          <TableCell>AMDEC Processus</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Marie Laurent</TableCell>
                          <TableCell>07/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>7</TableCell>
                          <TableCell>Plan de contrôle</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Thomas Martin</TableCell>
                          <TableCell>09/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>8</TableCell>
                          <TableCell>Études MSA</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700">
                              En cours
                            </Badge>
                          </TableCell>
                          <TableCell>Sophie Dubois</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>9</TableCell>
                          <TableCell>Résultats dimensionnels</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700">
                              En cours
                            </Badge>
                          </TableCell>
                          <TableCell>Jean Dupont</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>10</TableCell>
                          <TableCell>Résultats des tests matériaux/performance</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-100 text-slate-700">
                              Planifié
                            </Badge>
                          </TableCell>
                          <TableCell>Marie Laurent</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>11</TableCell>
                          <TableCell>Études de capabilité initiale</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-100 text-slate-700">
                              Planifié
                            </Badge>
                          </TableCell>
                          <TableCell>Thomas Martin</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>12</TableCell>
                          <TableCell>Documentation laboratoire qualifié</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Sophie Dubois</TableCell>
                          <TableCell>03/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>13</TableCell>
                          <TableCell>Rapport d'approbation d'aspect</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Jean Dupont</TableCell>
                          <TableCell>02/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>14</TableCell>
                          <TableCell>Échantillons de pièces de production</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700">
                              En cours
                            </Badge>
                          </TableCell>
                          <TableCell>Marie Laurent</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>15</TableCell>
                          <TableCell>Échantillon de référence</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-100 text-slate-700">
                              Planifié
                            </Badge>
                          </TableCell>
                          <TableCell>Thomas Martin</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>16</TableCell>
                          <TableCell>Moyens de contrôle</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Sophie Dubois</TableCell>
                          <TableCell>04/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>17</TableCell>
                          <TableCell>Exigences spécifiques client</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>Jean Dupont</TableCell>
                          <TableCell>01/05/2023</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>18</TableCell>
                          <TableCell>Part Submission Warrant (PSW)</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-100 text-slate-700">
                              Planifié
                            </Badge>
                          </TableCell>
                          <TableCell>Marie Laurent</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-muted-foreground">Progression: 10/18 éléments complétés (55%)</div>
                      <Progress value={55} className="w-[200px]" />
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline">Exporter</Button>
                      <Button>Mettre à jour</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documents PPAP</CardTitle>
                  <CardDescription>Gestion des documents associés au dossier PPAP</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-x-2">
                        <Button>
                          <FileUp className="mr-2 h-4 w-4" />
                          Ajouter un document
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Exporter tous
                        </Button>
                      </div>
                      <Input 
                        placeholder="Rechercher..." 
                        className="w-[250px]" 
                        icon={<Search className="h-4 w-4 text-muted-foreground" />} 
                      />
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom du document</TableHead>
                          <TableHead>Catégorie</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Version</TableHead>
                          <TableHead>Date d'ajout</TableHead>
                          <TableHead>Ajouté par</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Plan de contrôle.pdf</TableCell>
                          <TableCell>Plan de contrôle</TableCell>
                          <TableCell>PDF</TableCell>
                          <TableCell>v2.1</TableCell>
                          <TableCell>09/05/2023</TableCell>
                          <TableCell>Thomas Martin</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              Télécharger
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">AMDEC Processus.xlsx</TableCell>
                          <TableCell>AMDEC</TableCell>
                          <TableCell>XLSX</TableCell>
                          <TableCell>v1.3</TableCell>
                          <TableCell>07/05/2023</TableCell>
                          <TableCell>Marie Laurent</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              Télécharger
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Synoptique processus.pdf</TableCell>
                          <TableCell>Processus</TableCell>
                          <TableCell>PDF</TableCell>
                          <TableCell>v1.0</TableCell>
                          <TableCell>05/05/2023</TableCell>
                          <TableCell>Jean Dupont</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              Télécharger
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Rapport d'approbation d'aspect.pdf</TableCell>
                          <TableCell>Rapport</TableCell>
                          <TableCell>PDF</TableCell>
                          <TableCell>v1.1</TableCell>
                          <TableCell>02/05/2023</TableCell>
                          <TableCell>Jean Dupont</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              Télécharger
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Documentation laboratoire.pdf</TableCell>
                          <TableCell>Documentation</TableCell>
                          <TableCell>PDF</TableCell>
                          <TableCell>v1.0</TableCell>
                          <TableCell>03/05/2023</TableCell>
                          <TableCell>Sophie Dubois</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              Télécharger
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Exigences spécifiques client.docx</TableCell>
                          <TableCell>Exigences</TableCell>
                          <TableCell>DOCX</TableCell>
                          <TableCell>v1.2</TableCell>
                          <TableCell>01/05/2023</TableCell>
                          <TableCell>Jean Dupont</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              Télécharger
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <div className="mt-4 p-8 border rounded-md flex flex-col items-center justify-center">
                      <div className="text-center text-muted-foreground mb-4">
                        <FileUp className="h-16 w-16 mx-auto mb-2" />
                        <p>Glissez-déposez des fichiers ici ou cliquez pour parcourir</p>
                        <p className="text-xs mt-1">Formats acceptés: PDF, DOCX, XLSX, PPTX, JPG, PNG (max 20 Mo)</p>
                      </div>
                      <Button variant="outline">Parcourir</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="psw" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Part Submission Warrant (PSW)</CardTitle>
                  <CardDescription>Formulaire de soumission et d'approbation PPAP</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="psw-supplier">Fournisseur</Label>
                        <Input id="psw-supplier" value="Votre Entreprise SA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="psw-address">Adresse</Label>
                        <Textarea id="psw-address" value="123 Avenue de l'Industrie, 75001 Paris, France" rows={3} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="psw-contact">Contact</Label>
                        <Input id="psw-contact" value="Jean Dupont" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="psw-email">Email</Label>
                        <Input id="psw-email" type="email" value="j.dupont@votreentreprise.com" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="psw-customer">Client</Label>
                        <Input id="psw-customer" value="Automotive Corp" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="psw-part-number">Référence pièce</Label>
                        <Input id="psw-part-number" value="AC-2023-X789" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="psw-part-name">Désignation pièce</Label>
                        <Input id="psw-part-name" value="Composant A-123" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="psw-drawing-level">Indice plan</Label>
                        <Input id="psw-drawing-level" value="B" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="psw-submission-reason">Motif de soumission</Label>
                    <Select defaultValue="initial">
                      <SelectTrigger id="psw-submission-reason">
                        <SelectValue placeholder="Sélectionner un motif" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="initial">Soumission initiale</SelectItem>
                        <SelectItem value="change">Changement de conception</SelectItem>
                        <SelectItem value="tooling">Changement d'outillage</SelectItem>
                        <SelectItem value="material">Changement de matière</SelectItem>
                        <SelectItem value="process">Changement de processus</SelectItem>
                        <SelectItem value="location">Changement de lieu de production</SelectItem>
                        <SelectItem value="resubmission">Resoumission</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="psw-declaration">Déclaration</Label>
                    <Textarea
                      id="psw-declaration"
                      value="Je certifie que les échantillons représentés par ce dossier sont conformes à toutes les exigences des dessins et spécifications, sauf comme documenté ci-joint. J'atteste également que tous les éléments requis sont disponibles ou joints à ce dossier, comme indiqué."
                      rows={4}
                      readOnly
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="psw-submission-date">Date de soumission</Label>
                      <Input id="psw-submission-date" type="date" value="2023-05-15" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="psw-submitted-by">Soumis par</Label>
                      <Input id="psw-submitted-by" value="Jean Dupont" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="psw-position">Fonction</Label>
                      <Input id="psw-position" value="Responsable Qualité" />
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-semibold mb-4">Décision client</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="psw-decision">Décision</Label>
                        <Select>
                          <SelectTrigger id="psw-decision">
                            <SelectValue placeholder="En attente de décision" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Approuvé</SelectItem>
                            <SelectItem value="approved-conditions">Approuvé avec conditions</SelectItem>
                            <SelectItem value="rejected">Rejeté</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="psw-decision-date">Date de décision</Label>
                        <Input id="psw-decision-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="psw-decision-by">Décision par</Label>
                        <Input id="psw-decision-by" placeholder="Nom du responsable client" />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="psw-comments">Commentaires</Label>
                      <Textarea id="psw-comments" placeholder="Commentaires du client" rows={3} />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label>PSW signé</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline">
                        <FileUp className="mr-2 h-4 w-4" />
                        Importer PSW signé
                      </Button>
                      <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, JPG, PNG</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline">Générer PSW</Button>
                    <Button variant="outline">Imprimer</Button>
                    <Button>Enregistrer</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historique du dossier PPAP</CardTitle>
                  <CardDescription>Suivi des modifications et des révisions du dossier PPAP</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Détails</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>15/05/2023 14:30</TableCell>
                        <TableCell>Soumission PPAP</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell>Soumission initiale du dossier PPAP au client</TableCell>
                        <TableCell>v1.0</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700">
                            En cours
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>12/05/2023 10:15</TableCell>
                        <TableCell>Mise à jour document</TableCell>
                        <TableCell>Marie Laurent</TableCell>
                        <TableCell>Ajout de l'AMDEC Processus v1.3</TableCell>
                        <TableCell>v0.9</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100 text-slate-700">
                            Brouillon
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>10/05/2023 16:45</TableCell>
                        <TableCell>Mise à jour document</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell>Ajout du dossier de conception</TableCell>
                        <TableCell>v0.8</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100 text-slate-700">
                            Brouillon
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>09/05/2023 11:20</TableCell>
                        <TableCell>Mise à jour document</TableCell>
                        <TableCell>Thomas Martin</TableCell>
                        <TableCell>Ajout du plan de contrôle v2.1</TableCell>
                        <TableCell>v0.7</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100 text-slate-700">
                            Brouillon
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>07/05/2023 09:30</TableCell>
                        <TableCell>Mise à jour document</TableCell>
                        <TableCell>Marie Laurent</TableCell>
                        <TableCell>Ajout de l'AMDEC Processus v1.2</TableCell>
                        <TableCell>v0.6</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100 text-slate-700">
                            Brouillon
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>05/05/2023 14:10</TableCell>
                        <TableCell>Mise à jour document</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell>Ajout du synoptique du processus</TableCell>
                        <TableCell>v0.5</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100 text-slate-700">
                            Brouillon
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>01/05/2023 10:00</TableCell>
                        <TableCell>Création</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell>Création initiale du dossier PPAP</TableCell>
                        <TableCell>v0.1</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100 text-slate-700">
                            Brouillon
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-muted-foreground">7 événements trouvés</div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Précédent
                      </Button>
                      <Button variant="outline" size="sm">
                        Suivant
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
