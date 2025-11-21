import { Package, DollarSign, ShoppingCart, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import productsData from "@/data/products.json";
import salesData from "@/data/sales.json";
import alertsData from "@/data/alerts.json";

const Dashboard = () => {
  // Calculate metrics
  const totalProducts = productsData.length;
  const lowStockProducts = productsData.filter(p => p.status === "Low Stock").length;
  const totalInventoryValue = productsData.reduce((sum, p) => sum + (p.salePrice * p.qtyOnHand), 0);
  
  const todaySales = salesData.filter(s => s.date === "2025-01-20");
  const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0);
  
  const recentAlerts = alertsData.slice(0, 3);
  const recentSales = salesData.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your inventory and sales</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          variant="default"
        />
        <StatCard
          title="Today's Revenue"
          value={`${todayRevenue.toLocaleString()} ETB`}
          icon={DollarSign}
          trend={{ value: "12% from yesterday", isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Today's Sales"
          value={todaySales.length}
          icon={ShoppingCart}
          variant="default"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockProducts}
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                  alert.severity === "critical" ? "text-destructive" : "text-warning"
                }`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
          <div className="space-y-3">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{sale.customer}</p>
                  <p className="text-xs text-muted-foreground">{sale.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-semibold">{sale.total.toLocaleString()} ETB</p>
                  <Badge variant="secondary" className="text-xs">{sale.paymentMethod}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Inventory Summary</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Inventory Value</p>
            <p className="text-2xl font-bold text-foreground">{totalInventoryValue.toLocaleString()} ETB</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Products In Stock</p>
            <p className="text-2xl font-bold text-success">
              {productsData.filter(p => p.status === "In Stock").length}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Products Low Stock</p>
            <p className="text-2xl font-bold text-warning">{lowStockProducts}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
