import { useState } from "react";
import { Search, Plus, Mail, Phone } from "lucide-react";
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
import customersData from "@/data/customers.json";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customersData.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage customer information and accounts</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Total Purchases</TableHead>
              <TableHead>Outstanding</TableHead>
              <TableHead>Loyalty Points</TableHead>
              <TableHead>Last Purchase</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-success">
                  {customer.totalPurchases.toLocaleString()} ETB
                </TableCell>
                <TableCell>
                  {customer.outstandingBalance > 0 ? (
                    <span className="text-destructive font-medium">
                      {customer.outstandingBalance.toLocaleString()} ETB
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{customer.loyaltyPoints} pts</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.lastPurchase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredCustomers.length} of {customersData.length} customers</p>
      </div>
    </div>
  );
};

export default Customers;
