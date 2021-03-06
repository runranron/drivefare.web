const actionsObj = {};

const asyncActions = [
  "ADD_MODIFICATION",
  "REMOVE_MODIFICATION",
  "EDIT_MODIFICATION",
  "ADD_MENU_ITEM",
  "REMOVE_MENU_ITEM",
  "EDIT_MENU_ITEM",
  "GET_MENU",
  "GET_CUSTOMER_PROFILE",
  "NEW_CUSTOMER",
  "NEW_VENDOR",
  "GET_VENDORS",
  "GET_VENDOR_PROFILE",
  "EDIT_VENDOR",
  "SELECT_VENDOR",
  "ADD_TO_CART",
  "UPDATE_CART",
  "REMOVE_FROM_CART",
  "SAVE_CART",
  "GET_CART",
  "REMOVE_FROM_CART",
  "SET_TIP",
  "PAY",
  "TOGGLE_ORDER_METHOD",
  "GET_ACTIVE_ORDERS",
  "GET_READY_ORDERS",
  "GET_ORDER_HISTORY",
  "REFUND_ORDER",
  "READY_ORDER",
  "DELIVER_ORDER",
  "CUSTOMER_PICK_UP_ORDER",
  "LOG_IN",
  "SEND_CONFIRMATION_EMAIL",
  "EDIT_ADDRESS",
  "ADD_ADDRESS",
  "GET_ADDRESSES",
  "REMOVE_ADDRESS",
  "SELECT_ADDRESS",
  "GET_ACTIVE_DRIVERS",
  "GET_ON_CALL_DRIVERS",
  "ACCEPT_ORDER",
  "AUTO_REQUEST_DRIVERS",
  "REQUEST_DRIVERS",
];
const syncActions = ["LOG_OUT", "TOGGLE_READY_TO_PAY", "SEARCH_MENU"];

syncActions.forEach((key) => {
  actionsObj[key] = key;
});

asyncActions.forEach((key) => {
  actionsObj[key] = key;
  actionsObj[`${key}_FAIL`] = `${key}_FAIL`;
  actionsObj[`${key}_SUCCESS`] = `${key}_SUCCESS`;
});

export default actionsObj;
