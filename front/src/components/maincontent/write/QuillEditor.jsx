import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

let BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('src', value.src);
        node.setAttribute('alt', value.alt);
        node.setAttribute('width', '100%');
        return node;
    }

    static value(node) {
        return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
    }

}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

class QuillEditor extends React.Component {

    bandId;
    placeholder;
    onEditorChange;
    onFilesChange;
    _isMounted;

    constructor(props) {
        super(props);

        this.state = {
            editorHtml: "",
            files: [],
        };

        this.reactQuillRef = null;

        this.inputOpenImageRef = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (html) => {
        this.setState({
            editorHtml: html
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    };

    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    insertImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            let formData = new FormData();
        
            formData.append("File", file);
            fetch('http://localhost:2000/uploadfiles', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(resp => {
                    if (resp.success) {
                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();
        
                        let range = quill.getSelection();
                        let position = range ? range.index : 0;

                        // let source = `http://localhost:2000/${resp.url}`;
                        // console.log(source)
                        // console.log(resp.url)
                        // quill.insertEmbed(position, "image", {source});
                        quill.insertEmbed(position, "image", {src: "http://localhost:2000/" + resp.url, alt: resp.fileName});

                        quill.setSelection(position + 1);
        
                        if (this._isMounted) {
                            this.setState({
                                files: [...this.state.files, file]
                            }, () => {
                                this.props.onFilesChange(this.state.files);
                            });
                        }
                    } else {
                        return alert('failed to upload file');
                    }
                })
        }
    };

    render() {
        const myStyle = {
            margin: "10px 0",
            boxsizing: "border-box",
            display: "block"
        }
        return (
            <div style={myStyle}>
                <div id="toolbar">
                    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                        <option value="1" />
                        <option value="2" />
                        <option value="" />
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className="ql-insertImage">
                        <svg viewBox='0 0 18 18'>
                            <rect className="ql-stroke" height='10' width='12' x='3' y='4'></rect>
                            <circle className="ql-fill" cx="6" cy="7" r="1"></circle>
                            <polyline className="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                        </svg>
                    </button>
                    <button className="ql-link" />
                    <button className="ql-code-block" />
                    <button className="ql-video" />
                    <button className="ql-blockquote" />
                    <button className="ql-clean" />

                    

                </div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.handleChange}
                    modules={this.modules}
                    formats={this.formats}
                    value={this.state.editorHtml}
                    placeholder={this.props.placeholder}
                />
                <input type="file" accept="image/*" ref={this.inputOpenImageRef} style={{ display: "none" }} onChange={this.insertImage} />
            </div>
        )
    }

    modules = {
        toolbar: {
            container: "#toolbar",
            handlers: {
                insertImage: this.imageHandler,
            }
        },

    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'image', 'link',"code-block", "blockquote", "clean"
    ];
}

export default QuillEditor;