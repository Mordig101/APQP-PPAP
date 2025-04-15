import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save, Plus, Download, Upload, RefreshCw, Globe, Workflow, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function SettingsPage() {
  // Dummy data for template variables
  const company_name = "Votre Entreprise SA"
  const project_name = "Nom du Projet"
  const project_id = "PRJ-001"
  const customer_name = "Nom du Client"
  const part_number = "12345-67890"
  const current_date = new Date().toLocaleDateString()
  const user_name = "John Doe"
  const department = "Engineering"
  const revision = "A"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder les modifications
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-8 w-full">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="audit">Journal d'audit</TabsTrigger>
          <TabsTrigger value="backup">Sauvegarde</TabsTrigger>
        </TabsList>

        {/* Onglet Général */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>Configuration générale du système APQP/PPAP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l'entreprise</Label>
                  <Input id="company-name" defaultValue="Votre Entreprise SA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-name">Nom du système</Label>
                  <Input id="system-name" defaultValue="Système de gestion APQP/PPAP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email administrateur</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@votreentreprise.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-language">Langue par défaut</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger id="default-language">
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-logo">Logo de l'entreprise</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-40 border rounded-md flex items-center justify-center bg-muted">
                    <span className="text-sm text-muted-foreground">Aperçu du logo</span>
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Télécharger un logo
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Préférences d'affichage</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="dark-mode">Mode sombre</Label>
                    <Switch id="dark-mode" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="compact-mode">Mode compact</Label>
                    <Switch id="compact-mode" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="show-tooltips">Afficher les info-bulles</Label>
                    <Switch id="show-tooltips" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="auto-save">Sauvegarde automatique</Label>
                    <Switch id="auto-save" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Paramètres régionaux</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Format de date</Label>
                    <Select defaultValue="dd/mm/yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Sélectionner un format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">JJ/MM/AAAA</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/JJ/AAAA</SelectItem>
                        <SelectItem value="yyyy-mm-dd">AAAA-MM-JJ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-format">Format d'heure</Label>
                    <Select defaultValue="24h">
                      <SelectTrigger id="time-format">
                        <SelectValue placeholder="Sélectionner un format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24h</SelectItem>
                        <SelectItem value="12h">12h (AM/PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select defaultValue="europe-paris">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Sélectionner un fuseau horaire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                        <SelectItem value="america-new_york">America/New_York (UTC-5)</SelectItem>
                        <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="first-day">Premier jour de la semaine</Label>
                    <Select defaultValue="monday">
                      <SelectTrigger id="first-day">
                        <SelectValue placeholder="Sélectionner un jour" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Lundi</SelectItem>
                        <SelectItem value="sunday">Dimanche</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paramètres APQP/PPAP</CardTitle>
              <CardDescription>Configuration spécifique au processus APQP/PPAP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-ppap-level">Niveau PPAP par défaut</Label>
                  <Select defaultValue="3">
                    <SelectTrigger id="default-ppap-level">
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
                  <Label htmlFor="default-phase">Phase initiale par défaut</Label>
                  <Select defaultValue="phase-1">
                    <SelectTrigger id="default-phase">
                      <SelectValue placeholder="Sélectionner une phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase-1">Phase 1: Plan & Define</SelectItem>
                      <SelectItem value="phase-2">Phase 2: Conception Produit</SelectItem>
                      <SelectItem value="phase-3">Phase 3: Conception Process</SelectItem>
                      <SelectItem value="phase-4">Phase 4: Validation</SelectItem>
                      <SelectItem value="phase-5">Phase 5: Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Paramètres d'approbation</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="require-approval">Exiger l'approbation pour passer à la phase suivante</Label>
                    <Switch id="require-approval" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="multi-approval">Approbation multiple requise</Label>
                    <Switch id="multi-approval" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="approval-roles">Rôles d'approbation</Label>
                    <Select defaultValue="quality-manager">
                      <SelectTrigger id="approval-roles">
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quality-manager">Responsable Qualité</SelectItem>
                        <SelectItem value="project-manager">Chef de Projet</SelectItem>
                        <SelectItem value="production-manager">Responsable Production</SelectItem>
                        <SelectItem value="engineering-manager">Responsable Ingénierie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="approval-timeout">Délai d'approbation (jours)</Label>
                    <Input id="approval-timeout" type="number" defaultValue="5" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Numérotation automatique</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-prefix">Préfixe des projets</Label>
                    <Input id="project-prefix" defaultValue="PRJ-" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ppap-prefix">Préfixe des dossiers PPAP</Label>
                    <Input id="ppap-prefix" defaultValue="PPAP-" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="document-prefix">Préfixe des documents</Label>
                    <Input id="document-prefix" defaultValue="DOC-" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="next-number">Prochain numéro</Label>
                    <Input id="next-number" type="number" defaultValue="1001" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Utilisateurs */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                  <CardDescription>Gérer les utilisateurs et leurs permissions</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel utilisateur
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Département</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jean Dupont" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span>Jean Dupont</span>
                      </div>
                    </TableCell>
                    <TableCell>j.dupont@company.com</TableCell>
                    <TableCell>Administrateur</TableCell>
                    <TableCell>Gestion de Projet</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                    </TableCell>
                    <TableCell>Aujourd'hui, 10:23</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                          Désactiver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Marie Laurent" />
                          <AvatarFallback>ML</AvatarFallback>
                        </Avatar>
                        <span>Marie Laurent</span>
                      </div>
                    </TableCell>
                    <TableCell>m.laurent@company.com</TableCell>
                    <TableCell>Qualité</TableCell>
                    <TableCell>Qualité</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                    </TableCell>
                    <TableCell>Hier, 16:45</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                          Désactiver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Thomas Martin" />
                          <AvatarFallback>TM</AvatarFallback>
                        </Avatar>
                        <span>Thomas Martin</span>
                      </div>
                    </TableCell>
                    <TableCell>t.martin@company.com</TableCell>
                    <TableCell>Production</TableCell>
                    <TableCell>Production</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                    </TableCell>
                    <TableCell>20/05/2023</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                          Désactiver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sophie Dubois" />
                          <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <span>Sophie Dubois</span>
                      </div>
                    </TableCell>
                    <TableCell>s.dubois@company.com</TableCell>
                    <TableCell>R&D</TableCell>
                    <TableCell>R&D</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-800">
                        Inactif
                      </Badge>
                    </TableCell>
                    <TableCell>15/05/2023</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm" className="text-green-500 hover:text-green-500">
                          Activer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rôles et permissions</CardTitle>
              <CardDescription>Configurer les rôles et les permissions associées</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau rôle
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Utilisateurs</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Administrateur</TableCell>
                    <TableCell>Accès complet à toutes les fonctionnalités du système</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Gérer les permissions
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Qualité</TableCell>
                    <TableCell>Gestion des processus qualité et PPAP</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Gérer les permissions
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Production</TableCell>
                    <TableCell>Accès aux données de production et process</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Gérer les permissions
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">R&D</TableCell>
                    <TableCell>Gestion des phases de conception produit</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Gérer les permissions
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lecture seule</TableCell>
                    <TableCell>Accès en lecture seule à toutes les données</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Gérer les permissions
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Détail des permissions - Rôle: Qualité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Modules</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="dashboard-access">Tableau de bord</Label>
                          <Switch id="dashboard-access" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="phase1-access">Phase 1</Label>
                          <Switch id="phase1-access" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="phase2-access">Phase 2</Label>
                          <Switch id="phase2-access" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="phase3-access">Phase 3</Label>
                          <Switch id="phase3-access" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="phase4-access">Phase 4</Label>
                          <Switch id="phase4-access" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="phase5-access">Phase 5</Label>
                          <Switch id="phase5-access" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="ppap-access">Dossiers PPAP</Label>
                          <Switch id="ppap-access" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="team-access">Équipe projet</Label>
                          <Switch id="team-access" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="settings-access">Paramètres</Label>
                          <Switch id="settings-access" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Actions</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="create-project">Créer des projets</Label>
                          <Switch id="create-project" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="edit-project">Modifier des projets</Label>
                          <Switch id="edit-project" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="delete-project">Supprimer des projets</Label>
                          <Switch id="delete-project" />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="approve-phases">Approuver des phases</Label>
                          <Switch id="approve-phases" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="manage-ppap">Gérer les PPAP</Label>
                          <Switch id="manage-ppap" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                          <Label htmlFor="export-data">Exporter des données</Label>
                          <Switch id="export-data" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Modèles */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Modèles de documents</CardTitle>
                  <CardDescription>Gérer les modèles de documents utilisés dans le système</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau modèle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du modèle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Dernière modification</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Plan de contrôle</TableCell>
                    <TableCell>XLSX</TableCell>
                    <TableCell>Modèle standard de plan de contrôle</TableCell>
                    <TableCell>15/05/2023</TableCell>
                    <TableCell>v2.1</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">AMDEC Process</TableCell>
                    <TableCell>XLSX</TableCell>
                    <TableCell>Modèle d'analyse AMDEC process</TableCell>
                    <TableCell>10/05/2023</TableCell>
                    <TableCell>v1.3</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PSW</TableCell>
                    <TableCell>DOCX</TableCell>
                    <TableCell>Part Submission Warrant</TableCell>
                    <TableCell>05/05/2023</TableCell>
                    <TableCell>v1.0</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Rapport d'audit</TableCell>
                    <TableCell>DOCX</TableCell>
                    <TableCell>Modèle de rapport d'audit qualité</TableCell>
                    <TableCell>01/05/2023</TableCell>
                    <TableCell>v1.2</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm">
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Éditeur de modèle</CardTitle>
              <CardDescription>Créer ou modifier un modèle de document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Nom du modèle</Label>
                  <Input id="template-name" placeholder="Ex: Plan de contrôle" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-type">Type de document</Label>
                  <Select>
                    <SelectTrigger id="template-type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="docx">Word (DOCX)</SelectItem>
                      <SelectItem value="pptx">PowerPoint (PPTX)</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="template-description">Description</Label>
                  <Textarea id="template-description" placeholder="Description du modèle" rows={3} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fichier modèle</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Glissez-déposez un fichier ici ou cliquez pour parcourir
                  </p>
                  <p className="text-xs text-muted-foreground">Formats acceptés: XLSX, DOCX, PPTX, PDF (max 10 Mo)</p>
                  <Button variant="outline" className="mt-4">
                    Parcourir
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Variables disponibles</Label>
                <div className="border rounded-md p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Utilisez ces variables dans vos modèles pour une personnalisation automatique:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <Badge variant="outline" className="justify-start">
                      {company_name}
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      { project_name }
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      { project_id }
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      { customer_name }
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      { part_number }
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      { current_date }
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      { user_name }
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      { department }
                    </Badge>
                    <Badge variant="outline" className="justify-start">
                      { revision }
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Annuler</Button>
                <Button>Enregistrer le modèle</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Workflow */}
        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Configuration des workflows</CardTitle>
                  <CardDescription>Définir les flux de travail pour les processus APQP/PPAP</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau workflow
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du workflow</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Étapes</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Workflow APQP standard</TableCell>
                    <TableCell>Processus APQP en 5 phases</TableCell>
                    <TableCell>APQP</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm">
                          Dupliquer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Workflow PPAP niveau 3</TableCell>
                    <TableCell>Processus de soumission PPAP niveau 3</TableCell>
                    <TableCell>PPAP</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm">
                          Dupliquer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Workflow approbation document</TableCell>
                    <TableCell>Processus d'approbation des documents</TableCell>
                    <TableCell>Document</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm">
                          Dupliquer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Workflow APQP simplifié</TableCell>
                    <TableCell>Processus APQP simplifié en 3 phases</TableCell>
                    <TableCell>APQP</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-100 text-slate-800">
                        Inactif
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm">
                          Dupliquer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Éditeur de workflow - Workflow APQP standard</CardTitle>
              <CardDescription>Configurer les étapes et les transitions du workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="workflow-name">Nom du workflow</Label>
                  <Input id="workflow-name" defaultValue="Workflow APQP standard" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workflow-type">Type</Label>
                  <Select defaultValue="apqp">
                    <SelectTrigger id="workflow-type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apqp">APQP</SelectItem>
                      <SelectItem value="ppap">PPAP</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="workflow-description">Description</Label>
                  <Textarea id="workflow-description" defaultValue="Processus APQP standard en 5 phases" rows={2} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Étapes du workflow</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une étape
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ordre</TableHead>
                      <TableHead>Nom de l'étape</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Approbation requise</TableHead>
                      <TableHead>Rôles approbateurs</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="font-medium">Phase 1: Plan & Define</TableCell>
                      <TableCell>Planification et définition du projet</TableCell>
                      <TableCell>Oui</TableCell>
                      <TableCell>Chef de Projet, Qualité</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Éditer
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="font-medium">Phase 2: Conception Produit</TableCell>
                      <TableCell>Développement et conception du produit</TableCell>
                      <TableCell>Oui</TableCell>
                      <TableCell>R&D, Qualité</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Éditer
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="font-medium">Phase 3: Conception Process</TableCell>
                      <TableCell>Développement et conception du processus</TableCell>
                      <TableCell>Oui</TableCell>
                      <TableCell>Production, Qualité</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Éditer
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell className="font-medium">Phase 4: Validation</TableCell>
                      <TableCell>Validation du produit et du processus</TableCell>
                      <TableCell>Oui</TableCell>
                      <TableCell>Qualité, Production, R&D</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Éditer
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5</TableCell>
                      <TableCell className="font-medium">Phase 5: Feedback</TableCell>
                      <TableCell>Retour d'expérience et amélioration continue</TableCell>
                      <TableCell>Non</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Éditer
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2">
                <Label>Diagramme du workflow</Label>
                <div className="border rounded-md p-4 h-64 bg-muted/10 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Workflow className="h-16 w-16 mx-auto mb-2" />
                    <p>Diagramme de workflow</p>
                    <p className="text-xs mt-2">(Diagramme à implémenter)</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Annuler</Button>
                <Button>Enregistrer le workflow</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Configurer les notifications système et les alertes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par email</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-notifications">Activer les notifications par email</Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="daily-digest">Résumé quotidien</Label>
                    <Switch id="daily-digest" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-sender">Email expéditeur</Label>
                    <Input id="email-sender" defaultValue="noreply@votreentreprise.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-sender-name">Nom expéditeur</Label>
                    <Input id="email-sender-name" defaultValue="Système APQP/PPAP" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications système</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="system-notifications">Activer les notifications système</Label>
                    <Switch id="system-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="desktop-notifications">Notifications bureau</Label>
                    <Switch id="desktop-notifications" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Événements de notification</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un événement
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Événement</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Système</TableHead>
                      <TableHead>Destinataires</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Approbation requise</TableCell>
                      <TableCell>Notification lorsqu'une approbation est requise</TableCell>
                      <TableCell>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell>Approbateurs</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Phase approuvée</TableCell>
                      <TableCell>Notification lorsqu'une phase est approuvée</TableCell>
                      <TableCell>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell>Équipe projet</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Document ajouté</TableCell>
                      <TableCell>Notification lorsqu'un document est ajouté</TableCell>
                      <TableCell>
                        <AlertTriangle className="h-5 w-5 text-gray-300" />
                      </TableCell>
                      <TableCell>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell>Équipe projet</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Échéance proche</TableCell>
                      <TableCell>Notification lorsqu'une échéance approche</TableCell>
                      <TableCell>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell>Responsables</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PPAP soumis</TableCell>
                      <TableCell>Notification lorsqu'un PPAP est soumis</TableCell>
                      <TableCell>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell>Qualité, Chef de Projet</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Éditer
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Modèle d'email - Approbation requise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email-subject">Sujet</Label>
                      <Input id="email-subject" defaultValue="[APQP/PPAP] Approbation requise - {{project_name}}" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-template">Modèle</Label>
                      <Select defaultValue="approval-required">
                        <SelectTrigger id="email-template">
                          <SelectValue placeholder="Sélectionner un modèle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approval-required">Approbation requise</SelectItem>
                          <SelectItem value="phase-approved">Phase approuvée</SelectItem>
                          <SelectItem value="deadline-approaching">Échéance proche</SelectItem>
                          <SelectItem value="ppap-submitted">PPAP soumis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-content">Contenu</Label>
                    <Textarea
                      id="email-content"
                      rows={8}
                      defaultValue={`Bonjour {{recipient_name}},

Votre approbation est requise pour le projet {{project_name}} ({{project_id}}).

Phase: {{phase_name}}
Demandeur: {{requester_name}}
Date de la demande: {{request_date}}

Pour approuver ou rejeter cette demande, veuillez cliquer sur le lien suivant:
{{approval_link}}

Cordialement,
L'équipe APQP/PPAP`}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Aperçu</Button>
                    <Button>Enregistrer le modèle</Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Intégrations */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intégrations système</CardTitle>
              <CardDescription>Configurer les intégrations avec d'autres systèmes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">ERP</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-800">
                        Connecté
                      </Badge>
                    </div>
                    <CardDescription>Intégration avec le système ERP</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="erp-url">URL du serveur</Label>
                        <Input id="erp-url" defaultValue="https://erp.votreentreprise.com/api" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="erp-key">Clé API</Label>
                        <Input id="erp-key" type="password" defaultValue="••••••••••••••••" />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="erp-sync">Synchronisation automatique</Label>
                        <Switch id="erp-sync" defaultChecked />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Tester la connexion
                        </Button>
                        <Button size="sm">Configurer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">PLM</CardTitle>
                      <Badge variant="outline" className="bg-amber-50 text-amber-800">
                        Non configuré
                      </Badge>
                    </div>
                    <CardDescription>Intégration avec le système PLM</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="plm-url">URL du serveur</Label>
                        <Input id="plm-url" placeholder="https://plm.votreentreprise.com/api" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="plm-key">Clé API</Label>
                        <Input id="plm-key" type="password" placeholder="Entrez votre clé API" />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="plm-sync">Synchronisation automatique</Label>
                        <Switch id="plm-sync" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Tester la connexion
                        </Button>
                        <Button size="sm">Configurer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">MES</CardTitle>
                      <Badge variant="outline" className="bg-amber-50 text-amber-800">
                        Non configuré
                      </Badge>
                    </div>
                    <CardDescription>Intégration avec le système MES</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mes-url">URL du serveur</Label>
                        <Input id="mes-url" placeholder="https://mes.votreentreprise.com/api" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mes-key">Clé API</Label>
                        <Input id="mes-key" type="password" placeholder="Entrez votre clé API" />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="mes-sync">Synchronisation automatique</Label>
                        <Switch id="mes-sync" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Tester la connexion
                        </Button>
                        <Button size="sm">Configurer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Email (SMTP)</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-800">
                        Connecté
                      </Badge>
                    </div>
                    <CardDescription>Configuration du serveur email</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-server">Serveur SMTP</Label>
                        <Input id="smtp-server" defaultValue="smtp.votreentreprise.com" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtp-port">Port</Label>
                          <Input id="smtp-port" defaultValue="587" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtp-security">Sécurité</Label>
                          <Select defaultValue="tls">
                            <SelectTrigger id="smtp-security">
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Aucune</SelectItem>
                              <SelectItem value="ssl">SSL</SelectItem>
                              <SelectItem value="tls">TLS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Tester la connexion
                        </Button>
                        <Button size="sm">Configurer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Historique de synchronisation</Label>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Synchroniser maintenant
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Système</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Éléments</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Détails</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>05/06/2023 14:30</TableCell>
                      <TableCell>ERP</TableCell>
                      <TableCell>Automatique</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Succès</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>04/06/2023 10:15</TableCell>
                      <TableCell>ERP</TableCell>
                      <TableCell>Manuelle</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Succès</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>03/06/2023 09:45</TableCell>
                      <TableCell>ERP</TableCell>
                      <TableCell>Automatique</TableCell>
                      <TableCell>18</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Échec</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API et webhooks</CardTitle>
              <CardDescription>Configurer l'API et les webhooks pour l'intégration externe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Clés API</h3>
                <div className="flex justify-end">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvelle clé API
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Clé</TableHead>
                      <TableHead>Créée le</TableHead>
                      <TableHead>Expire le</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">API Production</TableCell>
                      <TableCell>••••••••••••••••</TableCell>
                      <TableCell>01/05/2023</TableCell>
                      <TableCell>01/05/2024</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Afficher
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Révoquer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">API Test</TableCell>
                      <TableCell>••••••••••••••••</TableCell>
                      <TableCell>15/04/2023</TableCell>
                      <TableCell>15/04/2024</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Afficher
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Révoquer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Webhooks</h3>
                <div className="flex justify-end">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau webhook
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Événements</TableHead>
                      <TableHead>Créé le</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Notification ERP</TableCell>
                      <TableCell>https://erp.votreentreprise.com/webhooks/apqp</TableCell>
                      <TableCell>phase.approved, ppap.submitted</TableCell>
                      <TableCell>10/05/2023</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Éditer
                          </Button>
                          <Button variant="outline" size="sm">
                            Tester
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Notification Slack</TableCell>
                      <TableCell>
                        https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
                      </TableCell>
                      <TableCell>project.created, phase.approved</TableCell>
                      <TableCell>05/05/2023</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Éditer
                          </Button>
                          <Button variant="outline" size="sm">
                            Tester
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2">
                <Label>Documentation API</Label>
                <div className="border rounded-md p-4">
                  <p className="text-sm mb-4">
                    La documentation complète de l'API est disponible pour les intégrations personnalisées.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Globe className="mr-2 h-4 w-4" />
                      Accéder à la documentation
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le fichier OpenAPI
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Journal d'audit */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Journal d'audit</CardTitle>
                  <CardDescription>Historique des actions et modifications du système</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Rechercher..." className="w-[250px]" />
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
                    <TableHead>Date et heure</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Détails</TableHead>
                    <TableHead>Adresse IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>05/06/2023 14:30:15</TableCell>
                    <TableCell>Jean Dupont</TableCell>
                    <TableCell>Connexion</TableCell>
                    <TableCell>Authentification</TableCell>
                    <TableCell>Connexion réussie</TableCell>
                    <TableCell>192.168.1.100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>05/06/2023 14:35:22</TableCell>
                    <TableCell>Jean Dupont</TableCell>
                    <TableCell>Création</TableCell>
                    <TableCell>Projets</TableCell>
                    <TableCell>Création du projet PRJ-001</TableCell>
                    <TableCell>192.168.1.100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>05/06/2023 14:40:05</TableCell>
                    <TableCell>Marie Laurent</TableCell>
                    <TableCell>Modification</TableCell>
                    <TableCell>PPAP</TableCell>
                    <TableCell>Mise à jour du dossier PPAP-002</TableCell>
                    <TableCell>192.168.1.101</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>05/06/2023 14:45:30</TableCell>
                    <TableCell>Thomas Martin</TableCell>
                    <TableCell>Approbation</TableCell>
                    <TableCell>Phases</TableCell>
                    <TableCell>Approbation de la Phase 2 du projet PRJ-002</TableCell>
                    <TableCell>192.168.1.102</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>05/06/2023 14:50:12</TableCell>
                    <TableCell>Sophie Dubois</TableCell>
                    <TableCell>Téléchargement</TableCell>
                    <TableCell>Documents</TableCell>
                    <TableCell>Téléchargement du document DOC-2023-015</TableCell>
                    <TableCell>192.168.1.103</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>05/06/2023 14:55:45</TableCell>
                    <TableCell>Jean Dupont</TableCell>
                    <TableCell>Suppression</TableCell>
                    <TableCell>Documents</TableCell>
                    <TableCell>Suppression du document DOC-2023-010</TableCell>
                    <TableCell>192.168.1.100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>05/06/2023 15:00:18</TableCell>
                    <TableCell>Système</TableCell>
                    <TableCell>Sauvegarde</TableCell>
                    <TableCell>Système</TableCell>
                    <TableCell>Sauvegarde automatique quotidienne</TableCell>
                    <TableCell>127.0.0.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>05/06/2023 15:05:33</TableCell>
                    <TableCell>Marie Laurent</TableCell>
                    <TableCell>Déconnexion</TableCell>
                    <TableCell>Authentification</TableCell>
                    <TableCell>Déconnexion utilisateur</TableCell>
                    <TableCell>192.168.1.101</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">Affichage de 8 entrées sur 1,245</div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'audit</CardTitle>
              <CardDescription>Configuration de la journalisation des événements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="enable-audit">Activer la journalisation d'audit</Label>
                  <Switch id="enable-audit" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="log-user-actions">Journaliser les actions utilisateur</Label>
                  <Switch id="log-user-actions" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="log-system-actions">Journaliser les actions système</Label>
                  <Switch id="log-system-actions" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="log-api-calls">Journaliser les appels API</Label>
                  <Switch id="log-api-calls" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Période de rétention (jours)</Label>
                  <Input id="retention-period" type="number" defaultValue="365" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="log-level">Niveau de journalisation</Label>
                  <Select defaultValue="info">
                    <SelectTrigger id="log-level">
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Actions à journaliser</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-login" defaultChecked />
                    <Label htmlFor="log-login">Connexion/Déconnexion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-create" defaultChecked />
                    <Label htmlFor="log-create">Création</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-update" defaultChecked />
                    <Label htmlFor="log-update">Modification</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-delete" defaultChecked />
                    <Label htmlFor="log-delete">Suppression</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-approval" defaultChecked />
                    <Label htmlFor="log-approval">Approbation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-download" defaultChecked />
                    <Label htmlFor="log-download">Téléchargement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-upload" defaultChecked />
                    <Label htmlFor="log-upload">Téléversement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-export" defaultChecked />
                    <Label htmlFor="log-export">Exportation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="log-import" defaultChecked />
                    <Label htmlFor="log-import">Importation</Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Réinitialiser</Button>
                <Button>Enregistrer les paramètres</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Sauvegarde */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sauvegarde et restauration</CardTitle>
                  <CardDescription>Gérer les sauvegardes du système et la restauration des données</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer une sauvegarde
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sauvegardes automatiques</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="enable-auto-backup">Activer les sauvegardes automatiques</Label>
                    <Switch id="enable-auto-backup" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Fréquence</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Sélectionner une fréquence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Toutes les heures</SelectItem>
                        <SelectItem value="daily">Quotidienne</SelectItem>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        <SelectItem value="monthly">Mensuelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-time">Heure de sauvegarde</Label>
                    <Input id="backup-time" type="time" defaultValue="02:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Rétention (jours)</Label>
                    <Input id="backup-retention" type="number" defaultValue="30" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Stockage des sauvegardes</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="backup-location">Emplacement</Label>
                    <Select defaultValue="local">
                      <SelectTrigger id="backup-location">
                        <SelectValue placeholder="Sélectionner un emplacement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Stockage local</SelectItem>
                        <SelectItem value="s3">Amazon S3</SelectItem>
                        <SelectItem value="azure">Azure Blob Storage</SelectItem>
                        <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-encryption">Chiffrement</Label>
                    <Select defaultValue="aes256">
                      <SelectTrigger id="backup-encryption">
                        <SelectValue placeholder="Sélectionner un chiffrement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucun</SelectItem>
                        <SelectItem value="aes256">AES-256</SelectItem>
                        <SelectItem value="aes512">AES-512</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-compression">Compression</Label>
                    <Select defaultValue="gzip">
                      <SelectTrigger id="backup-compression">
                        <SelectValue placeholder="Sélectionner une compression" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune</SelectItem>
                        <SelectItem value="gzip">GZIP</SelectItem>
                        <SelectItem value="zip">ZIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="backup-notification">Notification en cas d'échec</Label>
                    <Switch id="backup-notification" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Sauvegardes disponibles</Label>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Actualiser
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">backup_20230605_020000</TableCell>
                      <TableCell>05/06/2023 02:00</TableCell>
                      <TableCell>Automatique</TableCell>
                      <TableCell>1.2 GB</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complète</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Restaurer
                          </Button>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">backup_20230604_020000</TableCell>
                      <TableCell>04/06/2023 02:00</TableCell>
                      <TableCell>Automatique</TableCell>
                      <TableCell>1.2 GB</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complète</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Restaurer
                          </Button>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">backup_20230603_143022</TableCell>
                      <TableCell>03/06/2023 14:30</TableCell>
                      <TableCell>Manuelle</TableCell>
                      <TableCell>1.2 GB</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complète</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Restaurer
                          </Button>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                          <Button variant="outline" size="sm" >
                            Télécharger
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500">
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Restauration du système</CardTitle>
                  <CardDescription>Restaurer le système à partir d'une sauvegarde</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restore-source">Source de restauration</Label>
                    <Select>
                      <SelectTrigger id="restore-source">
                        <SelectValue placeholder="Sélectionner une sauvegarde" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="backup_20230605_020000">
                          backup_20230605_020000 (05/06/2023 02:00)
                        </SelectItem>
                        <SelectItem value="backup_20230604_020000">
                          backup_20230604_020000 (04/06/2023 02:00)
                        </SelectItem>
                        <SelectItem value="backup_20230603_143022">
                          backup_20230603_143022 (03/06/2023 14:30)
                        </SelectItem>
                        <SelectItem value="custom">Téléverser une sauvegarde</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Options de restauration</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="restore-data" defaultChecked />
                        <Label htmlFor="restore-data">Données</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="restore-config" defaultChecked />
                        <Label htmlFor="restore-config">Configuration</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="restore-users" defaultChecked />
                        <Label htmlFor="restore-users">Utilisateurs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="restore-files" defaultChecked />
                        <Label htmlFor="restore-files">Fichiers</Label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-amber-800">Attention</h4>
                          <p className="text-sm text-amber-700">
                            La restauration remplacera toutes les données actuelles par celles de la sauvegarde
                            sélectionnée. Cette action est irréversible.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Annuler</Button>
                      <Button variant="destructive">Lancer la restauration</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
