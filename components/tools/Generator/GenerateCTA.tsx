import React from 'react'
import styled from 'styled-components'
import Spinner from '@/components/Spinner';

const Button = styled.button`
  border: none;
  width: 100%;
  border-radius: 8px;
  background: #000;
  padding: 14px 16px;
  color: #FFF;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  transition: all 0.5s ease;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;


const GenerateCTA = ({ handleGenerateClick, isLoading }: any) => {
  return (
    <Button onClick={handleGenerateClick} disabled={isLoading}>
      Generate Rap
      {isLoading ?
        <Spinner
          style={{ width: '20px', height: '20px' }}
        />
        : null
      }
    </Button>

  )
}

export default GenerateCTA