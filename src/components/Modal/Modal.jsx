import s from './Modal.module.css'

export default function Modal({ isOpen, children }) {
  if (!isOpen) return null

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>{children}</div>
    </div>
  )
}
