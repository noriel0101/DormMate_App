import { useState } from "react";
import { motion } from "motion/react";
import {
  CreditCard,
  Smartphone,
  Building2,
  ChevronRight,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const paymentMethods = [
  { id: "gcash", name: "GCash", icon: Smartphone },
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "bank", name: "Bank Transfer", icon: Building2 },
];

const paymentHistory = [
  {
    id: 1,
    date: "Mar 15, 2026",
    amount: 7300,
    type: "Monthly Rent",
    status: "completed",
  },
  {
    id: 2,
    date: "Feb 15, 2026",
    amount: 7300,
    type: "Monthly Rent",
    status: "completed",
  },
  {
    id: 3,
    date: "Jan 20, 2026",
    amount: 7300,
    type: "Monthly Rent",
    status: "completed",
  },
  {
    id: 4,
    date: "Jan 15, 2026",
    amount: 7300,
    type: "Monthly Rent",
    status: "late",
  },
];

export function PaymentsScreen() {
  const [selectedMethod, setSelectedMethod] = useState("gcash");

  const rentDue = 6500;
  const utilities = 800;
  const penalties = 0;
  const total = rentDue + utilities + penalties;

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold mb-2">Payments</h1>
        <p className="text-muted-foreground">Manage your rent and bills</p>
      </div>

      {/* Rent Due Card */}
      <div className="px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 text-white"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Amount Due</p>
              <h2 className="text-4xl font-bold">₱{total.toLocaleString()}</h2>
              <p className="text-white/90 text-sm mt-1">Due: April 30, 2026</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Monthly Rent</span>
              <span className="font-medium">₱{rentDue.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Utilities</span>
              <span className="font-medium">₱{utilities.toLocaleString()}</span>
            </div>
            {penalties > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">Late Penalties</span>
                <span className="font-medium">₱{penalties.toLocaleString()}</span>
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-accent py-4 rounded-xl font-bold hover:bg-white/90 transition-colors"
          >
            Pay ₱{total.toLocaleString()} Now
          </motion.button>
        </motion.div>
      </div>

      {/* Payment Methods */}
      <div className="px-6 pb-6">
        <h2 className="font-semibold mb-3">Payment Method</h2>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.button
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full bg-white rounded-xl p-4 flex items-center gap-4 transition-all ${
                  selectedMethod === method.id
                    ? "ring-2 ring-primary"
                    : "border border-border"
                }`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="flex-1 text-left font-medium">
                  {method.name}
                </span>
                {selectedMethod === method.id && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Payment History */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Payment History</h2>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {paymentHistory.map((payment) => (
            <motion.div
              key={payment.id}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl p-4 flex items-center gap-4"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  payment.status === "completed"
                    ? "bg-secondary/10"
                    : payment.status === "pending"
                    ? "bg-accent/10"
                    : "bg-destructive/10"
                }`}
              >
                {payment.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                ) : payment.status === "pending" ? (
                  <Clock className="w-5 h-5 text-accent" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{payment.type}</p>
                <p className="text-sm text-muted-foreground">{payment.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">₱{payment.amount.toLocaleString()}</p>
                <p
                  className={`text-xs ${
                    payment.status === "completed"
                      ? "text-secondary"
                      : payment.status === "pending"
                      ? "text-accent"
                      : "text-destructive"
                  }`}
                >
                  {payment.status === "completed"
                    ? "Paid"
                    : payment.status === "pending"
                    ? "Pending"
                    : "Late"}
                </p>
              </div>
              <button>
                <Download className="w-5 h-5 text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
