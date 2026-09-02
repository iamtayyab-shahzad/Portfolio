import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            That URL does not exist. Head back to the homepage or browse the work.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Go home</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              View work
            </ButtonLink>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
