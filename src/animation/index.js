import { useSpring ,useTransition, config} from 'react-spring'

export const EnterAnimation = () =>{
    return useSpring({
        from: { opacity: 0, transform: 'scale(0.5)' }, 
        to: { opacity: 1, transform: 'scale(1)' },
        config:config.stiff,
        delay: 200, 
    })
}

export const SlideAnimation = (items) =>{
    return useTransition(items, {
        from: {transform: 'translate(400%)', opacity : 0},
        enter: { transform: 'translate(0px)', opacity : 1 },
        leave: { transform: 'translate(400%)', opacity : 0 },
        config: config.default,
      })
}