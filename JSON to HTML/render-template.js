
  var async = require( "async" );
  var fs = require( "fs" );
  var hogan = require( "hogan.js" );

  var templateFilePath = "./template.html",
      europassJsonFilePath = "../Data files/Europass-cv.json",
      skillsJsonFilePath = "../Data files/Skills.json",
      htmlFilePath = "./cv.html";

  var readAsync = function ( file, callback ) {
      fs.readFile( file, "utf8", callback );
  }

  var fileReadCallback = function( err, results ) {

    // compile the template
    var templateContent = results[ 0 ];
    console.log( "Compiling template file contents: %s", templateFilePath );
    var template = hogan.compile( templateContent );
         
    // parse JSON files
    console.log( "Parsing Europass JSON file contents: %s", europassJsonFilePath );
    var jsonContent = results[ 1 ];
    var eruopass = JSON.parse( jsonContent );
    
    console.log( "Parsing skills JSON file contents: %s", skillsJsonFilePath );
    var skillsJsonContent = results[ 2 ];
    var skills = JSON.parse( skillsJsonContent );
    
    // render the template
    var context = eruopass;
    context[ "Skills" ] = skills;
 
    // wrapper function for rendering skills scores
    context[ "renderSkillsScore" ] = function() {
      return function(scoreText) {
        var text = "";
        var score = this.Score;
        
        for(var i=0; i<5; i++){
          var className = i<score ? "on" : "off";
          text += "<span class=\"entypo entypo-record " + className + "\"></span>";
        }
        
        return text;
      };
    };
    
    // process achievements
    if ( context.SkillsPassport.LearnerInfo.Achievement ) {
      for (var i = 0; i < context.SkillsPassport.LearnerInfo.Achievement.length; i++) {
        var code = context.SkillsPassport.LearnerInfo.Achievement[i].Title.Code;
        context.SkillsPassport.LearnerInfo.Achievement[i][code] = true;
      }
    }
    
    console.log( "Rendering template..." );
    var htmlContent = template.render( context );
     
    // outputs HTML content
    console.log( "Saving HTML file to %s.", htmlFilePath );
    fs.writeFile( htmlFilePath, htmlContent, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log( "The HTML file was saved to %s.", htmlFilePath );
      }
    });

  };

  
  async.map(
    [ 
      templateFilePath, 
      europassJsonFilePath, 
      skillsJsonFilePath
    ], 
    readAsync, 
    fileReadCallback
  );





