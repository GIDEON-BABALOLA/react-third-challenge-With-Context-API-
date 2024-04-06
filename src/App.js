import Layout from "./Layout.js";
import Home from "./Home.js";
import NewPost from "./NewPost.js";
import EditPost from "./EditPost.js";
import PostPage from "./PostPage.js";
import Missing from "./Missing.js";
import About from "./About.js";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext.js";
function App() {
  //In React, Always Call Hooks At The Top Level
  //Don't call Hooks inside loops, conditions, or nested functions.
  //Call Hooks from React function components
  //You can call hooks from custom hooks, such has calling hooks inside useEffect, and you can call hooks like useEffect also in your own created hooks
  //To find a list of react hooks check nikgraf.github.io/react-hooks

  
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //       if (response && response.data) setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         //Not in the 200 range
  //         console.log(err.response.data.message);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error ${err.message}`);
  //       }
  //       //Axios automatically catches an error when the status code is not in the 200 range of http responses.
  //     }
  //   };
  //   fetchPosts();
  // }, []);
  return (
    <DataProvider>
        <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<Home />} />
        <Route path="post">
          <Route index element={<NewPost />}/>
          <Route path=":id" element={<PostPage/>}/>
        </Route>
        <Route path="edit/:id" element={ <EditPost />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    </DataProvider>
  );
}

export default App;
