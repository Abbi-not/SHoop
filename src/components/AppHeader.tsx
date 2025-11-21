import { Bell, PanelLeft, User } from "lucide-react";

export function AppHeader() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
          [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
          hover:bg-accent hover:text-accent-foreground
          h-7 w-7"
          data-sidebar="trigger"
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>

        {/* TITLE */}
        <h1 className="text-xl font-semibold text-foreground">SHoSHoP</h1>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
          [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
          hover:bg-accent hover:text-accent-foreground
          h-10 w-10 relative"
        >
          <Bell className="h-5 w-5" />
          {/* Notification Badge */}
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
        </button>

        {/* User Icon */}
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
          [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
          hover:bg-accent hover:text-accent-foreground
          h-10 w-10"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
