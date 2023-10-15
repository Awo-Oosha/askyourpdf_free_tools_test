import styled from "styled-components";

const VideoContainer = styled.section`
  height: 222px; 
  margin: 34px 16px;
   @media (min-width: 576px) {
    height: 675px;
    margin: 34px 120px; 
    padding: 12px;
    border-radius: 20px;
  }
`;

const IntroVideo = () => {
  return (
      <VideoContainer>
        <iframe
          src="https://www.youtube.com/embed/AAtRaoSNAaI"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "20px" }}
          width="100%" 
          height="100%"
        />
      </VideoContainer>
    )
}

export default IntroVideo;