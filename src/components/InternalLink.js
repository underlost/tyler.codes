import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { faLink, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InternalLinkButton = props => (
  <li className={`d-block mb-2`}>
    <Link className={`btn btn-primary btn-block text-left`} to={props.website}>
      <span>
        <FontAwesomeIcon icon={faLink} fixedWidth />
      </span>
      {` `}
      {props.title}
    </Link>
  </li>
)

InternalLinkButton.propTypes = {
  website: PropTypes.node.isRequired,
  layout: PropTypes.string,
  website: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
  icon: PropTypes.string,
}

export default InternalLinkButton
