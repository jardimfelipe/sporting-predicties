import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useAppContext } from "../../Context"

import api from "@config/api"

import { Layout, Image, Select, Menu } from "antd"
import MobileMenu from "./mobile-menu.component"
import menuItems from "./menu-data"

import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useWindowSize } from "@hooks"

const { Header: AntdHeader } = Layout
const { Option } = Select

const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

const LanguageSelect = styled(Select)`
  &:focus,
  &:active {
    border: none;
  }
  width: 60px;
  margin-left: 15px;
  background-color: transparent;
  .ant-select-selector {
    height: 50px !important;
    border: none !important;
    background-color: transparent !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    .ant-select-selection-item {
      line-height: 0;
    }
  }
  .ant-select-arrow {
    right: 0;
    color: #fff;
  }
`

const HeaderMenu = styled(Menu)`
  box-sizing: border-box;
  li {
    box-sizing: border-box;
    border-bottom: 5px solid transparent !important;
    span {
      position: relative;
      top: 5px;
    }
    &:hover {
      box-sizing: border-box;
      background-color: transparent !important;
      border-bottom: 5px solid #1da57a !important;
    }
    &.ant-menu-item-selected {
      background-color: transparent !important;
      border-bottom: 5px solid #1da57a !important;
    }
  }
`

export const Header = () => {
  const { setLastUpdate } = useAppContext()
  const history = useHistory()
  const { t, i18n } = useTranslation()
  const [currentMenuItem, setCurrentMenuItem] = useState<string>("")
  const { width } = useWindowSize()

  const handleChange = (value: any) => {
    i18n.changeLanguage(value)
  }

  const handleClick = (newPath: string) => {
    const defaultMenu = menuItems.findIndex(({ path }) => path === newPath)
    setCurrentMenuItem(defaultMenu.toString())
    history.push(newPath)
  }

  useEffect(() => {
    const defaultMenu = menuItems.findIndex(
      ({ path }) => path === history.location.pathname
    )
    setCurrentMenuItem(defaultMenu.toString())
  }, [history.location.pathname])

  useEffect(() => {
    ;(async () => {
      const {
        data: { information },
      } = await api.get("/information")
      setLastUpdate({
        en: information.en.date_last_update,
        pt: information.pt.date_last_update,
      })
    })()
  }, [setLastUpdate])
  return (
    <AntdHeader
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        borderBottom: "5px solid",
        position: "fixed",
        width: "100%",
        zIndex: 1000,
      }}
    >
      {width && width >= breakpoints.lg ? (
        <HeaderMenu
          selectedKeys={[currentMenuItem]}
          theme="dark"
          mode="horizontal"
        >
          {menuItems.map((menu, index) => {
            return (
              <Menu.Item
                onClick={() => handleClick(menu.path)}
                key={index}
                icon={<menu.icon />}
              >
                {t(menu.title)}
              </Menu.Item>
            )
          })}
        </HeaderMenu>
      ) : (
        <MobileMenu />
      )}
      <LanguageSelect defaultValue={"en"} onChange={handleChange}>
        <Option value="pt">
          <Image
            preview={false}
            width={"100%"}
            src="https://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg"
          />
        </Option>
        <Option value="en">
          <Image
            preview={false}
            width={"100%"}
            src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
          />
        </Option>
      </LanguageSelect>
    </AntdHeader>
  )
}
