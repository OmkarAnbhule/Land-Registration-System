import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import Snackbar from "awesome-snackbar";

const authContext = createContext()

const AuthProvider = ({ children }) => {
    const [account, setAccount] = useState(null)
    useEffect(() => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum)
            const accounts = web3.eth.getAccounts()
            if (accounts[0] == '' || accounts.length <= 0) {
                new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Metamask not connected`, {
                    position: 'bottom-center',
                    style: {
                        container: [
                            ['background', 'rgb(246, 58, 93)'],
                            ['border-radius', '5px'],
                            ['height', '50px'],
                            ['padding', '10px'],
                            ['border-radius', '20px']
                        ],
                        message: [
                            ['color', '#eee'],
                            ['font-size', '18px']
                        ],
                        bold: [
                            ['font-weight', 'bold'],
                        ],
                        actionButton: [
                            ['color', 'white'],
                        ],
                    }
                });
            }
            else {
                setAccount(accounts[0])
            }
        }
        else {
            new Snackbar(`<i class="bi bi-exclamation-circle-fill"></i>&nbsp;&nbsp;&nbsp;Metamask not installed`, {
                position: 'bottom-center',
                style: {
                    container: [
                        ['background', 'rgb(246, 58, 93)'],
                        ['border-radius', '5px'],
                        ['height', '50px'],
                        ['padding', '10px'],
                        ['border-radius', '20px']
                    ],
                    message: [
                        ['color', '#eee'],
                        ['font-size', '18px']
                    ],
                    bold: [
                        ['font-weight', 'bold'],
                    ],
                    actionButton: [
                        ['color', 'white'],
                    ],
                }
            });
        }
    }, [])

    return (
        <AuthProvider value={{ account }}>
            {children}
        </AuthProvider>
    )
}

const useAuthContext = () => {
    return useContext(authContext)
}

export { AuthProvider, useAuthContext }
