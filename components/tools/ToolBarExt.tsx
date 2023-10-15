import React, { RefObject, useEffect, useRef, useState } from "react";
import { Container } from "@/styles/styles";
import ChevronRight from "../../img/ChevronRight.svg?url";
import styled from "styled-components";
import MenuIcon from "../../img/MenuIcon.svg?url";
import CloseIcon from "../../img/CloseIcon.svg?url";
import Logo from "../../img/Logo.svg?url";
import { AUTH_FRONTEND_URL } from "@/config/config";
import { useAuth } from "@/providers/AuthProvider";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Dropdown, Radio } from "antd";
import Link from "next/link";
import Image from "next/image";
import { locales } from "@/utils/i18n";
import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";

const Header = styled.header`
  position: fixed;
  top: 21px;
  width: 100%;
  z-index: 10;

  &.isIntersecting {
    top: 71px;
    @media (min-width: 769px) {
      top: 51px;
    }
  }

  transition: top 0.1s linear;
`;

const LogoContainer = styled.div`
  path {
    fill: #ffffff;
  }

  @media (min-width: 992px) {
    path {
      fill: #edb01a;
    }
  }
`;

const NavContainer = styled(Container)`
  display: flex;
  justify-content: center;

  a,
  li,
  button {
    font-family: var(--font-satoshi);
    font-style: normal;
    font-size: 12px;
    line-height: 24px;
    cursor: pointer;
  }

  @media (min-width: 384px) {
    a,
    li,
    button {
      font-size: 14px;
    }
  }
`;

const Content = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 24px;
  background: white;
  backdrop-filter: blur(18px);
  border-radius: 16px;
  padding: 12px;

  ul {
    padding-left: 0;
    display: flex;
    gap: 24px;
    list-style: none;
    margin: 0;

    a,
    li {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.60);
      text-decoration: none;
    }
  }

  @media (min-width: 992px) {
    width: unset;
  }
`;

const NavMenu = styled.nav`
  display: none;
color:rgba(0, 0, 0, 0.60);
  @media (min-width: 992px) {
    display: block;
  }
`;

const CTA = styled.button`
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
  font-weight: 700;
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  div {
    cursor: pointer;

    @media (min-width: 992px) {
      display: none;
    }
  }
`;

const MobileMenu = styled.nav<{ $open?: boolean }>`
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  margin-inline: auto;
  background: #181818;
  width: 90%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: ${(props) => (props.$open ? "block" : "none")};

  ul {
    flex-direction: column;
    padding-block: 24px;
    padding-inline: 20px;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

const LanguageSelectorRadio = styled(Radio)`
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

const DropdownOverlay = styled.div`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

// million-ignore
const NavbarExt = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userToken, userDetails } = useAuth();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [locale, setLocale] = useState(router.locale!.split("-")[0]);

  const handleScrollToSection = (sectionId: string) => {
    // const section = document.getElementById(sectionId);
    const section = document.getElementById(sectionId) as HTMLElement;
    if (section) {
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStartedClick = () => {
    if (userDetails && userDetails.email) {
      router.push("/conversations");
    } else {
      const loginUrl = new URL(`${AUTH_FRONTEND_URL}/login`);
      loginUrl.searchParams.append("next", "/conversations");
      window.location.href = loginUrl.toString();
    }
  };

  const dropDownMenu = Object.values(locales).map((loc, index) => {
    return {
      key: `${index}`,
      label: (
        <LanguageSelectorRadio checked={locale === Object.keys(locales)[index]}>
          {loc}
        </LanguageSelectorRadio>
      ),
    };
  });

  useEffect(() => {
    router.push(router.pathname, router.pathname, { locale });
  }, [locale]);

  const headerRef = useRef<HTMLElement>(null);

  return (
    <>
      <Header
        ref={headerRef}
        className={router.pathname === "/" ? "isIntersecting" : ""}
      >
        <NavContainer>
          <Content>
            <LogoContainer>
              <Image src={Logo} width={30} height={30} alt="logo" />
            </LogoContainer>
            <NavMenu>
              <ul>
                <li>
                  <Link href={"/"}>
                    <Trans>Home</Trans>
                  </Link>
                </li>
                <li>
                  <Link href={"/conversations"}>
                    ✨ <Trans>Conversations</Trans>
                  </Link>
                </li>
                <li onClick={() => handleScrollToSection("Plans")}>
                  <p>
                    <Trans>Pricing</Trans>
                  </p>
                </li>
                <li>
                  <Link href={"/extension"}>
                    <Trans>Extension</Trans>
                  </Link>
                </li>
                <li onClick={() => handleScrollToSection("App-Section")}>
                  <p>
                    <Trans>Download</Trans>
                  </p>
                </li>
                <li>
                  <Link href={"/api-pricing"}>
                    <Trans>API</Trans>
                  </Link>
                </li>
              </ul>
            </NavMenu>
            <MobileMenu $open={menuOpen}>
              <ul>
                <li>
                  <Link href={"/"}>
                    <Trans>Home</Trans>
                  </Link>
                </li>
                <li>
                  <Link href={"/conversations"}>
                    ✨ <Trans>Conversations</Trans>
                  </Link>
                </li>
                <li onClick={() => handleScrollToSection("Plans")}>
                  <p>
                    <Trans>Pricing</Trans>
                  </p>
                </li>
                <li>
                  <Link href={"/extension"}>
                    <Trans>Extension</Trans>
                  </Link>
                </li>
                <li onClick={() => handleScrollToSection("App-Section")}>
                  <p>
                    <Trans>Download</Trans>
                  </p>
                </li>
                <li>
                  <Link href={"/api-pricing"}>
                    <Trans>API</Trans>
                  </Link>
                </li>
              </ul>
            </MobileMenu>
            <Actions>
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
                    const chosenLocale = Object.keys(locales)[parsedKey];
                    setLocale(chosenLocale);
                    setDropdownOpen(false);
                  },
                }}
              >
                <CTA>
                  {locale.toUpperCase()} <ArrowDown size={16} />
                </CTA>
              </Dropdown>
              <CTA onClick={handleGetStartedClick}>
                <Trans>Start For Free</Trans>{" "}
                <Image
                  src={ChevronRight}
                  alt="chevron"
                  width={16}
                  height={12}
                />
              </CTA>
              <div
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
              >
                {menuOpen ? (
                  <Image src={CloseIcon} alt="close" width={24} height={24} />
                ) : (
                  <Image src={MenuIcon} alt="menu" width={24} height={24} />
                )}
              </div>
            </Actions>
          </Content>
        </NavContainer>
      </Header>
      {dropdownOpen && <DropdownOverlay />}
    </>
  );
}

export default NavbarExt;
