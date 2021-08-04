const Spinner = ({loading}) => {
    return loading ? <i className='fas fa-circle-notch fa-spin' /> : 'Sign In'
  }
export default Spinner