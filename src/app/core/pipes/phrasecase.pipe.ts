import { Pipe, PipeTransform } from '@angular/core';
import { toPhraseCase } from '../services/functions.service';

@Pipe({
  name: 'phrasecase',
})
export class PhrasecasePipe implements PipeTransform {
  transform(value: string) {
    return toPhraseCase(value);
  }
}
