import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch.js";
const DataContext = createContext({})
export const DataProvider = ( { children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSetResults] = useState([]);
    const { data, fetchError, isLoading} = useAxiosFetch("http://localhost:3000/posts")
    useEffect(() => {
  setPosts(data)
    }, [data])
    useEffect(() => {
        const filteredResults = posts.filter(
          (post) =>
            post.body.toLowerCase().includes(search.toLowerCase()) ||
            post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSetResults(filteredResults.reverse());
      }, [search, posts]);
    //children means the components that are within the data provider
    return (
        <DataContext.Provider
        value={{
        search,
        setSearch,
        searchResult,
        fetchError,
        isLoading,
        posts,
        setPosts,
        }}
        >
{children}
        </DataContext.Provider>
    )
}
export default DataContext;