import { ReactNode, } from 'react'
import styles from './ModalWindow.module.css'


interface Props {
  children: ReactNode
  onClose: () => void
}


export  const ModalWindow = ({
  children,
  onClose,
}: Props) => {
  return (
    <div className={styles.layer} onClick={onClose}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  )
}
