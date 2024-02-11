import fs from 'fs';
function deleteExpiredFiles(){
    console.log('checking....');
    let files=fs.readdirSync('./uploads/stories')
    files.forEach(function(file){
      const [name,user,date,math]=file.split('-')
      if(Date.now()>date)
      {
        fs.unlinkSync(`./uploads/stories/${file}`)
        console.log('deleting expired files',file);
      }else{
        console.log('this files are not expired',file);
      }
    })
  }
  export default deleteExpiredFiles;