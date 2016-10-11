var fs = require("fs");


function mergeValues(values, content){
//cycle over the keys
  for(var key in values){
  //replace all {{key}} with the value from the value object
  content = content.replace("{{" + key + "}}", values[key]);
}
  return content;
}



function view(templateName, values, response){
  //read from the template file
  var fileContents = fs.readFileSync("./views/" + templateName + ".html", {encoding: "utf8"});

  fileContents = mergeValues(values, fileContents);

  //write out the Content
    response.write(fileContents);
  };
  //insert values into the content

  //write out to the response


module.exports.view = view;
