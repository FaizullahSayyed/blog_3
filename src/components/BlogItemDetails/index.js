import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

// import {each} from 'immer/dist/internal'

// const blogData = {
//   title: 'Blog Name',
//   imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
//   avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//   author: 'Author Name',
//   content:
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
// }

class BlogItemDetails extends Component {
  constructor(props) {
    super(props)
    const {match} = props
    this.state = {blogData: {}, id: match.params.id, isLoading: true}
  }

  componentDidMount() {
    this.getBlogDetails()
  }

  getBlogDetails = async () => {
    const {id} = this.state
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      avatarUrl: data.avatar_url,
      imageUrl: data.image_url,
      title: data.title,
      content: data.content,
      author: data.author,
    }
    this.setState({blogData: updatedData, isLoading: false})
    console.log(data)
  }

  renderBlogItemDetails = () => {
    const {blogData, isLoading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData

    return isLoading ? (
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    ) : (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
