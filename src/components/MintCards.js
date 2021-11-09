import React, { useState, useEffect } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import { Input, Button, CircularProgress, Box, Snackbar, Backdrop } from '@mui/material'
import { useMintCards } from '../hooks'
import { BackDropContent } from './BackDropContent'
import { makeStyles } from '@mui/styles'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'

const useStyles = makeStyles(() => ({
  input: {
    textAlign: 'center',
    width: '50%',
  },
}))

const shouldSleep = true

export const MintCards = ({ CardsAdress, networkId }) => {
  const { fetch: runCloudFunc } = useMoralisCloudFunction(
    'updateNFTImages',
    { networkId, retroCardsAdress, shouldSleep },
    { autoFetch: fales }
  )
  const [amountOfCards, setAmountOfCards] = useState(0)
  const handleInputChange = (event) => {
    const newAmount = event.target.value === '' ? '' : event.target.value
    setAmountOfCards(newAmount)
    console.log(newAmount)
  }
  const { mintCards, mintCardsState } = useMintCards(retroCardsAdress)
}