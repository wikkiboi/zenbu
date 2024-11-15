import ParamsList from "./ParamsList";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";

export default function SearchPage() {
  return (
    <div>
      <SearchBar />
      <ParamsList />
      <SearchList />
    </div>
  );
}
