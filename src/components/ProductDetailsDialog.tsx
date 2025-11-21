// src/components/ProductDetailsDialog.tsx
import React, { useEffect, useState } from "react";
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
import productsDataSeed from "@/data/products.json";

const STORAGE_KEY = "inventorypro_products_v1";

type Product = {
  id: string | number;
  name: string;
  brand?: string;
  category?: string;
  model?: string;
  storage?: string;
  color?: string;
  source?: string;
  warranty?: string | null;
  imei?: string | null;
  costPrice?: number | null;
  salePrice?: number | null;
  qtyOnHand?: number;
  image?: string | null;
  status?: string;
  serial?: string | null;
  notes?: string | null;
  [key: string]: any;
};

function readProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Product[];
    }
  } catch (e) {
    console.warn("Failed to read products from localStorage", e);
  }
  return JSON.parse(JSON.stringify(productsDataSeed)) as Product[];
}

function persistProducts(arr: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr, null, 2));
}

function downloadProductsJson(arr: Product[]) {
  const blob = new Blob([JSON.stringify(arr, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "products.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function ProductDetailsDialog({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Product>({ ...product });
  const [imagePreview, setImagePreview] = useState<string | null>(product.image ?? null);

  useEffect(() => {
    setForm({ ...product });
    setImagePreview(product.image ?? null);
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const d = String(reader.result || "");
      setImagePreview(d);
      setForm((s) => ({ ...s, image: d }));
    };
    reader.readAsDataURL(f);
  };

  const handleSave = () => {
    // update localStorage
    const all = readProducts();
    const updated = all.map((p) => (String(p.id) === String(form.id) ? { ...p, ...form } : p));
    persistProducts(updated);

    // ask user to download updated products.json (optional)
    setTimeout(() => {
      if (confirm("Download updated products.json to persist changes to file?")) {
        downloadProductsJson(updated);
      }
    }, 100);

    setEditing(false);
    // reflect saved form as current product
    // parent page closes dialog; we still call onClose to let it re-open with fresh data if desired
    onClose();
  };

  const handleArchive = () => {
    if (!confirm(`Archive ${product.name}?`)) return;
    const all = readProducts();
    const updated = all.map((p) => (String(p.id) === String(product.id) ? { ...p, status: "Archived" } : p));
    persistProducts(updated);
    onClose();
  };

  const adjustStock = (delta: number) => {
    const all = readProducts();
    const updated = all.map((p) =>
      String(p.id) === String(product.id) ? { ...p, qtyOnHand: Math.max(0, (p.qtyOnHand || 0) + delta) } : p
    );
    persistProducts(updated);
    // update local view
    setForm((f) => ({ ...f, qtyOnHand: Math.max(0, (f.qtyOnHand || 0) + delta) }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            {imagePreview ? (
              <img src={imagePreview} alt={product.name} className="w-full h-48 object-cover rounded-md border" />
            ) : (
              <div className="w-full h-48 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}

            <div className="mt-4 space-y-2 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Stock</div>
                <div className="text-lg font-medium">{form.qtyOnHand ?? 0}</div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">Cost</div>
                <div className="text-sm font-medium">{form.costPrice ?? "-"}</div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">Sale</div>
                <div className="text-sm font-medium">{form.salePrice ?? "-"}</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            {!editing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Brand</div>
                    <div className="font-medium">{form.brand ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Category</div>
                    <div className="font-medium">{form.category ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Model</div>
                    <div className="font-medium">{form.model ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Storage</div>
                    <div className="font-medium">{form.storage ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Color</div>
                    <div className="font-medium">{form.color ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">IMEI/Serial</div>
                    <div className="font-medium">{form.imei ?? form.serial ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Warranty</div>
                    <div className="font-medium">{form.warranty ?? "-"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Source</div>
                    <div className="font-medium">{form.source ?? "-"}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-3">
                  <Button onClick={() => setEditing(true)}>Edit</Button>
                  <Button variant="outline" onClick={handleArchive}>Archive</Button>

                  <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" onClick={() => adjustStock(-1)} disabled={(form.qtyOnHand ?? 0) <= 0}>-1</Button>
                    <Button size="sm" onClick={() => adjustStock(1)}>+1</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Product Name</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>

                  <div>
                    <Label>Brand</Label>
                    <Input value={form.brand ?? ""} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Input value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  </div>

                  <div>
                    <Label>Model</Label>
                    <Input value={form.model ?? ""} onChange={(e) => setForm({ ...form, model: e.target.value })} />
                  </div>

                  <div>
                    <Label>Storage</Label>
                    <Input value={form.storage ?? ""} onChange={(e) => setForm({ ...form, storage: e.target.value })} />
                  </div>

                  <div>
                    <Label>Color</Label>
                    <Input value={form.color ?? ""} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                  </div>

                  <div>
                    <Label>Sale Price</Label>
                    <Input
                      type="number"
                      value={form.salePrice ?? ""}
                      onChange={(e) => setForm({ ...form, salePrice: e.target.value ? Number(e.target.value) : null })}
                    />
                  </div>

                  <div>
                    <Label>Cost Price</Label>
                    <Input
                      type="number"
                      value={form.costPrice ?? ""}
                      onChange={(e) => setForm({ ...form, costPrice: e.target.value ? Number(e.target.value) : null })}
                    />
                  </div>

                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={form.qtyOnHand ?? 0}
                      onChange={(e) => setForm({ ...form, qtyOnHand: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <Label>IMEI</Label>
                    <Input value={form.imei ?? ""} onChange={(e) => setForm({ ...form, imei: e.target.value })} />
                  </div>

                  <div>
                    <Label>Serial</Label>
                    <Input value={form.serial ?? ""} onChange={(e) => setForm({ ...form, serial: e.target.value })} />
                  </div>

                  <div>
                    <Label>Warranty</Label>
                    <Input value={form.warranty ?? ""} onChange={(e) => setForm({ ...form, warranty: e.target.value })} />
                  </div>
                </div>

                <div>
                  <Label>Change Image</Label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1" />
                  {imagePreview && <img src={imagePreview} className="w-36 h-36 mt-2 object-cover rounded-md border" alt="preview" />}
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="ghost" onClick={() => { setEditing(false); setForm({ ...product }); setImagePreview(product.image ?? null); }}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
