export function ScalesList({ range, onDrop, allowDrop }) {
  return (
    <>
      {range.map((el) => (
        <div key={el} className='numbers'>
          <div className='element__numbers'>{el}</div>
          <div
            className='element'
            onDragOver={allowDrop}
            onDrop={onDrop}
            id={el.toString()}
          ></div>
        </div>
      ))}
    </>
  )
}
