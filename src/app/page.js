import AdLeft from "./components/ad-left/ad-left";
import AdRight from "./components/ad-right/ad-right";
import Calculate from "./components/calculate/calculate";

export default function Home() {
  return (
    <div>
      <AdLeft />
      <Calculate />
      <AdRight />
    </div>
  );
}
