import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Простая цветовая схема
const COLORS = {
  GRAY: '#9CA3AF',     // Серый для всех обычных рыб
  HERO: '#5B8A72',     // Зелёный для главной рыбы
};

// Тип рыбы - только два варианта
type FishType = 'gray' | 'hero';

// Создание контура рыбы "ихтис" с хвостом (линии, не заливка)
function createFishGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];

  // Верхняя дуга (от хвоста к носу)
  for (let t = 0; t <= 1; t += 0.05) {
    const x = 0.5 - t * 1.0; // от 0.5 до -0.5
    const y = Math.sin(t * Math.PI) * 0.3;
    points.push(new THREE.Vector3(x, y, 0));
  }

  // Нижняя дуга (от носа к хвосту)
  for (let t = 0; t <= 1; t += 0.05) {
    const x = -0.5 + t * 1.0; // от -0.5 до 0.5
    const y = -Math.sin(t * Math.PI) * 0.3;
    points.push(new THREE.Vector3(x, y, 0));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return geometry;
}

// Создание хвоста (две расходящиеся линии)
function createTailGeometry(): THREE.BufferGeometry {
  const points = [
    new THREE.Vector3(0.5, 0, 0),
    new THREE.Vector3(0.85, 0.25, 0),
    new THREE.Vector3(0.5, 0, 0),
    new THREE.Vector3(0.85, -0.25, 0),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return geometry;
}

// Компонент одной рыбы (упрощённый)
function Fish({
  position,
  type,
  scale = 1,
  direction = -1,
  speed = 1,
  delay = 0,
  mouseOffset = [0, 0],
  depth = 0,
}: {
  position: [number, number, number];
  type: FishType;
  scale?: number;
  direction?: number;
  speed?: number;
  delay?: number;
  mouseOffset?: [number, number];
  depth?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineLoop>(null);
  const initialX = position[0];
  const initialY = position[1];

  // Параметры цвета и прозрачности
  const getFishParams = (fishType: FishType) => {
    if (fishType === 'hero') {
      return { color: COLORS.HERO, opacity: 1 };
    }
    return { color: COLORS.GRAY, opacity: 0.4 + Math.random() * 0.2 };
  };

  // Создаём геометрию рыбы (линии)
  const fishGeometry = useMemo(() => createFishGeometry(), []);
  const tailGeometry = useMemo(() => createTailGeometry(), []);

  // Параметры материала
  const params = useMemo(() => getFishParams(type), [type]);

  // Материал для линий
  const lineMaterial = useMemo(() =>
    new THREE.LineBasicMaterial({
      color: params.color,
      transparent: true,
      opacity: params.opacity,
      linewidth: 2,
    }), [params.color, params.opacity]);

  useFrame((state) => {
    if (groupRef.current && lineRef.current) {
      const time = state.clock.elapsedTime + delay;

      // Движение
      const baseSpeed = type === 'hero' ? 0.4 : 0.25;
      const movementSpeed = baseSpeed * speed;

      groupRef.current.position.x = initialX + direction * (time * movementSpeed) % 20;

      // Сброс позиции при выходе за экран
      if (direction < 0 && groupRef.current.position.x < -10) {
        groupRef.current.position.x = 10;
      }
      if (direction > 0 && groupRef.current.position.x > 10) {
        groupRef.current.position.x = -10;
      }

      // Вертикальное волнообразное движение
      const waveAmplitude = type === 'hero' ? 0.3 : 0.15;
      const waveSpeed = type === 'hero' ? 0.8 : 1.2;
      groupRef.current.position.y = initialY + Math.sin(time * waveSpeed) * waveAmplitude;

      // Parallax эффект от мыши
      const parallaxFactor = (1 - depth / 10) * 0.3;
      groupRef.current.position.x += mouseOffset[0] * parallaxFactor;
      groupRef.current.position.y += mouseOffset[1] * parallaxFactor;

      // Покачивание
      lineRef.current.rotation.z = Math.sin(time * 4 * speed) * 0.1;
    }
  });

  // Свечение для главной рыбы
  const glowGeometry = useMemo(() => {
    if (type === 'hero') {
      return new THREE.SphereGeometry(0.8, 16, 16);
    }
    return null;
  }, [type]);

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={[0, direction > 0 ? Math.PI : 0, 0]}
    >
      {/* Тело рыбы (контур) */}
      <lineLoop ref={lineRef} geometry={fishGeometry} material={lineMaterial} />

      {/* Хвост (две линии) */}
      <lineSegments geometry={tailGeometry} material={lineMaterial} />

      {/* Свечение для главной рыбы */}
      {type === 'hero' && glowGeometry && (
        <mesh geometry={glowGeometry}>
          <meshBasicMaterial
            color={COLORS.HERO}
            transparent
            opacity={0.1}
          />
        </mesh>
      )}
    </group>
  );
}

// Группа серых рыб - все плывут вправо (слева направо)
function GrayFishStream({
  count,
  mouseOffset,
}: {
  count: number;
  mouseOffset: [number, number];
}) {
  const fishData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const depthZ = -2 - Math.random() * 4;
      data.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 8,
          depthZ,
        ] as [number, number, number],
        scale: 0.3 + Math.random() * 0.7,
        speed: 0.6 + Math.random() * 0.4,
        delay: Math.random() * 10,
        depth: Math.abs(depthZ) / 6,
      });
    }
    return data;
  }, [count]);

  return (
    <>
      {fishData.map((fish) => (
        <Fish
          key={fish.id}
          position={fish.position}
          type="gray"
          scale={fish.scale}
          direction={1}
          speed={fish.speed}
          delay={fish.delay}
          mouseOffset={mouseOffset}
          depth={fish.depth}
        />
      ))}
    </>
  );
}

// Главная рыба - плывёт влево (против течения)
function HeroFish({ mouseOffset }: { mouseOffset: [number, number] }) {
  return (
    <Fish
      position={[0, 0, -1.5]}
      type="hero"
      scale={1.2}
      direction={-1}
      speed={0.8}
      delay={0}
      mouseOffset={mouseOffset}
      depth={0.3}
    />
  );
}

// Основной компонент анимации
function FishAnimation({ mouseOffset }: { mouseOffset: [number, number] }) {
  const grayFishCount = 40;

  return (
    <>
      <GrayFishStream count={grayFishCount} mouseOffset={mouseOffset} />
      <HeroFish mouseOffset={mouseOffset} />
    </>
  );
}

// Компонент для отслеживания мыши
function MouseTracker({ onMouseMove }: { onMouseMove: (offset: [number, number]) => void }) {
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * 2;
      const y = ((e.clientY / window.innerHeight) - 0.5) * 2;
      onMouseMove([x * 2, -y * 2]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [onMouseMove]);

  return null;
}

const BackgroundAnimation: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState<[number, number]>([0, 0]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Градиентный фон - светлый */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #FBF9F7 0%, #EBE7E0 100%)',
        }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <MouseTracker onMouseMove={setMouseOffset} />
          <FishAnimation mouseOffset={mouseOffset} />
        </Canvas>
      </div>
    </div>
  );
};

export default BackgroundAnimation;
