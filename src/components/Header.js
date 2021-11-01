import { Button } from '@mui/material'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
    navBarItems: {
        display: "flex",
        alignItems: "center",
        padding: 4, 
        justifyContent: "space-between",
        marginLeft: "20%",
        marginRight: "20%",
    }
}))

export const Header = () => {
    const {
        enableWeb3,
        isWeb3Enabled, 
        isWeb3EnableLoading,
        web3EnableError,
        authenticate, 
        isAuthenticated, 
        isAuthenticating,
        logout, 
        authError, 
        onAccountChanged,
        web3,
        Moralis
    } = useMoralis()

    useEffect(() => { if (isAuthenticated) { enableWeb3() } }, [isAuthenticated])

    const enableAndAuthenticate = async () => {
        await enableWeb3()
        await authenticate()
    }
    const classes = useStyles()

    const buyCrypto = async () => {
        await Moralis.initPlugins()
        await Moralis.Plugins.fiat.buy()
    }

    return (
        <nav className={classes.navBarItems}>
            <h2>RetroCats</h2>
        </nav>
    )


}
