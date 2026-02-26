import defaultActions from "./default_actions";
import productActions from "./product.actions";
import userActions from "./user.actions";

export const registerActions = () => {
  defaultActions();
  productActions();
  userActions();
};
