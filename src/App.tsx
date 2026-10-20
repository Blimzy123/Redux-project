import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";

export default function App() {
  return (
    <main className="app-container">
      <section className="todo-card">
        <header className="app-header">
          <span className="eyebrow">YOUR PERSONAL SPACE</span>
          <h1>My ToDo List<span>.</span></h1>
          <p>Small steps every day lead to big results.</p>
        </header>

        <AddTask />
        <ListTask />

        <footer className="app-footer">
          Stay focused. You've got this!
        </footer>
      </section>
    </main>
  );
}
