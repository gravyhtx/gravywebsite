//https://webventures.rejh.nl/blog/2022/getcomputedstyle-element-opacity/

import styles from './styles/toast.module.css';

export const ToastMessage = (message: string) =>
  <output role="status" className={styles.toast}>{message}</output>

export const ToastContainer = () =>
  <section className={styles.toastContainer}></section>


// Use Toaster to export different methods when usint Toast
// Put a container at bottom of Default Layout

const Toaster = () => {
  const init = () => {
    const node = document.createElement('section')
    node.classList.add('gui-toast-group')
  
    document.firstElementChild.insertBefore(node, document.body)
    return node
  }
  const flipToast = toast => {
    // FIRST
    const first = Toaster.offsetHeight
  
    // add new child to change container size
    Toaster.appendChild(toast)
  
    // LAST
    const last = Toaster.offsetHeight
  
    // INVERT
    const invert = last - first
  
    // PLAY
    const animation = Toaster.animate([
      { transform: `translateY(${invert}px)` },
      { transform: 'translateY(0)' }
    ], {
      duration: 150,
      easing: 'ease-out',
    })
  }
  const createToast = text => {
    const node = document.createElement('output')
    
    node.innerText = text
    node.classList.add('gui-toast')
    node.setAttribute('role', 'status')
  
    return node
  }
  const addToast = toast => {
    const { matches:motionOK } = window.matchMedia(
      '(prefers-reduced-motion: no-preference)'
    )
  
    Toaster.children.length && motionOK
      ? flipToast(toast)
      : Toaster.appendChild(toast)
  }
}

const Toast = text => {
  let toast = createToast(text)
  addToast(toast)

  return new Promise(async (resolve, reject) => {
    await Promise.allSettled(
      toast.getAnimations().map(animation => 
        animation.finished
      )
    )
    Toaster.removeChild(toast)
    resolve() 
  })
}

// import Toast from './toast.js'

// async function example() {
//   await Toast('Wizard Rose added to cart')
//   console.log('toast finished')
// }