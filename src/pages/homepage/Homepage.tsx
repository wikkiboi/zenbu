import AiringList from "./AiringList";
import ShortSearchBar from "../../components/ShortSearchBar";

export default function Homepage() {
  return (
    <div className="p-4">
      <ShortSearchBar />
      <AiringList />
    </div>
  );
}
