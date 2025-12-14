import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Sweets, SweetCategories } from '@/entities';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Image } from '@/components/ui/image';

export default function AdminDashboard() {
  const { member } = useMember();
  const { toast } = useToast();
  const [sweets, setSweets] = useState<Sweets[]>([]);
  const [categories, setCategories] = useState<SweetCategories[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweets | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockLevel: '',
    mainImage: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [sweetsData, categoriesData] = await Promise.all([
      BaseCrudService.getAll<Sweets>('sweets'),
      BaseCrudService.getAll<SweetCategories>('sweetcategories'),
    ]);
    setSweets(sweetsData.items);
    setCategories(categoriesData.items);
    setIsLoading(false);
  };

  const handleOpenDialog = (sweet?: Sweets) => {
    if (sweet) {
      setEditingSweet(sweet);
      setFormData({
        name: sweet.name || '',
        description: sweet.description || '',
        price: sweet.price?.toString() || '',
        category: sweet.category || '',
        stockLevel: sweet.stockLevel?.toString() || '',
        mainImage: sweet.mainImage || '',
      });
    } else {
      setEditingSweet(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stockLevel: '',
        mainImage: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSweet(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stockLevel: '',
      mainImage: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sweetData: Sweets = {
      _id: editingSweet?._id || crypto.randomUUID(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stockLevel: parseInt(formData.stockLevel),
      mainImage: formData.mainImage,
    };

    if (editingSweet) {
      await BaseCrudService.update<Sweets>('sweets', sweetData);
      toast({
        title: 'Sweet Updated',
        description: 'The sweet has been updated successfully.',
      });
    } else {
      await BaseCrudService.create('sweets', sweetData);
      toast({
        title: 'Sweet Added',
        description: 'The sweet has been added successfully.',
      });
    }

    await loadData();
    handleCloseDialog();
  };

  const handleDelete = async (sweetId: string) => {
    if (confirm('Are you sure you want to delete this sweet?')) {
      await BaseCrudService.delete('sweets', sweetId);
      toast({
        title: 'Sweet Deleted',
        description: 'The sweet has been deleted successfully.',
      });
      await loadData();
    }
  };

  const handleRestock = async (sweet: Sweets) => {
    const newStock = prompt(
      `Enter new stock level for ${sweet.name}:`,
      sweet.stockLevel?.toString() || '0'
    );
    if (newStock !== null) {
      await BaseCrudService.update<Sweets>('sweets', {
        _id: sweet._id,
        stockLevel: parseInt(newStock),
      });
      toast({
        title: 'Stock Updated',
        description: 'The stock level has been updated successfully.',
      });
      await loadData();
    }
  };

  const filteredSweets = sweets.filter((sweet) =>
    sweet.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!member?.isAdmin) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-secondary mb-4">
            Access Denied
          </h1>
          <p className="text-lg font-paragraph text-secondary/70">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-secondary py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-secondary-foreground mb-4">
              Admin Dashboard
            </h1>
            <p className="text-lg font-paragraph text-secondary-foreground/80">
              Manage your sweet inventory
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="w-full py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          {/* Actions Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary/40" />
              <Input
                type="text"
                placeholder="Search sweets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button onClick={() => handleOpenDialog()} size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Add New Sweet
            </Button>
          </div>

          {/* Sweets Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-lg font-paragraph text-secondary/70">Loading...</p>
            </div>
          ) : filteredSweets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-paragraph text-secondary/70">
                No sweets found. Add your first sweet to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSweets.map((sweet) => (
                <motion.div
                  key={sweet._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden">
                    {sweet.mainImage && (
                      <div className="aspect-square bg-secondary/5">
                        <Image
                          src={sweet.mainImage}
                          alt={sweet.name || 'Sweet'}
                          className="w-full h-full object-cover"
                          width={400}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold text-secondary mb-2">
                        {sweet.name}
                      </h3>
                      <p className="text-sm font-paragraph text-secondary/70 mb-4 line-clamp-2">
                        {sweet.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-heading font-bold text-primary">
                          ${sweet.price?.toFixed(2)}
                        </span>
                        <span className="text-sm font-paragraph text-secondary/70">
                          Stock: {sweet.stockLevel}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(sweet)}
                          className="flex-1 gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRestock(sweet)}
                          className="flex-1 gap-2"
                        >
                          <Package className="w-4 h-4" />
                          Restock
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(sweet._id)}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading font-bold">
              {editingSweet ? 'Edit Sweet' : 'Add New Sweet'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="stockLevel">Stock Level</Label>
                <Input
                  id="stockLevel"
                  type="number"
                  required
                  value={formData.stockLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, stockLevel: e.target.value })
                  }
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat.categoryName || ''}>
                      {cat.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mainImage">Image URL</Label>
              <Input
                id="mainImage"
                type="url"
                required
                value={formData.mainImage}
                onChange={(e) =>
                  setFormData({ ...formData, mainImage: e.target.value })
                }
                className="mt-2"
                placeholder="https://static.wixstatic.com/media/103e37_d6859948b64548dc84222c96045b68fe~mv2.png?originWidth=384&originHeight=384"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingSweet ? 'Update Sweet' : 'Add Sweet'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
