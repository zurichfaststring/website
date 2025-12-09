"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/Logo";
import { RacketIcon } from "@/components/icons/TennisIcons";
import BookingsTable from "@/components/admin/BookingsTable";
import SettingsPanel from "@/components/admin/SettingsPanel";
import ClosedDaysPanel from "@/components/admin/ClosedDaysPanel";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call API route to verify credentials
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        sessionStorage.setItem("admin_auth", "true");
        setIsAuthenticated(true);
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Erreur de connexion");
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-pale to-white">
        <div className="text-center">
          <p className="text-xl font-semibold text-slate-900 mb-2">Chargement...</p>
          <p className="text-sm text-slate-600">Vérification de l'authentification</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-pale via-white to-slate-50">
        {/* Navigation */}
        <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-brand-pale text-xs sm:text-sm">
                Retour
              </Button>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Connexion Admin</CardTitle>
                <CardDescription>Connectez-vous pour accéder au tableau de bord</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="info@zurichfaststring.ch"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pale via-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Logo showText={false} size="sm" />
            <div className="ml-0 sm:ml-2">
              <p className="text-xs text-slate-600 font-medium">Admin</p>
            </div>
          </Link>
          <div className="flex gap-1 sm:gap-3 items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-brand-pale text-xs sm:text-sm">
                Site
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" size="sm" className="border-brand-light hover:bg-brand-pale text-xs sm:text-sm">
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border-2 border-brand-lighter">
          <div className="flex items-center gap-4">
            <Logo size="lg" showText={false} />
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Tableau de bord</h2>
              <p className="text-slate-600">Gérez vos réservations et paramètres</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
            <TabsTrigger value="closed-days">Jours fermés</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingsTable />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>

          <TabsContent value="closed-days">
            <ClosedDaysPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
