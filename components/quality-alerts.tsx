import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function QualityAlerts() {
  const alerts = [
    {
      id: 1,
      title: "Non-conformité détectée",
      description: "Problème de dimension sur pièce A-123",
      severity: "high",
      date: "2023-04-10",
    },
    {
      id: 2,
      title: "Retard livraison PPAP",
      description: "Client XYZ en attente de validation",
      severity: "medium",
      date: "2023-04-08",
    },
    {
      id: 3,
      title: "Écart MSA détecté",
      description: "GR&R > 30% sur caractéristique critique",
      severity: "high",
      date: "2023-04-05",
    },
    {
      id: 4,
      title: "Mise à jour PFMEA requise",
      description: "Nouveau mode de défaillance identifié",
      severity: "low",
      date: "2023-04-01",
    },
  ]

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "low":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="destructive" className="ml-2">
            Critique
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="ml-2 border-yellow-500 text-yellow-500">
            Moyen
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="ml-2 border-blue-500 text-blue-500">
            Faible
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Alertes qualité</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3">
              {getSeverityIcon(alert.severity)}
              <div>
                <div className="flex items-center">
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  {getSeverityBadge(alert.severity)}
                </div>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground">{alert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
