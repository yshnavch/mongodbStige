const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;// not necessary in present version
const task = require('./model/tasks.js');

mongoose.connect('mongodb://localhost/assignment',{ useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.connection.once('open', function(){
    console.log('Connection has been made');
}).on('error', function(error){
    console.log('Connection error:', error);
});


//adding data
function add(desc,com){
    var data=new task({
        Description: desc,
        Completed: com
    });
    data.save().then(()=>{
        console.log("New item added");
    })

}

//Reading data

function read(){
    task.find({Completed: false}).then(function(result){
        
        if(result.length!==0)
        {
            result.forEach(res=>{
                console.log(res);
            })
        }
        else{
            console.log("Everthing is completed");
        }
    })
}


//updating data

function update(){
    task.updateMany({Completed:false},{Completed:true}).then(function(result){
        
        if(result.n!==0){
            console.log("Data updated succesfully");
        }
        else{
            console.log("Nothing to update");
        }
    })
}

//update();

//deleting data using id

function deletedata(data){
    task.findOne({Description:data}).then(function(result){

        if(result!==null){
            task.deleteOne({_id:result._id}).then(function(res){
                
                if(res.n!==0){
                    console.log(data +" task deleted succesfully");
                }
                else{
                    console.log("No such task exist")
                }
            })
        }
        else{
            console.log("No such task exist")
        }
        
    
    })
}
//deletedata("Eating");

    add('Stige assignment',true);
    add('Reading books',false);
    add('Playing games',true);
    add('Eating',false);
    read();
    update();
    deletedata("Eating");