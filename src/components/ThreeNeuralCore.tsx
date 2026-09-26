import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeNeuralCoreProps {
  className?: string;
}

export const ThreeNeuralCore: React.FC<ThreeNeuralCoreProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 3.5, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 3, 50);
    pointLight2.position.set(-10, -8, 8);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x10b981, 2.5, 40);
    pointLight3.position.set(0, 12, -5);
    scene.add(pointLight3);

    // AI Core Group
    const aiCoreGroup = new THREE.Group();
    scene.add(aiCoreGroup);

    // 1. Central AI Neural Core
    const coreGeom = new THREE.IcosahedronGeometry(4.2, 3);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e1b4b,
      emissive: 0x4338ca,
      emissiveIntensity: 0.45,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMaterial);
    aiCoreGroup.add(coreMesh);

    // Inner pulsing crystal
    const innerGeom = new THREE.OctahedronGeometry(2.2, 0);
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      shininess: 100,
      flatShading: true,
      transparent: true,
      opacity: 0.95,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMaterial);
    aiCoreGroup.add(innerMesh);

    // 2. Orbital Tech Rings
    const ringGroup = new THREE.Group();
    aiCoreGroup.add(ringGroup);

    const createTechRing = (radius: number, tube: number, color: number, rotX: number, rotY: number) => {
      const geom = new THREE.TorusGeometry(radius, tube, 16, 100);
      const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.65 });
      const ring = new THREE.Mesh(geom, mat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ring1 = createTechRing(6.0, 0.05, 0x6366f1, Math.PI / 4, 0);
    const ring2 = createTechRing(7.2, 0.04, 0x06b6d4, -Math.PI / 3, Math.PI / 6);
    const ring3 = createTechRing(8.4, 0.06, 0x10b981, Math.PI / 6, -Math.PI / 4);
    ringGroup.add(ring1);
    ringGroup.add(ring2);
    ringGroup.add(ring3);

    // 3. Floating 3D Data Nodes
    const nodesGroup = new THREE.Group();
    aiCoreGroup.add(nodesGroup);

    const cubeGeom = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const cubeMat = new THREE.MeshPhongMaterial({
      color: 0x312e81,
      emissive: 0x6366f1,
      emissiveIntensity: 0.5,
      shininess: 60,
    });

    const nodeCount = 26;
    const nodeMeshes: Array<{
      mesh: THREE.Mesh;
      speedX: number;
      speedY: number;
      originalR: number;
      theta: number;
      phi: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      const m = new THREE.Mesh(cubeGeom, cubeMat);
      const theta = (i / nodeCount) * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;
      const r = 7.5 + Math.random() * 2.5;
      m.position.set(
        r * Math.cos(theta) * Math.cos(phi),
        r * Math.sin(phi),
        r * Math.sin(theta) * Math.cos(phi)
      );
      m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      nodesGroup.add(m);
      nodeMeshes.push({
        mesh: m,
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        originalR: r,
        theta,
        phi,
      });
    }

    // 4. Background Particle Field
    const particlesCount = 180;
    const pGeom = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 40;
      pPositions[i + 1] = (Math.random() - 0.5) * 30;
      pPositions[i + 2] = (Math.random() - 0.5) * 25 - 5;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.65,
    });
    const particleField = new THREE.Points(pGeom, pMat);
    scene.add(particleField);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      targetX = (x / (rect.width || window.innerWidth) - 0.5) * 2;
      targetY = -(y / (rect.height || window.innerHeight) - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      aiCoreGroup.rotation.y = time * 0.15 + mouseX * 0.5;
      aiCoreGroup.rotation.x = mouseY * 0.3 + Math.sin(time * 0.2) * 0.08;

      const scale = 1.0 + Math.sin(time * 3.0) * 0.12;
      innerMesh.scale.set(scale, scale, scale);
      innerMesh.rotation.x = -time * 0.8;
      innerMesh.rotation.y = time * 0.6;

      ring1.rotation.z = time * 0.4;
      ring2.rotation.z = -time * 0.35;
      ring3.rotation.y = time * 0.5;

      for (let i = 0; i < nodeMeshes.length; i++) {
        const item = nodeMeshes[i];
        item.mesh.rotation.x += item.speedX;
        item.mesh.rotation.y += item.speedY;
        const breathe = Math.sin(time * 2 + i) * 0.3;
        const r = item.originalR + breathe;
        item.mesh.position.set(
          r * Math.cos(item.theta + time * 0.1) * Math.cos(item.phi),
          r * Math.sin(item.phi),
          r * Math.sin(item.theta + time * 0.1) * Math.cos(item.phi)
        );
      }

      particleField.rotation.y = -time * 0.03;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      coreGeom.dispose();
      coreMaterial.dispose();
      innerGeom.dispose();
      innerMaterial.dispose();
      pGeom.dispose();
      pMat.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};
