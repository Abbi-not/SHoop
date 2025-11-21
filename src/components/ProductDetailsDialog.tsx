// src/components/ProductDetailsDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Product = {
  id: string | number;
  name: string;
  brand?: string;
  category?: string;
  sku?: string;
  storage?: string;
  color?: string;
  source?: string;
  warranty?: string | null;
  imei?: string | null;
  costPrice?: number | null;
  salePrice?: number | null;
  qty?: number;
  image?: string | null;
  archived?: boolean;
  [key: string]: any;
};

export function ProductDetailsDialog({
  product,
  onClose,
  onEdit,
  onArchive,
  onAdjustStock,
}: {
  product: Product;
  onClose: () => void;
  onEdit?: (updated: Product) => void;
  onArchive?: () => void;
  onAdjustStock?: (delta: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Product>({ ...product });

  const handleSave = () => {
    setEditing(false);
    onEdit?.(form);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md border"
              />
            ) : (
              <div className="w-full h-48 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}

            <div className="mt-4 space-y-2 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Stock</div>
                <div className="text-lg font-medium">{product.qty ?? 0}</div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">Cost</div>
                <div className="text-sm font-medium">{product.costPrice ?? "-"}</div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">Sale</div>
                <div className="text-sm font-medium">{product.salePrice ?? "-"}</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            {!editing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Brand</div>
                    <div className="font-medium">{product.brand ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Category</div>
                    <div className="font-medium">{product.category ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Storage</div>
                    <div className="font-medium">{product.storage ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Color</div>
                    <div className="font-medium">{product.color ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">IMEI</div>
                    <div className="font-medium">{product.imei ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Warranty</div>
                    <div className="font-medium">{product.warranty ?? "-"}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-3">
                  <Button onClick={() => setEditing(true)}>Edit</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (confirm(`Are you sure you want to archive "${product.name}"?`)) {
                        onArchive?.();
                        onClose();
                      }
                    }}
                  >
                    Archive
                  </Button>

                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => onAdjustStock?.(-1)}
                      disabled={(product.qty ?? 0) <= 0}
                    >
                      -1
                    </Button>
                    <Button size="sm" onClick={() => onAdjustStock?.(1)}>
                      +1
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Product Name</Label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Brand</Label>
                    <Input
                      value={form.brand ?? ""}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Input
                      value={form.category ?? ""}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>SKU</Label>
                    <Input
                      value={form.sku ?? ""}
                      onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Sale Price</Label>
                    <Input
                      type="number"
                      value={form.salePrice ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, salePrice: e.target.value ? Number(e.target.value) : null })
                      }
                    />
                  </div>

                  <div>
                    <Label>Cost Price</Label>
                    <Input
                      type="number"
                      value={form.costPrice ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, costPrice: e.target.value ? Number(e.target.value) : null })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="ghost" onClick={() => { setEditing(false); setForm({ ...product }); }}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
