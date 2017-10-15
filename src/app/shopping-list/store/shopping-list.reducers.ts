import { Ingredient } from '../../shared/model/ingredient.model';
import { ADD_INGREDIENT, ADD_INGREDIENTS, ShoppingListActions } from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Orange', 10)
  ]
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
