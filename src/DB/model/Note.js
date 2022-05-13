import { Model } from '@nozbe/watermelondb'
import {
    field,
    date,
    writer,
    readonly,
    text,
} from '@nozbe/watermelondb/decorators';



export default class Note extends Model {
    static table = 'notes'
    

    @text('title') title
    @text('content') content
    @readonly @date('created_at') createdAt
    @readonly @date('updated_at') updatedAt

    // actions
      @writer async getNote() {
          return {
                title: this.title,
                content: this.content,
}}


    @writer async updateNote(title, content) {
        return await this.update((note) => {
            note.title = title
            note.content = content
        }); }

    @writer async deleteNote() {
        return await Promise.all([
            this.markAsDeleted(),
            this.destroyPermanently()

        ]);
    }

}