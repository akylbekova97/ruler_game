import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <App />
  </>,
)


// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useEffect, useState } from 'react'

// function App() {
//   const [leftItems, setLeftItems] = useState([]);
//   const [rightItems, setRightItems] = useState([]);
//   const [message, setMessage] = useState('');
//   const [targetSum] = useState(5);

//   const weights = [...Array(21).keys()].map(i => i - 10); // -10 до 10

//   const handleDragStart = (e, item) => {
//     e.dataTransfer.setData('item', item);
//   };

//   const handleDrop = (e, side) => {
//     e.preventDefault();
//     const item = Number(e.dataTransfer.getData('item'));

//     if (side === 'left') {
//       setLeftItems([...leftItems, item]);
//     } else {
//       setRightItems([...rightItems, item]);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const checkBalance = () => {
//     const leftSum = leftItems.reduce((sum, item) => sum + item, 0);
//     const rightSum = rightItems.reduce((sum, item) => sum + item, 0);

//     if (leftSum === rightSum && leftSum === targetSum) {
//       setMessage('Поздравляем! Весы идеально сбалансированы!');
//     } else if (leftSum === rightSum) {
//       setMessage('Весы сбалансированы, но не достигнута целевая сумма!');
//     } else if (leftSum > rightSum) {
//       setMessage('Левая чаша перевешивает!');
//     } else {
//       setMessage('Правая чаша перевешивает!');
//     }
//   };

//   const resetGame = () => {
//     setLeftItems([]);
//     setRightItems([]);
//     setMessage('');
//   };

//   return (
//     <motion.div
//       className="app"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.h1
//         initial={{ y: -50 }}
//         animate={{ y: 0 }}
//         transition={{ type: 'spring', stiffness: 300 }}
//       >
//         Уравновесь весы
//       </motion.h1>

//       <div className="target-display">
//         <motion.div
//           className="target-value"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           Цель: {targetSum}
//         </motion.div>
//       </div>

//       <motion.div
//         className="weights-container"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         {weights.map((weight) => (
//           <motion.div
//             key={weight}
//             className={`weight ${weight < 0 ? 'negative' : weight > 0 ? 'positive' : 'zero'}`}
//             draggable
//             onDragStart={(e) => handleDragStart(e, weight)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {weight}
//           </motion.div>
//         ))}
//       </motion.div>

//       <div className="scales-container">
//         <motion.div
//           className="scale-pan left-pan"
//           onDrop={(e) => handleDrop(e, 'left')}
//           onDragOver={handleDragOver}
//           animate={{
//             rotate: leftItems.reduce((a, b) => a + b, 0) > rightItems.reduce((a, b) => a + b, 0) ? -5 : 0
//           }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           <AnimatePresence>
//             {leftItems.map((item, index) => (
//               <motion.div
//                 key={index}
//                 className={`scale-item ${item < 0 ? 'negative' : item > 0 ? 'positive' : 'zero'}`}
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//                 transition={{ type: 'spring' }}
//               >
//                 {item}
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         <motion.div
//           className="scale-beam"
//           animate={{
//             rotate: leftItems.reduce((a, b) => a + b, 0) > rightItems.reduce((a, b) => a + b, 0) ? -5 :
//                    leftItems.reduce((a, b) => a + b, 0) < rightItems.reduce((a, b) => a + b, 0) ? 5 : 0
//           }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         />

//         <motion.div
//           className="scale-pan right-pan"
//           onDrop={(e) => handleDrop(e, 'right')}
//           onDragOver={handleDragOver}
//           animate={{
//             rotate: leftItems.reduce((a, b) => a + b, 0) < rightItems.reduce((a, b) => a + b, 0) ? 5 : 0
//           }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           <AnimatePresence>
//             {rightItems.map((item, index) => (
//               <motion.div
//                 key={index}
//                 className={`scale-item ${item < 0 ? 'negative' : item > 0 ? 'positive' : 'zero'}`}
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//                 transition={{ type: 'spring' }}
//               >
//                 {item}
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>

//       <div className="controls">
//         <motion.button
//           onClick={checkBalance}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Проверить
//         </motion.button>
//         <motion.button
//           onClick={resetGame}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Сбросить
//         </motion.button>
//       </div>

//       <AnimatePresence>
//         {message && (
//           <motion.div
//             className="message"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//           >
//             {message}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// export default App;

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// function App() {
//   const [section1, setSection1] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
//   const [section2, setSection2] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

//   return (
//     <div>
//       <div className='scales'>
//         {section1.reverse().map((el) => (
//           <div key={el}>{el}</div>
//         ))}
//         <br />
//         {section2.map((el) => (
//           <div key={el}>{el}</div>
//         ))}
//       </div>

//       <div className='el1'>el1</div>
//       <div className='el2'>el2</div>
//     </div>
//   )
// }

// export default App Appimport { useState, useEffect } from 'react';import { useState } from 'react';

// import { useState } from 'react'
// import './App.css'

// function App() {
//   const [draggedElement, setDraggedElement] = useState(null)
//   const [section1, setSection1] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse())
//   const [section2, setSection2] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
//   const [position, setPosition] = useState({
//     el1: { x: 20, y: 100 },
//     el2: { x: 20, y: 200 },
//   })

//   // Обработчики для мыши
//   const handleMouseDown = (element) => {
//     setDraggedElement(element)
//   }

//   const handleMouseMove = (e) => {
//     if (!draggedElement) return

//     const newX = e.clientX - 50 // Центрируем элемент
//     const newY = e.clientY - 25

//     setPosition((prev) => ({
//       ...prev,
//       [draggedElement]: { x: newX, y: newY },
//     }))
//   }

//   const handleMouseUp = () => {
//     setDraggedElement(null)
//   }

//   // Обработчики для тач-устройств
//   const handleTouchStart = (element, e) => {
//     setDraggedElement(element)
//     e.preventDefault() // Предотвращаем скролл страницы
//   }

//   const handleTouchMove = (e) => {
//     if (!draggedElement) return

//     const touch = e.touches[0]
//     const newX = touch.clientX - 50
//     const newY = touch.clientY - 25

//     setPosition((prev) => ({
//       ...prev,
//       [draggedElement]: { x: newX, y: newY },
//     }))

//     e.preventDefault()
//   }

//   const handleTouchEnd = () => {
//     setDraggedElement(null)
//   }

//   return (
//     <div
//       className='container'
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div className='scales'>
//         {section1.map((el) => (
//           <div key={el}>{el}</div>
//         ))}
//         <br />
//         {section2.map((el) => (
//           <div key={el}>{el}</div>
//         ))}
//       </div>

//       <div
//         className='draggable el1'
//         style={{
//           left: position.el1.x,
//           top: position.el1.y,
//           cursor: draggedElement ? 'grabbing' : 'grab',
//         }}
//         onMouseDown={() => handleMouseDown('el1')}
//         onTouchStart={(e) => handleTouchStart('el1', e)}
//       >
//         el1
//       </div>

//       <div
//         className='draggable el2'
//         style={{
//           left: position.el2.x,
//           top: position.el2.y,
//           cursor: draggedElement ? 'grabbing' : 'grab',
//         }}
//         onMouseDown={() => handleMouseDown('el2')}
//         onTouchStart={(e) => handleTouchStart('el2', e)}
//       >
//         el2
//       </div>
//     </div>
//   )
// }

// export default App