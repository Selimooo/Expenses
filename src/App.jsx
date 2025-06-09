import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");


  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });


  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  function handleclick(event) {
    event.preventDefault();
    const expense = { title, amount, date, category };
    setExpenses([...expenses, expense]);
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  }


  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);


  function handleDelete(indexToDelete) {
    setExpenses(expenses.filter((_, index) => index !== indexToDelete));
    if (editIndex === indexToDelete) {
      setEditIndex(null);
    }
  }

  function handleModif(index) {
    setEditIndex(index);
    setEditedTitle(expenses[index].title);
    setEditedAmount(expenses[index].amount);
    setEditedDate(expenses[index].date);
    setEditedCategory(expenses[index].category);
  }

  function handleSave() {
    const updatedExpenses = [...expenses];
    updatedExpenses[editIndex] = {
      title: editedTitle,
      amount: editedAmount,
      date: editedDate,
      category: editedCategory,
    };
    setExpenses(updatedExpenses);
    setEditIndex(null);
  }

  function handleCancel() {
    setEditIndex(null);
  }

  return (
    <>
      <form className="expense-form">
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Courses"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Montant</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ex: 50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="alimentation">Alimentation</option>
            <option value="transport">Transport</option>
            <option value="loisir">Loisir</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <button type="submit" onClick={handleclick}>
          Ajouter Dépense
        </button>
      </form>

      <h2>Liste des Dépenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <input
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                />
                <input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
                <select
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                >
                  <option value="alimentation">Alimentation</option>
                  <option value="transport">Transport</option>
                  <option value="loisir">Loisir</option>
                  <option value="autre">Autre</option>
                </select>
                <button onClick={handleSave}>Sauvegarder</button>
                <button onClick={handleCancel}>Annuler</button>
              </>
            ) : (
              <>
                {expense.title} - {expense.amount}€ - {expense.category} -{" "}
                {expense.date}
                <button onClick={() => handleDelete(index)}>Supprimer</button>
                <button onClick={() => handleModif(index)}>Modifier</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
