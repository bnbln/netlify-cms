import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import DeckPostPreview from './preview-templates/DeckPostPreview'

import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import React from 'react';

import YouTube from 'react-youtube';


CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

// CMS.registerPreviewStyle(styles)
CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('deck', DeckPostPreview)

CMS.registerEditorComponent({
  // Internal id of the component
  id: "youtube",
  // Visible label
  label: "YouTube",
  // Fields the user need to fill out when adding an instance of the component
  fields: [{ name: 'id', label: 'YouTube Video ID', widget: 'string' }],
  // Pattern to identify a block as being an instance of this component
  pattern: /^youtube (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    return {
      id: match[1]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {    
    return 'youtube ' + obj.id;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj) {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    console.log(<YouTube
        videoId={obj.id}
        opts={opts}
        // onReady={this._onReady}
      />);
    
    return (
      '<img src="http://img.youtube.com/vi/' + obj.id + '/maxresdefault.jpg" alt="Youtube Video"/>'

    );
  }
});