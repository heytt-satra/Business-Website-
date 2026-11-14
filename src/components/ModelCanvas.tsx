"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { cosmicImage } from "@/lib/cosmic";

export default function ModelCanvas({
  kind,
  paused = false,
  progress,
  label,
  interactive = true,
}: {
  kind: string;
  paused?: boolean;
  progress?: RefObject<number>;
  label: string;
  interactive?: boolean;
}) {
  const [zoom, setZoom] = useState(1);
  const resetView = useRef(0);
  const host = useRef<HTMLDivElement>(null),
    state = useRef({ kind, paused, progress, zoom });
  const [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    state.current = { kind, paused, progress, zoom };
  }, [kind, paused, progress, zoom]);
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
        { createStudioEnvironment },
        { createModel, disposeObject },
        { createUniverse },
      ] = await Promise.all([
        import("three"),
        import("@/lib/studio"),
        import("@/lib/models"),
        import("@/lib/universe"),
      ]);
      if (gone) return;
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try {
        renderer = new T.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      renderer.shadowMap.enabled = state.current.kind !== "universe";
      renderer.shadowMap.type = T.PCFShadowMap;
      el.appendChild(renderer.domElement);
      const scene = new T.Scene(),
        camera = new T.PerspectiveCamera(37, 1, 0.1, 80);
      camera.position.set(0, 0.25, 6.4);
      let env: InstanceType<typeof T.WebGLRenderTarget> | undefined;
      if (state.current.kind !== "universe") {
        const pmrem = new T.PMREMGenerator(renderer),
          room = createStudioEnvironment();
        env = pmrem.fromScene(room, 0.025);
        scene.environment = Array.isArray(env.texture)
          ? env.texture[0]
          : env.texture;
        disposeObject(room);
        pmrem.dispose();
      }
      scene.add(
        new T.HemisphereLight(
          0xb8d4ee,
          0x222020,
          state.current.kind === "universe" ? 0.15 : 0.32,
        ),
      );
      const key = new T.DirectionalLight(0xfff1db, 2.5);
      key.position.set(-3, 5, 6);
      key.castShadow = state.current.kind !== "universe";
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -3;
      key.shadow.camera.right = 3;
      key.shadow.camera.top = 3;
      key.shadow.camera.bottom = -3;
      key.shadow.camera.near = 1;
      key.shadow.camera.far = 20;
      key.shadow.normalBias = 0.018;
      key.shadow.bias = -0.0001;
      scene.add(key);
      const rim = new T.DirectionalLight(0xb4cad8, 1.2);
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
        lastY = 0,
        dragPitch = 0,
        resetEpoch = 0,
        dragRotation = 0;
      const move = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        pointer.set(
          (e.clientX - rect.left) / rect.width - 0.5,
          (e.clientY - rect.top) / rect.height - 0.5,
        );
        if (dragging) {
          dragRotation += (e.clientX - lastX) * 0.008;
          dragPitch = Math.max(
            -0.6,
            Math.min(0.6, dragPitch + (e.clientY - lastY) * 0.005),
          );
          lastX = e.clientX;
          lastY = e.clientY;
        }
      };
      const down = (e: PointerEvent) => {
        if (state.current.kind === "universe") return;
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
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
        camera.position.y = state.current.kind === "universe" ? 0.25 : 0.65;
        camera.lookAt(0, state.current.kind === "universe" ? 0.25 : 0, 0);
        camera.updateProjectionMatrix();
      });
      resize.observe(el);
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
      const startedAt = performance.now();
      let frame = 0,
        time = 0,
        lastRender = 0,
        lastProgress = -1,
        lastPointer = "",
        initial = true,
        hasRendered = false;
      function tick(now: number) {
        frame = requestAnimationFrame(tick);
        const dt = Math.min((now - lastRender) / 1000, 0.1);
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
          dragPitch = 0;
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
        if (resetEpoch !== resetView.current) {
          resetEpoch = resetView.current;
          dragRotation = 0;
          dragPitch = 0;
          time = 0;
          pointer.set(0, 0);
          ease.set(0, 0);
          initial = true;
        }
        const pointerKey = `${pointer.x.toFixed(2)},${pointer.y.toFixed(2)},${dragRotation.toFixed(3)},${dragPitch.toFixed(3)},${s.zoom},${width},${height}`;
        if (
          still &&
          !initial &&
          p === lastProgress &&
          pointerKey === lastPointer &&
          ease.distanceTo(pointer) < 0.001 &&
          now - startedAt > 4000
        )
          return;
        initial = false;
        lastProgress = p;
        lastPointer = pointerKey;
        lastRender = now;
        if (model) {
          ease.lerp(pointer, 0.06);
          rig.rotation.y = time * 0.035 + ease.x * 0.23 + dragRotation;
          rig.rotation.x = ease.y * 0.1 + dragPitch;
          camera.position.z = (width < 500 ? 7.5 : 6.4) / s.zoom;
          camera.lookAt(0, 0, 0);
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
        key.shadow.map?.dispose();
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
  const fallback = cosmicImage(kind === "universe" ? "orbital" : kind);
  return (
    <div
      className={`model-view ${ready && !failed ? "is-ready" : ""}`}
      role="group"
      aria-label={label}
    >
      <Image
        className="model-fallback"
        src={fallback.src}
        alt=""
        fill
        sizes="(max-width:700px) 100vw, 65vw"
      />
      <div
        ref={host}
        className="model-canvas"
        style={interactive ? undefined : { pointerEvents: "none" }}
      />
      {kind !== "universe" && interactive && ready && !failed && (
        <div className="model-tools" aria-label="3D view controls">
          <button
            onClick={() => setZoom((v) => Math.max(0.8, v - 0.2))}
            aria-label="Zoom out"
            disabled={zoom <= 0.8}
          >
            −
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((v) => Math.min(2, v + 0.2))}
            aria-label="Zoom in"
            disabled={zoom >= 2}
          >
            +
          </button>
          <button
            onClick={() => {
              setZoom(1);
              resetView.current++;
            }}
            aria-label="Reset 3D view"
          >
            ↺
          </button>
        </div>
      )}
      {!ready && !failed && (
        <span className="model-loading">Loading 3D view</span>
      )}
      {failed && (
        <span className="model-loading">Cosmic view · 3D unavailable</span>
      )}
      {(!ready || failed) && (
        <span className="model-image-credit">
          {fallback.title} · {fallback.author}
        </span>
      )}
    </div>
  );
}
