"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ClipboardList, FileCheck, GitBranch, Home, Layers, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Tableau de bord",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Phase 1: Plan & Define",
      icon: ClipboardList,
      href: "/phase-1",
      active: pathname === "/phase-1",
    },
    {
      label: "Phase 2: Conception Produit",
      icon: Layers,
      href: "/phase-2",
      active: pathname === "/phase-2",
    },
    {
      label: "Phase 3: Conception Process",
      icon: Layers,
      href: "/phase-3",
      active: pathname === "/phase-3",
    },
    {
      label: "Phase 4: Validation",
      icon: FileCheck,
      href: "/phase-4",
      active: pathname === "/phase-4",
    },
    {
      label: "Phase 5: Feedback",
      icon: BarChart3,
      href: "/phase-5",
      active: pathname === "/phase-5",
    },
    {
      label: "Dossiers PPAP",
      icon: FileCheck,
      href: "/ppap",
      active: pathname === "/ppap",
    },
    {
      label: "Équipe projet",
      icon: Users,
      href: "/users",
      active: pathname === "/users",
    },
    {
      label: "Diagramme APQP",
      icon: GitBranch,
      href: "/diagram",
      active: pathname === "/diagram",
    },
    {
      label: "Paramètres",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className="flex flex-col border-r bg-gray-100/40 dark:bg-gray-900/40 w-64 min-h-screen">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">APQP/PPAP</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-all",
                route.active
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 dark:text-gray-400",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
