import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;

export const Section = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const StyleFlexRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PageContainer = styled.section`
  width: 100%;
  min-height: 100dvh;
  position: relative;
  font-family: var(--font-satoshi);
`;
export const StyleFlexCol = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CTA = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  gap: 8px;
  border: none;
  color: #ffffff;
  padding: 8px 16px;
  background: #313131;
  border-radius: 12px;
  font-family: var(--font-satoshi);
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
`;

export const AppPageContainer = styled(PageContainer)`
  display: flex;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`