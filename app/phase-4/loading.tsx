import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Phase4Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[400px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <Skeleton className="h-10 w-full" />

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-[300px]" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-[200px] w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-[100px] w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-[180px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-[160px]" />
              <Skeleton className="h-10 w-[300px]" />
            </div>
            <Skeleton className="h-[100px] w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
