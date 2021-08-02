/* eslint-disable no-useless-escape */
import { Button, withStyles, InputAdornment, IconButton } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import InputText from '../../components/Inputs/InputText'
import styled from 'styled-components'
import userServices from '../../services/userServices'
import Modal from '../../components/Modal/Modal'
const mediaQuery = {
  desktop: '800px'
}

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
const REXEMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
export default function Register () {
  const [disableButton, setDisableButton] = useState(false)
  const [isSuccessRegister, setIsSuccessRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [registerMsg, setRegisterMsg] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const { register, handleSubmit, formState: { errors, dirtyFields }, watch } = useForm()
  const history = useHistory()

  const showSpinner = () => {
    return loading ? <i className='fas fa-circle-notch fa-spin' /> : 'Sign Up'
  }
  const onSubmit = async data => {
    if (data) {
      setDisableButton(true)
      setLoading(true)
      const req = await userServices.registerService(data)
      if (req.ok) {
        setLoading(false)
        setRegisterMsg('Success register')
        setIsSuccessRegister(true)
        setShowModal(true)
        setTimeout(() => history.push('/sign-in'), 2200)
      } else {
        const error = await req.json()
        setLoading(false)
        setIsSuccessRegister(false)
        setRegisterMsg(error.error)
        setShowModal(true)

        setTimeout(() => {
          setShowModal(false)
          setDisableButton(false)
        }, 2500)
      }
    }
  }
  const completedInputs = () => {
    return dirtyFields?.name &&
    dirtyFields?.username &&
    dirtyFields?.email &&
    dirtyFields?.password &&
    dirtyFields?.confirmation
  }
  const [icon, text] = isSuccessRegister
    ? ['fas fa-check-circle', registerMsg]
    : ['fas fa-exclamation-circle', registerMsg]
  return (
    <ContainerStyle>
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <IconModal className={icon} size='4em' color={isSuccessRegister ? '#58A600' : 'red'} />
          <TitleModal size='2.5em' color={isSuccessRegister ? '#58A600' : 'red'}>{text}</TitleModal>
        </Modal>}
      <Title>Register</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          label='Name'
          placeholder='Enter your name'
          id='name'
          variant='outlined'
          {...register('name', { required: 'You must specify a username', minLength: { value: 5, message: 'Name must have at least 5 characters' } })}
          error={!!errors?.name}
          helperText={errors?.name?.message}
        />
        <InputText
          label='Username'
          placeholder='Enter your username'
          id='username'
          variant='outlined'
          {...register('username', { required: 'You must specify a username', minLength: { value: 5, message: 'Username must have at least 5 characters' }, pattern: { value: /^[a-z0-9-_@$]{5,}$/gi, message: 'Username must be valid' } })}
          error={!!errors?.username}
          helperText={errors?.username?.message}
        />
        <InputText
          label='Email'
          placeholder='Enter your email'
          id='email'
          variant='outlined'
          {...register('email', { required: 'You must specify a email', pattern: { value: REXEMAIL, message: 'Email must be valid' } })}
          error={!!errors?.email}
          helperText={errors?.email?.message}
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
          {...register('password', { required: 'You must specify a password', minLength: { value: 8, message: 'Password must have at least 8 characters' } })}
          error={!!errors?.password}
          helperText={errors?.password?.message}
        />
        <InputText
          placeholder='Enter your password confirmation' label='Password Confirmation'
          type={showPasswordConfirmation ? 'text' : 'password'}
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPasswordConfirmation(prev => !prev)}
                  onMouseDown={event => event.preventDefault()}
                >
                  {showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          {...register('confirmation', {
            required: 'You must specify a password confirmation',
            validate: value => value === watch('password', '') || 'The passwords do not match'
          })}
          error={!!errors?.confirmation}
          helperText={errors?.confirmation?.message}
        />
        <CustomButton type='submit' disabled={!completedInputs() || disableButton}>{showSpinner()}</CustomButton>
        <ContainerToSignIn>
          <p>Already have an acount! </p>
          <Link to='/sign-in'>
            <LinkSignIn>Sign In </LinkSignIn>
          </Link>
        </ContainerToSignIn>
      </form>

    </ContainerStyle>
  )
}
const ContainerStyle = styled.div`
color: black;
background-color: var(--secondary);
height: 95vh;
width: 95vw;
border-radius: 5px;
padding: 0 20px;
overflow: hidden;
overflow-y: auto;
@media (min-width :${mediaQuery.desktop}){
  height: 80vh;
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
color: ${props => props.color};
font-size: ${props => props.size};
`
const TitleModal = styled(Title)`
color: ${props => props.color};
font-size: ${props => props.size};
`
