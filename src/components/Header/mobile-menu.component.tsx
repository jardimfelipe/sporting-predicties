import React, { useState, useRef, useCallback } from "react"
import styled from "styled-components"

import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import menuItems from "./menu-data"
import { useOnClickOutside } from "@hooks/useClickOutside"

type Menu = {
  isActive: boolean
}

const MenuContainer = styled.div`
  .menu {
    &__button {
      position: fixed;
      top: 30px;
      left: 50px;
      width: 26px;
      height: 26px;
      cursor: pointer;
      z-index: 1001;
      & span {
        display: block;
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #ffffff;
        transition-duration: 0.25s;
        &:before,
        &:after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: #ffffff;
          transition-duration: 0.25s;
        }
        &:before {
          top: -8px;
        }
        &:after {
          top: 8px;
        }
      }
    }
    &__box {
      display: block;
      position: fixed;
      top: 0;
      left: -100%;
      width: 200px;
      height: 100%;
      margin: 0;
      padding: 80px 0;
      list-style: none;
      background-color: #001529;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
      transition-duration: 0.25s;
      z-index: 1000;
    }
    &__item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px 30px;
      color: rgba(255, 255, 255, 0.65);
      text-decoration: none;
      transition-duration: 0.25s;
      font-size: 14px;
      box-sizing: border-box;
      &:hover {
        color: #ffffff;
        border-bottom: 5px solid #1da57a;
      }
    }
    ${({ isActive }: Menu) =>
      isActive &&
      `
        &__button {
          span {
            transform: rotate(45deg);
            &:before {
              top: 0;
              transform: rotate(0deg);
            }
            &:after {
              top: 0;
              transform: rotate(90deg);
            }
          }
        }
        &__box {
          left: 0;
        }
      `}
  }
`

const MobileMenu: React.FC = () => {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const [isActive, setIsActive] = useState<boolean>(false)

  const clickHandler = useCallback(() => isActive && setIsActive(false), [
    isActive,
  ])
  useOnClickOutside(containerRef, clickHandler)
  return (
    <MenuContainer ref={containerRef} isActive={isActive}>
      <div
        onClick={() => setIsActive((isActive) => !isActive)}
        className="menu__button"
      >
        <span />
      </div>

      <ul className="menu__box">
        {menuItems.map((item, index) => {
          return (
            <li key={`link-${index}`}>
              <Link
                onClick={() => setIsActive(false)}
                className="menu__item"
                to={{ pathname: item.path }}
              >
                <item.icon />
                {t(item.title)}
              </Link>
            </li>
          )
        })}
      </ul>
    </MenuContainer>
  )
}

export default MobileMenu
