"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileUp, Save, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function Phase4Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Phase 4: Validation Produit & Process</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </div>

      <Tabs defaultValue="process-validation">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="process-validation">Validation process</TabsTrigger>
          <TabsTrigger value="product-validation">Validation produit</TabsTrigger>
          <TabsTrigger value="capability">Capabilité</TabsTrigger>
          <TabsTrigger value="production-trial">Essai production</TabsTrigger>
          <TabsTrigger value="ppap-submission">Soumission PPAP</TabsTrigger>
        </TabsList>

        <TabsContent value="process-validation" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Validation du process de fabrication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pv-id">ID Validation</Label>
                  <Input id="pv-id" placeholder="Ex: PV-2023-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pv-date">Date</Label>
                  <Input id="pv-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pv-responsible">Responsable</Label>
                  <Input id="pv-responsible" placeholder="Nom du responsable" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pv-status">Statut</Label>
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
                <Label>Étapes de validation</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Étape process</TableHead>
                      <TableHead>Paramètres critiques</TableHead>
                      <TableHead>Critères d'acceptation</TableHead>
                      <TableHead>Méthode de validation</TableHead>
                      <TableHead>Résultat</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Usinage</TableCell>
                      <TableCell>Vitesse, avance, température</TableCell>
                      <TableCell>Dimensions dans tolérance, Ra ≤ 1.6</TableCell>
                      <TableCell>Essai 30 pièces</TableCell>
                      <TableCell>100% conforme</TableCell>
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
                      <TableCell>Assemblage</TableCell>
                      <TableCell>Couple serrage, séquence</TableCell>
                      <TableCell>Couple final 12±1 Nm</TableCell>
                      <TableCell>Essai 30 pièces</TableCell>
                      <TableCell>28/30 conforme</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Non validé</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Test fonctionnel</TableCell>
                      <TableCell>Pression, débit</TableCell>
                      <TableCell>Pas de fuite à 2 bar</TableCell>
                      <TableCell>Essai 30 pièces</TableCell>
                      <TableCell>100% conforme</TableCell>
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
                <Label htmlFor="pv-conclusion">Conclusion</Label>
                <Textarea
                  id="pv-conclusion"
                  placeholder="Conclusion de la validation process"
                  rows={4}
                  defaultValue="Le process d'usinage et de test fonctionnel sont validés. Le process d'assemblage nécessite des ajustements sur la méthode de serrage. Une action corrective a été initiée (AC-2023-015)."
                />
              </div>

              <div className="space-y-2">
                <Label>Documents de validation</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <FileUp className="mr-2 h-4 w-4" />
                    Importer document
                  </Button>
                  <span className="text-sm text-muted-foreground">Formats acceptés: PDF, DOCX, XLSX</span>
                </div>
                <div className="rounded-md border p-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-sm">Rapport_validation_usinage.pdf</li>
                    <li className="text-sm">Rapport_validation_assemblage.pdf</li>
                    <li className="text-sm">Rapport_validation_test.pdf</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product-validation" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Validation du produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prod-val-id">ID Validation</Label>
                  <Input id="prod-val-id" placeholder="Ex: PVP-2023-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prod-val-date">Date</Label>
                  <Input id="prod-val-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prod-val-responsible">Responsable</Label>
                  <Input id="prod-val-responsible" placeholder="Nom du responsable" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prod-val-status">Statut</Label>
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
                <Label>Tests de validation</Label>
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
                <Label htmlFor="prod-val-conclusion">Conclusion</Label>
                <Textarea
                  id="prod-val-conclusion"
                  placeholder="Conclusion de la validation produit"
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
                <div className="rounded-md border p-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-sm">Rapport_test_mecanique.pdf</li>
                    <li className="text-sm">Rapport_test_thermique.pdf</li>
                    <li className="text-sm">Rapport_test_chimique.pdf</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capability" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Études de capabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capability-id">ID Étude</Label>
                  <Input id="capability-id" placeholder="Ex: CAP-2023-001" />
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
                <Label>Résultats de capabilité</Label>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production-trial" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Essai de production</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ppap-submission" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Soumission PPAP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
