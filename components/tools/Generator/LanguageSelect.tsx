import React, { useState } from "react";
import Radio from "antd/es/radio/radio";
import { Dropdown, Grid } from "antd";
import styled from "styled-components";
import { ChatLocales } from "@/config/config";

const LanguageSelectorRadio = styled(Radio)`
  text-transform: Capitalize;
  .ant-radio {
    .ant-radio-inner {
      border-color: #000000;

      &::after {
        background: #edb01a;
      }
    }
  }

  .ant-radio-checked {
    .ant-radio-inner {
      background: #ffffff;
    }
  }
`;

const CTA = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  height: 40px;
  gap: 8px;
  border: none;
  padding: 3px 16px;
  font-weight: 700;
  cursor: pointer;
  background: #000;
  border-radius: 15px;
  color: #ffffff;
  font-family: var(--font-satoshi);
  @media (min-width: 1024px) {
    display: flex;
  }
`;


export default function LanguageSelect({lang} : any) {
  const [ locale, setLocale ] = useState("EN");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { useBreakpoint } = Grid;


  const dropDownMenu = Object.values(ChatLocales).map((loc, index) => {
    return {
      key: `${index}`,
      label: (
        <LanguageSelectorRadio
          checked={locale === Object.keys(ChatLocales)[index]}
        >
          {loc}
        </LanguageSelectorRadio>
      ),
    };
  });


  return (
    <>
      <Dropdown
        trigger={["click"]}
        onOpenChange={(open) => {
          setDropdownOpen(open);
        }}
        open={dropdownOpen}
        menu={{
          items: dropDownMenu,
          onClick: ({ key }) => {
            const parsedKey = Number(key);
            if (isNaN(parsedKey)) {
              setDropdownOpen(false);
              return;
            }
            const chosenLocale = Object.keys(ChatLocales)[parsedKey];
            lang(chosenLocale);
            setLocale(chosenLocale)
            setDropdownOpen(false);
          },
        }}
      >
          <CTA>
            {locale} 
          </CTA>
      </Dropdown>
    </>
  )
}