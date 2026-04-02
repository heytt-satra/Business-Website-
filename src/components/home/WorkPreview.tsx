"use client";

import { useEffect, useRef } from "react";
import type { Body as MatterBody } from "matter-js";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects, type Project } from "@/data/projects";


type MatterModule = typeof import("matter-js");

type PreviewVariant =
  | "orb"
  | "dashboard"
  | "portrait"
  | "profile"
  | "darkboard"
  | "blueprint"
  | "social"
  | "pricing"
  | "portrait-dark";

type DesktopTile = {
  slug: Project["slug"];
  preview: PreviewVariant;
  width: number;
  height: number;
  x: number;
  y: number;
};

type TileEntry = {
  tile: DesktopTile;
  targetX: number;
  targetY: number;
  width: number;
  height: number;
  body: MatterBody;
};

const desktopTiles: DesktopTile[] = [
  { slug: "greenleaf-ecommerce", preview: "orb", width: 250, height: 164, x: 0.11, y: 0.47 },
  { slug: "finflow-saas", preview: "dashboard", width: 252, height: 164, x: 0.11, y: 0.79 },
  { slug: "taskpilot-app", preview: "portrait", width: 182, height: 208, x: 0.255, y: 0.74 },
  { slug: "brightpath-website", preview: "profile", width: 182, height: 208, x: 0.37, y: 0.74 },
  { slug: "automail-automation", preview: "darkboard", width: 238, height: 138, x: 0.53, y: 0.79 },
  { slug: "mediscan-ai", preview: "blueprint", width: 172, height: 208, x: 0.645, y: 0.74 },
  { slug: "finflow-saas", preview: "social", width: 230, height: 170, x: 0.785, y: 0.44 },
  { slug: "brightpath-website", preview: "portrait-dark", width: 168, height: 225, x: 0.89, y: 0.31 },
  { slug: "greenleaf-ecommerce", preview: "pricing", width: 228, height: 164, x: 0.87, y: 0.79 },
];

/* Mobile: all 9 tiles, same previews, positions spread for narrow viewports */
const mobilPhysicsTiles: DesktopTile[] = [
  { slug: "greenleaf-ecommerce", preview: "orb", width: 250, height: 164, x: 0.25, y: 0.32 },
  { slug: "finflow-saas", preview: "dashboard", width: 252, height: 164, x: 0.75, y: 0.32 },
  { slug: "taskpilot-app", preview: "portrait", width: 182, height: 208, x: 0.18, y: 0.62 },
  { slug: "brightpath-website", preview: "profile", width: 182, height: 208, x: 0.50, y: 0.55 },
  { slug: "automail-automation", preview: "darkboard", width: 238, height: 138, x: 0.82, y: 0.62 },
  { slug: "mediscan-ai", preview: "blueprint", width: 172, height: 208, x: 0.35, y: 0.85 },
  { slug: "finflow-saas", preview: "social", width: 230, height: 170, x: 0.70, y: 0.85 },
  { slug: "brightpath-website", preview: "portrait-dark", width: 168, height: 225, x: 0.15, y: 0.85 },
  { slug: "greenleaf-ecommerce", preview: "pricing", width: 228, height: 164, x: 0.85, y: 0.85 },
];

const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

function getActiveTiles() {
  if (typeof window === "undefined") return desktopTiles;
  return window.innerWidth < 768 ? mobilPhysicsTiles : desktopTiles;
}

export default function WorkPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeTilesRef = useRef(desktopTiles);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const sectionElement = sectionRef.current;
    if (!canvasElement || !sectionElement) {
      return;
    }

    let cancelled = false;
    let resizeTimeout: number | null = null;
    let cleanup = () => {};

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const initialise = async () => {
      const Matter = await import("matter-js");

      if (cancelled || !canvasRef.current) {
        return;
      }

      cleanup();
      activeTilesRef.current = getActiveTiles();
      const refOffset = activeTilesRef.current === mobilPhysicsTiles ? desktopTiles.length : 0;
      cleanup = createLabSimulation(
        canvasRef.current,
        sectionElement,
        tileRefs.current,
        Matter,
        prefersReducedMotion,
        activeTilesRef.current,
        refOffset,
      );
    };

    void initialise();

    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        void initialise();
      }, 180);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);

      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }

      cleanup();
    };
  }, []);

  const allTiles = [...desktopTiles, ...mobilPhysicsTiles];
  /* Deduplicate for sr-only list */
  const uniqueSlugs = [...new Set(desktopTiles.map((t) => t.slug))];

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      className="relative overflow-visible bg-bg py-20 sm:py-24 lg:py-28"
    >
      <div className="w-full px-5 sm:px-6 md:px-20">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <p className="label-mono mb-4">Featured Work</p>
          <h2 className="heading-lg max-w-[12ch] text-balance text-[clamp(28px,7vw,48px)] md:max-w-none md:whitespace-nowrap">
            Products built. Problems solved.
          </h2>
        </div>
      </div>

      <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2">
        <div className="relative mx-auto h-[22rem] max-w-[1900px] overflow-visible px-3 sm:h-[24rem] sm:px-6 md:px-6 lg:h-[26rem] lg:px-10 xl:h-[28rem] xl:px-14">
          <div ref={canvasRef} className="tag-canvas absolute inset-0 z-10">
            {allTiles.map((tile, index) => {
              const project = projectBySlug.get(tile.slug);
              if (!project) return null;

              return (
                <Link
                  key={`${tile.slug}-${tile.preview}-${index}`}
                  ref={(element) => {
                    tileRefs.current[index] = element;
                  }}
                  href={`/work/${project.slug}`}
                  className="absolute left-0 top-0 block will-change-transform"
                  style={{ visibility: "hidden" }}
                  data-cursor="image"
                >
                  <TileCard project={project} preview={tile.preview} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sr-only">
        <h3>Featured projects</h3>
        <ul>
          {uniqueSlugs.map((slug) => {
            const project = projectBySlug.get(slug);
            if (!project) return null;

            return (
              <li key={slug}>
                <Link href={`/work/${project.slug}`}>{getDisplayTitle(project)}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function createLabSimulation(
  container: HTMLDivElement,
  triggerElement: HTMLElement,
  tileNodes: (HTMLAnchorElement | null)[],
  Matter: MatterModule,
  prefersReducedMotion: boolean,
  tiles: DesktopTile[],
  refOffset: number,
) {
  const { Bodies, Body, Composite, Engine, Events, Runner, Sleeping, World } = Matter;

  const isMobile = container.clientWidth < 768;
  const containerWidth = Math.max(container.clientWidth, isMobile ? 320 : 960);
  const containerHeight = Math.max(container.clientHeight, isMobile ? 320 : 440);
  const scale = clamp(containerWidth / 1720, isMobile ? 0.42 : 0.68, 1.04);
  const floorPadding = 18 * scale;

  const engine = Engine.create({
    enableSleeping: true,
    gravity: {
      x: 0,
      y: 0,
      scale: 0.001,
    },
  });

  const entries: TileEntry[] = [];

  tiles.forEach((tile, index) => {
    const width = tile.width * scale;
    const height = tile.height * scale;
    const jitterX = seededBetween(index + 1.17, -88, 88) * scale;
    const dropHeight = seededBetween(index + 6.71, 0.42, 0.78);
    const dropOffset = seededBetween(index + 11.39, 10, 36) * scale;
    const startAngle = seededBetween(index + 17.53, -0.075, 0.075);
    const startAngularVelocity = seededBetween(index + 21.81, -0.018, 0.018);
    const startVelocityX = seededBetween(index + 26.07, -0.42, 0.42) * scale;
    const startVelocityY = seededBetween(index + 29.41, 0, 0.1);
    const targetX = clamp(
      containerWidth * tile.x,
      width / 2 + 24 * scale,
      containerWidth - width / 2 - 24 * scale,
    );
    const targetY = clamp(
      containerHeight * tile.y,
      height / 2 + 40 * scale,
      containerHeight - height / 2 - floorPadding,
    );
    const spawnX = prefersReducedMotion
      ? targetX
      : clamp(
          targetX + jitterX,
          width / 2 + 24 * scale,
          containerWidth - width / 2 - 24 * scale,
        );
    const spawnY = prefersReducedMotion
      ? targetY
      : -height * dropHeight - dropOffset - index * 6;

    const body = Bodies.rectangle(spawnX, spawnY, width, height, {
      angle: prefersReducedMotion ? 0 : startAngle,
      chamfer: {
        radius: 22 * scale,
      },
      restitution: 0.2,
      friction: 0.78,
      frictionStatic: 0.94,
      frictionAir: 0.012,
      density: 0.00195,
      sleepThreshold: 22,
    });

    body.label = tile.slug;

    entries.push({ tile, targetX, targetY, width, height, body });

    if (!prefersReducedMotion) {
      Body.setAngularVelocity(body, startAngularVelocity);
      Body.setVelocity(body, {
        x: startVelocityX,
        y: startVelocityY,
      });
    }
  });

  const ground = Bodies.rectangle(
    containerWidth / 2,
    containerHeight + 30,
    containerWidth + 120,
    60,
    {
      isStatic: true,
      restitution: 0.1,
      render: { visible: false },
    },
  );

  const leftWall = Bodies.rectangle(-30, containerHeight / 2, 60, containerHeight + 100, {
    isStatic: true,
    render: { visible: false },
  });

  const rightWall = Bodies.rectangle(containerWidth + 30, containerHeight / 2, 60, containerHeight + 100, {
    isStatic: true,
    render: { visible: false },
  });

  World.add(engine.world, [ground, leftWall, rightWall, ...entries.map((entry) => entry.body)]);

  if (prefersReducedMotion) {
    entries.forEach((entry) => {
      Body.setPosition(entry.body, { x: entry.targetX, y: entry.targetY });
      Body.setAngle(entry.body, seededBetween(entry.tile.x + entry.tile.y, -0.055, 0.055));
    });
  }

  const runner = Runner.create();

  /* Don't start runner until gravity activates — keeps tiles frozen at spawn until visible */
  if (prefersReducedMotion) {
    Runner.run(runner, engine);
  }

  /* Hide all tile nodes first, then show only the active ones */
  tileNodes.forEach((node) => {
    if (node) {
      node.style.visibility = "hidden";
      node.style.opacity = "0";
    }
  });

  const syncTiles = () => {
    entries.forEach((entry, index) => {
      const node = tileNodes[refOffset + index];
      if (!node) {
        return;
      }

      const { body, width, height } = entry;
      node.style.visibility = "visible";
      node.style.opacity = "1";
      node.style.width = `${width}px`;
      node.style.height = `${height}px`;
      node.style.transform = `translate3d(${body.position.x - width / 2}px, ${body.position.y - height / 2}px, 0) rotate(${body.angle}rad)`;
    });
  };

  const handleAfterUpdate = () => {
    entries.forEach((entry) => {
      const { body, height } = entry;
      const nearFloor = body.position.y > containerHeight - height * 0.95;

      if (Math.abs(body.angle) > 0.34) {
        Body.setAngle(body, clamp(body.angle, -0.34, 0.34));
      }

      if (!body.isSleeping) {
        Body.setAngularVelocity(body, body.angularVelocity * (nearFloor ? 0.955 : 0.985));
      }

      if (nearFloor && body.speed < 0.18) {
        Body.setAngle(body, body.angle * 0.92);
      }
    });

    syncTiles();
  };

  Events.on(engine, "afterUpdate", handleAfterUpdate);
  let hasActivatedGravity = prefersReducedMotion;
  let safetyTimer: number | null = null;
  let activationInterval: number | null = null;

  const activateGravity = () => {
    if (hasActivatedGravity) {
      return;
    }

    hasActivatedGravity = true;

    /* Start the physics runner now so tiles begin moving */
    Runner.run(runner, engine);
    engine.world.gravity.y = 1.36;

    entries.forEach((entry, index) => {
      Sleeping.set(entry.body, false);
      Body.setVelocity(entry.body, {
        x:
          seededBetween(index + 34.12, -0.62, 0.62) * scale +
          (index % 2 === 0 ? -0.08 : 0.08) * scale,
        y: seededBetween(index + 38.44, 0, 0.14),
      });
      Body.setAngularVelocity(entry.body, seededBetween(index + 42.93, -0.028, 0.028));
    });
  };

  const shouldActivate = () => {
    const canvasRect = container.getBoundingClientRect();
    /* Activate when the canvas area is actually entering the viewport */
    return canvasRect.top < window.innerHeight * 0.85 && canvasRect.bottom > 0;
  };

  const handleViewportCheck = () => {
    if (shouldActivate()) {
      activateGravity();
      observer.disconnect();
      window.removeEventListener("scroll", handleViewportCheck);
      window.removeEventListener("resize", handleViewportCheck);
      if (safetyTimer) {
        window.clearTimeout(safetyTimer);
        safetyTimer = null;
      }
      if (activationInterval) {
        window.clearInterval(activationInterval);
        activationInterval = null;
      }
    }
  };

  const observer = new IntersectionObserver(
    (entriesList) => {
      const isVisible = entriesList.some((entry) => entry.isIntersecting);
      if (isVisible) {
        handleViewportCheck();
      }
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  if (!prefersReducedMotion) {
    observer.observe(triggerElement);
    window.addEventListener("scroll", handleViewportCheck, { passive: true });
    window.addEventListener("resize", handleViewportCheck);

    requestAnimationFrame(() => {
      handleViewportCheck();
    });

    safetyTimer = window.setTimeout(() => {
      handleViewportCheck();
    }, 500);

    activationInterval = window.setInterval(() => {
      handleViewportCheck();
    }, 180);
  }

  syncTiles();

  return () => {
    observer.disconnect();
    Events.off(engine, "afterUpdate", handleAfterUpdate);
    window.removeEventListener("scroll", handleViewportCheck);
    window.removeEventListener("resize", handleViewportCheck);
    if (safetyTimer) {
      window.clearTimeout(safetyTimer);
    }
    if (activationInterval) {
      window.clearInterval(activationInterval);
    }
    Runner.stop(runner);
    Composite.clear(engine.world, false);
    Engine.clear(engine);
    tileNodes.forEach((node) => {
      if (!node) {
        return;
      }

      node.style.opacity = "";
      node.style.visibility = "";
      node.style.width = "";
      node.style.height = "";
      node.style.transform = "";
    });
  };
}

function TileCard({
  project,
  preview,
}: {
  project: Project;
  preview: PreviewVariant;
}) {
  const title = getDisplayTitle(project);

  return (
    <div className="relative h-full w-full rounded-[1.1rem] bg-white p-2 ring-1 ring-[#d5dde6] sm:rounded-[1.55rem] sm:p-3">
      <div className="relative h-full overflow-hidden rounded-[0.75rem] bg-white ring-1 ring-inset ring-[rgba(215,223,232,0.9)] sm:rounded-[1.1rem]">
        <div className="absolute inset-0 [filter:saturate(1.24)_contrast(1.08)_brightness(0.98)]">
          <LabPreview project={project} preview={preview} />
        </div>

        <div className="pointer-events-none absolute inset-x-2 bottom-2 flex items-end justify-between rounded-4xl bg-white/95 px-2 py-1.5 ring-1 ring-[rgba(215,223,232,0.75)] backdrop-blur-sm sm:inset-x-3 sm:bottom-3 sm:rounded-[1rem] sm:px-3 sm:py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-primary sm:text-sm">{title}</p>
            <p className="truncate text-[9px] uppercase tracking-[0.14em] text-primary/54 sm:text-[10px] sm:tracking-[0.18em]">
              {normalizeText(project.category)}
            </p>
          </div>
          <div className="ml-2 shrink-0 rounded-full bg-primary p-1.5 text-white sm:p-2">
            <ArrowUpRight size={12} className="sm:h-3.5 sm:w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}


function LabPreview({
  project,
  preview,
}: {
  project: Project;
  preview: PreviewVariant;
}) {
  switch (preview) {
    case "orb":
      return (
        <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-[linear-gradient(145deg,#dff6d7,#edf8ef)]">
          <div className="absolute left-4 top-5 h-2 w-16 rounded-full bg-white/80" />
          <div className="absolute right-4 top-5 h-2 w-8 rounded-full bg-white/65" />
          <div className="absolute left-[24%] top-[28%] h-20 w-20 rounded-full bg-[radial-gradient(circle_at_35%_35%,#91db7b,#487b2a)] shadow-[inset_-14px_-16px_22px_rgba(0,0,0,0.18),0_18px_30px_rgba(82,125,68,0.3)]" />
          <div className="absolute left-4 bottom-8 max-w-[8rem] text-[11px] font-medium leading-4 text-white/70">
            Transforming landscapes through paradise living
          </div>
          <div className="absolute right-5 bottom-4 flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/85" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          </div>
        </div>
      );

    case "dashboard":
      return (
        <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,#12233f,#0a1226)]">
          <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/55">Analytics</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <div className="absolute inset-x-4 top-14 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-2xl bg-white/8 px-3 py-2">
                <div className="h-2 w-10 rounded-full bg-white/20" />
                <div className="mt-3 h-3 w-8 rounded-full bg-white/65" />
              </div>
            ))}
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-end gap-2">
            {[42, 64, 36, 80, 55, 72].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-xl bg-[linear-gradient(180deg,#7fb4ff,#476cff)]"
                style={{ height }}
              />
            ))}
          </div>
        </div>
      );

    case "portrait":
      return (
        <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,#eef9f5,#cfe7ff)]">
          <div className="absolute inset-x-3 top-4 rounded-[1.2rem] bg-white p-2 shadow-sm">
            <div className="h-20 rounded-[1rem] bg-[linear-gradient(145deg,#d9ecff,#f6fbff)]" />
            <div className="mt-2 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-[#ffd5bf]" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2 w-12 rounded-full bg-primary/15" />
                <div className="h-2 w-16 rounded-full bg-primary/10" />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-4 bottom-5 rounded-[1rem] bg-white p-2.5 shadow-sm">
            <div className="h-2 w-10 rounded-full bg-primary/15" />
            <div className="mt-2 h-10 rounded-[0.9rem] bg-[linear-gradient(180deg,#e4f4ff,#d3ebff)]" />
          </div>
        </div>
      );

    case "profile":
      return (
        <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,#d9edf3,#b2d1da)]">
          <div className="absolute inset-x-3 top-4 bottom-4 rounded-[1.2rem] bg-white p-2.5 shadow-sm">
            <div className="flex h-full flex-col rounded-[1rem] bg-[#c9e5e9] p-3">
              <div className="mx-auto h-20 w-20 rounded-[1.35rem] bg-[linear-gradient(145deg,#8c694b,#e8c7a8)]" />
              <div className="mt-3 h-2.5 w-16 rounded-full bg-primary/18" />
              <div className="mt-2 h-2 w-20 rounded-full bg-primary/12" />
              <div className="mt-auto grid grid-cols-3 gap-2">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="h-8 rounded-xl bg-white/70" />
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case "darkboard":
      return (
        <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,#10162c,#050814)]">
          <div className="absolute left-4 top-5 text-[10px] uppercase tracking-[0.24em] text-white/55">
            Engage. Boost. Track.
          </div>
          <div className="absolute inset-x-4 top-14 rounded-[1.2rem] border border-white/8 bg-white/[0.04] p-3">
            <div className="grid grid-cols-4 gap-2">
              {["#ffa42d", "#5bddc7", "#6b85ff", "#f9587e"].map((color) => (
                <div key={color} className="h-10 rounded-xl" style={{ background: color }} />
              ))}
            </div>
          </div>
          <div className="absolute inset-x-4 bottom-4 h-16 rounded-[1.3rem] border border-white/10 bg-[linear-gradient(180deg,#0d1734,#081022)]" />
        </div>
      );

    case "blueprint":
      return (
        <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,#efefef,#dfe6ee)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(27,107,154,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(27,107,154,0.08)_1px,transparent_1px)] bg-[size:18px_18px]" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 bg-white/75 shadow-[0_18px_30px_-20px_rgba(12,35,64,0.24)]" />
          <div className="absolute bottom-4 left-4 right-4 h-14 rounded-[1rem] border border-white/60 bg-white/55" />
        </div>
      );

    case "social":
      return (
        <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,#f5f4f6,#ffffff)]">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[1.85rem] font-black tracking-[-0.04em] text-primary/26">
            SOCIAL MEDIA AI
          </div>
          <div className="absolute right-6 top-8 w-16 rounded-[1.1rem] bg-[linear-gradient(180deg,#ffffff,#eaf3ff)] p-2 shadow-[0_12px_24px_-18px_rgba(12,35,64,0.35)]">
            <div className="mx-auto h-8 w-8 rounded-full bg-[linear-gradient(145deg,#d8e9ff,#7bb2ff)]" />
            <div className="mt-2 h-1.5 rounded-full bg-primary/12" />
            <div className="mt-1 h-8 rounded-xl bg-accent-light/65" />
          </div>
        </div>
      );

    case "pricing":
      return (
        <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,#ffffff,#fbfbfb)]">
          <div className="absolute inset-x-4 top-6 rounded-[1.1rem] border border-border/70 bg-[#fff7f2] p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2 w-10 rounded-full bg-orange-200" />
                <div className="mt-2 h-2 w-16 rounded-full bg-primary/10" />
              </div>
              <div className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white">
                Popular
              </div>
            </div>
          </div>
          <div className="absolute inset-x-4 bottom-4 space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-xl bg-primary/[0.035] px-3 py-2"
              >
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                <span className="h-2 w-20 rounded-full bg-primary/10" />
              </div>
            ))}
          </div>
        </div>
      );

    case "portrait-dark":
      return (
        <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,#394457,#b7c6d9)]">
          <div className="absolute inset-x-3 top-4 bottom-4 rounded-[1.2rem] bg-[#ffffff] p-2.5 shadow-sm">
            <div className="relative h-full overflow-hidden rounded-[1rem] bg-[linear-gradient(180deg,#18212f,#697f94)]">
              <div className="absolute inset-x-4 top-4 h-2 rounded-full bg-white/15" />
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2">
                <div className="h-12 rounded-xl bg-white/12" />
                <div className="h-12 rounded-xl bg-white/18" />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex h-full items-center justify-center bg-accent-light/40 text-primary/30">
          {project.title}
        </div>
      );
  }
}

function createTileTexture(
  project: Project,
  preview: PreviewVariant,
  width: number,
  height: number,
) {
  const title = getDisplayTitle(project);
  const outerRadius = Math.max(20, Math.min(width, height) * 0.11);
  const innerRadius = Math.max(16, outerRadius - 8);
  const frame = Math.max(14, Math.min(width, height) * 0.085);
  const innerX = frame;
  const innerY = frame;
  const innerWidth = width - frame * 2;
  const innerHeight = height - frame * 2;
  const previewMarkup = createPreviewSvg(preview, title, innerX, innerY, innerWidth, innerHeight);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
      <defs>
        <filter id="tileShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#0c2340" flood-opacity="0.16" />
        </filter>
      </defs>
      <g filter="url(#tileShadow)">
        <rect x="0" y="0" width="${width}" height="${height}" rx="${outerRadius}" fill="#ffffff" />
      </g>
      <rect x="${innerX}" y="${innerY}" width="${innerWidth}" height="${innerHeight}" rx="${innerRadius}" fill="#f3f6f8" />
      ${previewMarkup}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createPreviewSvg(
  preview: PreviewVariant,
  title: string,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const r = Math.max(14, Math.min(width, height) * 0.1);
  const safeTitle = escapeSvg(title);

  switch (preview) {
    case "orb":
      return `
        <defs>
          <radialGradient id="orbGlow" cx="35%" cy="35%" r="65%">
            <stop stop-color="#93df7a" />
            <stop offset="1" stop-color="#4b7f2f" />
          </radialGradient>
        </defs>
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#dff1d6" />
        <rect x="${x + width * 0.08}" y="${y + height * 0.1}" width="${width * 0.3}" height="${height * 0.1}" rx="${height * 0.05}" fill="#ffffff" fill-opacity="0.92" />
        <circle cx="${x + width * 0.72}" cy="${y + height * 0.12}" r="${height * 0.04}" fill="#ffffff" fill-opacity="0.86" />
        <circle cx="${x + width * 0.72}" cy="${y + height * 0.12}" r="${height * 0.022}" fill="#8cc466" />
        <circle cx="${x + width * 0.35}" cy="${y + height * 0.46}" r="${Math.min(width, height) * 0.2}" fill="url(#orbGlow)" />
        <rect x="${x + width * 0.74}" y="${y + height * 0.36}" width="${width * 0.16}" height="${height * 0.28}" rx="${r * 0.7}" fill="#b5dd92" />
        <rect x="${x + width * 0.72}" y="${y + height * 0.58}" width="${width * 0.18}" height="${height * 0.22}" rx="${r * 0.65}" fill="#ffffff" fill-opacity="0.72" />
        <text x="${x + width * 0.08}" y="${y + height * 0.55}" fill="#223626" font-family="Arial, sans-serif" font-size="${Math.max(
          14,
          width * 0.08,
        )}" font-weight="800">${safeTitle}</text>
        <text x="${x + width * 0.08}" y="${y + height * 0.83}" fill="#355637" font-family="Arial, sans-serif" font-size="${Math.max(
          8,
          width * 0.03,
        )}" font-weight="700">Transforming landscapes through paradise living</text>
      `;

    case "dashboard":
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#102140" />
        <rect x="${x}" y="${y}" width="${width}" height="${height * 0.16}" rx="${r}" fill="#13294c" />
        <circle cx="${x + width * 0.87}" cy="${y + height * 0.09}" r="${height * 0.022}" fill="#43df8f" />
        <rect x="${x + width * 0.1}" y="${y + height * 0.26}" width="${width * 0.23}" height="${height * 0.18}" rx="${r * 0.55}" fill="#1a3158" />
        <rect x="${x + width * 0.385}" y="${y + height * 0.26}" width="${width * 0.23}" height="${height * 0.18}" rx="${r * 0.55}" fill="#1a3158" />
        <rect x="${x + width * 0.67}" y="${y + height * 0.26}" width="${width * 0.23}" height="${height * 0.18}" rx="${r * 0.55}" fill="#1a3158" />
        ${[0.16, 0.34, 0.26, 0.46, 0.32, 0.4]
          .map(
            (value, index) => `
              <rect x="${x + width * (0.12 + index * 0.12)}" y="${y + height * (0.84 - value)}" width="${width * 0.08}" height="${height * value}" rx="${r * 0.26}" fill="${
                index % 2 === 0 ? "#7fb4ff" : "#476cff"
              }" />
            `,
          )
          .join("")}
        <text x="${x + width * 0.1}" y="${y + height * 0.12}" fill="#dce7ff" font-family="Arial, sans-serif" font-size="${Math.max(
          8,
          width * 0.03,
        )}" font-weight="700" letter-spacing="1.4">ANALYTICS</text>
      `;

    case "portrait":
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#e4f3ff" />
        <rect x="${x + width * 0.12}" y="${y + height * 0.08}" width="${width * 0.76}" height="${height * 0.4}" rx="${r * 0.8}" fill="#ffffff" fill-opacity="0.95" />
        <rect x="${x + width * 0.18}" y="${y + height * 0.13}" width="${width * 0.64}" height="${height * 0.18}" rx="${r * 0.5}" fill="#dce9f6" />
        <circle cx="${x + width * 0.24}" cy="${y + height * 0.42}" r="${height * 0.06}" fill="#ffd1bf" />
        <rect x="${x + width * 0.35}" y="${y + height * 0.37}" width="${width * 0.24}" height="${height * 0.03}" rx="${r * 0.2}" fill="#9bb6d6" />
        <rect x="${x + width * 0.35}" y="${y + height * 0.43}" width="${width * 0.34}" height="${height * 0.025}" rx="${r * 0.2}" fill="#c5d8ec" />
        <rect x="${x + width * 0.16}" y="${y + height * 0.62}" width="${width * 0.68}" height="${height * 0.18}" rx="${r * 0.75}" fill="#ffffff" fill-opacity="0.95" />
        <rect x="${x + width * 0.22}" y="${y + height * 0.68}" width="${width * 0.18}" height="${height * 0.025}" rx="${r * 0.2}" fill="#b9cde3" />
        <rect x="${x + width * 0.22}" y="${y + height * 0.73}" width="${width * 0.45}" height="${height * 0.08}" rx="${r * 0.4}" fill="#d3e9ff" />
      `;

    case "profile":
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#bfdce5" />
        <rect x="${x + width * 0.12}" y="${y + height * 0.08}" width="${width * 0.76}" height="${height * 0.84}" rx="${r * 0.95}" fill="#ffffff" fill-opacity="0.74" />
        <rect x="${x + width * 0.18}" y="${y + height * 0.14}" width="${width * 0.64}" height="${height * 0.72}" rx="${r * 0.85}" fill="#c8e4e8" />
        <circle cx="${x + width * 0.5}" cy="${y + height * 0.35}" r="${Math.min(width, height) * 0.16}" fill="#e0bea0" />
        <rect x="${x + width * 0.34}" y="${y + height * 0.52}" width="${width * 0.32}" height="${height * 0.03}" rx="${r * 0.2}" fill="#8ba9b5" />
        <rect x="${x + width * 0.3}" y="${y + height * 0.58}" width="${width * 0.4}" height="${height * 0.025}" rx="${r * 0.2}" fill="#adc5ce" />
        ${[0.24, 0.5, 0.76]
          .map(
            (offset) => `
              <rect x="${x + width * offset}" y="${y + height * 0.72}" width="${width * 0.16}" height="${height * 0.11}" rx="${
                r * 0.34
              }" fill="#ffffff" fill-opacity="0.74" />
            `,
          )
          .join("")}
      `;

    case "darkboard":
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#0d1328" />
        <text x="${x + width * 0.5}" y="${y + height * 0.23}" fill="#dce6ff" font-family="Arial, sans-serif" font-size="${Math.max(
          10,
          width * 0.05,
        )}" font-weight="700" text-anchor="middle">Engage. Boost. Track.</text>
        ${["#ffab31", "#55ddc6", "#6e84ff", "#fa5b7d"]
          .map(
            (color, index) => `
              <rect x="${x + width * (0.12 + index * 0.18)}" y="${y + height * 0.46}" width="${width * 0.12}" height="${height * 0.12}" rx="${
                r * 0.25
              }" fill="${color}" />
            `,
          )
          .join("")}
        <rect x="${x + width * 0.16}" y="${y + height * 0.68}" width="${width * 0.68}" height="${height * 0.08}" rx="${r * 0.3}" fill="#16213d" />
      `;

    case "blueprint":
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#e8edf2" />
        ${Array.from({ length: 9 })
          .map(
            (_, index) => `
              <line x1="${x + (index * width) / 8}" y1="${y}" x2="${x + (index * width) / 8}" y2="${y + height}" stroke="#bfd0dc" stroke-opacity="0.55" stroke-width="1" />
            `,
          )
          .join("")}
        ${Array.from({ length: 11 })
          .map(
            (_, index) => `
              <line x1="${x}" y1="${y + (index * height) / 10}" x2="${x + width}" y2="${y + (index * height) / 10}" stroke="#bfd0dc" stroke-opacity="0.55" stroke-width="1" />
            `,
          )
          .join("")}
        <circle cx="${x + width * 0.5}" cy="${y + height * 0.48}" r="${Math.min(width, height) * 0.18}" fill="#ffffff" fill-opacity="0.82" stroke="#d5e2eb" />
        <rect x="${x + width * 0.16}" y="${y + height * 0.72}" width="${width * 0.68}" height="${height * 0.1}" rx="${r * 0.28}" fill="#ffffff" fill-opacity="0.52" />
      `;

    case "social":
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#f5f4f6" />
        <text x="${x + width * 0.5}" y="${y + height * 0.56}" fill="#10213e" fill-opacity="0.18" font-family="Arial, sans-serif" font-size="${Math.max(
          16,
          width * 0.11,
        )}" font-weight="900" text-anchor="middle">SOCIAL MEDIA AI</text>
        <rect x="${x + width * 0.68}" y="${y + height * 0.16}" width="${width * 0.16}" height="${height * 0.48}" rx="${r * 0.45}" fill="#ffffff" />
        <circle cx="${x + width * 0.76}" cy="${y + height * 0.29}" r="${height * 0.07}" fill="#dae8ff" />
        <rect x="${x + width * 0.72}" y="${y + height * 0.42}" width="${width * 0.08}" height="${height * 0.03}" rx="${r * 0.18}" fill="#b8cbe8" />
        <rect x="${x + width * 0.72}" y="${y + height * 0.48}" width="${width * 0.09}" height="${height * 0.12}" rx="${r * 0.22}" fill="#d8ebff" />
      `;

    case "pricing":
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#fbfbfb" />
        <rect x="${x + width * 0.12}" y="${y + height * 0.14}" width="${width * 0.76}" height="${height * 0.28}" rx="${r * 0.65}" fill="#fff7f2" stroke="#ecdccf" />
        <rect x="${x + width * 0.64}" y="${y + height * 0.2}" width="${width * 0.16}" height="${height * 0.08}" rx="${r * 0.3}" fill="#ff8b37" />
        ${Array.from({ length: 4 })
          .map(
            (_, index) => `
              <rect x="${x + width * 0.16}" y="${y + height * (0.58 + index * 0.08)}" width="${width * 0.56}" height="${height * 0.05}" rx="${
                r * 0.22
              }" fill="#eef1f5" />
            `,
          )
          .join("")}
      `;

    case "portrait-dark":
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#d7dee5" />
        <rect x="${x + width * 0.18}" y="${y + height * 0.08}" width="${width * 0.64}" height="${height * 0.82}" rx="${r * 0.35}" fill="#fafafa" />
        <rect x="${x + width * 0.26}" y="${y + height * 0.16}" width="${width * 0.48}" height="${height * 0.64}" rx="${r * 0.2}" fill="#223149" />
        <rect x="${x + width * 0.33}" y="${y + height * 0.22}" width="${width * 0.34}" height="${height * 0.16}" rx="${r * 0.16}" fill="#415977" />
        <rect x="${x + width * 0.3}" y="${y + height * 0.46}" width="${width * 0.4}" height="${height * 0.24}" rx="${r * 0.18}" fill="#31465f" />
      `;

    default:
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" fill="#f1f4f7" />
        <text x="${x + width * 0.12}" y="${y + height * 0.54}" fill="#243650" font-family="Arial, sans-serif" font-size="${Math.max(
          14,
          width * 0.08,
        )}" font-weight="800">${safeTitle}</text>
      `;
  }
}

function getDisplayTitle(project: Project) {
  const normalized = normalizeText(project.title).replace(/—/g, "-");
  const firstChunk = normalized.split("-")[0]?.trim();

  return firstChunk && firstChunk.length > 0 ? firstChunk : normalized;
}

function normalizeText(text: string) {
  return text
    .replace(/â€”|Ã¢â‚¬â€/g, "—")
    .replace(/â€™|Ã¢â‚¬â„¢/g, "'")
    .replace(/â€œ|â€|Ã¢â‚¬Å“|Ã¢â‚¬Â/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function escapeSvg(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function seededBetween(seed: number, min: number, max: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453123;
  const unit = x - Math.floor(x);
  return min + unit * (max - min);
}
