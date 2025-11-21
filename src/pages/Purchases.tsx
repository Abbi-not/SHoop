import { useState } from "react";
import { Search, Plus, FileText } from "lucide-react";
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
import purchasesData from "@/data/purchases.json";

const Purchases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPurchases = purchasesData.filter((purchase) => {
    const matchesSearch = purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Purchases</h1>
          <p className="text-muted-foreground mt-1">Manage purchase orders and suppliers</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Purchase
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search purchases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Received">Received</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPurchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="font-medium">{purchase.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {purchase.date}
                  </div>
                </TableCell>
                <TableCell>{purchase.supplier}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {purchase.items.map((item, idx) => (
                      <p key={idx} className="text-sm">
                        {item.productName} <span className="text-muted-foreground">x{item.quantity}</span>
                      </p>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{purchase.subtotal.toLocaleString()} ETB</TableCell>
                <TableCell className="text-destructive">
                  {purchase.discount > 0 ? `-${purchase.discount.toLocaleString()} ETB` : "-"}
                </TableCell>
                <TableCell className="font-semibold">
                  {purchase.total.toLocaleString()} ETB
                </TableCell>
                <TableCell>
                  <Badge variant={purchase.status === "Received" ? "default" : "secondary"}>
                    {purchase.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={purchase.paymentStatus === "Paid" ? "default" : "secondary"}>
                    {purchase.paymentStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredPurchases.length} of {purchasesData.length} purchases</p>
        <p className="font-semibold text-foreground">
          Total: {filteredPurchases.reduce((sum, p) => sum + p.total, 0).toLocaleString()} ETB
        </p>
      </div>
    </div>
  );
};

export default Purchases;
