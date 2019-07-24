// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Report) {

    
    Report.remoteMethod(
        'getProjectName',{
            description: 'get name like -> Tjiwi Kimia',
            accepts: [
                {arg: 'projectname', type: 'string'}
            ],
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http:{path:'/getProjectName', verb: 'get'}
        }
    );



    Report.getProjectName = function(projectname, callback){
        new Promise(function(resolve, reject){

            var filter = {
                where : {
                    project_name:{
                        like : projectname
                    }
                }
            }

            Report.find(filter, function(err, result){
                if(err) reject (err)
                if(result===null){
                    err = new Error('Cannot find project name')
                    err.statusCode = 404
                    reject (err)
                }

                resolve(result)

            })
        }).then(function(res){
            if(!res) callback(err)
            return callback(null, res)
        }).catch(function(err){
            callback (err)
        })
    }

};
