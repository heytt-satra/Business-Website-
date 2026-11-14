import Image from "next/image";
import { cosmicImage } from "@/lib/cosmic";
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
  const photo = cosmicImage(kind);
  return (
    <figure className={`visual cosmic-photo photo-${photo.id} ${className}`}>
      <picture>
        <source
          media="(max-width: 700px)"
          srcSet={photo.smallSrc}
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
        {photo.title} <span aria-hidden="true">·</span> {photo.author}
      </figcaption>
    </figure>
  );
}
