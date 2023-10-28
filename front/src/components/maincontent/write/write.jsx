import React, {Component} from 'react';
import "./write.styles.css";
import QuillEditor from './QuillEditor';
import { message } from 'antd';

class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tags: '',
            coverImage: '',
            content: '',
            files: [],
            author: ''
        }
    }

    //For Content
    onEditorChange = (value) => {
        this.setState({content: value});
    }
    //For all the image files
    onFilesChange = (value) => {
        this.setState({files: value});
    }
    //For Title
    onTitleChange = (e) => {
        this.setState({title: e.target.value})
    }
    onSelectChange = (e) => {
        this.setState({tags: e.target.value});
    }
    //For Cover Image
    handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];

        let formData = new FormData();
        formData.append("File", selectedFile);
        fetch('http://localhost:2000/uploadimage', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(resp => {
            if (resp.success) {
                this.setState({files: [...this.state.files, selectedFile]})

                const imageSrc = "http://localhost:2000/" + resp.url;
                const imageAlt = resp.fileName;
                const imageStyles = {
                    margin: '0',
                    borderRadius: '25px 0 0 25px',
                    maxWidth: '650px',
                    maxHeight: '450px',
                    width: '650px', 
                    height: '450px',
                  };
                
                  // Create the HTML string with the inline styles
                  const imgHtml = `<img src="${imageSrc}" style="margin: ${imageStyles.margin}; border-radius: ${imageStyles.borderRadius}; max-width: ${imageStyles.maxWidth}; max-height: ${imageStyles.maxHeight}; width: ${imageStyles.width}; height: ${imageStyles.height};" alt="${imageAlt}">`;
                // Create an HTML string with the <img> tag
                // const imgHtml = `<img src="${imageSrc}" style="{{maxWidth: '650px', maxHeight: '450px', width: '100%', height: '100%'}}" alt="${imageAlt}">`;

                this.setState({coverImage: imgHtml});
            } 
            else {
                return alert('failed to upload file');
            }
        })
    }

    loadingWriter = () => {
        const {writer} = this.props;
        if (writer) {
            this.setState({ author: writer }, () => {
            console.log(this.state.author);
            });
        }
    }
    //For Submit
    handleSubmitBlog = (e) => {
        e.preventDefault();

        const { writer } = this.props;
        const formData = new FormData();

        formData.append('title', this.state.title);
        formData.append('coverImage', this.state.coverImage);
        formData.append('content', this.state.content);
        formData.append('tags', this.state.tags);

        if (writer && writer.username) {
          this.setState({ author: writer.username }, () => {

            formData.append('author', this.state.author);
            
            fetch('http://localhost:2000/blogs', {
                method: 'POST',
                body: formData,
            })
            .then(res => res.json())
            .then(resp => {
                if (resp) {
                    message.success('Post created');
                    setTimeout(() => {
                        this.props.onRouteChange('/home');
                    }, 1000)
                }
                else {
                    alert('failed to upload');
                }   
            })

          });
        }
    }

    render() {
        return (
            <div className="write-god">
                {this.loadingWriter}
                <div className = "write"> 
                <h1><strong>Add a New Blog</strong></h1>
                <form onSubmit={this.handleSubmitBlog}>
                    <label>Title: </label>

                    <input 
                        type ="text"
                        placeholder ="Title"
                        onChange= {(e)=> this.onTitleChange(e)}
                        required
                    />

                    <label>Tags: </label>
                    <select className="tags-select" onChange={(e) => this.onSelectChange(e)}>
                        <option value="notselected">--Select--</option>
                        <option value="Food">Food</option>
                        <option value="City">City</option>
                        <option value="NightLife">NightLife</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Cafe">Cafe</option>
                        <option value="School">School</option>
                        <option value="Nature">Nature</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                        <option value="Historical">Historical</option>
                    </select>


                    <label>Cover Image: </label>
                    <input
                        type="file" 
                        accept="image/*" 
                        onChange={this.handleImageUpload}
                        required
                    />

                    {/*I realized that if I wanna use the image converting thingy in the QuillEditor then I gotta put the props in the component of QuillEditor which kinda sucks */}

                    <label>Body: </label>
                    <QuillEditor
                        placeholder={"Start posting something"}
                        onEditorChange={this.onEditorChange} //For Text
                        onFilesChange = {this.onFilesChange} //For Image
                    />
                    
                    <button
                        htmltype ="submit"
                        onSubmit={this.handleSubmitBlog}
                        >Add</button>
                    </form>

                    </div>
            </div>
            

        );
    }
}

export default Write;