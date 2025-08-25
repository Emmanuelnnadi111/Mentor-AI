import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Milestone, Sparkles, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6" />
            <span className="font-bold sm:inline-block">
              MentorAI
            </span>
          </Link>
          <nav className="flex flex-1 items-center space-x-4 sm:justify-end">
            <Link
              href="/dashboard"
              className="hidden font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:block"
            >
              Dashboard
            </Link>
            <Button asChild size="sm">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Your Potential with MentorAI
                  </h1>
                  <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                    Your personal AI-powered tutor for accelerated learning. Get tailored explanations, guided problem-solving, and instant feedback.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Start Learning Now</Link>
                  </Button>
                </div>
              </div>
              <Image
                data-ai-hint="robot learning"
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Accelerate Your Learning</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MentorAI provides a suite of tools designed to help you master new concepts faster and more effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <Lightbulb className="w-12 h-12 mb-4 text-yellow-500" />
                  <CardTitle>Adaptive Explanations</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Get explanations tailored to your level of understanding.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <Milestone className="w-12 h-12 mb-4 text-blue-500" />
                  <CardTitle>Guided Problem Solving</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Break down complex problems into smaller, manageable steps.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <Sparkles className="w-12 h-12 mb-4 text-purple-500" />
                  <CardTitle>Instant Feedback</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Receive immediate AI-powered feedback on your answers.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 MentorAI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
