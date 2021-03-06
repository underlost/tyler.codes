import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { faLink, faInfoCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LinkButton = props => {
  const buttonType = props.layout
  if (buttonType == `link`) {
    var LinkButtonRendered = (
      <li className={`d-block mb-2`}>
        <a className={`btn btn-primary btn-block text-center`} title={props.alt} href={props.website} rel="noopener noreferrer" target="_blank">
          {props.title}
        </a>
      </li>
    )
  } else {
    var LinkButtonRendered = (
      <li className={`d-block mb-2`}>
        <Link className={`btn btn-primary btn-block text-center`} title={props.alt} to={props.slug}>
          {props.title}
        </Link>
      </li>
    )
  }
  return LinkButtonRendered
}

LinkButton.propTypes = {
  website: PropTypes.node.isRequired,
  layout: PropTypes.string,
  website: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
  icon: PropTypes.string,
}

export default LinkButton
