// src/components/AddProductDialog.tsx
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import productsDataSeed from "@/data/products.json";

const STORAGE_KEY = "inventorypro_products_v1";

type ProductPayload = {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  storage?: string;
  color?: string;
  qtyOnHand?: number;
  costPrice?: number;
  salePrice?: number;
  source?: string;
  imei?: string | null;
  serial?: string | null;
  warranty?: string | null;
  model?: string | null;
  status?: string;
  image?: string | null; // base64 data URL or path
  [key: string]: any;
};

function readProducts(): ProductPayload[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as ProductPayload[];
    }
  } catch (e) {
    console.warn("Failed to read products from localStorage", e);
  }
  // fallback to bundled seed (immutable copy)
  return JSON.parse(JSON.stringify(productsDataSeed)) as ProductPayload[];
}

function persistProducts(arr: ProductPayload[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr, null, 2));
}

/** trigger download of updated products.json so user can manually replace src/data/products.json */
function downloadProductsJson(arr: ProductPayload[]) {
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

export function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Controlled form fields — preserving every field from your original dialog
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [storage, setStorage] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [costPrice, setCostPrice] = useState<number | "">("");
  const [salePrice, setSalePrice] = useState<number | "">("");
  const [source, setSource] = useState("");
  const [imei, setImei] = useState("");
  const [serial, setSerial] = useState("");
  const [warranty, setWarranty] = useState("");
  const [model, setModel] = useState("");
  const [notes, setNotes] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      // reset form when dialog closes
      setName("");
      setBrand("");
      setCategory("");
      setStorage("");
      setColor("");
      setQuantity("");
      setCostPrice("");
      setSalePrice("");
      setSource("");
      setImei("");
      setSerial("");
      setWarranty("");
      setModel("");
      setNotes("");
      setImageDataUrl(null);
    }
  }, [open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setImageDataUrl(dataUrl);
    };
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast?.({ title: "Missing name", description: "Please provide a product name." });
      return;
    }

    // Prepare new product object consistent with your products.json schema
    const newProduct: ProductPayload = {
      id: `prod-${Math.random().toString(36).slice(2, 9)}`, // unique-ish id
      name: name.trim(),
      category: category || "Uncategorized",
      brand: brand || "",
      model: model || "",
      storage: storage || "",
      color: color || "",
      source: source || "",
      costPrice: costPrice === "" ? null : Number(costPrice),
      salePrice: salePrice === "" ? null : Number(salePrice),
      qtyOnHand: quantity === "" ? 0 : Number(quantity),
      imei: imei || undefined,
      serial: serial || undefined,
      warranty: warranty || undefined,
      status:
        quantity === "" ? "In Stock" : Number(quantity) <= 2 ? "Low Stock" : "In Stock",
      image: imageDataUrl || undefined,
      // you may include notes or other fields:
      notes: notes || undefined,
    };

    // persist in localStorage (app runtime)
    const current = readProducts();
    const updated = [newProduct, ...current];
    persistProducts(updated);

    // Give feedback
    toast?.({
      title: "Product Added",
      description: `${newProduct.name} added to inventory (saved locally).`,
    });

    // Offer downloadable JSON so user can override src/data/products.json manually
    // You can optionally remove this auto-download prompt if you don't want it
    setTimeout(() => {
      if (
        // eslint-disable-next-line no-restricted-globals
        confirm(
          "Would you like to download the updated products.json file now? (You can copy it to src/data/products.json to persist)"
        )
      ) {
        downloadProductsJson(updated);
      }
    }, 200);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Enter the product details to add it to your inventory.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Smartphones">Smartphones</SelectItem>
                  <SelectItem value="Laptops">Laptops</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Tablets">Tablets</SelectItem>
                  <SelectItem value="Phones">Phones</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="storage">Storage</Label>
              <Input id="storage" value={storage} onChange={(e) => setStorage(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" value={color} onChange={(e) => setColor(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="costPrice">Cost Price (ETB)</Label>
              <Input
                id="costPrice"
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value === "" ? "" : Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale Price (ETB)</Label>
              <Input
                id="salePrice"
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value === "" ? "" : Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select value={source} onValueChange={(v) => setSource(v)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Grey market">Grey Market</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imei">IMEI/Serial (Optional)</Label>
              <Input id="imei" value={imei} onChange={(e) => setImei(e.target.value)} />
            </div>
          </div>

          {/* extra fields preserved */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serial">Serial (Optional)</Label>
              <Input id="serial" value={serial} onChange={(e) => setSerial(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warranty">Warranty (Optional)</Label>
              <Input id="warranty" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model (Optional)</Label>
              <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={""} onValueChange={() => {}} >
                <SelectTrigger>
                  <SelectValue placeholder="(will be auto-set)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Image</Label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
            {imageDataUrl && (
              <img src={imageDataUrl} alt="preview" className="w-36 h-36 mt-2 object-cover rounded-md border" />
            )}
          </div>

          <div>
            <Label>Notes</Label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductDialog;
