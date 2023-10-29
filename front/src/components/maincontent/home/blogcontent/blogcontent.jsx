import React, {Component} from 'react';
import './blogcontent.styles.css';
import Blogpost from './blogpost/blogpost';
import Pagination from 'react-bootstrap/Pagination';
import './custom.scss';

/*
 search button design
 dropdown menu design
 Back to Top design
*/
class Blogcontent extends Component {
    constructor() {
        super();
        this.state= {
            SearchField : '',
            FilteredBlogs: [],
            testBlogs: [],
            start: 0,
            end: 9,
            Pages : [0,1,2,3,4,5,6,7,8,9],
            CurrentPage : 0,
            searchOption: 'username',
            identification_blog: [],
        };
    }

    componentDidMount() {
        if (this.state.identification_blog.length === 0 && !this.state.componentMounted) {
            fetch('https://dry-ravine-65913-bf22e3189720.herokuapp.com/getBlogs', {
                method: 'GET',
            })
            .then(res => res.json())
            .then(resp => {
                if (resp.success) {    
                    // Extract IDs from the response
                    const newIdentificationBlog = resp.blogs.map(i => i.id);
    
                    this.setState(prevState => ({
                        testBlogs: resp.blogs,
                        FilteredBlogs: [...resp.blogs],
                        identification_blog: newIdentificationBlog,
                        componentMounted: true, // Set componentMounted after state updates
                    }));
                } else {
                    alert('Couldn\'t load the blogs');
                }
            });
        }
    }

    onPageClick = (i,e) => { 
        e.preventDefault();
        if (this.state.end === i - 1)
        {
            this.setState({end: i, start: i-9, Pages: [i-9,i-8,i-7,i-6,i-5,i-4,i-3,i-2,i-1,i], CurrentPage: i});
            return;
            // this.setState({end: i})
            // this.setState({start: i-9})
            // this.setState({Pages: [i-9,i-8,i-7,i-6,i-5,i-4,i-3,i-2,i-1,i]});
            // this.setState({CurrentPage: i})
            // console.log("currentpage", this.state.CurrentPage);

        }
        if (this.state.start - 1 === i )
        {
            this.setState({end: i+9, start: i, Pages: [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9], CurrentPage: i})
            return;
            // this.setState({end: i+9});
            // this.setState({start: i});
            // this.setState({Pages: [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]});
            // this.setState({CurrentPage: i});
        }
        else {
            this.setState({CurrentPage: i});
        }

    }
    
    onSearchChange = (e) => {
        this.setState({SearchField: e.target.value}, ()=>{
            if (!e.target.value) {
                this.onSearchConfirmation();
            }
        });
        
    }
     
    onKeyChange = (e) => {
        if (e.code === "Enter") {
            this.onSearchConfirmation();
        }    
    }

    onSearchConfirmation = () => {
        if(!this.state.SearchField){
            this.setState({FilteredBlogs: [...this.state.testBlogs],
                CurrentPage: 0
            });
            return;
        }

        const temp_id_blog = [];

        const filteredList = this.state.testBlogs.filter(order => { 
            
            if(this.state.searchOption === "username") 
            {
                if (order.author.toLowerCase().includes(this.state.SearchField.toLowerCase()))
                {
                    temp_id_blog.push(order.id)
                    return true;
                }
            }
            else if(this.state.searchOption === "title") 
            {
                if (order.title.toLowerCase().includes(this.state.SearchField.toLowerCase()))
                {
                    temp_id_blog.push(order.id)
                    return true;
                }
            }
            return false;
        })

        this.setState({
            FilteredBlogs: filteredList,
            identification_blog: temp_id_blog,
            CurrentPage: -1
        }
        );
    }

    onDropdownChange = (e) => {
        this.setState({searchOption: e.target.value}, () => {
            this.onSearchConfirmation();
        });
    }

    render () {
    const Total_Blog_Pages = this.state.testBlogs.length % 5===0 ? this.state.testBlogs.length / 5 : Math.floor(this.state.testBlogs.length / 5) + 1;
    return (
        
        <div className="blogcontentpage">
       
            <div className="type-search">
                <div className='tired'>
                    <select className="search-select"onChange={(e) => this.onDropdownChange(e)}>
                        <option value="username">Username</option>
                        <option value="title">Blogtitle</option>
                    </select>

                    <input className="search-field" onKeyUp={(e) => {this.onKeyChange(e)}} onChange= {(e) => this.onSearchChange(e)} type="search" placeholder="Search Blogs" />
                
                </div>
                
                <button className="search-button" onClick={() => this.onSearchConfirmation()}>Search</button>
            </div>
            
            <Blogpost id ={this.state.CurrentPage} Blogs ={this.state.FilteredBlogs} identificationBlog = {this.state.identification_blog}/>   


            {this.state.CurrentPage >= 0 ? 
            <Pagination className="paginationOverall">
                <Pagination.Prev onClick={ (e) => this.onPageClick(this.state.CurrentPage === 0 ? this.state.CurrentPage : this.state.CurrentPage - 1 , e) }/>
                                
                {this.state.Pages.map((i,key) =>
                    <Pagination.Item key={key} onClick={ (e) => this.onPageClick(i, e) } active={this.state.CurrentPage === i} className="pagination">
                        {i+1}
                    </Pagination.Item>
                )}

                <Pagination.Next onClick={ (e) => this.onPageClick(this.state.CurrentPage === Total_Blog_Pages -1? this.state.CurrentPage : this.state.CurrentPage + 1 , e) }/>
            </Pagination>
            : 
            <div></div>}
      
            
        </div>
        
    )
   }

}

export default Blogcontent;