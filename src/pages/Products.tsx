import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { AddProductDialog } from "@/components/AddProductDialog";
import { ProductDetailsDialog } from "@/components/ProductDetailsDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import productsData from "@/data/products.json";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // NEW: state for selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ["all", ...new Set(productsData.map((p) => p.category))];

  return (
    <div className="space-y-6">
      {/* HEADER + ADD BUTTON */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product inventory
          </p>
        </div>

        {/* ✔ ADD PRODUCT BUTTON BACK */}
        <AddProductDialog />
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
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

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="In Stock">In Stock</SelectItem>
            <SelectItem value="Low Stock">Low Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* TABLE */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Storage</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Cost Price</TableHead>
              <TableHead>Sale Price</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                className="cursor-pointer hover:bg-muted transition"
                onClick={() => setSelectedProduct(product)}
              >
                <TableCell className="font-medium">
                  <div>
                    <p>{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.color}
                    </p>
                  </div>
                </TableCell>

                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.storage}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      product.qtyOnHand < 5 ? "destructive" : "secondary"
                    }
                  >
                    {product.qtyOnHand}
                  </Badge>
                </TableCell>

                <TableCell>
                  {product.costPrice.toLocaleString()} ETB
                </TableCell>

                <TableCell className="font-semibold">
                  {product.salePrice.toLocaleString()} ETB
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      product.source === "Formal" ? "default" : "secondary"
                    }
                  >
                    {product.source}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      product.status === "In Stock"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredProducts.length} of {productsData.length} products</p>
      </div>

      {/* PRODUCT DETAILS DIALOG */}
      {selectedProduct && (
        <ProductDetailsDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Products;
