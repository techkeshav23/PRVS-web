import { TopBar } from "@/components/public/top-bar";
import { Header } from "@/components/public/header";
import { BottomNav } from "@/components/public/bottom-nav";
import { Footer } from "@/components/public/footer";
import { FloatingActions } from "@/components/public/floating-actions";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Header />
      <main id="main-content" className="min-h-screen pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <BottomNav />
      <FloatingActions />
    </>
  );
}
