import SearchComponent from "../components/SearchComponent";

function Search() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-secondary text-center mb-8">Step back in time ⏳</h1>
        <SearchComponent />
      </div>
    </div>
  )
}

export default Search 