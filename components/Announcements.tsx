import React, { RefObject, useState, useEffect } from "react";
import styled from "styled-components";
import { X } from "@phosphor-icons/react/dist/ssr";
import {path} from '@/routes'
import { msg } from '@lingui/macro';
import { MessageDescriptor } from "@/types/localization";
import {useLingui} from "@lingui/react";


export const AnnouncementData: {
  message1: MessageDescriptor;
  message2: any;
  linkTest: any;
  link: string;
 }[] = [
  {
    message1: msg`You can now chat with multiple documents at once. Using our knowledge Base.`,
    message2: " ",
    linkTest: msg`Try it out now`,
    link: path.knowledgeBase,
  },
  {
    message1: msg`You can now generate detailed summaries of your documents.`,
    message2: " ",
    linkTest: msg`Try it out now`,
    link: path.summarise,
  },
  {
    message1: msg`We just launched our Browser extension.`,
    message2: msg`it to access AskYourPDF from anywhere.`,
    linkTest: msg`Download`,
    link: `https://chrome.google.com/webstore/detail/askyourpdf/gaieenaffioioljpcocdkpphlifbhaig`,
  }
]
interface WrapperProps {
    $isvisible: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  display: ${(props) => (props.$isvisible ? "table" : "none")};
`;
const Banner = styled.div`
  width: 100%;
  height: 46px;
  text-align: center;
  font-size: 14px;
  display: table-cell;
  vertical-align: middle;
  background-color: #edb01a;
  color: #000000;
  position: relative;

  a {
    position: relative;
    display: inline-block;
    text-decoration: none;
    color: #000000 !important;
    font-weight: 700;
    // margin-left: 8px;
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 1.5px;
    background-color: #000;
  }

  @media (max-width: 768px) {
    padding-block: 10px;
    padding-inline: 20px;
    line-height: 1.8;

    a::after {
      bottom: 2px !important;
    }
  }
`;

function Announcements({
  announcementRef,
}: {
  announcementRef?: RefObject<any>;
}) {

  const {i18n} = useLingui();
  const [bannerVisible, setBannerVisible] = useState(true);
  const [randomAnnouncementIndex, setRandomAnnouncementIndex] = useState(0);

  useEffect(() => {
    const getRandomAnnouncement = () => {
      const randomIndex = Math.floor(Math.random() * AnnouncementData.length);
      setRandomAnnouncementIndex(randomIndex);
    };

    getRandomAnnouncement();
  }, []);

  const randomAnnouncement = AnnouncementData[randomAnnouncementIndex];
  
  const handleIconClick = () => {
    setBannerVisible(false);
  };

  return (
    <Wrapper ref={announcementRef} $isvisible={bannerVisible}>
      <Banner>
        {i18n._(randomAnnouncement.message1)}{" "}
        <a
          href={randomAnnouncement.link}
          target="_blank"
        >
          {i18n._(randomAnnouncement.linkTest)}
        </a>{" "}
        { i18n._(randomAnnouncement.message2) }
        <X
          size={15}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
          onClick={handleIconClick}
        />
      </Banner>
    </Wrapper>
  );
}

export default Announcements;
