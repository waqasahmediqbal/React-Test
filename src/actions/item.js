import axios from "axios";
import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ITEM_ERROR,
  GET_ITEMS,
} from "./types";

// Add an item
export const addItem = (newItem) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ITEM,
      payload: newItem,
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.message, status: err.response?.status || 500 },
    });
  }
};

// Get items
export const getItems = () => async (dispatch) => {
  try {
    const storedData = localStorage.getItem('items');

    if (storedData && JSON.parse(storedData).length > 0) {
      console.log('Using data from local storage:', JSON.parse(storedData));
      dispatch({
        type: GET_ITEMS,
        payload: JSON.parse(storedData),
      });
    } else {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      const apiData = response.data.data;
      const formattedData = apiData.map((item) => ({
        id: item.id,
        email: item.email,
        name: `${item.first_name} ${item.last_name}`,
        avatar: item.avatar,
      }));
      localStorage.setItem('items', JSON.stringify(formattedData));
      dispatch({
        type: GET_ITEMS,
        payload: formattedData,
      });
      console.log('Fetched data from API:', formattedData);
    }
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.message, status: err.response?.status || 500 },
    });
  }
};

//update an item
export const updateItem = (id, editedItem) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ITEM,
      payload: { id, editedItem },
    });
    console.log(id);
    console.log(editedItem)
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.message, status: err.response?.status || 500 },
    });
  }
};


// Delete an item
export const deleteItem = (itemId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ITEM,
      payload: itemId,
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.message, status: err.response?.status || 500 },
    });
  }
};
