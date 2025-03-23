import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { motion } from 'framer-motion'
import Testimonials from '../components/Testimonials'

function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      <Testimonials 
        title="What Our Patients Say"
        subtitle="Discover why patients choose our healthcare services. Read honest experiences from real patients who have trusted our doctors with their health."
        maxItems = {5}
      />
    </motion.div>
  )
}

export default Home