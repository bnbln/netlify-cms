import React from 'react'
import PropTypes from 'prop-types'
import { DeckPageTemplate } from '../../templates/deck-page'

const DeckPostPreview = ({ entry, widgetFor }) => (
  <div style={{
    backgroundColor: "black"
  }}>
  <DeckPageTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    image={entry.getIn(['data', 'image'])}
    arkana={entry.getIn(['data', 'arkana'])}
    title={entry.getIn(['data', 'title'])}
    id={entry.getIn(['data', 'id'])}
    
   
    >{console.log(entry.getIn(['data', 'id']))}</DeckPageTemplate>

  </div>
)

DeckPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default DeckPostPreview
