"use client";

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { INK, cx, display } from "@/lib/ui";
import Image from "next/image";

type DashboardTexts = {
  heading: string;
  description: string;
  features: {
    name: string;
    description: string;
    icon: "upload" | "fingerprint" | "lock" | "server" | "sync" | "settings";
  }[];
  imageAlt: string;
};

const iconMap = {
  upload: CloudArrowUpIcon,
  fingerprint: FingerPrintIcon,
  lock: LockClosedIcon,
  server: ServerIcon,
  sync: ArrowPathIcon,
  settings: Cog6ToothIcon,
};

export default function DashboardPreview({ texts }: { texts: DashboardTexts }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <p
            className={cx(
              display.className,
              "text-3xl sm:text-4xl leading-tight sm:leading-[1.05]"
            )}
            style={{ color: INK }}
          >
            {texts.heading}
          </p>

          <p className="mt-3 text-gray-600">{texts.description}</p>
        </div>
      </div>

      {/* Screenshot */}
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            alt={texts.imageAlt}
            src="/images/dashboard.png"
            width={2432}
            height={1442}
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
          />
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {texts.features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <Icon
                    aria-hidden="true"
                    className="absolute top-1 left-1 size-5 text-black"
                  />
                  {feature.name}
                </dt>{" "}
                <dd className="inline">{feature.description}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
