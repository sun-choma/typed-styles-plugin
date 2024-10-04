import "./App.css";
import { Button } from "@/components/button";

function App() {
  return (
    <main>
      <div style={{ display: "flex", gap: "12px" }}>
        <Button>Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="texted">Texted</Button>
        <Button variant="texted" isLoading>
          Loading
        </Button>
        <Button isDisabled>
          Disabled
        </Button>
      </div>
    </main>
  );
}

export default App;
