import React from 'react'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LinkButton extends React.Component {
  constructor(props) {
    super(props)
    this.title = props.title
    this.alt = props.alt
    this.website = props.website
    this.icon = props.icon
  }
  render() {
    return (
      <li className={`d-block mb-2`}>
        <a className={`btn btn-primary btn-block text-left`} title={this.alt} href={this.website} rel="noopener noreferrer" target="_blank">
          <span>
            <FontAwesomeIcon icon={faLink} fixedWidth />
          </span>
          {` `}
          {this.title}
        </a>
      </li>
    )
  }
}

export default LinkButton
