import AddTodoForm from "./components/features/todos/AddTodoForm";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
    <MainLayout>
      <div>
        <AddTodoForm />
      </div>
    </MainLayout>
  );
}

export default App;
