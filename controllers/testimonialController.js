import { Testimonial } from '../models/Testimonial.js';

const guardarTestimonial = async (req, res) => {

    // Validación de los datos ingresados
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre.trim() === ''){
        errores.push({ msj : 'El nombre está vacío' });
    }

    if (correo.trim() === ''){
        errores.push({ msj : 'El correo está vacío' });
    }

    if (mensaje.trim() === ''){
        errores.push({ msj : 'El mensaje está vacío' });
    }

    if (errores.length > 0) {

        // Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores y campos que hayan sido completados
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo, 
            mensaje,
            testimoniales
        });
    } else {
        // Almacenar en la BD
        try {
            await Testimonial.create({
                nombre, 
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }

}

export {
    guardarTestimonial
}