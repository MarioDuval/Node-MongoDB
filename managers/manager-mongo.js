import { MongoClient } from "mongodb";

const url = 'mongodb+srv://mongo:mrcSGbwAjiwqXPqI@cluster0.0f80m.mongodb.net/test'
const dbName = 'movies';


class MongoManager {

    constructor(url, dbName) {
        this.url = url;
        this.dbName = dbName;
        this.client = new MongoClient(url)
        this.db;
    }

    async connection() {
        try {
            await this.client.connect();
            this.db = this.client.db(this.dbName);
        } catch (error) {
            this.dropConnection();
            throw error;
        }
    }

    async dropConnection() {
        await this.client.close();
    }

    async getMovies(collectionName, query, projection) {
        try {
            await this.connection();
            const result = await this.db.collection(collectionName).find(query)
                .project(projection)
                .sort({ "id": 1})
                .toArray();
            return result;
        } catch (error) {
            throw error;
        } finally {
            this.dropConnection();
        }
    }

    async getMovieById(collectionName, query) {
        try {
            await this.connection();
            const result = await this.db.collection(collectionName).find(query)
                .toArray();
            return result;
        } catch (error) {
            throw error;
        } finally {
            this.dropConnection();
        }
    }

    async addMovie(collectionName, data) {
        try {
            await this.connection();
            const result = await this.db.collection(collectionName)
                .insertOne(data);
            return result;
        } catch (error) {
            throw error;
        } finally {
            this.dropConnection();
        }
    }

    async updateMovie(collectionName, query, data) {
        try {
            await this.connection();
            const result = await this.db.collection(collectionName)
                .updateOne(query, data)
            return result;
        } catch (error) {
            throw error;
        } finally {
            this.dropConnection();
        }
    }

    async removeMovie(collectionName, query) {
        try {
            await this.connection();
            const result = await this.db.collection(collectionName)
                .deleteOne(query);
            return result;
        } catch (error) {
            throw error;
        } finally {
            this.dropConnection();
        }
    }
}

export default new MongoManager(url, dbName);
