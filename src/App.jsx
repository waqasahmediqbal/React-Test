import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import UserList from "./components/CustomerList/List";
import { useEffect } from "react";
import { addItem, deleteItem, getItems, updateItem } from "./actions/item";
import { connect } from "react-redux";

function App({ items, getItems, deleteItem, updateItem,addItem }) {
  useEffect(() => {
    getItems();
  }, [getItems]);
  function handleEdit(id, updatedData) {
    updateItem(id, updatedData);
  }
  function handleDelete(id) {
    deleteItem(id);
  }
  function handleAdd(data){
    addItem(data);
  }
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <UserList users={items} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd}/>
      </main>
    </>
  );
}
const mapStateToProps = (state) => ({
  items: state.item.items,
});
export default connect(mapStateToProps, { getItems, deleteItem, updateItem , addItem})(
  App
);
