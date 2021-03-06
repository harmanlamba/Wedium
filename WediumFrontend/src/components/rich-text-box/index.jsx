import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { withStyles } from '@material-ui/core/styles';

const RichTextBox = (props) => {
  const [currentTextLength, setCurrentTextLength] = useState(null);

  let reactQuillRef = useRef();
  let quillRef = useRef();
  const { classes } = props;

  // On load, set the initial max text length
  useEffect(() => {
    props.quotedText
      ? setCurrentTextLength(props.quotedText.length)
      : setCurrentTextLength(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof reactQuillRef.getEditor !== 'function') {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    quillRef = reactQuillRef.getEditor();

    // On post of comment/reply/create post, empty text editor
    if (props.isEmptyNow) {
      quillRef.setContents([{ insert: '\n' }]);
      props.setIsEmptyNow(!props.isEmptyNow);
    }

    // On quoting article, add highlighted text to text editor
    if (props.isHighlighted) {
      quillRef.setContents([{ insert: '\n' }]);
      quillRef.insertText(0, `${props.quotedText}\n`, 'blockquote', true);
      props.handleIsHighlighted(false);
    }
  });

  const onChange = (htmlText) => {
    setCurrentTextLength(quillRef.getLength() - 1);

    if (quillRef.getText().trim() === '') {
      props.onChange('');
    } else {
      props.onChange(htmlText);
    }

    // If current text editor content reaches maximum length - cut next characters typed
    quillRef.on('text-change', function (delta, old, source) {
      if (quillRef.getLength() > props.maxLength) {
        quillRef.deleteText(props.maxLength, quillRef.getLength());
      }
    });
  };

  return (
    <div>
      <ReactQuill
        className={classes.quill}
        ref={(el) => {
          reactQuillRef = el;
        }}
        theme={'snow'}
        onChange={onChange}
        modules={RichTextBox.modules}
        formats={RichTextBox.formats}
        defaultValue={
          props.quotedText ? `<blockquote>${props.quotedText}</blockquote>` : ''
        }
        placeholder={props.placeholder}
      />
      <div
        className={`${classes.textLimit} ${
          currentTextLength >= props.maxLength ? classes.textLimitOverflow : ''
        }`}
      >
        {currentTextLength}/{props.maxLength}
      </div>
    </div>
  );
};

const styles = (theme) => ({
  textLimit: {
    color: 'grey',
    fontSize: '0.75rem',
    marginTop: 3,
    marginRight: 14,
    letterSpacing: '0.03333em',
    fontWeight: 400,
    lineHeight: 1.66,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
  textLimitOverflow: {
    color: '#3b49df',
  },
  quill: {
    '& .ql-toolbar': {
      'border-top-left-radius': 4,
      'border-top-right-radius': 4,
      background: '#fefcfc',
    },
    '& .ql-container': {
      'border-bottom-left-radius': 4,
      'border-bottom-right-radius': 4,
      background: 'white',
      'min-height': 80,
      font: 'inherit',
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      fontSize: 15,
    },
  },
});

RichTextBox.formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
];

RichTextBox.modules = {};

RichTextBox.modules.toolbar = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote'], // blocks
  [{ list: 'ordered' }, { list: 'bullet' }], // lists
  ['clean'], // remove formatting
];

export default withStyles(styles)(RichTextBox);
