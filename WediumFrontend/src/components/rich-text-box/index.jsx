import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { withStyles } from '@material-ui/core/styles';

const RichTextBox = (props) => {
  const [currentTextLength, setCurrentTextLength] = useState(null);
  let reactQuillRef = useRef();
  let quillRef = useRef();
  const { classes } = props;

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
    quillRef = reactQuillRef.getEditor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const onChange = (htmlText) => {
    setCurrentTextLength(quillRef.getLength() - 1);

    if (quillRef.getText().trim() === '') {
      props.onChange('');
    } else {
      props.onChange(htmlText);
    }

    var quill = quillRef;
    quill.on('text-change', function (delta, old, source) {
      if (quill.getLength() > props.maxLength) {
        quill.deleteText(props.maxLength, quill.getLength());
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
    textAlign: 'right',
    marginTop: 3,
    marginRight: 14,
    letterSpacing: '0.03333em',
    fontWeight: 400,
    lineHeight: 1.66,
  },
  textLimitOverflow: {
    color: 'red',
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
