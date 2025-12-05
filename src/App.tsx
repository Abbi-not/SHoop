import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Repairs from "./pages/Repairs";
import CashFlow from "./pages/CashFlow";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import { Bell, User, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />

              {/* MAIN CONTENT AREA */}
              <main className="flex-1 bg-background">

                {/* ⭐ GLOBAL HEADER (appears on every page) */}
                <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">

                  {/* LEFT SIDE: sidebar toggle + title */}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      data-sidebar="trigger"
                      className="h-7 w-7"
                    >
                      <PanelLeft className="h-4 w-4" />
                      <span className="sr-only">Toggle Sidebar</span>
                    </Button>

                    <h1 className="text-xl font-semibold text-foreground">
                      SHoSHoP
                    </h1>
                  </div>

                  {/* RIGHT SIDE: theme toggle + notifications + user */}
                  <div className="flex items-center gap-3">
                    {/* THEME TOGGLE */}
                    <ThemeToggle />

                    {/* NOTIFICATION BUTTON */}
                    <Link to="/notifications">
                      <Button variant="ghost" size="icon" className="relative h-10 w-10">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                      </Button>
                    </Link>
                    
                    {/* USER BUTTON */}
                    <Link to="/profile">
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </header>

                {/* ROUTES BELOW HEADER */}
                <div className="p-6">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/purchases" element={<Purchases />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/repairs" element={<Repairs />} />
                    <Route path="/cash-flow" element={<CashFlow />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
