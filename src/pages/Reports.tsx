import { BarChart3, TrendingUp, Package, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import salesData from "@/data/sales.json";
import productsData from "@/data/products.json";
import expensesData from "@/data/expenses.json";
import cashflowData from "@/data/cashflow.json";

const Reports = () => {
  const totalRevenue = salesData.reduce((sum, s) => sum + s.total, 0);
  const totalExpenses = expensesData.reduce((sum, e) => sum + e.amount, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const lowStockItems = productsData.filter(p => p.qtyOnHand < 5).length;
  const totalCashInflow = cashflowData.reduce((sum, t) => sum + t.inflow, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">View business insights and reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">{totalRevenue.toLocaleString()} ETB</p>
            <p className="text-xs text-muted-foreground mt-1">From {salesData.length} sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{totalExpenses.toLocaleString()} ETB</p>
            <p className="text-xs text-muted-foreground mt-1">{expensesData.length} expense records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalProfit.toLocaleString()} ETB
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Profit Margin: {((totalProfit / totalRevenue) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{lowStockItems}</p>
            <p className="text-xs text-muted-foreground mt-1">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Report</CardTitle>
            <CardDescription>Overview of sales performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Sales</span>
              <span className="font-semibold">{salesData.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Average Sale Value</span>
              <span className="font-semibold">{(totalRevenue / salesData.length).toLocaleString()} ETB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Discounts Given</span>
              <span className="font-semibold text-destructive">
                {salesData.reduce((sum, s) => sum + s.discount, 0).toLocaleString()} ETB
              </span>
            </div>
            <Button className="w-full mt-4">Download Full Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Report</CardTitle>
            <CardDescription>Current inventory status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Products</span>
              <span className="font-semibold">{productsData.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">In Stock</span>
              <span className="font-semibold text-success">
                {productsData.filter(p => p.status === "In Stock").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Low Stock</span>
              <span className="font-semibold text-destructive">{lowStockItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Inventory Value</span>
              <span className="font-semibold">
                {productsData.reduce((sum, p) => sum + (p.costPrice * p.qtyOnHand), 0).toLocaleString()} ETB
              </span>
            </div>
            <Button className="w-full mt-4">Download Full Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Summary</CardTitle>
            <CardDescription>Financial overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Inflow</span>
              <span className="font-semibold text-success">{totalCashInflow.toLocaleString()} ETB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Outflow</span>
              <span className="font-semibold text-destructive">
                {cashflowData.reduce((sum, t) => sum + t.outflow, 0).toLocaleString()} ETB
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Net Cash Flow</span>
              <span className={`font-semibold ${(totalCashInflow - cashflowData.reduce((sum, t) => sum + t.outflow, 0)) >= 0 ? 'text-success' : 'text-destructive'}`}>
                {(totalCashInflow - cashflowData.reduce((sum, t) => sum + t.outflow, 0)).toLocaleString()} ETB
              </span>
            </div>
            <Button className="w-full mt-4">Download Full Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Expenses by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Rent", "Utilities", "Salary", "Maintenance"].map(category => {
              const categoryTotal = expensesData
                .filter(e => e.category === category)
                .reduce((sum, e) => sum + e.amount, 0);
              return (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{category}</span>
                  <span className="font-semibold">{categoryTotal.toLocaleString()} ETB</span>
                </div>
              );
            })}
            <Button className="w-full mt-4">Download Full Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
