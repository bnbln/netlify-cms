import React, { useState } from 'react'
import { useSprings, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import {
  graphql,
  StaticQuery
} from "gatsby";
import PropTypes from "prop-types"
// const gatsbycards = props
// console.log(gatsbycards)

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s * 0.8})`

const DeckAnimation = (myprops) => {
  
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, set] = useSprings(myprops.data.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    set(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    if (!down && gone.size === myprops.data.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
  })

  return (
    <div style={{
      height: "590px",
      width: "100%",
      position: "relative"
    }}>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} className="deckAnimationContainer" style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
          {myprops.data[i].node.frontmatter.image ?
            <animated.div {...bind(i)} onClick={() => console.log("ok")} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${myprops.data[i].node.frontmatter.image.childImageSharp.fluid.src})` }} />
            : null}
        </animated.div>
      ))}
    </div>
  )
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
}

export default props => (
  <StaticQuery
    query={graphql`
      query SpringQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "deck-page"}}}, sort: {fields: frontmatter___id, order: ASC}, limit: 10) {
            edges {
              node {
                frontmatter {
                  title
                  id
                  color
                  image {
                      childImageSharp {
                        fluid(maxWidth: 250, quality: 35) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                }
                fields {
                  slug
                }
              }
            }
          }
        }
    `}
    render={data => <DeckAnimation data={data.allMarkdownRemark.edges} />}
  />
)
DeckAnimation.propTypes = {
  data: PropTypes.array.isRequired,
}