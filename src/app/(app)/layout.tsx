'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, Milestone, Sparkles } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
    },
    {
      href: '/explanations',
      label: 'Adaptive Explanations',
      icon: Lightbulb,
    },
    {
      href: '/problem-solving',
      label: 'Guided Problem Solving',
      icon: Milestone,
    },
    {
      href: '/feedback',
      label: 'Instant Feedback',
      icon: Sparkles,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={{
                        children: item.label,
                        className: 'bg-primary text-primary-foreground',
                      }}
                      className="justify-start"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
             <SidebarTrigger className="md:hidden" />
             <div className="flex-1">
                <h1 className="text-xl font-semibold">
                  {menuItems.find(item => item.href === pathname)?.label || 'MentorAI'}
                </h1>
              </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
