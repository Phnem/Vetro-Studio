import Shot from "@/components/Shot";

type Props = {
  /** Screenshot slug — matches a file in public/screens/. */
  src: string;
  className?: string;
};

/** Titanium phone bezel wrapping a real app screenshot. */
export default function Device({ src, className }: Props) {
  return (
    <div className={`device${className ? ` ${className}` : ""}`}>
      <div className="device-screen">
        <Shot name={src} />
        <span className="device-glare" aria-hidden />
      </div>
    </div>
  );
}
