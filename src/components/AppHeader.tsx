import { Link } from "react-router-dom";
import { Bell, User, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSidebar } from "@/components/ui/sidebar";

export function AppHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      {/* LEFT SIDE: sidebar toggle + title */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
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
  );
}
