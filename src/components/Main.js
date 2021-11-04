import { useState, useEffect } from 'react'
import networkMapping from '../chain-info/deployments/map.json'
import { MintCards } from './MintCards'
import { MyCards } from './MyCards'
import { SearchCards } from './SearchCards'
import { Box, Tabs, Tab, Container, Button } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { makeStyles } from '@mui/styles'
import {
    useMoralisWeb3Api, 
    useMoralisWeb3ApiCall,
    useMoralis,
} from 'react-moralis'
import { MintOrViewCards } from './MintCards'
import { textAlign } from '@mui/system'

const useStyles = makeStyles(() => ({
    title: {
        color: "black",
        textAlign: 'center',
        padding: 4,
        fontSize: '2rem',
    },
    box: {
        backgroundColor: "white",
        borderRadius: "25px",
    }, 
    header: {
        color: "blue"
    }
}))

const tabOptions = [
    "mint cards", 
    "my cards", 
    "search cards"
]

export const isValidNetwork = (network) => {
    if (networkMapping.hasOwnProperty(network)) {
        return true
    }
    return false
}

export const Main = () => {
    const classes = useStyles()
    const { Web3Api } = useMoralisWeb3Api()
    const { web3, isWeb3Enabled, Moralis, users, isAuthenticated, enableWeb3 } = useMoralis()

    const getChain = async () => {
        if (isAuthenticated && isWeb3Enabled) {
            return await web3.eth.getChainId()
        }
        return null
    }

    const [selectedTab, setSelectedTab] = useState(tabOptions[0])
    const [networkId, setNetworkId] = useState(null)
    

    
}