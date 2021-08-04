import {withStyles, Button} from "@material-ui/core"
const CustomButton = withStyles({
    root: {
      width: props => props.width|| '100%',
      height: '50px',
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 18,
      fontWeight: 'initial',
      color: 'white',
      padding: '6px 12px',
      lineHeight: 1.5,
      backgroundColor: props => props.backgroundColor || 'var(--primary)',
      '&:hover': {
        backgroundColor: props => props.hover || '#F35BB8',
        boxShadow: 'none'
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#F35BB8',
        borderColor: '#005cbf'
      }, '&:disabled': {
        backgroundColor: 'var(--info)'
      }
    }
  })(Button)

export default CustomButton
  