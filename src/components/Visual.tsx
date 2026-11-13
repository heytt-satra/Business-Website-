import Image from "next/image";
import credits from "@/data/photo-credits.json";
export default function Visual({
  kind = "fusion",
  className = "",
  color,
}: {
  kind?: string;
  className?: string;
  color?: string;
}) {
  void color;
  const key = kind in credits ? kind : "fusion";
  const photo = credits[key as keyof typeof credits];
  return (
    <figure className={`visual photo-${key} ${className}`}>
      <picture>
        <source
          media="(max-width: 700px)"
          srcSet={photo.src.replace(".webp", "-small.webp")}
        />
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          sizes="(max-width: 700px) 100vw, 60vw"
          className="photograph"
        />
      </picture>
      <figcaption>
        Reference photograph <span aria-hidden="true">·</span> {photo.author}
      </figcaption>
    </figure>
  );
}
