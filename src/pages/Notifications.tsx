import { useState } from "react";
import { Bell, Check, CheckCheck, Trash2, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

const allNotifications: Notification[] = [
  {
    id: "1",
    title: "Low Stock Alert",
    message: "iPhone 15 Pro Max stock is running low. Only 3 units remaining in inventory. Consider reordering soon.",
    time: "5 minutes ago",
    date: "2024-01-20",
    read: false,
    type: "warning",
  },
  {
    id: "2",
    title: "Repair Completed",
    message: "Samsung Galaxy S24 repair job #1234 has been completed successfully. Customer has been notified.",
    time: "1 hour ago",
    date: "2024-01-20",
    read: false,
    type: "success",
  },
  {
    id: "3",
    title: "New Purchase Order",
    message: "Purchase order #5678 from Supplier XYZ has been received and processed. Stock updated automatically.",
    time: "2 hours ago",
    date: "2024-01-20",
    read: false,
    type: "info",
  },
  {
    id: "4",
    title: "Payment Received",
    message: "Customer payment of 25,000 ETB received via TeleBirr. Transaction ID: TBR123456789.",
    time: "3 hours ago",
    date: "2024-01-20",
    read: true,
    type: "success",
  },
  {
    id: "5",
    title: "USD Rate Updated",
    message: "Exchange rate has been updated to 1 USD = 126.50 ETB. All prices recalculated automatically.",
    time: "5 hours ago",
    date: "2024-01-20",
    read: true,
    type: "info",
  },
  {
    id: "6",
    title: "Overdue Repair Alert",
    message: "Repair job #9876 is overdue by 2 days. Customer follow-up required.",
    time: "1 day ago",
    date: "2024-01-19",
    read: true,
    type: "error",
  },
  {
    id: "7",
    title: "Stock Transfer Complete",
    message: "50 units successfully transferred from Main Branch to Branch 2.",
    time: "2 days ago",
    date: "2024-01-18",
    read: true,
    type: "success",
  },
  {
    id: "8",
    title: "High Expense Alert",
    message: "Monthly expenses exceeded budget by 15%. Review expense breakdown in reports.",
    time: "3 days ago",
    date: "2024-01-17",
    read: true,
    type: "warning",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || notification.type === filterType;
    return matchesSearch && matchesType;
  });

  const unreadNotifications = filteredNotifications.filter((n) => !n.read);
  const readNotifications = filteredNotifications.filter((n) => n.read);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card className={`${!notification.read ? "border-primary/50 bg-accent/30" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg">{notification.title}</h3>
              <Badge variant="outline" className={getTypeColor(notification.type)}>
                {notification.type}
              </Badge>
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
            <p className="text-muted-foreground mb-3">{notification.message}</p>
            <p className="text-sm text-muted-foreground">{notification.time}</p>
          </div>
          <div className="flex items-center gap-2">
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => markAsRead(notification.id)}
                title="Mark as read"
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteNotification(notification.id)}
              title="Delete"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            All ({filteredNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({readNotifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications found</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4 mt-6">
          {unreadNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No unread notifications</p>
              </CardContent>
            </Card>
          ) : (
            unreadNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-4 mt-6">
          {readNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No read notifications</p>
              </CardContent>
            </Card>
          ) : (
            readNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}