import { useSpring ,config} from 'react-spring'

export const EnterAnimation = () =>{
    return useSpring({
        from: { opacity: 0, transform: 'scale(0.5)' }, 
        to: { opacity: 1, transform: 'scale(1)' },
        config:config.stiff,
        delay: 200, 
    })
}