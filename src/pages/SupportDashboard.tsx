import React, { useEffect, useState } from "react";
import {apiClient} from "@/services/config"; // Assuming this is your axios instance
import { 
  Loader2, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search,
  Eye,
  ChevronLeft
} from "lucide-react";
import { format } from "date-fns"; // Recommended for date formatting

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/DashboardLayout";

// Helper to color-code status
const getStatusBadge = (status) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Paid</Badge>;
    case "pending_payment":
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">Payment Pending</Badge>;
    case "quote_requested":
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Quote Requested</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function SupportDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null); // For detail view
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [search, setSearch] = useState("");

  // 1. Fetch All Requests on Mount
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await apiClient.get("/api/services/my-requests");
      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Single Request Details
  const handleViewDetails = async (ticketId) => {
    setDetailsLoading(true);
    setIsDetailOpen(true); // Open modal immediately
    try {
      const response = await apiClient.get(`/api/services/details/${ticketId}`);
      if (response.data.success) {
        setSelectedTicket(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch details", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Filter logic
  const filteredRequests = requests.filter((req) => 
    req.serviceTitle.toLowerCase().includes(search.toLowerCase()) ||
    req.ticketId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
    <div className="w-full max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Requests</h1>
          <p className="text-muted-foreground mt-1">
            Track your service requests, quotes, and payment status.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Ticket ID or Service..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <FileText className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No requests found</h3>
              <p className="text-muted-foreground text-sm max-w-sm mt-1">
                You haven't submitted any service requests yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Ticket ID</TableHead>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((req) => (
                  <TableRow key={req.ticketId}>
                    <TableCell className="font-medium text-primary">
                      {req.ticketId}
                    </TableCell>
                    <TableCell>{req.serviceTitle}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {/* Simple date format fallback if date-fns not installed */}
                      {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell>
                      {req.estimatedPrice > 0 
                        ? `$${req.estimatedPrice.toFixed(2)}` 
                        : "Custom Quote"}
                    </TableCell>
                    <TableCell>{getStatusBadge(req.paymentStatus)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewDetails(req.ticketId)}
                      >
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Details Modal / Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
               Request Details
            </DialogTitle>
            <DialogDescription>
              Ticket Reference: {selectedTicket?.ticketId}
            </DialogDescription>
          </DialogHeader>

          {detailsLoading ? (
             <div className="flex justify-center py-12">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : selectedTicket ? (
            <div className="space-y-6 mt-2">
              {/* Top Summary Section */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-50 rounded-lg border">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                  <p className="font-semibold text-lg">{selectedTicket.serviceTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                  <div className="mt-1">{getStatusBadge(selectedTicket.paymentStatus)}</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted On</p>
                  <p className="text-sm">
                    {new Date(selectedTicket.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                  <p className="font-bold text-lg">
                     {selectedTicket.estimatedPrice > 0 
                      ? `$${selectedTicket.estimatedPrice.toFixed(2)}` 
                      : "TBD"}
                  </p>
                </div>
              </div>

              {/* Admin Notes Section (If exists) */}
              {selectedTicket.adminNotes && (
                 <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-md">
                    <h4 className="font-semibold text-sm mb-1">Message from Admin:</h4>
                    <p className="text-sm text-zinc-700">{selectedTicket.adminNotes}</p>
                 </div>
              )}

              {/* Dynamic Form Data Display */}
              <div>
                <h3 className="font-semibold border-b pb-2 mb-4">Submission Data</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
                  {/* Iterate over the dynamic formData object */}
                  {selectedTicket.formData && Object.entries(selectedTicket.formData).map(([key, value]) => (
                    <div key={key} className="break-words">
                      <dt className="font-medium text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()} {/* Convert camelCase to Space */}
                      </dt>
                      <dd className="mt-1 text-zinc-900">
                        {/* Handle if value is object/array, otherwise render string */}
                        {typeof value === 'object' 
                          ? JSON.stringify(value) 
                          : String(value) || "N/A"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-4 gap-3 border-t">
                {selectedTicket.paymentStatus === 'pending_payment' && (
                   <Button className="bg-green-600 hover:bg-green-700">
                     Complete Payment
                   </Button>
                )}
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-red-500">
              Failed to load details.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </DashboardLayout>
  );
}