'use client'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import '../styles/home.css'

// Auto-slide plugin
function AutoSliderPlugin(slider) {
  let timeout
  let mouseOver = false

  function clearNextTimeout() {
    clearTimeout(timeout)
  }

  function nextTimeout() {
    clearTimeout(timeout)
    if (mouseOver) return
    timeout = setTimeout(() => {
      slider.next()
    }, 3000) // her 3 saniyede bir kay
  }

  slider.on('created', () => {
    slider.container.addEventListener('mouseover', () => {
      mouseOver = true
      clearNextTimeout()
    })
    slider.container.addEventListener('mouseout', () => {
      mouseOver = false
      nextTimeout()
    })
    nextTimeout()
  })

  slider.on('dragStarted', clearNextTimeout)
  slider.on('animationEnded', nextTimeout)
  slider.on('updated', nextTimeout)
}

export default function Slider() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
      },
      mode: 'free-snap',
    },
    [AutoSliderPlugin]
  )

  return (
    <div ref={sliderRef} className="keen-slider rounded-lg shadow-lg overflow-hidden h-[450px] mb-10">
      <div className="keen-slider__slide">
        <Image src="/image/sap8.jpg" alt="Banner 1" width={1000} height={450} className="w-full h-full object-cover" />
      </div>
      <div className="keen-slider__slide">
        <Image src="/image/sap11.jpg" alt="Banner 2" width={1000} height={450} className="w-full h-full object-cover" />
      </div>
      <div className="keen-slider__slide">
        <Image src="/image/sap10.jpg" alt="Banner 3" width={1000} height={450} className="w-full h-full object-cover" />
      </div>
      <div className="keen-slider__slide">
        <Image src="/image/sap12.jpg" alt="Banner 3" width={1000} height={450} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
