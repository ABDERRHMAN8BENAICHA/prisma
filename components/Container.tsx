export default function Container({ children } : { children: React.ReactNode }) {
    return (
        <div className="container relative mt-20">
            {children}
        </div>
    )
}