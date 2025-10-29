import { cx, display } from "@/lib/ui";

type FAQItem = {
  q: string;
  a: string;
};

type FAQTexts = {
  heading: string;
  items: FAQItem[];
};

export default function FAQ({ texts }: { texts: FAQTexts }) {
  return (
    <section id="faq" className="border-t border-black/5 bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2
          className={cx(
            display.className,
            "text-center text-3xl sm:text-4xl leading-tight"
          )}
        >
          {texts.heading}
        </h2>

        <div className="mt-8 divide-y">
          {texts.items.map((it) => (
            <details key={it.q} className="group py-4">
              <summary className="cursor-pointer list-none text-left font-medium">
                {it.q}
              </summary>
              <p className="mt-2 text-sm text-gray-600">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
