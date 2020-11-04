const {TagsModel, JobsModel} = require('./model');

function capitalize(text) {
    return text.replace(/\b\w/g , function(m){ return m.toUpperCase(); } );
}

async function saveTags(tags){
    let array = [];
    try{
        array = await Promise.all(tags.map(async (tag) => { 
            let element = new TagsModel(tag);
            const tagEncontrado = await TagsModel.findOneAndUpdate(
                {name: capitalize(tag.name)},
                {name: capitalize(element.name)},
                {upsert: true, new: true, rawResult: true}
            );
            return tagEncontrado.value._id;
        }));
    }catch(e){
        console.log(e);
    }
    
    return array;
}

function getJobs(filterCompany){
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterCompany !== null){
            filter = {
                company: filterCompany,
            };
        }
        result = JobsModel.find(filter)
            .select("-__v")
            .populate('tags');

        resolve(result);
    });
}

async function addJob(job){
    const listTags = await saveTags(job.tags);
    job.tags = listTags;
    const newJob = new JobsModel(job);
    await newJob.save();
    return newJob;
}

async function updateJob(id, job, company){
    const foundJob = await JobsModel.findOne({
        _id: id
    });

    if(!foundJob){
        return {
            status: 404,
            message: 'Job not found'
        };
    }

    if(company != company){//TODO: NO SE PORQUE NO FUNCIONA CUANDO COMPARO CONTRA LA BASE DE DATOS foundJob.company
        return {
            status: 401,
            message: 'Not authorized to access this resource'
        };
    }

    if(job.title){
        foundJob.title = job.title;
    }
    if(job.description){
        foundJob.description = job.description;
    }
    if(job.city){
        foundJob.city = job.city;
    }
    if(job.time){
        foundJob.time = job.time;
    }
    if(job.areaCode){
        foundJob.areaCode = job.areaCode;
    }
    if(job.phoneNumber){
        foundJob.phoneNumber = job.phoneNumber;
    }
    if(job.email){
        foundJob.email = job.email;
    }
    if(job.tags.length > 0){
        const listTags = await saveTags(job.tags);
        if(listTags){
            foundJob.tags = listTags;
        }
    }
    
    await foundJob.save();
    return {
        status: 200,
        message: 'Ok'
    };
}

async function deleteJob(id, company){
    const foundJob = await JobsModel.findOne({
        _id: id
    });

    if(!foundJob){
        return {
            status: 404,
            message: 'Job not found'
        };
    }

    if(company != company){//TODO: NO SE PORQUE NO FUNCIONA CUANDO COMPARO CONTRA LA BASE DE DATOS foundJob.company
        return {
            status: 401,
            message: 'Not authorized to access this resource'
        };
    }
        
    await JobsModel.deleteOne({
        _id: id
    });
    
    return {
        status: 200,
        message: 'Job ' + foundJob.title + ' Borrado correctamente'
    };

}

module.exports = {
    list: getJobs,
    add: addJob,
    update: updateJob,
    delete: deleteJob
}