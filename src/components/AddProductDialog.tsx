import { useState } from "react";
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

export function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // NEW: for image upload
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Image will be available in `image` variable as base64.

    toast({
      title: "Product Added",
      description: "The product has been successfully added to inventory.",
    });

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
          <DialogDescription>
            Enter the product details to add it to your inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ---------- IMAGE UPLOAD ADDED HERE ---------- */}
          <div className="space-y-2">
            <Label htmlFor="productImage">Product Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />

            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-32 h-32 rounded-md border object-cover mt-2"
              />
            )}
          </div>
          {/* ---------- END IMAGE UPLOAD ---------- */}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="iPhone 15 Pro" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" placeholder="Apple" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Smartphones">Smartphones</SelectItem>
                  <SelectItem value="Laptops">Laptops</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Tablets">Tablets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storage">Storage</Label>
              <Input id="storage" placeholder="256GB" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" placeholder="Space Black" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" placeholder="10" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="costPrice">Cost Price (ETB)</Label>
              <Input id="costPrice" type="number" placeholder="50000" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale Price (ETB)</Label>
              <Input id="salePrice" type="number" placeholder="58000" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Grey Market">Grey Market</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imei">IMEI/Serial (Optional)</Label>
              <Input id="imei" placeholder="123456789012345" />
            </div>
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
