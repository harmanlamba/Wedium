import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '@material-ui/core/card';
import { withStyles } from '@material-ui/core/styles';

class RichTextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTextLength: 0
        };
        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component
    }

    componentDidMount() {
        this.setState({
            currentTextLength: 0
        });
        this.attachQuillRefs()
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    onChange = () => {
        this.setState({
            currentTextLength: this.quillRef.getLength() - 1
        });
    }

    render() {
        const { classes } = this.props;
        const isOverflow = this.state.currentTextLength > this.props.maxLength;

        return (
            <div>
                <ReactQuill className={classes.quill}
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.onChange}
                    modules={RichTextBox.modules}
                    formats={RichTextBox.formats}
                />
                <div className={`${classes.textLimit} ${isOverflow ? classes.textLimitOverflow : ""}`}>
                    {this.state.currentTextLength}/{this.props.maxLength}
                </div>
            </div>
        )
    }
}

const styles = (theme) => ({
    textLimit: {
        color: 'grey',
        fontSize: 12,
        textAlign: 'right',
        marginTop: 4,
        marginRight: 16
    },
    textLimitOverflow: {
        color: 'red'
    },
    quill: {
        '& .ql-toolbar': {
            'border-top-left-radius': '0.5em',
            'border-top-right-radius': '0.5em',
            background: '#fefcfc',
        },
        '& .ql-container': {
            'border-bottom-left-radius': '0.5em',
            'border-bottom-right-radius': '0.5em',
            background: 'white',
        }
    }
});

RichTextBox.formats = [
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'link',
]

RichTextBox.modules = {}

RichTextBox.modules.toolbar = [
    ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
    ['blockquote'],                                  // blocks
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // lists
    ['clean'],                                       // remove formatting
]

export default withStyles(styles)(RichTextBox);
