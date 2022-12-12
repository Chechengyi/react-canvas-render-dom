import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Circular } from './canvas-render/components'

function App() {
  const [uiInfo, setUiInfo] = React.useState({
    text: '开始',
    fillColor: '#ff6700',
    textColor: '#fff',
  })
  useEffect(() => {
    setTimeout(() => {
      // setText("改变文字")
      setUiInfo({
        text: '改变文字',
        fillColor: '#999922',
        textColor: '#fff',
      })
    }, 2000)
  }, [])
  return (
    <>
      <Circular textColor={uiInfo.textColor} x={100} y={100} r={50} fillColor={uiInfo.fillColor}>{uiInfo.text}</Circular>
      <Child1 />
    </>
  )
}
// todo 对于 string 类型的处理，实现渲染文字
function Child1() {

  const [color, setColor] = React.useState('#ff2300')
  const [place, setPlace] = React.useState({y: 50})
  const [state, setState] = React.useState([1, 2, 3, 4, 5]);

  React.useEffect(() => {
    setTimeout(() => {
      setColor('blue');
      setPlace({
        y: 200,
      })
      setState([5, 2, 1, 3])
    }, 3000);
  }, [])

  return (
    <>
      {
        state.map((item, idx) => <Circular textSize={12} textColor='#fff' fillColor={color} key={item} y={place.y} x={30 * (idx + 1)}>{String(item)}</Circular>)
      }
    </>
  );
}

export default App;
