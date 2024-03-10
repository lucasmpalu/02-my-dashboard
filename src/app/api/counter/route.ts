//SI O SI SE TIENE QUE LLAMAR ROUTE.TS
//ESTO SIEMPRE ES SERVER COMPONENT
//LO UNICO QUE NECESITO ES QUE NO HAYA NINGUN ARCHIVO 'PAGE.TSX/JSX' A LA MISMA ALTURA

import { NextResponse } from "next/server"



//SI QUIERO UN PUT/POST/PATCH LO CAMBIO X GET
export async function GET(request: Request) {

    console.log({ method: request.method })
    // para mandar la respuesta el NextResponse importarlo de 'next/server'
    return NextResponse.json({
        method: 'GET',
        count: 100
    })
}

//SI QUIERO UN PUT/POST/PATCH LO CAMBIO X GET
export async function POST(request: Request) {

    console.log({ method: request.method })
    // para mandar la respuesta el NextResponse importarlo de 'next/server'
    return NextResponse.json({
        method: 'POST',
        count: 100
    })
}