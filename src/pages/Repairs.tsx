import { useState } from "react";
import { Search, Plus, Wrench } from "lucide-react";
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
import repairsData from "@/data/repairs.json";

const Repairs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRepairs = repairsData.filter((repair) => {
    const matchesSearch = repair.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || repair.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Repairs & Services</h1>
          <p className="text-muted-foreground mt-1">Track repair jobs and service requests</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Repair Job
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search repairs..."
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
            <SelectItem value="Received">Received</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Repair ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Parts</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Dates</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRepairs.map((repair) => (
              <TableRow key={repair.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    {repair.id}
                  </div>
                </TableCell>
                <TableCell>{repair.customer}</TableCell>
                <TableCell className="font-medium">{repair.device}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{repair.issue}</TableCell>
                <TableCell>{repair.technician}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {repair.parts.map((part, idx) => (
                      <p key={idx} className="text-sm">{part}</p>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-success">
                  {repair.cost.toLocaleString()} ETB
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(repair.status)}>
                    {repair.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <p>Received: {repair.receivedDate}</p>
                    {repair.completedDate && (
                      <p className="text-success">Completed: {repair.completedDate}</p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredRepairs.length} of {repairsData.length} repair jobs</p>
        <p className="font-semibold text-foreground">
          Total Revenue: {filteredRepairs.reduce((sum, r) => sum + r.cost, 0).toLocaleString()} ETB
        </p>
      </div>
    </div>
  );
};

export default Repairs;
