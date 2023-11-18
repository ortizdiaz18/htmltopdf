const express = require("express");
const puppeteer = require("puppeteer");
const puppeteerHtml2pdf = require("puppeteer-html2pdf");
const pdf = require("html-pdf");

const app = express();
const port = 3000;

let mesActivacion;
let anoActivacion;
let diaActivacion;
let numServicio;
let anoActual;
let mesActual;
let diaActual;
let valorConIva;
let nombreCompleto;
let cedula;
let telefono;
let email;
let municipio;
let direccion;
let departamento;
let barrio;
let estrato;
let nombreContacto;
let telContacto;
let planActual;
let valorSinIva;
let iva;
let tipoPlan;
let Geografia;
let velSubida;
let velBajada;
let id_transaccion;
let fecha;
let selfieUsuario;

let browser;

// Generar el PDF directamente desde una cadena HTML
const htmlContent = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrato</title>
    <style>
        body {
            width: 1190px;
            height: 5530px;
            display: flex;
            /* padding-top: 30px; */
        }

        .titulos {
            width: 531px;
            height: 30px;
        }

        .fondo-titulo {
            width: 531px;
            height: 30px;
        }

        .section2 {
            position: absolute;
            width: 1190px;
            height: 1230px;
            top: 1528px;
            display: flex;
            margin: 8px;
            margin-bottom: 20px;
        }

        .section2 img {
            margin-left: 40px !important;
            width: 535px;
        }

        .section2 .columA .parrafos {
            margin-left: 40px !important;
            margin-right: 20px !important;
        }

        .section3 {
            position: absolute;
            width: 1190px;
            height: 1210px;
            top: 3356px;
            display: block;
            color: gray;
            margin: 8px;
        }

        .section3 h1 {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 20px;
            margin: 0px;
            color: rgb(104, 104, 104);
        }

        .section3 h2 {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 20px;
            text-align: center;
            font-weight: normal;
            margin-top: 0px;
        }

        .section3 p {
            font-family: Arial, Helvetica, sans-serif;
            text-align: justify;
            margin: 10px 30px;
            font-size: 20px;
        }

        .section3 span {
            font-family: Arial, Helvetica, sans-serif;
            text-align: justify;
            margin: 30px;
            color: rgb(104, 104, 104);
        }

        .section4 {
            position: absolute;
            width: 1190px;
            height: 1530px;
            top: 8000px;
            display: block;
            color: gray;
            margin: 40px;
        }

        .columA {
            width: 595px;
           
        }

        .columB {
            width: 595px;
            
        }

        .columB img {
            margin-left: 20px !important;
        }

        h1 {
            display: flex;
            font-family: arial;
            font-size: 15px;
            justify-content: center;
            align-items: center;
            margin: 0px 30px;
            height: 15px;
        }

        p {
            font-family: arial;
        }

        table {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 18px;
            table-layout: fixed;
            border: 1px solid black;
            border-collapse: collapse;
            font-weight: normal;
        }

        td {
            font-family: Arial, Helvetica, sans-serif;
            border: 1px solid black;
            border-collapse: collapse !important;
            font-weight: normal;
            height: 15px;
            width: 250px !important;
        }

        tr {
            border: 1px solid black;
            border-collapse: collapse !important;
        }

        .marcar {
            width: 10px;
            height: 10px;
            border: 1px solid black;
            padding-left: 5px;
        }

        #logo {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 10px 20px 0px 40px;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-end;
        }

        #logo_titulo {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 10px 10px 5px 0px;
            flex-direction: row;
            flex-wrap: wrap;
            width: 340px;
        }

        #info-bitwan {
            display: flex;
            flex-direction: column;
            font-weight: bold
        }

        #info-bitwan p {
            margin: 0px;
            font-size: 15px;
            margin-right: 10px;
        }

        #explicacion {
            margin: 30px;
            text-align: justify;
            font-size: 20px;
            margin: 25px 20px 0px 40px;
        }

        #servicio p {
            text-align: justify;
            margin: 5px 20px 5px 40px;
            font-size: 18px
        }

        #servicio img {
            margin-left: 40px;
            height: 20px;
        }

        #servicio h1 {
            height: 20px;
        }

        #inf-suscriptor img {
            height: 20px;
        }

        #inf-suscriptor h1 {
            height: 20px;
        }

        #inf-suscriptor span {
            font-size: 19px !important;
        }

        #condiciones img {
            height: 20px;
        }

        #condiciones h1 {
            height: 20px;
        }

        #obligaciones_a {
            margin-left: 20px;
            margin-top: 75px;
        }

        #obligaciones_a img {
            height: 20px;
            margin-left: 19px !important;
            width: 535px
        }

        #obligaciones_a h1 {
            height: 20px;
            margin: 0px
        }

        #obligaciones img {
            height: 20px;
        }

        #obligaciones h1 {
            height: 20px;
        }

        #calidad img {
            height: 20px;
        }

        #calidad h1 {
            height: 20px;
        }

        #cesion img {
            height: 20px;
        }

        #cesion h1 {
            height: 20px;
        }

        #modificacion img {
            height: 20px;
        }

        #modificacion h1 {
            height: 20px;
        }

        #suspencion img {
            height: 20px;
        }

        #suspencion h1 {
            height: 20px;
        }

        #terminacion img {
            height: 20px;
        }

        #terminacion h1 {
            height: 20px;
        }

        #pago-facturacion img {
            height: 20px;
        }

        #pago-facturacion h1 {
            height: 20px;
        }

        .section2 img {
            height: 20px;
        }

        .section2 h1 {
            height: 20px;
        }

        .cobro-reconexion img {
            height: 73px;
        }

        .intFijo {
            position: relative;
            font-family: Arial;
            left: 220px;
            margin: 5px !important;
        }

        #inf-suscriptor {
            margin: 10px 20px 0px 40px !important;
            height: 250px;
        }

        #inf-suscriptor h1 {
            margin-bottom: 10px !important;
        }

        #inf-suscriptor span {
            display: flex;
            font-weight: normal;
            font-size: 15px;
            left: 170px !important;
        }

        #inf-suscriptor p {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            font-size: 15px;
            height: 10px;
            margin-top: 25px;
        }

        #condiciones {
            position: relative;
            top: 30px;
            margin: 10px 20px 30px 40px;
        }

        #condiciones h1 {
            margin-top: 5px !important;
            margin-bottom: 10px !important;
        }

        .parrafos {
            text-align: justify;
            margin: 0px 40px 0px 20px;
            font-size: 17px;
        }

        #firma {
            margin-top: 10px;
        }

        #logo-acta {
            display: flex;
            justify-content: space-around;
            margin: 10px;
            align-items: center;
            width: 560px
        }

        .firma {
            font-family: monospace;
            font-weight: bold;
            color: rgb(0, 0, 0);
            line-height: 0.5px;
            font-size: 11px;
        }
    </style>
</head>

<body>
    <section class="columA">
        <div id="logo"> <img style="position: absolute;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-2UKCT-.png"
                alt="">
            <div id="logo_titulo" style="position: relative; margin-top: 5px;"> <img
                    style="position: relative; width: 110px;"
                    src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-VXYAR-.png"
                    alt="logo.png">
                <div style="position: relative;" id="info-bitwan">
                    <p> INSITEL S.A.S</p>
                    <p>NIT.900313208</p>
                    <p>Calle 5 # 8 - 25</p>
                    <p>Alcala, Valle del Cauca</p>
                </div>
            </div>
            <div style="width: 140px; "> <img style="position: relative;width: 85px; margin-left: 20%; " id="qr"
                    src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220808-h1VDyOmxgRQk46YiUZIYzpUZz552-INOZX-.png"
                    alt="QRbitwan.png"> </div>
            <div>
                <h1
                    style="position: relative;font-weight:bolder; font-size: 20px; width: 500px; margin:20px 10px 15px 17px; text-align: center;">
                    CONTRATO ÚNICO DE SERVICIOS FIJOS</h1>
            </div>
        </div>
        <div id="explicacion">
            <p class="parrafos" style="margin-left: 0px; margin-right: 0px;"> Este contrato explica las condiciones para
                la prestación de los servicios entre usted e INSITEL S.A.S., por el que pagará mínimo mensualmente $
                <span class="valor"> ${valorConIva} </span>, este contrato tendra una vigencia de <span
                    style="color: gray;"> 1 </span> mes contado a partir del <span class="date">${diaActual}</span>
                <span>/</span> <span class="date">${mesActual}</span><span> / </span><span class="date">${anoActual}
                </span>, El plazo máximo de instalación es de 15 días hábiles.
            <p class="parrafos" style="margin-left: 0px; margin-right: 0px; margin-top: 5px;"> Acepto que mi contrato se
                renueve sucesiva y automáticamente por un plazo igual al inicial <span class="marcar"> x </span>. </p>
            </p>
        </div>
        <div id="servicio"> <img class="fondo-titulo" style="position: absolute;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position: relative">El SERVICIO </h1>
            <P class="parrafos">Con este contrato nos comprometemos a prestarle el servicio de*:
            <p class="intFijo"> Internet fijo <span class="marcar" style="padding-right: 5px;"> x </span> </p>
            </p>
            <p class="parrafos" style="line-height: 22px; margin-bottom: 10px;"> Servicios adicionales: <span>
                    _______________________ </span>Usted se compromete a pagar oportunamente lo acordado. </P>
            <p class="parrafos" style="margin-top: 10px; margin-bottom: 10px; height: 20px;"> El <span
                    style="font-weight: bold;"> servicio N° ${numServicio} </span>se activará a más tardar el día <span
                    style="position: relative; left: 425px;bottom: 20px; border: 1px solid black;display: flex;width: 85px;height: 20px;                     align-items: center; padding: 1px 10px; justify-content: space-between;"><span
                        class="date">${diaActivacion}</span> <span>/</span> <span class="date"> ${mesActivacion}
                    </span><span> / </span><span class="date"> ${anoActivacion} </span></span> </p>
        </div>
        <div id="inf-suscriptor"> <img class="fondo-titulo" style="position: absolute;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="margin: 0px; margin-bottom:30px; position:relative"> INFORMACIÓN DEL SUSCRIPTOR
            </h1>
            <p> Nombre / Razón Social: <span class="date"
                    style="position: relative;             left: 180px;bottom: 20px; border-bottom: 1px solid black; display: flex;width:360px;height: 15px;align-items: center; font-size: 15px !important;">
                    ${nombreCompleto}</span> </p>
            <p> Identificación: <span class="date"
                    style="position: relative; left: 180px;bottom: 19px; border-bottom: 1px solid black;             display: flex;width:140px;height: 15px;align-items: center; ">
                    <span>${cedula}</span> </p>
            <p> Teléfono de contacto: <span class="date"
                    style="position: relative; left: 180px;bottom: 20px; border-bottom: 1px solid black;             display: flex;width: 140px;height: 15px;align-items: center; ">
                    <span>${telefono}</span> </p>
            <p> Correo Electronico: <span class="date"
                    style="position: relative; left: 150px;bottom: 19.5px; border-bottom: 1px solid black;             display: flex;width:360px;height: 15px;align-items: center; ">
                    <span>${email}</span> </p>
            <p> Municipio: <span class="date"
                    style="position: relative; left: 150px;bottom: 20px; border-bottom: 1px solid black;             display: flex;width: 140px;height: 15px;align-items: center;">
                    <span>${municipio}</span> </p>
            <p> Dirección servicio: <span class="date"
                    style="position: relative; left: 150px;bottom: 20px; border-bottom: 1px solid black;             display: flex;width:360px;height: 15px;align-items: center; ">
                    <span>${direccion}</span> </p>
            <p> Departamento: <span class="date"
                    style="position: relative; left: 150px;bottom: 20px; border-bottom: 1px solid black;             display: flex;width: 145px;height: 15px;align-items: center; ">
                    <span>${departamento}</span> </p>
            <p> Barrio: <span class="date"
                    style="position: relative; left: 150px;bottom: 20px; border-bottom: 1px solid black;             display: flex;width:200px;height: 15px;align-items: center; ">
                    <span>${barrio}</span> </p>
            <p> Estrato: <span class="date"
                    style="position: relative; left: 150px;bottom: 20px; border-bottom: 1px solid black;             display: flex;width:20px;height: 15px;align-items: center; ">
                    <span>${estrato}</span> </p>
        </div>
        <div id="inf-suscriptor" style="height: 50px ; margin-top: 105px !important; margin-bottom:10px">
            <h1 style="height:10px; margin-bottom: 20px !important;">Contacto adicional </h1>
            <p> Persona de contacto: <span class="date"
                    style="position: relative; left: 150px;bottom: 20px; border-bottom: 1px solid black;                 display: flex;width:360px;height: 15px;align-items: center; ">
                    <span>${nombreContacto}</span> </p>
            <p> telefono del contacto: <span class="date"
                    style="position: relative; left: 150px;bottom: 20px; border-bottom: 1px solid black;                 display: flex;width:190px;height: 15px;align-items: center; ">
                    <span>${telContacto}</span> </p>
        </div>
        <div id="condiciones"> <img class="fondo-titulo" style="position: absolute;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos"
                style="margin:30px 0px; text-align: center; position:relative; margin-bottom: 20px !important;">
                CONDICIONES COMERCIALES CARACTERÍSTICAS DEL PLAN</h1>
            <table>
                <tr>
                    <td style="width:168px ; font-weight: normal;">Nombre del plan:</td>
                    <td style="width:870px !important; text-align: center; color: gray;"> ${planActual} </td>
                </tr>
            </table>
            <table style="border-top: 1px solid !important; position: relative;  top: 10px">
                <tr style="border-top: 1px solid !important;">
                    <td style="width:180px ;border-top: 1px solid  !important;">Cargo por conexión:</td>
                    <td
                        style="width:300px !important; text-align: center; color: black;border-top: 1px solid  !important;">
                        $0 </td>
                </tr>
                <tr style="border-top: 1px solid transparent !important;">
                    <td style="width:146px ;border-top: 1px solid transparent !important;">IVA conexión:</td>
                    <td
                        style="width:180px !important; text-align: center; color: gray;border-top: 1px solid transparent !important;">
                        $0 </td>
                </tr>
                <tr style="border-top: 1px solid transparent !important;">
                    <td style="width:160px ;border-top: 1px solid transparent !important; font-weight: bold;">Total
                        cargo por conexión:</td>
                    <td
                        style="width:180px !important; text-align: center; color: black; font-weight: bold;border-top: 1px solid transparent !important;">
                        $0 </td>
                </tr>
                <tr style="border-top: 1px solid transparent !important;">
                    <td style="width:146px ;border-top: 1px solid transparent !important;">Valor mensual:</td>
                    <td
                        style="width:130px !important; text-align: center; color: gray;border-top: 1px solid transparent !important;">
                        $ ${valorSinIva} </td>
                </tr>
                <tr style="border-top: 1px solid transparent !important;">
                    <td style="width:146px ;border-top: 1px solid transparent !important;">IVA:</td>
                    <td
                        style="width:130px !important; text-align: center; color: gray;border-top: 1px solid transparent !important;">
                        $ ${iva} </td>
                </tr>
                <tr style="border-top: 1px solid transparent !important;">
                    <td style="width:146px ;border-top: 1px solid transparent !important; font-weight: bold;">Valor
                        total mensualidad:</td>
                    <td
                        style="width:130px !important; text-align: center; color: black;border-top: 1px solid transparent !important;font-weight: bold;">
                        $ ${valorConIva} </td>
                </tr>
            </table>
            <table style="position: relative;  top: 20px">
                <tr>
                    <td style="width:146px ;">Tipo de plan:</td>
                    <td style="width:180px !important; text-align: center; color: gray;"> ${tipoPlan} </td>
                </tr>
                <tr style="border-top: 1px solid transparent !important;">
                    <td style="width:160px ;border-top: 1px solid transparent !important; ">Geografia:</td>
                    <td
                        style="width:300px !important; text-align: center; color: gray;border-top: 1px solid transparent !important;">
                        ${Geografia} </td>
                </tr>
                <tr style="border-top: 1px solid transparent !important;">
                    <td style="width:146px ;border-top: 1px solid transparent !important;">Permanencia minima:</td>
                    <td
                        style="width:130px !important; text-align: center; color: gray;border-top: 1px solid transparent !important;">
                        0 Meses </td>
                </tr>
                <tr style="border-top: 1px solid transparent !important;">
                    <td style="width:146px ;border-top: 1px solid transparent !important;">Velocidad de bajada:</td>
                    <td
                        style="width:130px !important; text-align: center; color: gray;border-top: 1px solid transparent !important;">
                        ${velSubida} Mbps </td>
                </tr>
                <tr style="border-top: 1px solid transparent !important;">
                    <td style="width:146px ;border-top: 1px solid transparent !important;">Velocidad de subida:</td>
                    <td
                        style="width:130px !important; text-align: center; color: gray;border-top: 1px solid transparent !important;">
                        ${velBajada} Mbps </td>
                </tr>
            </table>
        </div>
        <div id="obligaciones_a" style=""> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position: relative;"> PRINCIPALES OBLIGACIONES DEL SUSCRIPTOR</h1>
            <P class="parrafos"> 1) Pagar oportunamente los servicios prestados, incluyendo los intereses de mora cuando
                haya incumplimiento; 2) Suministrar información verdadera; 3) Hacer uso adecuado de los equipos y los
                servicios; </P>
        </div>
    </section>
    <section class="columB">
        <div id="obligaciones">
            <P class="parrafos"> 4) No divulgar ni acceder a pornografía infantil (Consultar anexo). 5) Avisar a las
                autoridades cualquier evento de robo o hurto de elementos de la red, como el cable, antenas o equipos;
                6) No cometer o ser partícipe de actividades de fraude. 7) Hacer uso adecuado de su derecho de presentar
                PQR. 8) Actuar de buena fe. El operador podrá terminar el contrato ante incumplimiento de estas
                obligaciones. </P>
        </div>
        <div id="calidad"> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position:relative"> CALIDAD Y COMPENSACIÓN</h1>
            <P class="parrafos"> Cuando se presente indisponibilidad del servicio o este se suspenda a pesar de su pago
                oportuno, lo compensaremos en su próxima factura. Debemos cumplir con las condiciones de calidad
                definidas por la CRC. Consúltelas en la página: </P>
            <p class="parrafos" style="margin-top: 10px">www.bitwan.com.co</p>
        </div>
        <div id="cesion"> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position: relative;"> CESIÓN</h1>
            <P class="parrafos"> Si quiere ceder este contrato a otra persona, debe presentar una solicitud por escrito
                a través de nuestros Medios de Atención, acompañada de la aceptación por escrito de la persona a la que
                se hará la cesión. Dentro de los 15 días hábiles siguientes, analizaremos su solicitud y le daremos una
                respuesta. Si se acepta la cesión queda liberado de cualquier responsabilidad con nosotros. </P>
        </div>
        <div id="modificacion"> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position: relative;"> MODIFICACIÓN</h1>
            <P class="parrafos"> Nosotros no podemos modificar el contrato sin su autorización. Esto incluye que no
                podemos cobrarle servicios que no haya aceptado expresamente. Si esto ocurre tiene derecho a terminar el
                contrato, incluso estando vigente la cláusula de permanencia mínima, sin la obligación de pagar suma
                alguna por este concepto. No obstante, usted puede en cualquier momento modificar los servicios
                contratados. Dicha modificación se hará efectiva en el período de facturación siguiente, para lo cual
                deberá presentar la solicitud de modificación por lo menos con 3 días hábiles de anterioridad al corte
                de facturación. </P>
        </div>
        <div id="suspencion"> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position: relative"> SUSPENSIÓN</h1>
            <P class="parrafos"> Usted tiene derecho a solicitar la suspensión del servicio por un máximo de 2 meses al
                año. Para esto debe presentar la solicitud antes del inicio del ciclo de facturación que desea
                suspender. Si existe una cláusula de permanencia mínima, su vigencia se prorrogará por el tiempo que
                dure la suspensió </P>
        </div>
        <div id="terminacion"> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position:relative"> TERMINACIÓN</h1>
            <P class="parrafos"> Usted puede terminar el contrato en cualquier momento sin penalidades. Para esto debe
                realizar una solicitud a través de cualquiera de nuestros Medios de Atención mínimo 3 días hábiles antes
                del corte de facturación (su corte de facturación es el día 01 de cada mes). Si presenta la solicitud
                con una anticipación menor, la terminación del servicio se dará en el siguiente periodo de facturación.
                Así mismo, usted puede cancelar cualquiera de los servicios contratados, para lo que le informaremos las
                condiciones en las que serán prestados los servicios no cancelados y actualizaremos el contrato. Así
                mismo, si el operador no inicia la prestación del servicio en el plazo acordado, usted puede pedir la
                restitución de su dinero y la terminación del contrato. </P>
        </div>
        <div id="pago-facturacion"> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position: relative;"> PAGO Y FACTURACIÓN</h1>
            <P class="parrafos"> La factura le debe llegar como mínimo 5 días hábiles antes de la fecha de pago. Si no
                llega, puede solicitarla a través de nuestros Medios de Atención y debe pagarla oportunamente. </P>
            <p class="parrafos" style="padding-top: 10px;">Si no paga a tiempo, previo aviso, suspenderemos su servicio
                hasta que pague sus saldos pendientes. Contamos con 3 días hábiles luego de su pago para reconectarle el
                servicio. Si no paga a tiempo, también podemos reportar su deuda a las centrales de riesgo. Para esto
                tenemos que avisarle por lo menos con 20 días calendario de anticipación. Si paga luego de este reporte
                tenemos la obligación dentro del mes de seguimiento de informar su pago para que ya no aparezca
                reportado.</p>
            <p class="parrafos" style="padding-top: 10px;"> Si tiene un reclamo sobre su factura, puede presentarlo
                antes de la fecha de pago y en ese caso no debe pagar las sumas reclamadas hasta que resolvamos su
                solicitud. Si ya pagó, tiene 6 meses para presentar la reclamación. </p>
        </div>
        <footer style="position:relative; text-align:right; top: 60px;margin-right: 10px">F-GC-002 Versión 4
            (30/06/2022) Pagina 1 de 2</footer>
    </section>
</body>
<section class="section2">
    <section class="columA">
        <div> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position:relative"> CÓMO COMUNICARSE CON NOSOTROS (MEDIOS DE ATENCIÓN)</h1>
            <table style="margin: 5px 20px 0px 40px; ">
                <tr>
                    <td style="width: 90px !important; text-align:center;color:white; font-size: 25px; ; ">
                        <div style="align-items: center; display:flex"> <img
                                style="position: absolute; margin: 0px !important; width: 79px ; height: 101px;"
                                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                                alt="">
                            <h1 style="position:relative !important; font-size:30px; color:black">1</h1>
                        </div>
                    </td>
                    <td
                        style="width:1128px !important; text-align: center; height: 60px; font-size: 17px; padding: 2px 2px;">
                        Nuestros medios de atención son: oficinas físicas en Calle 5 # 8 - 25 Alcalá - Valle, página web
                        www.bitwan.co, redes sociales www.facebook.com/oficialbitwan, la línea telefónica gratuita
                        018000423561, línea telefonica (601)7942321 y Whatsapp (57)3176995294. </td>
                </tr>
                <tr>
                    <td style="width: 90px !important; text-align:center;color:white; font-size: 25px; ; ">
                        <div style="align-items: center; display:flex"> <img
                                style="position: absolute; margin: 0px !important; width: 79px ; height: 62px;"
                                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                                alt="">
                            <h1 style="position:relative !important; font-size:30px; color:black">2</h1>
                        </div>
                    </td>
                    <td
                        style="width:1128px !important; height: 40px !important; text-align: center; height: 60px;font-size: 17px;padding: 2px 2px;">
                        Presente cualquier queja, petición/reclamo o recurso a través de estos medios y le responderemos
                        en máximo 15 días hábiles. </td>
                </tr>
                <tr>
                    <td style="width: 90px !important; text-align:center;color:white; font-size: 25px; ; ">
                        <div style="align-items: center; display:flex"> <img
                                style="position: absolute; margin: 0px !important; width: 79px ; height: 62px;"
                                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                                alt="">
                            <h1 style="position:relative !important; font-size:30px; color:black">3</h1>
                        </div>
                    </td>
                    <td
                        style="width:1128px !important; height: 40px !important; text-align: center; height: 60px; font-size: 17px;padding: 2px 2px;">
                        Si no respondemos es porque aceptamos su petición o reclamo. Esto se llama silencio
                        administrativo positivo y aplica para internet y telefonía. </td>
                </tr>
            </table>
            <h1 style="margin: 0px"> Si no está de acuerdo con nuestra respuesta </h1>
            <table style="margin: 0px 20px 5px 40px;">
                <tr>
                    <td style="width: 90px !important; text-align:center;color:white; font-size: 25px; ; ">
                        <div style="align-items: center; display:flex"> <img
                                style="position: absolute; margin: 0px !important; width: 80.469px ; height: 221px;"
                                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                                alt="">
                            <h1 style="position:relative !important; font-size:30px; color:black">4</h1>
                        </div>
                    </td>
                    <td
                        style="width:1128px !important; text-align: center; height: 150px; line-height:20px; padding: 2px 10px; text-align:justify;font-size: 17px;">
                        Cuando su queja o petición sea por los servicios de telefonía y/o internet, y esté relacionada
                        con actos de negativa del contrato, suspensión del servicio, terminación del contrato, corte y
                        facturación; usted puede insistir en su solicitud ante nosotros, dentro de los 10 días hábiles
                        siguientes a la respuesta, y pedir que si no llegamos a una solución satisfactoria para usted,
                        enviemos su reclamo directamente a la SIC (Superintendencia de Industria y Comercio) quien
                        resolverá de manera definitiva su solicitud. Esto se llama recurso de reposición y en subsidio
                        apelación. </td>
                </tr>
            </table>
        </div>
        <div> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position:relative;"> CLAUSULA DE PERMANENCIA MINIMA</h1>
            <P class="parrafos"> Este contrato <span style="font-weight: bold">no tiene clausula de permanencia
                    minima</span>, usted puede terminar el contrato en cualquier momento sin penalidades. Para esto debe
                realizar una solicitud a través de cualquiera de nuestros medios de atención minimo 3 dias habiles antes
                del corte de facturación (su corte de facturación es el dia 01 de cada mes). Si presenta la solicitud
                con una anticipacion menor, la terminación del servicio se dara en el siguiente periodo de facturación.
            </P>
        </div>
        <div> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position:relative"> CAMBIO DE DOMICILIO</h1>
            <P class="parrafos"> Usted puede cambiar de domicilio y continuar con el servicio siempre que sea
                técnicamente posible. Si desde el punto de vista técnico no es viable el traslado del servicio, usted
                puede ceder su contrato a un tercero o terminarlo pagando el valor de la cláusula de permanencia mínima
                si está vigente. </P>
        </div>
        <div> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position:relative"> COBRO POR RECONEXIÓN DEL SERVICIO</h1>
            <P class="parrafos" style="margin-bottom: 5px;"> En caso de suspensión del servicio por mora en el pago,
                podremos cobrarle un valor por reconexión que corresponderá estrictamente a los costos asociados a la
                operación de reconexión. En caso de servicios empaquetados procede máximo un cobro de reconexión por
                cada tipo de conexión empleado en la prestación de los servicios. Costo reconexión: $ 30.000 </P>
            <div class="cobro-reconexion"> <img style="position: absolute; margin-left: 30px;margin-top: 0px;"
                    src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220622-h1VDyOmxgRQk46YiUZIYzpUZz552-8JWHB-.png"
                    alt="">
                <P class="parrafos" style="margin-top:5px;margin-bottom:5px; position:relative; padding: 5px; "> El
                    SUSCRIPTOR es el ÚNICO responsable por el contenido y la información que se curse a través de la red
                    y del uso que se haga de los equipos o de los servicios </P> <img
                    style="position: absolute; margin-left: 30px;margin-top: 0px;"
                    src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220622-h1VDyOmxgRQk46YiUZIYzpUZz552-8JWHB-.png"
                    alt="">
                <P class="parrafos" style="margin-top:0px; position:relative;padding: 5px;"> Los equipos de
                    comunicaciones que ya no use son desechos que no deben ser botados a la caneca, consulte nuestra
                    política de recolección de aparatos en desuso. </P>
            </div>
        </div>
        <div> <img class="fondo-titulo" style="position: absolute; margin-left: 30px;"
                src="https://storage.googleapis.com/m-infra.appspot.com/public/res/Insitel/20220621-h1VDyOmxgRQk46YiUZIYzpUZz552-OHQZL-.png"
                alt="">
            <h1 class="titulos" style="position:relative; margin-top: 5px;"> ESPACIO PARA EL OPERADOR </h1>
            <P class="parrafos" style="margin-bottom: 5px;"> Obligaciones del usuario: Permitir ingreso de personal
                INSITEL para auditorías, mantenimientos; verificar identidad de personal en líneas de atención;
                responder por daño o deterioro en equipos; devolver equipos recibidos, so pena de pagar los equipos
                hasta por su precio de compra; informar cambio de dirección de instalación; reportar y abstenerse de
                realizar conexiones fraudulentas o no autorizadas, como Phishing, Spamming, entre otras; no interceptar
                comunicaciones; el usuario los recibe en comodato y/o en asignación modal y será responsable por los
                mismos; Los equipos no podrán ser alterados, reubicados o trasladados del lugar de instalación, esto es
                causal de terminación del contrato; El usuario manifiesta conocer los términos y condiciones de los
                servicios adicionales contratados disponibles en www.bitwan.co. El usuario tendrá que pagar cargos
                adicionales si las condiciones del lugar exigen una instalación no estándar. Los equipos son propiedad
                de INSITEL. Condiciones cambio de plan: aplica en periodo de facturación siguiente;estar al día; </P>
        </div>
    </section>
    <section class="columB">
        <div>
            <P class="parrafos"> buen comportamiento de pago; solo lo puede solicitar el titular; pierde promociones
                previas. Principales factores limitantes de velocidad de Internet: a) Controlados por INSITEL: Alta
                latencia en red, congestión o fallas en el canal de internet, redes troncales y de acceso,
                comportamientos anómalos de tráfico, entre otros; b) No controlados por INSITEL: consumo excesivo del
                ancho de banda de apps del usuario, congestión en red WIFI o en dispositivos adicionales, fallas y
                congestión en las troncales internacionales de internet, entre otros. La velocidad contratada podrá
                disminuir al usar Wi-Fi, dependiendo del entorno y la distancia al módem. Las velocidades establecidas y
                el uso ininterrumpido de los servicios no están garantizados. INSITEL no ofrece ninguna garantía de que
                el servicio no tendrá ningún tipo de error o siempre será seguro, ininterrumpido y operará a una
                velocidad mínima. Si al momento de la instalación del servicio la validación arroja condiciones óptimas
                para prestar el SERVICIO DE COMUNICACIONES, se procederá a su instalación, de lo contrario, la solicitud
                del servicio o la aceptación de la oferta realizada por el usuario podrá ser rechazada. El retardo del
                pago causará intereses de mora a la máxima tasa permitida por ley, se cobrarán los gastos de cobranza
                judicial y extrajudicial. El usuario pagará cargo de reconexión y los servicios que pueda usar durante
                la suspensión. El aumento de tarifas no excederá la inflación acumulada en los últimos 12 meses de la
                tarifa vigente antes del incremento, más un porcentaje igual al IPC del año anterior; los incrementos se
                podrán realizar en cualquier tiempo, sin que el cómputo total de los aumentos supere el porcentaje de
                inflación acumlada establecido. Podrán modificarse excediendo dicho límite, y el usuario podrá terminar
                el contrato en los 30 días siguientes. Terminación y/o suspensión por INSITEL sin requerimiento y
                declaración judicial por: No viabilidad técnica o económica para prestar el servicio; Irregularidades en
                los documentos suministrados; o por evolución tecnológica; Incumplimiento de alguna de sus obligaciones
                incluyendo el no pago de 1 factura; Retardo/falta de pago; Fraude; Entrega de información falsa o
                inconsistente; Muerte o extinción de personalidad jurídica; Explotación comercial no autorizada; Los
                servicios o planes residenciales están diseñados para uso y consumo residencial, en el caso que se
                detecte un uso excesivo o que supere el promedio normal de un hogar ya sea en la cantidad de conexiones
                por segundo, paquetes por segundo o el consumo de ancho de banda por segundo, INSITEL S.A.S. podrá dar
                por terminado este contrato de manera inmediata y unilateral; Vencimiento del plazo o de sus prórrogas;
                Fuerza mayor/caso fortuito; Vencimiento del plazo o de sus prórrogas; Uso inadecuado de la red o del
                servicio; La terminación no exime de cancelación de obligaciones causadas y costos de cobranza
                judicial-extrajudicial, no recuperará beneficios promocionales por ponerse al día; El usuario autoriza
                deducir o compensar cualquier suma de dinero que le adeude a INSITEL. No respondemos por lucro cesante,
                daños indirectos, incidentales o consecuenciales. Las partes establecen que este contrato será exigible
                judicialmente a partir del incumplimiento de cualquier obligación del Usuario, para lo cual se agregará
                la factura respectiva determinando la cuantía adeudada, integrándose así un título ejecutivo con una
                obligación clara, expresa, exigible a cargo del Usuario. Consulte condiciones técnicas y de calidad de
                cada tecnología en www.bitwan.co; El Titular autoriza recibir (o a través del contacto autorizado)
                información y notificaciones de sus servicios vía electrónica, por WhatsApp, SMS, correo electrónico y/o
                cualquier otro medio válido. </P>
            <table
                style="border: 1px solid black;width: 540px; margin: 0px 20px; border-bottom: 1px solid transparent; ">
                <tr style="border: 1px solid black;font-size: 15px;border-bottom: 1px solid transparent;">
                    <th style="border: 1px solid black; border-bottom: 1px solid transparent; width: 200px;"> Titular
                        del servicio: </th>
                    <th style="border: 1px solid black; border-bottom: 1px solid transparent;"> ${nombreCompleto} </th>
                </tr>
            </table>
            <table style="border: 1px solid black;width: 540px; margin: 0px 20px;">
                <tr style="border: 1px solid black; font-size: 15px;">
                    <th style="border: 1px solid black;width: 200px;"> Celular: </th>
                    <th style="border: 1px solid black"> ${telefono} </th>
                </tr>
            </table>
        </div>
        <div id="firma">
            <table style="width: 540px; margin-left: 20px; height: 90px; border-color: gray;">
                <tr>
                    <div
                        style="position: absolute; margin-left: 80px;top: 900px; display: flex; width: 595px; height: 100px;">
                        <div style="width: auto; padding-top: 8px;">
                            <h4 class="firma">Firma electronica ${id_transaccion}</h4>
                            <h4 class="firma">Firmante: ${nombreCompleto}</h4>
                            <h4 class="firma">Email: ${email}</h4>
                            <h4 class="firma">Telefono: ${telefono}</h4>
                            <h4 class="firma">Fecha y hora: ${fecha}</h4>
                        </div> <img style="width:70px;height: 70px; padding-top: 15px;" src=${selfieUsuario}
                            alt="selfie">
                    </div>
                    <td
                        style=" text-align:center; padding-top: 65px; color:rgb(149, 149, 149); width: 538px; border-color: gray; font-size: 15px; height: 2px !important; ">
                        Aceptación contrato mediante firma o cualquier otro medio válido </td>
                </tr>
            </table>
            <table style="margin-left: 20px; height: 20px !important">
                <tr style="height: 20px">
                    <td
                        style="width:265px !important;  color:gray; border-color: gray; border-top: 1px solid transparent; height: 20px !important; font-size: 15px;">
                        CC/CE <span style="color: black; margin-left: 20px;">${cedula}</span> </td>
                    <td
                        style="width:268px !important;  color: gray; border-color:gray;border-top: 1px solid transparent; height:20px !important;font-size: 15px;">
                        FECHA <span class="date">${diaActual}</span> <span>/</span> <span
                            class="date">${mesActual}</span><span> / </span><span class="date">${anoActual} </span></td>
                </tr>
            </table>
        </div>
        <p class="parrafos" style="position:relative; top: 0px;"> * Espacio diligenciado por el suscriptor, Consulte el
            régimen de protección de usuarios en www.crcom.gov.co</p>
        <footer style="position:relative; text-align:right; top: 10px; margin-right: 10px;">F-GC-002 Versión 4
            (30/06/2022) Pagina 2 de 2</footer>
    </section>
</section>
<section class="section3">
    <h1>Anexo Legal al Contrato Único De Servicios Fijos</h1>
    <h2>Este Anexo Legal es una parte integral del Contrato Único De Servicios Fijos</h2>
    <p> <span style="font-weight: bold;">AUTORIZACIÓN TRATAMIENTO DE DATOS PERSONALES, REPORTE Y CONSULTA DE
            INFORMACIÓN</span> Por medio del presente documento autorizo de manera irrevocable a la empresa INSITEL
        S.A.S., en adelante INSITEL, o quien sea en un futuro acreedor: 1) Para que con ocasión de los productos,
        promociones, bienes y servicios, y en general cualquier tipo de obligación contraída hasta la fecha o que se
        contraiga en adelante con INSITEL, pueda llevar a cabo las siguientes actividades: a) Consultar, en cualquier
        tiempo, en las centrales de riesgo, toda la información relevante para conocer mi desempeño como deudor, mi
        capacidad de pago o para valorar el riesgo futuro de suministrarme un bien o servicio y contraer cualquier
        obligación para con INSITEL o para con los terceros quienes tienen suscrito convenios con tal propósito; b)
        Reportar a las centrales de información de riesgo, que administren bases de datos, la información sobre el
        comportamiento de mis obligaciones, especialmente las de contenido patrimonial que adquiera para con INSITEL o
        con terceros con quienes ésta ha celebrado convenios de tal naturaleza, así como la información veraz,
        pertinente, completa, actualizada y exacta, de mi desempeño como deudor, después de haber cruzado y procesado
        diversos datos útiles para obtener una información significativa; c) Enviar la información mencionada a las
        centrales de riesgo de manera directa y también por intermedio de cualquiera de las Superintendencias que
        ejercen funciones de vigilancia y control, con el fin que estas puedan tratarla, analizarla, clasificarla y
        luego suministrarla a dichas centrales si fuera el caso; d) Conservar la información reportada, en la base de
        datos de la central de riesgo, con las debidas actualizaciones y durante el periodo necesario señalado en sus
        reglamentos. 2) para que con ocasión de los productos, promociones, bienes y servicios, y en general cualquier
        tipo de obligación contraída hasta la fecha o que se contraiga en adelante con INSITEL, pueda utilizar mis datos
        personales para la elaboración de base de datos con fines comerciales o publicitarios, distintos a los
        directamente relacionados con los fines para los que fueron entregados y compartidos con terceros con los cuales
        INSITEL tenga establecidas alianzas comerciales o publicitarias. 3) A utilizar mis datos personales con la
        finalidad de: (i) Comunicar eficientemente información propia de INSITEL, así como de nuestras filiales y/o
        aliados comerciales, sobre productos, servicios, ofertas. (ii) Informar sobre nuevos productos o servicios que
        estén relacionados con el o los servicios adquiridos. (iii) Evaluar la calidad del (los) servicio (s). (iv)
        Informar sobre cambios de nuestros productos o servicios. (v) Participar en programas de lealtad con beneficios
        (vi) Realizar estudios de mercadeo sobre hábitos de consumo. (vii) Transferir y transmitir datos personales a
        terceros con vínculos comerciales con INSITEL. (viii) Las demás finalidades estrechamente asociadas y necesarias
        para cumplir los fines de mercadeo. Para efectos de revocar o autorizar la presente autorización usted puede
        dirigirse al portal de INSITEL www.bitwan.com.co </p>
    <p> <span style="font-weight: bold;"> PREVENCIÓN CONTRA LA PORNOGRAFÍA INFANTIL:</span> En cumplimiento de la Ley
        679 de 2001 y Decreto 1524 de 2002 el SUSCRIPTOR deberá acatar las siguientes PROHIBICIONES y DEBERES: El
        SUSCRIPTOR no podrá bajo ningún medio y en ningún caso: 1. Alojar en su propio sitio imágenes, textos,
        documentos o archivos audiovisuales que impliquen directa o indirectamente actividades sexuales con menores de
        edad. 2. Alojar en su propio sitio material pornográfico, en especial en modo de imágenes o videos, cuando
        existan indicios de que las personas fotografiadas o filmadas son menores de edad. 3. Alojar en su propio sitio
        vínculos o "links", sobre sitios telemáticos que contengan o distribuyan material pornográfico relativo a
        menores de edad. B. Deberes: Son deberes del SUSCRIPTOR como usuario de servicios de telecomunicaciones y/o
        datacenter los siguientes: 1. Denunciar ante las autoridades competentes cualquier acto criminal contra menores
        de edad de que tengan conocimiento, incluso de la difusión de material pornográfico asociado a menores. 2.
        Combatir con todos los medios técnicos a su alcance la difusión de material pornográfico con menores de edad. 3.
        Abstenerse de usar las redes globales de información para divulgación de material ilegal con menores de edad. 4.
        Establecer mecanismos técnicos de bloqueo por medio de los cuales los usuarios se puedan proteger a sí mismos o
        a sus hijos de material ilegal, ofensivo o indeseable en relación con menores de edad. El SUSCRIPTOR tampoco
        podrá en ningún caso, para los servicios de Datacenter contratados a INSITEL, alojar contenidos de pornografía
        infantil o que muestren indicios de participación de menores de edad. El no cumplimiento de las anteriores
        prohibiciones y deberes acarreará las sanciones administrativas y penales contempladas en la Ley 679 de 2001 y
        el Decreto 1524 de 2002 y facultará a INSITEL para terminar unilateralmente el Contrato y/o los Servicios en
        cualquier tiempo. </p>
    <p> <span style="font-weight: bold;"> PREVENCIÓN DE LAVADO DE ACTIVOS, FINANCIACIÓN DEL TERRORISMO, SOBORNO Y
            CORRUPCIÓN TRANSNACIONAL</span> EL SUSCRIPTOR certifica que cumple con las obligaciones que bajo la
        legislación vigente le corresponden para apoyar la prevención de lavado de activos y financiación de terrorismo,
        así como de prevenir y abstenerse de incurrir en conductas de soborno y corrupción transnacional. En tal sentido
        certifica que dentro su organización ha implementado herramientas y procedimientos que le permiten tener un
        conocimiento suficiente de sus clientes y proveedores a fin de detectar y reportar las operaciones intentadas y
        sospechosas en materia de lavado de activos y financiación de terrorismo y de soborno y corrupción
        transnacional. De acuerdo a lo anterior, EL SUSCRIPTOR mantendrá indemne a INSITEL de cualquier perjuicio que
        esta última sufra como consecuencia de cualquier incumplimiento de EL SUSCRIPTOR respecto de las normas vigente
        en materia de prevención de lavado de activos y financiación de terrorismo y de soborno y corrupción
        transnacional. En caso de que EL SUSCRIPTOR, sus representantes y/o accionistas se encuentren vinculados a bases
        de datos o listas nacionales o internacionales que indican la posible relación de personas naturales y jurídicas
        con lavado de activos, apoyo a grupos terroristas, narcotráfico, soborno y corrupción transnacional, entre otros
        y/o sean considerados por la autoridad correspondiente como responsables de lavado de activos y/o financiación
        de terrorismo o por soborno y corrupción transnacional, INSITEL queda facultado para terminar inmediatamente el
        contrato suscrito y toda solicitud de servicio derivada del mismo, sin dar lugar a ningún tipo de indemnización
        o penalidad derivada de dicha terminación. </p>
    <p> Declaro haber leído cuidadosamente el contenido de este documento y haberlo comprendido a cabalidad por la cual
        en señal de entendimiento y aceptación de sus alcances e implicaciones, lo suscribo. </p>
</section>

</html>`;

app.get("/preview", async (req, res) => {
  // HTML directamente en una variable
  if (!browser) {
    // Iniciar una instancia de Puppeteer con el nuevo modo Headless
    browser = await puppeteer.launch({ headless: false }); // Abre el navegador visible
  }

  // Abrir una nueva página
  const page = await browser.newPage();

  // Establecer el contenido HTML en la página
  await page.setContent(htmlContent);

  // Abre el navegador y visualiza la página antes de convertirla en PDF
  res.send("Página HTML para previsualización en el navegador");
});

app.get("/convert2", (req, res) => {
  // Opciones de configuración
  const options = {
    path: "documento_puppeteer-html2pdf.pdf",
    format: "A4",
  };
  // Convierte el HTML a PDF y envía el archivo como respuesta
  puppeteerHtml2pdf
    .convert({ content: htmlContent, ...options })
    .then((result) => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=documento_puppeteer-html2pdf.pdf"
      );
      res.send(result);
    });
});

app.get("/convert3", (req, res) => {
  // Opciones de configuración
  const options = { format: "Letter" };

  // Convierte el HTML a PDF y envía el archivo como respuesta
  pdf.create(htmlContent, options).toBuffer((err, buffer) => {
    if (err) {
      res.status(500).send("Error al generar el PDF");
    } else {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=documento_html-pdf.pdf"
      );
      res.send(buffer);
    }
  });
});

app.get("/convert", async (req, res) => {
  const marginConfig = {
    top: "5mm",
    bottom: "5mm",
    left: "5mm",
    right: "5mm",
  };

  if (!browser) {
    // Iniciar una instancia de Puppeteer con el nuevo modo Headless
    browser = await puppeteer.launch({ headless: false });
  }
  // Abrir una nueva página
  const page = await browser.newPage();
  // Reemplaza esto con tu HTML
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({
    format: "Letter",
    margin: marginConfig,
    scale: 1
  });

  // Cerrar el navegador de Puppeteer
  await browser.close();

  // Descargar el PDF generado
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="documento.pdf"');
  res.send(pdfBuffer);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
