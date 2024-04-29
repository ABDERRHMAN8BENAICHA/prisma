import Container from "@/components/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    );
}