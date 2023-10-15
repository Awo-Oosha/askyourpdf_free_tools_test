import styled from "styled-components"
import { Trans } from "@lingui/macro"
import bookCloud from "../../img/extension-page-icons/book-cloud.png"
import dropBox from "../../img/extension-page-icons/dropbox.png"
import googleDrive from "../../img/extension-page-icons/googleDrive.png"
import pdf from "../../img/extension-page-icons/pdf.png"
import Image from "next/image"

const MethodSection = styled.section`
margin-top: 1rem;
  h1 {
    text-align: center;
    font-family: var(--font-eudoxus);
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: 44px; /* 112.5% */
    letter-spacing: -0.96px;

    span {
      color: #EDB01A;
    }
  }

  @media (min-width: 576px) {
    margin-top: 2.5rem;
    h1 {
      text-align: center;
      font-family: var(--font-eudoxus);
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 54px; /* 112.5% */
      letter-spacing: -0.96px;
    }
  }

`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 576px) {
    margin-top: 1rem;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`

const Card = styled.div`
  padding: 24px;
  border-radius: 32px;
  border: 1px solid var(--alpha-black-10, rgba(47, 43, 67, 0.10));
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  .image_container {
    margin-bottom: 24px;
    .img {
      width: 68px;
      height: 35px;
      object-fit: contain;
    }
  }
  .heading {
    
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; /* 140% */
    letter-spacing: -0.28px;
    font-family: var(--font-satoshi);
    margin-bottom: 14px;
  }

  .body {
    color: rgba(47, 43, 67, 0.60);
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.16px;
  }

  @media (min-width: 576px) {
    margin-top: 0.75rem;
    padding: 48px;
    margin-right: 24px;
    min-height: 350px;
    
    .image_container {
      margin-bottom: 24px;
      .img {
        width: 68px;
        height: 68px;
        object-fit: contain;
      }
    }
  }

    .heading {
      font-size: 28px;
      line-height: 32px;
      letter-spacing: -0.448px;
      margin-bottom: 16px;
      width: 288px;
    }
    .body {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: -0.16px;
      width: 288px;
}
`

const Methods = () => {
  return (
    <MethodSection>
      <h1>
        <Trans>
          Experience a new way to engage with your <br/> 
          <span>
            documents 
          </span>
        </Trans>
      </h1>
      <Body>
        <Card>
          <div className="image_container">
            <Image src={pdf} alt="pdf" className='img'/>
          </div>
          <div className="heading">
            <Trans>PDF and Other Document Formats</Trans>
          </div>
          <div className="body">
            <Trans>
              AskYourPDF Chrome extension lets you seamlessly have intelligent conversations with your PDF documents. Whether you're working together with others or making notes for yourself, the extension makes it quick and straightforward to extract valuable information, all without leaving the comfort of your browser.
            </Trans>
          </div>
        </Card>

        <Card>
          <div className="image_container">
            <Image src={googleDrive} alt="googledrive" className='img'/>
          </div>
          <div className="heading">
            <Trans>
              Google Drive Links
            </Trans>
          </div>
          <div className="body">
           <Trans>
              If you use Google Drive, the AskYourPDF Chrome extension is perfect for you. Just open a PDF from your Google Drive in Chrome, and the extension starts up on its own. It gives you the flexibility to engage with the document, get summaries, ask questions and receive answers in a flash.
           </Trans>
          </div>
        </Card>

        <Card>
          <div className="image_container">
            <Image src={dropBox} alt="dropbox" className='img'/>
          </div>
          <div className="heading">
            <Trans> Dropbox links </Trans>
          </div>
          <div className="body">
            <Trans>
              For those who rely on Dropbox for their document storage, the AskYourPDF Chrome extension is a really helpful addition. Open any PDF link from Dropbox in Chrome, and the extension starts up, ready to help. With its intuitive interface, you can now work with your Dropbox documents more easily, making it a must-have tool for professionals and students alike.
            </Trans>
          </div>
        </Card>

      </Body>

    </MethodSection>
  )
}

export default Methods