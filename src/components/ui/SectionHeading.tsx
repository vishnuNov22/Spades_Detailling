import type { ReactNode } from "react";
import { MaskLines } from "@/components/animations/Reveal";

export function SectionHeading({ kicker, lines, aside, center = false, id }: {
  kicker: string; lines: string[]; aside?: ReactNode; center?: boolean; id?: string;
}) {
  return (
    <div className={`grid gap-8 ${aside ? "lg:grid-cols-[1.2fr_1fr] lg:items-end" : ""} ${center ? "text-center" : ""}`}>
      <div>
        <span className="kicker">{kicker}</span>
        <h2 id={id} className="h-section mt-5 text-balance">
          <MaskLines lines={lines} />
        </h2>
      </div>
      {aside && <div className="lead max-w-md lg:justify-self-end">{aside}</div>}
    </div>
  );
}
