import { useEffect, useMemo, useState } from "react";

import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type PlatformCapability = {
  title: string;
  description: string;
  image: string;
};

type PlatformCapabilitiesCarouselProps = {
  cards: PlatformCapability[];
};

const PlatformCapabilitiesCarousel = ({ cards }: PlatformCapabilitiesCarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = useMemo(() => {
    const chunks: PlatformCapability[][] = [];

    for (let i = 0; i < cards.length; i += 2) {
      chunks.push(cards.slice(i, i + 2));
    }

    return chunks;
  }, [cards]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [api]);

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-black tracking-normal text-white">Platform Capabilities</h2>
      </div>

      <Carousel opts={{ loop: true, align: "start" }} setApi={setApi}>
        <CarouselContent className="mt-8 gap-7">
          {slides.map((group, index) => (
            <CarouselItem key={index}>
              <div className="grid gap-7 md:grid-cols-2">
                {group.map((capability) => (
                  <article
                    key={capability.title}
                    className="overflow-hidden rounded-[24px] border border-cyan-100/10 bg-[#071d27]"
                  >
                    <div className="relative">
                      <img
                        src={capability.image}
                        alt={capability.title}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    </div>

                    <div className="px-6 py-7">
                      <h3 className="text-2xl font-black text-white">{capability.title}</h3>
                      <p className="mt-4 text-base font-medium leading-7 text-[#7fa2b3]">
                        {capability.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              selectedIndex === index ? "bg-cyan-300" : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PlatformCapabilitiesCarousel;
