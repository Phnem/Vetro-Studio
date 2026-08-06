import Screen from "@/components/Screens";

type Props = {
  /** Screen slug — see the index at the foot of Screens.tsx. */
  src: string;
  className?: string;
};

/** Phone bezel wrapping a rebuilt app screen. */
export default function Device({ src, className }: Props) {
  return (
    <div className={`device${className ? ` ${className}` : ""}`}>
      <div className="device-screen">
        <Screen name={src} />
        <span className="device-glare" aria-hidden />
      </div>
    </div>
  );
}
