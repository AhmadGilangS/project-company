// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Client) {

    Client.remoteMethod(
        'getClientName',{
            description: 'get name like -> Tjiwi Kimia',
            accepts: [
                {arg: 'clientname', type: 'string'}
            ],
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http:{path:'/getClientName', verb: 'get'}
        }
    );



    Client.getClientName = function(clientname, callback){
        new Promise(function(resolve, reject){

            var filter = {
                where : {
                    client_name:{
                        like : clientname
                    }
                }
            }

            Client.find(filter, function(err, result){
                if(err) reject (err)
                if(result===null){
                    err = new Error('Cannot find client name')
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
        });
    }

};
