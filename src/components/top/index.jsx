import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import { ThemeSwitch } from '../theme-switch'

import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {!isRoot ? (
        <Link to={`/`} className="link">
          {title}
        </Link>
      ) : <div className="link">unh6uoj</div>}
      <div className="top-right">
        <Link to={'/about'}>
          <span>About</span>
        </Link>
      <ThemeSwitch />
      </div>
      {/* <GitHubIcon /> */}
    </div>
  )
}
