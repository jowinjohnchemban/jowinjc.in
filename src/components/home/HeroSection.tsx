/**
 * Hero Section Component
 * Landing page hero with server-side rendering for fast paint
 * SEO-friendly: Content visible immediately, no JS required for initial render
 * @module components/home/HeroSection
 */

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TypewriterText } from "./TypewriterText";

const talents = [
  "Full-Stack Developer",
  "DevOps Engineer",
  "IT Infrastructure Engineer",
  "Systems/Network Engineer",
];

export function HeroSection({ blurDataURL }: { blurDataURL?: string } = {}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-6 sm:py-12 lg:py-0 min-h-[calc(100vh-4rem)] flex flex-col-reverse lg:flex-row items-center justify-between gap-0 sm:gap-8 lg:gap-10">
      {/* LEFT */}
      <div className="flex-1 space-y-6 text-center lg:text-left hero-content">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Hi, I&apos;m <span className="text-primary">Jowin</span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          <TypewriterText
            words={talents}
            typingSpeed={50}
            deletingSpeed={30}
            delayBetweenWords={2000}
          />
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground">
          Creating solutions, designing systems & crafting experiences that inspire ⚡
          Always learning, building, exploring & growing 🚀
        </p>

        <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/blog">Read Blog</Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href="/connect">Let&apos;s Connect</Link>
          </Button>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="flex-1 flex justify-center hero-image max-w-xl mx-auto lg:mx-0"
        style={{ opacity: 0.2, transform: 'translateY(10px)' }}
      >
        <Image
          src="/images/profile.jpg"
          alt="Jowin John Chemban"
          width={300}
          height={300}
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl shadow-2xl object-cover"
          priority
          fetchPriority="high"
          sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
          placeholder={blurDataURL ? 'blur' : undefined}
          blurDataURL={blurDataURL}
          quality={75}
        />
      </div>
    </section>
  );
}
