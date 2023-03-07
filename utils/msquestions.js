const inquirer = require('inquirer');

module.exports = async () => {
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'tipoms',
            message: 'Seleccione el tipo de microservicio',
            choices: [
            { name: 'Canal', value: 'cn' },
            { name: 'Negocio', value: 'ne' },
            { name: 'Soporte', value: 'sp' }
            ]
        },
        {
            type: 'list',
            name: 'team',
            message: 'Seleccione el grupo de trabajo',
            choices: [
            { name: 'Integracion', value: 'integracion-backend' },
            { name: 'Genesis', value: 'genesis-backend' },
            { name: 'Parkour', value: 'parkour-backend' },
            { name: 'Visor', value: 'visor-backend' }
            ]
        },
        {
            type: 'input',
            name: 'proyecto',
            message: "Nombre del proyecto",
            validate: function(value) {
            var result = value.match(
                /(^[a-z][a-z-]+)$/g
            );
            if (!value.trim() || result) {
                return true;
            }
            return 'Intente de nuevo, el nombre del proyecto puede ser vacío o debe cumplir con la expresion: (^[a-z][a-z-]+)$';
            }
        },
        {
            type: 'input',
            name: 'nombre',
            message: "Nombre del microservicio",
            validate: function(value) {
            var result = value.match(
                /(^[a-z][a-z]+)$/g
            );
            if (result) {
                return true;
            }
            return 'Intente de nuevo, el nombre del microservicio debe cumplir con la expresion: (^[a-z][a-z]+)$';
            }
        },
        {
            type: 'input',
            name: 'usuario',
            message: "Usuario del repositorio: "
        },
        {
            type: 'password',
            name: 'clave',
            message: 'Clave del repositorio: ',
            mask: '*'
        }
        ])
        .then(answers => { return answers; });
}
