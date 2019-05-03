const Resource = require('../dist').default
const Client = require('../dist/client').DefaultClient

class BaseResource extends Resource {
    static get client() {
        return new Client('https://jsonplaceholder.typicode.com')
    }
}

class UserResource extends BaseResource {
    static get endpoint() {
        return '/users'
    }
}

class TodoResource extends BaseResource {
    static get endpoint() {
        return '/todos'
    }

    static get related() {
        return {
            userId: UserResource
        }
    }
}

TodoResource.list()
    .then((response) => {
        response.resources.forEach(async (resource) => {
            await resource.getRelated()
            let title = resource.get('title')
            let author = resource.get('userId.name')
            let doneText = resource.get('completed') ? 'x' : '-'
            console.log(`${doneText}\t${title}\n\t${author}\n\n`)
        })
    })
