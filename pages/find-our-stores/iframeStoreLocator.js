import React, { useRef, useState } from 'react'
import IframeResizer from 'iframe-resizer-react'
 

const IframeStoreLoactor=() => {
  const iframeRef = useRef(null)
  const [messageData, setMessageData] = useState()

  const onResized = data => setMessageData(data)

  const onMessage = data => {
    setMessageData(data)
    iframeRef.current.sendMessage('Hello back from the parent page')
  }

  return (
    <>
      <IframeResizer
        forwardRef={iframeRef}
        heightCalculationMethod="lowestElement"
        inPageLinks
        log
        // onMessage={onMessage}
        // onResized={onResized}
        src="http://18.208.41.11/storelocator/index.html"
        style={{ width: '100%',border:0, maxHeight:955}}
      />
     {/* <div>{messageData}</div> */}
    </>
  )
}

export default IframeStoreLoactor