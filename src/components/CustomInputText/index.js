import { TextField, withStyles } from '@material-ui/core'

const InputText = withStyles({

  root: {

    'margin-bottom': '25px',

    width: '100%',
    '& label.Mui-focused': {
      color: '#F35BB8'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#f02b41'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--info)'
      },
      '&:hover fieldset': {
        borderColor: 'var(--text)'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F35BB8'
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2
      },
      '& input': {
        border: '1px solid var(--info)',
        backgroundColor: 'white'
      }
    }
  }
})(TextField)

// export default function InputText ({ onChange, label, placeholder, id, value, error, helperText }) {
//   return (
//     <Input
//       id={id}
//       value={value}
//       label={label}
//       onInput={onChange}
//       placeholder={placeholder}
//       variant='outlined'
//       onChange={onChange}
//       error={error}
//       helperText={helperText}
//     />

//   )
// }
export default InputText
