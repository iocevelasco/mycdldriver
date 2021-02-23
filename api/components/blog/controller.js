const store = require('./store');

async function getArticle(slug) {
    try{
        const result = await store.getArticle(slug);
        return(result);
    }catch(e){
        console.log('ERROR EN CONTROLLER', e);
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function getCategory(slug) {
    try{
        const result = await store.getCategory(slug);
        return(result);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function setArticle(slug, user) {
    try{
        const result = await store.setArticle(slug, user);
        return(result);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function updateArticle(article) {
    try{
        const result = await store.updateArticle(article);
        return(result);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function deleteArticle(id) {
    try{
        const result = await store.deleteArticle(id);
        return(result);
    }catch(e){
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

module.exports = {
    getArticle,
    getCategory,
    setArticle,
    updateArticle,
    deleteArticle
}