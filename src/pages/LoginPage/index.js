import { Button, withStyles, InputAdornment, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useUser } from '../../context/userContex'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox'
import InputText from '../../components/Inputs/InputText'
import styled from 'styled-components'
import userServices from '../../services/userServices'
import Modal from '../../components/Modal/Modal'
import mediaQuery from "../../components/mediaQuery/"


const CustomButton = withStyles({
  root: {
    width: '100%',
    height: '50px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    fontWeight: 'initial',
    color: 'white',
    padding: '6px 12px',
    lineHeight: 1.5,
    backgroundColor: 'var(--primary)',
    '&:hover': {
      backgroundColor: '#F35BB8',
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#F35BB8',
      borderColor: '#005cbf'
    },
    '&:disabled': {
      backgroundColor: 'var(--info)'
    }
  }
})(Button)

export default function Login () {
  const [checked, setChecked] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginMsg, setLoginMsg] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm()
  const { setLocalStorageToken, setSaveTemporalToken } = useUser()
  // const history = useHistory()

  const showSpinner = () => {
    return loading ? <i className='fas fa-circle-notch fa-spin' /> : 'Sign In'
  }
  const handleCheckboxChange = e => {
    setChecked(e.target.checked)
  }

  const onSubmit = async data => {
    if (data) {
      setDisableButton(true)
      setLoading(true)
      const req = await userServices.loginService(data)
      if (req.ok) {
        const res = await req.json()
        if (checked) {
          setLocalStorageToken(res)
        } else {
          setSaveTemporalToken(res)
        }
        // history.replace('/app')
      } else {
        const error = await req.json()
        setLoading(false)
        setLoginMsg(error.error)
        setShowModal(true)
        setTimeout(() => {
          setShowModal(false)
          setDisableButton(false)
        }, 5000)
      }
    }
  }

  return (
    <ContainerStyle>
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <IconModal className='fas fa-exclamation-circle' />
          <TitleModal>{loginMsg}</TitleModal>
        </Modal>}
      <Title>Login</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          label='Username or Email'
          placeholder='Enter your username or email'
          variant='outlined'
          error={!!errors?.userData}
          helperText={errors?.userData?.message}
          {...register('userData', { required: 'You must specify a username or email', minLength: { value: 5, message: 'Name must have at least 5 characters' } })}
        />
        <InputText
          placeholder='Enter your password' label='Password'
          type={showPassword ? 'text' : 'password'}
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword(prev => !prev)}
                  onMouseDown={event => event.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          error={!!errors?.password}
          helperText={errors?.password?.message}
          {...register('password', { required: 'You must specify a password', minLength: { value: 8, message: 'Password must have at least 8 characters' } })}
        />
        <ContainerCheckbox>
          <label>
            <CustomCheckBox
              checked={checked} onChange={handleCheckboxChange} containerStyle={{
                padding: '10px 0px;',
                'margin-right': '10px;'
              }}
            />
          </label>
          <p>Remember me</p>
        </ContainerCheckbox>

        <CustomButton
          type='submit'
          disabled={!(dirtyFields?.userData && dirtyFields?.password) || disableButton}
        >
          {showSpinner()}
        </CustomButton>
      </form>
      <ContainerToSignIn>
        <p>Don't have an account ?</p>
        <Link to='/sign-up'>
          <LinkSignIn>Create a new account</LinkSignIn>
        </Link>
      </ContainerToSignIn>

    </ContainerStyle>
  )
}
const ContainerStyle = styled.div`
color: white;
background-color: var(--secondary);
height: 95vh;
width: 95vw;
border-radius: 5px;
padding: 0 20px;
display: flex;
flex-direction: column;
justify-content: center;

@media (min-width:${mediaQuery.tabletW}) and (max-width:${mediaQuery.desktop}){
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
  padding-top: 100px;
}
@media (min-width :${mediaQuery.desktop}){
  height: 66vh;
  width: 420px;
}
::-webkit-scrollbar{
    width: 8px;
}
::-webkit-scrollbar-track{
    background: var(--info)
}
::-webkit-scrollbar-thumb{
    background: #f02b41;
    
}
::-webkit-scrollbar-thumb:hover{
    background: #F35BB8
}
`
const Title = styled.p`
color:var(--primary);
font-size: 2.5em;
font-weight: 300;
text-align: center;
`

const ContainerCheckbox = styled.div`
display: flex;
align-items: center;
color: var(--primary);
`
const ContainerToSignIn = styled.div`
display: flex;
justify-content: space-evenly;
margin-bottom: 52px;
color:var(--text);
`
const LinkSignIn = styled.p`
text-decoration:underline; 
cursor:pointer; 
color:var(--primary);
`
const IconModal = styled.i`
color:red;
font-size:4em;
`
const TitleModal = styled(Title)`
color: red;
font-size: 2em;
`
