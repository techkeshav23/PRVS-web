import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
