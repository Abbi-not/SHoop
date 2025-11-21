import { useState } from "react";
import { Search, Plus, Mail, Phone, Warehouse } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import suppliersData from "@/data/suppliers.json";

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = suppliersData.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Suppliers</h1>
          <p className="text-muted-foreground mt-1">Manage supplier information and payables</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier ID</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Total Purchases</TableHead>
              <TableHead>Outstanding Payable</TableHead>
              <TableHead>Last Purchase</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Warehouse className="h-4 w-4 text-muted-foreground" />
                    {supplier.name}
                  </div>
                </TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {supplier.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {supplier.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  {supplier.totalPurchases.toLocaleString()} ETB
                </TableCell>
                <TableCell>
                  {supplier.outstandingPayable > 0 ? (
                    <span className="text-destructive font-medium">
                      {supplier.outstandingPayable.toLocaleString()} ETB
                    </span>
                  ) : (
                    <span className="text-success font-medium">Paid</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{supplier.lastPurchase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredSuppliers.length} of {suppliersData.length} suppliers</p>
        <p className="font-semibold text-destructive">
          Total Payables: {filteredSuppliers.reduce((sum, s) => sum + s.outstandingPayable, 0).toLocaleString()} ETB
        </p>
      </div>
    </div>
  );
};

export default Suppliers;
