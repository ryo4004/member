import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { navigationMenuToggle } from '../../../../Actions/Navigation'

import NavigationMenuContents from '../NavigationMenuContents/NavigationMenuContents'

import WindsLogo from './logo.svg'

import './NavigationHeader.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    mobile: state.status.mobile,

    menuOpen: state.navigation.menuOpen,
    title: state.navigation.title
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigationMenuToggle () {
      dispatch(navigationMenuToggle())
    },
    // navigationMenu (open) {
    //   dispatch(navigationMenu(open))
    // }
  }
}

class NavigationHeader extends Component {

  render () {
    const { pc, mobile, menuOpen, title } = this.props
    const { navigationMenuToggle } = this.props

    // const menuContentClass = 
    // const menuBackgroundClass = 
    const showTitle = title ? <div className='title-text'><Link to='/'>{title}</Link></div> : <div className='logo'><Link to='/'><WindsLogo /></Link></div>

    // const backNavAndMenuToggle = this.state.backNavigation ? <div className='label back'><Link to={this.state.backTo}><i className='fas fa-chevron-left'></i>戻る</Link></div> : <div className='label' onClick={() => this.menuToggle()}><i className='fas fa-bars fa-lg'></i></div>
    const backNavAndMenuToggle = mobile ? <div className='label' onClick={() => navigationMenuToggle()}><i className='fas fa-bars fa-lg'></i></div> : <div></div>

    // const headerClass = ((this.state.titleBar) || (this.state.titleSearchStatus) ? 'header no-border' : 'header') + (this.state.titleFont ? ' font' : '')
    // const titleHeaderClass = 'title'
    // const searchIcon = this.state.titleSearch ? <div className={'label search' + (this.state.titleSearchStatus ? '' : ' close')} onClick={() => this.toggleSearch()}><i className="fas fa-search"></i></div> : ''
    const searchIcon = ''
    return (
      <div className='navigation-header'>
        <div className={'header' + (pc ? ' pc' : '')}>
          {/* <div className={'title'}> */}
            {showTitle}
          {/* </div> */}
          {backNavAndMenuToggle}
          {searchIcon}
        </div>
        <div className={'menu-background' + (menuOpen ? ' open' : '')} onClick={() => navigationMenuToggle()}></div>
        <div className={'menu-content' + (menuOpen ? ' open' : '')}>
          <NavigationMenuContents />
        </div>
      </div>
    )

  }
}

const CustomLink = ({ label, icon, to, activeOnlyWhenExact, onClick }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <div className={'link ' + (match ? 'active' : '')}>
          <Link to={to} onClick={() => onClick()} onTouchStart={() => {}}><div>{/* <i className={icon}></i> */}{label}</div></Link>
        </div>
      )}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationHeader)
