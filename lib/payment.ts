import { packageOfferMap } from "@/lib/package-offers";
import type { IntakePackage } from "@/lib/intake";

export type PaymentStatus = "unpaid" | "payment_requested" | "paid";

export function getPackagePaymentLink(packageTier: IntakePackage) {
  const envKey =
    packageTier === "basic"
      ? process.env.STRIPE_BASIC_PAYMENT_LINK
      : packageTier === "premium"
        ? process.env.STRIPE_PREMIUM_PAYMENT_LINK
        : process.env.STRIPE_SMART_PAYMENT_LINK;

  return envKey?.trim() || null;
}

export function getPackageDisplayName(packageTier: IntakePackage) {
  return packageOfferMap[packageTier]?.name ?? packageTier;
}

export function getPackageDisplayPrice(packageTier: IntakePackage) {
  return packageOfferMap[packageTier]?.price ?? "";
}

export function getPaymentStatusLabel(status: PaymentStatus) {
  switch (status) {
    case "paid":
      return "Paid";
    case "payment_requested":
      return "Payment Requested";
    default:
      return "Unpaid";
  }
}
