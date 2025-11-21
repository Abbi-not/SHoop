import { useState } from "react";
import { Search, Plus, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import expensesData from "@/data/expenses.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredExpenses = expensesData.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(expensesData.map(e => e.category))];
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = categories.slice(1).map(category => ({
    name: category,
    amount: expensesData.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0)
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground mt-1">Track and manage business expenses</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-destructive" />
              <p className="text-2xl font-bold text-destructive">{totalExpenses.toLocaleString()} ETB</p>
            </div>
          </CardContent>
        </Card>

        {categoryTotals.slice(0, 3).map(cat => (
          <Card key={cat.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{cat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-foreground">{cat.amount.toLocaleString()} ETB</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expense ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Approved By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{expense.category}</Badge>
                </TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell className="font-semibold text-destructive">
                  {expense.amount.toLocaleString()} ETB
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{expense.paymentMethod}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{expense.approvedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Showing {filteredExpenses.length} of {expensesData.length} expenses</p>
      </div>
    </div>
  );
};

export default Expenses;
