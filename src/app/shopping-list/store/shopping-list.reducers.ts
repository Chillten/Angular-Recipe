import { Ingredient } from '../../shared/model/ingredient.model';
import {
  ShoppingListActions,
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
  START_EDIT,
  STOP_EDIT,
} from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIndex: number;
  editedItem: Ingredient;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Orange', 10)
  ],
  editedIndex: -1,
  editedItem: null
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {

  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: mergeWithSingleIngredient(state.ingredients, action.payload)
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: mergeIngredients(state.ingredients, action.payload)
      };
    case UPDATE_INGREDIENT:
      const ingredients = [...state.ingredients];
      ingredients[state.editedIndex] = {
        ...state.ingredients[state.editedIndex],
        ...action.payload.ingredient
      };
      return {
        ...state,
        ingredients,
        editedIndex: -1,
        editedItem: null
      };
    case DELETE_INGREDIENT:
      const oldIngr = [...state.ingredients];
      if (state.editedIndex > -1) {
        oldIngr.splice(state.editedIndex, 1);
      }
      return {
        ...state,
        ingredients: oldIngr,
        editedIndex: -1,
        editedItem: null
      };
    case START_EDIT:
      console.log(action.payload.index);
      return {
        ...state,
        editedIndex: action.payload.index,
        editedItem: state.ingredients[action.payload.index]
      };
    case STOP_EDIT:
      return {
        ...state,
        editedIndex: -1,
        editedItem: null
      };
    default:
      return state;
  }
}

function mergeWithSingleIngredient(state: Ingredient[], newIngredient: Ingredient) {
  return [...state, newIngredient].reduce(
    (previousValue: Ingredient[], currentValue) => {
      const i = previousValue.find(value => value.name === currentValue.name);
      i ? i.amount += currentValue.amount : previousValue.push(currentValue);
      return previousValue;
    },
    []);
}

function mergeIngredients(state: Ingredient[], newIngredients: Ingredient[]) {
  return [...state, ...newIngredients].reduce(
    (previousValue: Ingredient[], currentValue) => {
      const i = previousValue.find(value => value.name === currentValue.name);
      i ? i.amount += currentValue.amount : previousValue.push(currentValue);
      return previousValue;
    },
    []);
}
