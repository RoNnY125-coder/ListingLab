"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSceneFallback } from "./HeroSceneFallback";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  useEffect(() => {
    // 1. WebGL capability check
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
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

    gsap.registerPlugin(ScrollTrigger);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 2. Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 16;
    camera.position.y = 0.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 3. Object Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 4. Matte Torus-Knot Geometry
    // Low polycount: tubularSegments 64, radialSegments 24
    const knotGeo = new THREE.TorusKnotGeometry(3.0, 0.82, 64, 24, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1D1712"),
      roughness: 0.35,
      metalness: 0.18,
      clearcoat: 0.35,
      clearcoatRoughness: 0.25,
      reflectivity: 0.6,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    mainGroup.add(knotMesh);

    // Thin glowing halo ring
    const ringGeo = new THREE.TorusGeometry(5.2, 0.025, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF7A30"),
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh);

    // 5. Lightweight warm particle dust (120 particles)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const orangeColor = new THREE.Color("#FF7A30");
    const beigeColor = new THREE.Color("#E8DCC8");

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const isOrange = Math.random() > 0.4;
      const col = isOrange ? orangeColor : beigeColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 6. Warm Studio Lighting
    // Ambient Light (subtle warm charcoal fill)
    const ambientLight = new THREE.AmbientLight(0x26201a, 1.2);
    scene.add(ambientLight);

    // Beige Key Light (front left)
    const keyLight = new THREE.DirectionalLight(0xe8dcc8, 2.4);
    keyLight.position.set(-6, 8, 10);
    scene.add(keyLight);

    // Warm Burnt Orange Rim Light (back right)
    const rimLight = new THREE.DirectionalLight(0xff7a30, 4.8);
    rimLight.position.set(8, -4, -6);
    scene.add(rimLight);

    // Secondary Warm Point Light
    const pointLight = new THREE.PointLight(0xff7a30, 2.0, 15);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // 7. Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      mouseX = (e.clientX - halfX) * 0.0004;
      mouseY = (e.clientY - halfY) * 0.0004;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 9. ScrollTrigger Scrub Integration
    // As user scrolls past the hero, rotate faster, recede (Z scale/pos), and fade out
    let scrollProgress = 0;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    // 10. Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Base idle rotation + mouse offset
      knotMesh.rotation.y = elapsed * 0.18 + targetX * 2.0;
      knotMesh.rotation.x = Math.sin(elapsed * 0.12) * 0.15 + targetY * 2.0;
      ringMesh.rotation.z = -elapsed * 0.2;
      particles.rotation.y = elapsed * 0.06;

      // Compose scroll-driven transforms
      mainGroup.position.y = -scrollProgress * 4;
      mainGroup.position.z = -scrollProgress * 8;
      mainGroup.rotation.x = scrollProgress * Math.PI * 0.8;
      mainGroup.rotation.y = scrollProgress * Math.PI * 1.2;

      // Fade opacity based on scroll
      knotMat.opacity = Math.max(0, 1 - scrollProgress * 1.3);
      knotMat.transparent = scrollProgress > 0.05;
      ringMat.opacity = Math.max(0, 0.45 * (1 - scrollProgress * 1.5));
      particleMat.opacity = Math.max(0, 0.65 * (1 - scrollProgress * 1.5));

      renderer.render(scene, camera);
    };

    animate();

    // 11. Clean up resources on unmount
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      scrollTrigger.kill();

      knotGeo.dispose();
      knotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webGLSupported) {
    return <HeroSceneFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
