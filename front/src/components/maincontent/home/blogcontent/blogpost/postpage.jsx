import React, { useEffect, useState } from 'react'
import { Typography } from 'antd';
import { useParams } from 'react-router';
const { Title } = Typography;

function Postpage () {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const identification = id;

    useEffect(() => {
        fetch('https://dry-ravine-65913-bf22e3189720.herokuapp.com/getBlogs', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: identification
            })
        })
        .then(res => res.json())
        .then(resp => {
            if (resp.success) {
                setPost(resp.blogs)
                setDataLoaded(true)
            } else {
                alert('Couldn\'t load the blogs')
            }
        })
    }, [identification])

    if (dataLoaded) {
        return (
            <div className="postPage" style={{ width: '80%', margin: '3rem auto' }}>
                {console.log(post[0])}
                <Title level={2}>{post[0].author}`s Post</Title>
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Title level={4}>{post[0].created}</Title>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post[0].content }} />

            </div>
        )
    } else {
        return (
            <div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
        )
    }
}

export default Postpage;
