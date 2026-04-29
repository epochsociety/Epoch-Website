import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGsapEffects(scopeRef) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.reveal', {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal-root',
          start: 'top 80%',
        },
      })

      gsap.utils.toArray('.tilt-3d').forEach((card) => {
        gsap.fromTo(
          card,
          { rotateX: 12, rotateY: -10, z: -60 },
          {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 50%',
              scrub: true,
            },
          },
        )
      })

      gsap.to('.hero-orb', {
        yPercent: -30,
        rotation: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-root',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.fromTo(
        '.hero-root',
        { rotateX: 4, rotateY: -4, transformPerspective: 1400 },
        {
          rotateX: -3,
          rotateY: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-root',
            start: 'top 85%',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      gsap.to('#gridOverlay', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: 'main',
          start: 'top top',
          end: '+=900',
          scrub: true,
        },
      })
    }, scopeRef)

    return () => ctx.revert()
  }, [scopeRef])
}
