import { useReveal } from '../hooks/useReveal'

export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, revealClass] = useReveal()
  return (
    <Tag ref={ref} className={`${revealClass} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
