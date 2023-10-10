import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  background-color: ${props => (props.isDarkTheme ? '#424242' : '#ffffff')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#424242')};
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 8px;
  padding-bottom: 8px;
  height: 14vh;
`

export const IconsContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const WebsiteLogo = styled.img`
  width: 80px;
  align-self: center;
  @media screen and (min-width: 576px) {
    width: 110px;
  }
  @media screen and (min-width: 768px) {
    width: 165px;
  }
`

export const ThemeButton = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 20px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#0f0f0f')};
  @media screen and (min-width: 576px) {
    font-size: 30px;
  }
  @media screen and (min-width: 768px) {
    font-size: 35px;
  }
`

export const HamburgerButton = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 20px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#0f0f0f')};
  @media screen and (min-width: 576px) {
    font-size: 30px;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`
export const ProfileImageButton = styled.button`
  background-color: transparent;
  border: 0;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#0f0f0f')};
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`
export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  margin-bottom: 10px;
`

export const LogoutImageButton = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 20px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#0f0f0f')};
  @media screen and (min-width: 576px) {
    font-size: 30px;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  border-radius: 2px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  display: none;
  margin-bottom: 8px;
  cursor: pointer;
  outline: none;
  margin-left: 10px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 17px;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`
export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const CloseButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: none;
  margin-top: 32px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#0f0f0f')};
  margin-right: 40px;
  outline: none;
  cursor: pointer;
`
export const NavLinksList = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 0;
`
export const NavLinkElement = styled.li`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  border: 0;
  background-color: ${props =>
    props.isLinkActive ? '#7e858e' : 'transparent'};
  color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#313131')};
  //   color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#313131')};
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  text-align: left;
  width: 100vw;
`

export const LinkContent = styled.p`
  margin-left: 6px;
  font-size: 16px;
`
