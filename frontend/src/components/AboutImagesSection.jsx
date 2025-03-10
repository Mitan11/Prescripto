import React from 'react'
import { motion, useInView } from 'framer-motion'
import { galleryImages } from '../assets/assets'

function AboutImagesSection() {
    const containerRef = React.useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-50px 0px" })

    // Smooth animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    }

    const imageVariants = {
        hidden: { 
            opacity: 0, 
            y: 40,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                mass: 0.5,
                stiffness: 100,
                damping: 15,
                ease: [0.6, 0.01, 0, 0.9]
            }
        },
        hover: {
            scale: 1.03,
            y: -10,
            transition: {
                duration: 0.4,
                ease: 'easeOut'
            }
        }
    }

    return (
        <div className='w-full p-4' ref={containerRef}>
            <motion.h2 
                className="text-gray-700 font-semibold text-xl mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                A collection of moments that shape who we are
            </motion.h2>

            <motion.div
                className='columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-4 space-y-4'
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
                {galleryImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className='break-inside-avoid relative group'
                        variants={imageVariants}
                        // whileHover="hover"
                    >
                        <motion.img
                            src={image}
                            alt={`about-${index}`}
                            className='w-full h-auto rounded-lg transform-gpu will-change-transform'
                            // loading='lazy'
                            initial="hidden"
                            animate="visible"
                            style={{
                                transformOrigin: 'center bottom',
                                transformStyle: 'preserve-3d'
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.6, 0.01, 0, 0.9]
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default AboutImagesSection