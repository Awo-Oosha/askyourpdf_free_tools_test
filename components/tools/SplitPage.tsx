import React, {useState} from 'react'
import {
    Layout,
    Row,
    Col,
} from "antd";
import styled from "styled-components";
import {Trans, t} from "@lingui/macro";
import Spinner from "@/components/Spinner";
import FileIcon from "@/img/FileIcon.svg?url";
import {useRouter} from "next/router";
import {ArrowDown, Gear} from "@phosphor-icons/react/dist/ssr";
import BinIcon from "@/img/tools/binIcon.svg";
import SortAsc from "@/img/tools/sasc.svg";
import SortDesc from "@/img/tools/sdesc.svg";
import SAll from "@/img/tools/sall.svg";
import ResetIcon from "@/img/tools/reset.svg";
import {PDFDocument} from 'pdf-lib'
import type {MenuProps} from 'antd';
import {Dropdown} from 'antd';
import * as PDFJS from "pdfjs-dist";
import Image from "next/image";
import {PageContainer} from "@/styles/styles";
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
  width: 100%;
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
    font-family: var(--font-satoshi);
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
    font-family: var(--font-satoshi);
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p:last-child {
    color: rgba(47, 43, 67, 0.60);
    font-family: var(--font-satoshi);
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
const PDFRows = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
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
const WhiteBody = styled.div`
  border-radius: 18px;
  border: 1px solid rgba(47, 43, 67, 0.10);
  background: #FFF;
  padding: 70px 80px;
  @media screen and (max-width: 900px) {
    padding: 30px 30px;
  }
`;
export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
      description : PAGE_DESCRIPTION[path.home],
      canonicalUrl: `${MAIN_APP_URL}/`,
    },
  };
};
const ToolsSplit = () => {
    const [mainfileData, setFileData] = useState();
    const [done, setDone] = useState("");
    const [processing, setProcessing] = useState(false);
    const [fileInfo, setFileInfo] = useState({name: "", size: ""});
    const [pdfPages, setPages] = useState([]);
    const [OriginalPages, setOriginalPages] = useState([]);
    const [dowloadLinks, setDownload] = useState<Object[]>([]);
    const [csetting, setConfig] = useState(1);
    const navigate = useRouter();

    let scale = 1;
    const docParts = async (file: any) => {
        if (file) {
            setProcessing(true);
            setFileInfo({name: file.name, size: file.size});
            const reader = new FileReader();
            reader.onload = async function (event: any) {
                let fileData = event.target.result;
                let pages: any = [], heights: any = [], width = 0, height = 0, currentPage = 1;
                PDFJS.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js` // due to CORS

                let createdPage: any = [];

                async function draw() {

                    for (let i = 0; i < pages.length; i++) {
                        let canvas: any = document.createElement('canvas'), ctx = canvas.getContext('2d');
                        canvas.width = width;
                        canvas.height = height;
                        ctx.putImageData(pages[i], 0, heights[0]);
                        const pageData = {
                            index: i,
                            canvas: canvas
                        }
                        createdPage.push(pageData);
                    }
                    setPages(createdPage);
                    setOriginalPages(createdPage);
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
                    console.log(e)
                });
            }
            reader.readAsArrayBuffer(file);
        }


    }

    function splitArrayIntoParts(array: any, n: any) {
        const result = [];
        for (let i = 0; i < array.length; i += n) {
            const segment = array.slice(i, i + n).map((item: any) => item['index']);
            result.push(segment);
        }
        return result;
    }

    const startSplit = async (pdfdata: any, config: any) => {
        const reader = new FileReader();
        reader.onload = async function (event: any) {
            const fileData = event.target.result;
            const pdfDocInit = await PDFDocument.load(fileData);
            let conf = [];
            conf = splitArrayIntoParts(pdfPages, config);
            console.log(conf);
            for (const element of conf as any[]) {
                await splitPage(pdfDocInit, element);
            }
            console.log("links", dowloadLinks);
            setDone("DONE");
        }
        reader.readAsArrayBuffer(pdfdata);
    }
    const splitPage = async (pdfDocInit: any, pageindexes: any[]) => {
        console.log("allindex", pageindexes);
        const newPDF = await PDFDocument.create()
        for (const pageindex of pageindexes) {
            console.log("index", pageindex);
            const pageInit = pdfDocInit.getPages()[pageindex];
            const newPages = newPDF.addPage();
            const {width, height} = pageInit.getSize();
            newPages.setSize(width, height);
            const [embeddedPage] = await newPDF.embedPdf(pdfDocInit, [pageindex]);
            try {
                newPages.drawPage(embeddedPage);

            } catch (e) {
                console.log(e);
            }
        }
        const pdfBytes = await newPDF.save();
        const pdfBlob = new Blob([pdfBytes], {type: 'application/pdf'});

        const urlb = URL.createObjectURL(pdfBlob);

        const newData = dowloadLinks;
        const rw = {
            url: urlb,
            name: fileInfo.name.replaceAll('.pdf', ('-' + (pageindexes.length < 2 ? (Number(pageindexes[0]) + 1) : (Number(pageindexes[0]) + 1) + '-' + (Number(pageindexes[pageindexes.length - 1]) + 1))) + '.pdf'),
            size: pdfBlob.size
        }
        newData.push(rw);
        setDownload(newData);

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

    const viewPages = (pages: any = []) => {
        let allpages: any = [];
        pages.forEach((element: any, index: any) => {
            allpages.push(<PDFPage key={index}><img src={element.canvas.toDataURL()} alt=''/>
                <div className='space'>
                    <div className='space-flex'>
                        <BinIcon onClick={() => {
                            const updatedPages = pdfPages.slice(0, index).concat(pdfPages.slice(index + 1));
                            setPages(updatedPages);
                            console.log(updatedPages);
                        }}/>
                        <CounterIcon>{element.index + 1}</CounterIcon>
                    </div>
                </div>
            </PDFPage>)
        });
        return (<div>
            <PDFRows>
                {allpages}
            </PDFRows>
        </div>);
    }

    const files = () => {
        const all: any = [];
        dowloadLinks.forEach((fileInfo: any, index: any) => {
            all.push(
                <div key={index}>
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
                    <UpgradeButtonx onClick={() => downloadFile(fileInfo.url, fileInfo.name)}>Download PDF <Spinner
                        type="primary" style={{
                        display: processing ? 'inline' : 'none',
                        height: "10px",
                        marginLeft: '20px',
                        transform: 'scale(2.5)'
                    }}/></UpgradeButtonx>
                </div>
            );
        })
        return all;
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Split Selected Pages',

        },
        {
            key: '2',
            type: 'divider',

        },
        {
            key: '3',
            label: 'Split PDF into equal parts',

        },
        {
            key: '4',
            type: 'divider',

        },
        {
            key: '5',
            label: 'Split PDF every few pages',
            children: [
                {
                    key: '5-1',
                    label: 'Every Page',
                },
                {
                    key: '5-2',
                    label: 'Every 2 Pages',
                },
                {
                    key: '5-3',
                    label: 'Every 3 Pages',
                },
            ],
        },
    ];
    const onClick: MenuProps['onClick'] = ({key}) => {
        // message.info(`Click on item ${key}`);
        //csetting
        switch (key) {
            case '1':
                setConfig(1);
                break;
            case '3':
                setConfig(Math.floor(pdfPages.length / 2));
                break;
            case '5-1':
                setConfig(1);
                break;
            case '5-2':
                setConfig(2);
                break;
            case '5-3':
                setConfig(3);
                break;
        }
    };

    const title = <Trans>PDF Splitter</Trans>;
    const desc = <Trans>Let artificial intelligence do the work as it swiftly divides your PDF documents into separate
        files, saving you time and
        streamlining your document management tasks.</Trans>;
    const tab = <Trans>Back to tools</Trans>;
    return (
        <div>
            <PageContainer style={{background: "#f9f9fa"}}>
                <NavbarExt/>
                <ToolsHero title={title} tab={tab} desc={desc}/>


                <Padding>
                    <UploadSection>

                        {done === "" ?
                            (<div>
                                <DocUpload
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
                                                docParts(mainfileData);
                                            }}>
                                                <Trans>Split PDF</Trans> <Spinner type="primary" style={{
                                                display: processing ? 'inline' : 'none',
                                                height: "10px",
                                                marginLeft: '20px',
                                                transform: 'scale(2.5)'
                                            }}/></UpgradeButton>
                                        </Col>
                                    </Rowx>
                                </UploadButtonSect>
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
                                                <FeatureButton onClick={() => {
                                                    startSplit(mainfileData, 1);
                                                }}>
                                                    <div><SAll/></div>
                                                    <div>Split All</div>
                                                </FeatureButton>
                                                <FeatureButton onClick={() => {
                                                    setPages(OriginalPages);
                                                }}>
                                                    <div><ResetIcon/></div>
                                                    <div>Reset</div>
                                                </FeatureButton>
                                            </OptionRowsx>
                                        </div>
                                        <ButtonRow>

                                            <Dropdown menu={{items, onClick}}>

                                                <UpgradeButton style={{
                                                    background: "white",
                                                    color: "black",
                                                    border: "2px solid black"
                                                }}><Gear className='mob-only grow'/> <span>SETTINGS</span> <ArrowDown
                                                    className='grow'/></UpgradeButton>

                                            </Dropdown>

                                            <UpgradeButton onClick={() => {
                                                startSplit(mainfileData, csetting);
                                            }}>Save</UpgradeButton>
                                        </ButtonRow>
                                    </OptionRows>
                                    {viewPages(pdfPages)}

                                </div>
                            ) : (
                                <div>
                                    <WhiteBody>
                                        <DoneText>
                                            <div><Trans>Done</Trans></div>
                                            <div><Trans>Your PDFs are ready</Trans></div>
                                        </DoneText>
                                        {files()}

                                        <UploadButtonSect>
                                            <Rowx style={{gap: '20px'}}>
                                                <ReUpload onClick={() => {
                                                    setDone("");
                                                    setFileData(undefined);
                                                    setPages([]);
                                                    setOriginalPages([]);
                                                    setDownload([]);
                                                    setConfig(1);
                                                }}><Trans>Split Another</Trans></ReUpload>
                                            </Rowx>
                                        </UploadButtonSect>
                                        <br/>
                                    </WhiteBody>
                                </div>
                            ))
                        }
                    </UploadSection>


                </Padding>
                <BottomNavigation/>
                <Waitlist/>
                <Footer/>
            </PageContainer>
        </div>

    );
}

export default ToolsSplit;