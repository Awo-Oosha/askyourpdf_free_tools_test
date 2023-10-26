import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShareIcon from "@/img/Share.svg?url";
import CopyIcon from "@/img/web-copy.svg?url";
import WebIcon from "@/img/web-wide.svg?url";
import FileIcon from "@/img/FileTypeIcon.svg?url";
import LeftIcon from "@/img/arrow-left.svg?url";
import RightIcon from "@/img/arrow-right.svg?url";
import ShareWhiteIcon from "@/img/ShareWhite.svg?url";
import SaveIcon from "@/img/SaveIcon.svg?url";
import CheckboxIcon from "@/img/Checkbox.svg?url";
import Image from "next/image";
import { Input, Checkbox } from "antd";
import { useMedia } from "react-use";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { SourceSubmitButton } from "../source-content";
import ToolsExport from "@/components/Modals/ExportSourceTools";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import CopyToClipboard from "react-copy-to-clipboard";
import Link from "next/link";
import { alerts } from "@/utils/alerts";
import { Trans, t } from "@lingui/macro";
import { referenceBibTeXData } from "@/utils/utils";
const { TextArea } = Input;
const SourceContainer = styled.div`
  width: 95%;
  .ant-pagination-next {
    float: right;
  }
  .ant-pagination-prev {
    float: left;
  }
  .ant-pagination-options {
    display: none !important;
  }
  a {
    text-decoration: none;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #344054 !important;
    border-color: #344054 !important;
    border-radius: 50% !important;
    outline: none !important;
  }
  .ant-checkbox .ant-checkbox-inner {
    border-radius: 50% !important;
    outline: none !important;
  }
  .black {
    border-radius: 12px;
    border: 1px solid #101828;
    background: #101828;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    p {
      color: #fff;
    }
  }
  h2 {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
  }
  h1 {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    padding-bottom: 12px;
  }
  h4 {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    padding-top: 34px;
    padding-bottom: 24px;
    @media (max-width: 576px) {
      font-size: 18px;
    }
  }
`;
const SourceContent = styled.div`
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  padding: 12px 14px;
  background: #f9fafb;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  p {
    color: #344054;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
  }
  sup {
    color: #a87d12;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  }
`;
const Results = styled.div`
  margin-top: 32px;
  width: 100%;
  .result {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
    }

    h2 {
      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px;
      @media (max-width: 576px) {
        padding-bottom: 16px;
      }
    }
    span {
      color: #a87d12;
    }
  }
`;
const ExportButton = styled.div`
  border-radius: 12px;
  border: 1px solid #d0d5dd;
  background: #fff;
  padding: 10px 18px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    color: #344054;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    padding-left: 8px;
  }
`;
const SourceList = styled.div`
  width: 100%;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #f9fafb;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 16px;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const SourceListContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 50%;
  @media (max-width: 576px) {
    width: 100%;
  }
  .check-button {
    margin-right: 16px;
  }
  .type {
    display: flex;
    align-items: center;
    p {
      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
    }
    img {
      padding-right: 8px;
    }
  }

  h2 {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    padding: 12px 0px;
  }
  .citation {
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    h3 {
      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
    }
    span {
      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      padding-left: 8px;
    }
  }
`;
const SourceListButton = styled.div`
  width: auto;
  @media (max-width: 576px) {
    margin-left: 32px;
  }
  img {
    cursor: pointer;
  }
`;
const SourceExportButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  @media (max-width: 576px) {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  p {
    color: #344054;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    padding-left: 8px;
  }
`;
const SourcePagination = styled.div`
  text-align: center;
  margin-top: 40px;
  border-top: 1px solid #eaecf0;
  width: 100%;
  padding-top: 20px;
  ul {
    width: 100%;
  }
  .arrow {
    display: flex;
    align-items: center;
    p {
      color: #475467;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
    }
    .prev {
      padding-left: 8px;
    }
    .next {
      padding-right: 8px;
    }
  }
`;
const CancelButton = styled.button`
  border-radius: 12px;
  border: 1px solid #d0d5dd;
  background: #ffffff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #344054;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
  margin-right: 14px;
  @media (max-width: 576px) {
    margin-left: 14px;
    margin-right: 0px;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox + span {
    color: #344054;
    text-align: center;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    padding-top: 5px;
  }
`;
interface Source {
  handleResearchChange: (event: CheckboxChangeEvent) => void;
  paper_code: string;
  title: string;
  url: string;
  authors: string[];
  bibtex: string;
  citation_count: number;
  publication_year: number;
  fields_of_study: string[];
}
type props = {
  sources: Source[];
  startNewSearch: () => void;
  citedText: string;
};
export const SourceResult = ({ sources, startNewSearch, citedText }: props) => {
  const isSmallScreen = useMedia("(max-width: 576px)", true);
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (!isSmallScreen) {
      if (type === "prev") {
        return (
          <div className="arrow">
            <Image src={LeftIcon} alt="arrow" />
            <p className="prev">Previous</p>
          </div>
        );
      }
      if (type === "next") {
        return (
          <div className="arrow">
            <p className="next">Next</p>
            <Image src={RightIcon} alt="arrow" />
          </div>
        );
      }
    }
    return originalElement;
  };
  useEffect(() => {
    setCheckedList(sources.map((source) => source.paper_code));
  }, [sources]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportAll, setExportAll] = useState(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [exportBibTeXArray, setexportBibTeXArray] = useState([]);
  const handleCheckChange = (id: string) => {
    setCheckedList((prevCheckedList) =>
      prevCheckedList.includes(id)
        ? prevCheckedList.filter((item) => item !== id)
        : [...prevCheckedList, id]
    );
  };
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const paginatedData = sources.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const updateBibTeXArray = () => {
    const newBibTeXArray: any = checkedList
      .map((id) => {
        const matchingObject = sources.find((item) => item.paper_code === id);
        return matchingObject ? matchingObject.bibtex : null;
      })
      .filter((bibtex) => bibtex !== null);
    setexportBibTeXArray(newBibTeXArray);
  };
  return (
    <SourceContainer>
      <h1>
        <Trans>Content</Trans>
      </h1>
      <SourceContent>
        <p
          dangerouslySetInnerHTML={{ __html: citedText.replace(/\n/g, "<br>") }}
        />
      </SourceContent>
      <Results>
        <div className="result">
          <h2>
            <span>{sources.length}</span> <Trans>Sources found</Trans>
          </h2>
          {!exportAll && (
            <ExportButton
              onClick={() => {
                console.log(checkedList, "checkedList");
                setExportAll(true);
              }}
            >
              <Image src={ShareIcon} alt="Upload" />
              <p>
                <Trans>Export all</Trans>
              </p>
            </ExportButton>
          )}
        </div>
        {exportAll && (
          <SourceExportButton>
            <Image src={CheckboxIcon} alt="select" />
            <p>
              <Trans>Select all</Trans>
            </p>
          </SourceExportButton>
        )}
      </Results>
      {paginatedData.map((source) => (
        <SourceList key={source.paper_code}>
          <SourceListContent>
            {exportAll && (
              <div className="check-button">
                <StyledCheckbox
                  checked={checkedList.includes(source.paper_code)}
                  onChange={() => handleCheckChange(source.paper_code)}
                />
              </div>
            )}

            <div className="source-content">
              <div className="type">
                <p>{source.fields_of_study.join(", ")}</p>
              </div>
              <h2>{source.title}</h2>
              <div className="citation">
                <h3>
                  <Trans>Cited by:</Trans>
                </h3>
                <span>{source.citation_count}</span>
              </div>
              {source.authors.length > 0 && (
                <div className="citation">
                  <h3>
                    <Trans>Authors:</Trans>
                  </h3>
                  <span>{source.authors.join(", ")}</span>
                </div>
              )}
              <div className="citation">
                <h3>
                  <Trans>Publication Year:</Trans>
                </h3>
                <span>{source.publication_year}</span>
              </div>
            </div>
          </SourceListContent>
          <SourceListButton>
            {/* {isSmallScreen && <Image src={SaveIcon} alt="save" />} */}
            <CopyToClipboard
              text={referenceBibTeXData(source.bibtex)}
              onCopy={() => {
                alerts.success(t`Copied`, t`Source copied`);
              }}
            >
              <Image src={CopyIcon} style={{ marginLeft: "12px" }} alt="copy" />
            </CopyToClipboard>
            <Link href={source.url} target="_blank">
              <Image src={WebIcon} style={{ marginLeft: "12px" }} alt="web" />
            </Link>
          </SourceListButton>
        </SourceList>
      ))}
      {exportAll && (
        <SourceExportButton>
          <CancelButton
            disabled={false}
            onClick={() => {
              setExportAll(false);
            }}
          >
            <Trans>Cancel</Trans>
          </CancelButton>
          <ExportButton
            className="black"
            onClick={() => {
              updateBibTeXArray();
              setShowExportModal(true);
            }}
          >
            <Image src={ShareWhiteIcon} alt="Upload" />
            <p>
              <Trans>Export As</Trans> ({checkedList.length})
            </p>
          </ExportButton>
        </SourceExportButton>
      )}
      <SourcePagination>
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={sources.length}
          itemRender={itemRender}
          style={{ display: "inline-block" }}
          current={currentPage}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </SourcePagination>
      <h4>
        <Trans>Not satisfied with your results?</Trans>
      </h4>
      <SourceSubmitButton
        disabled={false}
        onClick={() => {
          startNewSearch();
        }}
      >
        <Trans>Begin new search</Trans>
      </SourceSubmitButton>
      <ToolsExport
        open={showExportModal}
        exportData={exportBibTeXArray}
        setOpen={setShowExportModal}
      />
    </SourceContainer>
  );
};
