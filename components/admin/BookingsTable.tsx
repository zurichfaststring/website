"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Booking = {
  id: string;
  createdAt: string;
  bookingDate: string;
  timeSlot: string;
  racketBrand: string;
  racketModel: string | null;
  stringPattern: string;
  tensionHorizontal: number;
  tensionVertical: number;
  tensionUnit: string;
  stringType: string;
  stringProvided: boolean;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  comments: string | null;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  totalPrice: number;
  laborPrice: number;
  stringPrice: number | null;
};

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setBookings(data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchBookings(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      booked: "bg-blue-100 text-blue-800",
      received: "bg-purple-100 text-purple-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      ready: "bg-green-100 text-green-800",
      delivered: "bg-slate-100 text-slate-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const labels: Record<string, string> = {
      booked: "Réservé",
      received: "Reçu",
      in_progress: "En cours",
      ready: "Prêt",
      delivered: "Remis",
      cancelled: "Annulé",
    };

    return (
      <Badge className={colors[status] || "bg-slate-100 text-slate-800"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const filteredBookings = filterStatus === "all" 
    ? bookings 
    : bookings.filter((b) => b.status === filterStatus);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <p className="text-slate-600">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Réservations</CardTitle>
        <CardDescription>Gérez et suivez toutes vos réservations</CardDescription>
        <div className="flex gap-4 items-center pt-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="booked">Réservé</SelectItem>
              <SelectItem value="received">Reçu</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="ready">Prêt</SelectItem>
              <SelectItem value="delivered">Remis</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchBookings} variant="outline" size="sm">
            Actualiser
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredBookings.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            Aucune réservation trouvée
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Raquette</TableHead>
                  <TableHead>Tension</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {format(new Date(booking.bookingDate), "dd MMM yyyy", { locale: fr })}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {booking.timeSlot === "morning"
                            ? "Matin avant 10h"
                            : booking.timeSlot === "afternoon"
                            ? "Après-midi après 18h"
                            : booking.timeSlot}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{booking.clientName}</div>
                        <div className="text-slate-500 text-xs">{booking.clientEmail}</div>
                        <div className="text-slate-500 text-xs">{booking.clientPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{booking.racketBrand}</div>
                        {booking.racketModel && (
                          <div className="text-slate-500 text-xs">{booking.racketModel}</div>
                        )}
                        <div className="text-slate-500 text-xs">{booking.stringPattern}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {booking.tensionHorizontal}/{booking.tensionVertical} {booking.tensionUnit}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {booking.totalPrice.toFixed(2)} CHF
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onValueChange={(value) => updateBookingStatus(booking.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booked">Réservé</SelectItem>
                          <SelectItem value="received">Reçu</SelectItem>
                          <SelectItem value="in_progress">En cours</SelectItem>
                          <SelectItem value="ready">Prêt</SelectItem>
                          <SelectItem value="delivered">Remis</SelectItem>
                          <SelectItem value="cancelled">Annulé</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

