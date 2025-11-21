import { useState } from "react";
import { Search, Calendar } from "lucide-react";
import { NewSaleDialog } from "@/components/NewSaleDialog";
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
import salesData from "@/data/sales.json";

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const filteredSales = salesData.filter((sale) => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayment = paymentFilter === "all" || sale.paymentMethod === paymentFilter;
    
    return matchesSearch && matchesPayment;
  });

  const paymentMethods = ["all", ...new Set(salesData.map(s => s.paymentMethod))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales</h1>
          <p className="text-muted-foreground mt-1">Track and manage sales transactions</p>
        </div>
        <NewSaleDialog />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method} value={method}>
                {method === "all" ? "All Methods" : method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sale ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {sale.date}
                  </div>
                </TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {sale.items.map((item, idx) => (
                      <p key={idx} className="text-sm">
                        {item.productName} <span className="text-muted-foreground">x{item.quantity}</span>
                      </p>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{sale.subtotal.toLocaleString()} ETB</TableCell>
                <TableCell className="text-destructive">
                  {sale.discount > 0 ? `-${sale.discount.toLocaleString()} ETB` : "-"}
                </TableCell>
                <TableCell className="font-semibold text-success">
                  {sale.total.toLocaleString()} ETB
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{sale.paymentMethod}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="default">{sale.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredSales.length} of {salesData.length} sales</p>
        <p className="font-semibold text-foreground">
          Total Revenue: {filteredSales.reduce((sum, s) => sum + s.total, 0).toLocaleString()} ETB
        </p>
      </div>
    </div>
  );
};

export default Sales;
