import React, {Fragment} from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/FreeLanding/Hero'), {
  ssr: false,
  loading:()=>{
    return null;
  }
});

const index = () => {
  return (
    <Fragment>
      <Hero/>
    </Fragment>
  )
}

export default index