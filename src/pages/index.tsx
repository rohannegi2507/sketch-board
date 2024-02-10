import Board from "@/components/Board";
import MenuBar from "@/components/MenuBar";
import Toolbox from "@/components/Toolbox";

export default function Home() {
  return (
    <div>
      <MenuBar />
      <Toolbox />
      <Board />
    </div>
  );
}
