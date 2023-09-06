import React,{useState} from "react";
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { ADD_TO_CART, REMOVE_FROM_CART } from "./context/action/actionType";
import {Routes,Route} from 'react-router'
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Main/>}/>
        <Route path="cart" element={<Cart/>}/> 
      </Routes>
    </div>
  );
}

const Main = () => {
  const [data,setData] = useState([])
  const [loading,setLoading ] = useState(false)
  const [currentPage,setCurrentPage] = useState(1)
  const [postPerPage] = useState(20)

  React.useEffect(()=> {
   const dataFetch = async()  => {
    setLoading(true)
    await axios.get('https://dummyjson.com/products')
    .then(res =>{
      setData(res.data.products)
      setLoading(false)
    })
    .catch(err => console.log(err))
   }
   dataFetch()
  },[])


  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return(
    <div>
        <h1 className=''>Products</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </div>
  )
}

const Posts = ({ posts, loading }) => {
  const dispatch = useDispatch()


  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='posts_container'>
      {posts.map(post => (
        <li key={post.id} className='product_box'>
          <img src={post.images[0]} alt="" />
          <button href="/" onClick={() => dispatch({ type: ADD_TO_CART, payload: post })}>Add to cart</button>
        </li>
      ))}
    </ul>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' onClick={() => paginate(number)}>
            <a  href='/' className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
};

const Cart = () => {
  const something = useSelector(w => w.cart)
  const dispatch = useDispatch()

  return(
    <div>
       <NavLink to="/">Back to Home</NavLink>
     <ul className='posts_container'>
      {something.map(post => (
        <li key={post.id} className='product_box'>
          <img src={post.images[0]} alt="" />
          <button href="/" onClick={() => dispatch({ type: REMOVE_FROM_CART, payload: post })}>remove from cart</button>
        </li>
      ))}
     
    </ul>
    </div>
  )
}

export default App;
