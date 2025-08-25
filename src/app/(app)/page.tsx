'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, Milestone, Sparkles } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Adaptive Explanations',
    description: 'Get explanations tailored to your level of understanding.',
    icon: Lightbulb,
    href: '/explanations',
    color: 'text-yellow-500',
  },
  {
    title: 'Guided Problem Solving',
    description: 'Break down complex problems into smaller, manageable steps.',
    icon: Milestone,
    href: '/problem-solving',
    color: 'text-blue-500',
  },
  {
    title: 'Instant Feedback',
    description: 'Receive immediate AI-powered feedback on your answers.',
    icon: Sparkles,
    href: '/feedback',
    color: 'text-purple-500',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to MentorAI</h1>
        <p className="text-muted-foreground">Your personal AI-powered tutor for accelerated learning.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title}>
            <Card className="flex h-full flex-col justify-between transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="flex-shrink-0">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
       <div className="relative mt-8 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Get Started
          </span>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Ready to enhance your learning journey? Select a feature above to begin.
      </p>
    </div>
  );
}
