import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart2, FileUp, Download, Clock, CheckSquare, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Phase5Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phase 5: Production en série</h1>
          <p className="text-muted-foreground">Validation de la production et amélioration continue</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Projet: Composant A-123
          </Badge>
          <Badge variant="outline" className="text-sm">
            Client: Automotive Corp
          </Badge>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">En cours</Badge>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progression Phase 5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">17/20 tâches complétées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Indicateurs de performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="mt-2 text-xs text-muted-foreground">Taux de conformité</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Problèmes ouverts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="mt-2 text-xs text-muted-foreground">Nécessitant une action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prochaine revue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15/06/2023</div>
            <p className="mt-2 text-xs text-muted-foreground">Dans 12 jours</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="production">Suivi de production</TabsTrigger>
          <TabsTrigger value="metrics">Indicateurs</TabsTrigger>
          <TabsTrigger value="improvements">Améliorations</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Résumé de la phase 5</CardTitle>
              <CardDescription>
                La phase 5 concerne la production en série et l'amélioration continue du processus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Statut général</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Validation de la production</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Complété
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contrôle des processus</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Complété
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audit qualité</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Complété
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Amélioration continue</span>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        En cours
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Revue de performance</span>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        En cours
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Prochaines étapes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckSquare className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                      <span className="text-sm">Finaliser la revue de performance mensuelle</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                      <span className="text-sm">Mettre à jour le plan de contrôle basé sur les derniers résultats</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">Planifier l'audit qualité trimestriel</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">Analyser les opportunités d'amélioration continue</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Résumé des performances</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Qualité</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">98.7%</div>
                      <p className="text-xs text-muted-foreground">+1.2% vs mois précédent</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Livraison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">99.2%</div>
                      <p className="text-xs text-muted-foreground">+0.5% vs mois précédent</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Coût</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-600">97.1%</div>
                      <p className="text-xs text-muted-foreground">-0.3% vs mois précédent</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Problèmes et actions</CardTitle>
              <CardDescription>Problèmes identifiés et actions correctives en cours</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Date cible</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">P5-001</TableCell>
                    <TableCell>Variation dimensionnelle sur le composant X</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        Haute
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        En cours
                      </Badge>
                    </TableCell>
                    <TableCell>Jean Dupont</TableCell>
                    <TableCell>10/06/2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">P5-002</TableCell>
                    <TableCell>Optimisation du temps de cycle d'assemblage</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        Moyenne
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        En cours
                      </Badge>
                    </TableCell>
                    <TableCell>Marie Laurent</TableCell>
                    <TableCell>15/06/2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">P5-003</TableCell>
                    <TableCell>Mise à jour de la documentation technique</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Basse
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Complété
                      </Badge>
                    </TableCell>
                    <TableCell>Thomas Martin</TableCell>
                    <TableCell>01/06/2023</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suivi de production</CardTitle>
              <CardDescription>Données de production et contrôle des processus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Production journalière</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,250</div>
                    <p className="text-xs text-muted-foreground">Unités</p>
                    <p className="text-xs text-green-600">+50 vs objectif</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Taux de rebut</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0.8%</div>
                    <p className="text-xs text-muted-foreground">10 unités</p>
                    <p className="text-xs text-green-600">-0.2% vs objectif</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">OEE</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92.5%</div>
                    <p className="text-xs text-muted-foreground">Efficacité globale</p>
                    <p className="text-xs text-green-600">+2.5% vs objectif</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Temps de cycle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45s</div>
                    <p className="text-xs text-muted-foreground">Par unité</p>
                    <p className="text-xs text-amber-600">+2s vs objectif</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contrôle statistique des processus (SPC)</h3>
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Dimension critique A</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <BarChart2 className="h-16 w-16 mx-auto mb-2" />
                        <p>Graphique SPC - Dimension A</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Dimension critique B</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <BarChart2 className="h-16 w-16 mx-auto mb-2" />
                        <p>Graphique SPC - Dimension B</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Derniers lots produits</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lot</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Rebuts</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">L-2023-0125</TableCell>
                      <TableCell>05/06/2023</TableCell>
                      <TableCell>250</TableCell>
                      <TableCell>2 (0.8%)</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Validé
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">L-2023-0124</TableCell>
                      <TableCell>04/06/2023</TableCell>
                      <TableCell>250</TableCell>
                      <TableCell>3 (1.2%)</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Validé
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">L-2023-0123</TableCell>
                      <TableCell>03/06/2023</TableCell>
                      <TableCell>250</TableCell>
                      <TableCell>1 (0.4%)</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Validé
                        </Badge>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indicateurs de performance</CardTitle>
              <CardDescription>Suivi des KPIs de production et qualité</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Qualité</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Taux de conformité</span>
                        <span className="text-sm font-medium">98.7%</span>
                      </div>
                      <Progress value={98.7} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Objectif: 98%</span>
                        <span className="text-green-600">+0.7%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Taux de rebut</span>
                        <span className="text-sm font-medium">0.8%</span>
                      </div>
                      <Progress value={8} max={100} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Objectif: 1%</span>
                        <span className="text-green-600">-0.2%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Retours client</span>
                        <span className="text-sm font-medium">0.05%</span>
                      </div>
                      <Progress value={5} max={100} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Objectif: 0.1%</span>
                        <span className="text-green-600">-0.05%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Production</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">OEE</span>
                        <span className="text-sm font-medium">92.5%</span>
                      </div>
                      <Progress value={92.5} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Objectif: 90%</span>
                        <span className="text-green-600">+2.5%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Temps de cycle</span>
                        <span className="text-sm font-medium">45s</span>
                      </div>
                      <Progress value={45} max={43} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Objectif: 43s</span>
                        <span className="text-amber-600">+2s</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Livraison à temps</span>
                        <span className="text-sm font-medium">99.2%</span>
                      </div>
                      <Progress value={99.2} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Objectif: 98%</span>
                        <span className="text-green-600">+1.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Tendances mensuelles</h3>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <div className="text-center text-muted-foreground">
                    <BarChart2 className="h-16 w-16 mx-auto mb-2" />
                    <p>Graphique de tendance des KPIs sur 6 mois</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Comparaison avec les objectifs</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Indicateur</TableHead>
                      <TableHead>Actuel</TableHead>
                      <TableHead>Objectif</TableHead>
                      <TableHead>Écart</TableHead>
                      <TableHead>Tendance</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Taux de conformité</TableCell>
                      <TableCell>98.7%</TableCell>
                      <TableCell>98.0%</TableCell>
                      <TableCell className="text-green-600">+0.7%</TableCell>
                      <TableCell>↗️</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Conforme
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">OEE</TableCell>
                      <TableCell>92.5%</TableCell>
                      <TableCell>90.0%</TableCell>
                      <TableCell className="text-green-600">+2.5%</TableCell>
                      <TableCell>↗️</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Conforme
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Temps de cycle</TableCell>
                      <TableCell>45s</TableCell>
                      <TableCell>43s</TableCell>
                      <TableCell className="text-amber-600">+2s</TableCell>
                      <TableCell>→</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">
                          À améliorer
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Coût unitaire</TableCell>
                      <TableCell>12.35€</TableCell>
                      <TableCell>12.00€</TableCell>
                      <TableCell className="text-amber-600">+0.35€</TableCell>
                      <TableCell>↘️</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">
                          À améliorer
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Améliorations continues</CardTitle>
              <CardDescription>Initiatives d'amélioration et projets Kaizen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle initiative
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Initiatives en cours</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Impact estimé</TableHead>
                      <TableHead>Progression</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">IC-001</TableCell>
                      <TableCell>Réduction du temps de changement d'outil</TableCell>
                      <TableCell>SMED</TableCell>
                      <TableCell>+5% OEE</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={75} className="h-2 w-[100px]" />
                          <span className="text-xs">75%</span>
                        </div>
                      </TableCell>
                      <TableCell>Jean Dupont</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">IC-002</TableCell>
                      <TableCell>Optimisation du flux de production</TableCell>
                      <TableCell>Lean</TableCell>
                      <TableCell>-10% WIP</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={40} className="h-2 w-[100px]" />
                          <span className="text-xs">40%</span>
                        </div>
                      </TableCell>
                      <TableCell>Marie Laurent</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">IC-003</TableCell>
                      <TableCell>Réduction des défauts d'assemblage</TableCell>
                      <TableCell>Six Sigma</TableCell>
                      <TableCell>-50% défauts</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={90} className="h-2 w-[100px]" />
                          <span className="text-xs">90%</span>
                        </div>
                      </TableCell>
                      <TableCell>Thomas Martin</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Détail de l'initiative IC-001</CardTitle>
                  <CardDescription>Réduction du temps de changement d'outil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        Ce projet vise à réduire le temps de changement d'outil sur la ligne d'assemblage principale en
                        appliquant la méthodologie SMED (Single-Minute Exchange of Die). L'objectif est de réduire le
                        temps de changement de 45 minutes à moins de 10 minutes.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Bénéfices attendus</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Augmentation de l'OEE de 5%</li>
                        <li>• Réduction des stocks tampons de 15%</li>
                        <li>• Flexibilité accrue pour les changements de production</li>
                        <li>• Réduction des coûts opérationnels</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Plan d'action</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Étape</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Date cible</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>Analyse de la situation actuelle</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>15/05/2023</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2</TableCell>
                          <TableCell>Séparation des activités internes et externes</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Complété
                            </Badge>
                          </TableCell>
                          <TableCell>22/05/2023</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>3</TableCell>
                          <TableCell>Conversion des activités internes en externes</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700">
                              En cours
                            </Badge>
                          </TableCell>
                          <TableCell>10/06/2023</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>4</TableCell>
                          <TableCell>Rationalisation des opérations</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-100 text-slate-700">
                              Planifié
                            </Badge>
                          </TableCell>
                          <TableCell>20/06/2023</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>5</TableCell>
                          <TableCell>Formation des opérateurs</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-100 text-slate-700">
                              Planifié
                            </Badge>
                          </TableCell>
                          <TableCell>25/06/2023</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Résultats actuels</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Temps initial</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">45 min</div>
                          <p className="text-xs text-muted-foreground">Avant amélioration</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Temps actuel</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">18 min</div>
                          <p className="text-xs text-muted-foreground">-60% d'amélioration</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Objectif</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">10 min</div>
                          <p className="text-xs text-muted-foreground">À atteindre</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents de production</CardTitle>
              <CardDescription>Documentation technique et rapports de production</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <Button variant="outline">
                    <FileUp className="mr-2 h-4 w-4" />
                    Importer
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
                <Input placeholder="Rechercher..." className="w-[250px]" />
              </div>

              <Tabs defaultValue="production" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="production">Documents de production</TabsTrigger>
                  <TabsTrigger value="quality">Documents qualité</TabsTrigger>
                  <TabsTrigger value="reports">Rapports</TabsTrigger>
                </TabsList>

                <TabsContent value="production" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom du document</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Date de mise à jour</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Plan de contrôle</TableCell>
                        <TableCell>PDF</TableCell>
                        <TableCell>v2.3</TableCell>
                        <TableCell>01/06/2023</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Instructions de travail</TableCell>
                        <TableCell>PDF</TableCell>
                        <TableCell>v1.5</TableCell>
                        <TableCell>28/05/2023</TableCell>
                        <TableCell>Marie Laurent</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fiche de paramétrage machine</TableCell>
                        <TableCell>XLSX</TableCell>
                        <TableCell>v3.0</TableCell>
                        <TableCell>15/05/2023</TableCell>
                        <TableCell>Thomas Martin</TableCell>
                        <TableCell className="flex space-x-2">
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
                </TabsContent>

                <TabsContent value="quality" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom du document</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Date de mise à jour</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Rapport d'audit qualité</TableCell>
                        <TableCell>PDF</TableCell>
                        <TableCell>v1.0</TableCell>
                        <TableCell>02/06/2023</TableCell>
                        <TableCell>Sophie Dubois</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Procédure de contrôle qualité</TableCell>
                        <TableCell>PDF</TableCell>
                        <TableCell>v2.1</TableCell>
                        <TableCell>20/05/2023</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Rapport d'analyse des défauts</TableCell>
                        <TableCell>PPTX</TableCell>
                        <TableCell>v1.2</TableCell>
                        <TableCell>25/05/2023</TableCell>
                        <TableCell>Marie Laurent</TableCell>
                        <TableCell className="flex space-x-2">
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
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom du document</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Période</TableHead>
                        <TableHead>Date de création</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Rapport de production mensuel</TableCell>
                        <TableCell>PDF</TableCell>
                        <TableCell>Mai 2023</TableCell>
                        <TableCell>03/06/2023</TableCell>
                        <TableCell>Thomas Martin</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Analyse des KPIs</TableCell>
                        <TableCell>XLSX</TableCell>
                        <TableCell>Mai 2023</TableCell>
                        <TableCell>02/06/2023</TableCell>
                        <TableCell>Sophie Dubois</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            Télécharger
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Rapport d'amélioration continue</TableCell>
                        <TableCell>PDF</TableCell>
                        <TableCell>Q2 2023</TableCell>
                        <TableCell>01/06/2023</TableCell>
                        <TableCell>Jean Dupont</TableCell>
                        <TableCell className="flex space-x-2">
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
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
