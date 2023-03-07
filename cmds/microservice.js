const fs = require('fs');
const isogitaddremote = require('../utils/isogitaddremote');
const isogitclone = require('../utils/isogitclone');
const isogitdeleteremote = require('../utils/isogitdeleteremote');
const msquestions = require('../utils/msquestions');
const replaceinfile = require('../utils/replaceinfile');

function UpperCasefirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

replace = function(basePath,nameApp){
  const lcNameApp = nameApp.toLowerCase();
  const ucfNameApp = UpperCasefirst(lcNameApp);
  const baseSrcPathMain = basePath + '/src/main/java/com/tdp/ms/' + lcNameApp;
  const baseSrcPathTest = basePath + '/src/test/java/com/tdp/ms/' + lcNameApp;
  const files = [
    baseSrcPathMain + '/' + ucfNameApp + 'Application.java',
    baseSrcPathMain + '/business/' + ucfNameApp + 'Service.java',
    baseSrcPathMain + '/business/impl/' + ucfNameApp + 'ServiceImpl.java',
    baseSrcPathMain + '/expose/' + ucfNameApp + 'Controller.java',
    baseSrcPathMain + '/model/' + ucfNameApp + 'Response.java',
    basePath + '/src/main/resources/bootstrap.yml',
    baseSrcPathTest + '/' + ucfNameApp + 'ApplicationTests.java',
    baseSrcPathTest + '/business/' + ucfNameApp + 'ServiceTest.java',
    baseSrcPathTest + '/expose/' + ucfNameApp + 'ControllerTest.java',
    basePath + '/pom.xml',
    basePath + '/README.md'
  ];
  replaceinfile(files,new RegExp('demo', 'g'),lcNameApp);
  replaceinfile(files,new RegExp('Demo', 'g'),ucfNameApp);
}

rename = function(path) {
  fs.renameSync(path.actual, path.new);
}

changePaths = function (nameApp,nameFolder) {
  const basePath = nameFolder + "/src";
  const baseMainPath = basePath + "/main/java/com/tdp/ms";
  const baseTestPath = basePath + "/test/java/com/tdp/ms";
  const pathMainActual = baseMainPath + "/demo";
  const pathTestActual = baseTestPath + "/demo";
  const pathMainNew = baseMainPath + "/" + nameApp;
  const pathTestNew = baseTestPath + "/" + nameApp;
  const ucfNameApp = UpperCasefirst(nameApp.toLowerCase());
  const paths =
    [ {actual: pathMainActual + "/DemoApplication.java", new: pathMainActual + "/" + ucfNameApp + "Application.java"},
      {actual: pathMainActual + "/business/DemoService.java", new: pathMainActual + "/business/" + ucfNameApp + "Service.java"},
      {actual: pathMainActual + "/business/impl/DemoServiceImpl.java", new: pathMainActual + "/business/impl/" + ucfNameApp + "ServiceImpl.java"},
      {actual: pathMainActual + "/expose/DemoController.java", new: pathMainActual + "/expose/" + ucfNameApp + "Controller.java"},
      {actual: pathMainActual + "/model/DemoResponse.java", new: pathMainActual + "/model/" + ucfNameApp + "Response.java"},
      {actual: pathTestActual + "/DemoApplicationTests.java", new: pathTestActual + "/" + ucfNameApp + "ApplicationTests.java"},
      {actual: pathTestActual + "/business/DemoServiceTest.java", new: pathTestActual + "/business/" + ucfNameApp + "ServiceTest.java"},
      {actual: pathTestActual + "/expose/DemoControllerTest.java", new: pathTestActual + "/expose/" + ucfNameApp + "ControllerTest.java"},
      {actual: pathMainActual, new: pathMainNew},
      {actual: pathTestActual, new: pathTestNew},
    ];
  paths.forEach(rename);
}

module.exports = async (args) => {
  const urlRepository = "http://devops-gns.eastus2.cloudapp.azure.com:10080/genesis-backend/cli-genesis-generico.git";
  const answers = await msquestions();
  var proyecto = answers.proyecto.trim();
  if (proyecto){
    proyecto = proyecto + "-";
  }
  const nombrerepo = "ms-" + answers.tipoms + "-" + proyecto + answers.nombre;
  const pathRepository = `./${nombrerepo}`;
  const newUrlRepository = "http://devops-gns.eastus2.cloudapp.azure.com:10080/"
    + answers.team + "/"
    + nombrerepo + ".git";

  console.log(`TDP > Procesando el nuevo repositorio: ${nombrerepo}`);
  if(await isogitclone(pathRepository, urlRepository, answers.usuario, answers.clave)){
    if(await isogitdeleteremote(pathRepository)){
      if(await isogitaddremote(pathRepository, newUrlRepository)){
        console.log(` TDP > Repositorio procesado con exito!!! :-D`);
        console.log(` TDP > Renombrando rutas`);
        changePaths(answers.nombre,pathRepository);
        console.log(` TDP > Reemplazando nombre de aplicación`);
        replace(pathRepository,answers.nombre);
        console.log(` TDP > Repositorio modificado con exito!!! :-D`);
      } else{ console.log(` TDP > Repositorio remoto fue imposible de agregarlo!!! :'(`); }
    } else{ console.log(` TDP > Repositorio remoto fue imposible de eliminarlo!!! :'(`); }
  } else{ console.log(` TDP > Repositorio ${nombrerepo} fue imposible crearlo!!! :'(`); }
}
