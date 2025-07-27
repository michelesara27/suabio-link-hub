import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddLinkDialogProps {
  onAddLink: (linkData: { title: string; url: string; description?: string }) => Promise<boolean>;
}

export const AddLinkDialog = ({ onAddLink }: AddLinkDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: ""
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.url) {
      return;
    }

    const success = await onAddLink(formData);
    if (success) {
      setFormData({ title: "", url: "", description: "" });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Link</DialogTitle>
          <DialogDescription>
            Crie um novo link para sua página
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Link</Label>
            <Input
              id="title"
              placeholder="Ex: Meu Instagram"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://exemplo.com"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Input
              id="description"
              placeholder="Breve descrição do link"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Criar Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
