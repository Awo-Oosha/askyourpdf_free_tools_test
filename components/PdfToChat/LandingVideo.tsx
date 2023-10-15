import styled from "styled-components";
import { Container } from "@/styles/styles";

const VideoContainer = styled.section`
  height: 222px; 
  margin: 14px 0;
   @media (min-width: 576px) {
    height: 670px;
    margin: 34px 0; 
    padding: 12px;
    border-radius: 20px;
  }
`;

const LandingVideo = () => {
  return (
      <Container>
        <VideoContainer>
        <iframe
          src="https://www.youtube.com/embed/WPPA4mDjzyE"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "20px" }}
          width="100%" 
          height="100%"
        />
      </VideoContainer>
      </Container>
    )
}

export default LandingVideo;