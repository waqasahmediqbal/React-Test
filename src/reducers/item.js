import {
    ADD_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    ITEM_ERROR,
    GET_ITEMS,
  } from "../actions/types";
  
  const getItemsFromLocalStorage = () => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  };
  
  const initialState = {
    items: getItemsFromLocalStorage(),
    loading: true,
    error: {},
  };
  
  export default function item(state = initialState, action) {
    const { type, payload } = action;
  
    const updateLocalStorage = (newItems) => {
      localStorage.setItem('items', JSON.stringify(newItems));
    };
  
    switch (type) {
      case ADD_ITEM:
        const updatedItems = [payload, ...state.items];
        updateLocalStorage(updatedItems);
        return {
          ...state,
          items: updatedItems,
          loading: false,
        };
        case UPDATE_ITEM:
          const { id, editedItem } = payload;
          const editedItems = state.items.map(item =>
            item.id === id ? editedItem : item
          );
          console.log(editedItem);
          updateLocalStorage(editedItems);
    
          return {
            ...state,
            items: editedItems,
            loading: false
          };
        
      case GET_ITEMS:
        updateLocalStorage(payload);
        return {
          ...state,
          items: payload,
          loading: false,
        };
        case DELETE_ITEM:        
          const filteredItems = state.items.filter((item) => item.id !== payload);
          console.log('Filtered items after deletion:', filteredItems);
        
          updateLocalStorage(filteredItems);
        
          return {
            ...state,
            items: filteredItems,
          };
        
      case ITEM_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  