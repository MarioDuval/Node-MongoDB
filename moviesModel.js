import mongodb from '../managers/manager-mongo.js';

class MoviesModel {

    async getMovies() {

        console.log("---> moviesModel::getMovies");

        const movies = await mongodb.getMovies('movies', {}, {});
        // const movies = movie.getMovies();
        // movies.forEach(element => {
        //     element.actors = actor.getActorsById(element.id).actors;
        // });


        return movies;
    }

    async getMovieById(id) {

        console.log(`---> moviesModel::getMovieById = ${id}`);

        const _movie = await mongodb.getMovieById('movies', {id:parseInt(id)}, {});

        // const _movie = movie.getMovieById(id);
        // if (typeof _movie == 'undefined')
        //     throw new Error(messagesapp.movie_dosent_exist);

        // _movie.actors = actor.getActorsById(_movie.id).actors;
        return _movie;
    }

    async removeMovie(id) {

        console.log(`---> moviesModel::removeMovie = ${id}`);

        const index = await mongodb.removeMovie('movies', {id:parseInt(id)}, {})
        // const index = movie.removeMovie(id);
        // if (index != -1) { actor.removeActors(id) }
        return ((index.acknowlegded == false)? -1: 1);
    }


    async getMovieBy(elem) {
        console.log(`---> moviesModel::getMovieBy = ${elem.value}`);


        const _movies = movie.getMovieBy(elem);

        _movies.forEach(element => {
            element.actors = actor.getActorsById(element.id).actors;

        });
        return _movies;
    }


    async createMovie(req) {

        console.log(`---> moviesModel::createMovie = ${req.id}`);

        await mongodb.addMovie('movies', req, {});
        // const new_movie = moviePojo(req);
        // if (typeof new_movie == 'undefined')
        //     throw new Error(messagesapp.movie_error_create);

        // const new_actor = actorPojo(req);
        // if (typeof new_actor == 'undefined')
        //     throw new Error(messagesapp.actor_error_create);

        // movie.createMovie(new_movie);
        // actor.createActors(new_actor);
    }

    async updateMovie(req) {
        console.log(`---> moviesModel::updateMovie = ${req.id}`);

        await mongodb.updateMovie('movies', {id:parseInt(req.id)},{ $set:req});
        // const new_movie = moviePojo(req);
        // if (typeof new_movie == 'undefined')
        //     throw new Error(messagesapp.movie_error_update);

        // const new_actor = actorPojo(req);
        // if (typeof new_actor == 'undefined')
        //     throw new Error(messagesapp.actor_error_update);

        // const _movie = movie.updateMovie(new_movie);
        // if (typeof _movie == 'undefined')
        //     throw new Error(messagesapp.movie_error_update);

        // const _actor = actor.updateActors(new_actor);
        // if (typeof _actor == 'undefined')
        //     throw new Error(messagesapp.actor_error_update);


    }

    async getMoviesFromActor(req) {
        console.log(`---> moviesModel::getMoviesFromActor = ${req.id}`);

        const _movies = await mongodb.find('movies', {"actors": {$in: [req.value] }}, {})
        // let _movies = [];

        // const movies_id = actor.getIDFromActor(req)
        // movies_id.forEach(element => {
        //     _movies.push(movie.getMovieById(element.id));
        // });

        return _movies;
    }

    async addActors(req) {
        console.log(`---> moviesModel::addActors = ${req.id}`);

        // actor.addActorToMovie(req)
        await mongodb.updateOne('movies', {id:parseInt(req.id)}, {$push:{"actors":req.value}})
        return this.getMovieById(req.id);

    }

}

export default new MoviesModel()
