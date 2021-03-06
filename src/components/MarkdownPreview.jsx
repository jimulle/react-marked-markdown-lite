import React from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

export default class MarkdownPreview extends React.Component {
  constructor(props) {
    super(props);

    let options = {};
    if (this.props.markedOptions) {
      options = this.props.markedOptions;
    }

    options = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      langPrefix: ' ',
      ...options,
    };

    marked.setOptions(options);
  }
  render() {
    const { value, className } = this.props;
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => (
      `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
    );
    const html = marked(value || '', { renderer });

    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={className}
      />
    );
  }
}

MarkdownPreview.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  markedOptions: PropTypes.object,
};

MarkdownPreview.defaultProps = {
  value: '',
};
