import { useState } from "react";
import { Search, Plus, TrendingUp, TrendingDown } from "lucide-react";
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
import cashflowData from "@/data/cashflow.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CashFlow = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTransactions = cashflowData.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const totalInflow = filteredTransactions.reduce((sum, t) => sum + t.inflow, 0);
  const totalOutflow = filteredTransactions.reduce((sum, t) => sum + t.outflow, 0);
  const netBalance = totalInflow - totalOutflow;

  const transactionTypes = ["all", ...new Set(cashflowData.map(t => t.type))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cash Flow</h1>
          <p className="text-muted-foreground mt-1">Track all cash inflows and outflows</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Inflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <p className="text-2xl font-bold text-success">{totalInflow.toLocaleString()} ETB</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Outflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              <p className="text-2xl font-bold text-destructive">{totalOutflow.toLocaleString()} ETB</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
              {netBalance.toLocaleString()} ETB
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Transaction Type" />
          </SelectTrigger>
          <SelectContent>
            {transactionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type === "all" ? "All Types" : type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Inflow</TableHead>
              <TableHead>Outflow</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{transaction.type}</Badge>
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="font-semibold text-success">
                  {transaction.inflow > 0 ? `+${transaction.inflow.toLocaleString()} ETB` : "-"}
                </TableCell>
                <TableCell className="font-semibold text-destructive">
                  {transaction.outflow > 0 ? `-${transaction.outflow.toLocaleString()} ETB` : "-"}
                </TableCell>
                <TableCell className={`font-semibold ${transaction.balance >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {transaction.balance.toLocaleString()} ETB
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{transaction.reference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Showing {filteredTransactions.length} of {cashflowData.length} transactions</p>
      </div>
    </div>
  );
};

export default CashFlow;
