// implement zooming in graph

import { zoom, zoomTransform } from 'd3';

//top level of functional component declaration 
const [currentZoomState, setCurrentZoomState] = useState();

//inside useEffect     
if(currentZoomState) {
  const newXScale = currentZoomState.rescaleX(xScale);
  xScale.domain(newXScale.domain());
}

const zoomBehavior = zoom()
  .scaleExtent([0, 5])
  .translateExtent([[0, 0], [width + 50, height]]).on('zoom', () => {
  })
  .on('zoom', () => {
    const zoomState = zoomTransform(svg.node());
    setCurrentZoomState(zoomState);
  });
svg.call(zoomBehavior);

// include in parameter for updating
currentZoomState
;
