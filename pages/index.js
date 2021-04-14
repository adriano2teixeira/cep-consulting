import React, { useState } from 'react';
import Head from "next/head"
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
} from "@chakra-ui/react"
import cep_service_api from "../services/cep-service";


export default function Login() {

    const [cep, setCep] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [cep_data, setCepData] = useState(null)

    // Hanlde the submit action
    const handleSubmit = async event => {
        event.preventDefault();
        if(error) setError(false)
        if(cep_data) setCepData(null)

        setIsLoading(true)
        try {
            const {data} = await cep_service_api.get(cep) // make the request to cep service api
            setIsLoading(false)
            setCepData(data)
        } catch(err) {
            setIsLoading(false)

            // check the error status code
            if(err.message.split(" ")[5] == 404) {
                setError("CEP Inválido")
            } else {
                setError("Alguma coisa correu mal, tente novamente.")
            }
        }

    };

    return (
        <>
        <Head>
            <title>Consultas de CEP's</title>
        </Head>
        <Flex width="Full" align="center" justifyContent="center" className={"ct"}>
            <Box p={32} maxWidth="800px" borderWidth={1} borderRadius={10} boxShadow="lg">
                <Box textAlign="center">
                    <Heading> Consulta de CEP </Heading>
                </Box>
                <Box my={8} textAlign="left">
                    <form onSubmit={handleSubmit}>

                        <FormControl isRequired>
                            <FormLabel> CEP </FormLabel>
                            <Input
                                type={"number"}
                                   placeholder="Digite aqui o seu CEP"
                                   size="lg"
                                   onChange = {event => setCep(event.currentTarget.value)}
                                   isRequired={true}
                                   isDisabled={isLoading}
                            />
                        </FormControl>

                        <Button colorScheme="teal" isLoading={isLoading} width="full" mt={4} type="submit" size={"lg"}>
                           Consultar
                        </Button>

                        {error && (
                            <Alert status="error" className={"error-ct"}>
                                <AlertIcon />
                                <AlertTitle mr={2}>ooops!</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </form>

                    {cep_data &&(
                        <div className="cep-data-container">
                            <code>{JSON.stringify(cep_data)}</code>
                        </div>
                        )
                    }

                </Box>
            </Box>
        </Flex>
        </>
    );
}