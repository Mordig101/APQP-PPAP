import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Phase3Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-10 w-[400px] mb-2" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Process list */}
        <div className="lg:col-span-1">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Processus</CardTitle>
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-[180px] mb-2" />
              <Skeleton className="h-2 w-full" />
            </CardHeader>
            <CardContent className="pb-1">
              <div className="flex items-center space-x-2 mb-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
            </CardContent>
            <div className="px-6 pb-6 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-[76px] w-full rounded-md" />
              ))}
            </div>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full mb-4" />

            <Card className="border shadow-sm">
              <CardHeader>
                <Skeleton className="h-6 w-[250px] mb-2" />
                <Skeleton className="h-4 w-[350px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-5 w-[150px] mb-2" />
                    <div className="flex items-center mb-1">
                      <Skeleton className="h-2 flex-1 mr-2" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-md" />
                      ))}
                    </div>
                  </div>

                  <Skeleton className="h-[1px] w-full" />

                  <div>
                    <Skeleton className="h-5 w-[150px] mb-2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-[80px] w-full rounded-md" />
                      ))}
                    </div>
                  </div>

                  <Skeleton className="h-[1px] w-full" />

                  <div>
                    <Skeleton className="h-5 w-[180px] mb-2" />
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-[70px] w-full rounded-md" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
