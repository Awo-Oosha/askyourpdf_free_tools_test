import {useState} from 'react'
import {Row, Col} from "antd";
import styled from "styled-components";
import Spinner from "@/components/Spinner";
import FileIcon from "@/img/FileIcon.svg?url";
import Tesseract from 'tesseract.js';
import {PDFDocument} from 'pdf-lib'
import * as PDFJS from "pdfjs-dist";
import Image from "next/image";
import {PageContainer} from "@/styles/styles";
import {Trans, t} from "@lingui/macro";
import dynamic from "next/dynamic";
import type { NextPage, GetStaticProps } from "next";
import { PAGE_DESCRIPTION, path } from '@/routes';
import { loadCatalog } from "@/utils/i18n";
import { MAIN_APP_URL } from '@/config/config';


const BottomNavigation = dynamic(() => import('@/components/tools/ToolCommon'), {
  ssr: false,
}); 
const ToolsHero = dynamic(() => import('@/components/tools/ToolsHero'), {
  ssr: false,
}); 
const NavbarExt = dynamic(() => import('@/components/tools/ToolBarExt'), {
    ssr: false,
});
const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: false,
});
const Waitlist = dynamic(() => import('@/components/tools/ToolsWaitlist'), {
    ssr: false,
});
const DocUpload = dynamic(() => import('@/components/tools/DocUploadNoFunc'), {
    ssr: false,
});
const Modal = dynamic(() => import('@/components/tools/ToolModal'), {
    ssr: false,
});


const ReUpload = styled.div`
  font-family:: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: black;
  cursor: pointer;
  @media (max-width: 992px) {
    width: 100%;
    padding-top: 5px;
    text-align: center;
  }
`;
const UpgradeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10%;
  right: 20px;
  background: #000000;
  padding: 16px 24px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  border: 1px solid var(--black, #000);
  color: #fff;
  cursor: pointer;
  margin-bottom: 7px;
  font-family:: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  @media (max-width: 900px) {
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    height: 40px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Padding = styled.div`
  padding: 0px 20px;
  background: transparent;
  position: relative;
  top: -160px;
  margin-bottom: -160px;
  z-index: 2;
  @media screen and (max-width: 900px) {
    top: 0px;
    margin-bottom: 0px;
  }
`;
const UploadSection = styled.section`
  h2,
  p {
    margin: 0;
  }

  h2 {
    color: #141718;
    font-size: 20px;
    font-family:: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: -0.8px;
  }

  p {
    color: #8a91a8;
    font-size: 14px;
    font-family:: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.28px;
  }

  @media (min-width: 992px) {
    padding-top: 26px;
    padding-inline: 200px;
    display: block;
  }
`;
const UploadButtonSect = styled.div`
  margin-top: 59px;
  @media screen and (max-width: 900px) {
    margin-top: 34px;
    margin-bottom: 30px;
  }
`;
const Rowx = styled(Row)`
  align-items: center;
  @media screen and (max-width: 900px) {
    display: block;
  }

  .mobileSpace:first-child {
    margin-bottom: 24px;
  }
`;
const DoneText = styled.div`
  margin-bottom: 32px;


  div:first-child {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
  }

  div:last-child {
    color: #027A48;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
`;
const UploadItemContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  margin-bottom: 70px;
`;

const UploadInfoContainer = styled.div`
  display: flex;
  gap: 4px;
  border-radius: 8px;
  padding: 16px;
`;

const UploadInfo = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr auto;

  p {
    margin: 0;
    font-family:: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #344054 !important;
  }
`;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
      description : PAGE_DESCRIPTION[path.tools],
      canonicalUrl: `${MAIN_APP_URL}/`,
    },
  };
};
const ToolsOCR = () => {
    const [mainfileData, setFileData] = useState();
    const [done, setDone] = useState("");
    const [processing, setProcessing] = useState(false);
    const [fileInfo, setFileInfo] = useState({name: "", size: ""});
    const [isDoneModal, setisDoneModal] = useState(false);
    const [keyRef, setKeyRef] = useState(1);

    let scale = 2.5;
    const generateOCR = async (file: any) => {
        if (file) {
            setProcessing(true);
            setFileInfo({name: file.name, size: file.size});
            const reader = new FileReader();
            reader.onload = async function (event: any) {
                let fileData = event.target.result;
                let pages: any = [], heights: any = [], width = 0, height = 0, currentPage = 1;
                PDFJS.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js` // due to CORS
                async function draw() {
                    const pdfDocInit = await PDFDocument.load(fileData);
                    for (let i = 0; i < pages.length; i++) {
                        let canvas: any = document.createElement('canvas'), ctx = canvas.getContext('2d');
                        canvas.width = width;
                        canvas.height = height;
                        ctx.putImageData(pages[i], 0, heights[0]);
                        const tdata = await Tesseract.recognize(canvas, 'eng');

                        await toPDF(tdata.data, fileData, pdfDocInit, i, canvas);
                    }
                    const pdfBytes = await pdfDocInit.save();
                    const pdfBlob = new Blob([pdfBytes], {type: 'application/pdf'});
                    setDone(URL.createObjectURL(pdfBlob));
                    setProcessing(false);
                    setisDoneModal(true);
                }

                const thisdoc = PDFJS.getDocument({data: fileData.slice(0)});
                thisdoc.promise.then(function (pdf: any) {
                    getPage();

                    function getPage() {
                        pdf.getPage(currentPage).then(function (page: any) {
                            let viewport = page.getViewport({scale});
                            let canvas: any = document.createElement('canvas'), ctx = canvas.getContext('2d');
                            let renderContext: any = {canvasContext: ctx, viewport: viewport};

                            canvas.height = viewport.height;
                            canvas.width = viewport.width;


                            const mypage = page.render(renderContext)
                            mypage.promise.then(async function () {
                                pages.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
                                heights.push(height);
                                height += canvas.height;
                                if (width < canvas.width) width = canvas.width;

                                if (currentPage < pdf.numPages) {
                                    currentPage++;
                                    getPage();
                                } else {
                                    draw();
                                }
                            });
                        });
                    }
                }).catch((e: any) => {
                });
            }
            reader.readAsArrayBuffer(file);
        }


    }
    const toPDF = async (data: any, pdf: any, pdfDocInit: any, pageindex: any, ctx: any) => {
        const pageInit = pdfDocInit.getPages()[pageindex];
        const {width, height} = pageInit.getSize();

        const boxes = data.words;

        for (const box of boxes) {

            try {
                const fontSize = (box.font_size / scale);
                pageInit.drawText(box.text, {
                    x: box.bbox.x0 / scale,
                    y: (height) - (box.bbox.y0 / scale) - (scale * scale),
                    size: fontSize,
                    opacity: 0
                });

            } catch (e) {
            }
        }


    }
    const downloadFile = (url: any, fileName: any) => {
        setProcessing(true);
        const aElement = document.createElement('a');
        aElement.setAttribute('download', fileName);
        const href = url;
        aElement.href = href;
        // aElement.setAttribute('href', href);
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
        setProcessing(false);

    };

    const title = <Trans>OCR PDF Reader</Trans>;
    const desc = <Trans>Transform scanned or image-based PDFs into editable and searchable text with our AI
        powered OCR PDF Reader.</Trans>;
    const tab = <Trans>Back to tools</Trans>;

    return (
        <PageContainer style={{background: "#f9f9fa"}}>
            <NavbarExt/>
            <ToolsHero title={title} tab={tab} desc={desc}/>


            <Padding>
                <UploadSection>
                            <div>
                            <DocUpload key={keyRef}
                                allowUploadModeSwitch={false}
                                onUpload={(data) => {
                                    setFileData(data.file.originFileObj);
                                }}
                                onError={(error) => {
                                }}
                                onRemoved={() => {
                                    setFileData(undefined);
                                }}
                            />


                            <UploadButtonSect>
                                <Rowx style={{justifyContent: 'center'}}>

                                    <Col>
                                        <UpgradeButton disabled={!mainfileData} onClick={() => {
                                            if (processing) return;
                                            generateOCR(mainfileData);
                                        }}>
                                            <Trans>Read OCR PDF</Trans> <Spinner type="primary" style={{
                                            display: processing ? 'inline' : 'none',
                                            height: "10px",
                                            marginLeft: '20px',
                                            transform: 'scale(2.5)'
                                        }}/></UpgradeButton>
                                    </Col>
                                </Rowx>
                            </UploadButtonSect>
                        </div>
                </UploadSection>


            </Padding>
            <BottomNavigation/>
            <Waitlist/>
            <Footer/>
            <Modal content={"Read successful!"} 
            buttonText = {"Download OCR PDF"}
            click={()=>{
              
              downloadFile(done, fileInfo.name);
              setisDoneModal(false);
              setDone("");
              setKeyRef(keyRef+1);
              }} show={isDoneModal}  />
        </PageContainer>
    );
}

export default ToolsOCR;