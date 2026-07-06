import { wrap } from "./styles";

const items = [
  ["Laparoscopic", "& minimally invasive"],
  ["Faster", "recovery focus"],
  ["Women's", "diastasis recti care"],
  // ["Second", "opinions welcome"],
];

export function TrustStrip() {
  return (
    <div className="bg-ink py-5 text-[#c5e8e8]">
      <div className={`${wrap} flex flex-wrap items-center justify-center gap-x-[34px] gap-y-3.5 text-center`}>
        {items.map(([strong, label], index) => (
          <FragmentItem key={strong} showDivider={index < items.length - 1}>
            <div className="inline-flex items-center gap-2.5 t-small font-semibold tracking-[0.01em]">
              <b className="font-display t-h4 font-semibold text-white">{strong}</b> {label}
            </div>
          </FragmentItem>
        ))}
      </div>
    </div>
  );
}

function FragmentItem({
  children,
  showDivider,
}: {
  children: React.ReactNode;
  showDivider: boolean;
}) {
  return (
    <>
      {children}
      {showDivider ? <div className="h-[26px] w-px bg-white/15 max-[620px]:hidden" /> : null}
    </>
  );
}
