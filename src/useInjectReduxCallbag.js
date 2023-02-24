import { useEffect } from 'react'
import { useStore } from 'react-redux'
import subscribe from 'callbag-subscribe'
import {pipe} from 'callbag-basics'

export default function useInjectReduxCallbag(actions) {
  const store = useStore()

  useEffect(() => {
    const unsubscribe = pipe(
      store.callbagSource,
      subscribe( actions )
    );
    
    // When unmount unsubscribe
    return () => unsubscribe()
  }, [])

  return true
}