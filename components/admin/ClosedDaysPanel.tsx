"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type ClosedDay = {
  id: string;
  date: string;
  reason: string | null;
  createdAt: string;
};

export default function ClosedDaysPanel() {
  const [closedDays, setClosedDays] = useState<ClosedDay[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchClosedDays();
  }, []);

  const fetchClosedDays = async () => {
    try {
      const response = await fetch("/api/closed-days");
      const data = await response.json();
      setClosedDays(data.closedDays);
    } catch (error) {
      console.error("Error fetching closed days:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;

    setSaving(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/closed-days", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: newDate,
          reason: newReason || null,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setNewDate("");
        setNewReason("");
        fetchClosedDays();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error adding closed day:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/closed-days?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchClosedDays();
      }
    } catch (error) {
      console.error("Error deleting closed day:", error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <p className="text-slate-600">Chargement des jours fermés...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jours fermés</CardTitle>
        <CardDescription>Gérez les jours où vous n'acceptez pas de réservations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <form onSubmit={handleAdd} className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="reason">Raison (optionnel)</Label>
              <Input
                id="reason"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                placeholder="Ex: Jour férié, congé..."
                className="mt-2"
              />
            </div>

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Jour fermé ajouté avec succès
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={saving}>
              {saving ? "Ajout..." : "Ajouter"}
            </Button>
          </form>

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Jours fermés programmés</h3>
            {closedDays.length === 0 ? (
              <p className="text-slate-500">Aucun jour fermé programmé</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Raison</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {closedDays.map((day) => (
                    <TableRow key={day.id}>
                      <TableCell className="font-medium">
                        {format(new Date(day.date), "PPP", { locale: fr })}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {day.reason || "-"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(day.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

