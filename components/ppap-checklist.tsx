import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FileUp } from "lucide-react"

export function PpapChecklist() {
  const ppapElements = [
    {
      id: "design-records",
      name: "Design Records",
      description: "Enregistrements de conception",
      status: "completed",
    },
    {
      id: "engineering-change",
      name: "Engineering Change Documents",
      description: "Documents de modification technique",
      status: "completed",
    },
    {
      id: "customer-approval",
      name: "Customer Engineering Approval",
      description: "Approbation technique client",
      status: "pending",
    },
    {
      id: "design-fmea",
      name: "Design FMEA",
      description: "AMDEC Conception",
      status: "completed",
    },
    {
      id: "process-flow",
      name: "Process Flow Diagram",
      description: "Synoptique de fabrication",
      status: "completed",
    },
    {
      id: "process-fmea",
      name: "Process FMEA",
      description: "AMDEC Process",
      status: "completed",
    },
    {
      id: "control-plan",
      name: "Control Plan",
      description: "Plan de surveillance",
      status: "pending",
    },
    {
      id: "msa-studies",
      name: "MSA Studies",
      description: "Études R&R",
      status: "pending",
    },
    {
      id: "dimensional-results",
      name: "Dimensional Results",
      description: "Résultats dimensionnels",
      status: "not-started",
    },
    {
      id: "material-tests",
      name: "Material/Performance Test Results",
      description: "Résultats des tests matière/performance",
      status: "not-started",
    },
    {
      id: "initial-studies",
      name: "Initial Process Studies",
      description: "Études process initiales",
      status: "not-started",
    },
    {
      id: "qualified-lab",
      name: "Qualified Laboratory Documentation",
      description: "Documentation laboratoire qualifié",
      status: "not-started",
    },
    {
      id: "appearance-approval",
      name: "Appearance Approval Report",
      description: "Rapport d'approbation d'aspect",
      status: "not-started",
    },
    {
      id: "sample-parts",
      name: "Sample Production Parts",
      description: "Échantillons de pièces de production",
      status: "not-started",
    },
    {
      id: "master-sample",
      name: "Master Sample",
      description: "Échantillon maître",
      status: "not-started",
    },
    {
      id: "checking-aids",
      name: "Checking Aids",
      description: "Moyens de contrôle",
      status: "not-started",
    },
    {
      id: "customer-requirements",
      name: "Customer-Specific Requirements",
      description: "Exigences spécifiques client",
      status: "not-started",
    },
    {
      id: "part-submission",
      name: "Part Submission Warrant (PSW)",
      description: "Certificat de soumission de pièce",
      status: "not-started",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {ppapElements.map((element) => (
          <div key={element.id} className="flex items-start justify-between rounded-lg border p-4">
            <div className="flex items-start space-x-3">
              <Checkbox id={element.id} checked={element.status === "completed"} />
              <div className="space-y-1">
                <Label
                  htmlFor={element.id}
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {element.name}
                </Label>
                <p className="text-sm text-muted-foreground">{element.description}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <FileUp className="mr-2 h-4 w-4" />
              Importer
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
