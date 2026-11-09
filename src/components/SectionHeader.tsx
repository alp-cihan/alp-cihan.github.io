import { Crosshair } from "./Crosshair";

type Props = {
  id: string;
  index: string;
  title: string;
  /** Optional large display line under the rule. */
  display?: string;
  aside?: React.ReactNode;
};

/** Section opener: a ruled instrument row carrying the h2, optional display line. */
export function SectionHeader({ id, index, title, display, aside }: Props) {
  return (
    <header className={display ? "mb-14 md:mb-20" : "mb-12 md:mb-16"}>
      <div className="flex items-center gap-3 border-t border-line pt-4">
        <Crosshair className="-mt-[22px] -ml-[5.5px]" />
        <h2 id={`${id}-title`} className="label">
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="mx-2 text-paper-faint/60">
            —
          </span>
          <span className="text-paper-dim">{title}</span>
        </h2>
        {aside && <span className="label ml-auto">{aside}</span>}
      </div>
      {display && (
        <p
          aria-hidden
          className="display mt-8 text-[clamp(2.75rem,8vw,6.5rem)]"
        >
          {display}
        </p>
      )}
    </header>
  );
}
