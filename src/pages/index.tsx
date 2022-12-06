import { Container } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, ReactNode } from 'react'
import Layout from '../components/layout'
import theme from '../components/theme'
import { NextPageWithLayout } from './_app'
// import styles from '../styles/Home.module.css'

const Home: NextPageWithLayout = () => {
  return (
    <h1>Hello NextJs</h1>
    // <Container
    //   sx={{
    //     mt: 8,
    //     width: 300,
    //     color: 'success.main',
    //   }}
    // >
    //   {/* <Head>
    //     <title>Home - Stormwild</title>
    //     <meta name='description' content='Stormwild (Alexander R. Torrijos)' />
    //     <link rel='icon' href='/favicon.ico' />
    //   </Head> */}

    // </Container>
  )
}

Home.getLayout = (page: ReactNode) => <Layout title='Home'>{page}</Layout>

export default Home
