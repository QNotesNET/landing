'use client';

import { useId } from 'react';
import Image from 'next/image';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { cx, display, inter } from '@/lib/ui';
import type { ComponentType, SVGProps } from 'react';

import {
  CheckIcon,
  CalendarDaysIcon,
  CameraIcon,
} from '@heroicons/react/24/outline';

/** Bilder aus /public verwenden -> als Strings referenzieren */
const screenshotTasks = '/images/tasks.png';
const screenshotCalendar = '/images/calendar.png';
const screenshotScan = '/images/scan.png';

type Feature = {
  name: React.ReactNode;
  summary: string;
  description: string;
  image: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>; // statt: (props) => JSX.Element
};

/* ---------- Features in gewünschter Reihenfolge ---------- */
const features: Feature[] = [
  {
    name: 'Organisation & Fokus',
    summary: 'Aufgaben & Listen',
    description:
      'Powerbook erkennt To-Dos aus Notizen, ordnet sie Listen/Projekten zu und synchronisiert sich nahtlos mit Diensten wie Google Tasks.',
    image: screenshotTasks,
    icon: CheckIcon,
  },
  {
    name: 'Zeit & Struktur',
    summary: 'Kalender & Termine',
    description:
      'Erkannte Termine werden als Ereignisse vorgeschlagen und mit deinem Google- oder Powerbook-Kalender synchronisiert.',
    image: screenshotCalendar,
    icon: CalendarDaysIcon,
  },
  {
    name: 'Digitalisierung & Klarheit',
    summary: 'Scans & Zuweisungen',
    description:
      'Automatische Seitenekennung, Begradigung und OCR sorgen für perfekte digitale Kopien deiner Seiten – ideal für Archiv, Suche und AI-Funktionen.',
    image: screenshotScan,
    icon: CameraIcon,
  },
];

function FeatureItem({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { feature: Feature; isActive: boolean }) {
  return (
    <div className={cx(className, !isActive && 'opacity-95 hover:opacity-100 transition-opacity')} {...props}>
      {/* Icon mit guter Lesbarkeit auf weiß */}
      <div
        className={cx(
          'w-9 h-9 rounded-lg flex items-center justify-center',
          isActive ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
        )}
      >
        <feature.icon className="h-5 w-5" aria-hidden />
      </div>

      {/* Card-Überschrift NICHT Playfair: wir nutzen Inter */}
      <h3 className={cx(inter.className, 'mt-6 text-sm font-medium text-gray-700')}>{feature.name}</h3>

      {/* Summary ebenfalls Inter für klare Lesbarkeit */}
      <p className={cx(inter.className, 'mt-2 text-xl font-semibold text-gray-900')}>{feature.summary}</p>

      {/* Beschreibung kurz & generisch, ohne konkrete Beispiel-Keywords */}
      <p className={cx(inter.className, 'mt-4 text-sm text-gray-700')}>{feature.description}</p>
    </div>
  );
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-12 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.summary}>
          <FeatureItem feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-8 pb-8">
            <div className="absolute -inset-x-4 top-8 bottom-0 bg-black/5 sm:-inset-x-6" />
            <div className="relative mx-auto w-[844px] max-w-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
              <Image
                className="w-full h-auto"
                src={feature.image}
                alt=""
                width={1344}
                height={756}
                sizes="(min-width: 1024px) 844px, 100vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesDesktop() {
  return (
    <TabGroup className="hidden lg:mt-12 lg:block">
      {({ selectedIndex }) => (
        <>
          <TabList className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <FeatureItem
                key={feature.summary}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="data-selected:not-data-focus:outline-hidden">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </TabList>

          <TabPanels className="relative mt-12 overflow-hidden rounded-3xl bg-black/5 px-6 py-10 xl:px-10">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <TabPanel
                  static
                  key={feature.summary}
                  className={cx(
                    'px-5 transition duration-500 ease-in-out data-selected:not-data-focus:outline-hidden',
                    featureIndex !== selectedIndex && 'opacity-60'
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[844px] max-w-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
                    <Image
                      className="w-full h-auto"
                      src={feature.image}
                      alt=""
                      width={1344}
                      height={756}
                      sizes="(min-width: 1280px) 844px, 100vw"
                      priority={false}
                    />
                  </div>
                </TabPanel>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-200" />
          </TabPanels>
        </>
      )}
    </TabGroup>
  );
}

export default function AppPreview() {
  return (
    <section id="app-preview" aria-label="App-Vorschau" className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sektion-Headline: Playfair (display) bleibt wie gewünscht */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={cx(display.className, 'text-3xl sm:text-4xl leading-tight text-gray-900')}>
            Klarheit auf einen Blick.
          </h2>
               <p className="mt-3 pb-11 text-gray-600">
            Powerbook erkennt Aufgaben, Termine und Seiten automatisch – und zeigt dir alles strukturiert und synchronisiert in einem zentralen Arbeitsbereich.
          </p>
        </div>

        <FeaturesMobile />
        <FeaturesDesktop />
      </div>
    </section>
  );
}
