import produce from 'immer'
import appActions from './actions'

export const initialState = {
  total: 0
}

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case appActions.add.type:
        draft.total = draft.total + action.amount
        break
      case appActions.minus.type:
        draft.total = draft.total - action.amount
        break
      default:  
    }
  });

export default appReducer