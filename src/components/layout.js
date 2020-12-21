/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import { connect } from "react-redux"

const Layout = ({ children, dispatch, focusedThread }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const keyPressFunc = (e) => {
    if (e.key === "ArrowRight") {
      dispatch({
        type: "SWITCH_FOCUS",
        direction: "RIGHT"
      })
    }
    if (e.key === "ArrowLeft"){
      dispatch({
        type: "SWITCH_FOCUS",
        direction: "LEFT"
      })
    }
    if (e.key === "Enter") {
      
      const button = document.getElementById(`add${focusedThread}`)
      console.log(button)
      button.click()
    }
  }


  useEffect (() => {
    const wrapper = document.getElementById("wrapper").focus()

  })

  

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
        id="wrapper"
        tabIndex="0"
        onKeyDown={keyPressFunc}
      >
        <main>{children}</main>
        <footer style={{
          marginTop: `2rem`
        }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  return {
    focusedThread: state.focusedThread,
    count: state.count,
    threads: state.threads,
  }
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default connect(mapStateToProps)(Layout)
