/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const AnimatedTestimonials = ({ autoplay = true }: { autoplay?: boolean }) => {
  const testimonials: Testimonial[] = [
    {
      quote:
        'Conforama a constaté une nette amélioration dans l’efficacité de nos livraisons grâce au professionnalisme et à la fiabilité de GERICO.',
      name: 'Conforama',
      designation: '',
      src: '/images/testimonial-1.svg',
    },
    {
      quote:
        'Carrefour a grandement bénéficié de cette collaboration, améliorant notre supply chain et réduisant les coûts opérationnels.',
      name: 'Carrefour',
      designation: '',
      src: '/images/testimonial-2.svg',
    },
    {
      quote:
        'IKEA a renforcé sa logistique grâce à GERICO, nous permettant de respecter nos engagements envers nos clients avec une grande fiabilité.',
      name: 'IKEA',
      designation: '',
      src: '/images/testimonial-3.svg',
    },
  ];

  const [active, setActive] = useState(0);

  const handleNext = () => setActive(prev => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setActive(prev => (prev - 1 + testimonials.length) % testimonials.length);
  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 10000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 5;

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0,
                    scale: isActive(index) ? 1 : 0.9,
                    z: isActive(index) ? 0 : 999,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 origin-bottom">
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}>
            <h3 className="text-2xl font-bold dark:text-white text-black">
              {testimonials[active].name}
            </h3>
            <p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
              {testimonials[active].quote}
            </p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group">
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group">
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
