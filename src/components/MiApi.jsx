import { useState, useEffect } from 'react'

const Indicador = () => {

    const [valores, setValores] = useState([])
    const [busquedaFecha, setBusquedaFecha] = useState('')
    const [busquedaFeriado, setBusquedaFeriado] = useState('')
    const [busquedaTipo, setBusquedaTipo] = useState('')

    
    useEffect(()=> {
        consultarInformacion();
    })

    const consultarInformacion = async () => {
        const url = 'https://api.victorsanmartin.com/feriados/en.json'
        const response = await fetch(url)
        const datos = await response.json()
        setValores(datos.data)
    }

    return(
        <div className='hola'>
            <label htmlFor="">Fecha:</label>
            <input placeholder='Ingrese Fecha' onChange={(e)=>{setBusquedaFecha(e.target.value)}} type="text" />
            <label htmlFor="">Feriado:</label>
            <input placeholder='Ingrese Feriado' onChange={(e)=>{setBusquedaFeriado(e.target.value)}} type="text" />
            <label htmlFor="">Tipo de Feriado:</label>
            <input placeholder='Ingrese Tipo de Feriado' onChange={(e)=>{setBusquedaTipo(e.target.value)}} type="text" />

            <ul>
                {valores
                .filter((indicador)=>{
                    if (busquedaFecha === '') {
                        return indicador
                    }
                    else{
                       return indicador.date.toLocaleLowerCase().includes(busquedaFecha)
                    }


                })

                .filter((indicador)=>{
                if (busquedaFeriado === '') {
                    return indicador
                }
                else {
                    return indicador.title.toLocaleLowerCase().includes(busquedaFeriado)
                }
                })
                
                .filter((indicador)=>{
                    if (busquedaTipo === '') {
                        return indicador
                    }
                    else {
                        return indicador.extra.toLocaleLowerCase().includes(busquedaTipo)
                    }
                    })

                .map((indicador,i)=><li key={i}>{indicador.date} - {indicador.title} - {indicador.extra}</li>)}
            </ul>
        </div>
    )

}

export default Indicador;
