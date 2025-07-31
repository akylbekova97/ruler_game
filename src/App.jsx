import { ScalesList } from './components/ScalesList'
import './App.css'
import img1 from './assets/imgs/1.png'
import img2 from './assets/imgs/2.png'
import img3 from './assets/imgs/3.png'
import img4 from './assets/imgs/5.png'
import img5 from './assets/imgs/7.png'
import column from './assets/imgs/fixed_part.png'

import { useState, useRef } from 'react'
import Modal from './components/Modal/Modal'

function App() {
  const [leftTorque, setLeftTorque] = useState(0)
  const [rightTorque, setRightTorque] = useState(0)
  const [positions, setPositions] = useState({})

  const imagesContainerRef = useRef(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  function allowDrop(e) {
    e.preventDefault()
  }

  function drag(e) {
    e.dataTransfer.setData('id', e.target.id)
  }

  function getWeight(id) {
    if (id === 'img1') return 1
    if (id === 'img2') return 2
    if (id === 'img3') return 3
    if (id === 'img4') return 5
    if (id === 'img5') return 7
    return 0
  }

  function recalculateTorque(updatedPositions) {
    let left = 0
    let right = 0

    for (const id in updatedPositions) {
      const { side, pos } = updatedPositions[id]
      const weight = getWeight(id)
      const moment = weight * pos
      // вес * расстояние

      if (side === 'left') left += moment
      else if (side === 'right') right += moment
    }

    setLeftTorque(left)
    setRightTorque(right)
  }

  function dropLeft(e) {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('id')
    const dragged = document.getElementById(itemId)
    const position = parseInt(e.target.id)

    if (dragged) {
      e.target.appendChild(dragged)
    }

    const newPositions = {
      ...positions,
      [itemId]: { side: 'left', pos: position },
    }

    setPositions(newPositions)
    recalculateTorque(newPositions)
  }

  function dropRight(e) {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('id')
    const dragged = document.getElementById(itemId)
    const position = parseInt(e.target.id)

    if (dragged) {
      e.target.appendChild(dragged)
    }

    const newPositions = {
      ...positions,
      [itemId]: { side: 'right', pos: position },
    }

    setPositions(newPositions)
    recalculateTorque(newPositions)
  }

  function reset() {
    setPositions({})
    setLeftTorque(0)
    setRightTorque(0)

    const imagesContainer = imagesContainerRef.current
    if (!imagesContainer) return
    ;['img1', 'img2', 'img3', 'img4', 'img5'].forEach((id) => {
      const img = document.getElementById(id)
      if (img && img.parentElement !== imagesContainer) {
        imagesContainer.appendChild(img)
      }
    })
  }

  function further() {
    reset()
    setIsModalOpen(false)
  }

  let continueFunc = (
    <>
      <h1>Дааа, получился👏</h1>
      <h3>Давай бегом к следующему игру ✅</h3>

      <button className='btn' onClick={further}>
        продолжить
      </button>
    </>
  )

  let back = (
    <>
      <h1>Попробуй сбалансировать весы сначала 😉</h1>
      <button className='btn' onClick={() => setIsModalOpen(false)}>
        продолжить
      </button>
    </>
  )

  return (
    <div>
      <h1 className='title'>Уравновесь весы</h1>
      <div
        className='scales'
        style={{
          transition: 'transform 0.5s ease',
          transform: `rotate(${
            leftTorque > rightTorque ? -7 : rightTorque > leftTorque ? 7 : 0
          }deg)`,
        }}
      >
        <ScalesList
          range={[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]}
          onDrop={dropLeft}
          allowDrop={allowDrop}
        />
        0
        <ScalesList
          range={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          onDrop={dropRight}
          allowDrop={allowDrop}
        />
      </div>

      <img className='column' src={column} alt='column' />

      <section>
        <div className='images' ref={imagesContainerRef}>
          <img src={img1} alt='img1' id='img1' draggable onDragStart={drag} />
          <img src={img2} alt='img2' id='img2' draggable onDragStart={drag} />
          <img src={img3} alt='img3' id='img3' draggable onDragStart={drag} />
          <img src={img4} alt='img5' id='img4' draggable onDragStart={drag} />
          <img src={img5} alt='img7' id='img5' draggable onDragStart={drag} />
        </div>

        <div className='buttons'>
          <button className='btn' onClick={() => setIsModalOpen(true)}>
            Проверить
          </button>
          <button className='btn' onClick={reset}>
            Сбросить
          </button>
        </div>
      </section>

      <Modal isOpen={isModalOpen}>
        <>
          {leftTorque === rightTorque && leftTorque != 0 && rightTorque != 0
            ? continueFunc
            : back}
        </>
      </Modal>
    </div>
  )
}

export default App
