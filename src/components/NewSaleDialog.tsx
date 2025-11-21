import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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

interface SaleItem {
  product: string;
  quantity: number;
  price: number;
}

export function NewSaleDialog() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SaleItem[]>([{ product: "", quantity: 1, price: 0 }]);
  const { toast } = useToast();

  const addItem = () => {
    setItems([...items, { product: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof SaleItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sale Recorded",
      description: "The sale has been successfully recorded.",
    });
    setOpen(false);
    setItems([{ product: "", quantity: 1, price: 0 }]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Sale</DialogTitle>
          <DialogDescription>
            Record a new sale transaction.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer Name (Optional)</Label>
              <Input id="customer" placeholder="Enter customer name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="TeleBirr">TeleBirr</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Sale Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5 space-y-2">
                  <Label>Product</Label>
                  <Select
                    value={item.product}
                    onValueChange={(value) => updateItem(index, "product", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iPhone 15 Pro">iPhone 15 Pro - 58,000 ETB</SelectItem>
                      <SelectItem value="Samsung S24">Samsung Galaxy S24 - 45,000 ETB</SelectItem>
                      <SelectItem value="AirPods Pro">AirPods Pro - 15,000 ETB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Qty</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="col-span-4 space-y-2">
                  <Label>Price (ETB)</Label>
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="col-span-1">
                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Subtotal:</span>
              <span className="font-semibold">{subtotal.toLocaleString()} ETB</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (ETB)</Label>
              <Input id="discount" type="number" placeholder="0" defaultValue="0" />
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-success">{subtotal.toLocaleString()} ETB</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Record Sale</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
