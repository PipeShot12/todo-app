import { InputAdornment, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useUser } from '../../context/userContex'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import CustomCheckBox from '../../components/CustomCheckBox/'
import CustomInputText from '../../components/CustomInputText'
import styled from 'styled-components'
import userServices from '../../services/userServices'
import Modal from '../../components/Modal'
import mediaQuery from "../../components/mediaQuery/"
import CustomButton from '../../components/CustomButton'
import Spinner from "../../components/Spinner"
import { Title, ContainerAnchor, AnchorStyle, Container } from '../../commonStyles'
import { animated } from 'react-spring'
import { EnterAnimation } from '../../animation'

export default function Login () {
  const [checked, setChecked] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginMsg, setLoginMsg] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm()
  const { setLocalStorageToken, setSaveTemporalToken } = useUser()


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
    <ContainerStyle style={EnterAnimation()}>
      {showModal &&
        <Modal 
        onClose={() => setShowModal(false)}
        icon='fas fa-exclamation-circle'
        iconSize="4em"
        iconColor="red"

        titleColor="red"
        titleSize="2em"
        titleText={loginMsg}
        />}
      <Title textAlign='center' >Login</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInputText
          label='Username or Email'
          placeholder='Enter your username or email'
          variant='outlined'
          error={!!errors?.userData}
          helperText={errors?.userData?.message}
          {...register('userData', { required: 'You must specify a username or email', minLength: { value: 5, message: 'Name must have at least 5 characters' } })}
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
          error={!!errors?.password}
          helperText={errors?.password?.message}
          {...register('password', { required: 'You must specify a password', minLength: { value: 8, message: 'Password must have at least 8 characters' } })}
        />
        <ContainerCheckbox>
          <label>
            <CustomCheckBox
              checked={checked} onChange={handleCheckboxChange} 
              containerStyle={{
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
          {<Spinner loading={loading}/>}
        </CustomButton>
      </form>
      <ContainerAnchor size='0.93em' >
        <p>Don't have an account ?</p>
        <Link to='/sign-up'>
          <AnchorStyle>Create a new account</AnchorStyle>
        </Link>
      </ContainerAnchor>

    </ContainerStyle>
  )
}
const ContainerStyle = animated(styled(Container)`
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
`)

const ContainerCheckbox = styled.div`
display: flex;
align-items: center;
color: var(--primary);
`
