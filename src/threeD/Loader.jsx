import React from 'react'

function Loader({width, test}) {
  // console.log(width)
  let itemsLoaded, itemsTotal;
  // console.log(test})
  // fun=function(url, itemLoaded, itemTotal){
    itemsLoaded= test.loaded;
    itemsTotal= test.total;
  console.log(itemsLoaded, itemsTotal)

  // }
  let percent = itemsLoaded/itemsTotal;
  console.log("percent",percent)
  let progress = percent * width;
  console.log("progress",progress)
  return (
    <div className='loader-main'>
        <div><h3>HANG ON WHILE IT MIGHT TAKE A FEW SECONDS......</h3>
        <div className="progress-div" style={{width: width}}>
           <div style={{width: `${progress}px`}}className="progress"/>
      </div>
        </div>
        {/* <canvas className='loader-canvas'></canvas> */}
    </div>
  )
}

export default Loader