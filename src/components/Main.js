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