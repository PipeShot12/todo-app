/* eslint-disable no-useless-escape */
import { InputAdornment, IconButton } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import CustomInputText from '../../components/CustomInputText'
import styled from 'styled-components'
import userServices from '../../services/userServices'
import Modal from '../../components/Modal/'
import mediaQuery from '../../components/mediaQuery'
import CustomButton from '../../components/CustomButton'
import Spinner from "../../components/Spinner"
import { Title, ContainerAnchor, AnchorStyle, Container } from '../../commonStyles'

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
        <Modal 
          onClose={() => setShowModal(false)} 
          icon={icon} 
          iconSize="4em" 
          iconColor={isSuccessRegister ? '#58A600' : 'red'}
          
          titleSize="2.5em"
          titleColor={isSuccessRegister ? '#58A600' : 'red'}
          titleText={text}
          />}
      <Title textAlign='center' >Register</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInputText
          label='Name'
          placeholder='Enter your name'
          id='name'
          variant='outlined'
          {...register('name', { required: 'You must specify a username', minLength: { value: 5, message: 'Name must have at least 5 characters' } })}
          error={!!errors?.name}
          helperText={errors?.name?.message}
        />
        <CustomInputText
          label='Username'
          placeholder='Enter your username'
          id='username'
          variant='outlined'
          {...register('username', { required: 'You must specify a username', minLength: { value: 5, message: 'Username must have at least 5 characters' }, pattern: { value: /^[a-z0-9-_@$]{5,}$/gi, message: 'Username must be valid' } })}
          error={!!errors?.username}
          helperText={errors?.username?.message}
        />
        <CustomInputText
          label='Email'
          placeholder='Enter your email'
          id='email'
          variant='outlined'
          {...register('email', { required: 'You must specify a email', pattern: { value: REXEMAIL, message: 'Email must be valid' } })}
          error={!!errors?.email}
          helperText={errors?.email?.message}
        />
        <CustomInputText
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
        <CustomInputText
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
        <CustomButton type='submit' disabled={!completedInputs() || disableButton}>{<Spinner loading={loading}/>}</CustomButton>
        <ContainerAnchor>
          <p>Already have an acount! </p>
          <Link to='/sign-in'>
            <AnchorStyle>Sign In </AnchorStyle>
          </Link>
        </ContainerAnchor>
      </form>

    </ContainerStyle>
  )
}
const ContainerStyle = styled(Container)`
padding: 0 20px;
overflow: hidden;
overflow-y: auto;
@media (min-width :${mediaQuery.desktop}){
  height: 80vh;
  width: 420px;
}
`
