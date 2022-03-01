import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const Input = ({name, label, half, autoFocus, type, handleChange, handleTogglePassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            label={label}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' || name === 'confirmPassword' ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleTogglePassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            } : null}
            xs={6}
        />
    </Grid>
  )
}

export default Input