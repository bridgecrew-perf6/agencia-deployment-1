import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimonial.js';

const paginaInicio = async (req, res) => { 
    
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit : 3 }));
    promiseDB.push(Testimonial.findAll({ limit : 3 }));

    try {
        // const viajes = await Viaje.findAll({ limit : 3 });
        // const testimoniales = await Testimonial.findAll({ limit : 3 });
        
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }

    
};

const paginaNosotros = (req, res) => {            
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {         
    
    // Consultar BD
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
    });
};

const paginaTestimoniales = async (req, res) => {       
    try {    
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    } 
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    
    const { destino } = req.params;

    try {
        const resultado = await Viaje.findOne({ where : { slug : destino }});
        res.render('viaje', {
            pagina: 'Información viaje',
            resultado
        });
    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}