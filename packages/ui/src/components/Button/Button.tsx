import { ParentComponent, ComponentProps } from 'solid-js'
import cn from 'classnames'

import styles from './Button.module.css'

type TButton = {
  preset?: 'default' | 'styled'
}

export const Button: ParentComponent<ComponentProps<'button'> & TButton> = (
  props
) => {
  const { preset = 'default' } = props
  const classes = cn(styles.button, { [styles.styled]: preset === 'styled' })

  return <button class={classes}>{props.children}</button>
}
