import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const LOGO_SCALE = 0.06;

function logoPoint(x, y, z = 0) {
  return new THREE.Vector3((x - 36) * LOGO_SCALE, (42 - y) * LOGO_SCALE, z);
}

function makeTube(points, color, radius = 0.025, emissive = color, closed = false) {
  const curve = Array.isArray(points)
    ? new THREE.CatmullRomCurve3(
      points.map((point) => point.isVector3 ? point : new THREE.Vector3(...point)),
      closed,
      'centripetal',
      0.5,
    )
    : points;
  const geometry = new THREE.TubeGeometry(curve, closed ? 96 : 48, radius, 12, closed);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.58,
    roughness: 0.35,
    metalness: 0.15,
  });
  return new THREE.Mesh(geometry, material);
}

function createLogoOutline() {
  const curve = new THREE.CurvePath();
  curve.add(new THREE.CubicBezierCurve3(logoPoint(36, 3), logoPoint(18.2, 3), logoPoint(4, 16.9), logoPoint(4, 34.4)));
  curve.add(new THREE.CubicBezierCurve3(logoPoint(4, 34.4), logoPoint(4, 45.4), logoPoint(9.6, 53.8), logoPoint(16.7, 61.2)));
  curve.add(new THREE.CubicBezierCurve3(logoPoint(16.7, 61.2), logoPoint(20, 64.6), logoPoint(22.3, 69), logoPoint(23.3, 73.6)));
  curve.add(new THREE.LineCurve3(logoPoint(23.3, 73.6), logoPoint(48.7, 73.6)));
  curve.add(new THREE.CubicBezierCurve3(logoPoint(48.7, 73.6), logoPoint(49.7, 69), logoPoint(52, 64.6), logoPoint(55.3, 61.2)));
  curve.add(new THREE.CubicBezierCurve3(logoPoint(55.3, 61.2), logoPoint(62.4, 53.8), logoPoint(68, 45.4), logoPoint(68, 34.4)));
  curve.add(new THREE.CubicBezierCurve3(logoPoint(68, 34.4), logoPoint(68, 16.9), logoPoint(53.8, 3), logoPoint(36, 3)));
  return curve;
}

function createLogoGlass() {
  const point = (x, y) => new THREE.Vector2((x - 36) * LOGO_SCALE, (42 - y) * LOGO_SCALE);
  const shape = new THREE.Shape();
  shape.moveTo(...point(36, 3).toArray());
  shape.bezierCurveTo(...point(18.2, 3).toArray(), ...point(4, 16.9).toArray(), ...point(4, 34.4).toArray());
  shape.bezierCurveTo(...point(4, 45.4).toArray(), ...point(9.6, 53.8).toArray(), ...point(16.7, 61.2).toArray());
  shape.bezierCurveTo(...point(20, 64.6).toArray(), ...point(22.3, 69).toArray(), ...point(23.3, 73.6).toArray());
  shape.lineTo(...point(48.7, 73.6).toArray());
  shape.bezierCurveTo(...point(49.7, 69).toArray(), ...point(52, 64.6).toArray(), ...point(55.3, 61.2).toArray());
  shape.bezierCurveTo(...point(62.4, 53.8).toArray(), ...point(68, 45.4).toArray(), ...point(68, 34.4).toArray());
  shape.bezierCurveTo(...point(68, 16.9).toArray(), ...point(53.8, 3).toArray(), ...point(36, 3).toArray());
  return new THREE.ShapeGeometry(shape, 48);
}

function createBulb(colors) {
  const group = new THREE.Group();
  const outlineColor = new THREE.Color(colors.outline);
  const lineColor = new THREE.Color(colors.lines);
  const nodeColor = new THREE.Color(colors.nodes);
  const pulseNodes = [];

  const glass = new THREE.Mesh(
    createLogoGlass(),
    new THREE.MeshStandardMaterial({
      color: outlineColor,
      emissive: lineColor,
      emissiveIntensity: 0.14,
      transparent: true,
      opacity: 0.055,
      roughness: 0.18,
      metalness: 0.08,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  glass.position.z = -0.08;
  group.add(glass);

  group.add(makeTube(createLogoOutline(), outlineColor, 0.1, outlineColor, true));
  [
    [[36, 15], [36, 62]],
    [[16, 29], [56, 51]],
    [[16, 49], [56, 27]],
    [[22, 14], [50, 55]],
    [[50, 14], [22, 55]],
    [[9, 36], [63, 36]],
  ].forEach(([start, end]) => group.add(makeTube([logoPoint(...start), logoPoint(...end)], lineColor, 0.042, lineColor)));

  [[36, 15, 2.7], [16, 29, 2.7], [56, 27, 2.7], [36, 39, 3.6], [22, 55, 2.7], [50, 55, 2.7]].forEach(([x, y, radius]) => {
    const position = logoPoint(x, y);
    const node = new THREE.Mesh(new THREE.SphereGeometry(radius * LOGO_SCALE, 24, 16), new THREE.MeshStandardMaterial({
      color: nodeColor,
      emissive: nodeColor,
      emissiveIntensity: 1.25,
      roughness: 0.25,
    }));
    node.position.copy(position);
    group.add(node);

    const glow = new THREE.Mesh(new THREE.SphereGeometry(radius * LOGO_SCALE * 1.9, 24, 16), new THREE.MeshBasicMaterial({
      color: nodeColor,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    }));
    glow.position.copy(node.position);
    group.add(glow);
    pulseNodes.push({ node, glow, phase: pulseNodes.length * 0.9 });
  });

  [
    [[22, 73], [50, 73]],
    [[21, 79], [51, 79]],
  ].forEach(([start, end]) => group.add(makeTube([logoPoint(...start), logoPoint(...end)], outlineColor, 0.075, outlineColor)));

  group.userData.pulseNodes = pulseNodes;
  group.scale.setScalar(1.08);
  return group;
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material].filter(Boolean);
    materials.forEach((material) => {
      if (material.map) material.map.dispose();
      material.dispose();
    });
  });
}

export default function HeroBulb3D({ theme, t }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const colors = theme === 'light'
      ? { outline: '#17628f', lines: '#1678ab', nodes: '#1263a8' }
      : { outline: '#b7f4ff', lines: '#46bfff', nodes: '#ffffff' };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.08, 8.25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.72;
    controls.minPolarAngle = Math.PI * 0.34;
    controls.maxPolarAngle = Math.PI * 0.66;
    controls.target.set(0, 0.06, 0);
    controls.update();

    scene.add(new THREE.AmbientLight(theme === 'light' ? 0xffffff : 0x8be8ff, theme === 'light' ? 1.35 : 0.65));
    const keyLight = new THREE.DirectionalLight(0xffffff, theme === 'light' ? 1.4 : 1.05);
    keyLight.position.set(2.5, 3.5, 4);
    scene.add(keyLight);
    const bulbLight = new THREE.PointLight(theme === 'light' ? 0x49a7ff : 0x8be8ff, theme === 'light' ? 7 : 10, 7);
    bulbLight.position.set(0, 0.7, 0.9);
    scene.add(bulbLight);

    const bulb = createBulb(colors);
    scene.add(bulb);
    let frameId = 0;
    let width = 1;
    let height = 1;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 420 ? 8.6 : 8.25;
      bulb.scale.setScalar(width < 420 ? 0.76 : 1);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    setSize();

    const animate = () => {
      const elapsed = performance.now() / 1000;
      const lightPulse = reducedMotion ? 0.5 : (Math.sin(elapsed * 2.4) + 1) / 2;
      bulb.rotation.y = reducedMotion ? 0 : Math.sin(elapsed * 0.45) * 0.08;
      bulbLight.intensity = (theme === 'light' ? 6.8 : 9.2) + lightPulse * 0.8;
      bulb.userData.pulseNodes.forEach(({ node, glow, phase }) => {
        const pulse = reducedMotion ? 0.45 : (Math.sin(elapsed * 2.1 + phase) + 1) / 2;
        node.material.emissiveIntensity = 0.9 + pulse * 0.8;
        glow.material.opacity = 0.06 + pulse * 0.16;
        glow.scale.setScalar(0.88 + pulse * 0.28);
      });

      controls.update();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.dispose();
      disposeObject(bulb);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [theme]);

  return (
    <div className="hero-bulb3d" aria-label={t('Lâmpada 3D girável')}>
      <div ref={containerRef} className="hero-bulb3d-canvas" aria-hidden="true" />
    </div>
  );
}
