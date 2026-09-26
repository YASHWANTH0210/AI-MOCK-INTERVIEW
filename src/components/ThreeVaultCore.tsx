import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeVaultCoreProps {
  className?: string;
}

export const ThreeVaultCore: React.FC<ThreeVaultCoreProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const pLight1 = new THREE.PointLight(0x6366f1, 3.5, 40);
    pLight1.position.set(8, 8, 8);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0x06b6d4, 3, 40);
    pLight2.position.set(-8, -6, 6);
    scene.add(pLight2);

    const vaultGroup = new THREE.Group();
    scene.add(vaultGroup);

    // Central Floating Shield / Token Prism
    const prismGeom = new THREE.CylinderGeometry(2.4, 2.4, 0.6, 6);
    const prismMat = new THREE.MeshPhongMaterial({
      color: 0x1e1b4b,
      emissive: 0x3730a3,
      emissiveIntensity: 0.5,
      shininess: 90,
      flatShading: true,
    });
    const prism = new THREE.Mesh(prismGeom, prismMat);
    prism.rotation.x = Math.PI / 2;
    vaultGroup.add(prism);

    // Concentric Rings
    const ringGeom1 = new THREE.TorusGeometry(3.6, 0.06, 16, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    vaultGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(4.6, 0.04, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    vaultGroup.add(ring2);

    // Orbiting Badges
    const badgeCount = 4;
    const badges: THREE.Mesh[] = [];
    const badgeGeom = new THREE.BoxGeometry(0.8, 0.8, 0.2);
    const badgeColors = [0x6366f1, 0x06b6d4, 0x10b981, 0xec4899];

    for (let i = 0; i < badgeCount; i++) {
      const bMat = new THREE.MeshPhongMaterial({
        color: badgeColors[i],
        emissive: badgeColors[i],
        emissiveIntensity: 0.4,
        shininess: 100,
      });
      const bMesh = new THREE.Mesh(badgeGeom, bMat);
      vaultGroup.add(bMesh);
      badges.push(bMesh);
    }

    // Particle dust
    const count = 100;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 15;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pMesh = new THREE.Points(
      geom,
      new THREE.PointsMaterial({ size: 0.15, color: 0x38bdf8, transparent: true, opacity: 0.6 })
    );
    scene.add(pMesh);

    // Mouse tracking
    let mX = 0, mY = 0, tX = 0, tY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      tX = ((e.clientX - r.left) / (r.width || width) - 0.5) * 1.5;
      tY = -((e.clientY - r.top) / (r.height || height) - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mX += (tX - mX) * 0.05;
      mY += (tY - mY) * 0.05;

      vaultGroup.rotation.y = time * 0.25 + mX * 0.4;
      vaultGroup.rotation.x = Math.sin(time * 0.4) * 0.1 + mY * 0.3;

      ring1.rotation.z = time * 0.5;
      ring2.rotation.z = -time * 0.3;
      prism.rotation.z = time * 0.1;

      for (let i = 0; i < badgeCount; i++) {
        const angle = (i / badgeCount) * Math.PI * 2 + time * 0.6;
        const r = 4.2;
        badges[i].position.set(Math.cos(angle) * r, Math.sin(angle) * r * 0.5, Math.sin(angle) * 1.5);
        badges[i].rotation.x = time + i;
        badges[i].rotation.y = time * 1.2;
      }

      pMesh.rotation.y = time * 0.05;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      prismGeom.dispose();
      prismMat.dispose();
      ringGeom1.dispose();
      ringMat1.dispose();
      ringGeom2.dispose();
      ringMat2.dispose();
      geom.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};
