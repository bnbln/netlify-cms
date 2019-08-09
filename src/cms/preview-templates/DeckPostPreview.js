import React from 'react'
import PropTypes from 'prop-types'
import { DeckPageTemplate } from '../../templates/deck-page'
import Layout from "../../components/Layout"

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

   
    >{console.log(entry.getIn(['data', 'natural']))}</DeckPageTemplate>

  </div>
)

DeckPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default DeckPostPreview
