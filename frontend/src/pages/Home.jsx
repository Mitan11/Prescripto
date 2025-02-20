import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { motion } from 'framer-motion'

function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </motion.div>
  )
}

export default Home