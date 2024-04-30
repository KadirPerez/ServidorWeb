const models = require('./models');

async function demoAsociacionMuchosAMuchos() {

  let activo = await models.Activo.findOne({
    where: {id: 1}
  });

  let tags = await models.Tag.findAll();

  console.log(
    "Datos del activo: ",
    activo.id,
    activo.numSerie,
    activo.numInventario,
    activo.descripcion 
  );
  
  console.log("Tagssss", tags)
  await activo.addTags(tags);

  let tagsAsociados = await activo.getTags();

  console.log("Tags del activo con numero de serie:",activo.numSerie);

  tagsAsociados.forEach( tag => {
    console.log(tag.tag);
  });

  let tagAppleDevice = await models.Tag.findOne({where:{tag:"Apple Device"}});
  let activosApple = await tagAppleDevice.getActivos();
  console.log("Activos apple:")
  activosApple.forEach( e => {console.log(e.id, e.numSerie, e.numeInventario, e.descripcion)})
  models.sequelize.close();
}
demoAsociacionMuchosAMuchos();
