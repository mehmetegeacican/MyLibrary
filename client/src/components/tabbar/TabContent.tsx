import React, { useEffect } from 'react'
import { TabPanelInterface } from '../../interfaces/TabInterfaces';



export default function TabContent({value,items}:TabPanelInterface) {
  //Hooks
  const [content,setContent] = React.useState<JSX.Element>();

  //UseEffect
  useEffect(() => {
    if(value === 0){
        setContent(items[0])
    }
    else if(value === 1 ){
        setContent(items[1])
    }
  },[value])
  
  return (
    <>
    {content}
    </>
   
  )
}
