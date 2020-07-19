// Variables globales

const formularioUI = document.querySelector('#formulario')
const actividadesUI = document.querySelector('#actividades')
let actividadUI = document.querySelector('#actividad')
let actividadesApp = []

// Funciones 

const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }
    actividadesApp.push(item)
}

const SetLocalStorage = () => {
    localStorage.setItem('rutina', JSON.stringify(actividadesApp))
    GetCurrentState()
}

const GetCurrentState = () => {
    actividadesUI.innerHTML = ''
    actividadesApp = JSON.parse(localStorage.getItem('rutina'))
    if (actividadesApp === null) {
        actividadesApp = []
    } else {
        actividadesApp.forEach(item => {
            let customStatus
            item.estado === false ? customStatus = 'danger' : customStatus = 'success'
            let customIcon
            item.estado === true ? customIcon = 'done_all' : customIcon = 'hourglass_top'

            actividadesUI.innerHTML +=
                `<div class="alert alert-${customStatus}" role="alert">
                    <span class="material-icons float-left mr-2">${customIcon}</span>
                    <b>${item.actividad}</b><span class="float-right">
                    ${item.estado && (
                    '<span class="material-icons actionable">delete</span>'
                ) || (
                    '<span class="material-icons actionable">done</span><span class="material-icons actionable">delete</span>'
                )}
                </span></div > `
        })
    }
}

const BorrarActividad = (actividad) => {
    let indexAcitivdad = actividadesApp.findIndex((item) => item.actividad === actividad)
    actividadesApp.splice(indexAcitivdad, 1)
    SetLocalStorage()

}

const CambiarEstado = (actividad) => {
    let indexAcitivdad = actividadesApp.findIndex((item) => item.actividad === actividad)
    actividadesApp[indexAcitivdad].estado = true
    SetLocalStorage()
}

// Event listenner

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault()
    CrearItem(actividad.value)
    SetLocalStorage()
    formularioUI.reset()
})

// Es lo primero que se ejecuta cuando el html está totalmente cargado
document.addEventListener('DOMContentLoaded', GetCurrentState)

actividadesUI.addEventListener('click', (e) => {
    let actividad = e.path[2].childNodes[3].innerHTML
    switch (e.target.innerText) {
        case 'delete':
            BorrarActividad(actividad)
            break;
        case 'done':
            CambiarEstado(actividad)
            break;
    }
})