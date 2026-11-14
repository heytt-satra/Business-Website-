"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";

export default function ModelCanvas({
  kind,
  paused = false,
  progress,
  label,
}: {
  kind: string;
  paused?: boolean;
  progress?: RefObject<number>;
  label: string;
}) {
  const host = useRef<HTMLDivElement>(null),
    state = useRef({ kind, paused, progress });
  const [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    state.current = { kind, paused, progress };
  }, [kind, paused, progress]);
  useEffect(() => {
    const el = host.current!;
    let gone = false,
      visible = false,
      dispose: (() => void) | undefined,
      started = false;
    async function start() {
      if (started) return;
      started = true;
      const [
        T,
        { RoomEnvironment },
        { createModel, disposeObject },
        { createUniverse },
      ] = await Promise.all([
        import("three"),
        import("three/addons/environments/RoomEnvironment.js"),
        import("@/lib/models"),
        import("@/lib/universe"),
      ]);
      if (gone) return;
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try {
        renderer = new T.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
      } catch {
        setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      el.appendChild(renderer.domElement);
      const scene = new T.Scene(),
        camera = new T.PerspectiveCamera(37, 1, 0.1, 80);
      camera.position.set(0, 0.25, 6.4);
      let env: InstanceType<typeof T.WebGLRenderTarget> | undefined;
      if (state.current.kind !== "universe") {
        const pmrem = new T.PMREMGenerator(renderer),
          room = new RoomEnvironment();
        env = pmrem.fromScene(room, 0.04);
        scene.environment = Array.isArray(env.texture)
          ? env.texture[0]
          : env.texture;
        room.dispose();
        pmrem.dispose();
      }
      scene.add(
        new T.HemisphereLight(
          0xb8d4ee,
          0x222020,
          state.current.kind === "universe" ? 0.15 : 0.6,
        ),
      );
      const key = new T.DirectionalLight(0xfff1db, 3.5);
      key.position.set(-3, 4, 5);
      scene.add(key);
      const rim = new T.DirectionalLight(0x9cbfe5, 2);
      rim.position.set(4, 1, -2);
      scene.add(rim);
      const rig = new T.Group();
      scene.add(rig);
      let current = "",
        model: ReturnType<typeof createModel> | undefined,
        universe: ReturnType<typeof createUniverse> | undefined;
      const pointer = new T.Vector2(),
        ease = new T.Vector2();
      let dragging = false,
        lastX = 0,
        dragRotation = 0;
      const move = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        pointer.set(
          (e.clientX - rect.left) / rect.width - 0.5,
          (e.clientY - rect.top) / rect.height - 0.5,
        );
        if (dragging) {
          dragRotation += (e.clientX - lastX) * 0.008;
          lastX = e.clientX;
        }
      };
      const down = (e: PointerEvent) => {
        if (state.current.kind === "universe") return;
        dragging = true;
        lastX = e.clientX;
        el.setPointerCapture(e.pointerId);
      };
      const up = () => {
        dragging = false;
      };
      const leave = () => {
        if (!dragging) pointer.set(0, 0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      el.addEventListener("pointerleave", leave);
      let width = 1,
        height = 1;
      const resize = new ResizeObserver(() => {
        width = el.clientWidth;
        height = el.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.position.z =
          state.current.kind === "universe"
            ? width < 700
              ? 7.8
              : 6.5
            : width < 500
              ? 7.5
              : 6.4;
        camera.updateProjectionMatrix();
      });
      resize.observe(el);
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
      const startedAt = performance.now();
      let frame = 0,
        previous = 0,
        time = 0,
        lastRender = 0,
        lastProgress = -1,
        lastPointer = "",
        initial = true,
        hasRendered = false;
      function tick(now: number) {
        frame = requestAnimationFrame(tick);
        const dt = Math.min((now - previous) / 1000, 0.05);
        previous = now;
        if (!visible || document.hidden || now - lastRender < 32) return;
        const s = state.current,
          still = s.paused || preference.matches,
          p = s.progress?.current ?? 0;
        if (current !== s.kind) {
          if (model) {
            rig.remove(model.root);
            disposeObject(model.root);
          }
          if (universe) {
            rig.remove(universe.root);
            disposeObject(universe.root);
          }
          model = undefined;
          universe = undefined;
          current = s.kind;
          dragRotation = 0;
          rig.rotation.set(0, 0, 0);
          if (current === "universe") {
            universe = createUniverse();
            rig.add(universe.root);
          } else {
            model = createModel(current);
            rig.add(model.root);
          }
          initial = true;
        }
        if (!still) time += dt;
        const pointerKey = `${pointer.x.toFixed(2)},${pointer.y.toFixed(2)},${dragRotation.toFixed(3)}`;
        if (
          still &&
          !initial &&
          p === lastProgress &&
          pointerKey === lastPointer &&
          now - startedAt > 4000
        )
          return;
        initial = false;
        lastProgress = p;
        lastPointer = pointerKey;
        lastRender = now;
        if (model) {
          ease.lerp(pointer, 0.06);
          rig.rotation.y =
            (still ? 0 : time * 0.09) + ease.x * 0.38 + dragRotation;
          rig.rotation.x = still ? 0 : ease.y * 0.14;
          model.animate(time);
        }
        if (universe) universe.update(p, time, width < 700);
        renderer.render(scene, camera);
        if (!hasRendered) {
          hasRendered = true;
          setReady(true);
        }
      }
      frame = requestAnimationFrame(tick);
      const lost = (e: Event) => {
        e.preventDefault();
        setFailed(true);
        setReady(false);
        cancelAnimationFrame(frame);
      };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      dispose = () => {
        cancelAnimationFrame(frame);
        resize.disconnect();
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        el.removeEventListener("pointerleave", leave);
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        disposeObject(rig);
        env?.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible)
          start().catch(() => {
            if (!gone) setFailed(true);
          });
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => {
      gone = true;
      observer.disconnect();
      dispose?.();
    };
  }, []);
  const fallback = kind === "universe" ? "earth" : kind;
  return (
    <div
      className={`model-view ${ready && !failed ? "is-ready" : ""}`}
      role="img"
      aria-label={label}
    >
      <Image
        className="model-fallback"
        src={`/media/photography/${fallback}.webp`}
        alt=""
        fill
        sizes="(max-width:700px) 100vw, 65vw"
      />
      <div ref={host} className="model-canvas" />
      {!ready && !failed && (
        <span className="model-loading">Loading 3D view</span>
      )}
      {failed && <span className="model-loading">Photographic view</span>}
    </div>
  );
}
