import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from './LanguageContext'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledFormControl = styled(FormControl)({
  width: '150px',
  '.MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
    color: 'white',
    '.MuiSvgIcon-root': {
      color: 'white',
    },
  },
  '.Mui-focused .MuiInputLabel-outlined': {
    color: 'white',
  },
})

const StyledInputLabel = styled(InputLabel)({
  color: 'white',
  '&.Mui-focused': {
    color: 'white',
  },
})

const LanguageSelection = () => {
  const { language, setLanguage } = useContext(LanguageContext)
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    fetch('https://pokedex-jgabriele.vercel.app/pokemons.json')
      .then(response => response.json())
      .then(data => {
        const extractedLanguages = extractLanguages(data)
        setLanguages(extractedLanguages)
      })
  }, [])

  const extractLanguages = (data) => {
    const languageSet = new Set()
    data.forEach(pokemon => {
      Object.keys(pokemon.names).forEach(lang => languageSet.add(lang))
    })
    return Array.from(languageSet)
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <StyledFormControl variant='outlined'>
      <StyledInputLabel id='language-select-label'>Langue</StyledInputLabel>
      <Select
        labelId='language-select-label'
        value={language}
        label='Langue'
        onChange={handleLanguageChange}
      >
        {languages.map((lang) => (
          <MenuItem key={lang} value={lang}>{lang}</MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  )
}

export default LanguageSelection;
