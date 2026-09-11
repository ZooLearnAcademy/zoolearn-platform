import Link from "next/link"
import { optimizeCloudinaryUrl } from "@/lib/cloudinary"
import { getAllAnimalData } from "@/lib/data/species"

export default async function ZoohubPage() {
  const allData = await getAllAnimalData()
  
  const allSpecies = Object.values(allData).flatMap((classes: any) => 
    classes.flatMap((cls: any) => cls.species || [])
  )
  
  // Select a balanced preview of species across phylums
  const selectedSpecies = allSpecies.slice(0, 20)

  // Split into two rows
  const row1 = selectedSpecies.slice(0, 10)
  const row2 = selectedSpecies.slice(10, 20)

  return (
    <div className="w-full max-w-[90rem] mx-auto py-[clamp(2rem,5vw,4rem)] px-[clamp(1rem,4vw,4rem)] overflow-hidden">
      <div className="mb-[clamp(2rem,5vw,4rem)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex items-center gap-[clamp(0.5rem,2vw,1rem)] mb-[clamp(1rem,3vw,1.5rem)]">
            <div className="w-[clamp(2rem,5vw,3rem)] h-[3px] bg-[#00897b] rounded-full" />
            <span className="text-[#00897b] font-bold tracking-[0.2em] uppercase text-[clamp(0.75rem,1.5vw,0.875rem)]">
              Introduction
            </span>
            <div className="w-[clamp(2rem,5vw,3rem)] h-[3px] bg-[#00897b] rounded-full" />
          </div>
          <h1 className="text-[clamp(2.5rem,6vw+1rem,4.5rem)] font-black tracking-tighter text-[#0a192f] dark:text-white leading-[1.1] mb-[clamp(1rem,3vw,1.5rem)]">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Zoohub</span>
          </h1>
          <p className="text-[clamp(1rem,2vw,1.5rem)] text-[#546e7a] dark:text-slate-400 font-medium leading-relaxed mb-[clamp(2rem,5vw,3rem)] max-w-[70ch] mx-auto">
            Explore the vast and fascinating diversity of the Animal Kingdom. Select a phylum from the sidebar to begin your journey.
          </p>
          
          <Link href="/zoohub/porifera" className="inline-flex items-center justify-center px-[clamp(1.5rem,4vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] text-[clamp(1rem,1.5vw,1.125rem)] font-bold text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:from-emerald-400 hover:to-teal-500 hover:shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:-translate-y-1">
            Start Learning
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" className="ml-[clamp(0.25rem,1vw,0.5rem)] w-[1em] h-[1em]">
              <path fill="currentColor" d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
            </svg>
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[clamp(400px,60vh,600px)] -mt-[clamp(2rem,5vw,4rem)] overflow-hidden flex flex-col items-center justify-center [perspective:1200px]">
        {/* Fading edges to make the marquee blend in */}
        <div className="absolute inset-y-0 left-0 w-[clamp(4rem,10vw,8rem)] bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[clamp(4rem,10vw,8rem)] bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        
        <div 
          className="flex flex-col gap-[clamp(1rem,2vw,2rem)] w-full will-change-transform transform-gpu"
          style={{ transform: "rotateX(20deg) rotateZ(-5deg)", transformStyle: "preserve-3d" }}
        >
          {/* Row 1 */}
          <div className="flex w-max animate-marquee-3d hover:[animation-play-state:paused] gap-[clamp(1rem,2vw,2rem)] will-change-transform">
            {[...row1, ...row1].map((species, i) => (
              <div 
                key={`${species.id}-${i}`}
                className="w-[clamp(14rem,20vw,16rem)] aspect-[4/5] rounded-[clamp(1rem,2vw,1.5rem)] bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center p-[clamp(1rem,3vw,1.5rem)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] hover:-translate-y-2 hover:border-emerald-200 dark:hover:border-emerald-800/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={optimizeCloudinaryUrl(species.image, 300)} 
                  alt={species.name} 
                  width={150} 
                  height={150} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-[60%] aspect-square object-contain drop-shadow-md mb-[clamp(0.5rem,2vw,1rem)]" 
                />
                <h3 className="font-extrabold italic text-slate-800 dark:text-slate-200 text-[clamp(1rem,1.5vw,1.125rem)] text-center">{species.name}</h3>
              </div>
            ))}
          </div>

          {/* Row 2 - Reverse */}
          <div className="flex w-max animate-marquee-3d-reverse hover:[animation-play-state:paused] gap-[clamp(1rem,2vw,2rem)] will-change-transform">
            {[...row2, ...row2].map((species, i) => (
              <div 
                key={`${species.id}-${i}`}
                className="w-[clamp(14rem,20vw,16rem)] aspect-[4/5] rounded-[clamp(1rem,2vw,1.5rem)] bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center p-[clamp(1rem,3vw,1.5rem)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] hover:-translate-y-2 hover:border-emerald-200 dark:hover:border-emerald-800/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={optimizeCloudinaryUrl(species.image, 300)} 
                  alt={species.name} 
                  width={150} 
                  height={150} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-[60%] aspect-square object-contain drop-shadow-md mb-[clamp(0.5rem,2vw,1rem)]" 
                />
                <h3 className="font-extrabold italic text-slate-800 dark:text-slate-200 text-[clamp(1rem,1.5vw,1.125rem)] text-center">{species.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-3d {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes marquee-3d-reverse {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-3d {
          animation: marquee-3d 40s linear infinite;
        }
        .animate-marquee-3d-reverse {
          animation: marquee-3d-reverse 40s linear infinite;
        }
      `}} />
    </div>
  )
}
