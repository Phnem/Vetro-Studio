import { asset } from "@/lib/asset";

/** A real in-app screenshot, cropped to the device frame via CSS. */
export default function Shot({ name }: { name: string }) {
  return (
    <img
      className="shot-img"
      src={asset(`/screens/${name}.jpg`)}
      alt=""
      loading="lazy"
    />
  );
}
