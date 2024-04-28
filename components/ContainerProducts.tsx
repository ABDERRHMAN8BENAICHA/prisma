
export default function ContainerProducts({children} : {children: React.ReactNode}){
    return (
        <div className="flex  flex-wrap  -space-x-4">
            {children}
        </div>
    )
}