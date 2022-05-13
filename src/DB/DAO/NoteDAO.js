import { database } from "../db";

const notes = database.get("notes");

export const observenotes = () => notes.query().observe();


export const Createnote = async (title , body) => {
    await database.write(async ()=>{
        notes.create((note)=> {
            note.title = title;
            note.content = body;
        });

    });

}

export const deleteAll = async () => {
    await database.write(async () => {
        await notes.query().destroyAllPermanently();
    });
}