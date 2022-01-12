class CategoriesService {
    constructor(){
        this.categories = [
            {
                id: '2',
                name: 'Categoria 1'
            },
            {
                id: '3',
                name: 'Categoria 2'
            },
            {
                id: '4',
                name: 'Categoria 3'
            },
        ]
    }
    
    create(data){
        this.categories.push(data)
        return data
    }
    getAllCategories(){
        return this.categories
    }
    getCategory(id){
        return this.categories.find(item => item.id === id)
    }
    updateCategories(){

    }
    deleteCategories(){

    }
}

module.exports = CategoriesService