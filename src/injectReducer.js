import React from 'react';
// import { ReactReduxContext } from 'react-redux';
import { useStore } from 'react-redux'

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

const useInjectReducer = ({ key, reducer }) => {
  const store = useStore()

  React.useEffect(() => {
    store.reducerManager.add(key, reducer);
  }, []);
};

export { useInjectReducer };
