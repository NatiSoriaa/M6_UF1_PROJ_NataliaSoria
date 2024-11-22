window.onload = () => {
    // Crear tarjetas
    crearTarjetas(filosofos)

    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click',crearNuevaTarjeta);

    //Creamos botones para ordenar tarjetas
    let botonOrdenarAZ = document.querySelector('.sort-btn-az');
    let botonOrdenarZA = document.querySelector('.sort-btn-za');
    botonOrdenarAZ.addEventListener('click', ordenarNombreAZ);
    botonOrdenarZA.addEventListener('click', ordenarNombreZA);

    //Creamos botones para guardar y cargar tarjetas
    let botonGuardar = document.querySelector('.save-btn');
    let botonCargar = document.querySelector('.load-btn');
    botonGuardar.addEventListener('click', guardarTarjetas);
    botonCargar.addEventListener('click', cargarTarjetas); 
}

function crearTarjetas(filosofos) {
    filosofos.forEach((filosofo) => {
        // Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        // Creamos imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        tarjeta.append(imagen);

        // Creamos caja de informacion
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);
        // Creamos título
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);
        // Creamos fila de información (info-row)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.append(filaInfo);

        // Añadimos info del país a filaInfo
        //creamos lista de informacion de pais
        let infoPais = document.createElement('div');
        infoPais.classList.add('info-pais');
        //creamos imagen del pais y lo agregamos a la info pais
        let imagenPais = document.createElement('img');
        imagenPais.src = filosofo.pais.bandera;
        imagenPais.alt = `Bandera de ${filosofo.pais.nombre}`;
        infoPais.append(imagenPais);
        //creamos el nombre del pais y lo agregamos a la info pais
        let nombrePais = document.createElement('span');
        nombrePais.innerHTML = filosofo.pais.nombre;
        infoPais.append(nombrePais);
        //agregamos toda la infoPais a la filaInfo
        filaInfo.append(infoPais);
        
        // Añadimos info de la corriente a filaInfo
        //creamos lista de info corriente
        let infoCorriente = document.createElement('div');
        infoCorriente.classList.add('info-corriente');
        //creamos span de corriente y lo agregamos a la lista info corriente
        let spanCorriente = document.createElement('span');
        spanCorriente.innerHTML = `Corriente ${filosofo.corriente}`;
        infoCorriente.append(spanCorriente);
        //agregamos toda la info corriente a fila info
        filaInfo.append(infoCorriente);
        
        // Añadimos info del arma a filaInfo
        //creamos lista de info arma
        let infoArma = document.createElement('div');
        infoArma.classList.add('info-arma');
        //creamos span de arma
        let spanArma = document.createElement('span');
        spanArma.innerHTML = `Arma ${filosofo.arma}`;
        //agregamos la span arma a info arma
        infoArma.append(spanArma);
        //agregamos toda la info arma a fila info
        filaInfo.append(infoArma);


        // Añadimos caja de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');
        info.append(habilidades);
        // Añadimos una a una las habilidades
        for (let infoHabilidad of filosofo.habilidades) {
            // Añadimos una caja de habilidad
            let skill = document.createElement('div');
            skill.classList.add('skill');
            // Añadimos contenido caja de habilidad
            // 1.Icono de habilidad
            let icono = document.createElement('img');
            icono.src = "https://images.vexels.com/content/141614/preview/circles-empty-concentric-36b396.png";
            icono.alt = `Icono de ${infoHabilidad.habilidad}`;
            skill.append(icono);
            // 2.Etiqueta de habilidad
            let nombreHabilidad = document.createElement('span');
            nombreHabilidad.classList.add('skill-name');
            nombreHabilidad.innerHTML = infoHabilidad.habilidad;
            skill.append(nombreHabilidad);       
            // 3.Barra de habilidad
            let barra = document.createElement('div');
            barra.classList.add('skill-bar');
            let nivel = document.createElement('div');
            nivel.classList.add('level');
            nivel.style.width = `${infoHabilidad.nivel * 20}%`
            barra.append(nivel);
            skill.append(barra);

            habilidades.append(skill);
            
        }

        // Añadimos tarjeta creada al contenedor de tarjetas
        let contenedor = document.querySelector('.cards-container');
        contenedor.append(tarjeta);

        //Creamos boton para eliminar una tarjeta
        let botonEliminar = document.createElement('div');
        botonEliminar.innerHTML = '&#x2716';
        botonEliminar.classList.add('botonEliminar');
        //Agregamos el listener al boton
        botonEliminar.addEventListener('click', () => eliminarTarjeta(tarjeta));
        //añadir boton
        tarjeta.append(botonEliminar);
    })
}

function eliminarTarjeta(tarjeta) {
    tarjeta.remove();
}

function crearNuevaTarjeta(event) {
    event.preventDefault();
    let nuevoFilosofo = {};
    nuevoFilosofo.nombre = document.querySelector('.create-card-form .nombre').value;
    nuevoFilosofo.imagen = document.querySelector('.create-card-form .foto').value;
    nuevoFilosofo.pais = {};
    nuevoFilosofo.pais.nombre = document.querySelector('.create-card-form .pais').value;
    nuevoFilosofo.pais.bandera = document.querySelector('.create-card-form .bandera').value;
    nuevoFilosofo.corriente = document.querySelector('.create-card-form .corriente').value;
    nuevoFilosofo.arma = document.querySelector('.create-card-form .arma').value;
    nuevoFilosofo.habilidades = [
        {//volvemos a generar las habilidades, llamando a cada clase del html por su respectiva habilidad
            //para esto, realizamos anteriormente un cambio en las clases de habilidades para nombrarlas por cada habilidad
            habilidad: "Sabiduría",
            nivel: parseInt(document.querySelector('.create-card-form .sabiduria').value),
        },
        {
            habilidad: "Oratoria",
            nivel: parseInt(document.querySelector('.create-card-form .oratoria').value),
        },
        {
            habilidad: "Lógica",
            nivel: parseInt(document.querySelector('.create-card-form .logica').value),
        },
        {
            habilidad: "Innovación",
            nivel: parseInt(document.querySelector('.create-card-form .innovacion').value),
        }
    ];
    //se llama a la funcionn nuevoFilosofo como array en crearTarjetas 
    crearTarjetas([nuevoFilosofo]);
}


function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

    // Eliminar totes les targetes de l'array 'tarjeta'
    // Completar codi
    // Afegir 'tarjetasOrdenadas' al contenidor de cards
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';
    // Completar codi
    tarjetasOrdenadas.forEach(tarjeta => contenedor.append(tarjeta));
}

function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre2.localeCompare(nombre1);
    });

    //eliminamos primero todas las tarjetas 
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';

    //añadimos tarjetas ordenadas al contenedor
    tarjetasOrdenadas.forEach(tarjeta => contenedor.append(tarjeta));
}


function parsearTarjetas(tarjetas){
    let filosofosParseados = [];
    for (let tarjeta of tarjetas){
        let filosofo = {};
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.pais = {};
        // Completar funció
        filosofo.pais = {};
        filosofo.pais.nombre = tarjeta.querySelector('.info-pais span').innerHTML;
        filosofo.pais.bandera = tarjeta.querySelector('.info-pais img').src;
        filosofo.corriente = tarjeta.querySelector('.info-corriente span').innerHTML;
        filosofo.arma = tarjeta.querySelector('.info-arma span').innerHTML;
        let habilidades = tarjeta.querySelectorAll('.skill');
        filosofo.habilidades = [];
        for (let habilidad of habilidades){
            let habilidadParaGuardar = {};
            // Completar funció
            habilidadParaGuardar.habilidad = habilidad.querySelector('.skill-name').innerHTML;
            let nivel = habilidad.querySelector('.level').style.width;
            //en este caso dividimos sobre 20 para convertir el porcentaje en un nivel de 1-5
            habilidadParaGuardar.nivel = parseInt(nivel) / 20;
            filosofo.habilidades.push(habilidadParaGuardar);
        }
        filosofosParseados.push(filosofo);
    }
    return filosofosParseados;
}

function guardarTarjetas(){
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas)));
}


function cargarTarjetas() {
    let tarjetasGuardadas = localStorage.getItem('tarjetas');
    let filosofos = JSON.parse(tarjetasGuardadas);
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';
    crearTarjetas(filosofos);
    
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]