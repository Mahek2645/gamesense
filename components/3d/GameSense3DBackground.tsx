'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function GameSense3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Setup Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 15)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5)
    scene.add(ambientLight)

    // Violet Key Light
    const violetLight = new THREE.PointLight(0x7757ff, 3.8, 30)
    violetLight.position.set(8, 6, 8)
    scene.add(violetLight)

    // Cyan Fill Light
    const cyanLight = new THREE.PointLight(0x45e0bd, 3.0, 25)
    cyanLight.position.set(-8, -4, 6)
    scene.add(cyanLight)

    // Emerald Rim Light
    const emeraldLight = new THREE.DirectionalLight(0x10b981, 1.4)
    emeraldLight.position.set(0, 8, -5)
    scene.add(emeraldLight)

    // Shared Materials
    const darkBodyMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.85,
      roughness: 0.25,
    })

    const gripMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.7,
      roughness: 0.5,
    })

    const violetGlowMat = new THREE.MeshStandardMaterial({
      color: 0x7757ff,
      emissive: 0x7757ff,
      emissiveIntensity: 1.0,
      metalness: 0.4,
      roughness: 0.2,
    })

    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x45e0bd,
      emissive: 0x45e0bd,
      emissiveIntensity: 1.1,
      metalness: 0.4,
      roughness: 0.2,
    })

    const buttonMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.5,
      roughness: 0.3,
    })

    // Helper: Build Procedural 3D Gaming Controller
    function createController() {
      const controller = new THREE.Group()

      // Main bridge body
      const bodyGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.4, 32)
      bodyGeo.rotateZ(Math.PI / 2)
      const body = new THREE.Mesh(bodyGeo, darkBodyMat)
      controller.add(body)

      // Left Grip
      const leftGripGeo = new THREE.CylinderGeometry(0.68, 0.42, 2.5, 24)
      leftGripGeo.rotateZ(0.38)
      const leftGrip = new THREE.Mesh(leftGripGeo, gripMat)
      leftGrip.position.set(-1.45, -0.65, 0)
      controller.add(leftGrip)

      // Right Grip
      const rightGripGeo = new THREE.CylinderGeometry(0.68, 0.42, 2.5, 24)
      rightGripGeo.rotateZ(-0.38)
      const rightGrip = new THREE.Mesh(rightGripGeo, gripMat)
      rightGrip.position.set(1.45, -0.65, 0)
      controller.add(rightGrip)

      // Center Touchpad / Neon Lightbar
      const lightbarGeo = new THREE.BoxGeometry(1.3, 0.55, 0.12)
      const lightbar = new THREE.Mesh(lightbarGeo, violetGlowMat)
      lightbar.position.set(0, 0.35, 0.8)
      controller.add(lightbar)

      // Dual Analog Thumbsticks
      const stickBaseGeo = new THREE.CylinderGeometry(0.42, 0.46, 0.22, 24)
      stickBaseGeo.rotateX(Math.PI / 2)
      const stickTopGeo = new THREE.SphereGeometry(0.3, 16, 16)
      stickTopGeo.scale(1, 0.45, 1)

      // Left Analog
      const leftBase = new THREE.Mesh(stickBaseGeo, buttonMat)
      leftBase.position.set(-0.65, -0.28, 0.78)
      const leftTop = new THREE.Mesh(stickTopGeo, violetGlowMat)
      leftTop.position.set(-0.65, -0.28, 0.95)
      controller.add(leftBase, leftTop)

      // Right Analog
      const rightBase = new THREE.Mesh(stickBaseGeo, buttonMat)
      rightBase.position.set(0.65, -0.28, 0.78)
      const rightTop = new THREE.Mesh(stickTopGeo, cyanGlowMat)
      rightTop.position.set(0.65, -0.28, 0.95)
      controller.add(rightBase, rightTop)

      // D-Pad (Left side)
      const dpadMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6, roughness: 0.3 })
      const dpadHGeo = new THREE.BoxGeometry(0.72, 0.24, 0.16)
      const dpadVGeo = new THREE.BoxGeometry(0.24, 0.72, 0.16)
      const dpadH = new THREE.Mesh(dpadHGeo, dpadMat)
      const dpadV = new THREE.Mesh(dpadVGeo, dpadMat)
      dpadH.position.set(-1.15, 0.35, 0.8)
      dpadV.position.set(-1.15, 0.35, 0.8)
      controller.add(dpadH, dpadV)

      // Action Buttons (Right side - 4 color diamond)
      const btnGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16)
      btnGeo.rotateX(Math.PI / 2)

      const colors = [0x45e0bd, 0x7757ff, 0xf43f5e, 0xf59e0b]
      const offsets = [
        { x: 1.15, y: 0.58 }, // Top (Cyan)
        { x: 1.15, y: 0.12 }, // Bottom (Violet)
        { x: 0.92, y: 0.35 }, // Left (Rose)
        { x: 1.38, y: 0.35 }, // Right (Amber)
      ]

      offsets.forEach((pos, idx) => {
        const mat = new THREE.MeshStandardMaterial({
          color: colors[idx],
          emissive: colors[idx],
          emissiveIntensity: 0.8,
        })
        const btn = new THREE.Mesh(btnGeo, mat)
        btn.position.set(pos.x, pos.y, 0.8)
        controller.add(btn)
      })

      // Shoulder Bumpers
      const bumperGeo = new THREE.BoxGeometry(0.8, 0.22, 0.4)
      const leftBumper = new THREE.Mesh(bumperGeo, buttonMat)
      leftBumper.position.set(-1.05, 0.9, 0.2)
      const rightBumper = new THREE.Mesh(bumperGeo, buttonMat)
      rightBumper.position.set(1.05, 0.9, 0.2)
      controller.add(leftBumper, rightBumper)

      return controller
    }

    // 1. Primary Hero 3D Gamepad (Right side, tilted toward center)
    const primaryGamepad = createController()
    primaryGamepad.position.set(6.2, 1.2, 1.5)
    primaryGamepad.rotation.set(0.35, -0.6, 0.15)
    primaryGamepad.scale.setScalar(1.05)
    scene.add(primaryGamepad)

    // 2. Secondary 3D Gamepad (Deeper in left background)
    const secondaryGamepad = createController()
    secondaryGamepad.position.set(-6.8, -2.5, -3)
    secondaryGamepad.rotation.set(-0.4, 0.7, -0.2)
    secondaryGamepad.scale.setScalar(0.7)
    scene.add(secondaryGamepad)

    // 3. Iconic D20 Gaming Die (Icosahedron with glowing wireframe)
    const d20Group = new THREE.Group()
    const d20Geo = new THREE.IcosahedronGeometry(1.3, 0)
    const d20Mat = new THREE.MeshPhysicalMaterial({
      color: 0x090e1a,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.8,
    })
    const d20Mesh = new THREE.Mesh(d20Geo, d20Mat)
    const d20Edges = new THREE.EdgesGeometry(d20Geo)
    const d20Wire = new THREE.LineSegments(
      d20Edges,
      new THREE.LineBasicMaterial({ color: 0x7757ff, linewidth: 2 })
    )
    d20Group.add(d20Mesh, d20Wire)
    d20Group.position.set(-5.5, 2.8, 0)
    scene.add(d20Group)

    // 4. Low-Poly Gaming Mana Crystal (Emerald / Cyan Octahedron)
    const gemGroup1 = new THREE.Group()
    const gemGeo1 = new THREE.OctahedronGeometry(1.2, 0)
    gemGeo1.scale(0.75, 1.5, 0.75)
    const gemMat1 = new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x10b981,
      emissiveIntensity: 0.7,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    })
    const gemMesh1 = new THREE.Mesh(gemGeo1, gemMat1)
    const gemEdges1 = new THREE.EdgesGeometry(gemGeo1)
    const gemWire1 = new THREE.LineSegments(
      gemEdges1,
      new THREE.LineBasicMaterial({ color: 0x45e0bd })
    )
    gemGroup1.add(gemMesh1, gemWire1)
    gemGroup1.position.set(4.5, -3.2, -1)
    scene.add(gemGroup1)

    // 5. Low-Poly Power Crystal (Violet / Fuchsia Octahedron)
    const gemGroup2 = new THREE.Group()
    const gemGeo2 = new THREE.OctahedronGeometry(0.9, 0)
    gemGeo2.scale(0.8, 1.4, 0.8)
    const gemMat2 = new THREE.MeshStandardMaterial({
      color: 0x5b21b6,
      emissive: 0x7757ff,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    })
    const gemMesh2 = new THREE.Mesh(gemGeo2, gemMat2)
    const gemEdges2 = new THREE.EdgesGeometry(gemGeo2)
    const gemWire2 = new THREE.LineSegments(
      gemEdges2,
      new THREE.LineBasicMaterial({ color: 0xc084fc })
    )
    gemGroup2.add(gemMesh2, gemWire2)
    gemGroup2.position.set(-2.8, -4.5, 1)
    scene.add(gemGroup2)

    // 6. Floating Action Ring / Torus (Circle button / Portal)
    const ringGeo = new THREE.TorusGeometry(0.9, 0.1, 16, 48)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.9,
      metalness: 0.6,
      roughness: 0.3,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.position.set(2.8, 4.2, -2)
    scene.add(ringMesh)

    // 7. Floating Action Cross (X button)
    const crossGroup = new THREE.Group()
    const crossBarGeo = new THREE.BoxGeometry(1.2, 0.22, 0.2)
    const crossMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.9,
      metalness: 0.5,
      roughness: 0.3,
    })
    const bar1 = new THREE.Mesh(crossBarGeo, crossMat)
    const bar2 = new THREE.Mesh(crossBarGeo, crossMat)
    bar1.rotateZ(Math.PI / 4)
    bar2.rotateZ(-Math.PI / 4)
    crossGroup.add(bar1, bar2)
    crossGroup.position.set(-1.8, 3.8, -1.5)
    crossGroup.scale.setScalar(0.75)
    scene.add(crossGroup)

    // 8. Floating Action Triangle (Play / Delta symbol)
    const triGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.2, 3)
    const triMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.9,
      metalness: 0.6,
      roughness: 0.3,
    })
    const triMesh = new THREE.Mesh(triGeo, triMat)
    triMesh.position.set(7.5, -1.8, -2)
    triMesh.rotation.set(0.5, 0.2, 0.4)
    triMesh.scale.setScalar(0.7)
    scene.add(triMesh)

    // 9. Floating Mana Dust / Cyber Particles
    const particleCount = 160
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36
      particlePositions[i + 1] = (Math.random() - 0.5) * 28
      particlePositions[i + 2] = (Math.random() - 0.5) * 20 - 2
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    )
    const particleMat = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.12,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    })
    const particlePoints = new THREE.Points(particleGeo, particleMat)
    scene.add(particlePoints)

    // Mouse Parallax
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05
      currentMouseY += (targetMouseY - currentMouseY) * 0.05

      // Parallax Camera Tilt
      camera.position.x = currentMouseX * 1.6
      camera.position.y = currentMouseY * 1.2
      camera.lookAt(0, 0, 0)

      // Primary Gamepad Floating & Tumbling Motion
      primaryGamepad.rotation.x = 0.35 + Math.sin(elapsed * 0.7) * 0.18
      primaryGamepad.rotation.y = -0.6 + Math.cos(elapsed * 0.5) * 0.28
      primaryGamepad.rotation.z = 0.15 + Math.sin(elapsed * 0.4) * 0.1
      primaryGamepad.position.y = 1.2 + Math.sin(elapsed * 1.1) * 0.35

      // Secondary Gamepad Motion
      secondaryGamepad.rotation.x = -0.4 + Math.cos(elapsed * 0.6) * 0.15
      secondaryGamepad.rotation.y = 0.7 + Math.sin(elapsed * 0.45) * 0.22
      secondaryGamepad.position.y = -2.5 + Math.sin(elapsed * 0.9 + 1) * 0.3

      // D20 Die Continuous Rotation & Bobbing
      d20Group.rotation.x = elapsed * 0.45
      d20Group.rotation.y = elapsed * 0.6
      d20Group.position.y = 2.8 + Math.sin(elapsed * 1.2) * 0.3

      // Mana Crystals Floating
      gemGroup1.rotation.y = elapsed * 0.8
      gemGroup1.rotation.z = Math.sin(elapsed * 0.5) * 0.2
      gemGroup1.position.y = -3.2 + Math.sin(elapsed * 1.3 + 2) * 0.35

      gemGroup2.rotation.y = -elapsed * 0.7
      gemGroup2.rotation.x = Math.cos(elapsed * 0.6) * 0.2
      gemGroup2.position.y = -4.5 + Math.sin(elapsed * 1.0 + 3) * 0.25

      // Action Symbols Motion
      ringMesh.rotation.x = elapsed * 0.6
      ringMesh.rotation.y = elapsed * 0.4
      ringMesh.position.y = 4.2 + Math.sin(elapsed * 0.95 + 1.5) * 0.25

      crossGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.3
      crossGroup.rotation.y = elapsed * 0.5
      crossGroup.rotation.z = elapsed * 0.35
      crossGroup.position.y = 3.8 + Math.sin(elapsed * 1.05 + 0.8) * 0.25

      triMesh.rotation.x = 0.5 + Math.sin(elapsed * 0.7) * 0.3
      triMesh.rotation.y = elapsed * 0.65
      triMesh.position.y = -1.8 + Math.sin(elapsed * 1.15 + 2.5) * 0.3

      // Slow Orbit of Light Particles
      particlePoints.rotation.y = elapsed * 0.04
      particlePoints.rotation.x = Math.sin(elapsed * 0.02) * 0.05

      // Dynamic Lights subtle breathe
      violetLight.intensity = 3.2 + Math.sin(elapsed * 1.8) * 0.6
      cyanLight.intensity = 2.6 + Math.cos(elapsed * 1.5) * 0.5

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      // Traverse and dispose all geometries, materials
      scene.traverse((obj: any) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose())
          } else if (obj.material) {
            obj.material.dispose()
          }
        }
      })

      renderer.dispose()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none opacity-80 transition-opacity duration-1000"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle vignette gradient so page text in center maintains top-tier contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(8,13,24,0.3)_0%,rgba(8,13,24,0.85)_100%)] pointer-events-none" />
    </div>
  )
}
