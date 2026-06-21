import axios from "axios";

const PORT = import.meta.env.VITE_NOTESERVICE_PORT;
const NOTE_ADDRESS = `http://localhost:${PORT}`;

export const fetchAllAnnotations = async (id: number, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(NOTE_ADDRESS + `/api/v2/annotations/all/${id}`, config);
        if (res.status === 500) {
            return [500];
        }
        return res.data;

    }
    catch {
        return [];
    }
}

export const fetchAnnotationById = async (id: string, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(NOTE_ADDRESS + `/api/v2/annotations/${id}`, config);
        if (res.status === 500) {
            return [500];
        }
        return res.data;

    }
    catch {
        return [];
    }
}


export const postNewAnnotation = async (reqBody: object, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.post(NOTE_ADDRESS + '/api/v2/annotations', reqBody, config);
        return res.data;
    }
    catch (e) {
        return e;
    }
}


export const updateExistingAnnotationById = async (id: string, reqBody: object, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.put(NOTE_ADDRESS + `/api/v2/annotations/${id}`, reqBody, config);
        return res.data;
    }
    catch (e) {
        return e;
    }
}


export const deleteAnnotationById = async (id: string, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.delete(NOTE_ADDRESS + `/api/v2/annotations/${id}`, config);
        return res.data;
    }
    catch (e) {
        return e;
    }
}



