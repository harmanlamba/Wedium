import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { withStyles } from '@material-ui/core/styles';

class RichTextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTextLength: 0,
        };
        this.quillRef = null;
        this.reactQuillRef = null;
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

    onChange = (htmlText) => {
        this.setState({
            currentTextLength: this.quillRef.getLength() - 1
        });

        if (this.quillRef.getText().trim() === "") {
            this.props.onChange("");
        } else {
            this.props.onChange(htmlText);
        }
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
        fontSize: '0.75rem',
        textAlign: 'right',
        marginTop: 3,
        marginRight: 14,
        letterSpacing: '0.03333em',
        fontWeight: 400,
        lineHeight: 1.66,
    },
    textLimitOverflow: {
        color: 'red'
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
