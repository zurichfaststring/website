"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

type Settings = {
  id: string;
  dailyCapacity: number;
  updatedAt: string;
};

export default function SettingsPanel() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [dailyCapacity, setDailyCapacity] = useState<string>("2");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();
      setSettings(data.settings);
      setDailyCapacity(data.settings.dailyCapacity.toString());
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dailyCapacity: parseInt(dailyCapacity),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        fetchSettings();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <p className="text-slate-600">Chargement des paramètres...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres</CardTitle>
        <CardDescription>Configurez les paramètres de votre service</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6 max-w-md">
          <div>
            <Label htmlFor="dailyCapacity">Capacité quotidienne (nombre de raquettes/jour)</Label>
            <Input
              id="dailyCapacity"
              type="number"
              min="1"
              max="10"
              value={dailyCapacity}
              onChange={(e) => setDailyCapacity(e.target.value)}
              className="mt-2"
            />
            <p className="text-sm text-slate-500 mt-1">
              Nombre maximum de raquettes que vous pouvez traiter par jour
            </p>
          </div>

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Paramètres enregistrés avec succès
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={saving}>
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

