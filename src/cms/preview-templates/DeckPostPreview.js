import React from 'react'
import PropTypes from 'prop-types'
import { DeckPageTemplate } from '../../templates/deck-page'
import Layout from "../../components/Layout"
import "../../components/all.sass"


const DeckPostPreview = ({ entry, widgetFor }) => (
  <div style={{
    backgroundColor: "black"
  }}>
    {console.log(widgetFor('body'))}
  <DeckPageTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    image={entry.getIn(['data', 'image'])}
    arkana={entry.getIn(['data', 'arkana'])}
    title={entry.getIn(['data', 'title'])}
      id={entry.getIn(['data', 'id'])}
      upsidedown={entry.getIn(['data', 'upsidedown'])}
      natural={entry.getIn(['data', 'natural'])}
      color={entry.getIn(['data', 'color'])}
      time={entry.getIn(['data', 'time'])}
      short={entry.getIn(['data', 'short'])}

   
    >{console.log(entry.getIn(['data', 'short']))}</DeckPageTemplate>

  </div>
)

DeckPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default DeckPostPreview