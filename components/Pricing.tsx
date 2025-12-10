"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { CREAM, cx, display } from "@/lib/ui";
import {
  Check,
  Sparkles,
  Crown,
  Star,
  ArrowRight,
  ShoppingBag,
  GraduationCap,
} from "lucide-react";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  popular?: boolean;
  highlight?: boolean;
  ctaHref: string;
  features: string[];
};

type PricingTexts = {
  heading: string;
  subtext: string;
  noteMonthly: string;
  noteYearly: string;
  labels: {
    monthly: string;
    yearly: string;
    yearlyDiscount: string;
    popular: string;
    cta: string;
    freeUnit: string;
    shopBadge: string;
    shopHeading: string;
    shopText: string;
    shopButton: string;
    studentText: string;
  };
  plans: Plan[];
};

export default function Pricing({ texts }: { texts: PricingTexts }) {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  const note = useMemo(
    () => (billing === "yearly" ? texts.noteYearly : texts.noteMonthly),
    [billing, texts]
  );

  const formatPrice = (plan: Plan) => {
    if (plan.monthly === 0) return "0 €";
    if (billing === "monthly") return `€${plan.monthly.toFixed(2)}`;
    return `€${plan.yearly.toFixed(0)}`;
  };

  const priceUnit = (plan: Plan) => {
    if (plan.monthly === 0) return texts.labels.freeUnit;
    return billing === "monthly" ? "/ Monat" : "/ Jahr";
  };

  return (
    <section id="pricing" className="py-20" style={{ backgroundColor: CREAM }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2
            className={cx(
              display.className,
              "text-3xl sm:text-4xl leading-tight"
            )}
          >
            {texts.heading}
          </h2>

          <p className="mt-3 text-gray-600 hidden lg:block">{texts.subtext}</p>
          <p className="mt-3 text-gray-600 lg:hidden">{texts.subtext}</p>

          {/* Billing Toggle */}
          <div className="mt-6 inline-flex items-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={cx(
                "px-4 py-2 rounded-lg text-sm transition",
                billing === "monthly"
                  ? "bg-black text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {texts.labels.monthly}
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={cx(
                "px-4 py-2 rounded-lg text-sm transition",
                billing === "yearly"
                  ? "bg-black text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {texts.labels.yearly}{" "}
              <span className="ml-1 hidden sm:inline">
                ({texts.labels.yearlyDiscount})
              </span>
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-500">{note}</p>
        </div>

        {/* Plans */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {texts.plans.map((plan) => {
            const emphasised = plan.highlight;
            return (
              <div
                key={plan.id}
                className={cx(
                  "relative rounded-3xl border bg-white p-6 sm:p-8 shadow-sm",
                  emphasised
                    ? "ring-2 ring-black/80 shadow-md"
                    : "ring-1 ring-gray-200"
                )}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1 text-xs font-medium text-white shadow">
                      <Star className="h-3 w-3" />
                      {texts.labels.popular}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {plan.id === "pro" ? (
                    <Crown className="h-5 w-5 text-gray-800" aria-hidden />
                  ) : plan.id === "plus" ? (
                    <Sparkles className="h-5 w-5 text-gray-800" aria-hidden />
                  ) : null}
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-600">{plan.tagline}</p>

                <div className="mt-5 flex items-baseline gap-2">
                  <div className="text-4xl font-semibold">
                    {formatPrice(plan)}
                  </div>
                  <div className="text-sm text-gray-500">{priceUnit(plan)}</div>
                </div>

                {billing === "yearly" && plan.monthly !== 0 && (
                  <div className="mt-1 text-xs text-gray-500">
                    Entspricht ~€
                    {(plan.yearly / 12).toFixed(2)} / Monat
                  </div>
                )}

                <ul className="mt-6 space-y-2 text-sm text-gray-700">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Link
                    href={plan.ctaHref + `&cycle=${billing}`}
                    className={cx(
                      "group inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition shadow-lg",
                      emphasised
                        ? "bg-black text-white hover:-translate-y-0.5"
                        : "bg-gray-900 text-white hover:-translate-y-0.5"
                    )}
                  >
                    {texts.labels.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Physical Powrbook Upsell */}
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-200">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {texts.labels.shopBadge}
                </div>
                <h4 className="mt-3 text-xl font-semibold">
                  {texts.labels.shopHeading}
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  {texts.labels.shopText}
                </p>
              </div>

              <Link
                href="/shop"
                className="group inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5"
              >
                {texts.labels.shopButton}
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Student Discount */}
        <div className="mt-6">
          <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm text-gray-700">{texts.labels.studentText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
