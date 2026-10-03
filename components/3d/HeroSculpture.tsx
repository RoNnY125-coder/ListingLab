"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Create stacked twisting parametric slabs / helical ribbons
    const slabCount = 38;
    const slabGeo = new THREE.BoxGeometry(3.8, 0.08, 2.0);
    const slabs: THREE.Mesh[] = [];

    const orangeColor = new THREE.Color("#FF7A30");
    const beigeColor = new THREE.Color("#14100C");
    const darkColor = new THREE.Color("#26201A");

    for (let i = 0; i < slabCount; i++) {
      const t = i / slabCount;
      const col = new THREE.Color().lerpColors(darkColor, orangeColor, Math.sin(t * Math.PI));
      if (t < 0.2 || t > 0.8) {
        col.lerp(beigeColor, 0.25);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.25,
        metalness: 0.2,
      });

      const mesh = new THREE.Mesh(slabGeo, mat);
      const angle = (i / slabCount) * Math.PI * 1.8;
      const y = (i - slabCount / 2) * 0.16;

      mesh.position.y = y;
      mesh.rotation.y = angle;
      mesh.scale.set(
        1 + 0.25 * Math.sin(t * Math.PI),
        1,
        1 + 0.25 * Math.sin(t * Math.PI)
      );

      group.add(mesh);
      slabs.push(mesh);
    }

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff7a30, 4.5);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      mouseX = (e.clientX - halfX) * 0.0006;
      mouseY = (e.clientY - halfY) * 0.0006;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 450;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    setTimeout(onResize, 100);

    let reqId: number;
    const clock = new THREE.Clock();

      let scrollProgress = 0;

      // Add GSAP ScrollTrigger back for scroll-driven animations
      gsap.registerPlugin(ScrollTrigger);
      const scrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=1000",
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress = self.progress;
        }
      });

      const animate = () => {
        reqId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Subtle scroll-driven movement that doesn't misalign the object
        group.position.set(0, scrollProgress * -0.5, 0); 
        group.scale.setScalar(1 + scrollProgress * 0.2); // Gentle scale instead of wild scaling
        
        // Combine time-based spin, mouse parallax, and scroll rotation
        group.rotation.y = elapsed * 0.35 + targetX * 1.5 + scrollProgress * Math.PI;
        group.rotation.x = Math.sin(elapsed * 0.2) * 0.15 + targetY * 1.2 + scrollProgress * 0.5;

        for (let i = 0; i < slabs.length; i++) {
          slabs[i].rotation.y = ((i / slabCount) * Math.PI * 1.8) + Math.sin(elapsed * 0.9 + i * 0.1) * 0.06;
        }

        renderer.render(scene, camera);
      };

      animate();

    return () => {
      cancelAnimationFrame(reqId);
      if (scrollTrigger) scrollTrigger.kill();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      slabGeo.dispose();
      slabs.forEach((s) => {
        if (Array.isArray(s.material)) s.material.forEach((m) => m.dispose());
        else s.material.dispose();
      });
      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-full min-h-[360px] flex items-center justify-center">
        <div className="w-48 h-48 rounded-md bg-[#FF7A30]/20 blur-3xl animate-pulse" />
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full min-h-[360px] flex items-center justify-center" />;
}
