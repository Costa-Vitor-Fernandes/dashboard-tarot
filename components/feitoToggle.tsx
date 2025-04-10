"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function FeitoToggle({
  id,
  feito,
}: {
  id: string;
  feito: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/feito", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, feito: !feito }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar");

      toast({
        title: "Atualizado com sucesso!",
        description: `Consulta marcada como ${!feito ? "feita" : "não feita"}.`,
      });
      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`text-lg p-0 hover:underline ${
            feito ? "text-green-600" : "text-red-600"
          }`}
        >
          {feito ? "✅" : "❌"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {feito ? "Desmarcar como feito?" : "Marcar como feito?"}
          </DialogTitle>
          <DialogDescription>
            Essa ação vai atualizar o status da consulta.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? "Salvando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
