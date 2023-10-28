import React, {useEffect, useState} from 'react'
import Reorder from "react-reorder";
import {
    Layout,
    Row,
    Col,
} from "antd";
import styled from "styled-components";
import Spinner from "@/components/Spinner";
import FileIcon from "@/img/FileIcon.svg";
import {useRouter} from "next/router";
import BinIcon from "@/img/tools/binIcon.svg";
import SortAsc from "@/img/tools/sasc.svg";
import SortDesc from "@/img/tools/sdesc.svg";
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
import BottomNavigation from '@/components/tools/ToolCommon';
import ToolsHero from '@/components/tools/ToolsHero';
import NavbarExt from '@/components/tools/ToolBarExt'; 
import Footer from '@/components/Footer';
import Waitlist from '@/components/tools/ToolsWaitlist';
import DocUpload from '@/components/tools/DocUploadNoFunc';
import Modal from '@/components/tools/ToolModal';


const ReUpload = styled.div`
  font-family: var(--font-satoshi);
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
  font-family: var(--font-satoshi);
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
const UpgradeButtonx = styled(UpgradeButton)`
  margin-bottom: 50px;
`;
const ContentLayout = styled(Layout)`
  min-height: 100vh;
  font-family: var(--font-satoshi);
  background: #fff;
  padding: 10px 1%;
  @media (min-width: 992px) {
    margin-left: 362px;
  }
  @media (max-width: 900px) {
    padding: 0px 40px;
  }
  @media (max-width: 576px) {
    padding: 0px 0px;
  }
`;
const PageTitleContainer = styled.div`
  width: 100%;
  padding: 50px;
  margin-bottom: 10px;

  h1 {
    color: #141718;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -1.6px;
  }

  div {
    color: #475467;
    font-family: var(--font-satoshi);;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: -0.252px;
  }

  .ant-alert-info {
    border: 1px solid #d0d5dd;
    background: #fcfcfd;
    margin-top: 40px;

    .ant-alert-message,
    .ant-alert-description {
      color: #344054;
      line-height: normal;
      font-size: 14px;
    }
  }

  @media (max-width: 576px) {
    flex-direction: row-reverse;
    padding: 20px;

    .ant-alert-info {
      margin-top: 0px;
    }

    .ant-alert-description {
      font-size: 14px;
    }

    h1 {
      text-align: flex-start;
      width: 90%;
      font-size: 18px;
      margin-bottom: 25px;
    }
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  background: #050505;
  padding-inline: 30px;
  padding-block: 30px;

  position: sticky;
  top: 0;
  z-index: 100;

  button {
    border: none;
    background: none;
    cursor: pointer;

    svg {
      display: block;
    }
  }

  p {
    color: #fff;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    margin-left: 22px;
  }

  a {
    margin-left: auto;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid #ffffff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

    color: #ffffff;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;
const ToolsRow = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  @media (max-width: 992px) {
    display: block;
  }
`;
const ToolsCol = styled.div`
  width: calc(33.33% - 24px);
  border-radius: 32px;
  border: 1px solid rgba(47, 43, 67, 0.10);
  background: #FFF;
  padding: 48px;
  cursor: pointer;

  div {
    color: #2F2B43;
    font-family: var(--font-satoshi);;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p:last-child {
    color: rgba(47, 43, 67, 0.60);
    font-family: var(--font-satoshi);;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }

  svg {
    margin-bottom: 20px;
  }

  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 14px;
    padding: 19.7px;
    border-radius: 26.28px;

    div {
      font-size: 16.425px;
    }

    p:last-child {
      font-size: 13.14px;
    }

    svg {
      width: 52px;
      margin-bottom: 19px;
    }
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
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: -0.8px;
  }

  p {
    color: #8a91a8;
    font-size: 14px;
    font-family: var(--font-satoshi);
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
    font-family: var(--font-satoshi);;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
  }

  div:last-child {
    color: #027A48;
    font-family: var(--font-satoshi);;
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
const UploadItemContainerFile = styled(UploadItemContainer)`
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  margin-bottom: 20px;
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
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #344054 !important;
  }
`;
 const PDFRows = styled(Reorder)`
   width: 100%;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 12px;

   .startDrg {
     border: 1px dashed rgba(237, 176, 26, 0.60);
     box-shadow: 2px 2px 11px 0px rgba(0, 0, 0, 0.09);
   }

   @media screen and (max-width: 900px) {
     grid-template-columns: repeat(1, 1fr);
     margin-bottom: 30px;
   }
 `;
const PDFPage = styled.div`
  width: 100%;
  border-radius: 10.488px;
  background: #F8F8F8;
  display: flex;
  padding: 20px 0;

  img {
    width: 85%;
    box-shadow: 0px 0px 4px 4px rgba(192, 192, 192, 0.15);
  }

  .space {
    width: 15%;
    display: flex;
    justify-content: center;
    text-align: center;
    background: #F4F4F4;

    svg {
      width: 35px;
      transform: scale(0.8);
    }
  }

  .space-flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`;
const CounterIcon = styled.div`
  transform: scale(0.8);
  display: flex;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background: #070707;
  color: #EDB01A;
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;
const OptionRows = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  @media screen and (max-width: 900px) {

  }
`;
const OptionRowsx = styled(OptionRows)`
  gap: 50px;
  margin-bottom: 0px;
  @media screen and (max-width: 900px) {
    gap: 10px;
  }
`;
const FeatureButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div:first-child {
    width: 36px;
    height: 36px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    margin-bottom: 5px;
    border-radius: 8px;
  }

  @media screen and (max-width: 900px) {
    justify-content: flex-start;
    div:first-child {
      width: 35px;
      height: 35px;
      border-radius: 3px;

      svg {
        width: 18px;
      }
    }

    div:last-child {
      font-size: 0.7em;
    }
  }
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 10px;

  .mob-only {
    display: none;
  }

  .grow {
    transform: scale(1.2);
    margin-left: 5px;
  }

  @media screen and (max-width: 900px) {
    button {
      font-size: 0.8em;
      width: 60px;
      padding: 5px;
    }

    .mob-only {
      display: inline;
    }

    span {
      display: none;
    }

    .grow {
      transform: scale(1.5);
      margin-left: 6px;
    }
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
let resetKey = 1;
const ToolsMerge = () => {
    const [mainfileData, setFileData] = useState();
    const [done, setDone] = useState("");
    const [processing, setProcessing] = useState(false);
    const [fileInfo, setFileInfo] = useState({name: "", size: 0, url: ""});
    const [pdfPages, setPages] = useState<Object[]>([]);
    const [refreshCount, setRefreshCount] = useState(0);
    const [isDoneModal, setisDoneModal] = useState(false);
    const navigate = useRouter();


    let scale = 1;
    const docParts = async (file: any) => {
        if (file) {
            setProcessing(true);
            setFileInfo({name: file.name, size: file.size, url: ""});
            const reader = new FileReader();
            reader.onload = async function (event: any) {
                let fileData = event.target.result;
                let pages: any = [], heights: any = [], width = 0, height = 0, currentPage = 1;
                PDFJS.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js` // due to CORS

                let createdPage = pdfPages;

                async function draw() {
                    let canvas: any = document.createElement('canvas'), ctx = canvas.getContext('2d');
                    canvas.width = width;
                    canvas.height = height;
                    ctx.putImageData(pages[0], 0, heights[0]);
                    const pageData = {
                        index: createdPage.length,
                        canvas: canvas,
                        data: fileData
                    }
                    createdPage.push(pageData);
                    setPages(createdPage);
                    setDone("PAGES");
                    setProcessing(false);
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
                                height = canvas.height;
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

    const joinParts = async () => {
        setProcessing(true);
        const newPDF = await PDFDocument.create();
        for (const element of pdfPages as any) {
            const opdf = await PDFDocument.load(element.data);
            const pages = await newPDF.copyPages(opdf, opdf.getPageIndices());
            pages.forEach((page) => newPDF.addPage(page));
        }
        const pdfBytes = await newPDF.save();
        const pdfBlob = new Blob([pdfBytes], {type: 'application/pdf'});

        const urlb = URL.createObjectURL(pdfBlob);
        console.log(urlb);
        setFileInfo({
            name: "merged_documents.pdf",
            size: pdfBlob.size,
            url: urlb,
        })
        setProcessing(false);
        setisDoneModal(true);
        //setDone("DONE");
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
    const getChangedPos = (event: any, currentPos: any, newPos: any, from: any, to: any) => {
        console.log(currentPos, newPos);
        const currentData = pdfPages;
        const movedItem = currentData.splice(currentPos, 1)[0];
        currentData.splice(newPos, 0, movedItem);
        setPages(currentData);
        setRefreshCount(refreshCount + 1);
    };
    const viewPages = (pages: any = []) => {
        let allpages: any = [];
        pages.forEach((element: any, index: any) => {
            allpages.push(<PDFPage key={index}><img src={element.canvas.toDataURL()} alt=''/>
                <div className='space'>
                    <div className='space-flex'>
                        <BinIcon onClick={() => {
                            const updatedPages = pdfPages.slice(0, index).concat(pdfPages.slice(index + 1));
                            setPages(updatedPages);
                        }}/>
                        <CounterIcon>{element.index + 1}</CounterIcon>
                    </div>
                </div>
            </PDFPage>)
        });
        return (<div>
            <PDFRows reorderId="my-list" onReorder={getChangedPos} draggedClassName="startDrg" key={refreshCount}>
               {allpages}
            </PDFRows>
        </div>);
    }

    const title = <Trans>PDF Merger</Trans>;
    const desc = <Trans>With smart, automated merging, your PDFs are unified seamlessly into a single, cohesive document
        while
        maintaining quality and formatting.</Trans>;
    const tab = <Trans>Back to tools</Trans>;
    const [isdone, setdone] = useState<true|false>(false);
useEffect(()=>{
if(isdone==false){
  if(mainfileData!=null ){
    docParts(mainfileData);
    setdone(true);
  }
}
},[mainfileData,docParts,isdone,setdone])

    return (
        <PageContainer style={{background: "#f9f9fa"}}>
            <NavbarExt/>
            <ToolsHero title={title} tab={tab} desc={desc}/>


            <Padding>
                <UploadSection>

                    {done === "" ?
                        (<div>
                            <DocUpload
                                allowUploadModeSwitch={false}
                                onUpload={async (data) => {
                                    setFileData(data.file.originFileObj);
                                    //setProcessing(true);
                                    
                                }}
                                onError={(error) => {
                                 
                                  
                                }}
                                onRemoved={() => {
                                    setFileData(undefined);
                                }}
                            />

                                         <div style={{width:"100%",padding:"30px",display:"flex",justifyContent:"center"}}>
                                           <Spinner type="primary" style={{
                                            display: processing ? 'inline' : 'none',
                                            height: "10px",
                                            marginLeft: '20px',
                                            transform: 'scale(2.5)'
                                        }}/>
                                        </div>

                            
                        </div>) : (done === "PAGES" ? (
                            <div>
                                <OptionRows>
                                    <div>
                                        <OptionRowsx>
                                            <FeatureButton onClick={() => {
                                                const clonedPdfPages = [...pdfPages];
                                                clonedPdfPages.sort((a: any, b: any) => a.index - b.index);
                                                setPages(clonedPdfPages);
                                            }}>
                                                <div><SortAsc/></div>
                                                <div>Sort Asc</div>
                                            </FeatureButton>
                                            <FeatureButton onClick={() => {
                                                const clonedPdfPages = [...pdfPages];
                                                clonedPdfPages.sort((a: any, b: any) => b.index - a.index);
                                                setPages(clonedPdfPages);
                                            }}>
                                                <div><SortDesc/></div>
                                                <div>Sort Desc</div>
                                            </FeatureButton>


                                        </OptionRowsx>
                                    </div>
                                    <ButtonRow>

                                        <UpgradeButton onClick={() => {
                                            joinParts();
                                        }}>Save</UpgradeButton>
                                    </ButtonRow>
                                </OptionRows>
                                <DocUpload key={resetKey}
                                           allowUploadModeSwitch={false}
                                           onUpload={(data) => {
                                               setFileData(data.file.originFileObj);
                                               docParts(data.file.originFileObj);
                                               resetKey += 1;
                                           }}
                                           onError={(error) => {
                                           }}
                                           onRemoved={() => {
                                               setFileData(undefined);
                                           }}
                                />
                                <br/>

                                {viewPages(pdfPages)}

                               
                            </div>
                        ) : (
                            <div>
                                <DoneText>
                                    <div><Trans>Done</Trans></div>
                                    <div><Trans>Your PDF is ready</Trans></div>

                                </DoneText>
                                <UploadItemContainerFile>
                                    <UploadInfoContainer>
                                        <Image src={FileIcon} alt=""/>
                                        <UploadInfo>
                                            <div>
                                                <p style={{fontWeight: 700}}>{fileInfo.name}</p>
                                                <p>
                                                    {(Number(fileInfo.size) / 1000000).toFixed(3)}
                                                    MB
                                                </p>

                                            </div>
                                        </UploadInfo>
                                    </UploadInfoContainer>
                                </UploadItemContainerFile>
                                <UpgradeButtonx onClick={() => downloadFile(fileInfo.url, fileInfo.name)}>Download
                                    PDF <Spinner type="primary" style={{
                                        display: processing ? 'inline' : 'none',
                                        height: "10px",
                                        marginLeft: '20px',
                                        transform: 'scale(2.5)'
                                    }}/></UpgradeButtonx>


                                <UploadButtonSect>
                                    <Rowx style={{gap: '20px'}}>
                                        <ReUpload onClick={() => {
                                            setDone("");
                                            setFileData(undefined);
                                            setPages([]);
                                        }}> <Trans>Merge Another</Trans></ReUpload>
                                    </Rowx>
                                </UploadButtonSect>
                                <br/>
                            </div>
                        ))
                    }
                </UploadSection>


            </Padding>
            <BottomNavigation/>
            <Waitlist/>
            <Footer/>
            <Modal buttonText={"Download to files"} content={"PDF Successfully Merged!"} click={()=>{
              
              downloadFile(fileInfo.url, fileInfo.name);
              setisDoneModal(false);
              setDone("");
              setFileData(undefined);
              setPages([]);
              }} show={isDoneModal}  />
        </PageContainer>
    );
}

export default ToolsMerge;