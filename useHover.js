
// Implementation of useHover hook

import { Ref, useState, useRef, useCallback } from 'react'

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  // your code here
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const comingRef = useRef();

  const onHover = useCallback(()=>{
    console.log('Enter');
    setIsHovered(true)
  }, [])

  const offHover = useCallback(()=>{
    console.log('Out');
    setIsHovered(false)
  }, [])

  const inputRefcb = (el:HTMLElement)=>{
    console.log(el)

    if(comingRef.current) {
      console.log("Removing")
      comingRef.current.removeEventListener('mouseenter', onHover)
      comingRef.current.addEventListener('mouseleave',offHover)
    }

    comingRef.current = el;

    if(comingRef.current) {
      console.log("Adding")
      comingRef.current.addEventListener('mouseenter', onHover)
      comingRef.current.addEventListener('mouseleave', offHover)
    }
  }
  return [inputRefcb, isHovered];
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  const [ref, isHovered] = useHover()
  return <div ref={ref}>{isHovered ? 'hovered' : 'not hovered'}</div>
}





