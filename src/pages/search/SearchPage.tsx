import ParamsList from "./params-list";
import SearchBar from "./search-bar";
import SearchList from "./search-list";

export default function SearchPage() {
  return (
    <div>
      <SearchBar />
      <ParamsList />
      <SearchList />
    </div>
  );
}
