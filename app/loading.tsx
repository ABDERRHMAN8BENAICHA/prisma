import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="w-screen h-[90vh] flex justify-center items-center">
            {/* <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div> */}
            <span className="loader"></span>
        </div>
    )
}


