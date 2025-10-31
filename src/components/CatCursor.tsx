'use client'

import { useState, useEffect, useRef } from 'react'

type Direction = 'right' | 'left' | 'up' | 'down' | 'upright' | 'upleft' | 'downright' | 'downleft';
type Action = 'idle' | 'walking' | 'claw' | 'sleep' | 'wash' | 'scratch' | 'yawn';

const catStates = {
  idle: ['/catstates/awake.png'],
  walking: {
    up: ['/catstates/up1.png', '/catstates/up2.png'],
    down: ['/catstates/down1.png', '/catstates/down2.png'],
    left: ['/catstates/left1.png', '/catstates/left2.png'],
    right: ['/catstates/right1.png', '/catstates/right2.png'],
    upleft: ['/catstates/upleft1.png', '/catstates/upleft2.png'],
    upright: ['/catstates/upright1.png', '/catstates/upright2.png'],
    downleft: ['/catstates/downleft1.png', '/catstates/downleft2.png'],
    downright: ['/catstates/downright1.png', '/catstates/downright2.png']
  },
  claw: { /* ... */ },
  actions: {
    sleep: ['/catstates/sleep1.png', '/catstates/sleep2.png'],
    wash: ['/catstates/wash1.png', '/catstates/wash2.png'],
    scratch: ['/catstates/scratch1.png', '/catstates/scratch2.png'],
    yawn: ['/catstates/yawn1.png', '/catstates/yawn2.png']
  }
};

// --- RE-TUNED PHYSICS CONSTANTS ---
const STIFFNESS = 0.05;          // Softer spring for smoother movement
const DAMPING = 0.9;             // Less friction for more glide
const MAX_SPEED = 3;            // MUST be high to allow for quick movement
const FOLLOW_DISTANCE = 100;     // The desired distance from the cursor
const ORBIT_STRENGTH = 0.7;      // How much the cat swings around the cursor (0 to 1)
const REST_THRESHOLD = 5;        // A "comfort zone" to prevent jittering (in pixels)

export function CatCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPosition, setTargetPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(catStates.idle[0]);

  const animationStateRef = useRef({
    position: { x: -100, y: -100 },
    velocity: { x: 0, y: 0 },
    // NEW: Track last target position to calculate cursor velocity
    lastTargetPosition: { x: -100, y: -100 },
    direction: 'right' as Direction,
    action: 'idle' as Action,
    frame: 0,
    lastFrameTime: 0,
    lastActionTime: 0,
    isFirstMove: true,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
      
      if (animationStateRef.current.isFirstMove) {
        animationStateRef.current.isFirstMove = false;
        const initialPos = { x: e.clientX - FOLLOW_DISTANCE, y: e.clientY };
        animationStateRef.current.position = initialPos;
        animationStateRef.current.lastTargetPosition = { x: e.clientX, y: e.clientY };
        setPosition(initialPos);
        setIsVisible(true);
      } else if (!isVisible) {
        setIsVisible(true);
      }
    };
    const handleMouseLeave = () => setIsVisible(false);
    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let animationFrameId: number;
    const updateCat = (timestamp: number) => {
      const state = animationStateRef.current;
      const now = timestamp;

      // --- NEW & IMPROVED PHYSICS ---
      const dx = targetPosition.x - state.position.x;
      const dy = targetPosition.y - state.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      let forceX = 0;
      let forceY = 0;

      // 1. RADIAL FORCE (Push/Pull)
      // Only apply force if outside the "comfort zone"
      if (distance > FOLLOW_DISTANCE + REST_THRESHOLD || distance < FOLLOW_DISTANCE - REST_THRESHOLD) {
        const distanceError = distance - FOLLOW_DISTANCE;
        if (distance > 1) {
          const nx = dx / distance;
          const ny = dy / distance;
          forceX += nx * distanceError;
          forceY += ny * distanceError;
        }
      }
      
      // 2. TANGENTIAL FORCE (Orbit)
      const targetVelX = targetPosition.x - state.lastTargetPosition.x;
      const targetVelY = targetPosition.y - state.lastTargetPosition.y;

      if (distance > 1) {
          // Get the direction perpendicular to the cat-cursor line
          const tangentX = -dy / distance;
          const tangentY = dx / distance;
          // Project the cursor's velocity onto this tangent
          const tangentSpeed = (targetVelX * tangentX + targetVelY * tangentY);
          // Apply the force in the tangent direction
          forceX += tangentX * tangentSpeed * ORBIT_STRENGTH;
          forceY += tangentY * tangentSpeed * ORBIT_STRENGTH;
      }
      
      // Update last target position for the next frame
      state.lastTargetPosition = { ...targetPosition };

      // Apply forces and damping
      const ax = forceX * STIFFNESS;
      const ay = forceY * STIFFNESS;
      state.velocity.x += ax;
      state.velocity.y += ay;
      state.velocity.x *= DAMPING;
      state.velocity.y *= DAMPING;

      // Cap speed
      const speed = Math.sqrt(state.velocity.x**2 + state.velocity.y**2);
      if (speed > MAX_SPEED) {
        const scale = MAX_SPEED / speed;
        state.velocity.x *= scale;
        state.velocity.y *= scale;
      }
      
      // Update position
      state.position.x += state.velocity.x;
      state.position.y += state.velocity.y;
      setPosition({ ...state.position });

      // --- State machine logic (no changes here, but increased idle time) ---
      const isMoving = speed > 0.5;
      const newAction = isMoving ? 'walking' : 'idle';
      if (newAction !== state.action && !['sleep', 'wash', 'scratch', 'yawn'].includes(state.action)) {
        state.action = newAction;
        state.frame = 0;
        if (newAction === 'idle') {
            state.lastActionTime = now;
        }
      }

      if (isMoving) {
        const { x: velX, y: velY } = state.velocity;
        const absVelX = Math.abs(velX);
        const absVelY = Math.abs(velY);
        if (absVelX > 0.1 || absVelY > 0.1) {
          if (absVelX > 0.5 && absVelY > 0.5) {
            if (velY > 0) state.direction = velX > 0 ? 'downright' : 'downleft';
            else state.direction = velX > 0 ? 'upright' : 'upleft';
          } else if (absVelX > absVelY) {
            state.direction = velX > 0 ? 'right' : 'left';
          } else {
            state.direction = velY > 0 ? 'down' : 'up';
          }
        }
      }

      // Increased idle time to feel more natural
      if (state.action === 'idle' && now - state.lastActionTime > 5000) {
          const idleActions: Action[] = ['sleep', 'wash', 'yawn', 'scratch'];
          const nextAction = idleActions[Math.floor(Math.random() * idleActions.length)];
          state.action = nextAction;
          state.frame = 0;
          setTimeout(() => {
              if (animationStateRef.current.action === nextAction) {
                animationStateRef.current.action = 'idle';
                animationStateRef.current.lastActionTime = performance.now();
              }
          }, 2500);
      }

      // --- Animation rendering (no changes here) ---
      let frames: string[] = catStates.idle;
      let frameTime = 150;
      if (state.action === 'walking') {
        frames = catStates.walking[state.direction] || catStates.walking.right;
      } else if (catStates.actions[state.action as keyof typeof catStates.actions]) {
        frames = catStates.actions[state.action as keyof typeof catStates.actions];
        frameTime = 250;
      }
      if (now - state.lastFrameTime > frameTime) {
        state.frame = (state.frame + 1) % frames.length;
        state.lastFrameTime = now;
      }
      setCurrentImage(frames[state.frame]);

      animationFrameId = requestAnimationFrame(updateCat);
    };
    animationFrameId = requestAnimationFrame(updateCat);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, targetPosition]);

  if (!isVisible) return null;

  return (
    <div
      className="cat-cursor fixed pointer-events-none"
      style={{
        left: `${position.x - 16}px`,
        top: `${position.y - 16}px`,
        zIndex: 9999,
        willChange: 'transform, top, left',
      }}
    >
      <img src={currentImage} alt="Cat cursor" className="w-8 h-8" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))', imageRendering: 'pixelated' }} />
    </div>
  );
}