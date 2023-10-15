import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import cambridge from '@/img/universities/Cambridge.svg?url';
import conventry from '@/img/universities/Conventry.svg?url';
import harvard from '@/img/universities/Harvard.svg?url';
import oxford from '@/img/universities/oxford.svg?url';
import penn from '@/img/universities/Penn.svg?url';
import stanford from '@/img/universities/StanfordUniversity.svg?url';
import UCL from '@/img/universities/UCL.svg?url';
import universityOfEastLondon from '@/img/universities/UniversityEastLondon.svg?url';
import universityOfLondon from '@/img/universities/universityoflondon.svg?url';
import yale from '@/img/universities/Yale.svg?url';

const universityImages = [
  { image: conventry, key: 'Conventry' },
  { image: oxford, key: 'Oxford' },
  { image: UCL, key: 'UCL' },
  { image: universityOfLondon, key: 'UniversityOfLondon' },
  { image: yale, key: 'Yale' },
  { image: cambridge, key: 'Cambridge' },
  { image: stanford, key: 'Stanford' },
  { image: harvard, key: 'Harvard' },
  { image: universityOfEastLondon, key: 'UniversityEastLondon' },
  { image: penn, key: 'Penn' },
];

const Images = styled(Image)`
  display: none;
  margin-right: 23px;
  @media (min-width: 576px) {
    display: block;
    width: 200.55px;
    height: 108.555px;
    margin-right: 84px;
  }
`;

const MobileImages = styled(Image)`
  display: block;
  margin-right: 23px;
  width: 94px;
  height: 30px;
  @media (min-width: 576px) {
    display: none;
  }
`

const UniversitiesImagesAnimation = () => {
  return (
    <>
      {universityImages.map(({ image, key }, index) => (
        <Images key={index} src={image} alt={`University Logo ${key}`} className='img'/>
      ))}

      {universityImages.map(({ image, key }, index) => (
        <MobileImages key={index} src={image} alt={`University Logo ${key}`} className='img'/>
      ))}


    </>
  );
};

export default UniversitiesImagesAnimation;
