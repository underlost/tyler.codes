import React from 'react'
import PropTypes from 'prop-types'
import { faLink, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LinkButton = props => (
  <li className={`d-block mb-2`}>
    <a className={`btn btn-primary btn-block text-left`} title={props.alt} href={props.website} rel="noopener noreferrer" target="_blank">
      <span>
        <FontAwesomeIcon icon={faLink} fixedWidth />
      </span>
      {` `}
      {props.title}
    </a>
  </li>
)

LinkButton.propTypes = {
  website: PropTypes.node.isRequired,
  layout: PropTypes.string,
  website: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
  icon: PropTypes.string,
}

export default LinkButton
