import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import Carousel from 'react-bootstrap/Carousel'
import Image from './Image'

const Featured = () => {
  const data = useStaticQuery(query)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(null)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
    setDirection(e.direction)
  }

  return (
    <div className={`mb-1`}>
      <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} controls={false} interval={`4000`}>
        {data.allMdx.edges.map(({ node }) => {
          const title = node.frontmatter.title
          const description = node.frontmatter.description
          const website = node.frontmatter.permalink
          return (
            <Carousel.Item>
              <Link to={website}>
                <Image filename={`bg_02.jpg`} />
                <Carousel.Caption>
                  <h3>{title}</h3>
                  <span>{description}</span> Learn more 
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}
export default Featured

const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___weight], order: DESC }, filter: { frontmatter: { sticky: { eq: "true" } } }, limit: 4) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            alt
            website
            icon
            weight
            layout
            description
            keywords
            permalink
            sticky
          }
        }
      }
    }
  }
`
